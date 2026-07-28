/**
 * Lightweight prerender script for SEO.
 * Generates route-specific HTML files with correct meta tags,
 * canonical URLs, and structured data for each page.
 *
 * Run AFTER `vite build`:
 *   node scripts/prerender.js
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { rooms, services, testimonials, contactDetails, storyBlocks, homepageHighlights } from '../src/data/siteContent.js'
import { blogPosts } from '../src/data/blogContent.js'
import { nearbyLandmarks } from '../src/data/locations.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(__dirname, '..', 'dist')
const SITE_URL = 'https://www.hotelramahindustani.com'

const routes = [
  {
    path: '/',
    title: 'Hotel Rama Hindustani — Budget Hotel in Pratap Nagar, Jaipur',
    description: 'Budget 3-star hotel in Pratap Nagar, Jaipur near Sanganer Airport, JECC & Sanganer Railway Station. AC rooms, free WiFi, veg restaurant. Book direct & save.',
    keywords: 'Hotel in Pratap Nagar Jaipur, Budget Hotel Near Jaipur Airport, Hotel Near JECC Jaipur, Best Budget Hotel Pratap Nagar, Hotel Near Sanganer Railway Station, Family Hotel Jaipur, Affordable Hotel Near Airport Jaipur',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-front-pic-4.avif',
    schema: 'home',
  },
  {
    path: '/rooms',
    title: 'Hotel Rooms in Pratap Nagar Jaipur | Budget AC Rooms — Hotel Rama Hindustani',
    description: 'Browse budget AC hotel rooms at Hotel Rama Hindustani, Pratap Nagar Jaipur — Economy, Standard, Deluxe & Superior Double Rooms with free WiFi, free parking & room service. Starting from ₹1,155/night. Book direct for best rates near Airport & JECC.',
    keywords: 'Hotel Rooms in Pratap Nagar Jaipur, Budget AC Rooms Near Jaipur Airport, Deluxe Room Pratap Nagar, Economy Double Room Jaipur, Standard Double Room Jaipur, Superior Double Room Jaipur, Family Room Jaipur Hotel, Book Room Near JECC Jaipur',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-economy-room-pic-22.jpg',
    schema: 'rooms',
  },
  {
    path: '/rooms/economy-double-room',
    title: 'Economy Double Room Jaipur | Budget AC Room Near Airport | Hotel Rama Hindustani',
    description: 'Book the Economy Double Room at Hotel Rama Hindustani in Pratap Nagar Jaipur. Clean AC room with free WiFi, flat TV, and room service. Starting from ₹1,155/night. Direct booking best price.',
    keywords: 'Economy Double Room Jaipur, Budget AC Room Near Jaipur Airport, Cheap Hotel Room Pratap Nagar, Economy Room Price Jaipur',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-economy-room-pic-22.jpg',
    schema: 'room-detail',
    roomSlug: 'economy-double-room',
  },
  {
    path: '/rooms/standard-double-room',
    title: 'Standard Double Room Jaipur | Comfortable AC Room | Hotel Rama Hindustani',
    description: 'Book the Standard Double Room at Hotel Rama Hindustani, Pratap Nagar Jaipur. AC room with free WiFi, flat TV, geyser, and room service. Starting from ₹1,365/night.',
    keywords: 'Standard Double Room Jaipur, AC Room Pratap Nagar, Hotel Room Near Airport Jaipur, Standard Room Price Jaipur',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-standard-room-pic-23.jpg',
    schema: 'room-detail',
    roomSlug: 'standard-double-room',
  },
  {
    path: '/rooms/deluxe-room',
    title: 'Deluxe Room Jaipur | Spacious AC Room with Premium Bedding | Hotel Rama Hindustani',
    description: 'Book the Deluxe Room at Hotel Rama Hindustani, Pratap Nagar Jaipur. Spacious AC room with premium bedding, free WiFi, flat TV. Starting from ₹1,680/night.',
    keywords: 'Deluxe Room Jaipur, Spacious Hotel Room Pratap Nagar, Premium Room Near Airport Jaipur, Deluxe Room Price Jaipur',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-deluxe-room-pic-28.jpg',
    schema: 'room-detail',
    roomSlug: 'deluxe-room',
  },
  {
    path: '/rooms/superior-double-room',
    title: 'Superior Double Room Jaipur | Premium Room with Mini Fridge | Hotel Rama Hindustani',
    description: 'Book the Superior Double Room at Hotel Rama Hindustani, Pratap Nagar Jaipur. Premium room with AC, mini fridge, free WiFi, premium bedding. Starting from ₹2,940/night.',
    keywords: 'Superior Double Room Jaipur, Premium Room Pratap Nagar, Room with Fridge Jaipur, Superior Room Price Jaipur',
    ogImage: '/hotel-ramahindustani-image/super-deluxe-room-with-fridge.jpg',
    schema: 'room-detail',
    roomSlug: 'superior-double-room',
  },
  {
    path: '/restaurant',
    title: 'Vegetarian Restaurant in Pratap Nagar Jaipur | Rama Rasoi — Hotel Rama Hindustani',
    description: 'Rama Rasoi — pure vegetarian restaurant at Hotel Rama Hindustani, Pratap Nagar Jaipur. Authentic Indian thali, North Indian food & homely meals. Open to non-guests. Near JECC & Airport.',
    keywords: 'Vegetarian Restaurant Pratap Nagar Jaipur, Rama Rasoi Jaipur, Pure Veg Restaurant Near Jaipur Airport, Indian Thali Restaurant Pratap Nagar, Hotel Restaurant Near JECC Jaipur, Budget Restaurant Pratap Nagar',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-restaurant-pic-17.jpg',
    schema: 'restaurant',
  },
  {
    path: '/services',
    title: 'Hotel Services & Amenities in Pratap Nagar Jaipur | Free WiFi, Parking',
    description: 'Explore amenities at Hotel Rama Hindustani in Pratap Nagar Jaipur — free WiFi, free parking, room service, AC rooms, laundry, power backup, and on-site vegetarian restaurant.',
    keywords: 'Hotel Amenities Pratap Nagar Jaipur, Free WiFi Hotel Near Airport, Free Parking Hotel Jaipur, Hotel Services Pratap Nagar',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-front-pic-4.avif',
    schema: 'services',
  },
  {
    path: '/gallery',
    title: 'Hotel Rama Hindustani Photo Gallery | Rooms, Restaurant & Amenities Photos',
    description: 'View photos of Hotel Rama Hindustani in Pratap Nagar Jaipur including rooms, restaurant, exterior, gym, and amenities. See why guests love our budget hotel.',
    keywords: 'Hotel Photos Pratap Nagar Jaipur, Hotel Rama Hindustani Gallery, Budget Hotel Photos Jaipur, Hotel Room Photos Near Airport',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-front-pic-4.avif',
    schema: 'gallery',
  },
  {
    path: '/about',
    title: 'About Hotel Rama Hindustani | Budget Family Hotel in Pratap Nagar Jaipur',
    description: 'Learn about Hotel Rama Hindustani in Pratap Nagar Jaipur — a budget family hotel near Jaipur Airport, JECC, and Sanganer Railway Station with warm Indian hospitality.',
    keywords: 'About Hotel Rama Hindustani, Budget Family Hotel Jaipur, Hotel Near Jaipur Airport, Hotel Near JECC, Pratap Nagar Hotel',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-front-pic-4.avif',
    schema: 'about',
  },
  {
    path: '/contact',
    title: 'Contact Hotel Rama Hindustani | Phone, WhatsApp & Address | Pratap Nagar Jaipur',
    description: 'Contact Hotel Rama Hindustani in Pratap Nagar Jaipur for room bookings and inquiries. Call +91 63767 07091, WhatsApp, or visit us near Sanganer Railway Station.',
    keywords: 'Contact Hotel Pratap Nagar Jaipur, Hotel Near Sanganer Contact, Hotel Near Jaipur Airport Phone, Booking Pratap Nagar',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-front-pic-4.avif',
    schema: 'contact',
  },
  {
    path: '/tours',
    title: 'Tourist Places Near Hotel Rama Hindustani | Chokhi Dhani, Hawa Mahal, Amer Fort',
    description: 'Explore tourist places near Hotel Rama Hindustani in Pratap Nagar, Jaipur — Chokhi Dhani, Patrika Gate, Hawa Mahal, Amer Fort and more with distances and directions.',
    keywords: 'Tourist Places Near Pratap Nagar Jaipur, Places Near Hotel Rama Hindustani, Chokhi Dhani Distance, Hawa Mahal Distance',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-front-pic-4.avif',
    schema: 'tours',
  },
  {
    path: '/book-now',
    title: 'Book Hotel in Pratap Nagar Jaipur | Direct Booking Best Price — Hotel Rama Hindustani',
    description: 'Book direct at Hotel Rama Hindustani, Pratap Nagar Jaipur — best price guarantee, no OTA commission, instant WhatsApp confirmation. Budget AC rooms from ₹1,155/night near Airport & JECC.',
    keywords: 'Book Hotel in Pratap Nagar Jaipur, Direct Hotel Booking Best Price Jaipur, Book Hotel Near Jaipur Airport Online, Budget Hotel Booking Pratap Nagar, Hotel Near JECC Jaipur Book Now',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-front-pic-4.avif',
    schema: 'bookNow',
  },
  {
    path: '/blog',
    title: 'Hotel Rama Hindustani Blog | Jaipur Travel Guide & Hotel Tips',
    description: 'Read the Hotel Rama Hindustani blog for Jaipur travel guides, hotel tips, local attraction guides, and booking advice. Plan your perfect Jaipur trip.',
    keywords: 'Jaipur Travel Guide Blog, Pratap Nagar Travel Tips, Budget Hotel Near Airport Blog, Hotel Booking Tips Jaipur',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-front-pic-4.avif',
    schema: 'blog',
  },
]

const blogRoutes = [
  {
    path: '/blog/best-budget-hotel-near-jaipur-airport',
    title: 'Best Budget Hotel Near Jaipur Airport | Comfortable Stays Under ₹2,000',
    description: 'Looking for a budget hotel near Jaipur Airport? Hotel Rama Hindustani is just 5 km from Jaipur International Airport with rooms starting at ₹1,155. Free WiFi, parking, and airport transfer assistance available. Book direct for the best rates.',
    keywords: 'budget hotel near Jaipur Airport, hotel near Jaipur Airport, cheap hotel near Jaipur Airport',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-front-pic-4.avif',
  },
  {
    path: '/blog/hotel-near-jecc-jaipur',
    title: 'Hotel Near JECC Jaipur | Best Accommodation for Convention Center Visitors',
    description: 'Looking for a hotel near JECC Jaipur? Hotel Rama Hindustani is just 4 km from Jaipur Exhibition and Convention Centre. Clean AC rooms from ₹1,155, free WiFi, parking, and easy access to Sitapura.',
    keywords: 'hotel near JECC Jaipur, hotel near Jaipur Exhibition Centre, budget hotel near JECC',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-reception-pic-14.jpg',
  },
  {
    path: '/blog/family-hotel-in-pratap-nagar-jaipur',
    title: 'Family Hotel in Pratap Nagar Jaipur | Safe, Comfortable, and Affordable',
    description: 'Looking for a family-friendly hotel in Pratap Nagar Jaipur? Hotel Rama Hindustani offers spacious rooms for up to 4 guests, homely vegetarian food, free WiFi, and free parking.',
    keywords: 'family hotel in Pratap Nagar Jaipur, family friendly hotel Jaipur, budget family hotel Pratap Nagar',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-front-pic-4.jpg',
  },
  {
    path: '/blog/hotel-near-sanganer-railway-station',
    title: 'Hotel Near Sanganer Railway Station Jaipur | Convenient Rail Travel Accommodation',
    description: 'Looking for a hotel near Sanganer Railway Station Jaipur? Hotel Rama Hindustani is just 3 km from the station with AC rooms from ₹1,155. Free WiFi, parking, and easy train connectivity.',
    keywords: 'hotel near Sanganer Railway Station, hotel near Sanganer station, budget hotel near railway station Jaipur',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-front-3.avif',
  },
  {
    path: '/blog/where-to-stay-near-jaipur-airport',
    title: 'Where to Stay Near Jaipur Airport (2026 Guide) | Hotel Rama Hindustani',
    description: 'Complete guide to hotels near Jaipur Airport. Compare luxury vs budget options. Hotel Rama Hindustani is the best budget hotel at 5 km from the airport with rooms from ₹1,155.',
    keywords: 'where to stay near Jaipur Airport, hotels near Jaipur Airport, accommodation near Jaipur Airport',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-front-pic-4.avif',
  },
  {
    path: '/blog/hotels-near-chokhi-dhani-jaipur',
    title: 'Hotels Near Chokhi Dhani Jaipur | Best Places to Stay for Ethnic Village Experience',
    description: 'Planning to visit Chokhi Dhani? Hotel Rama Hindustani is just 8 km from Chokhi Dhani Jaipur. Enjoy the ethnic Rajasthani village experience and return to a clean, comfortable budget room.',
    keywords: 'hotels near Chokhi Dhani Jaipur, accommodation near Chokhi Dhani, budget hotel near Chokhi Dhani',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-and-rama-rasoi-front-2.avif',
  },
  {
    path: '/blog/jaipur-travel-guide-first-time-visitors',
    title: 'Jaipur Travel Guide for First-Time Visitors (2026) | Hotel Rama Hindustani',
    description: 'Complete Jaipur travel guide for first-time visitors by Hotel Rama Hindustani. Best time to visit, top attractions like Amber Fort and Hawa Mahal, where to stay, local food, and budget tips.',
    keywords: 'Jaipur travel guide, first time in Jaipur, Jaipur tourist guide, things to do in Jaipur',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-front-pic-4.avif',
  },
  {
    path: '/blog/places-to-visit-near-pratap-nagar-jaipur',
    title: 'Places to Visit Near Pratap Nagar Jaipur | Top Attractions Guide',
    description: 'Discover the best places to visit near Pratap Nagar Jaipur. From JECC and World Trade Park to Chokhi Dhani and Jawahar Circle, explore attractions within 10 km.',
    keywords: 'places to visit near Pratap Nagar Jaipur, Pratap Nagar attractions, things to do near Pratap Nagar',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-front-3.avif',
  },
  {
    path: '/blog/hotels-near-sitapura-industrial-area-jaipur',
    title: 'Hotels Near Sitapura Industrial Area, Jaipur | Budget Business Stay',
    description: 'Looking for a hotel near Sitapura Industrial Area Jaipur? Hotel Rama Hindustani is just 3 km from RIICO Sitapura with AC rooms from ₹1,155. Free WiFi, parking, and ideal for business travelers.',
    keywords: 'hotels near Sitapura Industrial Area, hotel near RIICO Sitapura, budget hotel near Sitapura Jaipur',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-reception-pic-14.jpg',
  },
  {
    path: '/blog/why-book-direct-with-hotel-rama-hindustani',
    title: 'Why Book Direct With Hotel Rama Hindustani | Best Rates Guaranteed',
    description: 'Discover the benefits of booking direct with Hotel Rama Hindustani in Pratap Nagar Jaipur. Best price guarantee, instant WhatsApp support, flexible cancellation, and exclusive direct booking offers.',
    keywords: 'book direct hotel, direct booking benefits, hotel direct booking Jaipur, best price guarantee hotel',
    ogImage: '/hotel-ramahindustani-image/hotel-rama-hindustani-reception-area-1.jpg',
  },
]

const allRoutes = [...routes, ...blogRoutes]

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  '@id': `${SITE_URL}/#hotel`,
  name: 'Hotel Rama Hindustani',
  alternateName: 'Hotel Rama Hindustani Jaipur',
  description: 'Budget family hotel in Pratap Nagar Jaipur near Airport, JECC, and Sanganer Railway Station.',
  url: SITE_URL,
  telephone: '+916376707091',
  email: 'hotelramahindustani@gmail.com',
  image: `${SITE_URL}/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-front-pic-4.avif`,
  logo: `${SITE_URL}/hotel-ramahindustani-image/rama-hindustanilogo.avif`,
  priceRange: '₹₹',
  currencyAccepted: 'INR',
  paymentAccepted: 'Cash, Credit Card, Debit Card, UPI',
  sameAs: [
    'https://www.instagram.com/rama_hindustani_jaipur_comfy',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '34-B1-B2, Haldighati Marg, Tonk Rd',
    addressLocality: 'Pratap Nagar',
    addressRegion: 'Rajasthan',
    addressCountry: 'IN',
    postalCode: '302033',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 26.8004,
    longitude: 75.7890,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.6',
    bestRating: '5',
    ratingCount: '4',
    reviewCount: '4',
  },
  checkinTime: '12:00',
  checkoutTime: '10:00',
  stars: { '@type': 'Rating', ratingValue: '3' },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Hotel Rama Hindustani',
  url: SITE_URL,
  description: 'Budget family hotel in Pratap Nagar Jaipur near Airport, JECC, and Sanganer Railway Station.',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Hotel Rama Hindustani',
  url: SITE_URL,
  logo: `${SITE_URL}/hotel-ramahindustani-image/rama-hindustanilogo.avif`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+916376707091',
    contactType: 'reservations',
    availableLanguage: ['English', 'Hindi'],
  },
}

function getBreadcrumbSchema(routePath) {
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }]
  const segments = routePath.split('/').filter(Boolean)
  let currentPath = ''
  segments.forEach((seg, i) => {
    currentPath += `/${seg}`
    const name = seg === 'blog' ? 'Blog'
      : seg === 'rooms' ? 'Rooms'
      : seg === 'tours' ? 'Nearby Tourist Places'
      : seg === 'book-now' ? 'Book Now'
      : seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    items.push({ '@type': 'ListItem', position: i + 2, name, item: `${SITE_URL}${currentPath}` })
  })
  return { '@context': 'schema.org', '@type': 'BreadcrumbList', itemListElement: items }
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function getPageContent(route) {
  switch (route.schema) {
    case 'home':
      return [
        '<h1>Hotel Rama Hindustani — Budget Hotel in Pratap Nagar, Jaipur</h1>',
        `<p>${esc(contactDetails.shortDescription)}</p>`,
        '<h2>Why Choose Hotel Rama Hindustani?</h2>',
        '<ul>',
        ...homepageHighlights.map(h => `<li>${esc(h)}</li>`),
        '</ul>',
        '<h2>Our Rooms</h2>',
        ...rooms.map(r => [
          `<h3>${esc(r.name)} — ₹${esc(r.price)}/night</h3>`,
          `<p>${esc(r.description)}</p>`,
          `<p><strong>Features:</strong> ${r.features.join(', ')}</p>`,
          `<p><strong>Capacity:</strong> ${r.minimumOccupancy}–${r.maximumOccupancy} guests</p>`,
        ]).flat(),
        '<h2>Services & Amenities</h2>',
        '<ul>',
        ...services.map(s => `<li><strong>${esc(s.name)}</strong>: ${esc(s.description)}</li>`),
        '</ul>',
        '<h2>What Our Guests Say</h2>',
        ...testimonials.map(t => [
          `<p>"${esc(t.text)}" — ${esc(t.name)} (${esc(t.location)}) ⭐${t.rating}/5</p>`,
        ]).flat(),
        '<h2>Contact Us</h2>',
        `<p><strong>Address:</strong> ${esc(contactDetails.address)}</p>`,
        `<p><strong>Phone:</strong> ${esc(contactDetails.phone)}</p>`,
        `<p><strong>Email:</strong> ${esc(contactDetails.email)}</p>`,
      ].join('\n        ')

    case 'rooms':
      return [
        '<h1>Hotel Rooms in Pratap Nagar Jaipur — Budget AC Rooms</h1>',
        `<p>${esc(route.description)}</p>`,
        ...rooms.map(r => [
          `<h2>${esc(r.name)} — ₹${esc(r.price)}/night</h2>`,
          `<p>${esc(r.description)}</p>`,
          `<p><strong>Features:</strong> ${r.features.join(', ')}</p>`,
          `<p><strong>Capacity:</strong> ${r.minimumOccupancy}–${r.maximumOccupancy} guests</p>`,
        ]).flat(),
      ].join('\n        ')

    case 'room-detail': {
      const room = rooms.find(r => r.slug === route.roomSlug)
      if (!room) return `<p>${esc(route.description)}</p>`
      return [
        `<h1>${esc(room.name)} — ₹${esc(room.price)}/night</h1>`,
        `<p>${esc(room.description)}</p>`,
        '<h2>Room Features</h2>',
        '<ul>',
        ...room.features.map(f => `<li>${esc(f)}</li>`),
        '</ul>',
        `<p><strong>Capacity:</strong> ${room.minimumOccupancy}–${room.maximumOccupancy} guests</p>`,
        `<p><strong>Price: ₹${esc(room.price)} per night</strong></p>`,
        '<h2>Book This Room</h2>',
        `<p>Contact us at ${esc(contactDetails.phone)} or WhatsApp ${esc(contactDetails.whatsApp)} to book the ${esc(room.name)}. Located at ${esc(contactDetails.address)}.</p>`,
      ].join('\n        ')
    }

    case 'restaurant':
      return [
        '<h1>Rama Rasoi — Pure Vegetarian Restaurant in Pratap Nagar Jaipur</h1>',
        `<p>${esc(route.description)}</p>`,
        '<p>Rama Rasoi, the on-site restaurant at Hotel Rama Hindustani, serves authentic Indian cuisine for breakfast, lunch, and dinner. Our menu features traditional Indian thali, North Indian delicacies, and homely meals prepared with fresh ingredients. The restaurant is open to both hotel guests and outside visitors. Located near JECC and Jaipur Airport, it is a popular dining destination in Pratap Nagar.</p>',
        `<p><strong>Address:</strong> ${esc(contactDetails.address)}</p>`,
        `<p><strong>Phone:</strong> ${esc(contactDetails.phone)}</p>`,
      ].join('\n        ')

    case 'services':
      return [
        '<h1>Hotel Services & Amenities in Pratap Nagar Jaipur</h1>',
        `<p>${esc(route.description)}</p>`,
        ...services.map(s => [
          `<h2>${esc(s.name)}</h2>`,
          `<p>${esc(s.description)}</p>`,
        ]).flat(),
      ].join('\n        ')

    case 'gallery':
      return [
        '<h1>Hotel Rama Hindustani Photo Gallery</h1>',
        `<p>${esc(route.description)}</p>`,
        '<p>Browse our photo gallery showcasing rooms — Economy Double Room, Standard Double Room, Deluxe Room, and Superior Double Room — along with our restaurant Rama Rasoi, reception area, rooftop event venue, gym, fun zone, and exterior views. All rooms feature modern amenities including AC, WiFi, flat-screen TV, and attached bathrooms.</p>',
      ].join('\n        ')

    case 'about':
      return [
        '<h1>About Hotel Rama Hindustani — Budget Family Hotel in Pratap Nagar Jaipur</h1>',
        `<p>${esc(route.description)}</p>`,
        ...storyBlocks.map(s => [
          `<h2>${esc(s.title)}</h2>`,
          `<p>${esc(s.text)}</p>`,
        ]).flat(),
        `<p><strong>Manager:</strong> ${esc(contactDetails.manager)}</p>`,
        `<p><strong>Address:</strong> ${esc(contactDetails.address)}</p>`,
      ].join('\n        ')

    case 'contact':
      return [
        '<h1>Contact Hotel Rama Hindustani — Phone, WhatsApp & Address</h1>',
        `<p>${esc(route.description)}</p>`,
        '<h2>Contact Information</h2>',
        `<p><strong>Address:</strong> ${esc(contactDetails.address)}</p>`,
        `<p><strong>Phone:</strong> ${esc(contactDetails.phone)}</p>`,
        `<p><strong>WhatsApp:</strong> ${esc(contactDetails.whatsApp)}</p>`,
        `<p><strong>Email:</strong> ${esc(contactDetails.email)}</p>`,
        `<p><strong>Manager:</strong> ${esc(contactDetails.manager)}</p>`,
        '<h2>Location</h2>',
        '<p>Located in Pratap Nagar, Jaipur, near Sanganer Railway Station (3 km), Jaipur International Airport (5 km), and JECC Convention Centre (4 km). Easily accessible via Tonk Road.</p>',
      ].join('\n        ')

    case 'tours':
      return [
        '<h1>Tourist Places Near Hotel Rama Hindustani</h1>',
        `<p>${esc(route.description)}</p>`,
        '<h2>Nearby Landmarks & Attractions</h2>',
        '<ul>',
        ...nearbyLandmarks.map(l => `<li><strong>${esc(l.name)}</strong> — ${esc(l.distance)} (${esc(l.driveTime)} drive)</li>`),
        '</ul>',
        '<h2>Major Attractions in Jaipur</h2>',
        '<ul>',
        '<li><strong>Amber Fort (Amer Fort)</strong> — 13 km, magnificent hilltop fort with light and sound show</li>',
        '<li><strong>Hawa Mahal (Palace of Winds)</strong> — 12 km, iconic five-story facade with 953 windows</li>',
        '<li><strong>City Palace</strong> — 12 km, former royal residence now a museum</li>',
        '<li><strong>Jantar Mantar</strong> — 12 km, UNESCO astronomical observatory</li>',
        '<li><strong>Jal Mahal</strong> — 13 km, palace floating on Man Sagar Lake</li>',
        '<li><strong>Chokhi Dhani</strong> — 8 km, ethnic village resort with Rajasthani culture</li>',
        '</ul>',
      ].join('\n        ')

    case 'bookNow':
      return [
        '<h1>Book Hotel in Pratap Nagar Jaipur — Direct Booking Best Price</h1>',
        `<p>${esc(route.description)}</p>`,
        '<h2>Our Room Options & Prices</h2>',
        '<ul>',
        ...rooms.map(r => `<li><strong>${esc(r.name)}</strong> — ₹${esc(r.price)}/night. Features: ${r.features.join(', ')}. Sleeps ${r.minimumOccupancy}–${r.maximumOccupancy} guests.</li>`),
        '</ul>',
        '<h2>How to Book</h2>',
        `<p><strong>Call:</strong> ${esc(contactDetails.phone)}</p>`,
        `<p><strong>WhatsApp:</strong> ${esc(contactDetails.whatsApp)} (instant confirmation)</p>`,
        `<p><strong>Email:</strong> ${esc(contactDetails.email)}</p>`,
        '<p>Book directly through our website for the best available rates. Direct bookings get priority for early check-in and late check-out subject to availability.</p>',
        `<p><strong>Address:</strong> ${esc(contactDetails.address)}</p>`,
      ].join('\n        ')

    case 'blog':
      return [
        '<h1>Hotel Rama Hindustani Blog — Jaipur Travel Guide & Hotel Tips</h1>',
        `<p>${esc(route.description)}</p>`,
        '<h2>Latest Blog Posts</h2>',
        ...blogPosts.map(p => [
          `<h3>${esc(p.title)}</h3>`,
          `<p>${esc(p.excerpt)}</p>`,
          `<p><em>Category: ${esc(p.category)} | Read time: ${esc(p.readTime)} | Published: ${esc(p.date)}</em></p>`,
        ]).flat(),
      ].join('\n        ')

    default:
      if (route.path.startsWith('/blog/') && route.path !== '/blog') {
        const slug = route.path.replace('/blog/', '')
        const post = blogPosts.find(p => p.slug === slug)
        if (!post) return `<p>${esc(route.description)}</p>`

        const sectionsHtml = post.sections.map(s => {
          switch (s.type) {
            case 'heading': return `<${s.level}>${esc(s.content)}</${s.level}>`
            case 'paragraph': return `<p>${esc(s.content)}</p>`
            case 'list': return `<ul>${s.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`
            case 'cta': return `<p>${esc(s.content)} <a href="${esc(s.link)}">${esc(s.linkText)}</a></p>`
            default: return ''
          }
        }).join('\n          ')

        const faqsHtml = post.faqs
          ? '<h2>Frequently Asked Questions</h2>\n          ' +
            post.faqs.map(f =>
              `<div>\n            <h3>${esc(f.question)}</h3>\n            <p>${esc(f.answer)}</p>\n          </div>`
            ).join('\n          ')
          : ''

        return [
          `<h1>${esc(post.title)}</h1>`,
          `<p><strong>Published:</strong> ${esc(post.date)}${post.updatedDate ? ` | <strong>Updated:</strong> ${esc(post.updatedDate)}` : ''} | <strong>Read time:</strong> ${esc(post.readTime)}</p>`,
          `<p>${esc(post.excerpt)}</p>`,
          sectionsHtml,
          faqsHtml,
        ].join('\n          ')
      }
      return [
        `<h1>${esc(route.title)}</h1>`,
        `<p>${esc(route.description)}</p>`,
      ].join('\n        ')
  }
}

function buildHtml(route, template) {
  const url = `${SITE_URL}${route.path}`
  const breadcrumb = getBreadcrumbSchema(route.path)

  const schemas = [homeSchema, websiteSchema, organizationSchema, breadcrumb]
  const schemaScripts = schemas.map(s =>
    `<script type="application/ld+json">${JSON.stringify(s)}</script>`
  ).join('\n    ')

  const blogPostSchema = route.title.includes('|') && route.path.startsWith('/blog/') && route.path !== '/blog'
    ? `\n    <script type="application/ld+json">${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: route.title.split('|')[0].trim(),
        description: route.description,
        url,
        datePublished: '2026-01-15',
        dateModified: '2026-07-15',
        author: { '@type': 'Organization', name: 'Hotel Rama Hindustani' },
        publisher: { '@type': 'Organization', name: 'Hotel Rama Hindustani', logo: { '@type': 'ImageObject', url: `${SITE_URL}/hotel-ramahindustani-image/rama-hindustanilogo.avif` } },
        image: `${SITE_URL}${route.ogImage}`,
      })}</script>`
    : ''

  let html = template
    .replace(
      /<title[^>]*>.*?<\/title>/,
      `<title>${route.title}</title>`
    )
    .replace(
      /<meta[^>]*name="description"[^>]*>/,
      `<meta name="description" content="${route.description}" />`
    )
    .replace(
      '<meta property="og:locale" content="en_IN" />',
      `<meta property="og:title" content="${route.title}" />\n    <meta property="og:description" content="${route.description}" />\n    <meta property="og:url" content="${url}" />\n    <meta property="og:image" content="${SITE_URL}${route.ogImage}" />\n    <meta property="og:locale" content="en_IN" />`
    )
    .replace(
      '<meta name="twitter:site" content="@HotelRamaHindustani" />',
      `<meta name="twitter:site" content="@HotelRamaHindustani" />\n    <meta name="twitter:title" content="${route.title}" />\n    <meta name="twitter:description" content="${route.description}" />\n    <meta name="twitter:image" content="${SITE_URL}${route.ogImage}" />`
    )

  // Replace canonical in <head> — find existing or insert before </head>
  const canonicalTag = `<link rel="canonical" href="${url}" />`
  if (/<link[^>]*rel="canonical"[^>]*>/.test(html)) {
    html = html.replace(/<link[^>]*rel="canonical"[^>]*>/, canonicalTag)
  } else {
    html = html.replace('</head>', `    ${canonicalTag}\n  </head>`)
  }

  // Insert schema scripts + page-specific content before </body>
  const pageContent = getPageContent(route)
  const noscriptBlock = pageContent
    ? `<noscript>\n      <div style="padding:40px;font-family:system-ui,sans-serif;max-width:900px;margin:0 auto;line-height:1.8;color:#333">\n        ${pageContent}\n        <hr />\n        <p><strong>Hotel Rama Hindustani</strong><br />${esc(contactDetails.address)}<br />Phone: ${esc(contactDetails.phone)} | WhatsApp: ${esc(contactDetails.whatsApp)}<br />Email: ${esc(contactDetails.email)}</p>\n      </div>\n    </noscript>`
    : ''
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"></div>\n    ${schemaScripts}${blogPostSchema}\n    ${noscriptBlock}`
  )

  const dir = resolve(DIST, route.path === '/' ? '' : route.path.replace(/^\//, ''))
  mkdirSync(dir, { recursive: true })
  const filePath = resolve(dir, 'index.html')
  writeFileSync(filePath, html)
  console.log(`  ✓ ${route.path}`)
}

console.log('Prerendering routes...')
const originalTemplate = readFileSync(resolve(DIST, 'index.html'), 'utf-8')
allRoutes.forEach(route => buildHtml(route, originalTemplate))
console.log(`\nDone! ${allRoutes.length} routes prerendered with SEO meta tags and rich static content.`) //
