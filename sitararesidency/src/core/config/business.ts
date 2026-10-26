import type { Business, SiteMetadata } from '@/core/types/business';

export const business: Business = {
  name: 'Hotel Sitara Residency',
  shortName: 'Sitara Residency',
  website: 'https://hotelsitararesidency.com',
  logo: '/sitaralogo.jpg',
  email: 'info@sitararesidency.com',
  phones: {
    primary: '+917400432396',
    secondary: '+917400432397',
    display: '+91 74004 32396 / +91 74004 32397',
    primaryDisplay: '+91 74004 32396',
    secondaryDisplay: '+91 74004 32397',
    landlinePrimary: '02247152396',
    landlinePrimaryDisplay: '022-4715 2396',
    landlineSecondary: '02247152397',
    landlineSecondaryDisplay: '022-4715 2397',
    landlinesDisplay: '022-4715 2396 / 022-4715 2397',
  },
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    x: 'https://x.com',
  },
  address: {
    lines: [
      'Riddhi Arcade, Plot No. 857, C & D Sector KWC',
      'Near Bima Complex',
      'Kalamboli, Navi Mumbai – 410 218',
    ],
    streetAddress: 'Riddhi Arcade, Plot No. 857, C & D Sector KWC, Near Bima Complex',
    locality: 'Kalamboli, Navi Mumbai',
    region: 'Maharashtra',
    postalCode: '410 218',
    country: 'IN',
  },
  mapUrl: 'https://maps.google.com/?q=Hotel+Sitara+Residency,+Kalamboli,+Navi+Mumbai',
  bookingUrl: 'https://bookone.io/Hotel-Sitara-Residency?bookingEngine=true',
  bookingEngineBaseUrl: 'https://bookone.io/Hotel-Sitara-Residency',
  amenities: ['Wi-Fi', 'Parking', 'Air conditioning', 'Room service', 'Housekeeping', 'Power backup', 'First aid'],
};

export const siteMetadata: SiteMetadata = {
  title: `${business.name} | Kalamboli, Navi Mumbai`,
  description: `${business.name} in Kalamboli, Navi Mumbai. Comfortable rooms and thoughtful stays near Panvel.`,
};