import type { Metadata } from "next";
import GalleryGrid from "../../components/sections/GalleryGrid";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Gallery",
  description:
    "Browse the gallery of rooms, resort spaces, dining moments, and experiences at UK's Resort.",
  path: "/gallery",
  image: "https://bookonelocal.in/cdn/Copy of IMG_1568.avif",
});

export default function GalleryPage() {
  return (
    <GalleryGrid
      title="Gallery"
      subtitle="Spaces and moments that shape the Amoja experience."
    />
  );
}
