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

  "altroom": "/altroom.avif",

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
    "https://bookonelocal.in/cdn/Taksonz+website+video+2.mp4",
  ],
};
