import type { Metadata } from "next";

import { InternalPageHero } from "@/components/layout/internal-page-hero";
import { LocationSection } from "@/components/sections/location-section";
import { hotelInfo } from "@/data/hotel";

export const metadata: Metadata = {
  title: `Location | ${hotelInfo.name}`,
  description: "Find Hotel Shravan Royal Inn in Jaipur with address details, map preview, and directions.",
  alternates: {
    canonical: "/location",
  },
};

export default function LocationPage() {
  return (
    <main>
      <InternalPageHero
        description="Get the address, map preview, and direct navigation access for reaching Hotel Shravan Royal Inn in Jaipur."
        eyebrow="Location"
        imageAlt="Exterior-inspired location preview for Hotel Shravan Royal Inn"
        imageSrc="/images/hero.jpg"
        title="Easy-to-reach Jaipur location with quick access to directions"
      />
      <LocationSection />
    </main>
  );
}
