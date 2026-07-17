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
  title: "Redwings Studio | Studio Apartment Stays in Goa",
  description:
    "Stay at Redwings Studio, Goa — 10 owner-managed studio apartments at Abalone Resort, Gorbhat, Goa. Budget to pool-view rooms from ₹1,950/night. Check-in 1 PM, check-out 11 AM. Direct booking support.",
  alternates: { canonical: "https://redwingsstudio.com" },
  openGraph: {
    title: "Redwings Studio | Studio Apartment Stays in Goa",
    description:
      "10 owner-managed studio apartments at Abalone Resort, Gorbhat, Goa. Budget to pool-view rooms from ₹1,950/night. Direct booking support.",
    url: "https://redwingsstudio.com",
    images: [
      {
        url: "/mountain-studio/hero-main.jpeg",
        width: 1200,
        height: 630,
        alt: "Redwings Studio Goa — Studio Apartment Stays",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Redwings Studio | Studio Apartment Stays in Goa",
    description: "10 owner-managed studio apartments in Goa. Budget to pool-view rooms. Direct booking support.",
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
