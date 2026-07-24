import type { Metadata } from "next";
import { OffersPageClient } from "./OffersPageClient";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Offers & Direct Booking Benefits | Redwings Studio Goa Arpora",
  description:
    "Explore direct booking benefits, group stay support, and stay planning advantages at Redwings Studio, Arpora, Goa. Get the best room rates and availability by booking directly.",
  keywords: [
    "Hotel Offers Goa",
    "Direct Booking Benefits",
    "Best Hotel Deals Arpora",
    "Group Stay Offers Goa",
    "Budget Hotel Offers North Goa",
    "Redwings Studio Offers",
    "Hotel Discounts Goa",
    "Weekend Getaway Deals",
  ],
  alternates: { canonical: "https://redwingsstudio.com/offers" },
  openGraph: {
    title: "Offers & Booking Benefits — Redwings Studio Goa",
    description:
      "Direct booking benefits, group stay support, and stay planning advantages at Redwings Studio, Arpora, Goa.",
    images: [
      {
        url: "/mountain-studio/hero-secondary.jpeg",
        width: 1200,
        height: 630,
        alt: "Offers at Redwings Studio Goa — Direct Booking Benefits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Offers — Redwings Studio Goa",
    description: "Direct booking benefits and group stay support in Goa.",
    images: ["/mountain-studio/hero-secondary.jpeg"],
  },
};

export default function OffersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Offers", url: `${SITE_URL}/offers` },
            ])
          ),
        }}
      />
      <OffersPageClient />
    </>
  );
}
