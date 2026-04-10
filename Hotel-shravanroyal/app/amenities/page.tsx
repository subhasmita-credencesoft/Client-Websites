import type { Metadata } from "next";

import { InternalPageHero } from "@/components/layout/internal-page-hero";
import { AmenitiesSection } from "@/components/sections/amenities-section";
import { hotelInfo } from "@/data/hotel";

export const metadata: Metadata = {
  title: `Amenities | ${hotelInfo.name}`,
  description: "See the amenities available at Hotel Shravan Royal Inn, from parking and WiFi to comfort-led guest essentials.",
  alternates: {
    canonical: "/amenities",
  },
};

export default function AmenitiesPage() {
  return (
    <main>
      <InternalPageHero
        description="Everything from everyday essentials to comfort details is arranged to support a premium, practical Jaipur stay."
        eyebrow="Amenities"
        imageAlt="Hotel amenity and comfort-focused interior"
        imageSrc="/images/gallery-3.jpg"
        title="Thoughtful essentials that make the stay easier and more comfortable"
      />
      <AmenitiesSection />
    </main>
  );
}
