# Project Brief — "FollowThru" (formerly "GritDesk"/"Grit")

Status: DRAFT v1 — owned by PM (Owner-Assistant), seeded 2026-08-05. Researcher-Squad should
deepen/challenge this, not treat it as fixed truth.

Revision log: 2026-08-05 — Researcher-Squad (TSK-001) added market/ICP validation notes to
Sections 1 and 3, and resolved the brand-name risk in Section 8 with 3 researched alternatives.
2026-08-05 — Researcher-Squad (TSK-002) appended Section 9, a lightweight GTM plan.
2026-08-05 — Owner approved "FollowThru" as the product name (TSK-001 resolved). Renamed
throughout this doc; see TSK-015 in backlog-inbox.md for the app-code/UI rename Engineer-Squad
still needs to do.

## 1. Problem & Opportunity

Two markets were compared during initial research:

- **Consumer habit/self-improvement apps** (Habitica, Streaks, Way of Life, "Grit: Improve Daily
  with AI", etc.) — huge and growing (~$1.9B → $6.4B by 2034, 14.2% CAGR) but **weak monetization**
  ($5–15/mo), brutal app-store competition, and the name "Grit" is already used by multiple
  consumer apps.
- **Coaching client-management software** (CoachAccountable, Paperbell, Simply.Coach, Quenza,
  Satori) — smaller, B2B, **better monetization** ($20–99/mo), lower competition, sticky (coaches
  don't churn tools once client data lives there). Gap: these are generic homework/session-note
  tools. None of them use AI to summarize client check-ins, flag disengagement risk, or draft the
  coach's reply.

**Decision: build for the coach (B2B), not the end consumer.** Sell to solo coaches/consultants
who run structured accountability or "grit"/resilience-building programs with clients, and use AI
to remove their single biggest time sink — reading and responding to client check-ins.

**Researcher-Squad validation (TSK-001, 2026-08-05):** Desk research (coaching blogs/forums,
review sites, IndieHackers threads — not primary interviews) corroborates both the pain point and
the differentiation gap. Coaches consistently describe admin burden and fragmented check-in/tool
sprawl as a top time sink as their client count grows. Separately, coach-facing material on client
retention lists the exact early-disengagement signals an AI risk-flag feature would need to
detect — terse check-in answers, slowing reply times, missed/late sessions — which validates that
the risk-flag concept maps to real coach behavior, not just a nice-to-have. Search across AI
coaching-tool coverage and named products (CoachPulse, PulseCheck, Delenta, etc.) turned up
AI note-taking, generic "AI-powered CRM" re-engagement suggestions, and single-purpose pulse-check
tools, but no product combining check-in summarization + dropout-risk flag + drafted reply in one
workflow — the differentiation claim in Section 7 holds under this search, though it is not proof
no such competitor exists anywhere.

## 2. Product Concept

**FollowThru** — an AI accountability copilot for coaches.

- Coach sets up clients and a recurring check-in (weekly cadence, custom questions).
- Client fills out the check-in via a tokenized web link — **no app install, no client login**.
  This is a deliberate wedge: friction is the #1 reason client check-ins go unanswered on
  competitor tools.
- Claude summarizes each check-in, flags disengagement/dropout risk, and drafts a suggested reply
  the coach can edit and send in one click.
- Coach dashboard shows all clients at a glance: streak, last check-in, risk flag.

## 3. ICP (Ideal Customer Profile)

Independent life/business/executive/fitness coaches and consultants running 5–50 concurrent
clients on structured programs, currently tracking check-ins via spreadsheets, Google Forms, or
Notion. Pain: hours/week reading and replying to check-ins; clients go quiet and the coach notices
too late (churn). Willing to pay because time saved and better retention directly protects their
revenue.

**Researcher-Squad validation (TSK-001, 2026-08-05):** ICP and pricing are supported by desk
research on what coaches already pay for adjacent tools — Plutio $19/mo, Quenza $25/mo, Dubsado
$40/mo, Practice $28/mo, Practice Better $29–79/mo, CoachAccountable Solo $40/mo for 10 clients /
Team $90/mo for 50 clients, up to Kajabi $149/mo and GoHighLevel $97/mo. This is direct evidence
of an established willingness to pay $20–90+/mo in this exact buyer segment, and FollowThru's
proposed Starter tier ($29/mo up to 10 clients) undercuts CoachAccountable's equivalent Solo tier
($40/mo) — a concrete wedge on price for the same client-count band, not just on features.
Retention-focused coaching content also confirms coaches actively watch for the disengagement
signals (short answers, slow replies, missed check-ins) this product's risk flag is built to
surface, reinforcing that "clients go quiet and I notice too late" is a real, named pain point in
the coaching community, not an invented one.

**Caveat / still open:** this is secondary/desk research (search of existing threads, review
sites, and industry blog coverage), not primary interviews conducted directly with coaches on
r/coaching, r/lifecoach, or IndieHackers. Recommend the owner or a future task run 5–10 short
primary interviews or a lightweight landing-page/waitlist test pre-MVP to confirm actual
willingness to pay for *this specific* AI-summarization wedge (as opposed to coaching software
generally, which the pricing data above only proves indirectly).

## 4. Monetization

Tiered subscription by active client count (flat, not per-seat, to avoid the "penalizes growth"
trap CoachAccountable is criticized for):

| Tier    | Price   | Active clients |
|---------|---------|-----------------|
| Starter | $29/mo  | up to 10        |
| Pro     | $59/mo  | up to 30        |
| Studio  | $99/mo  | unlimited + white-label |

14-day free trial. Stripe for billing.

## 5. MVP Scope (V1)

1. Coach signup/login (email+password, Google OAuth)
2. Client roster — add/invite clients, generate tokenized check-in link (no client account)
3. Program setup — cadence + up to 5 custom check-in questions per client/program template
4. Public client check-in page (mobile-friendly, tokenized, no login)
5. AI processing — Claude summarizes each response, flags risk, drafts suggested coach reply
6. Coach dashboard — client list with streak/last-check-in/risk flag, drill into history
7. Stripe subscription billing with plan gating by active client count
8. Marketing landing page (value prop, pricing, signup CTA)

**Explicitly out of scope for V1** (backlog for later): white-label branding, group/cohort
programs, SMS check-ins, Zapier/Calendly integrations, native mobile app, coach-facing business
analytics.

## 6. Tech Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase (Postgres + Auth + Row Level Security) — fast to stand up, avoids building auth/DB glue
- Stripe Billing (subscriptions + usage gating)
- Anthropic Claude API for check-in summarization / risk flagging / reply drafting
- Vercel for hosting/deploy (MCP tooling already available to this workspace)
- Resend (or Supabase built-in) for transactional email (check-in reminders, invites)

Repo layout: scaffold the Next.js app at the repo root using standard App Router conventions
(Engineer-Squad owns this decision in TSK-005; deviate only with a note in the handshake file).

## 7. Differentiation Summary

| | Competitors (CoachAccountable/Quenza/Satori) | FollowThru |
|---|---|---|
| Client friction | Client app/login required | Tokenized link, zero friction |
| Check-in triage | Coach reads everything manually | AI summary + risk flag + draft reply |
| Focus | Generic session/homework notes | Purpose-built for accountability/grit programs |
| Pricing | Often per-client | Flat tiers by client-count band |

## 8. Open Risks

- "Grit" as a brand name likely has trademark/collision issues (multiple existing apps) — treat
  as a working title only; Researcher-Squad to propose 3 alternatives.

  **Researcher-Squad findings (TSK-001, 2026-08-05):** collision risk confirmed, and worse than
  the original brief implied. "Grit: Daily Habit Tracker" (GrittyApps) has 2.5M+ downloads and is
  reported around $90K/mo revenue on gritapp.net — a large, established, directly-adjacent
  (habit-tracking) product using the bare name "Grit." Additionally "CoachDesk" already exists as
  a coaching-admin product name, which collides closely with the current working title
  "GritDesk," and "CoachPulse" is independently reused by at least four unrelated apps across
  team/personal/fitness coaching — ruled out as a fallback direction too.

  Three alternatives proposed (screened via web search for existing products/apps only — not a
  formal USPTO trademark or domain-registration search, which the owner should still run before
  committing):
  1. **FollowThru** (or "FollowThru Coach") — *recommended*. Directly evokes the core value prop
     (helping coaches follow through on every client check-in). No existing coaching-software
     product found under this name in search.
  2. **Tallyline** — evokes tracking/tallying check-ins over an open line of contact with the
     client. No existing product found under this name.
  3. **Coachline** — plain and immediately legible to the ICP, but more generic/descriptive,
     which likely makes it a weaker trademark than the other two even though no dedicated
     existing product was found under this name.

  Names considered and rejected due to confirmed collisions: Cadence (Cadence Design Systems),
  Anchor (Spotify podcasting), Compass (Compass real estate), Traction (EOS Worldwide's coaching
  methodology — direct competitive collision), Checkpoint (Check Point Software), Tether (Tether
  stablecoin), Foothold (Foothold Technology, behavioral-health EHR), Keelframe (existing maritime
  engineering SaaS), Groundwire (existing faith-based coaching platform), OnDeck/SteadyPoint
  (existing unrelated SaaS products).

  **Owner decision (2026-08-05):** approved "FollowThru" as the product name. Still outstanding
  before public launch: a real trademark/domain check (this screening was web search only, not
  authoritative). TSK-015 tracks the app-code/UI rename.
- AI summarization quality/liability: coach must review before sending, never auto-send.
- Cold-start distribution: no existing audience. Early GTM likely coaching Facebook
  groups/subreddits/IndieHackers — Researcher-Squad to scope a lightweight GTM plan post-MVP.
  See Section 9 for the resulting plan.

## 9. GTM Plan — First 10 Paying Coaches (TSK-002, Researcher-Squad, 2026-08-05)

Low/no-budget plan for post-MVP launch. Beachhead: independent life/business/fitness coaches
running 10-50 clients on structured accountability programs, currently on spreadsheets/Google
Forms/Notion (same ICP as Section 3) — not coaches in general.

**Positioning angle:** lead with the AI triage wedge, not "another coaching CRM." Headline framing:
*"Stop losing clients you didn't know had gone quiet"* — the risk-flag feature is the hook because
it's demonstrable (show a real flagged check-in), not just described, and no found competitor
offers it (Section 1).

**Channels, roughly in order of effort/payoff for a cold start:**
1. **Reddit (r/coaching, r/lifecoach)** — participate genuinely first (90/10 rule: ~90% real
   engagement, ≤10% mentions of the product); "build in public" posts and comments on existing
   check-in/admin-burden threads outperform direct pitches and avoid mod removal/bans.
2. **IndieHackers** — build-in-public log + a launch post once there's a working MVP; this
   audience responds well to "I built X because Y" narratives and gives early feedback before a
   wider push.
3. **Coaching Facebook groups** — dozens of active groups (e.g. The Good Alliance and others);
   lead with a free lead magnet tied to this research — a short "10 early warning signs a client
   is about to drop out" checklist (content already substantiated by TSK-001's disengagement-
   signal research) — before any product mention.
4. **ICF local chapter newsletters** — 140+ chapters, most run monthly newsletters open to
   free or low-cost sponsor/content placement; the most targeted channel found for credentialed,
   paying-capacity coaches specifically, worth testing 2-3 chapters before scaling spend.
5. **Product Hunt launch** — standard visibility/backlink play once MVP is ready; treat as a
   traffic/credibility spike, not the primary acquisition channel.

**First-10 tactic:** personally offer free white-glove onboarding (coach keeps using it free
through their first full check-in cycle) in exchange for a testimonial/case study, sourced from
the communities above. The product's edge is best proven by a real flagged check-in, not a demo
video, so getting a handful of real client cohorts running matters more than volume of signups
early on.

**Considered and deliberately deferred:** AppSumo/lifetime-deal listings — real distribution reach
(can drive rapid signups), but ~60% revenue share plus a deal-seeking, refund-heavy buyer base
(platform average ~17% refund rate) is a poor fit for a recurring $29-99/mo B2B product before
organic retention data exists. Revisit only after the core channels above show product-market fit.
