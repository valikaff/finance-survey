-- Create table for step domains
CREATE TABLE IF NOT EXISTS step_domains (
  id SERIAL PRIMARY KEY,
  step INT NOT NULL,
  domain TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  last_used TIMESTAMPTZ
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS step_domains_step_idx ON step_domains(step);

-- Example: Add domains for steps 1-6
-- Replace these with your actual domains
INSERT INTO step_domains(step, domain, active) VALUES
(1, 'https://finance-survey-v2-0.onrender.com', true),
(1, 'https://your-second-domain.com', true),
(2, 'https://finance-survey-v2-0.onrender.com', true),
(2, 'https://your-second-domain.com', true),
(3, 'https://finance-survey-v2-0.onrender.com', true),
(3, 'https://your-second-domain.com', true),
(4, 'https://finance-survey-v2-0.onrender.com', true),
(4, 'https://your-second-domain.com', true),
(5, 'https://finance-survey-v2-0.onrender.com', true),
(5, 'https://your-second-domain.com', true),
(6, 'https://finance-survey-v2-0.onrender.com', true),
(6, 'https://your-second-domain.com', true)
ON CONFLICT DO NOTHING;

-- Check what was inserted
SELECT step, domain, active FROM step_domains ORDER BY step, id;

