import type { Metadata } from "next";

import { InternalPageHero } from "@/components/layout/internal-page-hero";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { hotelInfo } from "@/data/hotel";

export const metadata: Metadata = {
  title: `Reviews | ${hotelInfo.name}`,
  description: "Read featured guest feedback and review highlights for Hotel Shravan Royal Inn.",
  alternates: {
    canonical: "/reviews",
  },
};

export default function ReviewsPage() {
  return (
    <main>
      <InternalPageHero
        description="Explore featured guest impressions that highlight the comfort, cleanliness, and welcoming hospitality of the stay."
        eyebrow="Reviews"
        imageAlt="Welcoming hotel setting representing guest experience"
        imageSrc="/images/gallery-1.jpg"
        title="Guest feedback centered on comfort, cleanliness, and warm service"
      />
      <TestimonialsSection />
    </main>
  );
}
