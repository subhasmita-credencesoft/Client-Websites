import type { Metadata } from "next";
import { OffersPageClient } from "./OffersPageClient";
import { FaqSection } from "@/components/sections/FaqSection";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Offers & Direct Booking Benefits | Redwings Studio Goa Arpora",
  description:
    "Explore direct booking benefits, group stay support, and stay planning advantages at Redwings Studio, Arpora, Goa. Get the best room rates and availability by booking directly.",
  keywords: [
    "Hotel Offers Goa",
    "Direct Booking Benefits",
    "Best Hotel Deals Arpora",
    "Group Stay Offers Goa",
    "Budget Hotel Offers North Goa",
    "Redwings Studio Offers",
    "Hotel Discounts Goa",
    "Weekend Getaway Deals",
  ],
  alternates: { canonical: "https://redwingsstudio.com/offers" },
  openGraph: {
    title: "Offers & Booking Benefits — Redwings Studio Goa",
    description:
      "Direct booking benefits, group stay support, and stay planning advantages at Redwings Studio, Arpora, Goa.",
    images: [
      {
        url: "/mountain-studio/hero-secondary.jpeg",
        width: 1200,
        height: 630,
        alt: "Offers at Redwings Studio Goa — Direct Booking Benefits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Offers — Redwings Studio Goa",
    description: "Direct booking benefits and group stay support in Goa.",
    images: ["/mountain-studio/hero-secondary.jpeg"],
  },
};

export default function OffersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Offers", url: `${SITE_URL}/offers` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(offersFaqs, "/offers")) }}
      />
      <OffersPageClient />
      <FaqSection
        eyebrow="Direct Booking Benefits"
        title="Frequently asked questions about offers at Redwings Studio"
        description="Direct booking advantages, group stays, and seasonal benefits in Arpora, Goa."
        faqs={offersFaqs}
      />
    </>
  );
}

const offersFaqs = [
  {
    question: "What direct booking benefits does Redwings Studio offer?",
    answer:
      "Guests who book directly get the best available rate, instant confirmation, free cancellation terms, and direct support from the owner-managed team — without third-party commission markups.",
  },
  {
    question: "Are there discounts for longer stays in Goa?",
    answer:
      "Discounts are often available for stays of 3 nights or more, especially on weekdays outside the December–February peak season. Contact the property for a custom quote for your dates.",
  },
  {
    question: "Do group bookings get special rates?",
    answer:
      "Yes. Group and multi-room bookings receive negotiated rates and coordinated rooming. Call +91 9167680996 or +91 9763988999 to plan a group stay near Baga Beach.",
  },
  {
    question: "Do the offers apply during the Goa peak season?",
    answer:
      "Promotional offers may be limited during Christmas, New Year, and the December–February peak window. Always confirm current availability and rates for your exact travel dates.",
  },
  {
    question: "How do I redeem a direct booking offer?",
    answer:
      "Book through the website booking engine or contact the property directly and mention the offer you saw on this page. The team will confirm the applicable rate and any terms.",
  },
];
