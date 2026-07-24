import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { rooms } from '../src/data/siteContent.js'
import { blogPosts } from '../src/data/blogContent.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const SITE_URL = 'https://www.hotelramahindustani.com'
const TODAY = new Date().toISOString().split('T')[0]

const SITE_IMAGE = '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-front-pic-4.avif'

const pages = [
  { path: '/', changefreq: 'daily', priority: '1.0', images: [SITE_IMAGE] },
  { path: '/rooms', changefreq: 'weekly', priority: '0.9', images: rooms.map(r => r.image) },
  { path: '/restaurant', changefreq: 'weekly', priority: '0.8', images: ['/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-restaurant-pic-17.jpg'] },
  { path: '/tours', changefreq: 'weekly', priority: '0.8', images: [] },
  { path: '/services', changefreq: 'monthly', priority: '0.7', images: [] },
  { path: '/gallery', changefreq: 'monthly', priority: '0.7', images: [] },
  { path: '/blog', changefreq: 'weekly', priority: '0.8', images: [] },
  { path: '/about', changefreq: 'monthly', priority: '0.7', images: [SITE_IMAGE] },
  { path: '/contact', changefreq: 'monthly', priority: '0.7', images: [] },
  { path: '/book-now', changefreq: 'monthly', priority: '0.9', images: [] },
]

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`

function addUrl(loc, changefreq, priority, images = []) {
  xml += `
  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`
  images.forEach(imgPath => {
    xml += `
    <image:image>
      <image:loc>${SITE_URL}${escapeXml(imgPath)}</image:loc>
    </image:image>`
  })
  xml += `
  </url>`
}

pages.forEach(p => {
  addUrl(`${SITE_URL}${p.path}`, p.changefreq, p.priority, p.images)
})

rooms.forEach(r => {
  addUrl(`${SITE_URL}/rooms/${r.slug}`, 'weekly', '0.8', [r.image])
})

blogPosts.forEach(b => {
  addUrl(`${SITE_URL}/blog/${b.slug}`, 'monthly', '0.7', [b.featuredImage])
})

xml += `
</urlset>`

const totalUrls = 1 + pages.length + rooms.length + blogPosts.length - 1

const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
fs.writeFileSync(outputPath, xml, 'utf-8')
console.log(`Sitemap generated: ${outputPath} (${totalUrls} URLs)`)
