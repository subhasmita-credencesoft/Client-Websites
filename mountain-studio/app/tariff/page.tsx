import type { Metadata } from "next";
import { TariffPageClient } from "./TariffPageClient";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Room Tariff & Rates at Redwings Studio Goa — From ₹1,950/Night",
  description:
    "View room tariffs at Redwings Studio, Goa — Budget Double from ₹1,950, Standard from ₹2,100, Superior King from ₹2,500, Pool Access from ₹2,521, Pool View from ₹3,003 per night. Book directly.",
  alternates: { canonical: "https://redwingsstudio.com/tariff" },
  openGraph: {
    title: "Room Tariff — Redwings Studio Goa",
    description: "Room rates from ₹1,950/night at Redwings Studio, Goa. Budget to pool-view rooms.",
    images: [
      {
        url: "/mountain-studio/gallery-12.jpeg",
        width: 1200,
        height: 630,
        alt: "Room Tariff — Redwings Studio Goa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Room Tariff — Redwings Studio Goa",
    description: "Room rates from ₹1,950/night. Book directly.",
    images: ["/mountain-studio/gallery-12.jpeg"],
  },
};

export default function TariffPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Tariff", url: `${SITE_URL}/tariff` },
            ])
          ),
        }}
      />
      <TariffPageClient />
    </>
  );
}
