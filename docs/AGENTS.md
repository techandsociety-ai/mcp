# AGENTS.md — techandsociety.ai site content (`docs/`)

Guidance for people and agents editing the deployed site. Repo-wide workflow
rules (branch/PR scoping, local dev server) live in the root
[`AGENTS.md`](../AGENTS.md) — read that first. Note that this file is itself
deployed and publicly readable.

## What this directory is

The deployed source of **techandsociety.ai** — hand-written static HTML, no
build step, no framework. It is **not** a single file; the tree is:

- `index.html` — home page
- `mcp.html` — MCP server docs and connection guide
- `report-*.html` — five standalone survey reports
- `work/` — "AI & Work" report series (13 numbered entries, an index, and a
  reference page)
- `school/` — "AI & School" report series (8 numbered entries — entry 06 is
  intentionally absent — and an index)
- `test-status/` — machine-generated test dashboard, overwritten by CI from the
  `mcp-server` repo. **Never hand-edit it**; changes will be clobbered by the
  next bot commit.
- `CNAME`, `chip50.png`, `_config.yml` — Pages plumbing and shared logo

## The MCP server

The MCP server is a separate repo:
[`techandsociety-ai/mcp-server`](https://github.com/techandsociety-ai/mcp-server).
This site only documents it.

- **Live URL**: `https://chip50-mcp-zbqg33tava-uc.a.run.app/mcp` — this is the
  production `chip50-mcp` Cloud Run service. (Cloud Run also serves the same
  service at a deterministic alias, `chip50-mcp-563455814008.us-central1.run.app`;
  both hostnames are one service, not two deployments.)
- **Transport**: remote MCP over HTTPS (not stdio)
- **Auth**: Google OAuth; access is managed — unauthorized users request access
  at the auth screen. Users connect via Settings → Connectors → Add custom
  connector in Claude.
- **Backend**: Google Cloud Run + BigQuery.
- **Tools**: don't hardcode tool counts or lists in site copy — they drift.
  The server documents itself: connect and call `introduce_mcp` (or
  `get_available_variables`) for the current inventory, and describe tools on
  the site in terms of what they let a reader do.

## Design status

- `index.html` and `mcp.html` share the chip50.org-family look: Montserrat
  (headings), Barlow (body), Barlow Condensed (labels), navy `#1c3461` /
  accent `#2d5fa6`. Google Fonts is the only external dependency.
- The report pages (`report-*.html`, `work/`, `school/`) were generated
  one-off and do **not** share a stylesheet or design system yet. A unified
  report design is in progress — don't propagate the existing per-page styles
  to new pages, and don't treat any single report page as the canonical style
  reference.
- `index.html` and `mcp.html` carry a client-side password gate (SHA-256 check,
  `sessionStorage` session). The report pages are not gated.

## Deployment (corrected — read this)

`docs/` deploys via `.github/workflows/pages.yml`: a push to `main` that
touches `docs/**` publishes the whole directory to GitHub Pages (custom domain
`techandsociety.ai`) within a couple of minutes. There is no separate build
step and no "Pages serves the branch root" config.

**Do not commit or push to `main` directly** — every merge is a production
deploy. Work on a branch, open a PR, and let a human merge it. Preview locally
first: `uv run serve.py` from the repo root (see root `AGENTS.md`).

## Things to preserve

- The setup section on `mcp.html` is oriented toward **end users connecting to
  the existing server**, not self-hosting. Don't revert it to deployment
  instructions.
- The server URL in the setup section is the real production URL, not a
  placeholder.
- The password gate on `index.html`/`mcp.html` is intentional; don't remove it
  as "cleanup".
