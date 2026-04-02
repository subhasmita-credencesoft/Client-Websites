import { siteImages } from "@/lib/site-images";

export type PropertySource = {
  slug: string;
  propertyId: number;
  fallbackImage: string;
  bookingPath: string;
};

export const propertySources: PropertySource[] = [
  { slug: "vedanta-resort", propertyId: 1331, fallbackImage: siteImages.vedantaResortLive, bookingPath: "Vedanta-Resort" },
  { slug: "orchard-resort", propertyId: 516, fallbackImage: siteImages.orchardResortLive, bookingPath: "Orchard-Resort" },
  { slug: "vishals-orchard-resort", propertyId: 516, fallbackImage: siteImages.orchardResortLive, bookingPath: "Orchard-Resort" },
  { slug: "rajgad-water-park-resort", propertyId: 518, fallbackImage: siteImages.rajgadWaterPark, bookingPath: "Rajgad-Water-Park-Resort" },
  { slug: "mayurwan-farmhouse", propertyId: 552, fallbackImage: siteImages.mayurwanFarmhouseLive, bookingPath: "Mayurwan-Farmhouse" },
  { slug: "3-bhk-purandar", propertyId: 714, fallbackImage: siteImages.threeBhkPurandarLive, bookingPath: "3-BHK-Purandar" },
  { slug: "ruturang-agro-resort", propertyId: 712, fallbackImage: siteImages.ruturangAgroResort, bookingPath: "Ruturang-Agro-Resort" },
  { slug: "pipul-bandhan-inn-hotel", propertyId: 812, fallbackImage: siteImages.luxuryVillaSunset, bookingPath: "Pipul-Bandhan-Inn-Hotel" },
  { slug: "prathamesh-resort", propertyId: 1370, fallbackImage: siteImages.prathameshResortLive, bookingPath: "Prathamesh-Resort" },
  { slug: "k-l-farmhouse", propertyId: 1401, fallbackImage: siteImages.klFarmhouseLive, bookingPath: "K-L-Farmhouse" },
  { slug: "peacock-hills-resort-pune", propertyId: 3519, fallbackImage: siteImages.peacockHills, bookingPath: "Peacock-Hills-Resort-Pune" },
  { slug: "a-r-villa", propertyId: 1055, fallbackImage: siteImages.luxuryVillaSunset, bookingPath: "A-R-Villa" },
  { slug: "4-bhk-bhor", propertyId: 550, fallbackImage: siteImages.fourBhkBhor, bookingPath: "4-BHK-Bhor" },
];

export const propertySourceBySlug = Object.fromEntries(
  propertySources.map((source) => [source.slug, source]),
) as Record<string, PropertySource>;
