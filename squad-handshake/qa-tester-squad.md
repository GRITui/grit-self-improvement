<squad_metadata>
  <squad_name>QA-Tester-Squad</squad_name>
  <current_status>IDLE</current_status>
  <active_task_id>none</active_task_id>
  <sprint_completion_percentage>100</sprint_completion_percentage>
</squad_metadata>

## Current Focus
**2026-08-06: TSK-012 (QA pass: auth & client roster) done — result: PASS on both items.**

**Methodology note — this was a code-level review, not a live runtime test.** No Supabase
credentials/database are available in this environment, so signup/login/OAuth/CRUD could not be
clicked through against a real deployment. Per the established pattern for this repo (see
Engineer-Squad's TSK-009/TSK-020 notes), everything below is read-through-the-actual-implementation
verification: does the described behavior exist in code, is authorization correctly scoped at the
DB level, are there logic bugs. This is lower-confidence than a real runtime pass — flag for
re-verification if/when live credentials become available (TSK-014's handshake note makes the same
ask for billing).

**Scope check:** confirmed on `main` (commit 6244355 at pull time) that TSK-005/TSK-006 are merged
and that the open PR #11 (Neon Auth migration, per Engineer-Squad's handshake) is unmerged — so
`main`'s auth is still Supabase Auth via `@supabase/ssr`, which is what this pass tested. Did not
open, read for review purposes, or comment on PR #11 — out of scope per PM instruction.

### Item 1 — Coach signup/login (email+password, Google OAuth): PASS

- **Email/password signup** (`src/app/signup/actions.ts`, `src/app/signup/page.tsx`): server action
  validates password length (>=8, matches the `minLength={8}` client-side hint), calls
  `supabase.auth.signUp` with `emailRedirectTo` pointed at `/auth/callback`, surfaces Supabase's own
  error message on failure, shows a "check your email" success state otherwise. Matches spec.
- **Email/password login** (`src/app/login/actions.ts`, `src/app/login/page.tsx`):
  `signInWithPassword`, redirects to `/dashboard` on success, surfaces the error inline otherwise.
  Matches spec.
- **Google OAuth** (`src/components/auth/google-button.tsx` -> `src/lib/supabase/actions.ts`
  `signInWithGoogle` -> `src/app/auth/callback/route.ts`): `signInWithOAuth({provider: "google"})`
  redirects to Supabase's hosted OAuth flow with `redirectTo` back to `/auth/callback`; the callback
  route does `exchangeCodeForSession(code)` and redirects to `/dashboard` on success or back to
  `/login?error=...` on failure, which the login page renders via a `Suspense`-wrapped
  `useSearchParams` reader. Button is present on both login and signup pages. Structurally correct
  PKCE flow; the actual OAuth handshake (Google Cloud console config, Supabase provider config) is
  Supabase-dashboard-side setup this review can't verify without credentials.
- **Coach row provisioning:** `supabase/migrations/00000000000001_coaches.sql` +
  `00000000000004_coach_display_name.sql` — a `SECURITY DEFINER` trigger
  (`handle_new_coach`/`on_auth_user_created`) inserts into `public.coaches` on every `auth.users`
  insert, so both signup paths (password and OAuth) get a coach row automatically, with
  `full_name` best-effort backfilled from OAuth profile data and falling back to null for
  password signups (by design — the signup form doesn't collect a name; the public check-in page
  falls back to the generic label "Your coach", see Item 2 below). No race condition on `main`
  since this runs as a DB trigger in the same transaction as the `auth.users` insert (the app-code
  `ensureCoachRow()` workaround only exists in the unmerged PR #11, where it's needed because Neon
  Auth doesn't write to a table this repo's DB can trigger off of — not applicable to `main`).
- **Route protection:** `src/proxy.ts` -> `src/lib/supabase/middleware.ts` gates every
  `/dashboard*` path, redirecting unauthenticated requests to `/login?next=<original path>`. Every
  individual dashboard page (`clients/page.tsx`, `clients/[id]/page.tsx`) also independently checks
  `supabase.auth.getUser()` and redirects if absent — correct defense-in-depth, not just relying on
  the middleware.
- **Coach data isolation:** `coaches` RLS policies scope select/update to `auth.uid() = id`. Coach
  can only ever see/edit their own profile row.

No bugs found in this item. No TODO/FIXME markers in any of the reviewed files.

### Item 2 — Client roster: add/invite clients, generate tokenized check-in link: PASS

- **Add client** (`src/app/dashboard/clients/actions.ts` `addClient`): requires an authenticated
  session (`requireCoachId()`, redirects to `/login` if absent), inserts with
  `coach_id: coachId` taken from the session user's own ID (never client-supplied), and enforces
  the plan's active-client limit before insert (correctly scoped to TSK-009/section 4's tiering,
  out of this task's core scope but confirmed not broken).
- **Invite-link generation:** `clients.invite_token` (`supabase/migrations/00000000000002_clients.sql`)
  defaults to `encode(gen_random_bytes(16), 'hex')` — a 128-bit cryptographically random token —
  with a `unique` index, so tokens can't collide or be predicted. `ClientRow` builds the link as
  `${checkinBaseUrl}/checkin/${client.invite_token}` and exposes a working "Copy link" button.
  Matches spec ("generate tokenized check-in link").
- **No client login required:** `src/app/checkin/[token]/page.tsx` is not under `/dashboard` (so
  the auth middleware doesn't touch it) and never calls `supabase.auth.getUser()`. It resolves the
  token via `get_client_by_invite_token`, a `SECURITY DEFINER` Postgres function
  (`supabase/migrations/00000000000003_checkins.sql`, widened by
  `00000000000004_coach_display_name.sql` to also return the coach's display name) granted to the
  `anon` role — confirms the public check-in page genuinely needs no auth, as item 4 of the same
  section requires and as this link only exists to serve.
- **Authorization scoping on client CRUD (edit/remove/program-config):**
  `clients` RLS policies (`00000000000002_clients.sql`) scope select/insert/update/delete to
  `auth.uid() = coach_id`. Verified this actually holds at the query level too:
  `clients/[id]/page.tsx` fetches by `.eq("id", id).single()` with no explicit coach filter — if
  the id belongs to another coach, RLS returns zero rows, `client` is `null`, and the page correctly
  calls `notFound()`. Confirmed a coach cannot view or edit another coach's client by guessing/
  changing the URL id.
- **Note (non-blocking):** `updateClient`, `updateProgram`, `removeClient`
  (`clients/actions.ts`) and `saveCoachReply` (`clients/[id]/actions.ts`) all issue their
  `.update()` calls filtered only by the row's own `id`, relying entirely on RLS
  (`auth.uid() = coach_id`, or the equivalent join-based policy on `checkins`) to scope the write to
  the calling coach — there's no explicit `.eq("coach_id", coachId)` in the app-code query itself.
  This is safe today under Supabase Auth + RLS (confirmed the relevant RLS policies exist and are
  correctly scoped, per above), but it is exactly the gap Engineer-Squad already identified and
  fixed for the pending Neon Auth migration (PR #11's `src/lib/supabase/data.ts`, per their
  handshake notes) — flagging here only so it's on record from an independent read, not because
  it's an open issue on `main` today. No action needed from QA on this task.

No bugs found in this item.

### Result summary

| Item | Behavior | Result |
|---|---|---|
| 1 | Coach signup (email+password) | PASS |
| 1 | Coach login (email+password) | PASS |
| 1 | Google OAuth signup/login | PASS (code-level; OAuth provider config unverifiable without credentials) |
| 1 | `/dashboard` route protection + per-coach data isolation | PASS |
| 2 | Add/invite client, scoped to calling coach, plan-limit enforced | PASS |
| 2 | Tokenized invite-link generation (unique, unguessable) | PASS |
| 2 | Public check-in page reachable with no client login | PASS |
| 2 | Client CRUD authorization (coach can't see/edit others' clients) | PASS |

## Recent Commits / PRs
* This handshake update (direct commit to `main`, coordination file per PM_CHARTER — no PR
  needed, no app code touched).

## Blockers & QA Failures
(none — TSK-012 passed code-level review on both items; see Current Focus above for the
caveat that this is not yet runtime-verified against a live Supabase instance)

## Cross-Squad Requests
(none)
