import type { Metadata } from "next";
import { AmenitiesPageClient } from "@/components/amenities/AmenitiesPageClient";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Amenities at Redwings Studio Goa | Pool, Garden & Free WiFi in Arpora",
  description:
    "Discover amenities at Redwings Studio, Arpora, Goa — swimming pool, free Wi-Fi, in-house dining, garden lawn, fitness area, bar & lounge, event space, and free parking. Ideal for couples, families, and budget travelers.",
  keywords: [
    "Swimming Pool Hotel Goa",
    "Free WiFi Hotel Goa",
    "Free Parking Goa",
    "Amenities Redwings Studio",
    "Hotel Amenities Arpora",
    "Pool Access Room Goa",
    "Garden Lawn Hotel Goa",
    "Bar Lounge Arpora",
    "In-House Dining Goa",
    "Fitness Area Hotel Goa",
  ],
  alternates: { canonical: "https://redwingsstudio.com/amenities" },
  openGraph: {
    title: "Amenities — Redwings Studio Goa | Pool, Garden & Free WiFi",
    description:
      "Swimming pool, free Wi-Fi, garden lawn, fitness area, bar & lounge, and more at Redwings Studio, Arpora, Goa.",
    images: [
      {
        url: "/mountain-studio/gallery-06.jpeg",
        width: 1200,
        height: 630,
        alt: "Amenities at Redwings Studio Goa — Swimming Pool and Garden",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amenities — Redwings Studio Goa",
    description:
      "Swimming pool, free Wi-Fi, garden lawn, fitness area in Arpora, Goa.",
    images: ["/mountain-studio/gallery-06.jpeg"],
  },
};

export default function AmenitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Amenities", url: `${SITE_URL}/amenities` },
            ])
          ),
        }}
      />
      <AmenitiesPageClient />
    </>
  );
}
