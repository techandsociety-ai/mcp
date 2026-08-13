# Big PR ledger — `site-v2`

Running ledger of every thread going into the site-v2 PR. The PR ships as one
thing, but each thread is a feeder branch merged into `site-v2` with its own
commit(s), so any single thread can be lifted out or reverted without
unpicking the rest ("we hate what you did with X, go back" = revert the
commits listed for X). Update this file when a thread is added, revised, or
dropped; it doubles as the eventual PR description.

Not deployed — `docs/` is the published tree; this file stays repo-root only.

## Threads

### 1. Theme toggle → sun/moon icon
- **Feeder**: `header-cleanup` · commit `9fedf20`
- **Tickets**: —
- **What**: Masthead "Theme" text button replaced with inline Feather sun/moon
  SVGs injected by shared `report.js` (no iconset dependency — site stays
  dependency-free). Icon shows the mode a click switches to; same three-state
  logic and `chip50-theme` key.
- **Status**: awaiting David's local review.
- **Lift out**: revert `9fedf20`.

### 2. Contents toggle rework
- **Feeder**: `header-cleanup` · commit `c10c402`
- **Tickets**: —
- **What**: Masthead "Contents" button (desktop: hid sidebar + recentered;
  mobile: toggled an off-screen TOC, looked dead) replaced with a toggle next
  to the thing it controls. Desktop: chevron in a thin sticky rail left of the
  report; collapsed, prose recenters at its readable measure and
  figures/tables break out toward the 948px width the charts are drawn at;
  persists via `chip50-toc`. Mobile: the "Contents" disclosure row itself,
  collapsed by default. Button markup removed from all 28 report pages.
- **Status**: awaiting David's local review.
- **Lift out**: revert `c10c402` (restores the old masthead button and
  behavior; independent of thread 1).

### 3. Masthead series crumb links to its index
- **Feeder**: `header-cleanup` · commit `288fd8d`
- **Tickets**: —
- **What**: "The AI@Work Series" / "The AI@School Series" masthead labels on
  the 22 series entry pages are now links to their series index. Series index
  pages keep a plain crumb. Open question: the five standalone reports'
  "CHIP50 Reports" crumb is still inert — their only parent is the
  password-gated homepage; link it anyway?
- **Status**: awaiting David's local review.
- **Lift out**: revert `288fd8d`.

## Earlier site-v2 work (pre-ledger)

- `ec30357` Baseline-align the masthead brand and crumb
- `a79385b` Make the Contents toggle work on desktop (superseded by thread 2)
- `a186e9c` Homepage reference row, mcp back-link, AGENTS.md design-status fix
  (issue #21)
- Shared design-system extraction (`assets/report.css` / `report.js`,
  issue #21) and the rest of the `site-v2` history before 2026-08-13.
