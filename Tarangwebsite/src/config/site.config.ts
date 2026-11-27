// Enterprise Site Configuration

export const SITE_CONFIG = {
  name: 'Tarangan Resort',
  legalName: 'The Tarangan Resort Nagaon-Alibag',
  tagline: 'Luxury Boutique Cottages & Swimming Pool Near Nagaon Beach',
  description:
    'Experience tranquility at Tarangan Resort in Nagaon, Alibag. Deluxe AC cottages and suites, sparkling swimming pool, authentic Konkani seafood, and pet-friendly lawns just 4.1 km from Nagaon Beach.',
  url: 'https://www.taranganresort.com',
  rating: {
    score: 4.7,
    maxScore: 5.0,
    reviewCount: 161,
    source: 'Google Reviews',
  },
  contact: {
    primaryPhone: '077568 38900',
    primaryPhoneFormatted: '+91 77568 38900',
    whatsappNumber: '917756838900',
    email: 'taranganresort11@gmail.com',
    alternateEmail: 'taranganresort11@gmail.com',
    address: {
      street: 'Sahan Bypass Road',
      locality: 'Nagaon',
      city: 'Alibag',
      district: 'Raigad',
      state: 'Maharashtra',
      postalCode: '402204',
      country: 'India',
    },
    geo: {
      latitude: 18.61959414,
      longitude: 72.92325347,
    },
  },
  policies: {
    checkInTime: '12:00 PM',
    checkOutTime: '10:00 AM',
    petFriendly: true,
    smokingPolicy: 'Non-smoking cottage interiors (designated garden zones only)',
    cancellationNoticeDays: 3,
  },
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL ||
    'https://bookone.io/Tarangan-Resort?bookingEngine=True',
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Rooms & Cottages', href: '/rooms' },
    { label: 'Facilities', href: '/facilities' },
    { label: 'Dining', href: '/dining' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Location', href: '/location' },
    { label: 'Contact', href: '/contact' },
  ],
  socials: {
    instagram: 'https://www.instagram.com/taranganresort_nagaon/',
    facebook: 'https://www.facebook.com/taranganresortnagaon/',
    tripadvisor:
      'https://www.tripadvisor.in/Hotel_Review-g26454155-d27484991-Reviews-The_Tarangan_Resort-Palhe_Raigad_District_Maharashtra.html',
    googleMaps: 'https://maps.google.com/?cid=tarangan_resort_nagaon_alibag',
    whatsapp: 'https://wa.me/917756838900',
  },
} as const;
