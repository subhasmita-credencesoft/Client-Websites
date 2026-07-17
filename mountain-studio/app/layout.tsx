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
  display: "swap"
});

const body = Jost({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
  display: "swap"
});

const mono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
  display: "swap"
});

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
};

// ─── Default Site-Wide Metadata ───────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://redwingsstudio.com"),
  title: {
    default: "Redwings Studio | Studio Apartment Stays in Goa",
    template: "%s | Redwings Studio Goa",
  },
  description:
    "Stay at Redwings Studio, Goa — 10 owner-managed studio apartments at Abalone Resort, Gorbhat, Goa. Budget to pool-view rooms from ₹1,950/night. Check-in 1 PM. Direct booking support.",
  keywords: [
    "redwings studio",
    "redwings studio goa",
    "studio apartments goa",
    "hotel in goa",
    "budget rooms goa",
    "pool view rooms goa",
    "abalone resort goa",
    "gorbhat goa hotel",
    "rooms in goa",
    "goa accommodation",
  ],
  authors: [{ name: "Redwings Studio" }],
  creator: "Redwings Studio",
  publisher: "Redwings Studio",
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
    title: "Redwings Studio | Studio Apartment Stays in Goa",
    description:
      "Stay at Redwings Studio, Goa — 10 owner-managed studio apartments at Abalone Resort, Gorbhat. Budget to pool-view rooms. Direct booking support.",
    images: [
      {
        url: "/mountain-studio/hero-main.jpeg",
        width: 1200,
        height: 630,
        alt: "Redwings Studio Goa — Studio Apartment Stays",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Redwings Studio | Studio Apartment Stays in Goa",
    description:
      "10 owner-managed studio apartments in Goa. Budget to pool-view rooms from ₹1,950/night. Direct booking support.",
    images: ["/mountain-studio/hero-main.jpeg"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        {/* Preconnect to external asset domains */}
        <link rel="preconnect" href="https://bookonelocal.in" />
        <link rel="dns-prefetch" href="https://bookonelocal.in" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
