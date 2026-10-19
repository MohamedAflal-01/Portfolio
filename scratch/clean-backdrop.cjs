const sharp = require('sharp');
const path = require('path');

async function processImage() {
  const inputPath = 'C:/Users/msi/.gemini/antigravity-ide/brain/bdedf906-7d7a-453f-a9aa-b8c068833ffe/.user_uploaded/media_1792067735701.jpg';
  const outputPath = path.resolve('public/images/cinematic-loader-backdrop.webp');

  const img = sharp(inputPath);
  const raw = await img.raw().toBuffer({ resolveWithObject: true });
  const w = raw.info.width;
  const h = raw.info.height;
  const data = Buffer.from(raw.data);

  // Blend out the static loading bar from x: 340 to 684, y: 523 to 540
  for (let y = 523; y <= 540; y++) {
    const factor = (y - 523) / 17;
    for (let x = 340; x <= 685; x++) {
      const targetIdx = (y * w + x) * 3;
      const topIdx = (518 * w + x) * 3;
      const botIdx = (546 * w + x) * 3;
      for (let c = 0; c < 3; c++) {
        data[targetIdx + c] = Math.round(data[topIdx + c] * (1 - factor) + data[botIdx + c] * factor);
      }
    }
  }

  await sharp(data, { raw: { width: w, height: h, channels: 3 } })
    .webp({ quality: 95 })
    .toFile(outputPath);

  console.log('Clean backdrop written to:', outputPath);
}

processImage().catch(console.error);
