import type { Metadata } from "next";
import { WeddingLawnsPageClient } from "./WeddingLawnsPageClient";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Wedding Lawns in Arpora Goa | Open Lawn Venues | Redwings Studio",
  description:
    "Host weddings at Redwings Studio, Arpora, Goa — open lawn spaces for Haldi, Mehendi, Sangeet, ceremonies, and receptions with scenic surroundings. Destination wedding venue near Baga Beach.",
  keywords: [
    "Wedding Lawns Arpora",
    "Open Lawn Wedding Goa",
    "Haldi Mehendi Sangeet Venue",
    "Destination Wedding Venue Goa",
    "Wedding Ceremony Arpora",
    "Redwings Studio Wedding",
    "Goa Wedding Lawns",
  ],
  alternates: { canonical: "https://redwingsstudio.com/events/wedding-lawns" },
  openGraph: {
    title: "Wedding Lawns — Redwings Studio Goa | Open Lawn Venues Arpora",
    description:
      "Open lawn wedding venues for ceremonies and receptions at Redwings Studio, Arpora, Goa.",
    images: [
      {
        url: "/mountain-studio/gallery-11.jpeg",
        width: 1200,
        height: 630,
        alt: "Wedding Lawns at Redwings Studio Goa — Arpora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Lawns — Redwings Studio Goa",
    description: "Open lawn wedding venues in Arpora, Goa.",
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
