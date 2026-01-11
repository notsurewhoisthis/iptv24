import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicImagesDir = join(__dirname, '..', 'public', 'images');

async function optimizeImages() {
  console.log('🔧 SEO Image Optimization Script');
  console.log('================================\n');

  // 1. Optimize logo.png (currently 11MB!)
  const logoPath = join(publicImagesDir, 'logo.png');
  const logoBackupPath = join(publicImagesDir, 'logo-original.png');
  
  if (fs.existsSync(logoPath)) {
    const originalSize = fs.statSync(logoPath).size;
    console.log(`📦 Original logo.png size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    
    // Backup original
    if (!fs.existsSync(logoBackupPath)) {
      fs.copyFileSync(logoPath, logoBackupPath);
      console.log('💾 Backed up original to logo-original.png');
    }
    
    // Optimize: resize if too large and compress
    await sharp(logoPath)
      .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(join(publicImagesDir, 'logo-optimized.png'));
    
    // Replace original with optimized
    fs.copyFileSync(join(publicImagesDir, 'logo-optimized.png'), logoPath);
    fs.unlinkSync(join(publicImagesDir, 'logo-optimized.png'));
    
    const newSize = fs.statSync(logoPath).size;
    console.log(`✅ Optimized logo.png size: ${(newSize / 1024).toFixed(2)} KB`);
    console.log(`📉 Reduction: ${((1 - newSize / originalSize) * 100).toFixed(1)}%\n`);
  }

  // 2. Create proper OG image (1200x630)
  const ogImagePath = join(publicImagesDir, 'og-default.png');
  
  // Create a branded OG image with gradient background
  const width = 1200;
  const height = 630;
  
  // Create gradient background with brand colors
  const svgBackground = `
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#16213e;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0f3460;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
      
      <!-- Decorative circles -->
      <circle cx="100" cy="100" r="200" fill="rgba(255,255,255,0.03)"/>
      <circle cx="1100" cy="530" r="250" fill="rgba(255,255,255,0.03)"/>
      
      <!-- Main text -->
      <text x="600" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">Streaming Guide</text>
      
      <!-- Subtitle -->
      <text x="600" y="360" font-family="system-ui, -apple-system, sans-serif" font-size="28" fill="rgba(255,255,255,0.8)" text-anchor="middle">Device-first IPTV Guides, App Rankings &amp; Troubleshooting</text>
      
      <!-- Bottom accent line -->
      <rect x="450" y="420" width="300" height="4" rx="2" fill="#4cc9f0"/>
      
      <!-- Domain -->
      <text x="600" y="520" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="rgba(255,255,255,0.6)" text-anchor="middle">streamingguide.org</text>
    </svg>
  `;

  await sharp(Buffer.from(svgBackground))
    .png({ quality: 90 })
    .toFile(ogImagePath);
  
  const ogSize = fs.statSync(ogImagePath).size;
  console.log(`✅ Created og-default.png (${(ogSize / 1024).toFixed(2)} KB)`);
  console.log(`📐 Dimensions: ${width}x${height} (optimal for social sharing)\n`);

  console.log('🎉 Image optimization complete!');
}

optimizeImages().catch(console.error);
