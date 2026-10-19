/**
 * convert-images.js
 * Batch-converts JPEG images in public/images/ to WebP format using sharp.
 * Run with: node scripts/convert-images.js
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesDir = join(__dirname, '..', 'public', 'images');

async function convertImages() {
  const files = await readdir(imagesDir);
  const jpegs = files.filter(f => /\.(jpg|jpeg)$/i.test(f));

  console.log(`Found ${jpegs.length} JPEG(s) to convert:\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of jpegs) {
    const inputPath = join(imagesDir, file);
    const outputName = basename(file, extname(file)) + '.webp';
    const outputPath = join(imagesDir, outputName);

    const { size: sizeBefore } = await stat(inputPath);

    await sharp(inputPath)
      .webp({ quality: 82, effort: 6 })
      .toFile(outputPath);

    const { size: sizeAfter } = await stat(outputPath);
    const reduction = (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(1);

    totalBefore += sizeBefore;
    totalAfter += sizeAfter;

    const kb = (b) => (b / 1024).toFixed(1) + ' KB';
    console.log(`  ${file.padEnd(30)} ${kb(sizeBefore).padStart(10)}  ->  ${kb(sizeAfter).padStart(10)}  (-${reduction}%)`);
  }

  console.log(`\n${'='.repeat(70)}`);
  const totalReduction = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1);
  const kb = (b) => (b / 1024).toFixed(1) + ' KB';
  console.log(`  TOTAL:                         ${kb(totalBefore).padStart(10)}  ->  ${kb(totalAfter).padStart(10)}  (-${totalReduction}%)`);
  console.log('\nDone! Original JPEGs preserved alongside new .webp files.');
}

convertImages().catch(console.error);
