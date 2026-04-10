import type { Metadata } from "next";

import { InternalPageHero } from "@/components/layout/internal-page-hero";
import { AboutSection } from "@/components/sections/about-section";
import { hotelInfo } from "@/data/hotel";

export const metadata: Metadata = {
  title: `About | ${hotelInfo.name}`,
  description: "Learn more about Hotel Shravan Royal Inn, its hospitality approach, ambience, and Jaipur stay experience.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main>
      <InternalPageHero
        description="Discover the story, hospitality philosophy, and refined ambience that shape every stay at Hotel Shravan Royal Inn."
        eyebrow="About"
        imageAlt="Elegant hotel interior seating area"
        imageSrc="/images/gallery-2.jpg"
        title="A modern Jaipur stay built around warmth, comfort, and calm"
      />
      <AboutSection />
    </main>
  );
}
