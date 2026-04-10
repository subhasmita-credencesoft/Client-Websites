import type { Metadata } from "next";

import { InternalPageHero } from "@/components/layout/internal-page-hero";
import { RoomsSection } from "@/components/sections/rooms-section";
import { hotelInfo } from "@/data/hotel";

export const metadata: Metadata = {
  title: `Rooms | ${hotelInfo.name}`,
  description: "Explore room options at Hotel Shravan Royal Inn with comfortable features for families, couples, and business travelers.",
  alternates: {
    canonical: "/rooms",
  },
};

export default function RoomsPage() {
  return (
    <main>
      <InternalPageHero
        description="Browse stay options designed for restful nights, polished interiors, and a smooth Jaipur hotel experience."
        eyebrow="Rooms"
        imageAlt="Premium guest room at Hotel Shravan Royal Inn"
        imagePosition="center"
        imageSrc="/images/room-1.jpg"
        title="Comfort-first rooms for couples, families, and business guests"
      />
      <RoomsSection />
    </main>
  );
}
