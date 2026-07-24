import type { Metadata } from "next";
import { PoolsideCelebrationsPageClient } from "./PoolsideCelebrationsPageClient";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

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
      <PoolsideCelebrationsPageClient />
    </>
  );
}
