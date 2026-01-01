# Getting Started

## Prerequisites
- Node.js 20+
- npm (recommended for CI parity)

## Install and run
```bash
npm ci
npm run dev
```
The site runs at `http://localhost:4321`.

## Build and preview
```bash
npm run build
npm run preview
```

## Environment variables
- `SITE_URL`: production domain for canonical URLs and sitemap.
- `WEB3FORMS_KEY`: contact and newsletter forms.
- `PUBLIC_VITALS_ENDPOINT`: optional Core Web Vitals beacon endpoint.

## Project highlights
- Programmatic app, device, and comparison pages are driven by `src/data/`.
- Long-form content lives in `src/content/` collections.
- SEO is centralized in `src/components/common/SEO.astro`.

## Common tasks
- Add a blog post: create a Markdown file in `src/content/blog/`.
- Update iOS/macOS apps: `npm run update:apps`.
- Update Android apps: `npm run update:android-apps`.
