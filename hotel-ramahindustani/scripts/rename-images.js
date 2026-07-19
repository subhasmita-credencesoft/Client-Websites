/**
 * Rename image files to URL-friendly slugs.
 * - Lowercase
 * - Replace spaces with hyphens
 * - Remove special characters
 * - Deduplicate consecutive hyphens
 *
 * Also generates a mapping file for code reference updates.
 */

import { writeFileSync, readdirSync, renameSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const IMAGE_DIR = join(__dirname, '..', 'public', 'hotel-ramahindustani-image')

function toSlug(name) {
  const ext = extname(name)
  const base = name.slice(0, -ext.length)
  return base
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') + ext
}

const files = readdirSync(IMAGE_DIR)
const mapping = {}
let renamed = 0

for (const file of files) {
  const slug = toSlug(file)
  if (file !== slug) {
    const oldPath = join(IMAGE_DIR, file)
    const newPath = join(IMAGE_DIR, slug)
    renameSync(oldPath, newPath)
    mapping[file] = slug
    renamed++
    console.log(`  ${file} -> ${slug}`)
  }
}

console.log(`\nRenamed ${renamed} files.`)

// Write mapping for reference
writeFileSync(join(__dirname, 'image-mapping.json'), JSON.stringify(mapping, null, 2))
console.log('Mapping saved to scripts/image-mapping.json')
