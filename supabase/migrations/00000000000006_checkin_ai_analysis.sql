-- AI check-in summarization, risk flag, and drafted reply (TSK-008).
-- Populated server-side after a check-in is submitted (see
-- src/app/checkin/[token]/actions.ts) via the service-role client, since
-- the anonymous submitter has no direct write access to these columns.
-- draft_reply is only ever stored here for the coach to review/edit/send
-- from the dashboard (TSK-010) -- nothing in this codebase sends it
-- automatically.

alter table public.checkins
  add column if not exists ai_summary text,
  add column if not exists risk_level text
    check (risk_level in ('LOW', 'MEDIUM', 'HIGH')),
  add column if not exists draft_reply text,
  add column if not exists ai_processed_at timestamptz;
