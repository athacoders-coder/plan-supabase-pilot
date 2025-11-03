-- Enable required extensions for cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Grant permissions to postgres role for pg_cron
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;

-- Create cron job to call keep-alive function every 6 days
-- This prevents Supabase free tier from auto-pausing after 7 days of inactivity
SELECT cron.schedule(
  'keep-alive-ping',
  '0 0 */6 * *', -- At midnight every 6 days
  $$
  SELECT
    net.http_post(
        url:='https://mzzyqentnmitkgnffgsp.supabase.co/functions/v1/keep-alive',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16enlxZW50bm1pdGtnbmZmZ3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjQ2OTQsImV4cCI6MjA3Nzc0MDY5NH0.GAQEBaUHD2P7J4Bp0hIg5HogQzP14kZfenZGs1EOSjk"}'::jsonb,
        body:=concat('{"time": "', now(), '"}')::jsonb
    ) as request_id;
  $$
);