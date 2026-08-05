# Wireframe — Marketing Landing Page

Ref: `PROJECT_BRIEF.md` §5 item 8, §4 (pricing), §7 (differentiation). Public, unauthenticated,
SEO-relevant page. Goal: get a coach from "what is this" to signup CTA in one scroll pass.

## Desktop (≥1024px), content capped at `max-w-7xl` (see tokens.md §4)

```
+--------------------------------------------------------------------------------+
| [Logo/Wordmark]              Product   Pricing   Log in   [Get Started ->]     |  <- sticky nav
+--------------------------------------------------------------------------------+
|                                                                                  |
|                    Stop reading every client check-in yourself.                |  <- H1 (text-5xl)
|        AI triages check-ins, flags who's going quiet, drafts your reply.       |  <- subhead (text-xl, ink-600)
|                                                                                  |
|              [Start free 14-day trial ->]      No credit card required          |
|                                                                                  |
|              [ -- product screenshot / dashboard mock placeholder -- ]          |
|                                                                                  |
+--------------------------------------------------------------------------------+
|  PROBLEM/SOLUTION STRIP                                                        |
|  "You didn't become a coach to triage a spreadsheet every Monday morning."     |  <- 1-line framing, ink-700
+--------------------------------------------------------------------------------+
|  FEATURE GRID (3-4 cards, equal width)                                         |
|  +------------------+  +------------------+  +------------------+             |
|  | [icon]           |  | [icon]           |  | [icon]           |             |
|  | Zero-friction     |  | AI risk          |  | Draft replies,   |             |
|  | check-ins         |  | flagging         |  | not busywork     |             |
|  | Clients answer    |  | Know who's       |  | Claude drafts a  |             |
|  | via a link. No    |  | disengaging      |  | reply, you edit  |             |
|  | app, no login.    |  | before they churn|  | and send.        |             |
|  +------------------+  +------------------+  +------------------+             |
+--------------------------------------------------------------------------------+
|  PRICING (§4)                                        [Monthly] toggle later    |
|  +-------------+     +-------------+     +-------------+                      |
|  | Starter     |     | Pro         |     | Studio      |                      |
|  | $29/mo      |     | $59/mo      |     | $99/mo      |                      |
|  | up to 10    |     | up to 30    |     | unlimited + |                      |
|  | clients     |     | clients     |     | white-label |                      |
|  | [Start trial]|    | [Start trial]|<-- highlighted/  | [Start trial]|        |
|  |             |     |  "Most popular" border-brand-600|             |        |
|  +-------------+     +-------------+     +-------------+                      |
+--------------------------------------------------------------------------------+
|  FINAL CTA STRIP (brand-50 bg)                                                 |
|  Ready to get your Mondays back?         [Start free 14-day trial ->]          |
+--------------------------------------------------------------------------------+
|  FOOTER — logo, nav links, contact, (c) year                                   |
+--------------------------------------------------------------------------------+
```

## Mobile (<640px)

- Nav collapses to `[Logo] ... [Menu ≡]`; CTA button moves into the hamburger menu, not hidden.
- Hero: headline/subhead/CTA stack full-width, centered text; screenshot placeholder becomes
  full-bleed below the CTA (not beside it).
- Feature grid: 3 cards stack to a single column, full width.
- Pricing: 3 cards stack vertically in priority order **Pro → Starter → Studio** (lead with the
  plan most coaches will pick, not left-to-right price order) — flag this order choice for
  Engineer-Squad/PM sign-off, it's a deliberate deviation from the desktop left-to-right layout.

## Content notes

- Headline is written as the actual value prop (removing manual triage work), not a generic
  "AI-powered coaching platform" line — matches PROJECT_BRIEF.md's differentiation angle (§7).
- No pricing toggle (annual/monthly) in V1 wireframe — PROJECT_BRIEF.md §4 only specifies flat
  monthly tiers; add only if Researcher-Squad's GTM work (TSK-002) recommends an annual discount.
- Brand name in `[Logo/Wordmark]` is a placeholder pending TSK-001 — do not hardcode "GritDesk" in
  implementation without checking TSK-001's status in backlog-inbox.md first.
