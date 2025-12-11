import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

// Support both DATABASE_URL (full connection string) and individual env vars
let poolConfig;
if (process.env.DATABASE_URL) {
  // Use full connection string (e.g., from Render Internal Database URL)
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    max: Number(process.env.PGPOOL_MAX) || 10,
    idleTimeoutMillis: Number(process.env.PG_IDLE_TIMEOUT_MS) || 30000,
    ssl: process.env.DATABASE_URL.includes("render.com") ? { rejectUnauthorized: false } : undefined,
  };
} else {
  // Use individual env vars
  const REQUIRED_ENV = ["PGHOST", "PGPORT", "PGDATABASE", "PGUSER", "PGPASSWORD"];
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length) {
    console.warn(
      `[step-domain-api] Missing env vars: ${missing.join(
        ", "
      )}. The API will start but DB calls will fail until they are set.`
    );
  }
  poolConfig = {
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT) || 5432,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    max: Number(process.env.PGPOOL_MAX) || 10,
    idleTimeoutMillis: Number(process.env.PG_IDLE_TIMEOUT_MS) || 30000,
  };
}

const pool = new Pool(poolConfig);

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "*", methods: ["GET", "POST", "PATCH", "DELETE"] }));
app.use(express.json());
app.use(express.static(rootDir));

const port = Number(process.env.PORT) || 3001;

/**
 * GET /api/step-domain?step=N
 * Returns the next domain for the given step using round-robin (based on last_used).
 * Response: { domain: string }
 */
app.get("/api/step-domain", async (req, res) => {
  const step = Number(req.query.step);
  if (!step || Number.isNaN(step) || step < 1) {
    return res.status(400).json({ error: "step must be a positive integer" });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Select the least-recently-used active domain for this step.
    const selectSql = `
      WITH candidate AS (
        SELECT id, domain
        FROM step_domains
        WHERE active = true AND step = $1
        ORDER BY last_used NULLS FIRST, id
        LIMIT 1
      ),
      updated AS (
        UPDATE step_domains sd
        SET last_used = NOW()
        FROM candidate c
        WHERE sd.id = c.id
        RETURNING sd.domain
      )
      SELECT domain FROM updated;
    `;

    const { rows } = await client.query(selectSql, [step]);
    await client.query("COMMIT");

    if (!rows.length) {
      return res
        .status(404)
        .json({ error: "No active domains configured for this step" });
    }

    const domain = rows[0].domain;
    return res.json({ domain });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("[step-domain-api] error", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
});

app.get("/healthz", (req, res) => {
  res.json({ ok: true });
});

/**
 * POST /api/init-db
 * Initialize database table (idempotent - safe to call multiple times)
 */
app.post("/api/init-db", async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Create table
    await client.query(`
      CREATE TABLE IF NOT EXISTS step_domains (
        id SERIAL PRIMARY KEY,
        step INT NOT NULL,
        domain TEXT NOT NULL,
        active BOOLEAN DEFAULT TRUE,
        last_used TIMESTAMPTZ
      );
    `);

    // Create index
    await client.query(`
      CREATE INDEX IF NOT EXISTS step_domains_step_idx ON step_domains(step);
    `);

    await client.query("COMMIT");

    return res.json({ 
      success: true, 
      message: "Database initialized successfully" 
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("[step-domain-api] init-db error", error);
    return res.status(500).json({ 
      error: "Failed to initialize database",
      details: error.message 
    });
  } finally {
    client.release();
  }
});

/**
 * POST /api/add-domain
 * Add a domain for a step
 * Body: { step: number, domain: string, active?: boolean }
 */
app.post("/api/add-domain", async (req, res) => {
  const { step, domain, active = true } = req.body;

  if (!step || !domain) {
    return res.status(400).json({ 
      error: "step and domain are required" 
    });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO step_domains (step, domain, active) 
       VALUES ($1, $2, $3) 
       RETURNING id, step, domain, active`,
      [step, domain, active]
    );

    await client.query("COMMIT");

    return res.json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("[step-domain-api] add-domain error", error);
    return res.status(500).json({ 
      error: "Failed to add domain",
      details: error.message 
    });
  } finally {
    client.release();
  }
});

/**
 * GET /api/domains?step=N
 * List all domains for a step (or all if step not provided)
 */
app.get("/api/domains", async (req, res) => {
  const step = req.query.step ? Number(req.query.step) : null;

  const client = await pool.connect();
  try {
    let query = "SELECT id, step, domain, active, last_used FROM step_domains";
    let params = [];

    if (step) {
      query += " WHERE step = $1";
      params.push(step);
    }

    query += " ORDER BY step, id";

    const { rows } = await client.query(query, params);

    return res.json({ domains: rows });
  } catch (error) {
    console.error("[step-domain-api] list-domains error", error);
    return res.status(500).json({ 
      error: "Failed to list domains",
      details: error.message 
    });
  } finally {
    client.release();
  }
});

/**
 * DELETE /api/domain/:id
 * Delete a domain by ID
 */
app.delete("/api/domain/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!id || Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid domain ID" });
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      "DELETE FROM step_domains WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Domain not found" });
    }

    return res.json({ success: true, message: "Domain deleted" });
  } catch (error) {
    console.error("[step-domain-api] delete-domain error", error);
    return res.status(500).json({ 
      error: "Failed to delete domain",
      details: error.message 
    });
  } finally {
    client.release();
  }
});

/**
 * PATCH /api/domain/:id
 * Update domain (toggle active status or change domain/step)
 * Body: { active?: boolean, domain?: string, step?: number }
 */
app.patch("/api/domain/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { active, domain, step } = req.body;

  if (!id || Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid domain ID" });
  }

  const client = await pool.connect();
  try {
    const updates = [];
    const params = [];
    let paramIndex = 1;

    if (active !== undefined) {
      updates.push(`active = $${paramIndex++}`);
      params.push(active);
    }
    if (domain !== undefined) {
      updates.push(`domain = $${paramIndex++}`);
      params.push(domain);
    }
    if (step !== undefined) {
      updates.push(`step = $${paramIndex++}`);
      params.push(step);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    params.push(id);
    const query = `UPDATE step_domains SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING *`;

    const result = await client.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Domain not found" });
    }

    return res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("[step-domain-api] update-domain error", error);
    return res.status(500).json({ 
      error: "Failed to update domain",
      details: error.message 
    });
  } finally {
    client.release();
  }
});

// Admin panel route
app.get("/admin", (req, res) => {
  res.sendFile(path.join(rootDir, "admin.html"));
});

// Fallback to SPA entry for all non-API routes
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).end();
  }
  res.sendFile(path.join(rootDir, "index.html"));
});

app.listen(port, () => {
  console.log(`[step-domain-api] listening on port ${port}`);
});

