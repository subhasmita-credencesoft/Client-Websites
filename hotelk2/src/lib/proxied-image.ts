import manifest from '../../public/image-manifest.json';

const CACHE = manifest as Record<string, string>;

/**
 * Resolves a source-site image URL to its locally cached copy in
 * `public/cached/` (see `scripts/fetch-images.mjs`). Local/public assets
 * (paths starting with "/") are returned unchanged; uncached remote images
 * fall back to the remote source.
 */
export function proxiedImage(src: string): string {
  if (src.startsWith('/')) return src;
  return CACHE[src] ?? src;
}
