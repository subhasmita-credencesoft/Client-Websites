import type { Metadata } from "next";
import { RoomsPageClient } from "@/components/rooms/RoomsPageClient";
import {
  breadcrumbSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Rooms in Arpora Goa — Budget, Standard & Pool View Stays | Redwings Studio",
  description:
    "Browse 5 room types at Redwings Studio, Goa — Budget Double from ₹1,950, Standard, Superior King, Pool Access & Pool View rooms. Studio apartments in Arpora near Baga Beach with free Wi-Fi, pool access, and direct booking. Check availability.",
  keywords: [
    "Rooms in Arpora",
    "Budget Room Goa",
    "Standard Room Arpora",
    "Pool View Room Goa",
    "Superior King Room Goa",
    "Studio Apartment Arpora",
    "Hotel Rooms Near Baga Beach",
    "Budget Hotel Rooms Goa",
    "Rooms in North Goa",
    "Affordable Stay Rooms Arpora",
    "Redwings Studio Rooms",
  ],
  alternates: { canonical: "https://redwingsstudio.com/rooms" },
  openGraph: {
    title: "Rooms at Redwings Studio Goa — Budget to Pool View",
    description:
      "5 room types from ₹1,950/night: Budget Double, Standard, Superior King, Pool Access & Pool View. Studio apartments in Arpora, Goa.",
    images: [
      {
        url: "/mountain-studio/gallery-12.jpeg",
        width: 1200,
        height: 630,
        alt: "Rooms at Redwings Studio Goa — Studio Apartments in Arpora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rooms — Redwings Studio Goa",
    description:
      "5 room types from ₹1,950/night in Arpora, Goa. Book directly.",
    images: ["/mountain-studio/gallery-12.jpeg"],
  },
};

export default function RoomsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Rooms", url: `${SITE_URL}/rooms` },
            ])
          ),
        }}
      />
      <RoomsPageClient />
    </>
  );
}
