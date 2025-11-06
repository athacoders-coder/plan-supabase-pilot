-- Unschedule existing keep-alive job if exists (ignore error if doesn't exist)
DO $$
BEGIN
  PERFORM cron.unschedule('keep-alive-every-6-hours');
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- Schedule keep-alive function to run every 6 hours
SELECT cron.schedule(
  'keep-alive-every-6-hours',
  '0 */6 * * *',
  $$
  SELECT
    net.http_post(
        url:='https://mzzyqentnmitkgnffgsp.supabase.co/functions/v1/keep-alive',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16enlxZW50bm1pdGtnbmZmZ3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjQ2OTQsImV4cCI6MjA3Nzc0MDY5NH0.GAQEBaUHD2P7J4Bp0hIg5HogQzP14kZfenZGs1EOSjk"}'::jsonb,
        body:=concat('{"time": "', now(), '"}')::jsonb
    ) as request_id;
  $$
);