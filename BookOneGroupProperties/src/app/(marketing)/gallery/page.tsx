import type { Metadata } from "next";
import { GalleryPage } from "@/components/features/gallery/GalleryPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageContent } from "@/data/pages";
import { homePageData } from "@/data/home";
import { buildPageMetadata, absoluteUrl } from "@/lib/site/seo";

export const metadata: Metadata = buildPageMetadata({
  title: pageContent.gallery.title,
  description: pageContent.gallery.description,
  path: "/gallery",
});

export default async function Page() {
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
