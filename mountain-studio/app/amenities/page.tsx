import type { Metadata } from "next";
import { AmenitiesPageClient } from "@/components/amenities/AmenitiesPageClient";
import { FaqSection } from "@/components/sections/FaqSection";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Amenities at Redwings Studio Goa | Pool, Garden & Free WiFi in Arpora",
  description:
    "Discover amenities at Redwings Studio, Arpora, Goa — swimming pool, free Wi-Fi, in-house dining, garden lawn, fitness area, bar & lounge, event space, and free parking. Ideal for couples, families, and budget travelers.",
  keywords: [
    "Swimming Pool Hotel Goa",
    "Free WiFi Hotel Goa",
    "Free Parking Goa",
    "Amenities Redwings Studio",
    "Hotel Amenities Arpora",
    "Pool Access Room Goa",
    "Garden Lawn Hotel Goa",
    "Bar Lounge Arpora",
    "In-House Dining Goa",
    "Fitness Area Hotel Goa",
  ],
  alternates: { canonical: "https://redwingsstudio.com/amenities" },
  openGraph: {
    title: "Amenities — Redwings Studio Goa | Pool, Garden & Free WiFi",
    description:
      "Swimming pool, free Wi-Fi, garden lawn, fitness area, bar & lounge, and more at Redwings Studio, Arpora, Goa.",
    images: [
      {
        url: "/mountain-studio/gallery-06.jpeg",
        width: 1200,
        height: 630,
        alt: "Amenities at Redwings Studio Goa — Swimming Pool and Garden",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amenities — Redwings Studio Goa",
    description:
      "Swimming pool, free Wi-Fi, garden lawn, fitness area in Arpora, Goa.",
    images: ["/mountain-studio/gallery-06.jpeg"],
  },
};

export default function AmenitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Amenities", url: `${SITE_URL}/amenities` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(amenitiesFaqs, "/amenities")) }}
      />
      <AmenitiesPageClient />
      <FaqSection
        eyebrow="Facilities"
        title="Frequently asked questions about amenities at Redwings Studio"
        description="Facilities, free inclusions, and resort facilities available to guests staying in Arpora, Goa."
        faqs={amenitiesFaqs}
      />
    </>
  );
}

const amenitiesFaqs = [
  {
    question: "What amenities are available at Redwings Studio, Goa?",
    answer:
      "Guests at Redwings Studio enjoy a swimming pool, free Wi-Fi, free parking, a garden lawn, in-house dining, a fitness area, bar and lounge, room service, and event space — all within the Abalone Resort estate in Arpora.",
  },
  {
    question: "Is Wi-Fi and parking free at Redwings Studio?",
    answer:
      "Yes. Free Wi-Fi and free parking are included for all guests staying at Redwings Studio, making it convenient for couples, families, and guests arriving by car or two-wheeler.",
  },
  {
    question: "Does Redwings Studio have a swimming pool?",
    answer:
      "Yes, the resort has a swimming pool with pool-access and pool-view room options. All guests can use the pool during their stay.",
  },
  {
    question: "Are there dining options at Redwings Studio?",
    answer:
      "In-house dining is available within the resort, and the property team can guide you to the best local restaurants and beach shacks near Baga, Calangute, and Anjuna.",
  },
  {
    question: "Which amenities do the rooms include?",
    answer:
      "Every studio apartment includes free Wi-Fi, a flat-screen TV, room service, and geyser hot water, plus access to the pool, garden lawn, and resort common areas.",
  },
];
