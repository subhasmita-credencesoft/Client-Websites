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

const HomeBelowFold = lazy(() => import("@/components/sections/home/HomeBelowFold"));

export const metadata: Metadata = {
  title: "Redwings Studio Goa — Studio Apartments in Arpora, North Goa | From ₹1,950/night",
  description:
    "Book Redwings Studio, Goa — 10 owner-managed studio apartments at Abalone Resort, Gorbhat, Arpora, North Goa. Budget to pool-view rooms from ₹1,950/night. Free cancellation. Check-in 1 PM, check-out 11 AM. Direct booking with instant confirmation.",
  keywords: [
    "studio apartments Goa", "budget hotel Arpora", "North Goa hotel", "Gorbhat hotel",
    "Goa hotel near Baga Beach", "pool view room Goa", "Abalone Resort Arpora",
    "Goa hotel booking", "affordable hotel North Goa", "Redwings Studio"
  ],
  alternates: { canonical: "https://redwingsstudio.com" },
  openGraph: {
    title: "Redwings Studio Goa — Studio Apartments in Arpora, North Goa",
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
    description: "10 studio apartments in Arpora, North Goa from ₹1,950/night. Free cancellation. Book direct.",
    images: ["/mountain-studio/hero-main.jpeg"],
  },
};

export default function HomePage() {
  return (
    <>
      {/* ── Structured Data ────────────────────────────────────────────── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(lodgingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(orgSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([{ name: "Home", url: SITE_URL }])
          ),
        }}
      />

      {/* ── Page Content ───────────────────────────────────────────────── */}
      <HomeHero />
      <Suspense fallback={<div className="section-space" />}>
        <HomeBelowFold />
      </Suspense>
    </>
  );
}
