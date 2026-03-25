import type { Metadata } from "next";
import { GalleryPage } from "@/components/pages/gallery-page";
import { JsonLd } from "@/components/seo/JsonLd";
import { homePageData } from "@/data/home";
import { pageContent } from "@/data/pages";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: pageContent.gallery.title,
  description: pageContent.gallery.description,
  path: "/gallery",
});

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: pageContent.gallery.title,
    url: absoluteUrl("/gallery"),
    description: pageContent.gallery.description,
    image: homePageData.gallery.images.map((image) => absoluteUrl(image)),
  };

  return (
    <>
      <JsonLd data={schema} />
      <GalleryPage />
    </>
  );
}
