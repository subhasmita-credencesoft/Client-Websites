import { promises as fs } from 'node:fs';
import path from 'node:path';

/**
 * Next.js App Router Static Export RSC Payload Mapper
 * ----------------------------------------------------
 * During static export (`output: 'export'`), Next.js emits segment payloads into nested directories,
 * e.g.:
 *   out/bedrooms/__next.bedrooms/__PAGE__.txt
 *   out/bedrooms/executive-room/__next.bedrooms/$d$slug/__PAGE__.txt
 *
 * However, client-side prefetching and router navigation request flat dot-separated files:
 *   /bedrooms/__next.bedrooms._PAGE__.txt
 *   /bedrooms/executive-room/__next.bedrooms.$d$slug._PAGE__.txt
 *
 * This script mirrors the nested files to flat files so static servers, CDNs, and Apache
 * can serve them directly with 200 OK without any 404s.
 */

async function findFiles(dir, matchName) {
  const results = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...(await findFiles(fullPath, matchName)));
      } else if (entry.name === matchName) {
        results.push(fullPath);
      }
    }
  } catch {
    // directory doesn't exist or not accessible
  }
  return results;
}

async function fixRscPayloads() {
  const outDir = path.resolve(process.cwd(), 'out');
  try {
    await fs.access(outDir);
  } catch {
    console.log('[fix-rsc-payloads] "out" directory not found, skipping.');
    return;
  }

  const pageFiles = await findFiles(outDir, '__PAGE__.txt');
  let mirroredCount = 0;

  for (const filePath of pageFiles) {
    const parentDir = path.dirname(filePath);
    const parentName = path.basename(parentDir);

    // Case 1: Nested dynamic segment: .../__next.<segment>/$d$slug/__PAGE__.txt
    if (parentName === '$d$slug') {
      const grandParentDir = path.dirname(parentDir);
      const grandParentName = path.basename(grandParentDir); // e.g. __next.bedrooms
      const routeDir = path.dirname(grandParentDir); // e.g. out/bedrooms/executive-room

      if (grandParentName.startsWith('__next.')) {
        const flatFileName = `${grandParentName}.$d$slug._PAGE__.txt`;
        const targetPath = path.join(routeDir, flatFileName);
        await fs.copyFile(filePath, targetPath);
        mirroredCount++;
      }
    }
    // Case 2: Standard page segment: .../__next.<segment>/__PAGE__.txt
    else if (parentName.startsWith('__next.')) {
      const routeDir = path.dirname(parentDir); // e.g. out/bedrooms
      const flatFileName = `${parentName}._PAGE__.txt`;
      const targetPath = path.join(routeDir, flatFileName);
      await fs.copyFile(filePath, targetPath);
      mirroredCount++;
    }
  }

  // Also ensure root level .htaccess is copied into out/ if not already present
  const publicHtaccess = path.resolve(process.cwd(), 'public', '.htaccess');
  const outHtaccess = path.join(outDir, '.htaccess');
  try {
    await fs.copyFile(publicHtaccess, outHtaccess);
    console.log('[fix-rsc-payloads] Copied public/.htaccess to out/.htaccess');
  } catch (err) {
    console.warn('[fix-rsc-payloads] Could not copy .htaccess:', err.message);
  }

  console.log(`[fix-rsc-payloads] Successfully mirrored ${mirroredCount} RSC payload files in out/`);
}

fixRscPayloads().catch((err) => {
  console.error('[fix-rsc-payloads] Error:', err);
  process.exit(1);
});
