import type { Metadata } from "next";
import { TariffPageClient } from "./TariffPageClient";
import { FaqSection } from "@/components/sections/FaqSection";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Room Tariff & Rates | Redwings Studio Goa — From ₹1,950/Night in Arpora",
  description:
    "View room tariffs at Redwings Studio, Arpora, Goa — Budget Double from ₹1,950, Standard from ₹2,100, Superior King from ₹2,500, Pool Access from ₹2,521, Pool View from ₹3,003 per night. Book directly for best rates.",
  keywords: [
    "Room Tariff Goa",
    "Hotel Rates Arpora",
    "Budget Hotel Price Goa",
    "Room Price Near Baga Beach",
    "Redwings Studio Tariff",
    "Affordable Stay Price Goa",
    "Studio Apartment Rate Arpora",
    "Hotel Offers Goa",
  ],
  alternates: { canonical: "https://redwingsstudio.com/tariff" },
  openGraph: {
    title: "Room Tariff — Redwings Studio Goa | From ₹1,950/Night",
    description:
      "Room rates from ₹1,950/night at Redwings Studio, Arpora, Goa. Budget to pool-view rooms.",
    images: [
      {
        url: "/mountain-studio/gallery-12.jpeg",
        width: 1200,
        height: 630,
        alt: "Room Tariff — Redwings Studio Goa Rates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Room Tariff — Redwings Studio Goa",
    description: "Room rates from ₹1,950/night. Book directly for best rates.",
    images: ["/mountain-studio/gallery-12.jpeg"],
  },
};

export default function TariffPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Tariff", url: `${SITE_URL}/tariff` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(tariffFaqs, "/tariff")) }}
      />
      <TariffPageClient />
      <FaqSection
        eyebrow="Rates & Booking"
        title="Frequently asked questions about room tariffs at Redwings Studio"
        description="Everything about room prices, seasonal rates, taxes, and direct booking in Arpora, Goa."
        faqs={tariffFaqs}
      />
    </>
  );
}

const tariffFaqs = [
  {
    question: "What are the room prices at Redwings Studio, Goa?",
    answer:
      "Room tariffs at Redwings Studio start from ₹1,950/night for the Budget Double Room. Standard Room is from ₹2,100, Superior King Room from ₹2,500, Standard Room Pool Access from ₹2,521, and Superior Pool View from ₹3,003 per night for two guests.",
  },
  {
    question: "Do the room rates change during the Goa peak season?",
    answer:
      "Yes, tariffs are typically higher during the December–February peak season, Christmas–New Year, and long weekends. Contact the property directly for the current best available rate on your dates.",
  },
  {
    question: "Are taxes and breakfast included in the room tariff?",
    answer:
      "The displayed tariff is the starting rate per night for the room. Confirm the final total — including applicable taxes and any meal add-ons — when you check availability for your specific travel dates.",
  },
  {
    question: "Is it cheaper to book directly with Redwings Studio?",
    answer:
      "Booking directly through the website booking engine or by calling +91-9167680996 / +91-9763988999 usually gets you the best rate and free cancellation terms, without third-party commission markups.",
  },
  {
    question: "Can I get a discount for group bookings in Arpora?",
    answer:
      "Yes. For group or multi-room bookings at Redwings Studio, contact the team directly to get a negotiated group rate, especially for weekday stays outside the December peak window.",
  },
];
