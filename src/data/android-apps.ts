import androidApps from './android-apps.json';

export type AndroidApp = {
  appId: string;
  title: string;
  summary: string;
  description?: string | null;
  recentChanges?: string | null;
  developer: string;
  developerId?: string | null;
  developerWebsite?: string | null;
  developerEmail?: string | null;
  developerAddress?: string | null;
  score?: number | null;
  ratings?: number | null;
  reviews?: number | null;
  installs?: string | null;
  minInstalls?: number | null;
  maxInstalls?: number | null;
  price: number;
  priceText: string;
  free: boolean;
  currency?: string | null;
  icon?: string | null;
  headerImage?: string | null;
  screenshots?: string[];
  url: string;
  updated?: string | null;
  version?: string | null;
  androidVersion?: string | null;
  androidVersionText?: string | null;
  genre?: string | null;
  genreId?: string | null;
  categories?: string[];
  contentRating?: string | null;
  contentRatingDescription?: string | null;
  adSupported?: boolean;
  offersIAP?: boolean;
  IAPRange?: string | null;
  privacyPolicy?: string | null;
  humanReview?: string | null;
};

export const androidAppsUpdatedAt = androidApps.updatedAt as string;
export const androidAppsSource = androidApps.source as string;
export const androidAppsList = androidApps.apps as AndroidApp[];

export const slugifyAndroid = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export const getAndroidAppBySlug = (slug: string) =>
  androidAppsList.find((app) => slugifyAndroid(app.title) === slug) || null;

export const getAndroidAppSummary = (app: AndroidApp) => {
  const rating = app.score ? `${app.score.toFixed(1)}★` : 'No rating';
  const ratingsCount = app.ratings ? `${app.ratings.toLocaleString()} ratings` : 'No ratings';
  return `${rating} (${ratingsCount}) · ${app.priceText}`;
};

export const getAndroidHighlights = (app: AndroidApp) => [
  `Developer: ${app.developer}`,
  `Updated: ${app.updated ? new Date(app.updated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }) : 'Unknown'}`,
  `Android version: ${app.androidVersionText || app.androidVersion || 'Varies by device'}`,
  `Installs: ${app.installs || 'Varies'}`,
];

const cleanLine = (line: string) => line.replace(/\s+/g, ' ').trim();

export const getAndroidDescriptionExcerpt = (app: AndroidApp) => {
  if (!app.description) return null;
  const text = cleanLine(app.description);
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  return sentences.slice(0, 2).join(' ');
};

export const getAndroidFeatureHighlights = (app: AndroidApp, limit = 6) => {
  if (!app.description) return [];
  const lines = app.description
    .split('\n')
    .map((line) => cleanLine(line))
    .filter(Boolean);

  const bulletLines = lines
    .filter((line) => /^[-•●·]/.test(line))
    .map((line) => line.replace(/^[-•●·]\s*/, ''))
    .filter((line) => line.length > 0);

  const keywordLines = lines.filter((line) =>
    /(m3u|xtream|epg|playlist|vod|catch-up|live|subtitle|chromecast)/i.test(line)
  );

  const merged = [...bulletLines, ...keywordLines];
  const unique = Array.from(new Set(merged.map((line) => line.trim()))).filter((line) => line.length > 0);
  return unique.slice(0, limit);
};
