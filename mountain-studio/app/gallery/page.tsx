import type { Metadata } from "next";
import { GalleryPageClient } from "@/components/gallery/GalleryPageClient";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Gallery — Photos & Property Images",
  description:
    "Browse 20+ photos of Redwings Studio, Goa \u2014 studio apartments, poolside setting, exterior views, interior styling, and events across 6 visual categories.",
  alternates: { canonical: "https://redwingsstudio.com/gallery" },
  openGraph: {
    title: "Gallery \u2014 Redwings Studio Goa",
    description:
      "20+ property photos: studio apartments, pool, exteriors, interiors, and events at Redwings Studio, Goa.",
    images: [
      {
        url: "/mountain-studio/gallery-12.jpeg",
        width: 1200,
        height: 630,
        alt: "Redwings Studio Goa Property Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery \u2014 Redwings Studio Goa",
    description: "20+ property photos of Redwings Studio, Goa.",
    images: ["/mountain-studio/gallery-12.jpeg"],
  },
};

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Gallery", url: `${SITE_URL}/gallery` },
            ])
          ),
        }}
      />
      <GalleryPageClient />
    </>
  );
}
