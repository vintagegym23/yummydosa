#!/usr/bin/env node
/**
 * Asset integrity check (run by `npm test` and in the Amplify build).
 *
 * Fails if the code references a file in public/ that doesn't exist:
 *  - every literal "/path/file.ext" string in src/ and index.html
 *  - every menu photo key in src/data/menuPhotos.ts -> public/images/menu/photos/<key>.jpg
 * Warns (doesn't fail) about files in public/ that nothing references, since they
 * still get deployed and add to the bundle.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const publicDir = join(root, 'public');

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const sources = [...walk(join(root, 'src')).filter((f) => /\.(tsx?|css)$/.test(f)), join(root, 'index.html')];
const referenced = new Set();
const missing = [];

const ASSET_PATH = /["'`(](\/[^"'`()\s?#]+\.(?:webp|png|jpe?g|gif|svg|ico|mp4|webm|pdf|woff2?))/g;
for (const file of sources) {
  const text = readFileSync(file, 'utf8');
  for (const [, path] of text.matchAll(ASSET_PATH)) {
    if (path.includes("${")) continue; // template-built paths are expanded explicitly below
    const decoded = decodeURI(path);
    referenced.add(decoded);
    if (!existsSync(join(publicDir, decoded))) missing.push(`${decoded}  (referenced in ${relative(root, file)})`);
  }
}

// Template-built paths: the five review clips and the menu photo keys.
for (const n of [1, 2, 3, 4, 5]) referenced.add(`/videos/reviews/review-${n}.mp4`);
const menuPhotos = readFileSync(join(root, 'src/data/menuPhotos.ts'), 'utf8');
for (const [, key] of menuPhotos.matchAll(/^\s+"([^"]+)":\s*\{/gm)) {
  const path = `/images/menu/photos/${key}.jpg`;
  referenced.add(path);
  if (!existsSync(join(publicDir, path))) missing.push(`${path}  (menu photo key "${key}")`);
}

const IGNORE_UNUSED = /\.md$/;
const unused = walk(publicDir)
  .map((f) => '/' + relative(publicDir, f).split(sep).join('/'))
  .filter((p) => !referenced.has(p) && !IGNORE_UNUSED.test(p));

if (unused.length) {
  console.warn(`warning: ${unused.length} file(s) in public/ are not referenced by the code (they are still deployed):`);
  unused.forEach((p) => console.warn(`  ${p}`));
}

if (missing.length) {
  console.error(`error: ${missing.length} referenced asset(s) are missing from public/:`);
  missing.forEach((m) => console.error(`  ${m}`));
  process.exit(1);
}

console.log(`assets ok: ${referenced.size} referenced files all present in public/`);
