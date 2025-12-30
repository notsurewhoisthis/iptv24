/**
 * Contact Page Configuration
 *
 * @description
 * Contact information, methods, and FAQ data for the contact page.
 * Modify these values to customize your contact page content.
 */

import type { ContactInfo, ContactMethod, ContactFAQ } from '../lib/types';

/** Contact information used across contact page and legal pages */
export const contact: ContactInfo = {
  email: 'hello@freeiptv24.com',
  supportEmail: 'support@freeiptv24.com',
  salesEmail: 'partnerships@freeiptv24.com',
  address: {
    street: 'Remote',
    city: 'Austin',
    state: 'TX',
    zip: '73301',
    country: 'United States',
  },
};

/** Contact methods displayed on the contact page */
export const contactMethods: ContactMethod[] = [
  {
    icon: 'lucide:mail',
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: 'lucide:headphones',
    label: 'Support',
    value: contact.supportEmail,
    href: `mailto:${contact.supportEmail}`,
  },
  {
    icon: 'lucide:briefcase',
    label: 'Partnerships',
    value: contact.salesEmail,
    href: `mailto:${contact.salesEmail}`,
  },
];

export const contactForm = {
  provider: 'web3forms',
  action: 'https://api.web3forms.com/submit',
  accessKey: import.meta.env.WEB3FORMS_KEY || '',
};

/** FAQ items displayed on the contact page */
export const contactFAQs: ContactFAQ[] = [
  {
    question: "What's your typical response time?",
    answer: 'We respond within 1 business day for editorial or support questions.',
  },
  {
    question: 'Do you offer phone support?',
    answer: 'We handle support by email to keep testing logs and device details in one place.',
  },
  {
    question: 'How do I report a bug?',
    answer: 'Use the form with the device model and app version so we can reproduce it.',
  },
];
