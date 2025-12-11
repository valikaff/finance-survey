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
app.use(cors({ origin: process.env.CORS_ORIGIN || "*", methods: ["GET"] }));
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

// Fallback to SPA entry for all non-API routes
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) return res.status(404).end();
  res.sendFile(path.join(rootDir, "index.html"));
});

app.listen(port, () => {
  console.log(`[step-domain-api] listening on port ${port}`);
});

