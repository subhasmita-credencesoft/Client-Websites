import type { Metadata } from "next";
import { PropertiesPage } from "@/components/pages/properties-page";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageContent } from "@/data/pages";
import { getFeaturedPropertiesData, getLocationHighlightsData } from "@/lib/hotelmate-properties";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: pageContent.properties.title,
  description: pageContent.properties.description,
  path: "/properties",
});

export default async function Page() {
  const locationHighlightsData = await getLocationHighlightsData();
  const featuredPropertiesData = await getFeaturedPropertiesData();
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageContent.properties.title,
    url: absoluteUrl("/properties"),
    description: pageContent.properties.description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: featuredPropertiesData.map((property, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: property.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <PropertiesPage locationHighlightsData={locationHighlightsData} featuredPropertiesData={featuredPropertiesData} />
    </>
  );
}
