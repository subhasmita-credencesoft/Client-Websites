import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { hotelInfo } from "@/data/hotel";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(hotelInfo.websiteUrl),
  title: "Hotel Shravan Royal Inn | Luxury Stay in Jaipur",
  description:
    "Experience comfort, elegance, and hospitality at Hotel Shravan Royal Inn in Jaipur. Explore rooms, amenities, gallery, and booking details.",
  keywords: hotelInfo.seoKeywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hotel Shravan Royal Inn | Luxury Stay in Jaipur",
    description:
      "Experience comfort, elegance, and hospitality at Hotel Shravan Royal Inn in Jaipur. Explore rooms, amenities, gallery, and booking details.",
    url: "/",
    siteName: hotelInfo.name,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1600,
        height: 900,
        alt: "Hotel Shravan Royal Inn hero preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Shravan Royal Inn | Luxury Stay in Jaipur",
    description:
      "Experience comfort, elegance, and hospitality at Hotel Shravan Royal Inn in Jaipur. Explore rooms, amenities, gallery, and booking details.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} font-body bg-background text-foreground antialiased`}
      >
        <div className="relative min-h-screen overflow-x-clip bg-background">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}