-- TSK-020: Neon Auth (Stack Auth) replaces Supabase Auth as the identity
-- provider. coaches.id no longer maps to this database's own auth.users
-- table -- Neon Auth manages its own user store (synced, when using Neon's
-- integration, into a separate `neon_auth.users_sync` table inside the
-- *Neon* Postgres database, not this Supabase one) and never writes into
-- this Supabase database at all.
--
-- The trigger that used to auto-create a coaches row on auth.users insert
-- has nothing left to fire on, so it's dropped. Row creation is now done
-- by the app itself the first time an authenticated coach is seen -- see
-- ensureCoachRow() in src/lib/auth/session.ts.

drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_coach();

alter table public.coaches drop constraint if exists coaches_id_fkey;

-- The RLS policies below (from 00000000000001_coaches.sql) are left in
-- place rather than dropped. They're unreachable now -- auth.uid() is
-- always null under a Neon Auth session, so these `using (auth.uid() =
-- id)` clauses just make every row invisible/unwritable through this
-- policy path -- but that's a fail-closed no-op, not a fail-open hole, and
-- harmless to leave until TSK-021 revisits RLS wholesale when this table
-- moves to Neon Postgres proper. Application code now enforces coach
-- ownership explicitly instead (see src/lib/supabase/data.ts and its
-- callers) using the service-role key, which bypasses RLS entirely.
