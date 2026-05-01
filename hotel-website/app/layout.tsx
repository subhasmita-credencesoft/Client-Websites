import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { PropertyDataProvider } from "../components/providers/PropertyDataProvider";
import SmoothScrollProvider from "../components/providers/SmoothScrollProvider";
import GlobalGsapEffects from "../components/providers/GlobalGsapEffects";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import ToastProvider from "../components/ui/ToastProvider";
import RouteTransitionProvider from "../components/ui/RouteTransitionProvider";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "../lib/metadata";

const bodyFont = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
  weight: ["400", "500", "600", "700"],
});

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "UK's Resort",
    "Khopoli resort",
    "hotel in Khopoli",
    "resort in Khopoli",
    "weddings in Khopoli",
    "dining in Khopoli",
  ],
  referrer: "origin-when-cross-origin",
  category: "hospitality",
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
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
  icons: {
    icon: "/images/logo1.png",
    shortcut: "/images/logo1.png",
    apple: "/images/logo1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <head>
        <link rel="preconnect" href="https://bookonelocal.in" crossOrigin="" />
        <link rel="dns-prefetch" href="//bookonelocal.in" />
      </head>
      <body
        suppressHydrationWarning
        className="theme-hotel flex min-h-screen flex-col antialiased"
      >
        <ToastProvider>
          <SmoothScrollProvider>
            <PropertyDataProvider>
              <GlobalGsapEffects />
              <Header />
              <RouteTransitionProvider>
                <main className="flex-1">{children}</main>
              </RouteTransitionProvider>
              <Footer />
              <ScrollToTopButton />
            </PropertyDataProvider>
          </SmoothScrollProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
