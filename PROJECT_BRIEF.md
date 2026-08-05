# Project Brief — "GritDesk" (working title)

Status: DRAFT v1 — owned by PM (Owner-Assistant), seeded 2026-08-05. Researcher-Squad should
deepen/challenge this, not treat it as fixed truth.

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

## 2. Product Concept

**GritDesk** — an AI accountability copilot for coaches.

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

Researcher-Squad TODO: validate this with real interviews/forum research (r/coaching,
r/lifecoach, IndieHackers) before we lock scope further.

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

| | Competitors (CoachAccountable/Quenza/Satori) | GritDesk |
|---|---|---|
| Client friction | Client app/login required | Tokenized link, zero friction |
| Check-in triage | Coach reads everything manually | AI summary + risk flag + draft reply |
| Focus | Generic session/homework notes | Purpose-built for accountability/grit programs |
| Pricing | Often per-client | Flat tiers by client-count band |

## 8. Open Risks

- "Grit" as a brand name likely has trademark/collision issues (multiple existing apps) — treat
  as a working title only; Researcher-Squad to propose 3 alternatives.
- AI summarization quality/liability: coach must review before sending, never auto-send.
- Cold-start distribution: no existing audience. Early GTM likely coaching Facebook
  groups/subreddits/IndieHackers — Researcher-Squad to scope a lightweight GTM plan post-MVP.
