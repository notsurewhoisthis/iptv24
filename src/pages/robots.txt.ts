import type { APIRoute } from 'astro';
import { siteConfig } from '@/config';

export const GET: APIRoute = () => {
  const robotsTxt = `# robots.txt for ${siteConfig.name}
# https://www.robotstxt.org/

User-agent: *
Allow: /

# Disallow admin and API routes (if any)
Disallow: /api/
Disallow: /_astro/
Disallow: /dashboard/
Disallow: /docs/
Disallow: /changelog/
Disallow: /testimonials/
Disallow: /roadmap/
Disallow: /login/
Disallow: /register/
Disallow: /forgot-password/
Disallow: /pricing/
Disallow: /enterprise/
Disallow: /status/
Disallow: /customers/
Disallow: /features/
Disallow: /integrations/
Disallow: /demo/
Disallow: /security/
Disallow: /careers/

# AI search crawlers (allow for citations)
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

# AI training crawlers (block if not needed)
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Google-Extended
Disallow: /

# Sitemap location
Sitemap: ${siteConfig.url}/sitemap-index.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
