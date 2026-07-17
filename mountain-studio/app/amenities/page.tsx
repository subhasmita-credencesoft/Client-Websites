import type { Metadata } from "next";
import { AmenitiesPageClient } from "@/components/amenities/AmenitiesPageClient";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Amenities at Redwings Studio Goa \u2014 Pool, Garden & Concierge",
  description:
    "Discover amenities at Redwings Studio, Goa \u2014 infinity pool, garden lawn, fitness studio, concierge, and more. Explore all property facilities for a comfortable Goa stay.",
  alternates: { canonical: "https://redwingsstudio.com/amenities" },
  openGraph: {
    title: "Amenities \u2014 Redwings Studio Goa",
    description:
      "Infinity pool, garden lawn, fitness studio, concierge, and more at Redwings Studio, Goa.",
    images: [
      {
        url: "/mountain-studio/gallery-06.jpeg",
        width: 1200,
        height: 630,
        alt: "Amenities at Redwings Studio Goa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amenities \u2014 Redwings Studio Goa",
    description: "Infinity pool, garden, fitness studio, and concierge in Goa.",
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
