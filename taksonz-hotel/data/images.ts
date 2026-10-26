/**
 * ALL site imagery lives here. Every image is an Unsplash stock photo, referenced by photo id.
 * To use a real hotel photograph instead, change the value of any key to a local path
 * (e.g. "/images/lobby.jpg" with the file placed in /public/images) or another https URL.
 *
 * Photos are free to use under the Unsplash License (https://unsplash.com/license).
 * They are stock images, NOT photographs of Hotel The Taksonz.
 */
const U = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const images = {
  // Heroes
  "hero-home": U("1621293954908-907159247fc8"),
  "hero-rooms": U("1645619200527-c6786729c2da"),
  "hero-dining": U("1765360773028-6affda725695"),
  "hero-banquets": U("1712314947761-a8d718bd8c32"),
  "hero-meetings": U("1505373877841-8d25f7d46678"),
  "hero-about": U("1573052905904-34ad8c27f0cc"),
  "hero-gallery": U("1590381105924-c72589b9ef3f"),
  "hero-location": U("1682270058555-5bd543e1dd7c"),
  "hero-offers": U("1596436889106-be35e843f974"),

  // Deluxe Room
  "room-deluxe-1": U("1618773928121-c32242e63f39"),
  "room-deluxe-2": U("1590381105924-c72589b9ef3f"),
  "room-deluxe-3": U("1631049552057-403cdb8f0658"),
  "room-deluxe-4": U("1605346434674-a440ca4dc4c0"),
  // Premium Room
  "room-premium-1": U("1611892440504-42a792e24d32"),
  "room-premium-2": U("1505693416388-ac5ce068fe85"),
  "room-premium-3": U("1629140727571-9b5c6f6267b4"),
  "room-premium-4": U("1568495248636-6432b97bd949"),
  // Executive Suite
  "room-executive-1": U("1776763018821-8feeaeeee0a5"),
  "room-executive-2": U("1578898886225-c7c894047899"),
  "room-executive-3": U("1759328257280-28bdb3050be3"),
  "room-executive-4": U("1562438668-bcf0ca6578f0"),
  // Family Suite
  "room-family-1": U("1741506131058-533fcf894483"),
  "room-family-2": U("1770232274485-b35ee5092cbe"),
  "room-family-3": U("1587985064135-0366536eab42"),
  "room-family-4": U("1576354302919-96748cb8299e"),

  // Dining
  "dining-restaurant": U("1538333581680-29dd4752ddf2"),
  "dining-bar": U("1758247706694-7830caadea8d"),
  "dining-room": U("1613274554329-70f997f5789f"),
  "dish-thali": U("1742281257687-092746ad6021"),
  "dish-platter": U("1565556250026-9ba22083e3e0"),
  "dish-cocktail": U("1470337458703-46ad1756a187"),

  // Events
  "banquet-grand": U("1783314867628-220ab03cac99"),
  "banquet-royal": U("1763429338698-439aa108e7fb"),
  "banquet-board": U("1431540015161-0bf868a2d407"),

  // Property & city
  "about-lobby": U("1660557989695-14fac79c086d"),
  "about-exterior": U("1783125386012-71bcce092fa9"),
  "property-exterior": U("1762599107107-14b8f4608011"),
  "city-landmark": U("1682270058555-5bd543e1dd7c"),
  "offers-banner": U("1596436889106-be35e843f974"),
} as const;

export type ImageKey = keyof typeof images;

/** Resolve an image key to its URL. */
export const img = (key: ImageKey): string => images[key];

/**
 * Home-page hero background video.
 * Unsplash does not offer free video, so this uses a free Mixkit clip (Mixkit License — free for commercial use,
 * no attribution required): "Luxury hotel room panning shot" https://mixkit.co/free-stock-video/hotel-room/
 * The browser tries each source in order; if none load, the Unsplash poster image stays in place.
 * To use your own footage: put an .mp4 in public/videos/ and list it first, e.g. "/videos/hero.mp4".
 */
export const heroVideo = {
  poster: images["hero-home"],
  sources: [
    "https://assets.mixkit.co/videos/4196/4196-720.mp4",
    "https://assets.mixkit.co/videos/4196/4196-360.mp4",
  ],
} as const;
