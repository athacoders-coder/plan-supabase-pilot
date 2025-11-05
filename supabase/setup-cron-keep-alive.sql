-- Enable pg_cron and pg_net extensions if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Unschedule existing keep-alive job if exists
SELECT cron.unschedule('keep-alive-every-6-hours');

-- Schedule keep-alive function to run every 6 hours
SELECT cron.schedule(
  'keep-alive-every-6-hours',
  '0 */6 * * *', -- At minute 0 past every 6th hour (00:00, 06:00, 12:00, 18:00)
  $$
  SELECT
    net.http_post(
        url:='https://mzzyqentnmitkgnffgsp.supabase.co/functions/v1/keep-alive',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16enlxZW50bm1pdGtnbmZmZ3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjQ2OTQsImV4cCI6MjA3Nzc0MDY5NH0.GAQEBaUHD2P7J4Bp0hIg5HogQzP14kZfenZGs1EOSjk"}'::jsonb,
        body:=concat('{"time": "', now(), '"}')::jsonb
    ) as request_id;
  $$
);

-- Verify the cron job was created
SELECT * FROM cron.job WHERE jobname = 'keep-alive-every-6-hours';
