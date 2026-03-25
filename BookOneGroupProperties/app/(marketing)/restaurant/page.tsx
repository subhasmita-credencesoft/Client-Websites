import type { Metadata } from "next";
import { RestaurantPage } from "@/components/pages/restaurant-page";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageContent } from "@/data/pages";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: pageContent.restaurant.title,
  description: pageContent.restaurant.description,
  path: "/restaurant",
  image: pageContent.restaurant.image,
});

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: pageContent.restaurant.title,
    url: absoluteUrl("/restaurant"),
    description: pageContent.restaurant.description,
    image: absoluteUrl(pageContent.restaurant.image),
    servesCuisine: ["Indian", "Coastal", "Multi-Cuisine"],
  };

  return (
    <>
      <JsonLd data={schema} />
      <RestaurantPage />
    </>
  );
}
