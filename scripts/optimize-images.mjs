import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const dir = path.resolve('public/images');
const maxWidth = { 'profile.jpg': 800 };
const defaultMaxWidth = 1600;
// profile.jpg is kept as JPEG too because social crawlers read it from the OG tags.
const sources = (await readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f));

for (const file of sources) {
  const out = path.join(dir, file.replace(/\.(jpe?g|png)$/i, '.webp'));
  const info = await sharp(path.join(dir, file))
    .resize({ width: maxWidth[file] ?? defaultMaxWidth, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  console.log(`${file} -> ${path.basename(out)} (${Math.round(info.size / 1024)} KB)`);
}
