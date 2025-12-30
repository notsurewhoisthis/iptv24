import fs from 'node:fs/promises';
import path from 'node:path';
import gplay from 'google-play-scraper';

const term = 'iptv';

const normalize = (app) => ({
  appId: app.appId,
  title: app.title,
  summary: app.summary,
  description: app.description || null,
  recentChanges: app.recentChanges || null,
  developer: app.developer,
  developerId: app.developerId,
  developerWebsite: app.developerWebsite || null,
  developerEmail: app.developerEmail || null,
  developerAddress: app.developerAddress || null,
  score: app.score || null,
  ratings: app.ratings || null,
  reviews: app.reviews || null,
  installs: app.installs || null,
  minInstalls: app.minInstalls || null,
  maxInstalls: app.maxInstalls || null,
  price: app.price || 0,
  priceText: app.priceText || 'Free',
  free: app.free,
  currency: app.currency || null,
  icon: app.icon || null,
  headerImage: app.headerImage || null,
  screenshots: (app.screenshots || []).slice(0, 6),
  url: app.url,
  updated: app.updated || null,
  version: app.version || null,
  androidVersion: app.androidVersion || null,
  androidVersionText: app.androidVersionText || null,
  genre: app.genre || null,
  genreId: app.genreId || null,
  categories: app.categories || [],
  contentRating: app.contentRating || null,
  contentRatingDescription: app.contentRatingDescription || null,
  adSupported: app.adSupported || false,
  offersIAP: app.offersIAP || false,
  IAPRange: app.IAPRange || null,
  privacyPolicy: app.privacyPolicy || null,
});

const run = async () => {
  const results = await gplay.search({
    term,
    num: 50,
    fullDetail: true,
  });

  const normalized = results.map(normalize);

  const ranked = [...normalized].sort((a, b) => {
    const scoreA = (a.score || 0) * 20 + Math.log10((a.ratings || 0) + 1) * 8;
    const scoreB = (b.score || 0) * 20 + Math.log10((b.ratings || 0) + 1) * 8;
    if (scoreB !== scoreA) return scoreB - scoreA;
    return (b.ratings || 0) - (a.ratings || 0);
  });

  const top20 = ranked.slice(0, 20);

  const output = {
    updatedAt: new Date().toISOString(),
    source: 'https://play.google.com/store/search?q=iptv&c=apps',
    apps: top20,
  };

  const outputPath = path.join(process.cwd(), 'src', 'data', 'android-apps.json');
  await fs.writeFile(outputPath, JSON.stringify(output, null, 2) + '\n', 'utf-8');
  console.log(`Saved ${top20.length} Android apps to ${outputPath}`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
