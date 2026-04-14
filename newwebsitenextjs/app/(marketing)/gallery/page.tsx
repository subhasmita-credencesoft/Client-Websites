import type { Metadata } from "next";
import { GalleryPage } from "@/components/features/gallery/gallery-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Gallery",
  path: "/gallery",
});

export default function Page() {
  return <GalleryPage />;
}
