import type { Metadata } from 'next';
import { Lora, Montserrat } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Preloader } from '@/components/ui/Preloader';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { FloatingActions } from '@/components/ui/FloatingActions';
import { SITE } from '@/data/site';
import { SITE_KEYWORDS } from '@/data/seo';
import './globals.scss';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `Hotel K2 — Hotel in Chakradharpur, Jharkhand | AC Rooms, Free Wi-Fi`,
    template: `%s | Hotel K2, Chakradharpur`,
  },
  description:
    'Hotel K2 is a hotel in Chakradharpur, Jharkhand, located near Chakradharpur Railway Station at Etwari Bazar, Station Link Road, near Carmel School. AC rooms with free Wi-Fi, TV, geyser, power backup, 24-hour room service, banquet hall, and conference hall. Hotel booking in Chakradharpur at affordable rates.',
  keywords: SITE_KEYWORDS.join(', '),
  authors: [{ name: 'Hotel K2' }],
  creator: 'Hotel K2',
  publisher: 'Hotel K2',
  metadataBase: new URL(SITE.url),
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
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Hotel K2 — Hotel in Chakradharpur, Jharkhand',
    description:
      'Hotel in Chakradharpur near Railway Station. AC rooms, free Wi-Fi, TV, geyser, power backup, 24-hour room service, banquet hall & conference hall. Book Hotel K2, Etwari Bazar, Station Link Road, Chakradharpur, Jharkhand 833102.',
    images: [
      {
        url: '/homehero1.png',
        width: 1200,
        height: 630,
        alt: 'Hotel K2 — Hotel in Chakradharpur, Jharkhand',
      },
      {
        url: '/newimages/receptionmain.png',
        width: 1200,
        height: 630,
        alt: 'Hotel K2 Reception — Chakradharpur',
      },
      {
        url: '/newimages/PremiumroomDoublebed.png',
        width: 1200,
        height: 630,
        alt: 'Hotel K2 AC Room — Chakradharpur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotel K2 — Hotel in Chakradharpur, Jharkhand',
    description:
      'Hotel in Chakradharpur near Railway Station. AC rooms, free Wi-Fi, banquet hall & 24-hour room service. Book now at Hotel K2.',
    images: ['/homehero1.png'],
    creator: '@hotelk2',
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: SITE.name,
  alternateName: ['Hotel K2 Chakradharpur', 'Hotel K2 in Chakradharpur', 'Hotel K2 Jharkhand'],
  url: SITE.url,
  logo: `${SITE.url}favicon.png`,
  image: [
    `${SITE.url}homehero1.png`,
    `${SITE.url}newimages/receptionmain.png`,
    `${SITE.url}newimages/PremiumroomDoublebed.png`,
  ],
  telephone: ['+918709490824', '+919123490131'],
  email: 'hotelk2.ckp@gmail.com',
  priceRange: '₹999 - ₹2150',
  description: SITE.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'K2 Complex, Etwari Bazar, Station Link Road, near Carmel School',
    addressLocality: 'Chakradharpur',
    addressRegion: 'Jharkhand',
    postalCode: '833102',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 22.670806,
    longitude: 85.630322,
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'AC Rooms', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'TV', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Geyser', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Power Backup', value: true },
    { '@type': 'LocationFeatureSpecification', name: '24-Hour Room Service', value: true },
    { '@type': 'LocationFeatureSpecification', name: '24-Hour Front Desk', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Banquet Hall', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Catering Service', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Car Rental', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Self Drive Scooty', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Conference Hall', value: true },
  ],
  hasMap: SITE.mapEmbedSrc,
  checkinTime: '12:00',
  checkoutTime: '11:00',
  sameAs: [
    'https://www.instagram.com/_hotel_k2_/',
    'https://www.facebook.com/',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lora.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#9a4a34" />
        <meta name="geo.region" content="IN-JH" />
        <meta name="geo.placename" content="Chakradharpur" />
        <meta name="geo.position" content="22.670806;85.630322" />
        <meta name="ICBM" content="22.670806, 85.630322" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
        />
        <Preloader />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ScrollToTop />
        <FloatingActions />
      </body>
    </html>
  );
}
