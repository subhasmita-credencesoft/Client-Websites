import { siteConfig } from '@/config/site';
import { formatPriceINR } from '@/utils';
import { testimonials } from '@/data/testimonials';
import type { ContactInfo } from '@/types';
import type { Room } from '@/types';

function priceRangeFromRooms(rooms: Room[]): string {
  const prices = rooms
    .map((room) => room.priceValue ?? Number(room.price.replace(/[^0-9]/g, '')))
    .filter((value) => Number.isFinite(value) && value > 0);
  if (prices.length === 0) return '₹4,229 - ₹6,500';
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `₹${formatPriceINR(min)}` : `₹${formatPriceINR(min)} - ₹${formatPriceINR(max)}`;
}

const RESORT_SAME_AS = [
  'https://maps.google.com/?cid=18346168839375566095',
  'https://www.facebook.com/p/Malhar-Baug-Resort-by-Mishitass-Element-61577539088052/',
  'https://thehotelmate.co/detail/bookingSource/GoogleHotelCenter?hotelID=2970',
  'https://bookone.io/detail/bookingSource/GoogleHotelCenter?hotelID=2970',
  'https://www.goibibo.com/hotels/malhar-baug-resort-hotel-in-alibag-4583975782768491440/',
  'https://www.agoda.com/en-in/malhar-baug-resort/hotel/alibaug-in.html',
  'https://www.easemytrip.com/hotels/alibag-emthotel-9661929/',
  'https://www.instagram.com/malhar_baug_resort/',
];

export function hotelSchema(contact: ContactInfo, rooms: Room[]) {
  const primaryPhone = contact.phone || '+919035198520';
  const primaryEmail = contact.email || 'bookings@malharbaugresort.com';

  return {
    '@context': 'https://schema.org',
    '@type': ['Resort', 'Hotel', 'LodgingBusiness'],
    '@id': `${siteConfig.url}/#hotel`,
    name: 'Malhar Baug Resort',
    alternateName: ['Malhar Baug Resort Alibaug', 'Malhar Baug Resort Nagaon'],
    description:
      'Malhar Baug Resort is a top-rated 3-star farm-style family resort in Nagaon (Palhe), Alibaug featuring an outdoor swimming pool, private family villas, air-conditioned luxury rooms, lush party lawns, kids play area, and authentic home-style Konkan dining near Nagaon Beach.',
    url: siteConfig.url,
    telephone: primaryPhone,
    email: primaryEmail,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'H.No. 3116, Palhe',
      addressLocality: 'Nagaon, Alibaug',
      addressRegion: 'Maharashtra',
      postalCode: '402204',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: contact.geo?.latitude ?? 18.6019,
      longitude: contact.geo?.longitude ?? 72.9056,
    },
    image: [
      `${siteConfig.url}/hero1.jpeg`,
      `${siteConfig.url}/hero2.jpeg`,
      `${siteConfig.url}/hero3.jpeg`,
      `${siteConfig.url}/heroimg2.jpeg`,
    ],
    priceRange: priceRangeFromRooms(rooms),
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Net Banking',
    checkinTime: '12:00',
    checkoutTime: '10:00',
    numberOfRooms: String(rooms.length > 0 ? rooms.length : 12),
    petsAllowed: false,
    starRating: {
      '@type': 'Rating',
      ratingValue: '3',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.2',
      reviewCount: '46',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: RESORT_SAME_AS,
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: t.name,
      },
      reviewBody: t.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(t.rating),
        bestRating: '5',
        worstRating: '1',
      },
    })),
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free Self Parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Home-Style Konkan Restaurant & Dining', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Lush Green Gardens & Open Lawns', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air-Conditioned Rooms & Family Villas', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Kids Play Area & Indoor/Outdoor Games', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Wedding Lawn & Corporate Event Space', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Bonfire & Barbecue on Request', value: true },
      { '@type': 'LocationFeatureSpecification', name: '100% Power Backup', value: true },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Resort Room Types & Accommodation',
      itemListElement: rooms.map((room) => ({
        '@type': 'Offer',
        name: room.title,
        price: room.priceValue ?? 4229,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `${siteConfig.url}/rooms/${room.slug}`,
      })),
    },
  };
}

export function localBusinessSchema(contact: ContactInfo) {
  const primaryPhone = contact.phone || '+919035198520';
  const primaryEmail = contact.email || 'bookings@malharbaugresort.com';

  return {
    '@context': 'https://schema.org',
    '@type': ['Resort', 'LodgingBusiness', 'LocalBusiness'],
    '@id': `${siteConfig.url}/#localbusiness`,
    name: 'Malhar Baug Resort',
    alternateName: 'Malhar Baug Resort Alibaug',
    image: `${siteConfig.url}/hero1.jpeg`,
    url: siteConfig.url,
    telephone: primaryPhone,
    email: primaryEmail,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'H.No. 3116, Palhe',
      addressLocality: 'Nagaon, Alibaug',
      addressRegion: 'Maharashtra',
      postalCode: '402204',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: contact.geo?.latitude ?? 18.6019,
      longitude: contact.geo?.longitude ?? 72.9056,
    },
    openingHours: 'Mo-Su 00:00-23:59',
    priceRange: '₹4,229 - ₹6,500',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Net Banking',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.2',
      reviewCount: '46',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: RESORT_SAME_AS,
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: t.name,
      },
      reviewBody: t.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(t.rating),
        bestRating: '5',
        worstRating: '1',
      },
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: 'Malhar Baug Resort Alibaug',
    alternateName: ['Malhar Baug Resort', 'Malhar Baug Resort Nagaon'],
    url: siteConfig.url,
    publisher: { '@id': `${siteConfig.url}/#hotel` },
    inLanguage: 'en-IN',
  };
}

export function restaurantSchema(contact: ContactInfo) {
  const primaryPhone = contact.phone || '+919035198520';

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${siteConfig.url}/restaurant/#restaurant`,
    name: 'Malhar Baug Restaurant & Konkan Dining',
    description:
      'Authentic home-style Konkan cuisine, fresh Alibaug surmai & pomfret fish thali, chicken sukka, vegetarian Maharashtrian dishes, and garden dining at Malhar Baug Resort.',
    url: `${siteConfig.url}/restaurant`,
    telephone: primaryPhone,
    servesCuisine: ['Konkani', 'Maharashtrian', 'Indian', 'Seafood'],
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'H.No. 3116, Palhe',
      addressLocality: 'Nagaon, Alibaug',
      addressRegion: 'Maharashtra',
      postalCode: '402204',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: contact.geo?.latitude ?? 18.6019,
      longitude: contact.geo?.longitude ?? 72.9056,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '22:30',
      },
    ],
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
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

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.url.startsWith('http') ? entry.url : `${siteConfig.url}${entry.url}`,
    })),
  };
}

