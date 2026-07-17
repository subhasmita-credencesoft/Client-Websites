import type { Metadata } from "next";
import { PicnicPageClient } from "./PicnicPageClient";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Picnic Experiences — Family & Corporate Outdoor Events",
  description:
    "Plan open-air picnic experiences at Redwings Studio, Goa — family outings, corporate lawn events, and curated outdoor gatherings with resort setting and concierge support.",
  alternates: { canonical: "https://redwingsstudio.com/picnic" },
  openGraph: {
    title: "Picnic Experiences — Redwings Studio Goa",
    description: "Family picnics, corporate lawn events, and curated outdoor gatherings at Redwings Studio, Goa.",
    images: [
      {
        url: "/mountain-studio/hero-secondary.jpeg",
        width: 1200,
        height: 630,
        alt: "Picnic Experiences at Redwings Studio Goa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Picnic Experiences — Redwings Studio Goa",
    description: "Family picnics and corporate lawn events in Goa.",
    images: ["/mountain-studio/hero-secondary.jpeg"],
  },
};

export default function PicnicPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Picnic", url: `${SITE_URL}/picnic` },
            ])
          ),
        }}
      />
      <PicnicPageClient />
    </>
  );
}
