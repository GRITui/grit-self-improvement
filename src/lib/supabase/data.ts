import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// The coaches/clients/checkins tables still live in Supabase Postgres
// until TSK-021 migrates them to Neon Postgres (TSK-020 only replaces
// *auth*). But now that coach sessions come from Neon Auth instead of
// Supabase Auth, Supabase's Row Level Security policies -- which gate
// everything on `auth.uid()`, a claim only Supabase's own auth issues --
// can no longer authenticate these requests: `auth.uid()` is always null
// under a Neon Auth session, so RLS-protected reads/writes would just
// silently return nothing rather than the coach's data.
//
// createDataClient() uses the service-role key (bypasses RLS entirely) and
// pushes authorization into the application layer instead -- every call
// site is responsible for its own explicit `coach_id` filter. This is the
// same "move authorization into the application layer" TSK-021 was always
// going to need to do when it swaps this client library out for
// Neon/Drizzle (see TSK-021 in backlog-inbox.md); that audit has largely
// been done here already as a side effect of the auth swap; TSK-021 can
// focus on the client-library/hosting change.
//
// This is distinct from src/lib/supabase/admin.ts, which stays scoped to
// its original, narrower purpose (Stripe webhook + AI analysis writes with
// no request/session context at all) so that file's security comment
// keeps being accurate.
export function createDataClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// Anon-key client for the public, tokenized check-in flow
// (src/app/checkin/[token]/*). That flow never used Supabase Auth/RLS in
// the first place -- it calls two SECURITY DEFINER Postgres functions
// (get_client_by_invite_token, submit_checkin) that authorize purely off
// the 128-bit invite token in the URL, so it's unaffected by the auth
// migration. This replaces the old cookie-aware @supabase/ssr client
// (src/lib/supabase/server.ts, removed in TSK-020) with a plain client,
// since no session/cookie handling was ever needed here.
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
