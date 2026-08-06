# Backlog Inbox

Append-only ledger. Add new items at the bottom with the next sequential `TSK-xxx` id. Never
delete or renumber existing items — update `<status>` and add notes in place.

Schema: see `PM_CHARTER.md` / `ai-engineering-loop` skill.

<task_item>
  <id>TSK-001</id>
  <source>OWNER_POPUP</source>
  <status>DONE</status>
  <priority>HIGH</priority>
  <title>Deepen market validation and resolve brand name</title>
  <description>
    PROJECT_BRIEF.md v1 is PM-drafted from web search only (no primary research). Validate the ICP
    and willingness-to-pay claims (r/coaching, r/lifecoach, IndieHackers, coaching Facebook
    groups), and propose 3 brand-name alternatives to "GritDesk"/"Grit" (collision risk with
    multiple existing consumer apps named Grit). Update PROJECT_BRIEF.md sections 1, 3, and 8
    in place with findings; do not rewrite the whole doc.
  </description>
  <researcher_notes>
    Completed 2026-08-05 via desk research (WebSearch: coaching forums/blogs, review sites,
    IndieHackers, app-store/product listings) — not primary interviews. PROJECT_BRIEF.md updated
    in place: Section 1 (differentiation gap corroborated — no found competitor combines AI
    check-in summarization + dropout-risk flag + drafted reply), Section 3 (ICP pain point and
    $20-90+/mo willingness-to-pay corroborated via comparable coaching-software pricing;
    Starter tier undercuts CoachAccountable's equivalent band), Section 8 (brand risk confirmed
    worse than assumed — "Grit" habit tracker has 2.5M+ downloads/~$90K mo revenue; "CoachDesk"
    and "CoachPulse" also collide — 3 alternatives proposed: FollowThru (recommended), Tallyline,
    Coachline, plus a list of rejected names with their collisions).

    Flagging NEEDS_OWNER_REVIEW rather than closing outright because two decisions need the
    owner, not a squad: (1) picking/approving one of the 3 brand-name alternatives (or rejecting
    all three) before Engineer/UX squads build against a name, and (2) the brand-name and
    willingness-to-pay screening here is search-based desk research only — not a formal USPTO
    trademark/domain search, and not primary interviews. Recommend the owner either greenlight a
    name from a quick manual domain/trademark check, or commission the primary-interview pass
    this task's description originally called for before locking scope further.
  </researcher_notes>
  <pm_notes>
    Owner approved "FollowThru" 2026-08-05 (via AskUserQuestion). PROJECT_BRIEF.md renamed
    throughout. App code/UI still says "GritDesk" (TSK-005/TSK-006 predate this decision) — see
    TSK-015 for the rename, tagged for Engineer-Squad. Real trademark/domain check still
    outstanding before public launch; owner's call on timing, not blocking further build-out.
  </pm_notes>
</task_item>

<task_item>
  <id>TSK-002</id>
  <source>OWNER_POPUP</source>
  <status>DONE</status>
  <priority>MEDIUM</priority>
  <title>Draft lightweight GTM plan for post-MVP launch</title>
  <description>
    Where do the first 10 paying coaches come from? Scope a lightweight, low/no-budget GTM plan
    (target communities, launch channels, positioning angle) as a new section appended to
    PROJECT_BRIEF.md. Keep it to one page — this is not a full marketing plan.
  </description>
  <researcher_notes>
    Completed 2026-08-05 via desk research (Reddit self-promo norms, IndieHackers launch patterns,
    coaching Facebook-group landscape, ICF chapter newsletter sponsorships, AppSumo LTD tradeoffs).
    Appended Section 9 to PROJECT_BRIEF.md: positioning angle (lead with the demonstrable AI
    risk-flag wedge, not "another coaching CRM"), 5 ranked low/no-budget channels (Reddit,
    IndieHackers, coaching Facebook groups w/ a lead-magnet tie-in to TSK-001's disengagement-
    signal findings, ICF chapter newsletters, Product Hunt), a first-10-customers white-glove
    tactic, and a note on why AppSumo/LTD listings are deliberately deferred post-launch rather
    than used as a launch-day channel (revenue share + refund-heavy buyer base misaligned with
    recurring B2B pricing pre-PMF). Kept to one section, no PROJECT_BRIEF.md rewrite.
  </researcher_notes>
</task_item>

<task_item>
  <id>TSK-003</id>
  <source>OWNER_POPUP</source>
  <status>DONE</status>
  <priority>HIGH</priority>
  <title>Design tokens & style guide</title>
  <description>
    Define color palette, typography, spacing scale, and component tone for the product (working
    name GritDesk — coordinate with TSK-001's brand-name outcome, don't block on it). Audience is
    professional coaches, not consumer self-help — tone should read credible/B2B, not
    gamified/juvenile. Output as a short design-tokens doc (e.g. `design/tokens.md`) plus a
    Tailwind config snippet Engineer-Squad can drop in directly.
  </description>
  <researcher_notes></researcher_notes>
  <designer_notes>
    Delivered `design/tokens.md` (color palette incl. reserved risk-flag semantic colors,
    typography scale, spacing, radius/elevation, component tone, a11y notes) and
    `design/tailwind.config.snippet.js` (ready-to-merge Tailwind v3 theme.extend block). Neutral
    "ink" + single "brand" teal accent chosen deliberately over consumer-app-style saturated
    palettes; color/token names are brand-agnostic so a TSK-001 rename won't require restructuring.
    Engineer-Squad: merge the snippet into tailwind.config.js during TSK-005 scaffolding.
  </designer_notes>
</task_item>

<task_item>
  <id>TSK-004</id>
  <source>OWNER_POPUP</source>
  <status>DONE</status>
  <priority>HIGH</priority>
  <title>Wireframes: landing page, coach dashboard, client check-in form</title>
  <description>
    Low-fidelity wireframes (can be markdown/ASCII, Figma, or annotated images — whatever this
    squad session can produce and commit as files) for: (1) marketing landing page, (2) coach
    dashboard (client list w/ streak + risk flag), (3) public client check-in page. Depends
    loosely on TSK-003 tokens but do not block — placeholder styling is fine.
  </description>
  <researcher_notes></researcher_notes>
  <designer_notes>
    Delivered ASCII-diagram wireframes (desktop + mobile) as
    `design/wireframes/{landing-page,coach-dashboard,client-checkin}.md`, plus an index README.
    Dashboard sorts clients by risk (High->Low) by default rather than alphabetically. Client
    check-in page is coach-branded, not product-branded, with no login/account UI anywhere,
    matching PROJECT_BRIEF.md §2's zero-friction constraint. Raised one cross-squad request
    (expired-token UX decision for TSK-007) in this file's Cross-Squad Requests section — not a
    blocker for this task. No further READY_FOR_PM items tagged for UX-UI-Designer-Squad as of
    this cycle; squad going IDLE.
  </designer_notes>
</task_item>

<task_item>
  <id>TSK-005</id>
  <source>OWNER_POPUP</source>
  <status>DONE</status>
  <priority>HIGH</priority>
  <title>Scaffold Next.js + Supabase + Tailwind project with coach auth</title>
  <description>
    Scaffold the app at repo root (Next.js App Router, TypeScript, Tailwind). Wire up Supabase
    (Postgres + Auth + RLS). Implement coach signup/login (email+password, Google OAuth). No
    other features yet. This unblocks TSK-006 through TSK-011. See PROJECT_BRIEF.md section 6.
  </description>
  <researcher_notes></researcher_notes>
  <engineer_notes>
    PR opened: https://github.com/GRITui/grit-self-improvement/pull/2 (branch
    squad/engineer-TSK-005-scaffold). Build/lint clean, auth flow smoke-tested against a
    placeholder Supabase project. TSK-006/TSK-009 depend on this — do not pull until this PR is
    merged to main.
  </engineer_notes>
  <pm_notes>
    Reviewed and merged 2026-08-05 (PR #2, squash merge, commit 8b86130). Scoped correctly to
    auth+scaffold only, RLS on `coaches` locks select/update to own row with no insert policy
    (insert only via SECURITY DEFINER trigger — correct default-deny), secrets kept out of git,
    password validated client+server. No CI configured on this repo yet (out of scope for this
    task). TSK-006 and TSK-009 are now unblocked.
  </pm_notes>
</task_item>

<task_item>
  <id>TSK-006</id>
  <source>OWNER_POPUP</source>
  <status>DONE</status>
  <priority>MEDIUM</priority>
  <title>Client roster CRUD + tokenized invite link</title>
  <description>
    Depends on TSK-005 (pull only once that PR is merged to main). Coach can add/edit/remove
    clients and generate a tokenized, no-login check-in link per client. Store clients under RLS
    scoped to the owning coach.
  </description>
  <researcher_notes></researcher_notes>
  <engineer_notes>
    PR opened: https://github.com/GRITui/grit-self-improvement/pull/3 (branch
    squad/engineer-TSK-006-client-roster). Build/lint clean. "Remove" implemented as soft-delete
    (archived_at) to avoid orphaning future check-in history (TSK-007/TSK-008). Also applied
    TSK-003's design tokens to the new UI (ported to Tailwind v4 CSS @theme syntax since the
    design squad's snippet targeted v3's tailwind.config.js) — TSK-005's auth pages still use the
    original zinc palette, flagged as a follow-up, not blocking. TSK-007 depends on this — do not
    pull until this PR is merged to main.
  </engineer_notes>
  <pm_notes>
    Reviewed and merged 2026-08-05 (PR #3, squash merge, commit 9958bc8). All four RLS policies
    correctly scope to `auth.uid() = coach_id`; update/remove actions correctly rely on RLS rather
    than a client-supplied coach_id filter (standard, secure Supabase pattern — a mismatched id
    just no-ops instead of leaking). Invite token is a proper random 128-bit value via pgcrypto.
    TSK-007 and TSK-010 are now unblocked. Note: this task's status came in as
    NEEDS_OWNER_REVIEW from Engineer-Squad, same as TSK-005 — that tag is for owner-level business
    decisions (see TSK-001), not "awaiting PM code review." Left a note in
    squad-handshake/engineer-squad.md to use the PR itself (open, unmerged) as the "awaiting
    review" signal instead.
  </pm_notes>
</task_item>

<task_item>
  <id>TSK-007</id>
  <source>OWNER_POPUP</source>
  <status>DONE</status>
  <priority>MEDIUM</priority>
  <title>Public client check-in flow</title>
  <description>
    Depends on TSK-006. Tokenized, mobile-friendly public page (no auth) where a client answers
    the coach's check-in questions (up to 5, cadence-driven). Store responses linked to the
    client/token, not to a client login.
  </description>
  <researcher_notes></researcher_notes>
  <engineer_notes>
    PR opened: https://github.com/GRITui/grit-self-improvement/pull/4 (branch
    squad/engineer-TSK-007-public-checkin). Build/lint clean. Resolved the UX-UI-Designer-Squad
    cross-squad request on expired/invalid-token behavior: neutral "no longer active" message,
    no self-service regeneration in this PR — flagged in the PR description as a default PM can
    override rather than something I blocked on. clients gained cadence/questions (jsonb, capped
    at 5, defaulted) since no backlog task owns a coach-facing editor for those yet; raised
    TSK-016 for that gap. coaches gained full_name (best-effort from OAuth) since the check-in
    page must lead with the coach's name per the wireframe. TSK-008 depends on this — do not pull
    until this PR is merged to main. (Status intentionally left READY_FOR_PM, not
    NEEDS_OWNER_REVIEW, per PM's note on TSK-006 — the open PR is the "awaiting review" signal.)
  </engineer_notes>
  <pm_notes>
    Reviewed and merged 2026-08-05 (PR #4, squash merge, commit 03ce213). SECURITY DEFINER
    functions correctly used instead of broadening RLS — anonymous access is scoped to exactly
    the client whose 128-bit token they hold, no enumeration surface. `checkins` has no
    insert/update/delete policy for anon/authenticated, so writes only happen through
    `submit_checkin()` — correct default-deny. Accepted the "no self-service token regeneration"
    default; not overriding. Known minor gap, not blocking: `submit_checkin` doesn't validate the
    `answers` jsonb shape against the client's actual configured questions, and the still-stale
    "Powered by GritDesk" footer string (TSK-015 branched before this PR existed) — small
    follow-up, not tracked as a separate task yet. TSK-008 and TSK-016 unblocked.
  </pm_notes>
</task_item>

<task_item>
  <id>TSK-008</id>
  <source>OWNER_POPUP</source>
  <status>DONE</status>
  <priority>MEDIUM</priority>
  <title>AI check-in summarization, risk flag, draft reply</title>
  <description>
    Depends on TSK-007. On new check-in submission, call the Claude API to: summarize the
    response, flag disengagement/dropout risk (enum: LOW/MEDIUM/HIGH), and draft a suggested
    coach reply. Never auto-send the reply — coach must review/edit/send. Store results alongside
    the check-in record.
  </description>
  <researcher_notes></researcher_notes>
  <engineer_notes>
    PR opened: https://github.com/GRITui/grit-self-improvement/pull/7 (branch
    squad/engineer-TSK-008-ai-checkin-analysis). Build/lint clean. Uses claude-opus-5 with
    structured JSON output (output_config.format) for a guaranteed-shape {summary, risk,
    draft_reply} response. AI analysis is best-effort — wrapped in try/catch so a failure never
    blocks check-in submission. draft_reply is stored only; nothing in the codebase sends it
    (satisfies "never auto-send" by construction). Verified the request shape against the real
    Claude API (reaches auth check, not a 400) with a placeholder key; full round trip needs a
    real Supabase + Anthropic project. TSK-010 depends on this — do not pull until this PR is
    merged to main.

    PM review 2026-08-05 caught a real bug: max_tokens: 1024 was too small to hold Opus 5's
    default-on adaptive thinking plus the JSON response, which would have silently produced empty
    AI analysis on every check-in (caught by the best-effort try/catch with no surfaced error).
    Fixed in commit 2a52ea7: raised max_tokens to 8192 and added a stop_reason === "max_tokens"
    check so truncation fails loudly instead of hitting the generic "no text content" path.
    Rebased onto latest main and re-pushed; lint/build still clean.
  </engineer_notes>
  <pm_notes>
    Reviewed 2026-08-05, PR #7 — changes requested, not merged. SECURITY DEFINER boundary and
    never-auto-send constraint are both handled correctly. One specific bug: the request omits
    `thinking`, which defaults to adaptive-on for claude-opus-5 (unlike Opus 4.8/4.7 where
    omitting it meant no thinking), and `max_tokens: 1024` is a hard cap on thinking + response
    text combined — very likely too small once thinking is running, meaning `analyzeCheckin` gets
    no text block, throws, and the try/catch in submitCheckin silently swallows it. Net effect:
    the AI summary/risk-flag/draft-reply — this product's core differentiator — could silently
    never populate for any check-in, with no error surfaced anywhere. Left an inline comment on
    src/lib/anthropic.ts with two fixes (raise max_tokens to ~4096-8192, or explicitly disable
    thinking) and a suggestion to branch on stop_reason === "max_tokens" separately from
    "refusal" so a truncation fails loudly instead of hitting the generic no-text-content path.
    TSK-010 stays blocked until this merges.

    Re-reviewed 2026-08-05 after Engineer-Squad's fix (commit 2a52ea7): max_tokens raised to
    8192, explicit stop_reason === "max_tokens" check added. Correct fix, matches the suggested
    approach. Merged (squash commit f6d6b29). TSK-010 and TSK-017 (footer fix, rode along as this
    PR's second commit) both unblocked/done now.
  </pm_notes>
</task_item>

<task_item>
  <id>TSK-009</id>
  <source>OWNER_POPUP</source>
  <status>DONE</status>
  <priority>LOW</priority>
  <title>Stripe subscription billing + plan gating</title>
  <description>
    Depends on TSK-005. Implement Starter/Pro/Studio tiers per PROJECT_BRIEF.md section 4, 14-day
    trial, and gate active-client count by plan (block adding a new client past the tier limit
    with an upgrade prompt).
  </description>
  <researcher_notes></researcher_notes>
  <engineer_notes>
    PR opened: https://github.com/GRITui/grit-self-improvement/pull/6 (branch
    squad/engineer-TSK-009-stripe-billing). Build/lint clean. Adds coaches.plan/trial_ends_at/
    stripe_customer_id/stripe_subscription_id, a Stripe webhook handler syncing plan from
    checkout/subscription events (needs a new SUPABASE_SERVICE_ROLE_KEY env var — webhook
    requests have no coach session for RLS to key off), a /dashboard/billing page with Checkout +
    billing-portal links, and gating wired into TSK-006's addClient action. Real Stripe Price IDs
    still need to be created and set (STRIPE_PRICE_STARTER/PRO/STUDIO) before checkout works
    end-to-end — documented in supabase/README.md. No live Stripe/Supabase credentials available
    to verify the full checkout-to-gating round trip in this environment.
  </engineer_notes>
  <pm_notes>
    Reviewed and merged 2026-08-05 (PR #6, squash merge, commit cbf8f14) — PR arrived with a
    merge conflict against main (both this branch and PR #5's rebrand touched
    package.json/package-lock.json, and this branch and PR #4's checkin work both added a new
    type to src/lib/types.ts). Resolved manually: merged origin/main into the PR branch, kept
    both additive type definitions in src/lib/types.ts (no logic conflict, just two features
    landing in the same file), reinstalled deps, reran `npm run lint`/`npm run build` clean, force
    push not needed — pushed as a merge commit to the PR branch, then merged via squash. Webhook
    signature verification present (`stripe.webhooks.constructEvent`), admin/service-role client
    scoped only to the webhook handler with a documented rationale, checkout/portal actions tied
    to the authenticated coach's own `stripe_customer_id` — no cross-account access surface. Minor
    non-blocking notes for a later pass: `checkout.session.completed` falls back to `"trialing"`
    if `planIdFromPriceId` can't map the price (only hit if Stripe Price env vars are
    misconfigured), the plan-limit check in `addClient` has a small TOCTOU race under concurrent
    requests, and the client limit error is plain text rather than a link to /dashboard/billing.
    None block MVP. TSK-014 (QA: billing & plan gating) is now unblocked.
  </pm_notes>
</task_item>

<task_item>
  <id>TSK-010</id>
  <source>OWNER_POPUP</source>
  <status>DONE</status>
  <priority>MEDIUM</priority>
  <title>Coach dashboard UI</title>
  <description>
    Depends on TSK-006 and TSK-008. Client list view: streak, last check-in date, risk flag badge.
    Drill-in to a single client's check-in history and AI summaries/drafted replies.
  </description>
  <researcher_notes></researcher_notes>
  <engineer_notes>
    PR opened: https://github.com/GRITui/grit-self-improvement/pull/10 (branch
    squad/engineer-TSK-010-coach-dashboard). Follows design/wireframes/coach-dashboard.md: /dashboard
    is now the risk-sorted client list (streak, last check-in, risk badge), /dashboard/clients/[id]
    is the drill-in (full check-in history, most recent expanded, AI summary + editable reply per
    check-in). New checkins.coach_reply/reply_sent_at columns + a coach-scoped UPDATE RLS policy
    (migration 00000000000007).

    Scope call: the wireframe's "[Send Reply]" button doesn't actually dispatch email/SMS to the
    client — no outbound-delivery integration exists in this codebase yet (Resend is listed as a
    future stack item in PROJECT_BRIEF.md §6 but no task has scoped building it). Implemented as
    "Save reply": persists the coach's edited reply for their own record, UI copy makes clear it
    isn't sent automatically. Flagging in case the owner wants real delivery scoped as its own task.

    First PR in this repo to get an automated check: Vercel preview deploy went green
    (owner/PM must have wired up Vercel per TSK-018's checklist). Build/lint also clean locally.
  </engineer_notes>
  <pm_notes>
    Merged by the owner directly on GitHub (merge commit 4588e0b), outside the normal
    squad-PR-to-PM-review flow — PM did a post-hoc review 2026-08-05 rather than a pre-merge one.
    Client detail page and the new coach-reply UPDATE correctly rely on RLS scoped to
    `coach_id = auth.uid()` (via the `clients` join for the new policy), consistent with the
    established pattern elsewhere in this codebase — a coach requesting another coach's client id
    404s rather than leaking data, matching the PR's own test claim. The "Send Reply" -> "Save
    reply" scope narrowing is a reasonable, transparently-documented call; no code changes needed.
    No blocking issues found.
  </pm_notes>
</task_item>

<task_item>
  <id>TSK-011</id>
  <source>OWNER_POPUP</source>
  <status>DONE</status>
  <priority>LOW</priority>
  <title>Marketing landing page</title>
  <description>
    Depends loosely on TSK-003/TSK-004 for styling/wireframe, but can ship with placeholder
    styling if those aren't done yet. Value prop, pricing table (section 4), signup CTA.
  </description>
  <researcher_notes></researcher_notes>
  <engineer_notes>
    PR opened: https://github.com/GRITui/grit-self-improvement/pull/9 (branch
    squad/engineer-TSK-011-landing-page). Replaces the placeholder `/` page: hero, 3-step
    how-it-works, feature highlights, and a pricing table that renders directly from
    lib/billing.ts's PLAN_TIERS (no hardcoded prices to drift out of sync with TSK-009's Stripe
    gating). Styled with the ink-*/brand-* design tokens (TSK-003) — /login and /signup still use
    the older zinc/dark-mode scaffold styling, left untouched as out of scope. Build/lint clean;
    no local Playwright browser available to screenshot, so verified via rendered HTML markup
    instead.

    PR #9 merged to main 2026-08-05.
  </engineer_notes>
  <pm_notes>
    Reviewed and merged 2026-08-05 (PR #9, squash merge, commit 2185adb). Correctly scoped —
    pricing table sourced from lib/billing.ts's PLAN_TIERS instead of hardcoded, so it can't drift
    from TSK-009's actual Stripe-gated tiers. Static page, no backend surface, nothing to flag.
  </pm_notes>
</task_item>

<task_item>
  <id>TSK-012</id>
  <source>OWNER_POPUP</source>
  <status>DONE</status>
  <priority>MEDIUM</priority>
  <title>QA pass: auth & client roster</title>
  <description>
    Pull once TSK-005/TSK-006 PRs are merged to main. Test coach signup/login (incl. OAuth) and
    client CRUD + invite link generation against PROJECT_BRIEF.md section 5 items 1-2. Log
    pass/fail per item in squad-handshake/qa-tester-squad.md; file BLOCKED with repro steps for
    failures rather than fixing code directly.
  </description>
  <researcher_notes></researcher_notes>
  <pm_notes>
    2026-08-06: QA-Tester-Squad passed both items (coach signup/login incl. Google OAuth; client
    CRUD + invite-link generation) — no bugs found, nothing BLOCKED. Code-level review only (no
    live Supabase credentials available to click through a real signup/OAuth flow), same
    established pattern as every other squad's runtime-unverifiable work in this repo — full
    per-item findings in squad-handshake/qa-tester-squad.md. Marking DONE on that basis.
  </pm_notes>
</task_item>

<task_item>
  <id>TSK-013</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>MEDIUM</priority>
  <title>QA pass: check-in flow & AI summarization</title>
  <description>
    Pull once TSK-007/TSK-008 PRs are merged to main. Verify the public check-in page works with
    no auth, and that AI summary/risk-flag/draft-reply are generated and never auto-sent.
  </description>
  <researcher_notes></researcher_notes>
</task_item>

<task_item>
  <id>TSK-014</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>LOW</priority>
  <title>QA pass: billing & plan gating</title>
  <description>
    Pull once TSK-009 PR is merged to main. Verify trial flow, tier limits actually block client
    creation past the cap, and upgrade prompt appears correctly.
  </description>
  <researcher_notes></researcher_notes>
</task_item>

<task_item>
  <id>TSK-015</id>
  <source>OWNER_POPUP</source>
  <status>DONE</status>
  <priority>MEDIUM</priority>
  <title>Rebrand app code/UI from "GritDesk" to "FollowThru"</title>
  <description>
    Owner approved "FollowThru" as the product name (TSK-001). PROJECT_BRIEF.md is already
    updated. TSK-005/TSK-006 shipped before this decision and hard-code "GritDesk" in
    package.json's "name" field, page metadata/title, and visible UI copy (landing page copy,
    login/signup headings, dashboard). Find and replace all "GritDesk" references in app source
    with "FollowThru" (check package.json, src/app/layout.tsx metadata, and every page under
    src/app/ for user-visible copy). Not urgent/blocking — safe to interleave with TSK-007+ rather
    than dropping everything, but do it before TSK-011 (marketing landing page) so that page is
    written under the final name from the start. design/tokens.md and
    design/tailwind.config.snippet.js were deliberately built brand-agnostic (per TSK-003's
    designer_notes) and need no changes.
  </description>
  <researcher_notes></researcher_notes>
  <engineer_notes>
    PR opened: https://github.com/GRITui/grit-self-improvement/pull/5 (branch
    squad/engineer-TSK-015-rebrand). Build/lint clean. Replaced package.json name (+ regenerated
    package-lock.json), layout.tsx title metadata, and home/login/signup heading copy. Dashboard
    pages never referenced "GritDesk" (generic copy already), so no change needed there. One
    remaining "Powered by GritDesk" string lives in TSK-007's public check-in footer (PR #4, not
    yet merged) — out of reach from a branch cut off main, which doesn't have that code yet;
    one-line follow-up once PR #4 merges.
  </engineer_notes>
  <pm_notes>
    Reviewed and merged 2026-08-05 (PR #5, squash merge, commit 5268ade). Simple, correctly
    scoped text-only rename, no logic touched. Confirmed dashboard pages had no "GritDesk"
    references as claimed. The one known leftover ("Powered by GritDesk" in the check-in footer,
    PR #4) is now trackable since PR #4 merged first in this same sweep — see TSK-017.
  </pm_notes>
</task_item>

<task_item>
  <id>TSK-016</id>
  <source>ENGINEER_SQUAD</source>
  <status>DONE</status>
  <priority>MEDIUM</priority>
  <title>Coach-facing UI to configure check-in cadence &amp; questions per client</title>
  <description>
    Raised during TSK-007. PROJECT_BRIEF.md §5 item 3 calls for "Program setup — cadence + up to
    5 custom check-in questions per client/program template," but no backlog item ever built that
    coach-facing configuration UI. TSK-007's public check-in page reads `clients.cadence` and
    `clients.questions` (added in supabase/migrations/00000000000003_checkins.sql — jsonb array,
    capped at 5, DB-level default of 3 generic questions/weekly cadence), but nothing lets a
    coach change them from those defaults today. Build the edit UI (likely on the client detail
    view, alongside TSK-006's roster) — add/remove/reorder up to 5 questions, set cadence. Not
    blocking TSK-008/TSK-010, but needed before the product is usable with real, coach-specific
    questions rather than the generic defaults.
  </description>
  <researcher_notes></researcher_notes>
  <engineer_notes>
    PR opened: https://github.com/GRITui/grit-self-improvement/pull/8 (branch
    squad/engineer-TSK-016-cadence-questions-editor). No migration needed — reuses TSK-007's
    existing clients.cadence/questions columns and the DB-level 5-question cap. Added a "Check-in
    program" panel per client row on /dashboard/clients: cadence select (weekly/biweekly/monthly)
    + add/remove/reorder up to 5 questions. Cadence values are validated in the server action only
    (no DB check constraint on that column) — flagged in the PR in case PM wants one added later.
    Build/lint clean; full DB round trip unverified (no live Supabase project in this
    environment).

    PR #8 merged to main 2026-08-05.
  </engineer_notes>
  <pm_notes>
    Reviewed and merged 2026-08-05 (PR #8, squash merge, commit 5bf9cb3). Relies on the same
    RLS-scoped-update pattern as TSK-006/TSK-009's addClient — correct and consistent. Missing DB
    check constraint on cadence is a fair non-blocking nit for later, not required for this task.
  </pm_notes>
</task_item>

<task_item>
  <id>TSK-017</id>
  <source>PM</source>
  <status>DONE</status>
  <priority>LOW</priority>
  <title>Fix stale "Powered by GritDesk" string on public check-in page</title>
  <description>
    TSK-007 (PR #4) shipped a "Powered by GritDesk" footer on src/app/checkin/[token]/page.tsx
    because TSK-015's rebrand (PR #5) was cut from main before TSK-007 existed and couldn't reach
    it. Both are merged now. One-line fix: change that string to "Powered by FollowThru". Trivial
    scope, bundle with whatever Engineer-Squad task touches that file next if convenient, or take
    standalone.
  </description>
  <researcher_notes></researcher_notes>
  <engineer_notes>
    Folded into PR #7 (TSK-008) as a second commit — that PR already touches
    src/app/checkin/[token]/ (actions.ts) and hadn't merged yet, so this rides along per PM's
    suggestion rather than opening a separate PR. Changed the string to "Powered by FollowThru".
  </engineer_notes>
  <pm_notes>
    Landed and merged as part of PR #7 (squash commit f6d6b29), 2026-08-05. No remaining
    "GritDesk" references found in app code.
  </pm_notes>
</task_item>

<task_item>
  <id>TSK-018</id>
  <source>OWNER_POPUP</source>
  <status>NEEDS_OWNER_REVIEW</status>
  <priority>HIGH</priority>
  <title>Go-live readiness checklist</title>
  <description>
    Owner asked for a go-live checklist (2026-08-05). This is a tracking/reference item, not a
    single buildable task — PM compiled it from current repo state; splitting individual rows
    into their own backlog items as they're picked up is expected. Not everything here needs a
    squad: several rows are owner-only actions (paying for a domain, running a trademark check,
    creating live Stripe/Supabase projects) that no squad can do from this environment.

    **Update 2026-08-06 (PM):** Section A is now fully done — see E. The bigger open item is now
    the TSK-019 Neon migration epic (TSK-020–024), which supersedes most of section B below (this
    app no longer targets Supabase once that epic lands). Sections B/C are rewritten to reflect
    that; D is unchanged.

    **A. MVP feature gaps — DONE.** TSK-008, TSK-010, TSK-011, TSK-016, TSK-017 all shipped.

    **B. Infrastructure/credentials (owner action — no squad can do this):**
    - Neon: confirm a Neon project + database exists (owner said "wired to Neon DB" 2026-08-05)
      and, once TSK-020 (Neon Auth) lands, create the Neon Auth project too — Engineer-Squad can
      write the integration code against docs without live credentials (same pattern as every
      other PR so far), but nothing can be *verified* end-to-end without them.
    - Once TSK-019's epic lands: set whatever env vars it ends up needing on Vercel (replaces
      `NEXT_PUBLIC_SUPABASE_*`/`SUPABASE_SERVICE_ROLE_KEY` — exact names depend on TSK-020/021's
      implementation, see TSK-024).
    - Create 3 real Stripe recurring Prices (Starter/Pro/Studio) and a live webhook endpoint per
      `supabase/README.md`; set `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
      `STRIPE_PRICE_STARTER/PRO/STUDIO`. TSK-014 (QA billing pass, still not run — see backlog)
      should run against this before real customers touch it.
    - Buy/point a production domain; set `NEXT_PUBLIC_SITE_URL` to it. The app is already live at
      the Vercel-assigned domain (owner confirmed prod is deployed) — this is about the real
      domain, not first deployment.
    - Set up CI (lint + build on every PR) — every PR is still only manually verified by PM
      re-running `npm run lint`/`npm run build` locally during review; no automated gate yet.

    **C. Legal/compliance (owner action, likely needs non-squad help — nothing in progress):**
    - Terms of Service and Privacy Policy — the product stores client PII (name, email,
      free-text check-in answers) with no policy pages or consent flow anywhere in the app yet.
    - Real trademark/domain check on "FollowThru" before public launch — TSK-001's screening was
      web search only, not authoritative (see PROJECT_BRIEF.md §8).
    - Stripe account activation for live payments (business details, bank account) — separate
      from the API-key setup in section B.

    **D. Security/hardening worth a look before real traffic (Engineer/QA-Squad):**
    - No rate limiting on the public, unauthenticated `/checkin/[token]` submit endpoint —
      low risk today (scoped to one client's token, per TSK-007's PM review) but worth adding
      before this is publicly linked at scale.
    - `submit_checkin`'s `answers` jsonb has no size/shape validation (noted in TSK-007's
      pm_notes) — a client could submit an oversized payload.
    - No error monitoring/alerting (e.g. Sentry) wired in anywhere — right now a production
      crash would be silent until a coach reports it.

    **E. Already done, for reference:** coach auth (TSK-005), client roster + invite links
    (TSK-006), public check-in flow (TSK-007), AI summarization (TSK-008), coach dashboard
    (TSK-010), Stripe billing + plan gating (TSK-009), marketing landing page (TSK-011),
    cadence/questions editor (TSK-016), rebrand (TSK-015/017), design tokens/wireframes
    (TSK-003/004), market validation + GTM plan (TSK-001/002).

    **Still not started, no owner input needed:** TSK-012/013/014 (QA passes — QA-Tester-Squad
    hasn't run since its first cycle despite TSK-012/014 being unblocked for a while).
  </description>
  <researcher_notes></researcher_notes>
</task_item>

<task_item>
  <id>TSK-019</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>HIGH</priority>
  <title>[EPIC] Migrate off Supabase to Neon — database + auth</title>
  <description>
    Owner has wired the project to a Neon Postgres database (2026-08-05) and wants a full
    migration off Supabase, not just a connection-string swap. Root cause for this: TSK-005's
    scaffold used Supabase for three separable things — Postgres hosting, Auth (email/password +
    Google OAuth via @supabase/ssr), and Row Level Security policies keyed off Supabase's
    `auth.uid()` session variable. All three need a replacement, and RLS in particular is not just
    plumbing: several existing write paths (e.g. `updateClient`/`removeClient`/`updateProgram` in
    src/app/dashboard/clients/actions.ts) rely on RLS as the *only* enforcement — they don't
    explicitly filter by `coach_id` in the query. Losing that safety net during migration without
    replacing it is a real authorization-bypass risk, not a nice-to-have.

    This is tracked as an epic — TSK-020 through TSK-024 below are the actual buildable units.
    Do not pick up this item directly; pick up its sub-tasks. PM will update this item's status
    as sub-tasks complete and will re-triage if a sub-task reveals the scope needs to change.

    Sequencing recommendation: let PR #10 (TSK-010, currently open) land first so the migration
    touches a complete, stable feature set once rather than rebasing mid-flight — but this is a
    call for whoever's picking up TSK-020, not a hard gate.

    PM's default technical recommendation (stated so Engineer-Squad isn't starting from zero, not
    as a mandate — override if a sub-task turns up a real blocker): **Neon Auth** for the auth
    replacement, since it's Neon's own first-party auth product and the natural pairing given the
    owner already chose Neon; **Drizzle ORM** for the data layer, since it's the most common Neon
    pairing and gives type safety without hand-rolled SQL string building. Either can be swapped
    for Auth.js/Clerk or raw `pg`/`postgres.js` if a sub-task's owner has a strong reason.
  </description>
  <researcher_notes></researcher_notes>
</task_item>

<task_item>
  <id>TSK-020</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>HIGH</priority>
  <title>Replace Supabase Auth with Neon-compatible auth (coach signup/login/OAuth + sessions)</title>
  <description>
    Part of the TSK-019 epic. Replace Supabase Auth (email/password + Google OAuth,
    @supabase/ssr session cookies, src/proxy.ts middleware) with a Neon-compatible auth solution
    — Neon Auth is the PM's default recommendation (see TSK-019), but pick what actually fits once
    you're in the code. Must preserve: email/password signup+login, "Continue with Google" OAuth,
    session-protected `/dashboard/*` routes (currently enforced in src/lib/supabase/middleware.ts),
    and a stable per-coach user ID that TSK-021's data-layer migration can key all tables off of
    (mirrors today's `coaches.id` referencing `auth.users(id)`). Update `supabase/README.md`
    (rename/rewrite as the new auth+DB setup doc) and `.env.example` to match. This unblocks
    TSK-021.
  </description>
  <researcher_notes></researcher_notes>
</task_item>

<task_item>
  <id>TSK-021</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>HIGH</priority>
  <title>Migrate Postgres data layer from Supabase client to Neon, replacing RLS with explicit app-layer authorization</title>
  <description>
    Part of the TSK-019 epic. Depends on TSK-020 (needs the new auth's user-ID shape). Replace
    `@supabase/supabase-js`/`@supabase/ssr` table access (coaches, clients, checkins) with a Neon
    client — Drizzle ORM is the PM's default recommendation (see TSK-019). Run the existing
    `supabase/migrations/*.sql` against Neon (they're portable Postgres, but strip/adapt anything
    Supabase-specific: `auth.users` foreign key references and the `handle_new_coach` trigger on
    Supabase's auth schema need to key off whatever TSK-020's auth solution provides instead).

    **Security-critical part, read carefully:** today, RLS policies are the *only* thing stopping
    a coach from reading/writing another coach's rows on several paths — e.g.
    `updateClient`/`removeClient`/`updateProgram` in src/app/dashboard/clients/actions.ts call
    `.update()`/`.eq("id", id)` with no `coach_id` filter, relying entirely on RLS's `USING
    (auth.uid() = coach_id)` clause. Neon supports Postgres RLS too, so you *can* keep an
    RLS-based model if the chosen client/ORM can set a per-request session variable equivalent to
    `auth.uid()` — but if the migration instead moves authorization into the application layer,
    every one of those call sites needs an explicit `WHERE coach_id = <session coach id>` added,
    not just a client-library swap. Audit every existing query against `coaches`/`clients`/
    `checkins` for this before calling this task done — grep for `.update(`, `.delete(`, `.select(`
    across `src/app/dashboard/` and `src/lib/`.
  </description>
  <researcher_notes></researcher_notes>
</task_item>

<task_item>
  <id>TSK-022</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>MEDIUM</priority>
  <title>Re-implement anonymous public check-in flow against Neon (no direct table access without a valid token)</title>
  <description>
    Part of the TSK-019 epic. Depends on TSK-021. TSK-007's public check-in flow
    (src/app/checkin/[token]/) currently works via two Postgres `SECURITY DEFINER` functions
    called through Supabase's `.rpc()` — `get_client_by_invite_token` and `submit_checkin` — which
    let an anonymous visitor act on exactly the one client whose 128-bit invite token they hold,
    with no ability to enumerate or browse anything else. Neon is plain Postgres, so
    `SECURITY DEFINER` functions still work there and calling them via raw SQL through the chosen
    client/ORM is the most direct port. If instead this gets reimplemented as application-code
    token lookup + insert (no DB function), the same guarantee — a caller with an invalid or
    someone-else's token cannot read or write any other client/checkin row — must be preserved
    explicitly in that code, not assumed. Depends on TSK-021 for `checkins`/`clients` being live on
    Neon first.
  </description>
  <researcher_notes></researcher_notes>
</task_item>

<task_item>
  <id>TSK-023</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>MEDIUM</priority>
  <title>Re-implement service-role/admin write path for AI analysis + Stripe webhook against Neon</title>
  <description>
    Part of the TSK-019 epic. Depends on TSK-021. TSK-008's AI check-in analysis (writes
    ai_summary/risk_level/draft_reply after the fact, no coach session to authenticate as) and
    TSK-009's Stripe webhook handler (writes coaches.plan by stripe_customer_id, same situation)
    both currently use a Supabase service-role client (src/lib/supabase/admin.ts) that bypasses
    RLS entirely. Under Neon there's no separate "service role" concept — this maps to a direct
    Postgres connection with full write privileges. The security-relevant part: make sure that
    privileged connection/credential is only ever used server-side in these two specific paths
    (webhook handler, post-check-in analysis), never exposed to anything a browser or the
    anonymous check-in submitter can reach — same boundary that exists today, just implemented
    differently.
  </description>
  <researcher_notes></researcher_notes>
</task_item>

<task_item>
  <id>TSK-024</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>LOW</priority>
  <title>Update docs/env vars for Neon migration; remove dead Supabase references</title>
  <description>
    Part of the TSK-019 epic. Depends on TSK-020/021/022/023 being done (or far enough along that
    the final shape is known). Rewrite `supabase/README.md` (or replace with a new
    `neon/README.md`) to document the actual Neon + chosen-auth-provider setup steps in place of
    the current Supabase project setup instructions. Update `.env.example` to drop
    `NEXT_PUBLIC_SUPABASE_*`/`SUPABASE_SERVICE_ROLE_KEY` and add whatever Neon/auth-provider env
    vars the migration ended up needing. Sweep for any other stray Supabase references (comments,
    PROJECT_BRIEF.md §6 tech stack list, README.md) and update them to match reality.
  </description>
  <researcher_notes></researcher_notes>
</task_item>
