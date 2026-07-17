import type { Metadata } from "next";
import { RoomsPageClient } from "@/components/rooms/RoomsPageClient";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Rooms \u2014 Budget, Standard & Pool View Stays in Goa",
  description:
    "Browse 5 room types at Redwings Studio, Goa \u2014 Budget Double, Standard, Superior King, Pool Access & Pool View rooms from \u20b91,950/night. Check availability and book directly.",
  alternates: { canonical: "https://redwingsstudio.com/rooms" },
  openGraph: {
    title: "Rooms at Redwings Studio Goa \u2014 Budget to Pool View",
    description:
      "5 room types from \u20b91,950/night: Budget Double, Standard, Superior King, Pool Access & Pool View. Book directly.",
    images: [
      {
        url: "/mountain-studio/gallery-12.jpeg",
        width: 1200,
        height: 630,
        alt: "Rooms at Redwings Studio Goa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rooms \u2014 Redwings Studio Goa",
    description: "5 room types from \u20b91,950/night. Book directly.",
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
