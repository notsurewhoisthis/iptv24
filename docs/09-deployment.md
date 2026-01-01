# Deployment

## Cloudflare Pages
- Deploys from GitHub on every push to `main`.
- Build command: `npm run build`
- Output directory: `dist/`

## Environment variables
Set these in Cloudflare Pages and local `.env`:
- `SITE_URL=https://streamingguide.org`
- `WEB3FORMS_KEY` (contact and newsletter)
- `PUBLIC_VITALS_ENDPOINT` (optional)
- `PUBLIC_GA_MEASUREMENT_ID` (Google Analytics 4)

## Post-deploy checks
- Verify `https://streamingguide.org/sitemap-index.xml` loads.
- Confirm `robots.txt` includes the sitemap URL.
