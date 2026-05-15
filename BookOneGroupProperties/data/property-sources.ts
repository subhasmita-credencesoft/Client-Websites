import { siteImages } from "@/lib/site-images";

export type PropertySource = {
  slug: string;
  propertyId: number;
  restaurantId?: number;
  slotsWebsiteId?: number;
  fallbackImage: string;
  bookingPath: string;
};

export const propertySources: PropertySource[] = [
  { slug: "shalom-maple-leaf", propertyId: 3268, restaurantId: 2334, slotsWebsiteId: 1302, fallbackImage: siteImages.luxuryVillaSunset, bookingPath: "Shalom-Maple-Leaf" },
  { slug: "cherry-blossom", propertyId: 3269, restaurantId: 2337, slotsWebsiteId: 1306, fallbackImage: siteImages.santoriniVilla, bookingPath: "Cherry-Blossom" },
  { slug: "pool-and-pause", propertyId: 3270, restaurantId: 2332, slotsWebsiteId: 1372, fallbackImage: siteImages.resortPool, bookingPath: "Pool-And-Pause" },
  { slug: "shirke-holiday-home", propertyId: 2533, restaurantId: 2150, slotsWebsiteId: 1166, fallbackImage: siteImages.modernTropicalVilla, bookingPath: "Shirke-Holiday-Home" },
  { slug: "green-didi-s-cottage", propertyId: 2514, restaurantId: 2148, slotsWebsiteId: 1371, fallbackImage: siteImages.mountainChalet, bookingPath: "Green-Didi-S-Cottage" },
];

export const propertySourceBySlug = Object.fromEntries(
  propertySources.map((source) => [source.slug, source]),
) as Record<string, PropertySource>;
