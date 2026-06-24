#!/usr/bin/env node
/**
 * Batch convert all images to AVIF + JPEG fallback
 *
 * Converts PNG/JPG files in public/ to:
 * - AVIF (primary, modern browsers)
 * - JPEG (fallback, broad compatibility)
 *
 * Usage: node scripts/batch-convert-images.js [--dry-run]
 *
 * Skips:
 * - Already converted (*.avif, *.webp)
 * - SVG files
 * - Very small images (<10KB, likely icons)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];
const MIN_SIZE_KB = 10; // Skip tiny images
const DRY_RUN = process.argv.includes('--dry-run');

// Stats
let stats = {
  total: 0,
  converted: 0,
  skipped: 0,
  failed: 0,
  bytesOriginal: 0,
  bytesAvif: 0,
  bytesJpeg: 0,
};

async function convertImage(file) {
  try {
    const stat = fs.statSync(file);
    const sizeKb = stat.size / 1024;

    // Skip tiny files (likely icons)
    if (sizeKb < MIN_SIZE_KB) {
      return { status: 'skip', reason: 'tiny', file };
    }

    const ext = path.extname(file).toLowerCase();
    const basename = path.basename(file, ext);
    const dirname = path.dirname(file);

    // Skip already optimized
    if (['.avif', '.webp'].includes(ext)) {
      return { status: 'skip', reason: 'already-optimized', file };
    }

    // Get original size
    const originalSize = stat.size;
    stats.bytesOriginal += originalSize;

    if (DRY_RUN) {
      console.log(`  [DRY] Would convert: ${path.relative(PUBLIC_DIR, file)} (${(sizeKb).toFixed(1)}KB)`);
      return { status: 'dry-run', file };
    }

    // Convert to AVIF
    const avifPath = path.join(dirname, `${basename}.avif`);
    await sharp(file)
      .avif({ quality: 80, effort: 5 })
      .toFile(avifPath);

    const avifSize = fs.statSync(avifPath).size;
    stats.bytesAvif += avifSize;

    // Convert to JPEG fallback (only if not already JPEG-like)
    let jpegPath;
    let jpegSize = 0;
    if (ext.toLowerCase() !== '.jpg' && ext.toLowerCase() !== '.jpeg') {
      jpegPath = path.join(dirname, `${basename}.jpg`);
      await sharp(file)
        .jpeg({ quality: 85, progressive: true })
        .toFile(jpegPath);
      jpegSize = fs.statSync(jpegPath).size;
      stats.bytesJpeg += jpegSize;
    }

    const reduction = ((1 - (avifSize / originalSize)) * 100).toFixed(0);
    console.log(`  ✅ ${path.relative(PUBLIC_DIR, file)}`);
    console.log(`     ${(sizeKb).toFixed(1)}KB → AVIF: ${(avifSize / 1024).toFixed(1)}KB (${reduction}% smaller)${jpegSize ? ` | JPEG: ${(jpegSize / 1024).toFixed(1)}KB` : ''}`);

    return { status: 'converted', file, avifSize, jpegSize };
  } catch (err) {
    console.error(`  ❌ ${path.relative(PUBLIC_DIR, file)}: ${err.message}`);
    return { status: 'error', file, error: err.message };
  }
}

function findImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip system dirs
      if (!['node_modules', '.next', '.git', '.vercel'].includes(file)) {
        findImages(filePath, fileList);
      }
    } else if (SUPPORTED_FORMATS.includes(path.extname(file).toLowerCase())) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

async function run() {
  console.log(`🖼️  Batch Image Conversion${DRY_RUN ? ' (DRY RUN)' : ''}`);
  console.log(`Converting all PNG/JPG to AVIF + JPEG fallback\n`);

  const imageFiles = findImages(PUBLIC_DIR);
  console.log(`Found ${imageFiles.length} images to process\n`);

  stats.total = imageFiles.length;

  // Convert each image sequentially (parallel would overload)
  for (const file of imageFiles) {
    const result = await convertImage(file);
    if (result.status === 'converted') stats.converted++;
    if (result.status === 'skip') stats.skipped++;
    if (result.status === 'error') stats.failed++;
  }

  // Summary
  console.log(`\n${'='.repeat(70)}`);
  console.log(`📊 Conversion Summary`);
  console.log(`${'='.repeat(70)}`);
  console.log(`Total images found:     ${stats.total}`);
  console.log(`Converted:              ${stats.converted}`);
  console.log(`Skipped (tiny/optimized): ${stats.skipped}`);
  console.log(`Failed:                 ${stats.failed}`);
  console.log(``);
  console.log(`Original size:          ${(stats.bytesOriginal / 1024 / 1024).toFixed(1)} MB`);
  console.log(`AVIF size:              ${(stats.bytesAvif / 1024 / 1024).toFixed(1)} MB`);
  console.log(`JPEG fallback size:     ${(stats.bytesJpeg / 1024 / 1024).toFixed(1)} MB`);
  console.log(``);
  const totalReduction = stats.bytesOriginal > 0
    ? ((1 - (stats.bytesAvif / stats.bytesOriginal)) * 100).toFixed(0)
    : 0;
  console.log(`Reduction (AVIF):       ${totalReduction}%`);
  console.log(`${DRY_RUN ? '✨ Dry run complete. Remove --dry-run flag to execute.' : '✨ Conversion complete!'}`);
  console.log(`\nNext: run \`npm run build\` and commit the changes`);
}

// Verify sharp is available
try {
  require.resolve('sharp');
  run().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
} catch {
  console.error('❌ Error: sharp not installed. Run: npm install sharp --save-dev');
  process.exit(1);
}
