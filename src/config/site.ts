/**
 * Site Configuration
 *
 * @description
 * Core site metadata and branding settings.
 * These values can be customized via environment variables or by editing the defaults below.
 */

import type { SocialLinks, LegalConfig } from '../lib/types';

/** Site name displayed in header, footer, and meta tags */
export const name = import.meta.env.SITE_NAME || 'IPTV24';

/** Site description for SEO and meta tags */
export const description =
  import.meta.env.SITE_DESCRIPTION ||
  'Device-first IPTV guides, app rankings, and troubleshooting for smart TVs, streaming sticks, and mobile devices.';

/** Production URL of your site (used for sitemap, RSS, canonical URLs) */
export const url = import.meta.env.SITE_URL || 'https://freeiptv24.com';

/** Author name for meta tags and copyright */
export const author = import.meta.env.SITE_AUTHOR || 'IPTV24 Lab';

/** Path to logo file (relative to /public) */
export const logo = '/images/logo.png';

/** Path to Open Graph image (relative to /public) */
export const ogImage = '/images/logo.png';

/** Social media links */
export const social: SocialLinks = {
  twitter: 'https://twitter.com/freeiptv24',
  github: '',
  discord: '',
};

/** Legal configuration for privacy policy and terms pages */
export const legal: LegalConfig = {
  privacyEmail: 'privacy@freeiptv24.com',
  legalEmail: 'legal@freeiptv24.com',
  lastUpdated: 'March 8, 2025',
};
