/**
 * Structured data that belongs to a single page (not site-wide).
 * Imported by the homepage so FAQPage / ItemList schema is emitted only there.
 */

export const FAQ_SCHEMA = {
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
        text: 'Hotel K2 offers affordable room rates starting from ₹999 per night. It is a budget-friendly hotel in Chakradharpur with AC rooms, free Wi-Fi, and premium amenities. Check availability by calling +91 8709490824.',
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

export const NEARBY_SCHEMA = {
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
