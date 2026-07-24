import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Mono, Jost } from "next/font/google";
import "react-day-picker/dist/style.css";
import "@/app/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppProviders } from "@/components/providers/AppProviders";
import { FloatingCTA } from "@/components/ui/FloatingCTA";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "600"],
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://redwingsstudio.com"),
  title: {
    default:
      "Redwings Studio Goa | Studio Apartments in Arpora Near Baga Beach",
    template: "%s | Redwings Studio Goa",
  },
  description:
    "Book your stay at Redwings Studio Goa in Arpora. Comfortable studio apartments with swimming pool access, free Wi-Fi, air conditioning, and easy access to Baga, Calangute, and Anjuna beaches. Ideal for couples, families, and budget travelers. Rooms from ₹1,950/night.",
  keywords: [
    "Redwings Studio Goa",
    "Redwings Studio Arpora",
    "Studio Apartments in Goa",
    "Budget Stay in Goa",
    "Homestay in Goa",
    "Hotel in Arpora Goa",
    "Stay Near Baga Beach",
    "Budget Hotel Near Baga Beach",
    "Best Homestay in Arpora",
    "Affordable Stay in Goa",
    "Vacation Rental Goa",
    "Apartments in North Goa",
    "Hotel Near Calangute Beach",
    "Hotel Near Anjuna Beach",
    "Pool View Rooms Goa",
    "Family Stay in Goa",
    "Couple Friendly Hotel Goa",
    "Studio Apartment Near Baga",
    "Budget Resort in North Goa",
    "Swimming Pool Hotel Goa",
    "Free WiFi Hotel Goa",
    "Free Parking Goa",
  ],
  authors: [{ name: "Redwings Studio", url: "https://redwingsstudio.com" }],
  creator: "Redwings Studio",
  publisher: "Redwings Studio",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://redwingsstudio.com",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://redwingsstudio.com",
    siteName: "Redwings Studio",
    title:
      "Redwings Studio Goa | Studio Apartments in Arpora Near Baga Beach",
    description:
      "Book your stay at Redwings Studio Goa in Arpora. Studio apartments with swimming pool, free Wi-Fi, and easy access to Baga, Calangute, and Anjuna beaches. From ₹1,950/night.",
    images: [
      {
        url: "/mountain-studio/hero-main.jpeg",
        width: 1200,
        height: 630,
        alt: "Redwings Studio Goa — Studio Apartment Stays at Abalone Resort, Arpora",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Redwings Studio Goa | Studio Apartments in Arpora",
    description:
      "Studio apartments in Arpora, North Goa from ₹1,950/night. Swimming pool, free Wi-Fi, near Baga Beach. Book direct.",
    images: ["/mountain-studio/hero-main.jpeg"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://bookonelocal.in" />
        <link rel="dns-prefetch" href="https://bookonelocal.in" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[140] focus:rounded-full focus:bg-gold focus:px-4 focus:py-3 focus:text-xs focus:uppercase focus:tracking-[0.28em] focus:text-dark"
        >
          Skip to main content
        </a>
        <AppProviders>
          <Navbar />
          <main id="main-content" className="overflow-hidden pb-16 lg:pb-0">
            {children}
          </main>
          <Footer />
          <FloatingCTA />
        </AppProviders>
      </body>
    </html>
  );
}
