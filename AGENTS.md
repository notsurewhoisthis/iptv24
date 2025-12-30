# Repository Guidelines

## Quick Start
- Required: Node.js 20+, npm.
- Install: `npm ci`
- Run locally: `npm run dev` (Astro dev server).
- Build: `npm run build` (static output in `dist/`).
- Preview: `npm run preview`
- Optional env vars: `SITE_URL`, `WEB3FORMS_KEY`, `PUBLIC_VITALS_ENDPOINT`.

## Project Structure & Module Organization
- `src/pages/`: Astro routes (SEO pages, blog, app/device pages).
- `src/layouts/`: Base/marketing/blog layouts and SEO wiring.
- `src/components/`: Reusable UI and content sections.
- `src/content/`: Markdown collections (`blog/`, `guides/`, `troubleshooting/`).
- `src/data/`: Programmatic datasets (`apps.json`, `android-apps.json`, devices, authors).
- `public/`: Static assets (images, icons, robots).
- `scripts/`: Data refresh utilities for App Store/Google Play.
- `.github/workflows/`: CI/CD and scheduled updates.

## Content Updates
- Blog/guides/troubleshooting: add Markdown under `src/content/<collection>/`.
- Required frontmatter: `title`, `description`, `publishedDate`, `author`, `tags`, `keywords`, `draft`.
- App data is generated: use `npm run update:apps` and `npm run update:android-apps` (do not hand-edit JSON).
- Author profiles live in `src/data/authors.ts` and render at `/authors/<slug>/`.

## Build, Test, and Development Commands
- `npm run dev`: local dev server.
- `npm run build`: production build.
- `npm run preview`: serve built site.
- `npm run lint`: ESLint.
- `npm run format`: Prettier.
- `npm run check`: lint + format check + `astro check`.

## Coding Style & Naming Conventions
- Keep existing formatting (2-space indentation, Tailwind utility classes).
- Use kebab-case slugs for content files.
- Prefer descriptive naming for sections and data keys.
- Run Prettier before committing UI changes.

## Testing Guidelines
- No dedicated test framework yet.
- Run `npm run check` before merging.
- If you add tests, document them here and add scripts to `package.json`.

## SEO/GEO Notes
- Global SEO handled in `src/components/common/SEO.astro`.
- Article pages use `BlogLayout` for schema, author links, and metadata.
- Device reviews emit Product + AggregateRating schema automatically.
- `llms.txt` is generated from `src/pages/llms.txt.ts`.

## Deployment & Automation
- Cloudflare Pages deploys from `main` via GitHub Actions.
- Auto app updates run biweekly via `.github/workflows/auto-update-apps.yml`.
- Web3Forms handles contact/newsletter forms; keep `WEB3FORMS_KEY` in secrets only.

## Commit & Pull Request Guidelines
- Commit messages: short, imperative (e.g., "Add ...", "Fix ...", "chore: ...").
- PRs should include a summary, impacted paths, and screenshots for UI changes.
- Note if data files under `src/data/` were regenerated.
