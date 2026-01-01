---
title: "Content updates"
description: "How new guides, comparisons, and app updates are published and indexed."
section: "Editorial"
order: 2
draft: false
---

Content is published through GitHub and deployed on Cloudflare Pages.

## Publishing flow
1. Content is added to `src/content/` or `src/data/`.
2. GitHub Actions builds and deploys the site.
3. The sitemap updates automatically on build.

## Indexing
Submit the sitemap to Google Search Console:
- `https://streamingguide.org/sitemap-index.xml`

New content is discoverable as soon as the build completes and the sitemap updates.
