import type { Metadata } from "next";
import { RoomsPageClient } from "@/components/rooms/RoomsPageClient";
import { FaqSection } from "@/components/sections/FaqSection";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Rooms in Arpora Goa — Budget, Standard & Pool View Stays | Redwings Studio",
  description:
    "Browse 5 room types at Redwings Studio, Goa — Budget Double from ₹1,950, Standard, Superior King, Pool Access & Pool View rooms. Studio apartments in Arpora near Baga Beach with free Wi-Fi, pool access, and direct booking. Check availability.",
  keywords: [
    "Rooms in Arpora",
    "Budget Room Goa",
    "Standard Room Arpora",
    "Pool View Room Goa",
    "Superior King Room Goa",
    "Studio Apartment Arpora",
    "Hotel Rooms Near Baga Beach",
    "Budget Hotel Rooms Goa",
    "Rooms in North Goa",
    "Affordable Stay Rooms Arpora",
    "Redwings Studio Rooms",
  ],
  alternates: { canonical: "https://redwingsstudio.com/rooms" },
  openGraph: {
    title: "Rooms at Redwings Studio Goa — Budget to Pool View",
    description:
      "5 room types from ₹1,950/night: Budget Double, Standard, Superior King, Pool Access & Pool View. Studio apartments in Arpora, Goa.",
    images: [
      {
        url: "/mountain-studio/gallery-12.jpeg",
        width: 1200,
        height: 630,
        alt: "Rooms at Redwings Studio Goa — Studio Apartments in Arpora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rooms — Redwings Studio Goa",
    description:
      "5 room types from ₹1,950/night in Arpora, Goa. Book directly.",
    images: ["/mountain-studio/gallery-12.jpeg"],
  },
};

export default function RoomsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Rooms", url: `${SITE_URL}/rooms` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(roomsFaqs, "/rooms")) }}
      />
      <RoomsPageClient />
      <FaqSection
        eyebrow="Rooms & Stay"
        title="Frequently asked questions about rooms in Arpora, Goa"
        description="Answers about room types, prices, pool access, and what every studio apartment includes at Redwings Studio."
        faqs={roomsFaqs}
      />
    </>
  );
}

const roomsFaqs = [
  {
    question: "What room types are available at Redwings Studio in Arpora?",
    answer:
      "Redwings Studio offers 5 room types across 10 studio apartments: Budget Double Room, Standard Room, Superior King Room, Standard Room Pool Access, and Superior Pool View. Rates start from ₹1,950/night.",
  },
  {
    question: "Do all rooms at Redwings Studio have pool access?",
    answer:
      "The Standard Room Pool Access and Superior Pool View rooms are closest to the swimming pool. All guests can use the pool and garden lawn during their stay regardless of room type.",
  },
  {
    question: "Which is the best room for couples in North Goa?",
    answer:
      "Couples usually choose the Superior Pool View or Superior King Room — the largest rooms with the best resort outlook. Budget-conscious couples often pick the Standard Room or Budget Double Room.",
  },
  {
    question: "What amenities are included with the rooms?",
    answer:
      "Every studio apartment includes free Wi-Fi, a flat-screen TV, room service, and geyser hot water, with access to the swimming pool and garden lawn. See the individual room page for the complete amenity list.",
  },
  {
    question: "Can I book multiple rooms for a family or group stay?",
    answer:
      "Yes. You can reserve multiple studio apartments for family or group stays. Call +91-9167680996 or +91-9763988999 for group room blocks and better rates near Baga Beach.",
  },
];
