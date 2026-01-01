# Streaming Guide (IPTV24)

Streaming Guide is an Astro-powered IPTV site focused on apps, devices, comparisons, and troubleshooting. The site is designed for programmatic content generation, strong technical SEO, and fast static delivery at https://streamingguide.org.

## What is in this repo
- Programmatic app pages (iOS, macOS, Android, Android TV)
- Device model pages and category hubs
- Comparisons, guides, troubleshooting, and learning articles in Markdown
- SEO schema, sitemap, robots, RSS, and llms.txt
- Automated app metadata refresh via GitHub Actions

## Quick start
```bash
npm ci
npm run dev
```

Build and preview:
```bash
npm run build
npm run preview
```

## Content updates
- Blog posts: `src/content/blog/`
- Guides: `src/content/guides/`
- Troubleshooting: `src/content/troubleshooting/`
- App data (generated): `src/data/apps.json`, `src/data/android-apps.json`

Update app datasets locally:
```bash
npm run update:apps
npm run update:android-apps
```

## Deployment
- Cloudflare Pages deploys on every push to `main` via `.github/workflows/cloudflare-pages.yml`.
- Sitemap and canonical URLs use `SITE_URL` (set to `https://streamingguide.org` in production).
- Contact and newsletter forms use Web3Forms (`WEB3FORMS_KEY`).
- Google Analytics uses `PUBLIC_GA_MEASUREMENT_ID` (GA4).

## License
MIT. See `LICENSE`.
