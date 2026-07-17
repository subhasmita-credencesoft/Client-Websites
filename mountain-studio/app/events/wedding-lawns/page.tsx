import type { Metadata } from "next";
import { WeddingLawnsPageClient } from "./WeddingLawnsPageClient";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Wedding Lawns at Redwings Studio Goa — Open Lawn Venues",
  description:
    "Host weddings at Redwings Studio, Goa — open lawn spaces for Haldi, Mehendi, Sangeet, ceremonies, and receptions with scenic surroundings. Up to 450 guests.",
  alternates: { canonical: "https://redwingsstudio.com/events/wedding-lawns" },
  openGraph: {
    title: "Wedding Lawns — Redwings Studio Goa",
    description: "Open lawn wedding venues for ceremonies and receptions at Redwings Studio, Goa.",
    images: [
      {
        url: "/mountain-studio/gallery-11.jpeg",
        width: 1200,
        height: 630,
        alt: "Wedding Lawns at Redwings Studio Goa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Lawns — Redwings Studio Goa",
    description: "Open lawn wedding venues in Goa.",
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
      <WeddingLawnsPageClient />
    </>
  );
}
