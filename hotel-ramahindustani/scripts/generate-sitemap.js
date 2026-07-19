import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SITE_URL = 'https://www.hotelramahindustani.com'
const TODAY = new Date().toISOString().split('T')[0]

const routes = [
  { path: '/', changefreq: 'daily', priority: '1.0', images: ['/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-front-pic-4.avif'] },
  { path: '/rooms', changefreq: 'weekly', priority: '0.9', images: ['/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-economy-room-pic-22.jpg', '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-standard-room-pic-23.jpg', '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-deluxe-room-pic-28.jpg', '/hotel-ramahindustani-image/super-deluxe-room-with-fridge.jpg'] },
  { path: '/restaurant', changefreq: 'weekly', priority: '0.8', images: ['/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-restaurant-pic-17.jpg'] },
  { path: '/tours', changefreq: 'weekly', priority: '0.7', images: [] },
  { path: '/services', changefreq: 'monthly', priority: '0.7', images: [] },
  { path: '/gallery', changefreq: 'monthly', priority: '0.6', images: [] },
  { path: '/blog', changefreq: 'daily', priority: '0.8', images: [] },
  { path: '/about', changefreq: 'monthly', priority: '0.7', images: [] },
  { path: '/contact', changefreq: 'monthly', priority: '0.8', images: [] },
  { path: '/book-now', changefreq: 'monthly', priority: '0.9', images: [] },
]

const blogSlugs = [
  'best-budget-hotel-near-jecc-jaipur',
  'top-10-things-to-do-in-jaipur',
  'jaipur-travel-guide-2025',
  'best-vegetarian-restaurants-in-jaipur',
  'day-trips-from-jaipur',
  'jaipur-with-kids-family-travel-guide',
  'best-time-to-visit-jaipur',
  'jaipur-honeymoon-guide',
  'weekend-getaway-from-delhi-to-jaipur',
  'business-travel-guide-to-jaipur',
]

const staticPages = [
  { path: '/rooms/economy-double-room', changefreq: 'weekly', priority: '0.8', images: ['/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-economy-room-pic-22.jpg'] },
  { path: '/rooms/standard-double-room', changefreq: 'weekly', priority: '0.8', images: ['/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-standard-room-pic-23.jpg'] },
  { path: '/rooms/deluxe-room', changefreq: 'weekly', priority: '0.8', images: ['/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-deluxe-room-pic-28.jpg'] },
  { path: '/rooms/superior-double-room', changefreq: 'weekly', priority: '0.8', images: ['/hotel-ramahindustani-image/super-deluxe-room-with-fridge.jpg'] },
]

blogSlugs.forEach(slug => {
  staticPages.push({
    path: `/blog/${slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    images: [],
  })
})

const allRoutes = [...routes, ...staticPages]

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`

allRoutes.forEach(route => {
  xml += `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>`

  route.images.forEach(img => {
    xml += `
    <image:image>
      <image:loc>${SITE_URL}${img}</image:loc>
    </image:image>`
  })

  xml += `
  </url>`
})

xml += `
</urlset>`

const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
fs.writeFileSync(outputPath, xml, 'utf-8')
console.log(`Sitemap generated: ${outputPath} (${allRoutes.length} URLs)`)
