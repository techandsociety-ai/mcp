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

### 7. Say it once — Data / Connect de-duplication
- **Feeder**: `data-connect-dedupe` · commit `9668f54`
- **Tickets**: continues the mandate-5 consolidation begun in thread 5.
- **What**: Mission, The Data and Connect each opened by defining CHIP50
  with the same "since 2020 / social media, political attitudes, mental
  health" triad. Mission keeps the definition. The Data drops its
  re-introduction and leads with the property its stats and coverage grid
  demonstrate. Connect drops the dataset recap and opens on the mechanism.
  Structure unchanged — still three sections, still three nav items.
- **Status**: merged to site-v2, awaiting David's local review.
- **Lift out**: revert `9668f54`. Independent of the copy threads, though
  thread 9 rewrites prose adjacent to it.

### 8. A hard 13px floor under the homepage scale
- **Feeder**: `type-floor-3` · commit `b35a998`
- **Tickets**: —
- **What**: Threads 4 and 4b moved the whole scale up a point at a time but
  left the bottom tier at 11.5px, which is where the letterspaced labels
  live (stat captions, coverage headings, report meta, tags, masthead line
  one). Floor is now 13px; the 11.5/12 split collapses into it. Buttons,
  section tags and the nav CTA go to 13.5px to keep the ordering. The
  featured chart's own SVG labels come up too (10 → 11, axis and plate
  labels → 12). Larger type untouched. Report pages not in scope.
- **Status**: merged to site-v2, awaiting David's local review.
- **Lift out**: revert `b35a998`.

### 9. De-Algorithm the page chrome
- **Feeder**: `homepage-copy` · commit `96ec90d`
- **Tickets**: mandate 6 (de-slop); carries David's pending copy-edit of
  the thread-5 connect section.
- **What**: The site's own voice, rewritten against Garner. Hero drops the
  gerund tagline for what the site holds; mission leads with method rather
  than an abstraction and loses a tricolon; Connect's "Ask a question. /
  Get a rigorous analysis." setup-and-payoff becomes one clause; "Back
  come tables…" loses the inversion; the URL is no longer sold as "all you
  need". Eyebrows: the hand-maintained "26 ENTRIES · 2026" count is gone
  (and its CSS), "· 2026" drops from the hero, and "· JULY 2026" drops
  from all 26 report rows, where an identical date on every entry carried
  no information. The type labels (REPORT, CAPSTONE, SYNTHESIS…) stay.
- **Status**: merged to site-v2, awaiting David's local review.
- **Lift out**: revert `96ec90d`.

### 10. Break the reversal formula in the report blurbs
- **Feeder**: `report-blurbs` · commit `990d2f8`
- **Tickets**: mandate 6 (de-slop).
- **What**: Read as a column, the 26 blurbs had one sentence shape —
  finding, em-dash, reversal. 19 carried the dash, 12 turned on "but", 6 on
  "not X". Twenty are rewritten to vary the architecture; six that never had
  the tic are untouched, as are all report titles (those belong to the
  reports). Every claim held fixed — no number, direction, population, wave
  count or hedge changed, verified by diffing the quantity tokens of each
  blurb before and after.
- **Status**: merged to site-v2, awaiting David's local review.
- **Lift out**: revert `990d2f8`. Safe to lift alone; it touches only
  `.rrow-desc` text.

### 11. Example query stops breaking mid-word
- **Feeder**: `urlbox-wrap` · commit `51de858`
- **Tickets**: —
- **What**: `.url-box` carried `word-break: break-all` for the long Cloud
  Run URL, but the example-question box reuses the class, so prose broke
  wherever the line ran out ("Show me how Ti / kTok usage"). The class now
  uses `overflow-wrap: break-word`; `break-all` is scoped to `#mcp-url`.
  Pre-existing defect, caught while screenshotting thread 9.
- **Status**: merged to site-v2, awaiting David's local review.
- **Lift out**: revert `51de858`.

### 12. "Get Access" gets a section, marked TK
- **Feeder**: `access-tk` · commit `586ba9d`
- **Tickets**: relates to #14 / the access-story MVP David is taking to
  Jason; supersedes part of thread 6 (the nav CTA no longer points at
  `#connect`).
- **What**: New `#access` section. Since thread 6 the Get Access button
  pointed at `#connect`, which answers "how do I wire this up" rather than
  "how do I get let in" — different questions, only one settled. The
  section states what is known (access is granted, not self-served; Google
  sign-in) and lists what is not as open questions rather than a "coming
  soon": who qualifies, how you ask, what the wait is, whether anything
  answers to a visitor with no account. Carries a visible **TK** flag and a
  dashed amber border. The Google sign-in line MOVES out of Connect's
  client list (not duplicated — thread 7's rule); Connect points at
  `#access` instead. `.client-list a` gets styling; the new link was
  rendering as a default browser link.
- **⚠ Do not deploy to prod while the TK is showing.** The access policy
  is settled first — and that call is not David's alone. `grep -n TK
  docs/index.html` before any prod merge. A CI guard on the prod deploy
  is available if wanted, not built.
- **Status**: merged to site-v2, on staging, awaiting David's review.
- **Lift out**: revert `586ba9d` (restores the Connect sign-in bullet and
  points the nav CTA back at `#connect`).

### 13. Link the hosted chat from Connect
- **Feeder**: `hosted-chat` · commit `4bab5f1`
- **Tickets**: —
- **What**: `chat.techandsociety.ai` (LibreChat, creds shared privately) is
  a client already wired to the server, so it is listed as a third way in
  alongside "hand the URL to your assistant" and "add it to your config" —
  not promoted to a section, per David. Placed third, ahead of the access
  caveat, which applies to all three routes. Deliberately not first:
  leading with it would make the hosted client the headline product.
- **OPEN — framing is David's call**: described as "a hosted client already
  wired to the server". David calls it a demo; the instance titles itself
  *Tech and Society Insights*, i.e. presents as product. Calling it a demo
  on the page contradicts what a visitor lands on; calling it the product
  claims more than has been decided. Neutral wording used until he picks.
- **Status**: merged to site-v2, on staging, awaiting David's review.
- **Lift out**: revert `4bab5f1` (one list item).

## Earlier site-v2 work (pre-ledger)

- `ec30357` Baseline-align the masthead brand and crumb
- `a79385b` Make the Contents toggle work on desktop (superseded by thread 2)
- `a186e9c` Homepage reference row, mcp back-link, AGENTS.md design-status fix
  (issue #21)
- Shared design-system extraction (`assets/report.css` / `report.js`,
  issue #21) and the rest of the `site-v2` history before 2026-08-13.
