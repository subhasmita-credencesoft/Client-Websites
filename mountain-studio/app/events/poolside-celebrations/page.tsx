import type { Metadata } from "next";
import { PoolsideCelebrationsPageClient } from "./PoolsideCelebrationsPageClient";
import { FaqSection } from "@/components/sections/FaqSection";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Poolside Celebrations in Arpora Goa | Cocktail & Music Events | Redwings Studio",
  description:
    "Host poolside celebrations at Redwings Studio, Arpora, Goa — cocktail evenings, music gatherings, and relaxed destination events with scenic resort setting.",
  keywords: [
    "Poolside Events Goa",
    "Cocktail Evening Arpora",
    "Music Night Goa",
    "Pool Party Venue Arpora",
    "Celebration Venue Goa",
    "Redwings Studio Poolside",
  ],
  alternates: {
    canonical: "https://redwingsstudio.com/events/poolside-celebrations",
  },
  openGraph: {
    title:
      "Poolside Celebrations — Redwings Studio Goa | Cocktail Events Arpora",
    description:
      "Poolside cocktail evenings and music gatherings at Redwings Studio, Arpora, Goa.",
    images: [
      {
        url: "/mountain-studio/gallery-06.jpeg",
        width: 1200,
        height: 630,
        alt: "Poolside Celebrations at Redwings Studio Goa — Arpora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Poolside Celebrations — Redwings Studio Goa",
    description: "Poolside events and celebrations in Arpora, Goa.",
    images: ["/mountain-studio/gallery-06.jpeg"],
  },
};

export default function PoolsideCelebrationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Events", url: `${SITE_URL}/events` },
              { name: "Poolside Celebrations", url: `${SITE_URL}/events/poolside-celebrations` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(poolsideFaqs, "/events/poolside-celebrations")) }}
      />
      <PoolsideCelebrationsPageClient />
      <FaqSection
        eyebrow="Poolside Events"
        title="Frequently asked questions about poolside celebrations at Redwings Studio"
        description="Cocktail evenings, music nights, and poolside events in Arpora, Goa."
        faqs={poolsideFaqs}
      />
    </>
  );
}

const poolsideFaqs = [
  {
    question: "What kind of events can be hosted poolside at Redwings Studio?",
    answer:
      "The poolside area is ideal for cocktail evenings, music nights, private parties, engagement celebrations, and relaxed social gatherings in a scenic resort setting.",
  },
  {
    question: "How many guests can a poolside celebration accommodate?",
    answer:
      "The poolside zone suits intimate to medium-sized groups. Contact the team with your guest count for the right layout, seating, and service arrangement.",
  },
  {
    question: "Can I arrange catering and music for a poolside party?",
    answer:
      "Yes. The property team can arrange catering, beverages, decor, and music setups for your poolside celebration — share your requirements when you enquire.",
  },
  {
    question: "Is the poolside available for daytime events?",
    answer:
      "Both daytime and evening poolside events can be arranged. Evening cocktail and music setups are especially popular near the pool lights.",
  },
  {
    question: "How do I book the poolside celebration space?",
    answer:
      "Contact the team through the contact page or call +91 9167680996 / +91 9763988999 with your date, guest count, and event type to reserve the space.",
  },
];
