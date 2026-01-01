# Components

## SEO and layout
- `src/components/common/SEO.astro` centralizes meta tags and schema.
- `src/layouts/BaseLayout.astro` is the default page shell.
- `src/layouts/BlogLayout.astro` adds blog-specific metadata.

## Shared UI
- `src/components/layout/` contains Header and Footer.
- `src/components/sections/` contains reusable marketing sections.
- `src/components/blog/` and `src/components/apps/` power listings.

## Adding a new section
1. Create a component in `src/components/sections/`.
2. Compose it inside a page in `src/pages/`.
3. Add any needed data in `src/data/`.
