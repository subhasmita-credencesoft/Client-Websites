import { siteConfig } from '@/lib/site';
import type { ContactInfo } from '@/lib/api';
import type { Room } from '@/types';

function priceRangeFromRooms(rooms: Room[]): string {
  const prices = rooms
    .map((room) => room.priceValue ?? Number(room.price.replace(/[^0-9]/g, '')))
    .filter((value) => Number.isFinite(value) && value > 0);
  if (prices.length === 0) return '₹₹₹';
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const formatter = new Intl.NumberFormat('en-IN');
  return min === max ? `₹${formatter.format(min)}` : `₹${formatter.format(min)} - ₹${formatter.format(max)}`;
}

export function hotelSchema(contact: ContactInfo, rooms: Room[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: siteConfig.name,
    description:
      'Family-friendly resort in Nagaon, Alibaug offering luxury rooms, private villas, swimming pool, gardens, and home-style Konkan cuisine near Nagaon Beach.',
    url: siteConfig.url,
    telephone: contact.phone,
    email: contact.email,
    address: { ...contact.address },
    geo: { ...contact.geo },
    image: `${siteConfig.url}/heroimg1.jpeg`,
    priceRange: priceRangeFromRooms(rooms),
    checkinTime: '12:00',
    checkoutTime: '10:00',
    numberOfRooms: String(rooms.length),
    petsAllowed: false,
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool' },
      { '@type': 'LocationFeatureSpecification', name: 'Restaurant' },
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi' },
      { '@type': 'LocationFeatureSpecification', name: 'Free Parking' },
      { '@type': 'LocationFeatureSpecification', name: 'Garden' },
      { '@type': 'LocationFeatureSpecification', name: 'Room Service' },
      { '@type': 'LocationFeatureSpecification', name: 'Kids Play Area' },
      { '@type': 'LocationFeatureSpecification', name: 'Event Lawn' },
    ],
  };
}

export function localBusinessSchema(contact: ContactInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'LodgingBusiness'],
    '@id': `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    image: `${siteConfig.url}/heroimg1.jpeg`,
    url: siteConfig.url,
    telephone: contact.phone,
    address: { ...contact.address },
    geo: { ...contact.geo },
    openingHours: 'Mo-Su 00:00-23:59',
    priceRange: '₹₹₹',
    sameAs: [
      'https://www.instagram.com/malhar_baug_resort/',
      'https://www.facebook.com/p/Malharbaug-Resort-61584448151255/',
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { '@id': `${siteConfig.url}/#localbusiness` },
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
      item: entry.url === '/' ? `${siteConfig.url}/` : `${siteConfig.url}${entry.url}/`,
    })),
  };
}
