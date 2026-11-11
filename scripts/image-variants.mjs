#!/usr/bin/env node
/**
 * Build step (after `vite build`): for every menu photo in public/images/menu/photos/
 * (JPEGs, ~800px wide), writes WebP versions into dist/ next to the original:
 *   <name>.400.webp   for small cards on phones and grids
 *   <name>.800.webp   for larger cards / high-density screens
 * DishImage serves them through <picture> with the JPEG as fallback, so the restaurant
 * can keep adding plain JPEGs (see public/images/menu/README.md) and still ship WebP.
 *
 * Also writes 828/1280/1920px copies of the full-width page hero images in public/images/
 * (<name>-828.webp etc.) for the heroes' srcset (src/components/heroSrcSet.ts).
 */
import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const srcDir = join(root, 'public/images/menu/photos');
const outDir = join(root, 'dist/images/menu/photos');

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const photos = walk(srcDir).filter((f) => /\.jpe?g$/i.test(f));
let before = 0;
let after = 0;
const started = Date.now();

await Promise.all(
  photos.map(async (file) => {
    const out = join(outDir, relative(srcDir, file)).replace(/\.jpe?g$/i, '');
    mkdirSync(dirname(out), { recursive: true });
    before += statSync(file).size;
    for (const width of [400, 800]) {
      const info = await sharp(file)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toFile(`${out}.${width}.webp`);
      if (width === 800) after += info.size;
    }
  })
);

// Page heroes: full-bleed, so phones only need a fraction of the desktop width.
const HERO_WIDTHS = [828, 1280, 1920];
const heroDir = join(root, 'public/images');
const heroes = readdirSync(heroDir).filter((f) => f.endsWith('.webp'));
await Promise.all(
  heroes.flatMap((name) =>
    HERO_WIDTHS.map((width) =>
      sharp(join(heroDir, name))
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80, effort: 5 })
        .toFile(join(root, 'dist/images', name.replace(/\.webp$/, `-${width}.webp`)))
    )
  )
);

const kb = (n) => `${Math.round(n / 1024)} KB`;
console.log(
  `image-variants: ${photos.length} menu photos -> WebP 400w + 800w in ${((Date.now() - started) / 1000).toFixed(1)}s ` +
    `(full-size: ${kb(before)} JPEG -> ${kb(after)} WebP); ${heroes.length} heroes -> ${HERO_WIDTHS.join('/')}w`
);
