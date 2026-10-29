/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');

const pub = 'public';

async function main() {
  // 1. Dedicated 1200x630 Open Graph / Twitter card image (JPG — required by crawlers)
  await sharp(`${pub}/images/hotel-hero.jpg`)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 88, progressive: true, mozjpeg: true })
    .toFile(`${pub}/og-image.jpg`);

  // 2. Square brand icons from the tall 124x180 logo (padded on brand navy)
  const logo = await sharp(`${pub}/sitaralogo.jpg`).toBuffer();

  const square = async (size, out) => {
    // Pad the tall logo onto a square brand-navy canvas, keeping the crest centred.
    const inner = await sharp(logo)
      .resize({ width: Math.round(size * 0.82), height: Math.round(size * 0.82), fit: 'contain', background: { r: 11, g: 32, b: 60, alpha: 1 } })
      .png()
      .toBuffer();
    await sharp({
      create: { width: size, height: size, channels: 3, background: { r: 11, g: 32, b: 60 } },
    })
      .composite([{ input: inner, gravity: 'centre' }])
      .png({ compressionLevel: 9, palette: true, colours: 128 })
      .toFile(`${pub}/${out}`);
  };

  await square(192, 'icon.png');
  await square(180, 'apple-icon.png');
  await square(32, 'favicon-32x32.png');
  await square(192, 'android-chrome-192x192.png');

  for (const f of ['og-image.jpg', 'icon.png', 'apple-icon.png', 'favicon-32x32.png', 'android-chrome-192x192.png']) {
    const s = fs.statSync(`${pub}/${f}`);
    console.log(`${f} -> ${(s.size / 1024).toFixed(1)} KB`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
