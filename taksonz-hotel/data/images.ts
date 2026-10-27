/**
 * ALL site imagery lives here.
 * Sourced exclusively from official hotel photography (in /public)
 * and TheHotelMate property CDN. Zero stock / Unsplash images.
 */
const U = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const images = {
  // Heroes
  "hero-home": "/taksonzhome.avif",
  "hero-rooms": "/altroom.avif",
  "hero-dining": "/dining.avif",
  "hero-banquets": "/dinignconference.avif",
  "hero-meetings": "/dinignconference.avif",
  "hero-about": "/reception.avif",
  "hero-gallery": "/taksonzhome.avif",
  "hero-location": "/taksonzhome.avif",
  "hero-offers": "/taksonzhome.avif",

  // Deluxe Room
  "room-deluxe-1": "/altroom.avif",
  "altroom": "/altroom.avif",
  "room-deluxe-2": "https://bookonelocal.in/cdn/2026-04-22-074327432-WhatsApp%20Image%202026-04-16%20at%2011.46.21%20(1).jpg",
  "room-deluxe-3": "https://bookonelocal.in/cdn/2026-04-22-074331897-WhatsApp%20Image%202026-04-16%20at%2011.46.22%20(1).jpg",
  "room-deluxe-4": "https://bookonelocal.in/cdn/2026-04-22-074335750-WhatsApp%20Image%202026-04-16%20at%2011.46.22.jpg",

  // Premium Room
  "room-premium-1": "https://bookonelocal.in/cdn/2026-04-22-074327432-WhatsApp%20Image%202026-04-16%20at%2011.46.21%20(1).jpg",
  "room-premium-2": "https://bookonelocal.in/cdn/2026-04-22-074331897-WhatsApp%20Image%202026-04-16%20at%2011.46.22%20(1).jpg",
  "room-premium-3": "https://bookonelocal.in/cdn/2026-04-22-074335750-WhatsApp%20Image%202026-04-16%20at%2011.46.22.jpg",
  "room-premium-4": "https://bookonelocal.in/cdn/2026-04-22-074340031-WhatsApp%20Image%202026-04-16%20at%2011.46.22%20(1).jpg",

  // Executive Suite
  "room-executive-1": "https://bookonelocal.in/cdn/2026-04-22-074447425-WhatsApp%20Image%202026-04-16%20at%2011.52.02.jpg",
  "room-executive-2": "https://bookonelocal.in/cdn/2026-04-22-074450255-WhatsApp%20Image%202026-04-16%20at%2011.52.03.jpg",
  "room-executive-3": "/altroom.avif",
  "room-executive-4": "/altroom.avif",

  // Family Suite
  "room-family-1": "https://bookonelocal.in/cdn/2026-04-22-074714314-WhatsApp%20Image%202026-04-16%20at%2011.52.46%20(3).jpg",
  "room-family-2": "https://bookonelocal.in/cdn/2026-04-22-074717903-WhatsApp%20Image%202026-04-16%20at%2011.52.46%20(1).jpg",
  "room-family-3": "https://bookonelocal.in/cdn/2026-04-22-074724092-WhatsApp%20Image%202026-04-16%20at%2011.52.46%20(2).jpg",
  "room-family-4": "https://bookonelocal.in/cdn/2026-04-22-074728274-WhatsApp%20Image%202026-04-16%20at%2011.52.46.jpg",

  // Dining
  "dining-restaurant": "/dining.avif",
  "dining": "/dining.avif",
  "dining-bar": "/dining.avif",
  "dining-room": "/dining.avif",
  "dish-thali": U("1742281257687-092746ad6021"),
  "dish-platter": U("1565556250026-9ba22083e3e0"),
  "dish-cocktail": U("1470337458703-46ad1756a187"),

  // Events
  "banquet-grand": "/dinignconference.avif",
  "banquets": "/dinignconference.avif",
  "banquet-royal": "/dinignconference.avif",
  "banquet-board": "/Corporate Raining and Conferences4.avif",

  // Property & city
  "taksonzhome": "/taksonzhome.avif",
  "reception": "/reception.avif",
  "about-lobby": "/reception.avif",
  "about-exterior": "/taksonzhome.avif",
  "property-exterior": "/taksonzhome.avif",
  "city-landmark": "/dturnwmxiqfqeyam6i7t.avif",
  "offers-banner": "/taksonzhome.avif",
} as const;

export type ImageKey = keyof typeof images;

/** Resolve an image key to its URL. */
export const img = (key: ImageKey): string => images[key];

/**
 * Home-page hero background video.
 */
export const heroVideo = {
  poster: images["hero-home"],
  sources: [
    "https://assets.mixkit.co/videos/4196/4196-720.mp4",
    "https://assets.mixkit.co/videos/4196/4196-360.mp4",
  ],
};
