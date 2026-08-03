export function hotelSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: 'Malhar Baug Resort',
    description: 'Peaceful nature retreat located near Nagaon Beach, Alibaug offering luxury rooms, villas, swimming pool, garden, and authentic cuisine.',
    url: 'https://malharbaugresort.com',
    telephone: '+919876543210',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Palhe, Nagaon',
      addressLocality: 'Alibaug',
      addressRegion: 'Maharashtra',
      postalCode: '402201',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 18.6553,
      longitude: 72.8772,
    },
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200',
    priceRange: '₹4,500 - ₹15,000',
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool' },
      { '@type': 'LocationFeatureSpecification', name: 'Restaurant' },
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi' },
      { '@type': 'LocationFeatureSpecification', name: 'Parking' },
      { '@type': 'LocationFeatureSpecification', name: 'Garden' },
      { '@type': 'LocationFeatureSpecification', name: 'Room Service' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '156',
      bestRating: '5',
    },
    checkinTime: '12:00',
    checkoutTime: '10:00',
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Malhar Baug Resort',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200',
    '@id': 'https://malharbaugresort.com',
    url: 'https://malharbaugresort.com',
    telephone: '+919876543210',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Palhe, Nagaon',
      addressLocality: 'Alibaug',
      addressRegion: 'Maharashtra',
      postalCode: '402201',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 18.6553,
      longitude: 72.8772,
    },
    openingHours: 'Mo-Su 00:00-23:59',
    priceRange: '₹₹₹',
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
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function reviewSchema(reviews: { name: string; reviewBody: string; ratingValue: number }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: {
      '@type': 'Hotel',
      name: 'Malhar Baug Resort',
    },
    ratingValue: reviews.length > 0 ? (reviews.reduce((s, r) => s + r.ratingValue, 0) / reviews.length).toFixed(1) : '4.8',
    bestRating: '5',
    reviewCount: reviews.length || 156,
  };
}
