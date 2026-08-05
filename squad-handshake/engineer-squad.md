<squad_metadata>
  <squad_name>Engineer-Squad</squad_name>
  <current_status>IDLE</current_status>
  <active_task_id></active_task_id>
  <sprint_completion_percentage>94</sprint_completion_percentage>
</squad_metadata>

## Current Focus
TSK-005, TSK-006, TSK-007, TSK-015, TSK-009, TSK-016, and TSK-011 are all merged to `main`. Only
TSK-008 (PR #7, AI check-in summarization/risk/draft-reply, includes TSK-017's footer fix) is
still open. TSK-010 (dashboard UI) stays blocked until PR #7 merges — that's the only remaining
Engineer-Squad-buildable item not already shipped or in flight. TSK-012/013/014 are QA-Squad
tasks. TSK-018 is an owner tracking checklist, not directly buildable.

**PM review on PR #7, 2026-08-05:** caught a real bug — `max_tokens: 1024` in
`src/lib/anthropic.ts` was too small to hold Opus 5's default-on adaptive thinking plus the JSON
response, which would have silently produced empty AI analysis on every check-in (the best-effort
try/catch swallowed the resulting error with nothing surfaced anywhere). Fixed same-day: raised
`max_tokens` to 8192, added a `stop_reason === "max_tokens"` check to fail loudly on truncation
instead of hitting the generic "no text content" path, rebased onto latest `main`, re-pushed
(commit 2a52ea7), replied on the PR. Worth noting for future Claude API work in this repo: Opus 5
thinking is on by default and shares the `max_tokens` budget with the response — budget
generously.

Idle, waiting on PR #7 re-review. Will pick up TSK-010 the moment it merges.

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
* PR #7: https://github.com/GRITui/grit-self-improvement/pull/7 — TSK-008 AI check-in
  summarization/risk-flag/draft-reply via Claude (claude-opus-5, structured JSON output), plus
  TSK-017's "Powered by GritDesk" -> "FollowThru" footer fix as a second commit. Status: **open**
  (max_tokens fix pushed 2026-08-05 per PM review, see note above).
* PR #8: https://github.com/GRITui/grit-self-improvement/pull/8 — TSK-016 coach-facing check-in
  cadence & questions editor on /dashboard/clients (add/remove/reorder up to 5 questions, cadence
  select). No migration — reuses TSK-007's clients.cadence/questions columns. Status: **merged**.
* PR #9: https://github.com/GRITui/grit-self-improvement/pull/9 — TSK-011 marketing landing page:
  hero, how-it-works, feature highlights, pricing table sourced from lib/billing.ts's PLAN_TIERS.
  Status: **merged**.
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
(none yet)

## Cross-Squad Requests
* **From UX-UI-Designer-Squad, re: TSK-007 — resolved.** Expired/invalid check-in token behavior:
  went with a neutral "no longer active" message, no self-service regeneration, documented as a
  default in PR #4's description for PM to override if a different behavior is wanted.
* Raised TSK-016 in backlog-inbox.md (coach-facing UI to configure check-in cadence/questions per
  client) — gap discovered while building TSK-007; no existing task owned it. Not a blocker for
  TSK-007, which ships with DB-level defaults.
