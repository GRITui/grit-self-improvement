# PM Charter — Multi-Squad Operating Model

This repo is run as a continuous multi-agent build loop. This file is the entry point for any new
squad session — read this first, then `PROJECT_BRIEF.md`, then the relevant files below. Each
squad session starts with zero memory of prior sessions; state lives only in files, never in chat.

## Roles

- **PM (Owner-Assistant)** — this role (run by the repo owner's main session). Owns
  `PROJECT_BRIEF.md`, triages `backlog-inbox.md`, reviews and merges/rejects every squad PR,
  resolves cross-squad requests and `NEEDS_OWNER_REVIEW` items. Never writes app code directly.
- **Researcher-Squad** — validates/deepens `PROJECT_BRIEF.md`, triages new backlog items, adds
  `<researcher_notes>`, moves items toward `READY_FOR_PM`.
- **UX-UI-Designer-Squad** — design tokens, wireframes, component specs.
- **Engineer-Squad** — drafts, builds, tests, opens PRs for code changes.
- **QA-Tester-Squad** — tests merged/PR'd work against requirements, passes or rejects.

Each is a **separate Claude Code session**, run by the owner, invoking the `ai-engineering-loop`
skill and told which role to act as. This session (PM) cannot spawn them — the owner starts them
in other sessions and points them at this repo/branch.

## How to start a squad session (give this to the owner for each new session)

1. Attach this repo (`gritui/grit-self-improvement`), checked out on `main` (squads work off
   `main`, not the PM's bootstrap branch).
2. Tell the session explicitly which role it is acting as, e.g.: *"Act as Engineer-Squad. Invoke
   the ai-engineering-loop skill. Read PM_CHARTER.md, PROJECT_BRIEF.md,
   squad-handshake/engineer-squad.md, and backlog-inbox.md, then pull the next READY_FOR_PM item
   tagged for Engineer-Squad and execute one epoch cycle."*
3. The session updates only its own `squad-handshake/<squad>.md` file and, if it's Engineer-Squad,
   opens a PR for any code change.

## File map & conventions

| File | Owner | Purpose |
|---|---|---|
| `PROJECT_BRIEF.md` | PM + Researcher-Squad | Product/market source of truth |
| `backlog-inbox.md` | Everyone appends; PM/Researcher triage | Append-only task ledger |
| `squad-handshake/researcher-squad.md` | Researcher-Squad | Status/log for that squad |
| `squad-handshake/ux-ui-designer-squad.md` | UX-UI-Designer-Squad | Status/log |
| `squad-handshake/engineer-squad.md` | Engineer-Squad | Status/log |
| `squad-handshake/qa-tester-squad.md` | QA-Tester-Squad | Status/log |

Schema for both file types follows the `ai-engineering-loop` skill's Markdown+XML hybrid format
exactly — never raw JSON for inter-agent state.

## Branching & PR rules

- `main` is the integration branch.
- **Coordination files** (`backlog-inbox.md`, `squad-handshake/*.md`, `PROJECT_BRIEF.md` minor
  updates) may be committed **directly to `main`** by any squad — they are the low-friction
  communication channel itself, not a reviewable deliverable. Keep these commits small and
  frequent.
- **Code/product changes** (anything under the app source tree, infra config, dependencies) must
  **never** be committed directly to `main`. Always: branch off `main` (suggested prefix
  `squad/engineer-<task-id>-*`), open a PR, and wait for PM review.
- The PM reviews every squad PR against: does it satisfy the backlog item's description, does it
  pass whatever QA-Tester-Squad has already logged in its handshake file (if QA ran first), is it
  scoped to just that task. PM merges if it passes, or requests changes with specific comments
  (and logs the rejection reason in `squad-handshake/engineer-squad.md` under Blockers if the
  squad needs to see it next cycle).

## Circuit breaker & parallelism

Per the `ai-engineering-loop` skill: 3 consecutive failures on a task → mark `BLOCKED` in that
squad's handshake file with details, then immediately pull the next `READY_FOR_PM` item for that
squad. Never let one blocked task stall a squad. Blocked items wait for PM/Researcher re-triage,
not more autonomous retries.

## Token-optimization rule

Backlog items should be scoped small enough that one squad session can read
`PM_CHARTER.md` + `PROJECT_BRIEF.md` + its own handshake file + the one backlog item and have
everything it needs — never require a squad to read another squad's full history to act. If a
task's description alone isn't enough context, that's a signal the backlog item is scoped too
large; split it in `backlog-inbox.md` rather than making the squad read more files.

## Cross-squad requests

If a squad needs something from another squad (e.g. Engineer needs a design token that doesn't
exist yet), it logs it under `## Cross-Squad Requests` in its own handshake file. It does **not**
message the other squad directly. The PM (or the target squad's next cycle, since it should skim
other squads' handshake files during triage) picks it up and turns it into a new
`backlog-inbox.md` item.
