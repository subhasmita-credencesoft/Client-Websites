import type { Metadata } from "next";
import { Suspense, lazy } from "react";
import { HomeHero } from "@/components/sections/home/HomeHero";
import {
  lodgingSchema,
  websiteSchema,
  orgSchema,
  breadcrumbSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

const HomeBelowFold = lazy(
  () => import("@/components/sections/home/HomeBelowFold")
);

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

      <HomeHero />
      <Suspense fallback={<div className="section-space" />}>
        <HomeBelowFold />
      </Suspense>
    </>
  );
}
