import type { Metadata } from "next";
import { PackagePage } from "@/components/pages/package-page";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageContent } from "@/data/pages";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const resortPackage = pageContent.packages.resort;

export const metadata: Metadata = buildPageMetadata({
  title: resortPackage.title,
  description: resortPackage.description,
  path: "/packages/resort",
  image: resortPackage.image,
});

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: resortPackage.title,
    url: absoluteUrl("/packages/resort"),
    description: resortPackage.description,
    image: absoluteUrl(resortPackage.image),
  };

  return (
    <>
      <JsonLd data={schema} />
      <PackagePage variant="resort" />
    </>
  );
}
