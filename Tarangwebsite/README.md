# 🌴 Tarangan Resort - Nagaon-Alibag
### Official Premium Resort Website | Next.js (App Router) + TypeScript + SCSS Modules

A production-ready, multi-page hospitality website for **The Tarangan Resort** located on Sahan Bypass Road, Palhe, Nagaon, Alibaug, Maharashtra (402204).

---

## 🌟 Property Highlights & Verified Details

- **Property Name:** Tarangan Resort (The Tarangan Resort, Nagaon-Alibaug)
- **Category:** 3-Star Resort Hotel
- **Rating:** 4.7 / 5.0 (161+ Verified Google Reviews)
- **Direct Desk Contact:** `077568 38900` / `+91 77568 38900`
- **Official Address:** Sahan Bypass Road, 188 Palhe Post Nagaon, Alibag, Raigad, Maharashtra 402204
- **Accommodations:** 12 Air-Conditioned Deluxe Rooms & Standalone Cottages with King Beds and Pool Views
- **On-Site Facilities:** Crystal-clear outdoor swimming pool, dedicated children's splash pool, in-house Maharashtrian restaurant serving authentic coastal seafood (Surmai, Pomfret, Prawns, Solkadhi), coconut & betel nut orchard lawns, evening bonfire pit, 100% silent generator power backup, free parking, and pet-friendly policy.
- **Location Proximity:** 4.1 km from water sports hub Nagaon Beach, 5 km from Akshi Beach, 8.7 km from Alibaug city center & Kolaba Fort, and 38 km from Mandwa Ro-Ro Ferry Wharf.

---

## 🚀 Key Features & Architecture

### 1. Multi-Page Architecture (Next.js 14 App Router)
- **Home (`/`)**: Cinematic multi-slide hero with atmospheric mist, floating check-in/out search bar, featured cottages grid with wishlist toggles, resort story, on-site facilities, coastal seafood spotlight, nearby attractions, verified Google reviews, location matrix, and quick reservation banner.
- **About Us (`/about`)**: Story of Tarangan, Konkani roots, resort philosophy, 12 AC cottages, and on-site host care.
- **Rooms & Cottages (`/rooms`)**: Complete inventory with categories (Cottage, Deluxe, Family), amenities badges, and pricing.
- **Dynamic Room Details (`/rooms/[slug]`)**: Interactive photo gallery switcher, live price calculator, amenity icons, check-in policies, instant WhatsApp reservation button, and similar room recommendations.
- **Facilities (`/facilities`)**: Deep dive into swimming pool, kids pool, restaurant, lawns, bonfires, pet amenities, and power backup.
- **Dining (`/dining`)**: Dedicated culinary showcase of authentic Maharashtrian Konkani seafood (Surmai Rava Fry, Whole Pomfret Masala, Kolambi curry, Kombdi Vade, Solkadhi) and vegetarian thalis.
- **Experiences (`/experiences`)**: Nagaon Beach water sports (parasailing, jet ski, banana boat), Akshi beach, and Kolaba Fort sea citadel.
- **Events & Celebrations (`/events`)**: Pool parties, birthday lawn celebrations, family reunions, and corporate offsites.
- **Gallery (`/gallery`)**: Categorized photo gallery with interactive full-screen lightbox modal and smooth keyboard/click navigation.
- **Reviews (`/reviews`)**: 4.7★ Google score breakdown, verified guest testimonials (Sakshi Londhe, Girish Dalvi, Rohit Kulkarni), and interactive review submission dialog.
- **Location (`/location`)**: Comprehensive guide on reaching the resort via Mandwa Ro-Ro car ferry, Mumbai-Goa highway, and Pune expressway, along with embedded interactive Google Maps.
- **Booking Engine (`/booking`)**: Multi-step booking flow with date calculation, room choice, extra guests, optional add-ons (seafood thalis, bonfire setup, early check-in, pet package), live GST calculation, instant downloadable booking voucher, and WhatsApp booking trigger.
- **Contact (`/contact`)**: Interactive inquiry form, direct WhatsApp chat, telephone, and location details.
- **FAQ (`/faq`)**: Searchable accordion answering common questions about check-in, pool rules, pets, and beach distances.
- **Legal (`/privacy-policy`, `/terms-and-conditions`)**: Complete terms of stay, police verification ID requirements, cancellation policy, and privacy notice.

### 2. Design System & Tech Stack
- **Framework:** Next.js 14.2 (App Router with SSG)
- **Language:** TypeScript 5.6 (strict mode)
- **Styling:** SCSS Modules (`.module.scss`) with variables, mixins, glassmorphism, responsive breakpoints, and keyframe animations
- **Icons:** `lucide-react`
- **Effects & UI:** `canvas-confetti`, custom interactive dot cursor, floating WhatsApp concierge bubble
- **SEO & Performance:** Full JSON-LD Resort Schema markup, OpenGraph cards, Twitter cards, auto-generated `sitemap.xml`, and `robots.txt`.

---

## 🛠️ Local Development & Build

```bash
# 1. Install dependencies
pnpm install

# 2. Run local development server
pnpm run dev
# Open http://localhost:3000

# 3. Create production build
pnpm run build

# 4. Start production server
pnpm run start
```

---

## 🌐 Hostinger Deployment Guide

Hostinger supports Next.js applications through two easy deployment methods:

### Option A: Hostinger Node.js / VPS Hosting (Recommended for full SSR)
1. In your **Hostinger hPanel**, navigate to **VPS** or **Advanced > Node.js Application**.
2. Select **Node.js 20.x** as the runtime.
3. Upload this project folder (excluding `node_modules` and `.next`).
4. Set the **Application startup file** to `node_modules/next/dist/bin/next` with argument `start` (or run `npm start`).
5. Run `npm install --production` and `npm run build`.
6. Bind to port `3000` and restart the application.

### Option B: Hostinger Shared / Web Hosting (Static HTML Export)
If using standard Hostinger Web Hosting without Node.js:
1. In `next.config.mjs`, add `output: 'export'`:
   ```javascript
   const nextConfig = {
     output: 'export',
     images: { unoptimized: true },
     // ...
   };
   ```
2. Run `pnpm run build`.
3. A folder named `out` will be generated containing static HTML, CSS, JS, and images.
4. Upload the contents of the `out` folder directly into your Hostinger `public_html` directory using File Manager or FTP.

---

## 📞 Support & Contacts
- **Tarangan Resort Reception:** `077568 38900`
- **WhatsApp Support:** `+91 77568 38900`
- **Address:** Sahan Bypass Road, Palhe, Nagaon, Alibag, Maharashtra 402204
