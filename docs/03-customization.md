# Customization

## Branding
- Logo: `public/logo.svg` (also used in metadata and headers).
- Favicon: `public/favicon.svg`.
- Open Graph image: `public/images/og-image.png` (if present).

## Navigation and content
- Navigation lives in `src/config/site.ts`.
- Section landing pages are in `src/pages/`.
- Content collections live in `src/content/`.

## Visual styling
- Tailwind v4 is configured via `src/styles/global.css`.
- Follow existing class patterns for spacing and typography.

## SEO titles
If a page title is too long for SERP, set `seoTitle` in the page data or template to shorten it.
