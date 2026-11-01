# Malhar Baug Resort — Luxury Resort in Alibaug

Production-grade Next.js 14 (App Router) resort and hospitality web application for **Malhar Baug Resort**, located in Nagaon, Alibaug, Maharashtra near Nagaon Beach.

## System Architecture

```
src/
├── app/                        # Next.js 14 App Router (Presentation & Page Routing Layer)
│   ├── layout.tsx              # Root Layout: Fonts, Theme script, Redux Provider, Property Provider, SEO Schema
│   ├── page.tsx                # Homepage assembling modular sections
│   ├── globals.css             # Tailwind base styles, animation tokens, design system utilities
│   ├── loading.tsx             # Global loading skeleton
│   ├── error.tsx               # Production error boundary with reset action
│   ├── not-found.tsx           # 404 page
│   ├── sitemap.ts              # Dynamic XML sitemap generator
│   ├── robots.ts               # Robots.txt configuration
│   ├── manifest.ts             # PWA web manifest
│   ├── about/                  # About Malhar Baug Resort
│   ├── rooms/                  # Accommodations & [slug] dynamic room details
│   ├── amenities/              # Resort facilities & [slug] amenity guides
│   ├── restaurant/             # Konkan dining & authentic culinary menu
│   ├── packages/               # Special holiday, couple & corporate packages
│   ├── events/                 # Celebrations, weddings, corporate & [slug] event pages
│   ├── gallery/                # Category-filtered visual photo gallery
│   ├── nearby/                 # Attractions, beaches, forts & distances
│   ├── travel-guide/           # Deep-dive programmatic SEO travel guides & itineraries
│   ├── blog/                   # Hospitality tips, resort guides & [slug] articles
│   ├── contact/                # Contact information, interactive map & booking lead capture
│   └── (legal)/                # Privacy policy, terms, refund policy, cancellation policy
│
├── config/                     # Configuration & Single Source of Truth Layer
│   ├── site.ts                 # Resort identity, canonical URLs, metadata constants
│   ├── navigation.ts           # Header and footer navigation builders
│   ├── booking.ts              # Booking engine integrations
│   └── index.ts                # Configuration barrel
│
├── services/                   # Service & Data Access Layer (Production Resilience)
│   ├── property.service.ts     # Live HotelMate API client with retry backoff, caching & fallback
│   ├── schema.service.ts       # Schema.org JSON-LD structured data generators
│   ├── fallback-data.ts        # Offline fallback snapshot for guaranteed build uptime
│   └── index.ts                # Services barrel
│
├── components/                 # Component Architecture Layer
│   ├── layout/                 # Site-wide chrome (Header, Footer, Announcement, MobileDrawer, NavDropdown)
│   ├── sections/               # Modular landing page sections (Hero, RoomsGrid, DiningPreview, etc.)
│   ├── providers/              # React Context Providers (PropertyProvider)
│   ├── seo/                    # Schema JSON-LD injector
│   ├── ui/                     # Reusable atomic UI elements (ThemeToggle, WhatsAppFloat, ScrollAnimationObserver)
│   └── index.ts                # Components barrel
│
├── data/                       # Domain datasets & static content
│   ├── amenities.ts            # Resort amenities & facilities
│   ├── blog.ts                 # Blog articles
│   ├── dining.ts               # Dining categories & Konkan specialties
│   ├── events.ts               # Event categories
│   ├── faqs.ts                 # Frequently Asked Questions
│   ├── gallery.ts              # Visual assets categorized by zone
│   ├── nearby.ts               # Attractions & points of interest
│   ├── packages.ts             # Stay packages & itineraries
│   ├── testimonials.ts         # Guest ratings & Google review testimonials
│   ├── travelGuide.ts          # Comprehensive travel guides
│   └── index.ts                # Data barrel
│
├── store/                      # Global Client State Management (Redux Toolkit)
│   ├── store.ts                # Store configuration
│   ├── hooks.ts                # Typed Redux useDispatch & useSelector hooks
│   ├── StoreProvider.tsx       # Client provider wrapper
│   └── slices/
│       ├── themeSlice.ts       # Dark/Light theme state persisted under 'malhar-theme'
│       └── uiSlice.ts          # Navigation drawer & scroll state
│
├── types/                      # Domain & API Type Definitions
│   ├── domain.ts               # Core entity models (Room, Package, FAQ, Testimonial, etc.)
│   ├── api.ts                  # Remote booking API DTOs & ContactInfo interfaces
│   ├── iconify.d.ts            # Iconify web-component typings
│   └── index.ts                # Unified type exports
│
└── lib/                        # Backward-compatibility shims (re-exports from services & config)
    ├── api.ts                  # Re-exports from src/services/property.service
    ├── schema.ts               # Re-exports from src/services/schema.service
    ├── site.ts                 # Re-exports from src/config/site
    └── index.ts
```

## Tech Stack

- **Next.js 14** (App Router, Static Export `output: 'export'`, SSG)
- **TypeScript** (Strict mode)
- **Tailwind CSS** (Class-based dark mode, custom nature tokens: `brand`, `earth`, `ocean`)
- **Redux Toolkit + React Redux** (Global theme and UI drawer state)
- **Schema.org JSON-LD** (`Hotel`, `LocalBusiness`, `FAQPage`, `BreadcrumbList`, `HotelRoom`)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm run start
```
