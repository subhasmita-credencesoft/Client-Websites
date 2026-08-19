import manifest from '../../public/image-manifest.json';

interface LoaderParams {
  src: string;
  width: number;
  quality?: number;
}

const CACHE = manifest as Record<string, string>;

const HOSTED = /^https?:\/\/(www\.)?hhickp\.com\//;

/**
 * Global Next.js image loader (configured in next.config.js).
 * Absolute (http/https) source-site URLs resolve to the locally cached copy
 * in `public/cached/` (see `scripts/fetch-images.mjs`, run automatically
 * before `dev`/`build`). Any image that is not cached falls back to the
 * remote source. Local/relative sources pass through as-is.
 */
export default function imageLoader({ src }: LoaderParams): string {
  if (!/^https?:\/\//.test(src)) {
    return src;
  }
  return CACHE[src] ?? src;
}

export { HOSTED };
