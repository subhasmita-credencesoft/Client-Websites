import { SITE } from '@/data/site';
import { PolicyItem } from '@/types';

export function createBreadcrumbSchema(
  items: { name: string; url?: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const element: Record<string, unknown> = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
      };
      if (item.url) {
        element.item = item.url.startsWith('http')
          ? item.url
          : `${SITE.domain}${item.url.startsWith('/') ? item.url : `/${item.url}`}`;
      }
      return element;
    }),
  };
}

export function createFaqSchema(
  faqs: PolicyItem[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function createHotelSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.domain,
    description: SITE.description,
    image: `${SITE.domain}${SITE.ogImage}`,
    telephone: SITE.phoneReservations,
    email: SITE.emailGeneral,
    priceRange: '₹₹',
    checkinTime: '14:00',
    checkoutTime: '12:00',
    numberOfRooms: '13',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Near Phulnakhara Flyover, Bhubaneswar–Cuttack Highway (NH-16)',
      addressLocality: 'Phulnakhara, Khordha',
      addressRegion: 'Odisha',
      postalCode: '754001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '20.3844',
      longitude: '85.8603',
    },
    hasMap: 'https://maps.google.com/?q=Phulnakhara+Bhubaneswar+Cuttack+NH16',
    sameAs: [SITE.facebook, SITE.instagram],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free Car & Bus Parking (200+ vehicles)', value: true },
      { '@type': 'LocationFeatureSpecification', name: '24/7 Power Backup', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'In-House Multi-Cuisine Restaurant', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Banquet & Convention Halls', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Open-Air Wedding Lawns', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Driver Rest Area', value: true },
    ],
  };
}

export function createEventVenueSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: `${SITE.name} — Banquets & Lawns`,
    url: `${SITE.domain}/events/venues`,
    description:
      'Premier banquet halls, column-free convention spaces, and manicured open-air lawns accommodating up to 1,500+ guests on the Bhubaneswar–Cuttack corridor.',
    image: `${SITE.domain}/newedit/Luxurious Courtyard Entrance at Night.avif`,
    telephone: SITE.phoneEvents,
    maximumAttendeeCapacity: 1500,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Near Phulnakhara Flyover, Bhubaneswar–Cuttack Highway',
      addressLocality: 'Phulnakhara',
      addressRegion: 'Odisha',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '20.3844',
      longitude: '85.8603',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Column-Free 22ft Ceiling Hall', value: true },
      { '@type': 'LocationFeatureSpecification', name: '8,000 sq ft Manicured Lawn', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'In-Built LED Wall & Stage', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Dedicated Bridal & Groom Suites', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Weather-Backup Indoor Hall Guarantee', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Dedicated Parking for 200+ Vehicles', value: true },
    ],
  };
}

export function createRestaurantSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Fusion Bites at Baibhab Resorts',
    url: `${SITE.domain}/dining`,
    image: `${SITE.domain}/restaurantdining.png`,
    telephone: SITE.phoneReservations,
    servesCuisine: ['Odia', 'North Indian', 'South Indian', 'Continental', 'Vegetarian'],
    priceRange: '₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '12:30',
        closes: '15:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '19:30',
        closes: '23:00',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Near Phulnakhara Flyover, NH-16',
      addressLocality: 'Phulnakhara, Khordha',
      addressRegion: 'Odisha',
      addressCountry: 'IN',
    },
  };
}
