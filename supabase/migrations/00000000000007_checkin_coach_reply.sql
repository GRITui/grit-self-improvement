-- Coach dashboard drill-in (TSK-010): a coach can save their finalized reply
-- (pre-filled from TSK-008's AI draft_reply, editable) against a check-in.
-- This is a real coach session, not an anonymous submitter, so writes go
-- through a normal RLS policy scoped to the coach who owns the client --
-- unlike TSK-008's AI-analysis write, which had to use the service-role
-- client because there was no coach session to scope to.

alter table public.checkins
  add column if not exists coach_reply text,
  add column if not exists reply_sent_at timestamptz;

create policy "Coaches can update checkins for their own clients"
  on public.checkins for update
  using (
    exists (
      select 1 from public.clients c
      where c.id = checkins.client_id and c.coach_id = auth.uid()
    )
  );
