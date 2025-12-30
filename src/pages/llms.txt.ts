import type { APIRoute } from 'astro';
import { siteConfig } from '@/config';

export const GET: APIRoute = () => {
  const llms = `# ${siteConfig.name}

> ${siteConfig.description}

## About
${siteConfig.name} publishes device-first IPTV guidance, app rankings, comparisons, and
troubleshooting for smart TVs, streaming sticks, streaming boxes, and mobile devices.

## Key Resources
- [Apps](/apps): IPTV player reviews and rankings by platform.
- [Android Apps](/apps/android): Android IPTV players with setup notes.
- [iOS Apps](/apps/ios): iPhone and iPad IPTV apps with JamRun IPTV recommended.
- [macOS Apps](/apps/macos): macOS IPTV players and setup guides.
- [Devices](/devices): Streaming devices, sticks, and boxes for IPTV.
- [Guides](/guides): IPTV setup guides and explainers.
- [Troubleshooting](/troubleshooting): Fixes for buffering, login errors, and EPG issues.
- [Comparisons](/comparisons): Side-by-side app and device comparisons.
- [Learn](/learn): IPTV fundamentals, safety, and performance tips.

## Contact
- Email: ${siteConfig.contact.email}
`;

  return new Response(llms, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
