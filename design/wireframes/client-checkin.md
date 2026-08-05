# Wireframe — Public Client Check-In Page

Ref: `PROJECT_BRIEF.md` §5 item 4. Public, tokenized URL, **no login, no app install** — this is
the product's core friction-reduction wedge (§7), so the wireframe optimizes hard for a client who
has zero context and is filling this out on their phone between other things.

## Mobile-first (this screen is designed mobile-first, not adapted from desktop)

```
+----------------------------------+
|                                    |
|   [Coach Name]'s Weekly Check-in  |  <- text-lg, ink-800; coach's brand, not product's
|   Hi Jane — how did this week go? |  <- friendly, low-formality greeting
|                                    |
+------------------------------------+
|  1. How did this week go overall? |  <- text-base, question label
|  <textarea, min-height 3 lines>   |
|                                    |
|  2. Did you hit your main goal?   |
|  <textarea>                       |
|                                    |
|  3. What got in the way, if       |
|     anything?                     |
|  <textarea>                       |
|                                    |
|  (up to 5 questions, coach-       |
|   configured per PROJECT_BRIEF    |
|   §5 item 3 — this wireframe      |
|   shows 3 as an example)          |
|                                    |
|        [Submit Check-in]          |  <- full-width button, min 44px tall
|                                    |
+------------------------------------+
```

## Post-submit confirmation state (replaces the form, same page)

```
+------------------------------------+
|                                    |
|              [check mark]         |
|                                    |
|         Thanks, Jane!             |
|   Your check-in was sent to       |
|   [Coach Name]. See you next week.|
|                                    |
+------------------------------------+
```

## Desktop (≥768px) — same content, just constrained width

```
+--------------------------------------------------------------------------------+
|                                                                                  |
|                    +----------------------------------------+                  |
|                    |  [Coach Name]'s Weekly Check-in         |                  |
|                    |  Hi Jane — how did this week go?        |                  |
|                    |                                          |                  |
|                    |  1. How did this week go overall?       |                  |
|                    |  <textarea>                              |                  |
|                    |  2. ...                                 |                  |
|                    |                                          |                  |
|                    |            [Submit Check-in]            |                  |
|                    +----------------------------------------+                  |
|                          (form capped at ~600px, centered)                     |
+--------------------------------------------------------------------------------+
```

## Content & UX notes

- **No app-level nav, no product branding in the header** — the coach's name leads, since the
  client's relationship is with their coach, not with the product. Small product wordmark/link
  only in the footer ("Powered by [Product]").
- **No login/account creation anywhere on this page or its confirmation state** — this is a hard
  constraint from PROJECT_BRIEF.md §2 ("no app install, no client login"), not a nice-to-have.
- Single column always (never a multi-column form), generous spacing (`tokens.md` §6 form
  guidance), textarea min-height so short answers don't feel cramped and long answers don't need
  excessive scrolling to review before submit.
- Token expiry/invalid-token state (e.g., client opens a stale link) is **not covered by this
  wireframe** — logging under Cross-Squad Requests below since it's a product-behavior decision
  (Engineer-Squad/PM), not a pure visual-design question.

## Cross-Squad Requests raised by this wireframe

- Need a decision from Engineer-Squad/PM on behavior for an expired/invalid check-in token
  (error message copy + whether an expired link can regenerate) before TSK-007 implementation —
  logged in `squad-handshake/ux-ui-designer-squad.md` under Cross-Squad Requests.
