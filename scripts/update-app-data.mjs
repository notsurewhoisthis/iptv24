import fs from 'node:fs/promises';
import path from 'node:path';

const JAMRUN = { id: 6754577839, country: 'tr' };
const DEFAULT_COUNTRY = 'us';

const searchApps = async ({ term, entity, country = DEFAULT_COUNTRY, limit = 200 }) => {
  const url = new URL('https://itunes.apple.com/search');
  url.searchParams.set('term', term);
  url.searchParams.set('media', 'software');
  url.searchParams.set('entity', entity);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('country', country);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Search failed (${entity}): ${res.status}`);
  }
  const data = await res.json();
  return data.results || [];
};

const lookup = async (id, country, attempts = 3) => {
  const url = `https://itunes.apple.com/lookup?id=${id}&country=${country}`;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) {
        throw new Error(`Failed lookup ${id} (${country}): ${res.status}`);
      }
      const data = await res.json();
      if (!data.results?.length) {
        throw new Error(`No results for ${id} (${country})`);
      }
      return data.results[0];
    } catch (error) {
      clearTimeout(timeout);
      if (attempt === attempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
  throw new Error(`Lookup failed for ${id} (${country})`);
};

const normalize = (app, country = DEFAULT_COUNTRY) => {
  const supported = app.supportedDevices || [];
  const hasIphone = supported.some((device) => device.toLowerCase().includes('iphone'));
  const hasIpad = supported.some((device) => device.toLowerCase().includes('ipad'));
  const hasMac = supported.some((device) => device.toLowerCase().includes('macdesktop'));

  const platforms = [];
  if (hasIphone || hasIpad) platforms.push('ios');
  if (hasMac) platforms.push('macos');
  if (app.trackId === JAMRUN.id) {
    if (!platforms.includes('ios')) platforms.push('ios');
    if (!platforms.includes('macos')) platforms.push('macos');
  }

  return {
    trackId: app.trackId,
    name: app.trackName,
    url: app.trackViewUrl,
    bundleId: app.bundleId,
    seller: app.sellerName,
    sellerUrl: app.sellerUrl || null,
    price: app.price,
    formattedPrice: app.formattedPrice,
    currency: app.currency,
    averageRating: app.averageUserRating || null,
    ratingCount: app.userRatingCount || null,
    version: app.version,
    currentVersionReleaseDate: app.currentVersionReleaseDate,
    releaseDate: app.releaseDate,
    fileSizeBytes: app.fileSizeBytes,
    minimumOsVersion: app.minimumOsVersion,
    contentAdvisoryRating: app.contentAdvisoryRating,
    primaryGenre: app.primaryGenreName,
    genres: app.genres || [],
    languageCodes: app.languageCodesISO2A || [],
    description: app.description || null,
    releaseNotes: app.releaseNotes || null,
    supportedDevices: supported,
    platforms,
    artworkUrl512: app.artworkUrl512 || null,
    screenshotUrls: (app.screenshotUrls || []).slice(0, 6),
    ipadScreenshotUrls: (app.ipadScreenshotUrls || []).slice(0, 6),
    appletvScreenshotUrls: (app.appletvScreenshotUrls || []).slice(0, 6),
    country,
  };
};

const run = async () => {
  const iosResults = await searchApps({
    term: 'iptv',
    entity: 'software',
    country: DEFAULT_COUNTRY,
    limit: 120,
  });
  const macResults = await searchApps({
    term: 'iptv',
    entity: 'macSoftware',
    country: DEFAULT_COUNTRY,
    limit: 120,
  });
  const jamrun = await lookup(JAMRUN.id, JAMRUN.country);

  const appMap = new Map();

  const upsert = (app, country = DEFAULT_COUNTRY) => {
    const normalized = normalize(app, country);
    const existing = appMap.get(normalized.trackId);
    if (existing) {
      const platforms = Array.from(new Set([...(existing.platforms || []), ...normalized.platforms]));
      appMap.set(normalized.trackId, { ...existing, ...normalized, platforms });
    } else {
      appMap.set(normalized.trackId, normalized);
    }
  };

  const matchesTerm = (app) => {
    if (typeof app.trackName !== 'string') return false;
    const name = app.trackName.toLowerCase();
    return name.includes('iptv');
  };

  const matchedIos = iosResults.filter(matchesTerm);
  const matchedMac = macResults.filter(matchesTerm);
  const lookupQueue = [...matchedIos, ...matchedMac];

  const concurrency = 6;
  for (let i = 0; i < lookupQueue.length; i += concurrency) {
    const batch = lookupQueue.slice(i, i + concurrency);
    const results = await Promise.all(
      batch.map(async (app) => {
        try {
          return await lookup(app.trackId, DEFAULT_COUNTRY);
        } catch (error) {
          console.warn(`Lookup failed for ${app.trackId}, using search data.`);
          return app;
        }
      })
    );
    results.forEach((result) => upsert(result, DEFAULT_COUNTRY));
  }

  upsert(jamrun, JAMRUN.country);

  const apps = Array.from(appMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  const output = {
    updatedAt: new Date().toISOString(),
    sources: [
      `https://itunes.apple.com/search?term=iptv&media=software&entity=software&country=${DEFAULT_COUNTRY}`,
      `https://itunes.apple.com/search?term=iptv&media=software&entity=macSoftware&country=${DEFAULT_COUNTRY}`,
      `https://itunes.apple.com/lookup?id=${JAMRUN.id}&country=${JAMRUN.country}`,
    ],
    apps,
  };

  const outputPath = path.join(process.cwd(), 'src', 'data', 'apps.json');
  await fs.writeFile(outputPath, JSON.stringify(output, null, 2) + '\n', 'utf-8');
  console.log(`Saved ${apps.length} apps to ${outputPath}`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
