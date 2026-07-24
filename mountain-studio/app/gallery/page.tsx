import type { Metadata } from "next";
import { GalleryPageClient } from "@/components/gallery/GalleryPageClient";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Gallery — Photos & Property Images | Redwings Studio Goa Arpora",
  description:
    "Browse 20+ photos of Redwings Studio, Arpora, Goa — studio apartments, poolside setting, exterior views, interior styling, and events. Explore our property gallery before booking.",
  keywords: [
    "Redwings Studio Gallery",
    "Hotel Photos Arpora Goa",
    "Studio Apartment Images Goa",
    "Property Gallery Arpora",
    "Hotel Interior Photos Goa",
    "Pool View Images Arpora",
  ],
  alternates: { canonical: "https://redwingsstudio.com/gallery" },
  openGraph: {
    title: "Gallery — Redwings Studio Goa | Property Photos",
    description:
      "20+ property photos: studio apartments, pool, exteriors, interiors, and events at Redwings Studio, Arpora, Goa.",
    images: [
      {
        url: "/mountain-studio/gallery-12.jpeg",
        width: 1200,
        height: 630,
        alt: "Redwings Studio Goa Property Gallery — Arpora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery — Redwings Studio Goa",
    description: "20+ property photos of Redwings Studio, Arpora, Goa.",
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
