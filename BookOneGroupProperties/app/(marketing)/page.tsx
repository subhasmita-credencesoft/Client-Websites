import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home-page";
import { JsonLd } from "@/components/seo/JsonLd";
import { homePageData } from "@/data/home";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Luxury Villas, Resorts and Stays",
  description: homePageData.hero.description,
  path: "/",
});

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: metadata.title,
    url: absoluteUrl("/"),
    description: homePageData.hero.description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: homePageData.featured.properties.map((property, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: property.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <HomePage />
    </>
  );
}
