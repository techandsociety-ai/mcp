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
- **Status**: merged to site-v2, awaiting David's local review.
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
- **Status**: merged to site-v2, awaiting David's local review.
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
- **Status**: merged to site-v2, awaiting David's local review.
- **Lift out**: revert `288fd8d`.

### 4. Raise the bottom of the type scale
- **Feeder**: `type-floor` · commit `b82e5ec`; part 2 on `type-floor-2` ·
  commit `04b8d4c` (whole scale +1px under 19px, incl. mcp.html — David's
  "+~1px on everything", 2026-08-13)
- **Tickets**: —
- **What**: Small + low-contrast text was rough on the eyes (David,
  2026-08-13). Homepage: 9.5–11px letterspaced labels come up ~1px, 13px
  `--cream-dim` body text → 13.5px, `--cream-dim` #7A8FA8 → #8CA0B8. Report
  system: `--muted` gains a contrast notch in both themes; sub-13px tier
  (sidebar label, chart ticks/labels, table group rows) up ~0.5–1px; chart
  text a bit more since it renders scaled-down inside the 948px viewBox.
  Remaining: `mcp.html` still has a few 10–11px labels — sweep it when that
  page gets its consolidation-era pass.
- **Status**: merged to site-v2, awaiting David's local review.
- **Lift out**: revert `b82e5ec`.

### 5. One MCP-first Connect section
- **Feeder**: `connect-consolidation` · commit `67bb41a`
- **Tickets**: relates to the mandate-5 consolidation (see issues #5/#7
  context); David to attach numbers.
- **What**: "How It Works" and "Connect/Get Access" merged into a single
  `#connect` section. Killed the "Connect in four steps. Start researching in
  five." header and both numbered step columns. Copy is client-agnostic
  (Claude, ChatGPT, Cursor, any MCP client); the server URL gets top billing
  with a copy-to-clipboard button. Stops hardcoding tool names/counts in the
  section (AGENTS.md rule) and drops the stale "n < 30" suppression claim.
  Nav loses the How It Works item; hero button → `#connect`. Copy is a draft —
  David wants an editing pass on the combined section.
- **Status**: merged to site-v2; David: "consolidated section IS a big
  improvement" — approved pending his copy-edit pass.
- **Lift out**: revert `67bb41a` (restores both original sections).

### 6. Unlink mcp.html from the homepage
- **Feeder**: `unlink-mcp-docs` · commit `516fb36`
- **Tickets**: —
- **What**: mcp.html stays live but unlinked (same treatment as
  test-status) while the access story gets decided (David asking Jason for
  an access-process MVP). Nav "Get Access" → `#connect`; connect-section
  docs button and footer "MCP Docs" link removed. Pending decisions before
  the page's rebuild: the request/whitelist process (not David's final
  call), and the brand direction — per issue #6 the navy homepage look is
  an explicit placeholder blocked on Jason's deck; mcp.html's chip50.org
  look is the parent-project family; reports' warm-paper was chosen by
  David in the #21 unification.
- **Status**: merged to site-v2, awaiting David's review.
- **Lift out**: revert `516fb36` (restores all three homepage links).

## Earlier site-v2 work (pre-ledger)

- `ec30357` Baseline-align the masthead brand and crumb
- `a79385b` Make the Contents toggle work on desktop (superseded by thread 2)
- `a186e9c` Homepage reference row, mcp back-link, AGENTS.md design-status fix
  (issue #21)
- Shared design-system extraction (`assets/report.css` / `report.js`,
  issue #21) and the rest of the `site-v2` history before 2026-08-13.
