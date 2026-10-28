/**
 * Property information — the single source of truth for contact details.
 * Values marked PLACEHOLDER came from the design mockups and should be confirmed by the hotel.
 */
export const site = {
  name: "Hotel The Taksonz",
  shortName: "The Taksonz",
  tagline: "A better way to stay.",
  logo: "/logo.png",
  /** PLACEHOLDER — set to the live domain before deploying (used for canonical URLs and the sitemap). */
  url: "https://hoteltaksonz.com/",
  /** Official BookOne booking engine URL */
  bookingUrl: "https://bookone.io/Hotel-The-Taksonz?bookingEngine=true",
  /** Set to true only after the hotel has confirmed every detail in /data. Enables Hotel + FAQ structured data. */
  verified: false,
  timezone: "Asia/Kolkata",
  phone: "+91 98726 00607",
  phoneHref: "tel:+919872600607",
  whatsapp: "+91 98726 00607",
  whatsappHref: "https://wa.me/919872600607",
  email: "hptakkar1@gmail.com",
  address: {
    street: "Grand Trunk Road",
    city: "Ludhiana",
    region: "Punjab",
    postalCode: "141008",
    country: "IN",
  },
  /** Add approved social profile links, e.g. { label: "Instagram", href: "https://instagram.com/…" }. */
  social: [] as { label: string; href: string }[],
  /** GPS coordinates from TheHotelMate API */
  lat: "30.9141935",
  lng: "75.8494775",
  mapQuery: "Hotel The Taksonz, Grand Trunk Road, Ludhiana, Punjab 141008",
} as const;

export const addressLine = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

export const mapEmbedUrl = `https://www.google.com/maps?q=${site.lat},${site.lng}&output=embed`;
export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${site.lat},${site.lng}`;

export const RATE_NOTE = "Indicative rate per night. Final rate, taxes and availability are confirmed by the hotel.";

/**
 * Builds a BookOne booking engine URL with date + guest parameters.
 * Falls back to today/tomorrow with 2 adults when no args are supplied.
 */
export function buildBookingUrl(opts?: {
  checkIn?: string;   // YYYY-MM-DD
  checkOut?: string;  // YYYY-MM-DD
  adults?: number;
  children?: number;
}): string {
  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
  const nowIST = new Date(Date.now() + IST_OFFSET_MS);
  const todayIST = nowIST.toISOString().slice(0, 10);
  const tomorrowIST = new Date(nowIST.getTime() + 86400000).toISOString().slice(0, 10);

  const checkIn  = opts?.checkIn  || todayIST;
  const checkOut = opts?.checkOut || tomorrowIST;
  const adults   = opts?.adults   ?? 2;
  const children = opts?.children ?? 0;

  const [ciYear, ciMonth, ciDay] = checkIn.split("-").map(Number);
  const [coYear, coMonth, coDay] = checkOut.split("-").map(Number);
  const nights = Math.max(1, Math.round(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
  ));

  const p = new URLSearchParams({
    bookingEngine: "true",
    checkinDay:    String(ciDay),
    checkinMonth:  String(ciMonth),
    checkinYear:   String(ciYear),
    checkoutDay:   String(coDay),
    checkoutMonth: String(coMonth),
    checkoutYear:  String(coYear),
    checkIn,
    checkOut,
    toDate:    checkOut,
    date_to:   checkOut,
    nights:    String(nights),
    numAdults: String(adults),
    Children:  String(children),
    numGuests: String(adults + children),
    rooms:     "1",
  });

  return `https://bookone.io/Hotel-The-Taksonz?${p.toString()}`;
}
