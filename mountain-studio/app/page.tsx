import type { Metadata } from "next";
import { Suspense, lazy } from "react";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { FaqSection } from "@/components/sections/FaqSection";
import {
  lodgingSchema,
  websiteSchema,
  orgSchema,
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

const HomeBelowFold = lazy(
  () => import("@/components/sections/home/HomeBelowFold")
);

const homeFaqs = [
  {
    question: "Where is Redwings Studio located in Goa?",
    answer:
      "Redwings Studio is located at House No. 275/1, F30, Abalone Resort, Gorbhat, Arpora, Goa 403516 — in the heart of North Goa's beach belt, about 3 km from Baga Beach, 4 km from Calangute, and 5 km from Anjuna.",
  },
  {
    question: "How far is Redwings Studio from Baga Beach?",
    answer:
      "Redwings Studio is just 3 km from Baga Beach — roughly a 10-minute drive or a short scooty ride. The Saturday Night Market in Arpora is only 2 km away, and Calangute and Anjuna beaches are within 15 minutes.",
  },
  {
    question: "What are the check-in and check-out timings?",
    answer:
      "Check-in is from 1:00 PM and check-out is by 11:00 AM. Early check-in or late check-out can be requested in advance and is subject to room availability on your travel date.",
  },
  {
    question: "Is Redwings Studio couple friendly and family friendly?",
    answer:
      "Yes. Redwings Studio welcomes couples, families, and group travellers. The 10 owner-managed studio apartments include pool access rooms, a garden lawn, and quiet resort surroundings that work well for families and romantic Goa stays alike.",
  },
  {
    question: "Does Redwings Studio offer free parking and free Wi-Fi?",
    answer:
      "Yes. Free parking and free Wi-Fi are included for all guests, along with a swimming pool, room service, flat-screen TV, and hot water in every studio apartment.",
  },
  {
    question: "How do I book a room at Redwings Studio directly?",
    answer:
      "You can book directly through the booking engine on this website for instant confirmation, or call +91-9167680996 / +91-9763988999 to reserve your studio apartment and get the best available rate.",
  },
];

export const metadata: Metadata = {
  title:
    "Redwings Studio Goa | Studio Apartments in Arpora Near Baga Beach",
  description:
    "Book your stay at Redwings Studio Goa in Arpora. Comfortable studio apartments with swimming pool access, free Wi-Fi, air conditioning, and easy access to Baga, Calangute, and Anjuna beaches. Ideal for couples, families, and budget travelers. Rooms from ₹1,950/night. Free cancellation. Check-in 1 PM, check-out 11 AM. Direct booking with instant confirmation.",
  keywords: [
    "Redwings Studio Goa",
    "Redwings Studio Arpora",
    "Studio Apartments in Goa",
    "Budget Stay in Goa",
    "Homestay in Goa",
    "Hotel in Arpora Goa",
    "Stay Near Baga Beach",
    "Budget Hotel Near Baga Beach",
    "Best Homestay in Arpora",
    "Affordable Stay in Goa",
    "Vacation Rental Goa",
    "Apartments in North Goa",
    "Hotel Near Calangute Beach",
    "Hotel Near Anjuna Beach",
    "Pool View Rooms Goa",
    "Family Stay in Goa",
    "Couple Friendly Hotel Goa",
    "Studio Apartment Near Baga",
    "Budget Resort in North Goa",
  ],
  alternates: { canonical: "https://redwingsstudio.com" },
  openGraph: {
    title:
      "Redwings Studio Goa — Studio Apartments in Arpora, North Goa",
    description:
      "10 owner-managed studio apartments at Abalone Resort, Gorbhat, Goa. Budget to pool-view rooms from ₹1,950/night. Free cancellation. Book direct.",
    url: "https://redwingsstudio.com",
    siteName: "Redwings Studio",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/mountain-studio/hero-main.jpeg",
        width: 1200,
        height: 630,
        alt: "Redwings Studio Goa — Studio Apartment Stays at Abalone Resort, Arpora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Redwings Studio Goa — Studio Apartments in Arpora",
    description:
      "10 studio apartments in Arpora, North Goa from ₹1,950/night. Free cancellation. Book direct.",
    images: ["/mountain-studio/hero-main.jpeg"],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(lodgingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([{ name: "Home", url: SITE_URL }])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${SITE_URL}/#webpage`,
            url: SITE_URL,
            name: "Redwings Studio Goa — Studio Apartments in Arpora",
            description:
              "Book studio apartments in Arpora, North Goa. Swimming pool, free Wi-Fi, near Baga Beach. From ₹1,950/night.",
            inLanguage: "en-IN",
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#lodging` },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(homeFaqs, "/")) }}
      />

      <HomeHero />
      <Suspense fallback={<div className="section-space" />}>
        <HomeBelowFold />
      </Suspense>
      <FaqSection
        eyebrow="Guest Questions"
        title="Frequently asked questions about staying at Redwings Studio"
        description="Quick answers about location, timings, facilities, and direct booking at our Arpora, North Goa property."
        faqs={homeFaqs}
      />
    </>
  );
}
