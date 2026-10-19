const sharp = require('sharp');
const path = require('path');

async function extractFromBlackStudio() {
  const inputPath = 'C:/Users/msi/.gemini/antigravity-ide/brain/bdedf906-7d7a-453f-a9aa-b8c068833ffe/.user_uploaded/media_1792067746120.jpg';
  const img = sharp(inputPath);
  const raw = await img.raw().toBuffer({ resolveWithObject: true });
  const w = raw.info.width;
  const h = raw.info.height;
  const data = raw.data;

  // Flood fill from borders
  const isBg = new Uint8Array(w * h); // 1 = background, 0 = foreground
  const queue = new Int32Array(w * h);
  let qHead = 0;
  let qTail = 0;

  function pushPixel(x, y) {
    const idx = y * w + x;
    if (isBg[idx]) return;
    const r = data[idx * 3];
    const g = data[idx * 3 + 1];
    const b = data[idx * 3 + 2];
    const maxVal = Math.max(r, g, b);

    // Background threshold: studio black is <= 18
    if (maxVal <= 20) {
      isBg[idx] = 1;
      queue[qTail++] = idx;
    }
  }

  // Push all outer boundary pixels
  for (let x = 0; x < w; x++) {
    pushPixel(x, 0);
    pushPixel(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    pushPixel(0, y);
    pushPixel(w - 1, y);
  }

  // BFS flood-fill
  while (qHead < qTail) {
    const curr = queue[qHead++];
    const cx = curr % w;
    const cy = Math.floor(curr / w);

    const neighbors = [
      cx > 0 ? curr - 1 : -1,
      cx < w - 1 ? curr + 1 : -1,
      cy > 0 ? curr - w : -1,
      cy < h - 1 ? curr + w : -1,
    ];

    for (const n of neighbors) {
      if (n === -1 || isBg[n]) continue;
      const r = data[n * 3];
      const g = data[n * 3 + 1];
      const b = data[n * 3 + 2];
      const maxVal = Math.max(r, g, b);

      if (maxVal <= 24) {
        isBg[n] = 1;
        queue[qTail++] = n;
      }
    }
  }

  // Create RGBA
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];

    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;

    if (isBg[i]) {
      rgba[i * 4 + 3] = 0; // completely transparent!
    } else {
      rgba[i * 4 + 3] = 255;
    }
  }

  // Soft feathering on boundary
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = y * w + x;
      if (rgba[idx * 4 + 3] === 255) {
        // check neighbors
        let bgCount = 0;
        if (rgba[(idx - 1) * 4 + 3] === 0) bgCount++;
        if (rgba[(idx + 1) * 4 + 3] === 0) bgCount++;
        if (rgba[(idx - w) * 4 + 3] === 0) bgCount++;
        if (rgba[(idx + w) * 4 + 3] === 0) bgCount++;

        if (bgCount >= 2) {
          rgba[idx * 4 + 3] = 160;
        } else if (bgCount === 1) {
          rgba[idx * 4 + 3] = 220;
        }
      }
    }
  }

  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile('public/images/aflal-cutout-transparent.png');

  console.log('Transparent portrait cutout saved to public/images/aflal-cutout-transparent.png');
}

extractFromBlackStudio().catch(console.error);
