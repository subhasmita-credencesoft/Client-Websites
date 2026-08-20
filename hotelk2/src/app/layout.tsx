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

const KEYWORDS = [
  // Tier 1 — Commercial Intent
  'Hotel K2 Chakradharpur',
  'Hotel K2 in Chakradharpur',
  'Hotel K2 Chakradharpur booking',
  'Hotel K2 booking Chakradharpur',
  'Book Hotel K2 Chakradharpur',
  'Hotel K2 room booking',
  'Hotel K2 online booking',
  'Hotel K2 rooms Chakradharpur',
  'Hotel K2 room price Chakradharpur',
  'Hotel K2 contact Chakradharpur',
  'Hotel K2 near Chakradharpur Railway Station',
  'Hotel booking in Chakradharpur',
  'Book hotel in Chakradharpur',
  'Online hotel booking Chakradharpur',
  'Hotel rooms booking Chakradharpur',
  'Room booking in Chakradharpur',
  'Best hotel booking Chakradharpur',
  'Hotel deals Chakradharpur',
  'Best hotel deals in Chakradharpur',
  'Affordable hotel booking Chakradharpur',
  'Hotel reservation Chakradharpur',
  // Tier 2 — Best Hotel Keywords
  'Best hotel in Chakradharpur',
  'Best hotel in Chakradharpur Jharkhand',
  'Top hotel in Chakradharpur',
  'Top hotels in Chakradharpur',
  'Best place to stay in Chakradharpur',
  'Best place to stay in Chakradharpur Jharkhand',
  'Best accommodation in Chakradharpur',
  'Best accommodation in West Singhbhum',
  'Best hotel near Chakradharpur Railway Station',
  'Best hotel near Chakradharpur station',
  'Best hotel near Etwari Bazar',
  'Best hotel near Carmel School Chakradharpur',
  'Recommended hotel in Chakradharpur',
  'Popular hotel in Chakradharpur',
  'Comfortable hotel in Chakradharpur',
  'Quality hotel in Chakradharpur',
  'Affordable hotel in Chakradharpur',
  // Tier 3 — Railway Station Keywords
  'Hotel near Chakradharpur Railway Station',
  'Hotels near Chakradharpur Railway Station',
  'Hotel near Chakradharpur railway station booking',
  'Hotel rooms near Chakradharpur Railway Station',
  'AC hotel near Chakradharpur Railway Station',
  'Affordable hotel near Chakradharpur Railway Station',
  'Budget hotel near Chakradharpur Railway Station',
  'Hotel stay near Chakradharpur Railway Station',
  'Accommodation near Chakradharpur Railway Station',
  'Room booking near Chakradharpur Railway Station',
  'Hotel near railway station Chakradharpur',
  'Hotels near railway station Chakradharpur',
  // Room + Booking Keywords
  'Hotel rooms in Chakradharpur',
  'Rooms in Chakradharpur',
  'AC rooms Chakradharpur',
  'AC room booking Chakradharpur',
  'Best AC rooms in Chakradharpur',
  'AC hotel rooms Chakradharpur',
  'Hotel with AC rooms Chakradharpur',
  'Affordable rooms in Chakradharpur',
  'Hotel room rates Chakradharpur',
  'Hotel room price Chakradharpur',
  'Best rooms in Chakradharpur',
  'Comfortable rooms Chakradharpur',
  // Amenity Keywords
  'Hotel with free WiFi Chakradharpur',
  'Hotel with WiFi in Chakradharpur',
  'Free WiFi hotel Chakradharpur',
  'Best hotel with WiFi Chakradharpur',
  'Best AC hotel Chakradharpur',
  'AC hotel in Chakradharpur',
  'Hotel with power backup Chakradharpur',
  'Hotel with 24 hour power backup Chakradharpur',
  'Hotel power backup Chakradharpur',
  'Hotel with room service Chakradharpur',
  'Room service hotel Chakradharpur',
  '24 hour front desk hotel Chakradharpur',
  // Banquet / Event Keywords
  'Banquet hall in Chakradharpur',
  'Best banquet hall in Chakradharpur',
  'Banquet hall Chakradharpur',
  'Hotel banquet hall Chakradharpur',
  'Banquet hall booking Chakradharpur',
  'Banquet hall near Chakradharpur Railway Station',
  'Event venue Chakradharpur',
  'Event hall Chakradharpur',
  'Function hall Chakradharpur',
  'Party hall Chakradharpur',
  'Catering service Chakradharpur',
  'Hotel catering Chakradharpur',
  'Wedding venue Chakradharpur',
  'Marriage hall Chakradharpur',
  'Wedding hall Chakradharpur',
  'Reception venue Chakradharpur',
  'Birthday party hall Chakradharpur',
  'Corporate event venue Chakradharpur',
  'Conference venue Chakradharpur',
  // Hyperlocal Keywords
  'Hotel in Etwari Bazar Chakradharpur',
  'Hotel near Etwari Bazar Chakradharpur',
  'Hotels in Etwari Bazar',
  'Hotel near Station Link Road Chakradharpur',
  'Hotel on Station Link Road Chakradharpur',
  'Hotel near Carmel School Chakradharpur',
  'Hotel near Carmel School',
  'Rooms near Etwari Bazar',
  'Hotel booking Etwari Bazar',
  'Accommodation Etwari Bazar Chakradharpur',
  // West Singhbhum Keywords
  'Hotel in West Singhbhum',
  'Best hotel in West Singhbhum',
  'Hotels in West Singhbhum',
  'Hotel in West Singhbhum Jharkhand',
  'Best hotel in West Singhbhum Jharkhand',
  'Accommodation in West Singhbhum',
  'Hotel booking West Singhbhum',
  'Best place to stay in West Singhbhum',
  // Business / Corporate Keywords
  'Business hotel Chakradharpur',
  'Business stay Chakradharpur',
  'Hotel for business travelers Chakradharpur',
  'Corporate stay Chakradharpur',
  'Corporate hotel Chakradharpur',
  'Best business hotel Chakradharpur',
  // Family Stay Keywords
  'Family hotel Chakradharpur',
  'Family-friendly hotel Chakradharpur',
  'Family stay Chakradharpur',
  'Hotel for family stay Chakradharpur',
  'Best family hotel Chakradharpur',
  'Family accommodation Chakradharpur',
  // Budget Keywords
  'Budget hotel Chakradharpur',
  'Budget hotels in Chakradharpur',
  'Affordable hotel Chakradharpur',
  'Affordable hotels in Chakradharpur',
  'Cheap hotel Chakradharpur',
  'Cheap hotels in Chakradharpur',
  'Low price hotel Chakradharpur',
  'Hotel under 2000 Chakradharpur',
  'Budget rooms Chakradharpur',
  // Long-Tail Money Keywords
  'Best hotel to stay in Chakradharpur',
  'Best hotel for stay in Chakradharpur',
  'Where to stay in Chakradharpur',
  'Where to book hotel in Chakradharpur',
  'Best hotel for family stay in Chakradharpur',
  'Best hotel for business stay in Chakradharpur',
  'Hotel with WiFi near Chakradharpur Railway Station',
  'Hotel with room service near Chakradharpur Railway Station',
  'Hotel with power backup near Chakradharpur Railway Station',
  'Hotel booking near Chakradharpur Railway Station',
  'Hotel rooms near Chakradharpur Railway Station',
  'Best AC room in Chakradharpur',
  'Hotel room booking near Chakradharpur Railway Station',
  'Hotels in Chakradharpur',
  'Hotel in Chakradharpur',
  'Chakradharpur hotel',
  'Chakradharpur hotels',
  'Hotel K2 Chakradharpur Jharkhand',
  'Hotel in Chakradharpur Jharkhand',
  // Nearby Location — Railway Station (TOP PRIORITY)
  'Hotel near Chakradharpur Railway Station',
  'Best hotel near Chakradharpur Railway Station',
  'Hotels near Chakradharpur Railway Station',
  'Hotel near Chakradharpur Railway Station booking',
  'Hotel rooms near Chakradharpur Railway Station',
  'AC hotel near Chakradharpur Railway Station',
  'Best AC hotel near Chakradharpur Railway Station',
  'Budget hotel near Chakradharpur Railway Station',
  'Affordable hotel near Chakradharpur Railway Station',
  'Hotel stay near Chakradharpur Railway Station',
  'Room booking near Chakradharpur Railway Station',
  'Hotel accommodation near Chakradharpur Railway Station',
  'Best place to stay near Chakradharpur Railway Station',
  'Hotel near Chakradharpur railway station with WiFi',
  'Hotel near Chakradharpur railway station with room service',
  'Hotel near Chakradharpur railway station with AC rooms',
  'Hotels close to Chakradharpur Railway Station',
  'Hotels walking distance from Chakradharpur Railway Station',
  'Hotel near CKP Railway Station',
  'Hotel near CKP Station Chakradharpur',
  'Hotel near Chakradharpur Station',
  'Hotels near Chakradharpur Station',
  // Nearby Location — Etwari Bazar
  'Hotel in Etwari Bazar Chakradharpur',
  'Hotel near Etwari Bazar Chakradharpur',
  'Hotels in Etwari Bazar',
  'Best hotel in Etwari Bazar',
  'Best hotel near Etwari Bazar',
  'Hotel booking Etwari Bazar Chakradharpur',
  'Hotel rooms Etwari Bazar',
  'AC hotel Etwari Bazar',
  'Hotel stay Etwari Bazar',
  'Affordable hotel Etwari Bazar',
  'Hotel near Etwari Bazar market',
  'Accommodation near Etwari Bazar',
  'Hotel near Etwari Bazar Station Link Road',
  'Hotel booking near Etwari Bazar Chakradharpur',
  // Nearby Location — Station Link Road
  'Hotel on Station Link Road Chakradharpur',
  'Hotel near Station Link Road Chakradharpur',
  'Best hotel Station Link Road Chakradharpur',
  'Hotels on Station Link Road Chakradharpur',
  'Hotel booking Station Link Road',
  'AC hotel Station Link Road Chakradharpur',
  'Hotel rooms Station Link Road Chakradharpur',
  'Hotel near Station Road Chakradharpur',
  'Hotel near railway station road Chakradharpur',
  // Nearby Location — Carmel School
  'Hotel near Carmel School Chakradharpur',
  'Hotels near Carmel School Chakradharpur',
  'Best hotel near Carmel School',
  'Hotel near Carmel School Chakradharpur booking',
  'AC hotel near Carmel School',
  'Hotel rooms near Carmel School',
  'Accommodation near Carmel School Chakradharpur',
  'Hotel stay near Carmel School',
  // Nearby Location — Railway Colony
  'Hotel near Railway R.E. Colony Chakradharpur',
  'Hotel near Railway Colony Chakradharpur',
  'Hotels near Railway Colony Chakradharpur',
  'Best hotel near Railway Colony',
  'Hotel near South Eastern Railway Colony',
  'Hotel near SER Colony Chakradharpur',
  'Hotel near Railway Colony Chakradharpur booking',
  'AC hotel near Railway Colony',
  // Nearby Location — Chakradharpur Local Areas
  'Hotel near Chakradharpur market',
  'Hotel near Chakradharpur main market',
  'Hotel near Chakradharpur city centre',
  'Hotel near Chakradharpur town',
  'Hotel near Bara Bazar Chakradharpur',
  'Hotel near Tambaku Patti Chakradharpur',
  'Hotel near Chandmari Road Chakradharpur',
  'Hotel near NH 75 Chakradharpur',
  'Hotel near NH 20 Chakradharpur',
  'Hotel near Station Road Chakradharpur',
  // Nearby Location — Landmarks
  'Hotel near Rani Sati Mandir Chakradharpur',
  'Hotels near Rani Sati Mandir',
  'Hotel near Ambedkar Chowk Chakradharpur',
  'Hotel near Raja Arjun Singh Chowk',
  'Hotel near Rly Park Chakradharpur',
  'Hotel near Railway Children\'s Park Chakradharpur',
  'Hotel near local attractions Chakradharpur',
  // Tourist-Intent Keywords
  'Hotels near Hirni Water Falls',
  'Hotel near Hirni Waterfall Jharkhand',
  'Where to stay near Hirni Water Falls',
  'Hotels near Deori Mandir',
  'Hotel near Sun Temple Jharkhand',
  'Hotels near Dassam Falls',
  'Hotels near Perwaghagh Falls',
  'Best hotel for tourists in Chakradharpur',
  'Best place to stay in Chakradharpur',
  'Hotels for tourists in Chakradharpur',
  'Accommodation for tourists Chakradharpur',
  // Nearby Food / Restaurant Keywords
  'Hotel near restaurants in Chakradharpur',
  'Hotel near restaurants Chakradharpur',
  'Hotel near food places Chakradharpur',
  'Hotel near Bara Bazar restaurants',
  'Hotel near Chakradharpur market restaurants',
  'Stay near restaurants Chakradharpur',
].join(', ');

export const metadata: Metadata = {
  title: {
    default: `Hotel K2 — Best Hotel in Chakradharpur, Jharkhand | AC Rooms, Free Wi-Fi, Banquet Hall`,
    template: `%s | Hotel K2, Chakradharpur`,
  },
  description:
    'Hotel K2 is the best hotel in Chakradharpur, Jharkhand. Located near Chakradharpur Railway Station and Carmel School, Etwari Bazar. Offers AC rooms with free Wi-Fi, TV, geyser, power backup, 24-hour room service, banquet hall, and catering services. Book now on MakeMyTrip, OYO, or directly. Hotel booking in Chakradharpur — affordable rates, comfortable stay.',
  keywords: KEYWORDS,
  authors: [{ name: 'Hotel K2' }],
  creator: 'Hotel K2',
  publisher: 'Hotel K2',
  metadataBase: new URL(SITE.url),
  alternates: {
    canonical: '/',
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
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Hotel K2 — Best Hotel in Chakradharpur, Jharkhand',
    description:
      'Best hotel in Chakradharpur near Railway Station. AC rooms, free Wi-Fi, TV, geyser, power backup, 24-hour room service, banquet hall & catering. Book Hotel K2, Etwari Bazar, Station Link Road, Chakradharpur, Jharkhand 833102.',
    images: [
      {
        url: '/homehero1.png',
        width: 1200,
        height: 630,
        alt: 'Hotel K2 — Best Hotel in Chakradharpur, Jharkhand',
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
    title: 'Hotel K2 — Best Hotel in Chakradharpur, Jharkhand',
    description:
      'Best hotel in Chakradharpur near Railway Station. AC rooms, free Wi-Fi, banquet hall & 24-hour room service. Book now at Hotel K2.',
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
  logo: `${SITE.url}homehero1.png`,
  image: [
    `${SITE.url}homehero1.png`,
    `${SITE.url}newimages/receptionmain.png`,
    `${SITE.url}newimages/PremiumroomDoublebed.png`,
  ],
  telephone: ['+918709490824', '+919123490131'],
  email: 'hotelk2.ckp@gmail.com',
  priceRange: '₹500 - ₹2000',
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
  starRating: {
    '@type': 'Rating',
    ratingValue: 3,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.2,
    reviewCount: 150,
    bestRating: 5,
    worstRating: 1,
  },
  sameAs: [
    'https://www.instagram.com/_hotel_k2_/',
    'https://www.facebook.com/',
  ],
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best hotel in Chakradharpur, Jharkhand?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hotel K2 is the best hotel in Chakradharpur, Jharkhand. Located near Chakradharpur Railway Station at Etwari Bazar, Station Link Road, near Carmel School. It offers AC rooms with free Wi-Fi, TV, geyser, power backup, 24-hour room service, banquet hall, and catering services.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to book Hotel K2 in Chakradharpur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can book Hotel K2 directly by calling +91 8709490824 or +91 9123490131, or via WhatsApp. Hotel K2 is also available on MakeMyTrip, OYO, and Justdial for online hotel booking in Chakradharpur.',
      },
    },
    {
      '@type': 'Question',
      name: 'What amenities does Hotel K2 offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hotel K2 offers AC rooms with free Wi-Fi, TV, geyser, and power backup. Additional amenities include 24-hour room service, 24-hour front desk, banquet hall, catering services, car rental, self-drive scooty, conference hall, and baby food (on chargeable basis).',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Hotel K2 near Chakradharpur Railway Station?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Hotel K2 is located near Chakradharpur Railway Station at Etwari Bazar, Station Link Road, near Carmel School, Chakradharpur, Jharkhand 833102. It is one of the best hotels near Chakradharpur Railway Station, within walking distance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Hotel K2 have a banquet hall?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Hotel K2 has a banquet hall and offers catering services. It is a popular event venue in Chakradharpur for weddings, receptions, birthday parties, corporate events, and conferences.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the price range of Hotel K2 Chakradharpur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hotel K2 offers affordable room rates starting from ₹500. It is a budget-friendly hotel in Chakradharpur with AC rooms, free Wi-Fi, and premium amenities. Check availability by calling +91 8709490824.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Hotel K2 good for family stay in Chakradharpur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Hotel K2 is a family-friendly hotel in Chakradharpur. It offers comfortable AC rooms, 24-hour room service, power backup, and a safe environment for families visiting Jharkhand.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Hotel K2 offer business stay in Chakradharpur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Hotel K2 is a popular business hotel in Chakradharpur. It offers conference hall, free Wi-Fi, power backup, and 24-hour front desk service, making it ideal for corporate and business travelers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hotel near Chakradharpur Railway Station with AC rooms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hotel K2 is the best hotel near Chakradharpur Railway Station with AC rooms. Located at Etwari Bazar, Station Link Road, near Carmel School, it offers comfortable AC rooms with free Wi-Fi, TV, geyser, and power backup.',
      },
    },
    {
      '@type': 'Question',
      name: 'Best hotel near Etwari Bazar Chakradharpur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hotel K2 is the best hotel near Etwari Bazar, Chakradharpur. Located on Station Link Road, near Carmel School, it offers AC rooms, free Wi-Fi, 24-hour room service, and is walking distance from Etwari Bazar market.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where to stay near Hirni Water Falls Jharkhand?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hotel K2 in Chakradharpur is a great base for exploring Hirni Water Falls and other attractions in Jharkhand. Located near Chakradharpur Railway Station, it offers comfortable AC rooms and can arrange transport to nearby tourist spots.',
      },
    },
  ],
};

const NEARBY_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Places Near Hotel K2, Chakradharpur',
  description: 'Popular places and attractions near Hotel K2 in Chakradharpur, Jharkhand',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'TrainStation',
        name: 'Chakradharpur Railway Station',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chakradharpur',
          addressRegion: 'Jharkhand',
          addressCountry: 'IN',
        },
        description: 'Major railway station near Hotel K2, within walking distance',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Place',
        name: 'Etwari Bazar',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chakradharpur',
          addressRegion: 'Jharkhand',
          addressCountry: 'IN',
        },
        description: 'Vibrant local market near Hotel K2 for shopping and dining',
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'School',
        name: 'Carmel School',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chakradharpur',
          addressRegion: 'Jharkhand',
          addressCountry: 'IN',
        },
        description: 'School near Hotel K2, Chakradharpur',
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'TouristAttraction',
        name: 'Hirni Water Falls',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chakradharpur',
          addressRegion: 'Jharkhand',
          addressCountry: 'IN',
        },
        description: 'Breathtaking cascade hidden in the lush forests of Jharkhand',
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'TouristAttraction',
        name: 'Secret Water Fall',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chakradharpur',
          addressRegion: 'Jharkhand',
          addressCountry: 'IN',
        },
        description: 'An untouched gem surrounded by pristine wilderness',
      },
    },
    {
      '@type': 'ListItem',
      position: 6,
      item: {
        '@type': 'TouristAttraction',
        name: 'Nakti Dam',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chakradharpur',
          addressRegion: 'Jharkhand',
          addressCountry: 'IN',
        },
        description: 'Scenic reservoir surrounded by hills',
      },
    },
    {
      '@type': 'ListItem',
      position: 7,
      item: {
        '@type': 'HinduTemple',
        name: 'Mahadevsal Temple',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chakradharpur',
          addressRegion: 'Jharkhand',
          addressCountry: 'IN',
        },
        description: 'Ancient temple with spiritual significance',
      },
    },
    {
      '@type': 'ListItem',
      position: 8,
      item: {
        '@type': 'HinduTemple',
        name: 'Kera Mandir',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chakradharpur',
          addressRegion: 'Jharkhand',
          addressCountry: 'IN',
        },
        description: 'A serene place of worship',
      },
    },
    {
      '@type': 'ListItem',
      position: 9,
      item: {
        '@type': 'GovernmentBuilding',
        name: 'DRM Office',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chakradharpur',
          addressRegion: 'Jharkhand',
          addressCountry: 'IN',
        },
        description: 'Important administrative landmark',
      },
    },
    {
      '@type': 'ListItem',
      position: 10,
      item: {
        '@type': 'LocalBusiness',
        name: 'Etwari Bazar Market',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chakradharpur',
          addressRegion: 'Jharkhand',
          addressCountry: 'IN',
        },
        description: 'Vibrant local market for shopping',
      },
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(NEARBY_SCHEMA) }}
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
