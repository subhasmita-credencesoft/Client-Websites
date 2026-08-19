import type { Metadata } from 'next';
import { Lora, Montserrat } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Preloader } from '@/components/ui/Preloader';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { SITE } from '@/data/site';
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
  title: `${SITE.name} | ${SITE.location}`,
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    images: [`${SITE.url}homehero1.png`],
    type: 'website',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: SITE.name,
  url: SITE.url,
  image: `${SITE.url}homehero1.png`,
  telephone: '+918709490824',
  email: 'hotelk2.ckp@gmail.com',
  priceRange: '₹₹',
  description: SITE.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'K2 Complex, Etwari Bazar, Station Link Road',
    addressLocality: 'Chakradharpur',
    addressRegion: 'Jharkhand',
    postalCode: '833102',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 21.475317,
    longitude: 84.576825,
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Restaurant', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Room Service', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Car Rental', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Self Drive Scooty', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Gym', value: true },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lora.variable}`}>
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
        <WhatsAppButton />
      </body>
    </html>
  );
}
