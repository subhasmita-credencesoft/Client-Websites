import { siteImages } from "@/lib/site-images";

export type PropertySource = {
  slug: string;
  propertyId: number;
  fallbackImage: string;
};

export const propertySources: PropertySource[] = [
  { slug: "vedanta-resort", propertyId: 1331, fallbackImage: siteImages.hero },
  { slug: "orchard-resort", propertyId: 516, fallbackImage: siteImages.modernTropicalVilla },
  { slug: "vishals-orchard-resort", propertyId: 516, fallbackImage: siteImages.modernTropicalVilla },
  { slug: "rajgad-water-park-resort", propertyId: 518, fallbackImage: siteImages.resortPool },
  { slug: "mayurwan-farmhouse", propertyId: 552, fallbackImage: siteImages.modernTropicalVilla },
  { slug: "pipul-bandhan-inn-hotel", propertyId: 812, fallbackImage: siteImages.luxuryVillaSunset },
  { slug: "prathamesh-resort", propertyId: 1370, fallbackImage: siteImages.resortPool },
  { slug: "a-r-villa", propertyId: 1055, fallbackImage: siteImages.luxuryVillaSunset },
  { slug: "4-bhk-bhor", propertyId: 550, fallbackImage: siteImages.suiteOceanView },
];

export const propertySourceBySlug = Object.fromEntries(
  propertySources.map((source) => [source.slug, source]),
) as Record<string, PropertySource>;
