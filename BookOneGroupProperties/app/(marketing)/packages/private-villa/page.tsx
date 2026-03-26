import type { Metadata } from "next";
import { PackagePage } from "@/components/pages/package-page";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageContent } from "@/data/pages";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const privateVillaPackage = pageContent.packages.privateVilla;

export const metadata: Metadata = buildPageMetadata({
  title: privateVillaPackage.title,
  description: privateVillaPackage.description,
  path: "/packages/private-villa",
  image: privateVillaPackage.image,
});

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: privateVillaPackage.title,
    url: absoluteUrl("/packages/private-villa"),
    description: privateVillaPackage.description,
    image: absoluteUrl(privateVillaPackage.image),
  };

  return (
    <>
      <JsonLd data={schema} />
      <PackagePage variant="privateVilla" />
    </>
  );
}
