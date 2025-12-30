/**
 * Navigation Configuration
 *
 * @description
 * Centralized navigation configuration for header and footer.
 * All navigation items are defined here for consistency and easy maintenance.
 *
 * Items with a `feature` property will only be shown if that feature is enabled
 * in the site config's feature flags.
 */

import type { Navigation } from '../lib/types';

export const navigation: Navigation = {
  /**
   * Header Navigation
   * - main: Primary navigation links
   * - cta: Call-to-action buttons on the right
   */
  header: {
    main: [
      { label: 'Apps', href: '/apps' },
      { label: 'iOS Apps', href: '/apps/ios' },
      { label: 'Android Apps', href: '/apps/android' },
      { label: 'Devices', href: '/devices' },
      { label: 'Guides', href: '/guides' },
      { label: 'Learn', href: '/learn' },
      { label: 'Troubleshooting', href: '/troubleshooting' },
      { label: 'Blog', href: '/blog', feature: 'blog' },
    ],
    cta: [],
  },

  /**
   * Footer Navigation
   * Organized into 5 columns: Product, Solutions, Resources, Company, Legal
   */
  footer: {
    product: [
      { label: 'Apps', href: '/apps' },
      { label: 'iOS Apps', href: '/apps/ios' },
      { label: 'Android Apps', href: '/apps/android' },
      { label: 'Devices', href: '/devices' },
      { label: 'Guides', href: '/guides' },
      { label: 'Learn', href: '/learn' },
      { label: 'Troubleshooting', href: '/troubleshooting' },
    ],
    solutions: [
      { label: 'Streaming Sticks', href: '/devices/categories/streaming-sticks' },
      { label: 'Streaming Boxes', href: '/devices/categories/streaming-boxes' },
      { label: 'Android IPTV Apps', href: '/apps/android' },
      { label: 'Buffering Fixes', href: '/troubleshooting/iptv-buffering-fix' },
    ],
    resources: [
      { label: 'Learning Center', href: '/learn' },
      { label: 'Blog', href: '/blog', feature: 'blog' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
    ],
    company: [
      { label: 'Editorial Policy', href: '/about' },
      { label: 'IPTV Legal Guide', href: '/blog' },
      { label: 'Submit Feedback', href: '/contact' },
    ],
    legal: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
};
