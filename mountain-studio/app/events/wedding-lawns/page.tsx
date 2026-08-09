import type { Metadata } from "next";
import { WeddingLawnsPageClient } from "./WeddingLawnsPageClient";
import { FaqSection } from "@/components/sections/FaqSection";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Wedding Lawns in Arpora Goa | Open Lawn Venues | Redwings Studio",
  description:
    "Host weddings at Redwings Studio, Arpora, Goa — open lawn spaces for Haldi, Mehendi, Sangeet, ceremonies, and receptions with scenic surroundings. Destination wedding venue near Baga Beach.",
  keywords: [
    "Wedding Lawns Arpora",
    "Open Lawn Wedding Goa",
    "Haldi Mehendi Sangeet Venue",
    "Destination Wedding Venue Goa",
    "Wedding Ceremony Arpora",
    "Redwings Studio Wedding",
    "Goa Wedding Lawns",
  ],
  alternates: { canonical: "https://redwingsstudio.com/events/wedding-lawns" },
  openGraph: {
    title: "Wedding Lawns — Redwings Studio Goa | Open Lawn Venues Arpora",
    description:
      "Open lawn wedding venues for ceremonies and receptions at Redwings Studio, Arpora, Goa.",
    images: [
      {
        url: "/mountain-studio/gallery-11.jpeg",
        width: 1200,
        height: 630,
        alt: "Wedding Lawns at Redwings Studio Goa — Arpora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Lawns — Redwings Studio Goa",
    description: "Open lawn wedding venues in Arpora, Goa.",
    images: ["/mountain-studio/gallery-11.jpeg"],
  },
};

export default function WeddingLawnsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Events", url: `${SITE_URL}/events` },
              { name: "Wedding Lawns", url: `${SITE_URL}/events/wedding-lawns` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(weddingLawnsFaqs, "/events/wedding-lawns")) }}
      />
      <WeddingLawnsPageClient />
      <FaqSection
        eyebrow="Wedding Venue"
        title="Frequently asked questions about the wedding lawns at Redwings Studio"
        description="Open lawn weddings, capacities, planning, and guest stays in Arpora, Goa."
        faqs={weddingLawnsFaqs}
      />
    </>
  );
}

const weddingLawnsFaqs = [
  {
    question: "Can I host a full wedding at Redwings Studio's lawn in Arpora?",
    answer:
      "Yes. The open lawns support the full celebration flow — haldi, mehendi, sangeet, ceremony, and reception — with scenic greenery and resort surroundings as the backdrop.",
  },
  {
    question: "How many guests fit on the wedding lawn?",
    answer:
      "The lawn accommodates intimate to medium-sized weddings comfortably. Share your guest count and event plan with the team for exact capacity, layout, and seating arrangements.",
  },
  {
    question: "Can wedding guests stay overnight at Redwings Studio?",
    answer:
      "Yes. Redwings Studio has 10 studio apartments on site, making it convenient for destination wedding families and outstation guests to stay at the venue.",
  },
  {
    question: "Is Redwings Studio a good destination wedding venue near Baga Beach?",
    answer:
      "Yes. The property is 3 km from Baga Beach, set within a private 7-acre estate in Arpora — a practical and scenic base for destination weddings with photography-ready corners.",
  },
  {
    question: "How do I check availability and pricing for the wedding lawns?",
    answer:
      "Contact the Redwings Studio team through the contact page or call +91 9167680996 / +91 9763988999 with your date and estimated guest count for a personalised quote.",
  },
];
