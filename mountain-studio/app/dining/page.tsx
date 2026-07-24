import type { Metadata } from "next";
import { DiningPageClient } from "./DiningPageClient";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Dining at Redwings Studio Goa | Restaurants & Private Dining in Arpora",
  description:
    "Explore dining at Redwings Studio, Arpora, Goa — The Garden Restaurant with Goan cuisine, Poolside Cafe for casual dining, and Bar & Lounge for cocktails. Resort dining near Baga Beach.",
  keywords: [
    "Dining Arpora Goa",
    "Restaurant Near Baga Beach",
    "Goan Cuisine Hotel",
    "Poolside Cafe Goa",
    "Bar Lounge Arpora",
    "Hotel Dining Goa",
    "Redwings Studio Restaurant",
    "Private Dining Goa",
  ],
  alternates: { canonical: "https://redwingsstudio.com/dining" },
  openGraph: {
    title: "Dining — Redwings Studio Goa | Restaurants & Cocktails",
    description:
      "Goan cuisine, casual dining, and cocktails at Redwings Studio, Arpora, Goa. The Garden Restaurant, Poolside Cafe, and Bar & Lounge.",
    images: [
      {
        url: "/mountain-studio/gallery-09.jpeg",
        width: 1200,
        height: 630,
        alt: "Dining at Redwings Studio Goa — Restaurant and Bar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dining — Redwings Studio Goa",
    description: "Goan cuisine, casual dining, and cocktails in Arpora, Goa.",
    images: ["/mountain-studio/gallery-09.jpeg"],
  },
};

export default function DiningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Dining", url: `${SITE_URL}/dining` },
            ])
          ),
        }}
      />
      <DiningPageClient />
    </>
  );
}
