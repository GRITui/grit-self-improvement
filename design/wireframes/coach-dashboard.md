# Wireframe — Coach Dashboard

Ref: `PROJECT_BRIEF.md` §5 items 6 (dashboard) and 8's "drill into history". Authenticated,
coach-only. Two views: client list (default) and client detail (drill-in).

## View A: Client List (default landing view after login)

```
+--------------------------------------------------------------------------------+
| [Logo]   Dashboard   Clients   Settings                    (Coach Name) [v]    |  <- app nav
+--------------------------------------------------------------------------------+
|  Clients                                          [+ Invite Client]            |  <- text-2xl page title
|  <Search clients...>              Filter: [All risk v]                        |
+--------------------------------------------------------------------------------+
|  NAME              STREAK       LAST CHECK-IN        RISK           |          |
|  ------------------------------------------------------------------- |         |
|  Jane Alvarez       6 weeks      2 days ago           {Low}          |  >      |  <- row click -> drill-in
|  Marcus Chen         2 weeks      9 days ago           {High}        |  >      |  <- risk-high-bg row tint
|  Priya Nair          11 weeks     1 day ago            {Low}         |  >      |
|  Tom O'Reilly        0 weeks      19 days ago          {High}        |  >      |
|  Sam Osei            4 weeks      5 days ago           {Medium}      |  >      |
|  ------------------------------------------------------------------- |         |
+--------------------------------------------------------------------------------+
```

- Table sorted by risk (High → Medium → Low) by default, not alphabetically — the whole point of
  the dashboard is surfacing who needs attention first (per PROJECT_BRIEF.md's core differentiator).
- Risk badge = `{Low}` / `{Medium}` / `{High}` pill using `risk-low`/`risk-medium`/`risk-high`
  tokens from `../tokens.md` §2.3; badge always carries the text label, never color alone (a11y
  note in tokens.md §7).
- Empty state (0 clients): replace table with centered message + `[+ Invite Client]` CTA, per
  tokens.md §6 empty-state guidance — no illustration needed for V1.

### Mobile (<640px)

- Table becomes a stacked card list: one card per client, name + risk badge on the top row,
  streak/last-check-in as secondary text below. Tapping the card opens drill-in (same as row
  click on desktop).

## View B: Client Drill-In (history + AI summary/draft reply)

```
+--------------------------------------------------------------------------------+
| < Back to Clients                                                              |
|  Jane Alvarez                                   {Low}      6 week streak       |  <- text-2xl + badges
+--------------------------------------------------------------------------------+
|  CHECK-IN HISTORY (most recent first)                                          |
|                                                                                  |
|  +----------------------------------------------------------------------+      |
|  | Week of Aug 3, 2026                                    {Low risk}    |      |
|  | Client responses:                                                    |      |
|  |   Q1: How did this week go? -> "..."                                 |      |
|  |   Q2: ... -> "..."                                                   |      |
|  | --------------------------------------------------------------------|      |
|  | AI Summary: "Jane hit her workout goal 4/5 days, energy improving."  |      |
|  | Suggested reply:                                                     |      |
|  |   <textarea, pre-filled with AI draft, editable>                     |      |
|  |   [Send Reply]   [Discard]                                           |      |
|  +----------------------------------------------------------------------+      |
|                                                                                  |
|  +----------------------------------------------------------------------+      |
|  | Week of Jul 27, 2026                                   {Low risk}    |      |
|  | ... (collapsed by default; click to expand) ...                      |      |
|  +----------------------------------------------------------------------+      |
+--------------------------------------------------------------------------------+
```

- Only the most recent check-in is expanded by default; older ones are collapsed rows (date +
  risk badge + chevron) to keep the drill-in scannable for clients with a long history.
- The AI draft reply is **never** shown as already-sent — always an editable `<textarea>` with an
  explicit `[Send Reply]` action, matching PROJECT_BRIEF.md §8's "coach must review before
  sending, never auto-send" constraint. This is a hard requirement, not a style choice — flag to
  Engineer-Squad/QA-Tester-Squad if implementation ever pre-sends.
- `[Discard]` clears the draft without sending (coach writes their own reply from scratch instead).

## Cross-squad note

This screen assumes streak/last-check-in/risk-flag data shape from TSK-006 (client roster) and
TSK-008 (AI summarization/risk/draft-reply) — logged as informational only, not a blocker (see
Cross-Squad Requests in the handshake file if anything here turns out to need a data model
Engineer-Squad hasn't planned for).
