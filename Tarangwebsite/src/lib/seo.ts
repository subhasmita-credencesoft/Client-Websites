import { SITE_CONFIG } from '@/config/site.config';

export function generateResortSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Resort',
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.contact.primaryPhoneFormatted,
    email: SITE_CONFIG.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.contact.address.street,
      addressLocality: SITE_CONFIG.contact.address.locality,
      addressRegion: SITE_CONFIG.contact.address.state,
      postalCode: SITE_CONFIG.contact.address.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.contact.geo.latitude,
      longitude: SITE_CONFIG.contact.geo.longitude,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE_CONFIG.rating.score.toString(),
      reviewCount: SITE_CONFIG.rating.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    priceRange: '₹3,499 - ₹6,500',
    checkinTime: SITE_CONFIG.policies.checkInTime,
    checkoutTime: SITE_CONFIG.policies.checkOutTime,
    petsAllowed: SITE_CONFIG.policies.petFriendly,
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Kids Pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'In-house Restaurant', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: '24/7 Power Backup', value: true },
    ],
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
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
