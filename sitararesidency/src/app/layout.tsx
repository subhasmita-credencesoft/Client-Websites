import type { Metadata } from 'next';
import { Playfair_Display, Roboto, Nunito } from 'next/font/google';

import { Header } from '@/shared/layout/header';
import { Footer } from '@/shared/layout/footer';
import { CookiePanel } from '@/shared/layout/cookie-panel';
import { business, siteMetadata } from '@/core/config/business';

import '@/styles/globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? business.website,
  ),
  title: {
    default: siteMetadata.title,
    template: `%s | ${business.name}`,
  },
  description: siteMetadata.description,
  icons: {
    icon: [{ url: '/sitaralogo.jpg', type: 'image/jpeg' }],
    shortcut: ['/sitaralogo.jpg'],
    apple: [{ url: '/sitaralogo.jpg', type: 'image/jpeg' }],
  },
  openGraph: {
    title: siteMetadata.title,
    description:
      siteMetadata.description,
    type: 'website',
    locale: 'en_IN',
    siteName: business.name,
    images: [
      {
        url: '/Hotel Sitara Residency Kalamboli Reception (5).avif',
        width: 2000,
        height: 1335,
        alt: 'Luxurious hotel room with king-size bed, plush seating, modern décor, and warm lighting creating a cosy atmosphere.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description:
      siteMetadata.description,
    images: ['/Hotel Sitara Residency Kalamboli Reception (5).avif'],
  },
  robots: { index: true, follow: true },
};

const hotelSchema = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: business.name,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? business.website,
  telephone: business.phones.primary,
  email: business.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.streetAddress,
    addressLocality: business.address.locality,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: business.address.country,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className={`${playfair.variable} ${roboto.variable} ${nunito.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router: single root layout applies to every route */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
          <div className="min-h-[100dvh]">
            <Header />
            <div id="main-content">{children}</div>
            <Footer />
            <CookiePanel />
          </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }} />
      </body>
    </html>
  );
}
