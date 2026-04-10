import type { Metadata } from "next";

import { InternalPageHero } from "@/components/layout/internal-page-hero";
import { ContactSection } from "@/components/sections/contact-section";
import { hotelInfo } from "@/data/hotel";

export const metadata: Metadata = {
  title: `Contact | ${hotelInfo.name}`,
  description: "Contact Hotel Shravan Royal Inn to share your stay requirements, dates, and booking inquiries.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main>
      <InternalPageHero
        description="Send your stay requirements, travel dates, and special requests through the dedicated contact page."
        eyebrow="Contact"
        imageAlt="Hotel reception and contact experience preview"
        imageSrc="/images/gallery-2.jpg"
        title="Plan your stay and send an inquiry in just a few steps"
        secondaryCtaHref="/location"
        secondaryCtaLabel="View Location"
      />
      <ContactSection />
    </main>
  );
}
