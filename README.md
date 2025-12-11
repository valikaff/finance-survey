# Multi-domain survey flow

### Backend API (Node/Express)
- Start: `PORT=3001 npm run start:server`
- Env vars: Use `DATABASE_URL` (full connection string from Render) OR individual `PGHOST PGPORT PGDATABASE PGUSER PGPASSWORD` (see `env.example`).
- Endpoint: `GET /api/step-domain?step=N` → `{ domain }` (round-robin by `last_used`, only `active=true` rows).
- Health: `GET /healthz`.

#### Suggested schema
```sql
CREATE TABLE IF NOT EXISTS step_domains (
  id SERIAL PRIMARY KEY,
  step INT NOT NULL,
  domain TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  last_used TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS step_domains_step_idx ON step_domains(step);
```

### Frontend changes
- `index.html` now loads module scripts (`generateSurvey.js`, etc.) instead of the bundled `common.js`.
- `generateSurvey.js` fetches `/api/step-domain?step=<nextStep>` and redirects to that domain with all tracking params plus `step=<n>` so the next page starts at the correct step.
- If the API fails, it falls back to the old in-page step rendering.
- Tracking params are built with `createURLSearchParams` to keep `p4/var/z` and related values intact.

### Notes
- For `tabUnderClick`, the new tab is still opened via the existing exit logic, then the main tab redirects to the next-domain step.
- Configure CORS via `CORS_ORIGIN` if the API is hosted separately.

# finance-survey-domain-everystep
