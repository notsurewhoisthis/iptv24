export type AuthorProfile = {
  name: string;
  slug: string;
  role: string;
  location: string;
  bio: string;
  credentials: string[];
  focusAreas: string[];
  sameAs?: string[];
};

export const authors: AuthorProfile[] = [
  {
    name: 'Streaming Guide Lab',
    slug: 'streaming-guide-lab',
    role: 'Editorial Lab',
    location: 'Austin, TX',
    bio: 'Streaming Guide Lab is the editorial testing group behind Streaming Guide. We review IPTV apps, devices, and setup guides with repeatable checklists focused on playlist import, EPG accuracy, playback stability, and network performance.',
    credentials: [
      'Tests cover iOS, tvOS, Android TV, Fire OS, webOS, and Google TV devices.',
      'Playback sessions include live channel switching, VOD navigation, and EPG refresh timing.',
      'Network checks include Wi-Fi 5/6 and Ethernet where supported.',
      'Each update logs app version, OS build, and device model for repeatability.',
    ],
    focusAreas: [
      'IPTV app compatibility (M3U, Xtream Codes, EPG)',
      'Streaming device stability and codec support',
      'Troubleshooting workflows for buffering, login, and EPG drift',
      'Performance tuning for Wi-Fi and Ethernet setups',
    ],
    sameAs: ['https://twitter.com/freeiptv24'],
  },
];

export const defaultAuthor = authors[0];

export const getAuthorBySlug = (slug: string) =>
  authors.find((author) => author.slug === slug) || null;

export const getAuthorByName = (name: string) =>
  authors.find((author) => author.name.toLowerCase() === name.toLowerCase()) || null;
