# Backlog Inbox

Append-only ledger. Add new items at the bottom with the next sequential `TSK-xxx` id. Never
delete or renumber existing items — update `<status>` and add notes in place.

Schema: see `PM_CHARTER.md` / `ai-engineering-loop` skill.

<task_item>
  <id>TSK-001</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>HIGH</priority>
  <title>Deepen market validation and resolve brand name</title>
  <description>
    PROJECT_BRIEF.md v1 is PM-drafted from web search only (no primary research). Validate the ICP
    and willingness-to-pay claims (r/coaching, r/lifecoach, IndieHackers, coaching Facebook
    groups), and propose 3 brand-name alternatives to "GritDesk"/"Grit" (collision risk with
    multiple existing consumer apps named Grit). Update PROJECT_BRIEF.md sections 1, 3, and 8
    in place with findings; do not rewrite the whole doc.
  </description>
  <researcher_notes></researcher_notes>
</task_item>

<task_item>
  <id>TSK-002</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>MEDIUM</priority>
  <title>Draft lightweight GTM plan for post-MVP launch</title>
  <description>
    Where do the first 10 paying coaches come from? Scope a lightweight, low/no-budget GTM plan
    (target communities, launch channels, positioning angle) as a new section appended to
    PROJECT_BRIEF.md. Keep it to one page — this is not a full marketing plan.
  </description>
  <researcher_notes></researcher_notes>
</task_item>

<task_item>
  <id>TSK-003</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
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
</task_item>

<task_item>
  <id>TSK-004</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>HIGH</priority>
  <title>Wireframes: landing page, coach dashboard, client check-in form</title>
  <description>
    Low-fidelity wireframes (can be markdown/ASCII, Figma, or annotated images — whatever this
    squad session can produce and commit as files) for: (1) marketing landing page, (2) coach
    dashboard (client list w/ streak + risk flag), (3) public client check-in page. Depends
    loosely on TSK-003 tokens but do not block — placeholder styling is fine.
  </description>
  <researcher_notes></researcher_notes>
</task_item>

<task_item>
  <id>TSK-005</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>HIGH</priority>
  <title>Scaffold Next.js + Supabase + Tailwind project with coach auth</title>
  <description>
    Scaffold the app at repo root (Next.js App Router, TypeScript, Tailwind). Wire up Supabase
    (Postgres + Auth + RLS). Implement coach signup/login (email+password, Google OAuth). No
    other features yet. This unblocks TSK-006 through TSK-011. See PROJECT_BRIEF.md section 6.
  </description>
  <researcher_notes></researcher_notes>
</task_item>

<task_item>
  <id>TSK-006</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>MEDIUM</priority>
  <title>Client roster CRUD + tokenized invite link</title>
  <description>
    Depends on TSK-005 (pull only once that PR is merged to main). Coach can add/edit/remove
    clients and generate a tokenized, no-login check-in link per client. Store clients under RLS
    scoped to the owning coach.
  </description>
  <researcher_notes></researcher_notes>
</task_item>

<task_item>
  <id>TSK-007</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>MEDIUM</priority>
  <title>Public client check-in flow</title>
  <description>
    Depends on TSK-006. Tokenized, mobile-friendly public page (no auth) where a client answers
    the coach's check-in questions (up to 5, cadence-driven). Store responses linked to the
    client/token, not to a client login.
  </description>
  <researcher_notes></researcher_notes>
</task_item>

<task_item>
  <id>TSK-008</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>MEDIUM</priority>
  <title>AI check-in summarization, risk flag, draft reply</title>
  <description>
    Depends on TSK-007. On new check-in submission, call the Claude API to: summarize the
    response, flag disengagement/dropout risk (enum: LOW/MEDIUM/HIGH), and draft a suggested
    coach reply. Never auto-send the reply — coach must review/edit/send. Store results alongside
    the check-in record.
  </description>
  <researcher_notes></researcher_notes>
</task_item>

<task_item>
  <id>TSK-009</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>LOW</priority>
  <title>Stripe subscription billing + plan gating</title>
  <description>
    Depends on TSK-005. Implement Starter/Pro/Studio tiers per PROJECT_BRIEF.md section 4, 14-day
    trial, and gate active-client count by plan (block adding a new client past the tier limit
    with an upgrade prompt).
  </description>
  <researcher_notes></researcher_notes>
</task_item>

<task_item>
  <id>TSK-010</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>MEDIUM</priority>
  <title>Coach dashboard UI</title>
  <description>
    Depends on TSK-006 and TSK-008. Client list view: streak, last check-in date, risk flag badge.
    Drill-in to a single client's check-in history and AI summaries/drafted replies.
  </description>
  <researcher_notes></researcher_notes>
</task_item>

<task_item>
  <id>TSK-011</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>LOW</priority>
  <title>Marketing landing page</title>
  <description>
    Depends loosely on TSK-003/TSK-004 for styling/wireframe, but can ship with placeholder
    styling if those aren't done yet. Value prop, pricing table (section 4), signup CTA.
  </description>
  <researcher_notes></researcher_notes>
</task_item>

<task_item>
  <id>TSK-012</id>
  <source>OWNER_POPUP</source>
  <status>READY_FOR_PM</status>
  <priority>MEDIUM</priority>
  <title>QA pass: auth & client roster</title>
  <description>
    Pull once TSK-005/TSK-006 PRs are merged to main. Test coach signup/login (incl. OAuth) and
    client CRUD + invite link generation against PROJECT_BRIEF.md section 5 items 1-2. Log
    pass/fail per item in squad-handshake/qa-tester-squad.md; file BLOCKED with repro steps for
    failures rather than fixing code directly.
  </description>
  <researcher_notes></researcher_notes>
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
