const sharp = require('sharp');
const path = require('path');

async function extractPortrait() {
  const inputPath = 'C:/Users/msi/.gemini/antigravity-ide/brain/bdedf906-7d7a-453f-a9aa-b8c068833ffe/.user_uploaded/media_1792067746120.jpg';
  const outputPath = path.resolve('public/images/aflal-cutout.png');

  const img = sharp(inputPath);
  const raw = await img.raw().toBuffer({ resolveWithObject: true });
  const w = raw.info.width;
  const h = raw.info.height;
  const data = raw.data;

  // Create RGBA buffer
  const rgba = Buffer.alloc(w * h * 4);

  for (let i = 0; i < w * h; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];

    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;

    // Check if background (near black)
    const brightness = Math.max(r, g, b);
    if (brightness < 12) {
      rgba[i * 4 + 3] = 0; // transparent
    } else if (brightness < 30) {
      // Smooth edge antialiasing
      rgba[i * 4 + 3] = Math.round(((brightness - 12) / 18) * 255);
    } else {
      rgba[i * 4 + 3] = 255;
    }
  }

  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile(outputPath);

  console.log('Cutout PNG written to:', outputPath);
}

extractPortrait().catch(console.error);
