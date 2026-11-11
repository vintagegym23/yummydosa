/** Widths generated for every page hero in public/images/ by scripts/image-variants.mjs. */
const HERO_WIDTHS = [828, 1280, 1920];

/**
 * srcset for a full-width hero image (a WebP directly in public/images), so phones download an
 * ~828px copy instead of the ~2000px desktop original. The variants exist only in
 * production builds, so the dev server keeps using the original file.
 */
export function heroSrcSet(src: string | undefined): string | undefined {
  if (!src || !import.meta.env.PROD || !/^\/images\/[^/]+\.webp$/.test(src)) return undefined;
  const base = src.slice(0, -'.webp'.length);
  return HERO_WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(', ');
}
