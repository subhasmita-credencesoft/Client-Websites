/**
 * Generates sitemap.xml from the exported `out/` directory.
 *
 * Runs as the `postbuild` step after `next build` (static export).
 * With trailingSlash disabled, every route exports as a flat
 * `<path>.html` file; sitemap URLs are emitted CLEAN, without a
 * trailing slash (e.g. https://domain/location), matching the
 * canonical tags and the site .htaccess.
 *
 * Domain resolution:
 *   1. process.env.SITE_DOMAIN
 *   2. the placeholder defined in src/data/site.ts (update before launch)
 */
const fs = require('fs');
const path = require('path');

const DEFAULT_DOMAIN = 'https://baibhabresortsandconventions.com';
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
    } else if (entry.name.endsWith('.html')) {
      results.push(path.join(dir, entry.name));
    }
  }
  return results;
}

function toUrlPath(absPath) {
  const relative = path.relative(OUT_DIR, absPath);
  const url = `/${relative.split(path.sep).join('/')}`.replace(/\.html$/, '');
  return url === '/index' ? '/' : url;
}

function generateSiteMap() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const urls = walk(OUT_DIR)
    .map(toUrlPath)
    .filter((url) => !['/404', '/500'].includes(url))
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

// Copy public/.htaccess into out/ — Next.js skips dotfiles when copying
// public/ during static export, but Apache hosts need it deployed.
const htaccessSrc = path.join(__dirname, '..', 'public', '.htaccess');
const htaccessDest = path.join(OUT_DIR, '.htaccess');
if (fs.existsSync(htaccessSrc)) {
  fs.copyFileSync(htaccessSrc, htaccessDest);
  console.log('.htaccess copied to out/');
}
