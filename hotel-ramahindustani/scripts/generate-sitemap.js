import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const SITE_URL = 'https://www.hotelramahindustani.com'
const TODAY = new Date().toISOString().split('T')[0]

const img = (name) => `/hotel-ramahindustani-image/${name}`

const SITE_IMAGE = img('hotel-rama-hindustani-jaipur-front-pic-4.avif')

const pages = [
  { path: '/', changefreq: 'daily', priority: '1.0', images: [SITE_IMAGE] },
  {
    path: '/rooms',
    changefreq: 'weekly',
    priority: '0.9',
    images: [
      img('hotel-rama-hindustani-jaipur-economy-room-pic-22.jpg'),
      img('hotel-rama-hindustani-jaipur-standard-room-pic-23.jpg'),
      img('hotel-rama-hindustani-jaipur-deluxe-room-pic-28.jpg'),
      img('super-deluxe-room-with-fridge.jpg'),
    ],
  },
  { path: '/restaurant', changefreq: 'weekly', priority: '0.8', images: [img('hotel-rama-hindustani-jaipur-restaurant-pic-17.jpg')] },
  { path: '/tours', changefreq: 'weekly', priority: '0.8', images: [] },
  { path: '/services', changefreq: 'monthly', priority: '0.7', images: [] },
  { path: '/gallery', changefreq: 'monthly', priority: '0.7', images: [] },
  { path: '/blog', changefreq: 'weekly', priority: '0.8', images: [] },
  { path: '/about', changefreq: 'monthly', priority: '0.7', images: [SITE_IMAGE] },
  { path: '/contact', changefreq: 'monthly', priority: '0.7', images: [] },
  { path: '/book-now', changefreq: 'monthly', priority: '0.9', images: [] },
]

const rooms = [
  {
    name: 'Economy Double Room',
    slug: 'economy-double-room',
    image: img('hotel-rama-hindustani-jaipur-economy-room-pic-22.jpg'),
    price: '1,155',
  },
  {
    name: 'Standard Double Room',
    slug: 'standard-double-room',
    image: img('hotel-rama-hindustani-jaipur-standard-room-pic-23.jpg'),
    price: '1,365',
  },
  {
    name: 'Deluxe Room',
    slug: 'deluxe-room',
    image: img('hotel-rama-hindustani-jaipur-deluxe-room-pic-28.jpg'),
    price: '1,680',
  },
  {
    name: 'Superior Double Room',
    slug: 'superior-double-room',
    image: img('super-deluxe-room-with-fridge.jpg'),
    price: '2,940',
  },
]

const blogPosts = [
  { slug: 'best-budget-hotel-near-jaipur-airport', image: SITE_IMAGE },
  { slug: 'hotel-near-jecc-jaipur', image: img('hotel-rama-hindustani-jaipur-reception-pic-14.jpg') },
  { slug: 'family-hotel-in-pratap-nagar-jaipur', image: img('hotel-rama-hindustani-jaipur-front-pic-4.jpg') },
  { slug: 'hotel-near-sanganer-railway-station', image: img('hotel-rama-hindustani-front-3.avif') },
  { slug: 'where-to-stay-near-jaipur-airport', image: SITE_IMAGE },
  { slug: 'hotels-near-chokhi-dhani-jaipur', image: img('hotel-rama-hindustani-and-rama-rasoi-front-2.avif') },
  { slug: 'jaipur-travel-guide-first-time-visitors', image: SITE_IMAGE },
  { slug: 'places-to-visit-near-pratap-nagar-jaipur', image: img('hotel-rama-hindustani-front-3.avif') },
  { slug: 'hotels-near-sitapura-industrial-area-jaipur', image: img('hotel-rama-hindustani-jaipur-reception-pic-14.jpg') },
  { slug: 'why-book-direct-with-hotel-rama-hindustani', image: img('hotel-rama-hindustani-reception-area-1.jpg') },
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
  addUrl(`${SITE_URL}/blog/${b.slug}`, 'monthly', '0.7', [b.image])
})

xml += `
</urlset>`

const totalUrls = 1 + pages.length + rooms.length + blogPosts.length - 1

const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
fs.writeFileSync(outputPath, xml, 'utf-8')
console.log(`Sitemap generated: ${outputPath} (${totalUrls} URLs)`)
