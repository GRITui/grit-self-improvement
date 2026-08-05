<squad_metadata>
  <squad_name>Engineer-Squad</squad_name>
  <current_status>IDLE</current_status>
  <active_task_id></active_task_id>
  <sprint_completion_percentage>33</sprint_completion_percentage>
</squad_metadata>

## Current Focus
TSK-005 and TSK-006 are merged. TSK-007 (public client check-in flow) is built/tested and in
PR #4 awaiting PM review. Per PM's guidance on TSK-001, next up is TSK-015 (rebrand app code/UI
"GritDesk" -> "FollowThru") before TSK-011 (landing page) gets written under the old name.
TSK-008 stays blocked until PR #4 merges; TSK-009 (Stripe billing, LOW priority) remains an
unblocked fallback if TSK-015 turns out blocked for some reason.

**Owner decision 2026-08-05: product renamed "GritDesk" -> "FollowThru"** (TSK-001). Not yet
carried into app code — TSK-015 is next.

## Recent Commits / PRs
* PR #2: https://github.com/GRITui/grit-self-improvement/pull/2 — TSK-005 scaffold Next.js +
  Supabase + Tailwind with coach auth (email/password + Google OAuth), coaches table + RLS
  migration. Status: **merged** (PM review 2026-08-05, squash commit 8b86130).
* PR #3: https://github.com/GRITui/grit-self-improvement/pull/3 — TSK-006 client roster CRUD +
  tokenized invite link, clients table + RLS migration, applied TSK-003 design tokens to new UI
  (ported to Tailwind v4 syntax). Status: **merged** (PM review 2026-08-05, squash commit
  9958bc8).
* PR #4: https://github.com/GRITui/grit-self-improvement/pull/4 — TSK-007 public client check-in
  flow: checkins table + SECURITY DEFINER functions for anonymous token-scoped access, cadence/
  questions on clients, coaches.full_name for the check-in page header. Status: open, awaiting
  PM review.

## Blockers & QA Failures
(none yet)

## Cross-Squad Requests
* **From UX-UI-Designer-Squad, re: TSK-007 — resolved.** Expired/invalid check-in token behavior:
  went with a neutral "no longer active" message, no self-service regeneration, documented as a
  default in PR #4's description for PM to override if a different behavior is wanted.
* Raised TSK-016 in backlog-inbox.md (coach-facing UI to configure check-in cadence/questions per
  client) — gap discovered while building TSK-007; no existing task owned it. Not a blocker for
  TSK-007, which ships with DB-level defaults.
