/**
 * Generates sitemap.xml from the exported `out/` directory.
 *
 * Runs as the `postbuild` step after `next build` (static export).
 * Every route Next.js exports ends up as `<path>/index.html`, so the
 * sitemap always reflects the real, exported routes — no duplicated data.
 *
 * Domain resolution:
 *   1. process.env.SITE_DOMAIN
 *   2. the placeholder defined in src/data/site.ts (update before launch)
 */
const fs = require('fs');
const path = require('path');

const DEFAULT_DOMAIN = 'https://www.baibhabresorts.example';
const DOMAIN = (process.env.SITE_DOMAIN || DEFAULT_DOMAIN).replace(/\/+$/, '');

const OUT_DIR = path.join(__dirname, '..', 'out');

const EXCLUDE_DIRS = new Set(['_next', '.next']);

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!EXCLUDE_DIRS.has(entry.name)) {
        results.push(...walk(path.join(dir, entry.name)));
      }
    } else if (entry.name === 'index.html') {
      results.push(path.join(dir, entry.name));
    }
  }
  return results;
}

function toUrlPath(absPath) {
  const relative = path.relative(OUT_DIR, absPath);
  const segments = relative.split(path.sep);
  segments.pop(); // drop "index.html"

  if (segments.length === 0) return '/';
  const trailingSlash = path.basename(absPath) === 'index.html' ? '/' : '';
  return `/${segments.join('/')}${trailingSlash}`;
}

function generateSiteMap() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const urls = walk(OUT_DIR)
    .map(toUrlPath)
    .filter((url) => !['/404/', '/500/'].includes(url))
    .sort();

  const body = urls
    .map(
      (url) => `  <url>
    <loc>${DOMAIN}${url}</loc>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), generateSiteMap());
console.log(`sitemap.xml generated in out/ (${DOMAIN})`);
