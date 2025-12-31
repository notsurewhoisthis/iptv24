import appsData from './apps.json';

export type Platform = 'ios' | 'macos';

export type AppEntry = {
  trackId: number;
  name: string;
  url: string;
  bundleId: string;
  seller: string;
  sellerUrl?: string | null;
  price: number;
  formattedPrice: string;
  currency: string;
  averageRating?: number | null;
  ratingCount?: number | null;
  version: string;
  currentVersionReleaseDate: string;
  releaseDate: string;
  fileSizeBytes: string;
  minimumOsVersion: string;
  contentAdvisoryRating: string;
  primaryGenre: string;
  genres: string[];
  languageCodes: string[];
  description?: string | null;
  releaseNotes?: string | null;
  humanReview?: string | null;
  supportedDevices: string[];
  platforms: Platform[];
  artworkUrl512?: string | null;
  screenshotUrls?: string[];
  ipadScreenshotUrls?: string[];
  appletvScreenshotUrls?: string[];
  country: string;
};

const JAMRUN_ID = 6754577839;

const toScore = (app: AppEntry) => {
  const rating = app.averageRating ?? 0;
  const ratingScore = rating * 20;
  const count = app.ratingCount ?? 0;
  const countScore = Math.min(25, Math.log10(count + 1) * 8);
  const daysOld =
    (Date.now() - new Date(app.currentVersionReleaseDate).getTime()) / (1000 * 60 * 60 * 24);
  const recencyScore = Math.max(0, 25 - daysOld / 30);
  return ratingScore + countScore + recencyScore;
};

const editorialPick = (app: AppEntry, platform: Platform) => {
  if (platform === 'ios' || platform === 'macos') {
    return app.trackId === JAMRUN_ID;
  }
  return false;
};

const formatSize = (bytes: string) => {
  const size = Number(bytes);
  if (!Number.isFinite(size) || size <= 0) return 'Unknown';
  const mb = size / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
};

export const appsUpdatedAt = appsData.updatedAt;
export const appSources: string[] = appsData.sources || [];

export const apps: AppEntry[] = appsData.apps;

export const getAppsByPlatform = (platform: Platform) =>
  apps.filter((app) => app.platforms.includes(platform));

export const rankApps = (platform: Platform) => {
  return [...getAppsByPlatform(platform)]
    .map((app) => ({
      app,
      score: toScore(app),
      editorPick: editorialPick(app, platform),
    }))
    .sort((a, b) => {
      if (a.editorPick && !b.editorPick) return -1;
      if (!a.editorPick && b.editorPick) return 1;
      if (b.score !== a.score) return b.score - a.score;
      return (b.app.averageRating ?? 0) - (a.app.averageRating ?? 0);
    });
};

export const getTopApps = (platform: Platform, limit = 20) => rankApps(platform).slice(0, limit);

export const getAppBySlug = (platform: Platform, slug: string) => {
  return getAppsByPlatform(platform).find((app) => slugify(app.name) === slug) || null;
};

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export const getAppSummary = (app: AppEntry) => {
  const rating = app.averageRating ? `${app.averageRating.toFixed(1)}★` : 'No rating';
  const ratingsCount = app.ratingCount ? `${app.ratingCount.toLocaleString()} ratings` : 'No ratings';
  return `${rating} (${ratingsCount}) · ${app.formattedPrice} · v${app.version}`;
};

export const getAppHighlights = (app: AppEntry) => {
  return [
    `Seller: ${app.seller}`,
    `Updated: ${new Date(app.currentVersionReleaseDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })}`,
    `Minimum OS: ${app.minimumOsVersion}`,
    `File size: ${formatSize(app.fileSizeBytes)}`,
  ];
};

export const isEditorialPick = (app: AppEntry, platform: Platform) => editorialPick(app, platform);

const cleanLine = (line: string) => line.replace(/\s+/g, ' ').trim();

export const getAppDescriptionExcerpt = (app: AppEntry) => {
  if (!app.description) return null;
  const text = cleanLine(app.description);
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  return sentences.slice(0, 2).join(' ');
};

export const getAppFeatureHighlights = (app: AppEntry, limit = 6) => {
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
    /(m3u|xtream|epg|playlist|vod|catch-up|live|subtitle|chromecast|airplay)/i.test(line)
  );

  const merged = [...bulletLines, ...keywordLines];
  const unique = Array.from(new Set(merged.map((line) => line.trim()))).filter((line) => line.length > 0);
  return unique.slice(0, limit);
};
