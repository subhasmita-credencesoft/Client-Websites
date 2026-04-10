import type { Metadata } from "next";

import { InternalPageHero } from "@/components/layout/internal-page-hero";
import { GallerySection } from "@/components/sections/gallery-section";
import { hotelInfo } from "@/data/hotel";

export const metadata: Metadata = {
  title: `Gallery | ${hotelInfo.name}`,
  description: "View the gallery of Hotel Shravan Royal Inn to explore interiors, rooms, and the visual atmosphere of the property.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <main>
      <InternalPageHero
        description="Take a closer look at the rooms, details, and ambience that define the Hotel Shravan Royal Inn experience."
        eyebrow="Gallery"
        imageAlt="Stylish hotel gallery preview"
        imageSrc="/images/gallery-4.jpg"
        title="A visual walk through the atmosphere of Shravan Royal Inn"
      />
      <GallerySection />
    </main>
  );
}
