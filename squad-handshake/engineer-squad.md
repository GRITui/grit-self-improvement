<squad_metadata>
  <squad_name>Engineer-Squad</squad_name>
  <current_status>IDLE</current_status>
  <active_task_id>none</active_task_id>
  <sprint_completion_percentage>100</sprint_completion_percentage>
</squad_metadata>

## Current Focus
**2026-08-06 check-in: confirmed PR #11 still blocked, no change.** Re-checked PR #11's Vercel
status directly — still `failure`, same root cause (missing Stack Auth env vars on Vercel), as of
04:54 UTC. TSK-021 explicitly depends on TSK-020 landing (needs the new auth's actual user-ID
shape), and TSK-020 isn't merged yet — building TSK-021 against an unmerged, potentially-changing
PR #11 branch would be premature and risks duplicate/conflicting work with whichever session owns
that PR. Since the blocker is an owner action (Vercel env vars), not something more engineering
work resolves, going idle rather than forcing a pickup. Will re-check on the next scheduled
check-in for either PR #11 merging or the block clearing.

**2026-08-06: TSK-020 done, PR #11 open for PM review.** Replaced Supabase Auth (email/password +
Google OAuth, `@supabase/ssr` session cookies, `src/proxy.ts`/`src/lib/supabase/middleware.ts`) with
Neon Auth (Stack Auth SDK), per TSK-019's default recommendation. This squad session was spawned
autonomously by PM per the new owner directive; going IDLE now that the PR is open — see PR #11
below for full details, and TSK-019/backlog-inbox.md for the epic's remaining sub-tasks (TSK-021
through TSK-024) if another squad session picks this repo up next.

**Worth flagging for PM review and for whoever picks up TSK-021 next:**
- **SDK API verified from the installed package's actual `.d.ts` files**, not from training-data
  recall — I installed `@stackframe/stack` and read `node_modules/@stackframe/stack/dist/**/*.d.ts`
  directly to confirm method signatures (`signInWithCredential`, `signInWithOAuth`, `getUser`,
  `StackProvider`, `StackHandler`, the env var names it auto-reads, etc.) before writing app code
  against them. `npm run build` (with placeholder Stack/Supabase env vars, since no live credentials
  exist in this environment) confirms the code compiles and type-checks against the real SDK, not
  just against my assumptions about its shape.
- **Deploy-ordering risk, needs the owner's attention before merge:** unlike the old Supabase
  clients (constructed lazily, per-request), `StackServerApp` validates its required env vars
  *eagerly at module load*, and it's imported by the root layout — in the require path for every
  page. If `NEXT_PUBLIC_STACK_PROJECT_ID` / `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` /
  `STACK_SECRET_SERVER_KEY` aren't set on Vercel, **the build itself will fail**, not deploy-then-500
  like the earlier missing-Supabase-env-var incident. The owner needs a Neon Auth (or standalone
  Stack Auth) project set up and those three vars on Vercel before this merges, or the deploy fails
  outright. Full setup steps are in the rewritten `supabase/README.md` §1.
  **2026-08-06, PM confirmed via Vercel build logs:** this predicted failure is exactly what
  happened — PR #11's Vercel preview build fails at `src/lib/auth/stack.ts:15` with Stack Auth's
  own "you haven't provided a project ID" error, nothing else wrong. PM commented on the PR and
  pushed this to the owner directly as an action item. **Do not merge until the preview build is
  green** — merging now would break the *production* build (main auto-deploys), not just fail a
  preview.
- **I fixed the RLS-authorization gap this auth swap creates, rather than leaving it for TSK-021.**
  `coaches`/`clients`/`checkins` still live in Supabase Postgres (TSK-021 moves them to Neon), and
  Supabase RLS gates everything on `auth.uid()` — a claim only Supabase's own auth issues. The
  moment Supabase Auth is gone, `auth.uid()` is always null under a Neon Auth session, so every
  RLS-protected read/write would've silently returned nothing. Added `src/lib/supabase/data.ts`
  (service-role client) with an explicit `coach_id`/ownership filter at every call site that
  previously relied on RLS alone — more than the two files TSK-021's own description called out
  (`updateClient`/`updateProgram`/`removeClient`); the dashboard client list, the clients list page,
  and the check-in reply update were *also* relying on RLS alone with no filter at all. TSK-021 can
  treat this audit as largely done and focus on the Neon/Drizzle client-library swap itself.
- Coach row creation moved from the old `on_auth_user_created` Postgres trigger (which fired on
  Supabase's own `auth.users` table — nothing left to trigger off of once Neon Auth stops writing
  into this database) to app code: `ensureCoachRow()` in `src/lib/auth/session.ts`, called from the
  new `src/app/dashboard/layout.tsx` on every authenticated request, idempotent via upsert.
- `supabase/README.md` rewritten in place (not renamed) as the transitional auth+DB setup doc, since
  `supabase/migrations/` is still the DB source of truth until TSK-021 lands. Flagged explicitly as
  transitional in the file itself — TSK-024 replaces it outright once TSK-021-023 are done.

PR #10 (TSK-010, coach dashboard UI) is merged — the owner merged it directly on GitHub
(merge commit 4588e0b) rather than through the usual squad-PR-to-PM-review flow. PM did a
post-hoc review same-day: no issues found, correctly follows the established RLS-scoped-write
pattern. Nothing to act on there.

**Every task through TSK-018 is now done.** Next pickup should be the TSK-019 epic's sub-tasks
(TSK-020 through TSK-024, Neon migration) — see below, unchanged from last cycle.

**New, 2026-08-05: owner has wired the project to Neon Postgres and wants a full migration off
Supabase (database + auth + RLS), not just a connection-string swap.** This surfaced after prod
threw `Internal Server Error` on every request — root cause was `NEXT_PUBLIC_SUPABASE_URL`/
`NEXT_PUBLIC_SUPABASE_ANON_KEY` never being set on the live Vercel deployment (this repo is
apparently auto-deploying `main` to a real production Vercel project owner set up independently —
worth knowing going forward: pushes to `main` are live, not just CI). Seeded as an epic, TSK-019,
broken into buildable sub-tasks TSK-020 (auth replacement) through TSK-024 (docs/env cleanup) —
see backlog-inbox.md for full scope, dependency order, and a security note on TSK-021 (RLS today
is the *only* enforcement on several write paths; that needs an explicit replacement, not just a
client-library swap). PM recommends letting PR #10 land first so the migration touches a stable
feature set, but that's not a hard gate. TSK-012/013/014 are QA-Squad tasks; TSK-018 is an owner
tracking checklist.

**Note: this repo now has an automated check.** PR #10 is the first PR here to get a Vercel
preview-deploy status check (owner/PM must have wired this up, likely part of TSK-018's checklist)
— it went green. Future PRs should expect this check to run; watch for it going red as real CI
signal, not just local lint/build.

**PM review on PR #7, 2026-08-05 (worth remembering for future Claude API work in this repo):**
caught a real bug — `max_tokens: 1024` in `src/lib/anthropic.ts` was too small to hold Opus 5's
default-on adaptive thinking plus the JSON response, which would have silently produced empty AI
analysis on every check-in (the best-effort try/catch swallowed the resulting error with nothing
surfaced anywhere). Fixed same-day (commit 2a52ea7): raised `max_tokens` to 8192, added a
`stop_reason === "max_tokens"` check to fail loudly on truncation. Re-reviewed and merged (squash
commit f6d6b29). **Takeaway: Opus 5 thinking is on by default and shares the `max_tokens` budget
with the response — budget generously on any new Claude API call in this repo, and consider
explicitly branching on `stop_reason` rather than assuming "no text block" means one specific
failure mode.**

**Owner decision 2026-08-05: product renamed "GritDesk" -> "FollowThru"** (TSK-001) — carried
into app code via TSK-015/PR #5, merged.

**PM note on PR #6 (TSK-009):** it hit a real merge conflict against main (package.json/
package-lock.json from PR #5's rebrand, and a src/lib/types.ts conflict against PR #4's new
`PublicCheckinClient` type both landing in the same file). PM resolved it manually (both type
additions kept, deps reinstalled, lint/build reverified) rather than sending it back — flagging
so future squads know conflicts get resolved during review when trivial/additive, not
auto-rejected. If you rebase onto latest main before opening a PR, this is easy to avoid going
forward.

## Recent Commits / PRs
* PR #11: https://github.com/GRITui/grit-self-improvement/pull/11 — TSK-020 Neon Auth migration:
  replaces Supabase Auth (email/password + Google OAuth + session cookies + `/dashboard/*` route
  protection) with Neon Auth (Stack Auth SDK). Adds `src/lib/auth/*` (Stack app config, session
  helpers, sign-out action, middleware), `src/app/handler/[...stack]` (required Stack catch-all
  route), rewrites login/signup pages + GoogleButton as client components against `useStackApp()`.
  Adds `src/lib/supabase/data.ts` (service-role client with explicit `coach_id` filters, replacing
  RLS which can no longer authenticate Neon Auth sessions) and a migration dropping the old
  `auth.users` trigger/FK. Rewrites `supabase/README.md` and `.env.example`. `npm run lint`/
  `npm run build` verified (build needs placeholder env vars locally, same as any prior PR here with
  no live credentials — see PR description for the deploy-ordering note before merge). Status:
  **open, blocked on owner** — Vercel preview build fails (confirmed via build logs, 2026-08-06)
  exactly as the PR predicted: missing Stack Auth env vars on Vercel. PM commented on the PR;
  code review otherwise looks correct on a read-through, will finish once it deploys clean.
* PR #10: https://github.com/GRITui/grit-self-improvement/pull/10 — TSK-010 coach dashboard UI:
  /dashboard is now the risk-sorted client list (streak/last-check-in/risk badge),
  /dashboard/clients/[id] is the drill-in (check-in history, AI summary, editable reply seeded
  from TSK-008's draft). New checkins.coach_reply/reply_sent_at + coach-scoped UPDATE RLS policy.
  "Send Reply" implemented as "Save reply" (persists only) since no outbound-delivery integration
  exists yet — see engineer_notes on TSK-010 in backlog-inbox.md. Status: **merged** (by owner
  directly, merge commit 4588e0b; PM post-hoc review 2026-08-05 found no issues).
* PR #7: https://github.com/GRITui/grit-self-improvement/pull/7 — TSK-008 AI check-in
  summarization/risk-flag/draft-reply via Claude (claude-opus-5, structured JSON output), plus
  TSK-017's "Powered by GritDesk" -> "FollowThru" footer fix as a second commit. Status:
  **merged** (PM re-review 2026-08-05 after the max_tokens fix, squash commit f6d6b29).
* PR #8: https://github.com/GRITui/grit-self-improvement/pull/8 — TSK-016 coach-facing check-in
  cadence & questions editor on /dashboard/clients (add/remove/reorder up to 5 questions, cadence
  select). No migration — reuses TSK-007's clients.cadence/questions columns. Status: **merged**
  (PM review 2026-08-05, squash commit 5bf9cb3).
* PR #9: https://github.com/GRITui/grit-self-improvement/pull/9 — TSK-011 marketing landing page:
  hero, how-it-works, feature highlights, pricing table sourced from lib/billing.ts's PLAN_TIERS.
  Status: **merged** (PM review 2026-08-05, squash commit 2185adb).
* PR #2: https://github.com/GRITui/grit-self-improvement/pull/2 — TSK-005 scaffold Next.js +
  Supabase + Tailwind with coach auth (email/password + Google OAuth), coaches table + RLS
  migration. Status: **merged** (PM review 2026-08-05, squash commit 8b86130).
* PR #3: https://github.com/GRITui/grit-self-improvement/pull/3 — TSK-006 client roster CRUD +
  tokenized invite link, clients table + RLS migration, applied TSK-003 design tokens to new UI
  (ported to Tailwind v4 syntax). Status: **merged** (PM review 2026-08-05, squash commit
  9958bc8).
* PR #4: https://github.com/GRITui/grit-self-improvement/pull/4 — TSK-007 public client check-in
  flow: checkins table + SECURITY DEFINER functions for anonymous token-scoped access, cadence/
  questions on clients, coaches.full_name for the check-in page header. Status: **merged**
  (PM review 2026-08-05, squash commit 03ce213).
* PR #5: https://github.com/GRITui/grit-self-improvement/pull/5 — TSK-015 rebrand app code/UI
  "GritDesk" -> "FollowThru" (package.json, page metadata, home/login/signup copy). Status:
  **merged** (PM review 2026-08-05, squash commit 5268ade).
* PR #6: https://github.com/GRITui/grit-self-improvement/pull/6 — TSK-009 Stripe subscription
  billing + plan gating: coaches billing columns, Stripe webhook handler, /dashboard/billing,
  gating wired into TSK-006's addClient. Status: **merged** (PM review 2026-08-05, squash commit
  cbf8f14, after PM manually resolved a merge conflict — see note above).

## Blockers & QA Failures
(none — PR #7's max_tokens issue is resolved and merged; see Current Focus above)

## Cross-Squad Requests
* **From UX-UI-Designer-Squad, re: TSK-007 — resolved.** Expired/invalid check-in token behavior:
  went with a neutral "no longer active" message, no self-service regeneration, documented as a
  default in PR #4's description for PM to override if a different behavior is wanted.
* Raised TSK-016 in backlog-inbox.md (coach-facing UI to configure check-in cadence/questions per
  client) — gap discovered while building TSK-007; no existing task owned it. Not a blocker for
  TSK-007, which ships with DB-level defaults.
