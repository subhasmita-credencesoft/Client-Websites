import { propertySources, type PropertySource } from "@/lib/properties/sources";

export interface PropertyConfig extends PropertySource {
  propertyName: string;
  apiEndpoint: string;
  metadata: {
    title: string;
    description: string;
  };
}

export const propertyConfigs: PropertyConfig[] = propertySources.map((source) => {
  const slug = source.slug;

  const labelMap: Record<string, { name: string; title: string; description: string }> = {
    "shalom-maple-leaf": {
      name: "Shalom Maple Leaf",
      title: "Shalom Maple Leaf Luxury Resort in Lonavala | By TripDip",
      description:
        "Nestled in the pristine and lush green land of Lonavala, Shalom Maple Leaf is a leading 4-star equivalent vacation destination. Hidden away from the rush of the city, this charming retreat lets you unplug and reconnect.",
    },
    "cherry-blossom": {
      name: "Cherry Blossom",
      title: "Cherry Blossom Luxe Villa in Mahabaleshwar | By TripDip",
      description:
        "Perched in the breathtaking Sahyadri mountain range, Cherry Blossom is the perfect blend of luxury homestay and private villa. Enjoy stunning views, mountain breeze and our warm South-Indian hospitality.",
    },
    "pool-and-pause": {
      name: "Pool & Pause",
      title: "Pool And Pause Luxury Villa Resort in Mahabaleshwar | By TripDip",
      description:
        "Instant gratification isn't about being fast — it's about slowing down. Pool & Pause is an all-villa resort in Bhilar, near Mahabaleshwar, ideal for a relaxed group getaway.",
    },
    "shirke-holiday-home": {
      name: "Shirke Holiday Home",
      title: "Shirke Holiday Home in Lonavala | By TripDip",
      description:
        "Shirke Holiday Home is a comfortable family-friendly property in Lonavala. Close to scenic spots and hill stations, it offers a relaxed stay with warm, personal service.",
    },
    "green-didi-s-cottage": {
      name: "Green Didi's Cottage",
      title: "Green Didi's Cottage in Mahabaleshwar | By TripDip",
      description:
        "A quaint little cottage in the hills of Mahabaleshwar, Green Didi's Cottage offers a peaceful homestay experience with home-grown food and stunning valley views.",
    },
  };

  const label = labelMap[slug] ?? {
    name: slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    title: `${slug} | By TripDip`,
    description: "Stay, dine and create memories with TripDip.",
  };

  return {
    ...source,
    propertyName: label.name,
    apiEndpoint: `https://api.thehotelmate.co/api/thm/findById/${source.propertyId}`,
    metadata: {
      title: label.title,
      description: label.description,
    },
  };
});

export const getPropertyBySlug = (slug: string): PropertyConfig | undefined => {
  return propertyConfigs.find((config) => config.slug === slug);
};