import { siteImages } from "@/lib/site-images";

export type PropertySource = {
  slug: string;
  propertyId: number;        // HotelMate property ID
  restaurantId?: number;     // BookOne restaurant service ID
  bookOnePropertyId?: number; // BookOne main property ID (for room orders, POS)
  slotsWebsiteId?: number;
  fallbackImage: string;
  bookingPath: string;
};

export const propertySources: PropertySource[] = [
  { slug: "shalom-maple-leaf",    propertyId: 3268, restaurantId: 2334, bookOnePropertyId: 2248, slotsWebsiteId: 1302, fallbackImage: siteImages.maple1,      bookingPath: "Shalom-Maple-Leaf" },
  { slug: "cherry-blossom",       propertyId: 3269, restaurantId: 2337, bookOnePropertyId: 2249, slotsWebsiteId: 1306, fallbackImage: siteImages.cherry1,     bookingPath: "Cherry-Blossom" },
  { slug: "pool-and-pause",       propertyId: 3270, restaurantId: 2332, bookOnePropertyId: 2250, slotsWebsiteId: 1372, fallbackImage: siteImages.poolpause1,  bookingPath: "Pool-And-Pause" },
  { slug: "shirke-holiday-home",  propertyId: 2533, restaurantId: 2150, bookOnePropertyId: 1513, slotsWebsiteId: 1166, fallbackImage: siteImages.shrike1,     bookingPath: "Shirke-Holiday-Home" },
  { slug: "green-didi-s-cottage", propertyId: 2514, restaurantId: 2148, bookOnePropertyId: 2115, slotsWebsiteId: 1371, fallbackImage: siteImages.green1,      bookingPath: "Green-Didi-S-Cottage" },
];

export const propertySourceBySlug = Object.fromEntries(
  propertySources.map((source) => [source.slug, source]),
) as Record<string, PropertySource>;
