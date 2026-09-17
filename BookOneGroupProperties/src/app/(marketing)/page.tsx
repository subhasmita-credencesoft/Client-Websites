import type { Metadata } from "next";
import { HomePage } from "@/components/features/home/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { homePageData } from "@/data/home";
import { getFeaturedPropertiesData, getLocationHighlightsData } from "@/lib/properties/service";
import { buildPageMetadata, absoluteUrl } from "@/lib/site/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "TripDip",
  description: homePageData.hero.description,
  path: "/",
});

export default async function Page() {
  const locationHighlightsData = await getLocationHighlightsData();
  const featuredPropertiesData = await getFeaturedPropertiesData();
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: metadata.title,
    url: absoluteUrl("/"),
    description: homePageData.hero.description,
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
      <HomePage
        locationHighlightsData={locationHighlightsData}
        featuredPropertiesData={featuredPropertiesData}
      />
    </>
  );
}
