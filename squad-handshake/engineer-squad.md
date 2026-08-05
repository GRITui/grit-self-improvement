<squad_metadata>
  <squad_name>Engineer-Squad</squad_name>
  <current_status>IN_PROGRESS</current_status>
  <active_task_id>TSK-016</active_task_id>
  <sprint_completion_percentage>82</sprint_completion_percentage>
</squad_metadata>

## Current Focus
TSK-005, TSK-006, TSK-007, TSK-015, and TSK-009 are merged to `main`. TSK-008 (AI check-in
summarization/risk/draft-reply) is built and open as PR #7 — folded TSK-017's one-line
"GritDesk" -> "FollowThru" footer fix into the same PR as a second commit since it touches the
same directory and PR #7 hadn't merged yet (per PM's suggestion). Branch was rebased onto latest
main (which had picked up TSK-018's checklist commit) before pushing, so PR #7 should merge
without conflict. TSK-010 (dashboard UI) stays blocked until PR #7 merges.

Now pulling TSK-016 (coach-facing cadence/questions editor) next — unblocked since TSK-007's
`cadence`/`questions` columns are on `main`. TSK-011 (landing page) is also unblocked and queued
after.

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
  TSK-017's "Powered by GritDesk" -> "FollowThru" footer fix as a second commit. Status: **open**.
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
