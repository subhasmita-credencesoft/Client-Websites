import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";
import { ClientEnhancements } from "@/components/providers/client-enhancements";
import { WebVitals } from "@/components/providers/web-vitals";
import { StickyBookingBar } from "@/components/layout/sticky-booking-bar";
import { SkipNav } from "@/components/layout/skip-nav";
import { rootMetadata } from "@/lib/metadata";

const bodyFont = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  preload: true,
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  ...rootMetadata,
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

function serializeJsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const resortSchema = {
    "@context": "https://schema.org",
    "@type": "Resort",
    name: "The Mountain Resort in Karjat, By Redwings",
    description:
      "Private destination wedding and event venue in Karjat with stay, meals, venue access, and scenic mountain celebrations across 7 acres.",
    url: "https://themountainresorts.com",
    telephone: "+91 9833866655",
    image: "https://bookonelocal.in/cdn/DSC08769.avif",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karjat",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 18.9847,
      longitude: 73.3363,
    },
    priceRange: "₹6,500 - ₹25,000",
    starRating: {
      "@type": "Rating",
      ratingValue: "4.5",
    },
    numberOfRooms: 30,
    sameAs: [
      "https://instagram.com/themountain.karjat",
      "https://www.themountainresorts.com",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Mountain Resort in Karjat, By Redwings",
    url: "https://themountainresorts.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://themountainresorts.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://bookonelocal.in" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(resortSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSchema) }}
        />
      </head>
      <body className={`${bodyFont.variable} ${displayFont.variable} overflow-x-hidden antialiased`}>
        <SkipNav />
        {children}
        <StickyBookingBar />
        <WebVitals />
        <ClientEnhancements />
      </body>
    </html>
  );
}
