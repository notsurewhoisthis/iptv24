export type DeviceComparison = {
  slug: string;
  title: string;
  description: string;
  deviceSlugs: string[];
  criteria: { label: string; key: string }[];
};

export const deviceComparisons: DeviceComparison[] = [
  {
    slug: 'apple-tv-4k-models',
    title: 'Apple TV 4K Models Compared',
    description: 'Compare Apple TV 4K generations for IPTV performance, HDR formats, and network features.',
    deviceSlugs: [
      'apple-tv-4k-3rd-gen-2022',
      'apple-tv-4k-2nd-gen-2021',
      'apple-tv-4k-1st-gen-2017',
    ],
    criteria: [
      { label: 'Release year', key: 'releaseYear' },
      { label: 'OS', key: 'os' },
      { label: 'Chip', key: 'chip' },
      { label: 'Max video', key: 'maxVideo' },
      { label: 'HDR formats', key: 'hdr' },
      { label: 'Wi-Fi', key: 'wifi' },
      { label: 'Ethernet', key: 'ethernet' },
    ],
  },
  {
    slug: 'best-4k-streaming-sticks',
    title: 'Best 4K Streaming Sticks for IPTV',
    description: 'Side-by-side comparison of popular 4K streaming sticks used for IPTV apps.',
    deviceSlugs: [
      'fire-tv-stick-4k-max-2023',
      'roku-streaming-stick-4k-2021',
      'chromecast-google-tv-4k-2020',
      'xiaomi-mi-tv-stick-4k-2022',
    ],
    criteria: [
      { label: 'Release year', key: 'releaseYear' },
      { label: 'OS', key: 'os' },
      { label: 'Max video', key: 'maxVideo' },
      { label: 'HDR formats', key: 'hdr' },
      { label: 'Wi-Fi', key: 'wifi' },
      { label: 'Storage', key: 'storage' },
    ],
  },
  {
    slug: 'streaming-boxes-for-iptv',
    title: 'Streaming Boxes for IPTV Power Users',
    description: 'Compare higher-end streaming boxes for stable 4K IPTV playback.',
    deviceSlugs: [
      'apple-tv-4k-3rd-gen-2022',
      'nvidia-shield-tv-pro-2019',
      'roku-ultra-2022',
      'fire-tv-cube-3rd-gen-2022',
    ],
    criteria: [
      { label: 'Release year', key: 'releaseYear' },
      { label: 'OS', key: 'os' },
      { label: 'Max video', key: 'maxVideo' },
      { label: 'HDR formats', key: 'hdr' },
      { label: 'Wi-Fi', key: 'wifi' },
      { label: 'Ethernet', key: 'ethernet' },
    ],
  },
  {
    slug: 'oled-vs-qled-for-iptv',
    title: 'OLED vs QLED Smart TVs for IPTV',
    description: 'Compare OLED and QLED TVs for IPTV clarity, HDR support, and app availability.',
    deviceSlugs: ['lg-c3-oled-2023', 'samsung-s90c-oled-2023', 'sony-a80l-oled-2023'],
    criteria: [
      { label: 'Release year', key: 'releaseYear' },
      { label: 'OS', key: 'os' },
      { label: 'Panel', key: 'panel' },
      { label: 'HDR formats', key: 'hdr' },
      { label: 'Refresh rate', key: 'refresh' },
      { label: 'Wi-Fi', key: 'wifi' },
    ],
  },
  {
    slug: 'flagship-mobile-iptv-devices',
    title: 'Flagship Mobile Devices for IPTV',
    description: 'Compare flagship phones for smooth IPTV playback and fast Wi-Fi.',
    deviceSlugs: ['iphone-15-pro-max', 'galaxy-s24-ultra', 'pixel-8-pro'],
    criteria: [
      { label: 'Release year', key: 'releaseYear' },
      { label: 'OS', key: 'os' },
      { label: 'Display', key: 'display' },
      { label: 'Chip', key: 'chip' },
      { label: 'Wi-Fi', key: 'wifi' },
      { label: 'Port', key: 'port' },
    ],
  },
];

export const getDeviceComparison = (slug: string) =>
  deviceComparisons.find((comparison) => comparison.slug === slug) || null;
