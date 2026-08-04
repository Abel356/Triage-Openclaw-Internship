# Triage Website

This directory contains the static Triage landing page deployed by Vercel.

- Vercel project root: `website`
- Production branch: `main`
- Entry point: `index.html`

## GEO and discovery files

- `robots.txt` publishes crawler access and the sitemap location.
- `sitemap.xml` lists the homepage and focused canonical guides. Update each `lastmod` value only when that page materially changes.
- `llms.txt` gives language-model crawlers a concise, limitation-aware product summary.
- `assets/triage-preview.png` is the Open Graph and X social preview.
- `guides/how-i-used-clawup-to-build-triage/index.html` is the first focused question-answer page.

The public canonical origin is `https://triage-amber-iota.vercel.app/`.

The local `.vercel` directory is intentionally excluded from source control.
