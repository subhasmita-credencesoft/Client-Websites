import { siteImages } from "./site-images";
import { propertySources, type PropertySource } from "@/data/property-sources";

export interface PropertyConfig extends PropertySource {
  propertyName: string;
  apiEndpoint: string;
  metadata: {
    title: string;
    description: string;
  };
}

// Map the minimal sources to full configs
export const propertyConfigs: PropertyConfig[] = propertySources.map(source => ({
  ...source,
  propertyName: source.slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
  apiEndpoint: "https://api.thehotelmate.co/api/thm",
  metadata: {
    title: `${source.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} | Official Website`,
    description: `Experience the best of hospitality at ${source.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}. Book your stay now.`,
  }
}));

export const getPropertyBySlug = (slug: string) => {
  const normalizedSlug = slug.toLowerCase();
  return propertyConfigs.find((p) => p.slug.toLowerCase() === normalizedSlug);
};

export const getPropertyById = (id: number) => {
  return propertyConfigs.find((p) => p.propertyId === id);
};
