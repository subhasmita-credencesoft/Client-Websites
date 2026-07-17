import type { Metadata } from "next";
import { GalleryPage } from "@/components/features/gallery/gallery-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Gallery",
  path: "/gallery",
  description:
    "Browse wedding moments, celebration spaces, luxury room interiors, mountain views, and poolside settings at The Mountain Resort in Karjat by Redwings.",
});

export default function Page() {
  return <GalleryPage />;
}
