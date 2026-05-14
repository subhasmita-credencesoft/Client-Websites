import { siteImages } from "@/lib/site-images";

export type PropertySource = {
  slug: string;
  propertyId: number;
  fallbackImage: string;
  bookingPath: string;
};

export const propertySources: PropertySource[] = [
  { slug: "shalom-maple-leaf", propertyId: 3268, fallbackImage: siteImages.luxuryVillaSunset, bookingPath: "Shalom-Maple-Leaf" },
  { slug: "cherry-blossom", propertyId: 3269, fallbackImage: siteImages.santoriniVilla, bookingPath: "Cherry-Blossom" },
  { slug: "pool-and-pause", propertyId: 3270, fallbackImage: siteImages.resortPool, bookingPath: "Pool-And-Pause" },
  { slug: "shirke-holiday-home", propertyId: 2533, fallbackImage: siteImages.modernTropicalVilla, bookingPath: "Shirke-Holiday-Home" },
  { slug: "green-didis-cottage", propertyId: 2514, fallbackImage: siteImages.mountainChalet, bookingPath: "Green-Didis-Cottage" },
];

export const propertySourceBySlug = Object.fromEntries(
  propertySources.map((source) => [source.slug, source]),
) as Record<string, PropertySource>;
