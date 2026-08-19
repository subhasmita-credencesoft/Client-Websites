import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const HOST = 'https://www.hhickp.com';
const OUT_DIR = path.resolve('public/cached');
const MANIFEST_PATH = path.resolve('public/image-manifest.json');

const SCAN_DIRS = ['src/data', 'src/components'];
const URL_RE = /https:\/\/www\.hhickp\.com\/[^\s"'`)\]}]+/g;
const ICONS_BASE_RE = /const ICONS = ['"]([^'"]+)['"]/;
const ICON_REF_RE = /\$\{ICONS\}\/([A-Za-z0-9._\-]+)/g;

async function collectUrls() {
  const files = [];
  for (const dir of SCAN_DIRS) {
    const entries = await recursive(dir);
    files.push(...entries.filter((f) => f.endsWith('.ts') || f.endsWith('.tsx')));
  }

  const urls = new Set();
  for (const file of files) {
    const text = await readFile(file, 'utf8');
    let base = '';
    const baseMatch = text.match(ICONS_BASE_RE);
    if (baseMatch) base = baseMatch[1];

    for (const m of text.matchAll(ICON_REF_RE)) {
      urls.add(`${base}/${m[1]}`);
    }
    for (const m of text.matchAll(URL_RE)) {
      urls.add(m[0]);
    }
  }
  return [...urls];
}

async function recursive(dir) {
  const { readdir } = await import('node:fs/promises');
  const { stat } = await import('node:fs/promises');
  const out = [];
  for (const entry of await readdir(dir)) {
    const full = path.join(dir, entry);
    if ((await stat(full)).isDirectory()) {
      out.push(...(await recursive(full)));
    } else {
      out.push(full);
    }
  }
  return out;
}

async function download(url) {
  const u = new URL(url);
  if (u.hostname !== 'www.hhickp.com' && u.hostname !== 'hhickp.com') return null;
  const relative = u.pathname.replace(/^\/+/, '');
  const parts = relative.split('/').filter((p) => p && p !== '..');
  const dest = path.join(OUT_DIR, ...parts);

  if (existsSync(dest)) return { url, dest: `/cached/${parts.join('/')}` };

  const res = await fetch(url, {
    headers: {
      Referer: `${HOST}/`,
      'User-Agent': 'Mozilla/5.0 (compatible; HotelHariSite/1.0)',
      Accept: 'image/webp,image/avif,image/*,*/*;q=0.8',
    },
  });

  if (!res.ok) {
    console.warn(`  ! skip ${url} (HTTP ${res.status})`);
    return null;
  }

  await mkdir(path.dirname(dest), { recursive: true });
  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buffer);
  console.log(`  ok  ${url}`);
  return { url, dest: `/cached/${parts.join('/')}` };
}

const urls = await collectUrls();
console.log(`Found ${urls.length} image URLs.`);

const manifest = {};
let ok = 0;
for (const url of urls) {
  const result = await download(url);
  if (result) {
    manifest[result.url] = result.dest;
    ok += 1;
  }
}

await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log(`Cached ${ok}/${urls.length} images. Manifest written to public/image-manifest.json`);
