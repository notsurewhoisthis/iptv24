# Configuration

## Site config
Global site settings live in `src/config/`:
- `src/config/site.ts`: site name, description, URL, and defaults.
- `src/config/index.ts`: merged config used across layouts and pages.

## Astro config
Project-level settings live in `astro.config.mjs`:
- sitemap generation
- integrations (MDX, RSS, sitemap)

## Environment variables
Set these in Cloudflare Pages and local `.env`:
- `SITE_URL` for canonical links, sitemap, RSS
- `WEB3FORMS_KEY` for contact and newsletter
- `PUBLIC_VITALS_ENDPOINT` for optional CWV beacons
- `PUBLIC_GA_MEASUREMENT_ID` for Google Analytics 4

## SEO defaults
- Canonicals are derived from `SITE_URL` and the current path.
- `robots.txt` and `sitemap-index.xml` are generated at build time.
- Schema is emitted in `src/components/common/SEO.astro`.
