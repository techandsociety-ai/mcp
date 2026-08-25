# techandsociety.ai — website

The public website for **Tech & Society**, served via GitHub Pages at
[techandsociety.ai](https://techandsociety.ai).

The site is a set of self-contained, static HTML pages: a landing page and
thirty-odd published research reports built from the CHIP50 panel survey, two
of them running series. There is no build step and no framework.

> Looking for the MCP server itself (the tools, BigQuery queries, and Cloud Run
> deployment)? That lives in a separate repo:
> **[techandsociety-ai/mcp-server](https://github.com/techandsociety-ai/mcp-server)**.
> This repo is only the website.

## What gets deployed

**Only the `docs/` directory is published.** GitHub Pages serves it as-is (no
Jekyll theme — see `docs/_config.yml`), and `docs/CNAME` binds it to the
`techandsociety.ai` custom domain.

```
docs/                         ← the deployed site (and nothing outside it)
├── index.html                Landing page
├── 404.html                  Not-found page
├── report-*.html             Five standalone reports
├── work/                     "AI & Work" series — 13 entries, index, reference
├── school/                   "AI & School" series — 8 entries and an index
├── test-status/              Machine-generated; overwritten by CI. Never edit.
├── assets/                   Shared report design system, chart images,
│                             favicons, Open Graph card
├── _config.yml               Pages config (serve HTML as-is, no theme)
├── CNAME                     Custom domain: techandsociety.ai
└── AGENTS.md                 Notes for agents working on the site
```

Anything outside `docs/` (this README, `LEDGER.md`, `serve.py`) is repo support
and is **not** part of the published site.

## How it deploys

`.github/workflows/pages.yml` builds and publishes the site. It runs on:

- a push to `main` that touches `docs/**`, or
- a manual `workflow_dispatch` run.

The workflow uploads `docs/` as the Pages artifact and deploys it. Because the
trigger is scoped to `docs/**`, changes to repo-support files (like this README)
don't redeploy the site.

## Working on the site locally

The pages are plain static HTML with no build step. For a live-reloading
preview — edit a file in `docs/` and the browser refreshes itself — use the
bundled dev server with [uv](https://docs.astral.sh/uv/):

```bash
uv run serve.py            # serves docs/ at http://localhost:8000
```

`serve.py` declares its one dependency (`livereload`) inline via
[PEP 723](https://peps.python.org/pep-0723/), so `uv run` installs it into a
cached ephemeral environment automatically — no venv or install step. Flags:
`--port`, `--root`, `--host` (see `uv run serve.py --help`).

No uv? `pip install livereload && python3 serve.py` works too. Or, for a
zero-dependency preview (you reload the browser yourself):

```bash
cd docs && python3 -m http.server 8000
```

## Deploying a change

1. Edit files under `docs/` on a branch.
2. Push that branch to the staging mirror and look at it there:
   `git push staging <branch>:main` → https://techandsociety.ai/site-staging/
3. Open a PR against `main`.
4. On merge, `pages.yml` publishes automatically — the live site updates within
   a minute or so. Never push to `main` directly; every push to it is a
   production deploy.

See [`AGENTS.md`](AGENTS.md) for how staging works and for the thread/ledger
convention used on larger reshapes.
