import type { Metadata } from "next";
import { DiningPageClient } from "./DiningPageClient";
import { FaqSection } from "@/components/sections/FaqSection";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Dining at Redwings Studio Goa | Restaurants & Private Dining in Arpora",
  description:
    "Explore dining at Redwings Studio, Arpora, Goa — The Garden Restaurant with Goan cuisine, Poolside Cafe for casual dining, and Bar & Lounge for cocktails. Resort dining near Baga Beach.",
  keywords: [
    "Dining Arpora Goa",
    "Restaurant Near Baga Beach",
    "Goan Cuisine Hotel",
    "Poolside Cafe Goa",
    "Bar Lounge Arpora",
    "Hotel Dining Goa",
    "Redwings Studio Restaurant",
    "Private Dining Goa",
  ],
  alternates: { canonical: "https://redwingsstudio.com/dining" },
  openGraph: {
    title: "Dining — Redwings Studio Goa | Restaurants & Cocktails",
    description:
      "Goan cuisine, casual dining, and cocktails at Redwings Studio, Arpora, Goa. The Garden Restaurant, Poolside Cafe, and Bar & Lounge.",
    images: [
      {
        url: "/mountain-studio/gallery-09.jpeg",
        width: 1200,
        height: 630,
        alt: "Dining at Redwings Studio Goa — Restaurant and Bar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dining — Redwings Studio Goa",
    description: "Goan cuisine, casual dining, and cocktails in Arpora, Goa.",
    images: ["/mountain-studio/gallery-09.jpeg"],
  },
};

export default function DiningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Dining", url: `${SITE_URL}/dining` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(diningFaqs, "/dining")) }}
      />
      <DiningPageClient />
      <FaqSection
        eyebrow="Food & Drink"
        title="Frequently asked questions about dining at Redwings Studio"
        description="Restaurants, cuisine, timings, and dining options near Arpora, Goa."
        faqs={diningFaqs}
      />
    </>
  );
}

const diningFaqs = [
  {
    question: "What dining options are available at Redwings Studio?",
    answer:
      "Dining at Redwings Studio includes The Garden Restaurant serving Goan and multi-cuisine dishes, a Poolside Cafe for casual bites and coffee, and a Bar & Lounge for cocktails and evening drinks — all within the Arpora resort estate.",
  },
  {
    question: "Is there vegetarian food available?",
    answer:
      "Yes. The restaurant serves a full vegetarian menu alongside Goan and Indian non-vegetarian specialities, including fresh seafood options common to Baga and Calangute coastal dining.",
  },
  {
    question: "Can I order food to my room?",
    answer:
      "Room service is available for guests, so you can order meals and beverages directly to your studio apartment during your stay.",
  },
  {
    question: "Are there good restaurants near Baga Beach close to Redwings Studio?",
    answer:
      "Yes. Within a 10-minute drive you will find the beach shacks and restaurants of Baga, Calangute, and Arpora — including the food stalls of the Saturday Night Market, 2 km from the property.",
  },
  {
    question: "Does Redwings Studio host private dining events?",
    answer:
      "The garden and poolside spaces can be arranged for private dining, celebrations, and group meals. Contact the property team to plan menus and seating for your group.",
  },
];
