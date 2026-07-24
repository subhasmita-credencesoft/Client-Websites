/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async'
import { contactDetails, rooms, testimonials, services, bookingRoomOptions } from '../data/siteContent'

import { SITE_URL } from '../config/site'
const HOTEL_PHONE = contactDetails.phone.replace(/\s/g, '')
const HOTEL_IMAGE = `${SITE_URL}/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-front-pic-4.avif`

const hotelSchema = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  '@id': `${SITE_URL}/#hotel`,
  name: 'Hotel Rama Hindustani',
  alternateName: 'Hotel Rama Hindustani Jaipur',
  description: 'Budget family hotel in Pratap Nagar Jaipur near Airport, JECC, and Sanganer Railway Station. AC rooms, free WiFi, free parking, vegetarian restaurant.',
  url: SITE_URL,
  telephone: HOTEL_PHONE,
  email: contactDetails.email,
  image: HOTEL_IMAGE,
  logo: `${SITE_URL}/hotel-ramahindustani-image/rama-hindustanilogo.avif`,
  priceRange: '\u20b9\u20b9',
  currencyAccepted: 'INR',
  paymentAccepted: 'Cash, Credit Card, Debit Card, UPI',
  sameAs: [
    'https://www.instagram.com/rama_hindustani_jaipur_comfy',
    'https://www.facebook.com/people/Hotel-Rama-Hindustani/61566712879582/',
    'https://www.tripadvisor.com/Hotel_Review-g304555-d27804757-Reviews-Hotel_Rama_Hindustani-Jaipur_Rajasthan.html',
    'https://www.google.com/maps/place/Hotel+Rama+Hindustani/@26.8004,75.7890,17z',
  ],
  hasMap: 'https://maps.google.com/?q=Hotel+Rama+Hindustani+Pratap+Nagar+Jaipur',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '34-B1-B2, Haldighati Marg, Tonk Rd',
    addressLocality: 'Pratap Nagar',
    addressRegion: 'Rajasthan',
    addressCountry: 'IN',
    postalCode: '302033',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 26.8004,
    longitude: 75.7890,
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Hotel Room Categories',
    itemListElement: rooms.map((room) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'HotelRoom',
        name: room.name,
        description: room.description,
        occupancy: {
          '@type': 'QuantitativeValue',
          minValue: room.minimumOccupancy,
          maxValue: room.maximumOccupancy,
        },
        numberOfRooms: room.noOfRooms,
      },
      price: room.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    })),
  },
  amenityFeature: services.map((s) => ({
    '@type': 'LocationFeatureSpecification',
    name: s.name,
    value: true,
  })),
  aggregateRating: testimonials.length > 0 ? {
    '@type': 'AggregateRating',
    ratingValue: String((testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)),
    bestRating: '5',
    ratingCount: String(testimonials.length),
    reviewCount: String(testimonials.length),
  } : undefined,
  review: testimonials.map((t) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: t.name },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(t.rating),
      bestRating: '5',
    },
    reviewBody: t.text,
  })),
  checkinTime: '12:00',
  checkoutTime: '10:00',
  petsAllowed: false,
  stars: { '@type': 'Rating', ratingValue: '3' },
  potentialAction: {
    '@type': 'ReserveAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/book-now`,
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform',
      ],
    },
    result: {
      '@type': 'LodgingReservation',
      name: 'Room Reservation at Hotel Rama Hindustani',
    },
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['Hotel', 'LodgingBusiness', 'LocalBusiness'],
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'Hotel Rama Hindustani',
  description: 'Budget family hotel in Pratap Nagar Jaipur offering comfortable rooms, free WiFi, free parking, on-site restaurant, and warm Indian hospitality.',
  url: SITE_URL,
  telephone: HOTEL_PHONE,
  email: contactDetails.email,
  image: HOTEL_IMAGE,
  address: {
    '@type': 'PostalAddress',
    streetAddress: contactDetails.addressParts.streetNumber
      ? `${contactDetails.addressParts.streetNumber} ${contactDetails.addressParts.streetName}, Haldighati Marg, Tonk Rd`
      : '34-B1-B2, Haldighati Marg, Tonk Rd',
    addressLocality: contactDetails.addressParts.locality || 'Pratap Nagar',
    addressRegion: 'Rajasthan',
    addressCountry: 'IN',
    postalCode: '302033',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 26.8004,
    longitude: 75.7890,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: HOTEL_PHONE,
    contactType: 'reservations',
    availableLanguage: ['English', 'Hindi'],
    areaServed: 'IN',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Hotel Rama Hindustani',
  url: SITE_URL,
  description: 'Budget family hotel in Pratap Nagar Jaipur near Airport, JECC, and Sanganer Railway Station.',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Hotel Rama Hindustani',
  url: SITE_URL,
  logo: `${SITE_URL}/hotel-ramahindustani-image/rama-hindustanilogo.avif`,
  image: HOTEL_IMAGE,
  description: 'Budget family hotel in Pratap Nagar Jaipur.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: HOTEL_PHONE,
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '34-B1-B2, Haldighati Marg, Tonk Rd',
    addressLocality: 'Pratap Nagar',
    addressRegion: 'Rajasthan',
    addressCountry: 'IN',
    postalCode: '302033',
  },
  sameAs: [
    'https://www.instagram.com/rama_hindustani_jaipur_comfy',
    'https://www.facebook.com/people/Hotel-Rama-Hindustani/61566712879582/',
    'https://www.tripadvisor.com/Hotel_Review-g304555-d27804757-Reviews-Hotel_Rama_Hindustani-Jaipur_Rajasthan.html',
    'https://www.google.com/maps/place/Hotel+Rama+Hindustani/@26.8004,75.7890,17z',
  ],
}

const siteNavigationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SiteNavigationElement',
  '@id': `${SITE_URL}/#navigation`,
  name: ['Home', 'Rooms', 'Restaurant', 'Sightseeing', 'Services', 'Gallery', 'Blog', 'About', 'Contact', 'Book Now'],
  url: [
    `${SITE_URL}/`,
    `${SITE_URL}/rooms`,
    `${SITE_URL}/restaurant`,
    `${SITE_URL}/tours`,
    `${SITE_URL}/services`,
    `${SITE_URL}/gallery`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/about`,
    `${SITE_URL}/contact`,
    `${SITE_URL}/book-now`,
  ],
}

const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': `${SITE_URL}/restaurant#restaurant`,
  name: 'Rama Rasoi',
  description: 'On-site vegetarian Indian restaurant at Hotel Rama Hindustani serving authentic Indian cuisine for breakfast, lunch, and dinner.',
  servesCuisine: ['Indian', 'Vegetarian', 'Vegan'],
  url: `${SITE_URL}/restaurant`,
  telephone: HOTEL_PHONE,
  image: `${SITE_URL}/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-restaurant-pic-17.jpg`,
  priceRange: '₹₹',
  hasMenu: `${SITE_URL}/restaurant`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '34-B1-B2, Haldighati Marg, Tonk Rd',
    addressLocality: 'Pratap Nagar',
    addressRegion: 'Rajasthan',
    addressCountry: 'IN',
    postalCode: '302033',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 26.8004,
    longitude: 75.7890,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '07:00',
      closes: '22:00',
    }
  ],
  acceptsReservations: true,
}

const breadcrumbSchemas = {
  home: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    ],
  },
  rooms: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/rooms#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Rooms', item: `${SITE_URL}/rooms` },
    ],
  },
  tours: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/tours#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Nearby Tourist Places', item: `${SITE_URL}/tours` },
    ],
  },
  gallery: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/gallery#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Gallery', item: `${SITE_URL}/gallery` },
    ],
  },
  about: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/about#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
    ],
  },
  contact: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/contact#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
    ],
  },
  restaurant: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/restaurant#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Restaurant', item: `${SITE_URL}/restaurant` },
    ],
  },
  services: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/services#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
    ],
  },
  bookNow: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/book-now#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Book Now', item: `${SITE_URL}/book-now` },
    ],
  },
}

const faqSchemas = {
  home: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where is Hotel Rama Hindustani located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hotel Rama Hindustani is located at 34-B1-B2, Haldighati Marg, Tonk Rd, Sector 5, Pratap Nagar, Jaipur, Rajasthan 302033 — near Jaipur Airport, Sanganer Railway Station, and JECC.',
        },
      },
      {
        '@type': 'Question',
        name: 'What room types are available at Hotel Rama Hindustani?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `We offer ${bookingRoomOptions.join(', ')}. Each room comes with AC, WiFi, flat TV, and room service.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Does Hotel Rama Hindustani have free WiFi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, complimentary high-speed WiFi is available throughout the hotel for all guests.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is parking available at Hotel Rama Hindustani?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, free on-site parking is available for all guests at no extra charge.',
        },
      },
      {
        '@type': 'Question',
        name: 'How far is Hotel Rama Hindustani from Jaipur Airport?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hotel Rama Hindustani is located approximately 5 km from Jaipur International Airport, making it a convenient choice for travelers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Hotel Rama Hindustani have a restaurant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we have an on-site vegetarian restaurant called Rama Rasoi serving authentic Indian cuisine.',
        },
      },
    ],
  },
  rooms: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/rooms#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the price of rooms at Hotel Rama Hindustani?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Room prices start from \u20b9${Math.min(...rooms.map(r => parseInt(r.price.replace(/,/g, ''))))} per night for the ${rooms[0].name} and go up to \u20b9${Math.max(...rooms.map(r => parseInt(r.price.replace(/,/g, ''))))} per night for the ${rooms[rooms.length - 1].name}.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Can I book a room online at Hotel Rama Hindustani?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can book rooms online through our booking engine or contact us directly via WhatsApp for instant assistance.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there family rooms available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer rooms that can accommodate up to 4 guests, making them ideal for families visiting Jaipur.',
        },
      },
    ],
  },
  contact: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/contact#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How can I contact Hotel Rama Hindustani?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `You can call us at ${contactDetails.phone}, email us at ${contactDetails.email}, or send us a message on WhatsApp at ${contactDetails.whatsApp}.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What is the check-in and check-out time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Check-in time is 12:00 PM and check-out time is 10:00 AM. Early check-in and late check-out may be available on request.',
        },
      },
    ],
  },
  restaurant: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/restaurant#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does Hotel Rama Hindustani have a restaurant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Hotel Rama Hindustani has an on-site vegetarian restaurant called Rama Rasoi serving authentic Indian cuisine with vegetarian and vegan options.',
        },
      },
      {
        '@type': 'Question',
        name: 'What type of food is served at Rama Rasoi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rama Rasoi serves authentic Indian cuisine prepared with time-honored recipes and fresh ingredients. We offer vegetarian and vegan options for all meals.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the restaurant timings?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our restaurant serves breakfast, lunch, and dinner. Room service is also available for guests who prefer to dine in their rooms.',
        },
      },
    ],
  },
  services: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/services#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What amenities does Hotel Rama Hindustani offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer free WiFi, free parking, 24/7 front desk, room service, laundry service, air conditioning, power backup, and an on-site vegetarian restaurant.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is parking available at the hotel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, free on-site parking is available for all guests at no extra charge.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there WiFi at Hotel Rama Hindustani?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, complimentary high-speed WiFi is available throughout the property for all guests.',
        },
      },
    ],
  },
  about: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/about#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What type of hotel is Hotel Rama Hindustani?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hotel Rama Hindustani is a budget-friendly 3-star family hotel in Pratap Nagar Jaipur, offering comfortable rooms, free WiFi, free parking, and warm Indian hospitality.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is Hotel Rama Hindustani located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We are located at 34-B1-B2, Haldighati Marg, Tonk Rd, Sector 5, Pratap Nagar, Jaipur — near Jaipur Airport, Sanganer Railway Station, JECC, and World Trade Park.',
        },
      },
    ],
  },
  gallery: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/gallery#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I see photos of Hotel Rama Hindustani rooms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our gallery page features photos of all room types including Economy, Standard, Deluxe, and Superior rooms, as well as the restaurant, gym, and other amenities.',
        },
      },
    ],
  },
  bookNow: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/book-now#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How can I book a room at Hotel Rama Hindustani?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can book directly through our website booking engine, via WhatsApp at +91 63767 07091, or by calling us directly for personalized assistance.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does direct booking offer any benefits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, direct bookings through our website or WhatsApp offer the best available rates, instant confirmation, and direct support from our team.',
        },
      },
      {
        '@type': 'Question',
        name: 'What payment methods are accepted?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We accept cash, credit cards, debit cards, and UPI payments for your convenience.',
        },
      },
    ],
  },
}

const pageSchemas = {
  home: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    name: 'Hotel Rama Hindustani - Best Budget Hotel in Pratap Nagar Jaipur',
    description: 'Book Hotel Rama Hindustani in Pratap Nagar Jaipur near Airport, JECC, Sanganer Railway Station. Budget family hotel with AC rooms, free WiFi, free parking, and vegetarian restaurant.',
    url: SITE_URL,
  },
  rooms: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/rooms#webpage`,
    name: 'Hotel Rooms in Pratap Nagar Jaipur | Hotel Rama Hindustani',
    description: 'Explore room options at Hotel Rama Hindustani in Pratap Nagar Jaipur - Economy, Standard, Deluxe, and Superior Double Rooms with AC, WiFi, and modern amenities.',
    url: `${SITE_URL}/rooms`,
  },
  tours: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/tours#webpage`,
    name: 'Tourist Places Near Hotel Rama Hindustani, Pratap Nagar Jaipur',
    description: 'Explore tourist places near Hotel Rama Hindustani in Pratap Nagar, Jaipur — Chokhi Dhani, Patrika Gate, Hawa Mahal, Amer Fort & more. Distances & directions included.',
    url: `${SITE_URL}/tours`,
    about: [
      { '@type': 'TouristAttraction', name: 'Chokhi Dhani', address: 'Jaipur, Rajasthan' },
      { '@type': 'TouristAttraction', name: 'Hawa Mahal', address: 'Jaipur, Rajasthan' },
      { '@type': 'TouristAttraction', name: 'Amer Fort', address: 'Jaipur, Rajasthan' },
      { '@type': 'TouristAttraction', name: 'City Palace', address: 'Jaipur, Rajasthan' },
      { '@type': 'TouristAttraction', name: 'Jawahar Circle', address: 'Jaipur, Rajasthan' },
      { '@type': 'TouristAttraction', name: 'Nahargarh Fort', address: 'Jaipur, Rajasthan' },
    ],
  },
  about: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/about#webpage`,
    name: 'About Hotel Rama Hindustani | Budget Family Hotel Jaipur',
    description: 'Learn about Hotel Rama Hindustani in Pratap Nagar Jaipur - a budget family hotel near Jaipur Airport, JECC, and Sanganer Railway Station.',
    url: `${SITE_URL}/about`,
  },
  contact: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/contact#webpage`,
    name: 'Contact Hotel Rama Hindustani | Hotel Near Sanganer Railway Station',
    description: 'Contact Hotel Rama Hindustani in Pratap Nagar Jaipur for room bookings and inquiries. Near Sanganer Railway Station and Jaipur Airport.',
    url: `${SITE_URL}/contact`,
  },
  restaurant: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/restaurant#webpage`,
    name: 'Rama Rasoi Restaurant | Vegetarian Restaurant in Pratap Nagar Jaipur',
    description: 'Discover Rama Rasoi, the vegetarian restaurant at Hotel Rama Hindustani in Pratap Nagar Jaipur serving authentic Indian cuisine.',
    url: `${SITE_URL}/restaurant`,
  },
  services: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/services#webpage`,
    name: 'Hotel Services & Amenities in Pratap Nagar Jaipur',
    description: 'Explore amenities at Hotel Rama Hindustani in Pratap Nagar Jaipur - free WiFi, free parking, room service, AC rooms, and more.',
    url: `${SITE_URL}/services`,
  },
  gallery: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/gallery#webpage`,
    name: 'Hotel Rama Hindustani Photo Gallery | Rooms & Amenities',
    description: 'View photos of Hotel Rama Hindustani in Pratap Nagar Jaipur including rooms, restaurant, exterior, and amenities.',
    url: `${SITE_URL}/gallery`,
  },
  bookNow: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/book-now#webpage`,
    name: 'Book Hotel in Pratap Nagar Jaipur | Direct Booking',
    description: 'Book your stay at Hotel Rama Hindustani in Pratap Nagar Jaipur with direct online booking, best price guarantee, and instant WhatsApp support.',
    url: `${SITE_URL}/book-now`,
  },
  blog: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/blog#webpage`,
    name: 'Hotel Rama Hindustani Blog | Jaipur Travel Guide & Hotel Tips',
    description: 'Read the Hotel Rama Hindustani blog for Jaipur travel guides, hotel tips, local attraction guides, and booking advice.',
    url: `${SITE_URL}/blog`,
  },
}

const StructuredData = ({ page = 'home', room = null }) => {
  let breadcrumb = breadcrumbSchemas[page] || breadcrumbSchemas.home
  let faq = faqSchemas[page]
  let pageSchema = pageSchemas[page] || pageSchemas.home
  let specificRoomSchema = null

  if (page === 'room-detail' && room) {
    breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/rooms/${room.slug}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Rooms', item: `${SITE_URL}/rooms` },
        { '@type': 'ListItem', position: 3, name: room.name, item: `${SITE_URL}/rooms/${room.slug}` },
      ],
    }

    pageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${SITE_URL}/rooms/${room.slug}#webpage`,
      name: `${room.name} in Pratap Nagar Jaipur | Hotel Rama Hindustani`,
      description: room.description,
      url: `${SITE_URL}/rooms/${room.slug}`,
    }

    specificRoomSchema = {
      '@context': 'https://schema.org',
      '@type': 'HotelRoom',
      '@id': `${SITE_URL}/rooms/${room.slug}#room`,
      name: room.name,
      description: room.description,
      image: `${SITE_URL}${room.image}`,
      bed: {
        '@type': 'BedDetails',
        numberOfBeds: 1,
        typeOfBed: room.features?.includes('Premium Bedding') ? 'Premium Double Bed' : 'Double Bed'
      },
      occupancy: {
        '@type': 'QuantitativeValue',
        minValue: room.minimumOccupancy,
        maxValue: room.maximumOccupancy,
      },
      amenityFeature: room.features?.map(f => ({
        '@type': 'LocationFeatureSpecification',
        name: f,
        value: true
      })),
      offers: {
        '@type': 'Offer',
        price: room.price?.replace(/,/g, ''),
        priceCurrency: 'INR',
        url: `${SITE_URL}/rooms/${room.slug}`,
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: room.price?.replace(/,/g, ''),
          priceCurrency: 'INR',
          unitText: 'NIGHT'
        }
      }
    }
  }

  return (
    <Helmet>
      <script type='application/ld+json'>
        {JSON.stringify(hotelSchema)}
      </script>
      <script type='application/ld+json'>
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type='application/ld+json'>
        {JSON.stringify(websiteSchema)}
      </script>
      <script type='application/ld+json'>
        {JSON.stringify(organizationSchema)}
      </script>
      <script type='application/ld+json'>
        {JSON.stringify(siteNavigationSchema)}
      </script>
      <script type='application/ld+json'>
        {JSON.stringify(breadcrumb)}
      </script>
      {faq && (
        <script type='application/ld+json'>
          {JSON.stringify(faq)}
        </script>
      )}
      <script type='application/ld+json'>
        {JSON.stringify(pageSchema)}
      </script>
      {specificRoomSchema && (
        <script type='application/ld+json'>
          {JSON.stringify(specificRoomSchema)}
        </script>
      )}
      {page === 'restaurant' && (
        <script type='application/ld+json'>
          {JSON.stringify(restaurantSchema)}
        </script>
      )}
    </Helmet>
  )
}

export default StructuredData
