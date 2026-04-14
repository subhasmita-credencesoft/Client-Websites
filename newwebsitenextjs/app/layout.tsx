import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { ClientEnhancements } from "@/components/providers/client-enhancements";
import { WebVitals } from "@/components/providers/web-vitals";
import { heroBackgroundUrls } from "@/lib/data/content/media-assets";
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
    url: "https://mountain-resort.netlify.app",
    telephone: "+91 9833866655",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karjat",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://bookonelocal.in" crossOrigin="anonymous" />
        <link rel="preload" as="image" href={heroBackgroundUrls[0]} fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(resortSchema) }}
        />
      </head>
      <body className={`${bodyFont.variable} ${displayFont.variable} overflow-x-hidden antialiased`} suppressHydrationWarning>
        {children}
        <WebVitals />
        <ClientEnhancements />
      </body>
    </html>
  );
}
