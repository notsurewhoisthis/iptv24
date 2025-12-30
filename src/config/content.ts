/**
 * Content Strings Configuration
 *
 * @description
 * Configurable text content for various site sections.
 * Modify these to customize messaging without touching component code.
 */

import type { AnnouncementConfig, ContentStrings } from '../lib/types';

/** Announcement bar configuration */
export const announcement: AnnouncementConfig = {
  /** Show/hide the announcement bar */
  enabled: false,

  /** Unique ID - change this to reset dismissal for new announcements */
  id: 'launch-2025',

  /** Announcement text */
  text: 'New Apple TV IPTV app tests are live.',

  /** Optional link URL */
  href: '/apps',

  /** Optional link text */
  linkText: 'See results',

  /** Visual style: 'primary' | 'secondary' | 'gradient' */
  variant: 'primary',

  /** Allow users to dismiss the announcement */
  dismissible: true,
};

/** Configurable content strings for various sections */
export const content: ContentStrings = {
  newsletter: {
    title: 'Get new IPTV tests',
    description: 'Weekly app updates, device setup tips, and troubleshooting fixes.',
    placeholder: 'Enter your email',
    buttonText: 'Join the newsletter',
    successMessage: 'Thanks for subscribing! Check your inbox to confirm.',
    errorMessage: 'Something went wrong. Please try again.',
    privacyNote: 'We respect your privacy. Unsubscribe at any time.',
  },
};
