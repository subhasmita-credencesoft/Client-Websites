import type { Metadata } from 'next';
import { Playfair_Display, Roboto, Nunito } from 'next/font/google';

import { Header } from '@/shared/layout/header';
import { Footer } from '@/shared/layout/footer';
import { CookiePanel } from '@/shared/layout/cookie-panel';
import { JsonLdScript } from '@/shared/ui/json-ld';
import { business, siteMetadata } from '@/core/config/business';
import { OG_IMAGE, SITE_URL } from '@/core/lib/seo';

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteMetadata.title,
    template: `%s | ${business.name}`,
  },
  description: siteMetadata.description,
  applicationName: business.name,
  generator: 'Next.js',
  authors: [{ name: business.name, url: SITE_URL }],
  creator: business.name,
  publisher: business.name,
  category: 'Hotel',
  keywords: [
    'Hotel Sitara Residency',
    'Hotel in Kalamboli',
    'Hotels in Navi Mumbai',
    'Hotel near Panvel',
    'Hotel near Kalamboli Railway Station',
    'Hotel near Navi Mumbai Airport',
    'Hotel near Mumbai Pune Expressway',
    'Accommodation in Kalamboli Navi Mumbai',
    'Budget hotel Navi Mumbai',
    'Best hotel in Kalamboli',
    'Family hotel Navi Mumbai',
    'Business hotel Navi Mumbai',
    'Rooms in Kalamboli',
    'Stay near Panvel',
    'Hotel near JNPT Port',
    'Hotel near Kalamboli Steel Market',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/sitaralogo.jpg', type: 'image/jpeg' },
    ],
    shortcut: ['/favicon-32x32.png'],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    type: 'website',
    locale: 'en_IN',
    siteName: business.name,
    url: SITE_URL,
    images: [{ ...OG_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

/* -------------------------------------------------------------------------- */
/*  Site-wide structured data                                                 */
/* -------------------------------------------------------------------------- */

const hotelSchema = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  '@id': `${SITE_URL}/#hotel`,
  name: business.name,
  alternateName: business.shortName,
  description: siteMetadata.description,
  url: SITE_URL,
  logo: `${SITE_URL}${business.logo}`,
  image: [`${SITE_URL}/og-image.jpg`],
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
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 18.9986,
    longitude: 73.0961,
  },
  hashtag: '#HotelSitaraResidency',
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Credit Card, Debit Card, UPI',
  starRating: {
    '@type': 'Rating',
    ratingValue: '3',
    bestRating: '5',
  },
  amenityFeature: business.amenities.map((amenity) => ({
    '@type': 'LocationFeatureSpecification',
    name: amenity,
    value: true,
  })),
  sameAs: [business.social.facebook, business.social.instagram],
  checkinTime: '12:00',
  checkoutTime: '11:00',
  numberOfRooms: 20,
  petsAllowed: false,
  smokingAllowed: false,
  hasMap: business.mapUrl,
  potentialAction: {
    '@type': 'ReserveAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: business.bookingUrl,
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform',
      ],
    },
    result: { '@type': 'LodgingReservation', name: 'Room reservation' },
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: business.name,
  description: siteMetadata.description,
  publisher: { '@id': `${SITE_URL}/#hotel` },
  inLanguage: 'en-IN',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: business.name,
  url: SITE_URL,
  logo: `${SITE_URL}${business.logo}`,
  email: business.email,
  telephone: business.phones.primary,
  sameAs: [business.social.facebook, business.social.instagram],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: business.phones.primary,
      contactType: 'reservations',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi', 'mr'],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${roboto.variable} ${nunito.variable}`}>
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
        <JsonLdScript data={[hotelSchema, websiteSchema, organizationSchema]} />
      </body>
    </html>
  );
}
