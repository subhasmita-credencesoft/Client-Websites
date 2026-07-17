import type { Metadata } from "next";
import { DiningPageClient } from "./DiningPageClient";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Dining — Restaurants & Private Dining",
  description:
    "Explore dining at Redwings Studio, Goa — The Garden Restaurant, Poolside Cafe, and Bar & Lounge. Goan cuisine, casual dining, and cocktails with resort setting.",
  alternates: { canonical: "https://redwingsstudio.com/dining" },
  openGraph: {
    title: "Dining — Redwings Studio Goa",
    description: "Fine dining, all-day dining, and cocktail bar at Redwings Studio, Goa.",
    images: [
      {
        url: "/mountain-studio/gallery-09.jpeg",
        width: 1200,
        height: 630,
        alt: "Dining at Redwings Studio Goa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dining — Redwings Studio Goa",
    description: "Fine dining, all-day dining, and cocktails in Goa.",
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
