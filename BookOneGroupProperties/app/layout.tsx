import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteContact } from "@/data/site";
import { absoluteUrl, getSiteUrl, siteSeo } from "@/lib/seo";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4EA699",
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteSeo.defaultTitle,
    template: siteSeo.titleTemplate,
  },
  description: siteSeo.defaultDescription,
  applicationName: siteSeo.siteName,
  manifest: "/manifest.webmanifest",
  keywords: [
    "luxury villas",
    "resorts",
    "holiday homes",
    "boutique stays",
    "mahabaleshwar stays",
    "My Resort Pune",
  ],
  authors: [{ name: siteSeo.siteName }],
  creator: siteSeo.siteName,
  publisher: siteSeo.siteName,
  category: "travel",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: siteSeo.siteName,
    title: siteSeo.defaultTitle,
    description: siteSeo.defaultDescription,
    images: [
      {
        url: absoluteUrl("/opengraph.jpg"),
        width: 1200,
        height: 630,
        alt: siteSeo.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteSeo.defaultTitle,
    description: siteSeo.defaultDescription,
    images: [absoluteUrl("/opengraph.jpg")],
  },
  icons: {
    icon: "/puneresortlogo.png",
    shortcut: "/puneresortlogo.png",
    apple: "/puneresortlogo.png",
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
};

const siteSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteSeo.siteName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/puneresortlogo.png"),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteContact.phoneDisplay,
      contactType: "customer service",
      email: siteContact.email,
      availableLanguage: ["English"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteSeo.siteName,
    url: absoluteUrl("/"),
    description: siteSeo.defaultDescription,
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${playfairDisplay.variable}`}
        suppressHydrationWarning
      >
        <JsonLd data={siteSchema} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
