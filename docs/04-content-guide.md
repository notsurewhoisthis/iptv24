# Content Guide

## Collections
- Blog posts: `src/content/blog/`
- Guides: `src/content/guides/`
- Troubleshooting: `src/content/troubleshooting/`
- Devices and comparisons: `src/data/devices.ts`, `src/data/comparisons.ts`

## Required frontmatter
```
---
title: "..."
description: "..."
publishedDate: YYYY-MM-DD
author: "Streaming Guide Lab"
tags: ["..."]
keywords: ["..."]
draft: false
---
```

## Automation
- n8n publishes blog posts by committing to `src/content/blog/`.
- App metadata refresh is automated by `.github/workflows/auto-update-apps.yml`.

## Sitemap
New content is included automatically by Astro sitemap generation.
