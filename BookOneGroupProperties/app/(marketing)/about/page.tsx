import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/about-page";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageContent } from "@/data/pages";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: pageContent.about.title,
  description: pageContent.about.description,
  path: "/about",
});

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: pageContent.about.title,
    url: absoluteUrl("/about"),
    description: pageContent.about.description,
  };

  return (
    <>
      <JsonLd data={schema} />
      <AboutPage />
    </>
  );
}
