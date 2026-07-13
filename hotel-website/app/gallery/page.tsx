import type { Metadata } from "next";
import GalleryGrid from "../../components/sections/GalleryGrid";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Photo Gallery — UK's Resort Khopoli | Rooms, Water Park, Dining & Events",
  description:
    "Browse the photo gallery of rooms, water park, dining spaces, event venues, and experiences at UK's Resort Khopoli near Mumbai.",
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
