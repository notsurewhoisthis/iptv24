import { getTopApps, slugify, type AppEntry, apps } from './apps';
import { androidAppsList, slugifyAndroid, type AndroidApp } from './android-apps';
import { devices, type DeviceSpec } from './devices';

export type ComparisonType = 'ios-app' | 'macos-app' | 'android-app' | 'device';

export type ComparisonEntry = {
  slug: string;
  title: string;
  description: string;
  type: ComparisonType;
  summary: string;
  highlights: string[];
  left: AppEntry | AndroidApp | DeviceSpec;
  right: AppEntry | AndroidApp | DeviceSpec;
  specKeys?: string[];
};

const JAMRUN_ID = 6754577839;

const slugifyName = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const daysSince = (dateValue: string | number | null | undefined) => {
  if (dateValue === null || dateValue === undefined) return null;
  const date = typeof dateValue === 'number' ? new Date(dateValue) : new Date(dateValue);
  if (Number.isNaN(date.getTime())) return null;
  const diff = Date.now() - date.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
};

const formatUpdated = (days: number | null) =>
  days === null ? 'Unknown' : `${days} day${days === 1 ? '' : 's'} ago`;


const getAppComparisonSummary = (left: AppEntry, right: AppEntry, platformLabel: string) => {
  const leftUpdated = formatUpdated(daysSince(left.currentVersionReleaseDate));
  const rightUpdated = formatUpdated(daysSince(right.currentVersionReleaseDate));
  const leftPrice = left.formattedPrice || 'Free';
  const rightPrice = right.formattedPrice || 'Free';

  return `${left.name} and ${right.name} are two ${platformLabel} IPTV apps with different update cadence and pricing. ${left.name} last updated ${leftUpdated}, while ${right.name} updated ${rightUpdated}. Pricing is ${leftPrice} vs ${rightPrice}, which matters if you want predictable subscription costs.`;
};

const getAppComparisonHighlights = (left: AppEntry, right: AppEntry) => {
  const ratingDiff = (left.averageRating ?? 0) - (right.averageRating ?? 0);
  const ratingLine = ratingDiff === 0
    ? 'Both apps carry similar App Store ratings.'
    : ratingDiff > 0
      ? `${left.name} has the higher App Store rating.`
      : `${right.name} has the higher App Store rating.`;

  return [
    ratingLine,
    `Minimum OS: ${left.minimumOsVersion} vs ${right.minimumOsVersion}.`,
    `Versions: ${left.version} vs ${right.version}.`,
  ];
};

const getAndroidComparisonSummary = (left: AndroidApp, right: AndroidApp) => {
  const leftUpdated = formatUpdated(daysSince(left.updated ?? null));
  const rightUpdated = formatUpdated(daysSince(right.updated ?? null));
  const leftPrice = left.priceText || 'Free';
  const rightPrice = right.priceText || 'Free';
  return `${left.title} and ${right.title} are popular Android IPTV apps with different install footprints and update cadence. ${left.title} last updated ${leftUpdated}, while ${right.title} updated ${rightUpdated}. Pricing is ${leftPrice} vs ${rightPrice}.`;
};

const getAndroidComparisonHighlights = (left: AndroidApp, right: AndroidApp) => {
  const ratingLine = left.score && right.score
    ? left.score >= right.score
      ? `${left.title} holds the stronger Google Play rating.`
      : `${right.title} holds the stronger Google Play rating.`
    : 'Ratings are limited for one of the apps.';

  return [
    ratingLine,
    `Installs: ${left.installs || 'Varies'} vs ${right.installs || 'Varies'}.`,
    `Android version: ${left.androidVersionText || left.androidVersion || 'Varies'} vs ${right.androidVersionText || right.androidVersion || 'Varies'}.`,
  ];
};

const getSpecValue = (device: DeviceSpec, key: string) => {
  if (key === 'releaseYear') return String(device.releaseYear);
  if (key === 'os') return device.os;
  const spec = device.specs.find((item) => item.key === key);
  return spec?.value || '-';
};

const buildDeviceSpecKeys = (left: DeviceSpec, right: DeviceSpec) => {
  const priority = ['panel', 'chip', 'maxVideo', 'hdr', 'refresh', 'wifi', 'ethernet', 'storage', 'port', 'display'];
  const leftKeys = left.specs.map((spec) => spec.key);
  const rightKeys = right.specs.map((spec) => spec.key);
  const common = priority.filter((key) => leftKeys.includes(key) && rightKeys.includes(key));
  const keys = ['releaseYear', 'os', ...common].slice(0, 6);
  return keys;
};

const describeDeviceComparison = (left: DeviceSpec, right: DeviceSpec) => {
  const leftWifi = getSpecValue(left, 'wifi');
  const rightWifi = getSpecValue(right, 'wifi');
  const leftEthernet = getSpecValue(left, 'ethernet');
  const rightEthernet = getSpecValue(right, 'ethernet');
  const leftHdr = getSpecValue(left, 'hdr');
  const rightHdr = getSpecValue(right, 'hdr');
  const leftYear = left.releaseYear;
  const rightYear = right.releaseYear;

  const summary = `${left.name} vs ${right.name} focuses on network stability, HDR support, and day-to-day IPTV performance. ${left.name} is a ${leftYear} model while ${right.name} launched in ${rightYear}, so update cadence and app support can differ.`;

  const highlights = [
    leftWifi !== rightWifi
      ? `Wi-Fi difference: ${left.name} uses ${leftWifi}, ${right.name} uses ${rightWifi}.`
      : `Both devices use ${leftWifi} Wi-Fi hardware.`,
    leftEthernet !== rightEthernet
      ? `Ethernet options: ${leftEthernet} vs ${rightEthernet}.`
      : `Ethernet: both list ${leftEthernet}.`,
    leftHdr !== rightHdr
      ? `HDR support: ${leftHdr} vs ${rightHdr}.`
      : `HDR formats are similar on both devices.`,
  ];

  return { summary, highlights };
};

const jamrunIos = apps.find((app) => app.trackId === JAMRUN_ID && app.platforms.includes('ios'));
const jamrunMac = apps.find((app) => app.trackId === JAMRUN_ID && app.platforms.includes('macos'));

const iosComparisons = jamrunIos
  ? getTopApps('ios', 10)
      .map(({ app }) => app)
      .filter((app) => app.trackId !== JAMRUN_ID)
      .slice(0, 9)
      .map((app) => ({ left: jamrunIos, right: app }))
  : [];

const macComparisons = jamrunMac
  ? getTopApps('macos', 8)
      .map(({ app }) => app)
      .filter((app) => app.trackId !== JAMRUN_ID)
      .slice(0, 7)
      .map((app) => ({ left: jamrunMac, right: app }))
  : [];

const androidTop = androidAppsList.slice(0, 9);
const androidComparisons = androidTop.length > 1
  ? androidTop.slice(1, 9).map((app) => ({ left: androidTop[0], right: app }))
  : [];

const devicePairs: [string, string][] = [
  ['apple-tv-4k-3rd-gen-2022', 'nvidia-shield-tv-pro-2019'],
  ['apple-tv-4k-3rd-gen-2022', 'fire-tv-cube-3rd-gen-2022'],
  ['apple-tv-4k-2nd-gen-2021', 'roku-ultra-2022'],
  ['nvidia-shield-tv-pro-2019', 'fire-tv-cube-3rd-gen-2022'],
  ['nvidia-shield-tv-2019', 'roku-ultra-2022'],
  ['fire-tv-cube-3rd-gen-2022', 'roku-ultra-2022'],
  ['xiaomi-mi-box-s-2nd-gen-2023', 'mecool-km2-plus-2022'],
  ['nokia-streaming-box-8010', 'mecool-km2-plus-2022'],
  ['formuler-z11-pro-max-2022', 'formuler-z10-pro-max-2021'],
  ['homatics-box-r-4k-plus-2021', 'xiaomi-mi-box-s-2nd-gen-2023'],
  ['roku-ultra-lt-2021', 'fire-tv-cube-2nd-gen-2019'],
  ['fire-tv-3rd-gen-2017', 'xiaomi-mi-box-s-2016'],
  ['fire-tv-stick-4k-max-2023', 'chromecast-google-tv-4k-2020'],
  ['fire-tv-stick-4k-2021', 'roku-streaming-stick-4k-2021'],
  ['chromecast-google-tv-hd-2022', 'onn-google-tv-fhd-stick-2023'],
  ['roku-streaming-stick-4k-2021', 'xiaomi-mi-tv-stick-4k-2022'],
  ['realme-4k-smart-google-tv-stick-2021', 'mecool-kd3-2021'],
  ['fire-tv-stick-4k-max-2021', 'tivo-stream-4k-2020'],
  ['lg-c3-oled-2023', 'samsung-s90c-oled-2023'],
  ['sony-a80l-oled-2023', 'lg-c3-oled-2023'],
  ['tcl-qm8-2023', 'hisense-u8k-2023'],
  ['samsung-qn90c-2023', 'sony-x90l-2023'],
  ['iphone-15-pro-max', 'galaxy-s24-ultra'],
  ['iphone-15', 'pixel-8'],
  ['ipad-pro-11-m4-2024', 'ipad-air-m2-2024'],
  ['pixel-8-pro', 'oneplus-12'],
];

const deviceComparisons = devicePairs
  .map(([leftSlug, rightSlug]) => {
    const left = devices.find((device) => device.slug === leftSlug);
    const right = devices.find((device) => device.slug === rightSlug);
    if (!left || !right) return null;
    const { summary, highlights } = describeDeviceComparison(left, right);
    const specKeys = buildDeviceSpecKeys(left, right);
    const title = `${left.name} vs ${right.name}`;
    const description = `Compare ${left.name} and ${right.name} for IPTV playback, networking, and HDR support.`;
    return {
      slug: `${slugifyName(left.name)}-vs-${slugifyName(right.name)}`,
      title,
      description,
      type: 'device' as const,
      summary,
      highlights,
      left,
      right,
      specKeys,
    } satisfies ComparisonEntry;
  })
  .filter(Boolean) as ComparisonEntry[];

const iosEntries: ComparisonEntry[] = iosComparisons.map(({ left, right }) => ({
  slug: `${slugify(left.name)}-vs-${slugify(right.name)}-ios`,
  title: `${left.name} vs ${right.name} (iOS IPTV Apps)`,
  description: `Compare ${left.name} and ${right.name} on iOS for ratings, pricing, and update history.`,
  type: 'ios-app',
  summary: getAppComparisonSummary(left, right, 'iOS'),
  highlights: getAppComparisonHighlights(left, right),
  left,
  right,
}));

const macEntries: ComparisonEntry[] = macComparisons.map(({ left, right }) => ({
  slug: `${slugify(left.name)}-vs-${slugify(right.name)}-macos`,
  title: `${left.name} vs ${right.name} (macOS IPTV Apps)`,
  description: `Compare ${left.name} and ${right.name} on macOS for ratings, pricing, and updates.`,
  type: 'macos-app',
  summary: getAppComparisonSummary(left, right, 'macOS'),
  highlights: getAppComparisonHighlights(left, right),
  left,
  right,
}));

const androidEntries: ComparisonEntry[] = androidComparisons.map(({ left, right }) => ({
  slug: `${slugifyAndroid(left.title)}-vs-${slugifyAndroid(right.title)}-android`,
  title: `${left.title} vs ${right.title} (Android IPTV Apps)`,
  description: `Compare ${left.title} and ${right.title} on Android for ratings, installs, and updates.`,
  type: 'android-app',
  summary: getAndroidComparisonSummary(left, right),
  highlights: getAndroidComparisonHighlights(left, right),
  left,
  right,
}));

export const comparisons: ComparisonEntry[] = [
  ...iosEntries,
  ...macEntries,
  ...androidEntries,
  ...deviceComparisons,
].slice(0, 50);

export const getComparisonBySlug = (slug: string) =>
  comparisons.find((comparison) => comparison.slug === slug) || null;
