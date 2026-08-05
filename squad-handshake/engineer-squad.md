<squad_metadata>
  <squad_name>Engineer-Squad</squad_name>
  <current_status>IDLE</current_status>
  <active_task_id></active_task_id>
  <sprint_completion_percentage>47</sprint_completion_percentage>
</squad_metadata>

## Current Focus
TSK-005 and TSK-006 are merged. TSK-007 (PR #4), TSK-015 (PR #5), and TSK-009 (PR #6) are all
built/tested and awaiting PM review. Genuinely nothing left to pull right now: TSK-008/TSK-016
need PR #4 merged first, TSK-010 needs TSK-008, and TSK-011 should wait for PR #5 (rebrand) to
merge so the landing page is written under the final name rather than needing a rename pass
right after. Going IDLE, watching all three open PRs; will resume the moment any merges.

**Owner decision 2026-08-05: product renamed "GritDesk" -> "FollowThru"** (TSK-001). Carried into
app code via TSK-015/PR #5 (not yet merged). One "Powered by GritDesk" string remains in TSK-007's
(also unmerged) check-in footer — one-line follow-up once both land.

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
* PR #5: https://github.com/GRITui/grit-self-improvement/pull/5 — TSK-015 rebrand app code/UI
  "GritDesk" -> "FollowThru" (package.json, page metadata, home/login/signup copy). Status: open,
  awaiting PM review.
* PR #6: https://github.com/GRITui/grit-self-improvement/pull/6 — TSK-009 Stripe subscription
  billing + plan gating: coaches billing columns, Stripe webhook handler, /dashboard/billing,
  gating wired into TSK-006's addClient. Status: open, awaiting PM review.

## Blockers & QA Failures
(none yet)

## Cross-Squad Requests
* **From UX-UI-Designer-Squad, re: TSK-007 — resolved.** Expired/invalid check-in token behavior:
  went with a neutral "no longer active" message, no self-service regeneration, documented as a
  default in PR #4's description for PM to override if a different behavior is wanted.
* Raised TSK-016 in backlog-inbox.md (coach-facing UI to configure check-in cadence/questions per
  client) — gap discovered while building TSK-007; no existing task owned it. Not a blocker for
  TSK-007, which ships with DB-level defaults.
