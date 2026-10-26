/**
 * Custom next/image loader for a static site.
 * - Unsplash URLs: asks Unsplash's own CDN for the exact width needed (responsive + WebP/AVIF via auto=format).
 * - Local files (e.g. /images/logo.png): served as-is.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }): string {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    return url.toString();
  }
  // Safely URL-encode spaces and special characters for CDN images
  return encodeURI(decodeURI(src));
}
