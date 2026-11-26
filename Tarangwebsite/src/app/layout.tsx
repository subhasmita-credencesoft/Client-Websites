import type { Metadata, Viewport } from 'next';
import '@/styles/globals.scss';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/layout/CustomCursor';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import { RESORT_DATA } from '@/data/resortData';

export const viewport: Viewport = {
  themeColor: '#122620',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.taranganresort.com'),
  title: {
    default: 'Tarangan Resort - Nagaon Alibag | Luxury Pool & Nature Resort',
    template: '%s | Tarangan Resort Nagaon-Alibag',
  },
  description:
    'Experience peaceful coastal bliss at Tarangan Resort, featuring 12 air-conditioned deluxe cottage-style rooms, a clean swimming pool, kids pool, and authentic Maharashtrian Konkani seafood, just 4.1 km from Nagaon Beach, Alibaug.',
  keywords: [
    'Tarangan Resort',
    'Tarangan Resort Nagaon Alibag',
    'Resorts in Nagaon Alibaug',
    'Best resort near Nagaon beach',
    'Resort with swimming pool in Alibaug',
    'Pet friendly resort in Alibaug',
    'Maharashtrian seafood resort Alibaug',
    'Cottages in Nagaon Alibaug',
    'Budget luxury resort Nagaon',
    'Tarangan Resort reviews',
  ],
  authors: [{ name: 'Tarangan Resort Hospitality' }],
  creator: 'Tarangan Resort',
  publisher: 'Tarangan Resort',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: 'Tarangan Resort - Nagaon-Alibag | 4.7★ Rated Nature & Pool Resort',
    description:
      'Book your coastal getaway at Tarangan Resort. 12 AC deluxe cottages, clean swimming pool, and authentic seafood thalis on Sahan Bypass Road, Nagaon Alibag.',
    url: 'https://www.taranganresort.com',
    siteName: 'Tarangan Resort Nagaon-Alibag',
    images: [
      {
        url: 'https://www.taranganresort.com/images/hero/hero-drone-sunset.jpg',
        width: 1200,
        height: 630,
        alt: 'Tarangan Resort Poolside Cottages in Nagaon Alibag',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarangan Resort - Nagaon Alibag',
    description:
      '4.7★ rated nature & pool resort in Nagaon, Alibaug. AC cottages, authentic coastal seafood, and lush greenery.',
    images: ['https://www.taranganresort.com/images/hero/hero-drone-sunset.jpg'],
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
  alternates: {
    canonical: 'https://www.taranganresort.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Rich Hotel Structured Data (Schema.org)
  const hotelSchema = {
    '@context': 'https://schema.org',
    '@type': 'Resort',
    name: RESORT_DATA.name,
    legalName: RESORT_DATA.legalName,
    description: RESORT_DATA.shortDescription,
    url: RESORT_DATA.website,
    telephone: RESORT_DATA.phone,
    email: RESORT_DATA.email,
    priceRange: '₹3,899 - ₹6,500',
    starRating: {
      '@type': 'Rating',
      ratingValue: '3',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: RESORT_DATA.rating.toString(),
      reviewCount: RESORT_DATA.totalReviews.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: RESORT_DATA.address.street,
      addressLocality: RESORT_DATA.address.locality,
      addressRegion: RESORT_DATA.address.state,
      postalCode: RESORT_DATA.address.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: RESORT_DATA.address.coordinates.latitude,
      longitude: RESORT_DATA.address.coordinates.longitude,
    },
    checkinTime: '12:00',
    checkoutTime: '10:30',
    petsAllowed: true,
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Swimming Pool',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Air Conditioning',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Free Wi-Fi',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'In-House Restaurant',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Free Parking',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Power Backup',
        value: true,
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
      </head>
      <body>
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <WhatsAppFloat />
        <Footer />
      </body>
    </html>
  );
}
