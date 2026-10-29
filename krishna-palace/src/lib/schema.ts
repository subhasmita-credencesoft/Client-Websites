import { DEFAULT_ROOMS } from '@/data/rooms';
import { hotel } from '@/data/site';
import type { FaqItem } from '@/data/faqs';
import type { RoomDetail, RoomOffer } from '@/types/hotel';

export function getHotelSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': 'https://krishnapalacehotel.com/#hotel',
    name: 'Hotel Krishna Palace',
    alternateName: [
      'Krishna Palace Hotel',
      'Hotel Krishna Palace Hospet',
      'Krishna Palace Hotel Hosapete',
    ],
    url: 'https://krishnapalacehotel.com/',
    logo: 'https://krishnapalacehotel.com/logo.jpg',
    image: [
      'https://krishnapalacehotel.com/facecadeimage.avif',
      'https://krishnapalacehotel.com/DSC_2597.avif',
      'https://krishnapalacehotel.com/images/13-kp-hosapete-suit-room-1.jpg',
      'https://krishnapalacehotel.com/images/05-kp-hosapete-16.jpg',
      'https://krishnapalacehotel.com/images/22-kp-hosapete-9.jpg',
      'https://krishnapalacehotel.com/compressed_FOC00707_converted.jpg',
    ],
    description:
      'Hotel Krishna Palace in Hosapete, Karnataka, offers accommodation, dining and banquet facilities for visitors to the Hampi heritage region.',
    telephone: '+91-90356-80385',
    email: 'reservations@krishnapalacehotel.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Station Road',
      addressLocality: 'Hosapete',
      addressRegion: 'Karnataka',
      postalCode: '583201',
      addressCountry: 'IN',
    },
    checkinTime: '12:00:00',
    checkoutTime: '12:00:00',
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Complimentary Breakfast', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Multi-Cuisine Restaurant', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Bar & Lounge', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Banquet & Conference Hall', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: '24-Hour Room Service', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Fitness Center & Gym', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Satellite TV', value: true },
      { '@type': 'LocationFeatureSpecification', name: '24-Hour Front Desk', value: true },
    ],
  };
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://krishnapalacehotel.com/#website',
    url: 'https://krishnapalacehotel.com/',
    name: 'Hotel Krishna Palace',
    publisher: {
      '@id': 'https://krishnapalacehotel.com/#hotel',
    },
    inLanguage: 'en-IN',
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getFaqSchema(faqs: FaqItem[]) {
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

export function getRestaurantSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': 'https://krishnapalacehotel.com/dining/fiesta/#restaurant',
    name: 'Fiesta All-Day Dining',
    url: 'https://krishnapalacehotel.com/dining/fiesta/',
    description:
      'Welcoming all-day dining restaurant at Hotel Krishna Palace in Hosapete serving South Indian breakfasts, Indian specialties and multi-cuisine meals.',
    servesCuisine: ['South Indian', 'North Indian', 'Multi-Cuisine'],
    telephone: '+91-90356-80385',
    containedInPlace: {
      '@id': 'https://krishnapalacehotel.com/#hotel',
    },
  };
}

export function getBarSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    '@id': 'https://krishnapalacehotel.com/dining/madira/#bar',
    name: 'Madira The Bar & Lounge',
    url: 'https://krishnapalacehotel.com/dining/madira/',
    description:
      'Refined bar and lounge at Hotel Krishna Palace in Hosapete offering spirits, cocktails, and North Indian appetizers in an intimate wood-paneled setting.',
    openingHours: 'Mo-Su 10:00-23:00',
    telephone: '+91-90356-80385',
    containedInPlace: {
      '@id': 'https://krishnapalacehotel.com/#hotel',
    },
  };
}

export function getBanquetSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    '@id': 'https://krishnapalacehotel.com/banquet/#venue',
    name: 'Hotel Krishna Palace Banquet Hall',
    url: 'https://krishnapalacehotel.com/banquet/',
    description:
      'Multipurpose event and conference hall in Hosapete with 300+ guest capacity, full catering support, and audiovisual facilities for corporate meets and celebrations.',
    maximumAttendeeCapacity: 300,
    telephone: '+91-90356-80385',
    containedInPlace: {
      '@id': 'https://krishnapalacehotel.com/#hotel',
    },
  };
}

export function getRoomsCatalogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: DEFAULT_ROOMS.map((room, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'HotelRoom',
        name: room.name,
        description: room.description,
        url: `https://krishnapalacehotel.com/rooms-rates/${room.id}/`,
        occupancy: {
          '@type': 'QuantitativeValue',
          maxValue: room.maxOccupancy ?? 2,
        },
        containedInPlace: {
          '@id': 'https://krishnapalacehotel.com/#hotel',
        },
      },
    })),
  };
}

export function getSingleRoomSchema(room: RoomDetail | RoomOffer) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: room.name,
    description: room.description,
    url: `https://krishnapalacehotel.com/rooms-rates/${room.id}/`,
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: room.maxOccupancy ?? 2,
    },
    containedInPlace: {
      '@id': 'https://krishnapalacehotel.com/#hotel',
    },
    offers: {
      '@type': 'Offer',
      price: room.price ?? 3500,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: hotel.bookingUrl,
    },
  };
}
