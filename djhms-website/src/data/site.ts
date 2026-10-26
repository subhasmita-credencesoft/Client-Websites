import type { HighlightItem, NavItem, PropertyItem, RoomCategory, ServiceItem } from '@/types';

/**
 * Central content + configuration. Edit here; components stay untouched.
 * Items marked TODO come from the mockup and must be confirmed by the client.
 */
export const site = {
  name: 'Diamond Jubilee Hotel Management Services',
  shortName: 'DJHMS',
  tagline: 'Hospitality | Management | Excellence',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://djhms.in',
  description:
    'Diamond Jubilee Hotel Management Services (DJHMS) is a Mumbai-based hospitality management company delivering professional hotel operations, guest service excellence and business partnerships.',
  // TODO: mockup shows a placeholder number ("please confirm the latest number")
  phone: { display: '+91 9892912289', href: '+912240000000' },
  // TODO: confirm the djhms.in mailbox exists
  email: 'info@djhms.in',
  // Registered address per hotelmaharana.com and GST records (mockup shows "818" – sources say 819)
  address: {
    lines: ['819, Sagar Tech Plaza - A, A.K. Road,', 'Sakinaka Junction, Andheri Kurla West,', 'Mumbai, Maharashtra - 400072'],
    street: '819 Sagar Tech Plaza - A, A.K. Road, Sakinaka Junction, Andheri Kurla West',
    city: 'Mumbai',
    region: 'Maharashtra',
    postalCode: '400072',
    country: 'IN',
    short: 'Mumbai, Maharashtra - 400072',
  },
  mapsEmbed:
    'https://www.google.com/maps?q=Sagar+Tech+Plaza+A+Sakinaka+Junction+Andheri+Kurla+Road+Mumbai+400072&output=embed',
  mapsLink:
    'https://www.google.com/maps/search/?api=1&query=Sagar+Tech+Plaza+A+Sakinaka+Junction+Mumbai+400072',
  // TODO: replace with the real profile URLs
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
  ],
  hotelWebsite: 'https://www.hotelmaharana.com',
} as const;

/**
 * Real hospitality photography from Unsplash (free for commercial use, no attribution required –
 * https://unsplash.com/license). To change a photo, replace the ID (the part after "photo-" in an
 * images.unsplash.com URL). If a photo cannot load, /images/fallback.jpg (neutral navy/gold) is shown.
 */
export const unsplash = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const FALLBACK_IMAGE = '/images/fallback.jpg';

export const images = {
  // Black marble hotel reception desk with gold trim in a hotel lobby
  hero: { src: unsplash('1660557989695-14fac79c086d', 2400), fallback: FALLBACK_IMAGE },
  // Modern hotel bedroom with blue upholstered headboard
  about: { src: unsplash('1566665797739-1674de7a421a', 1400), fallback: FALLBACK_IMAGE },
  // Smiling professional woman in a black blazer
  career: { src: unsplash('1581065178047-8ee15951ede6', 1400), fallback: FALLBACK_IMAGE },
  // Hotel building exterior — local images
  property: { src: '/maharanaimage.png', fallback: FALLBACK_IMAGE },
  propertyMaharana: { src: '/maharanaimage.png', fallback: FALLBACK_IMAGE },
  propertySitara: { src: '/sitararesidency.png', fallback: FALLBACK_IMAGE },
} as const;

export const navigation: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About Us', href: '/about' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'properties', label: 'Properties', href: '/properties' },
  { id: 'careers', label: 'Careers', href: '/careers' },
  { id: 'contact', label: 'Contact Us', href: '/contact' },
];

export const highlights: HighlightItem[] = [
  { icon: 'bed', title: 'Hotel Management', subtitle: '& Operations' },
  { icon: 'shield', title: 'Guest Satisfaction', subtitle: '& Service Quality' },
  { icon: 'users', title: 'Business Partnerships', subtitle: '& Hospitality Solutions' },
];

export const about = {
  paragraph:
    'Diamond Jubilee Hotel Management Services (DJHMS) is a Mumbai-based hospitality management company delivering reliable, professional and guest-centric services. We proudly manage and partner with premier properties including Hotel Maharana Inn in Chembur, Mumbai and Hotel Sitara Residency in Kalamboli, Navi Mumbai, creating comfortable experiences for our guests and value-driven solutions for our partners.',
  mission:
    'To deliver reliable hospitality services through professional management, operational discipline and a commitment to guest satisfaction.',
  vision: 'To build trusted hospitality partnerships and create comfortable, welcoming experiences for every guest.',
  values: ['Guest Satisfaction', 'Professional Integrity', 'Service Excellence', 'Teamwork', 'Accountability', 'Continuous Improvement'],
};

export const services: ServiceItem[] = [
  {
    id: 'management',
    title: 'Hotel Management & Operations',
    description: 'Support for daily operations, service standards, staff coordination and guest handling.',
    icon: 'building',
    image: unsplash('1587702068694-a909ef4aa346', 1000),
    imageAlt: 'Hotel lobby lounge with seating',
    layout: 'card',
  },
  {
    id: 'housekeeping',
    title: 'Housekeeping & Quality Standards',
    description: 'Room preparation, cleanliness checks, linen coordination and maintenance reporting.',
    icon: 'sparkles',
    image: unsplash('1580256081112-e49377338b7f', 1000),
    imageAlt: 'Housekeeping cart in a hotel corridor',
    layout: 'card',
  },
  {
    id: 'front-office',
    title: 'Front Office & Guest Relations',
    description: 'Check-in/out coordination, enquiries, reservation support and guest feedback handling.',
    icon: 'concierge',
    image: unsplash('1759038085950-1234ca8f5fed', 1000),
    imageAlt: 'Hotel reception desk',
    layout: 'card',
  },
  {
    id: 'reservations',
    title: 'Reservations & Revenue Support',
    description: 'Booking coordination, inventory management, pricing analysis and distribution support.',
    icon: 'trending',
    image: unsplash('1454165804606-c3d57bc86b40', 1000),
    imageAlt: 'Reservations and revenue analysis at a laptop',
    layout: 'card',
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Facility Coordination',
    description: 'Preventive maintenance schedules, facility inspections and service provider coordination.',
    icon: 'wrench',
    image: unsplash('1615774925655-a0e97fc85c14', 1000),
    imageAlt: 'Technician testing an electrical panel',
    layout: 'wide',
  },
  {
    id: 'partnerships',
    title: 'Hotel Owner & Business Partnerships',
    description: 'A dedicated enquiry channel for hotel owners seeking management partnerships or hospitality business support.',
    icon: 'handshake',
    image: unsplash('1573164574572-cb89e39749b4', 1000),
    imageAlt: 'Business partners around a meeting table',
    layout: 'wide',
  },
];

export const properties: PropertyItem[] = [
  {
    id: 'hotel-maharana-inn',
    name: 'Hotel Maharana Inn',
    location: 'Chembur, Mumbai, Maharashtra',
    address: 'VN Purav Marg, Chembur, Mumbai, Maharashtra 400071',
    description:
      'A comfortable and well-appointed hotel for business travellers, corporate executives and families visiting Mumbai. Features elegant rooms, multi-cuisine dining and seamless transit connectivity.',
    image: images.propertyMaharana.src,
    fallback: images.propertyMaharana.fallback,
    alt: 'Hotel Maharana Inn Chembur building exterior',
    website: 'https://www.hotelmaharana.com',
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=Hotel+Maharana+Inn+Chembur+Mumbai',
    roomCategories: [
      { name: 'Suite Room' },
      { name: 'Family Deluxe Room' },
      { name: 'Standard Room' },
    ],
    amenities: [
      'Multi-Cuisine Restaurant',
      '24/7 Front Desk & Room Service',
      'High-Speed Wi-Fi',
      'Corporate & Family Stays',
    ],
  },
  {
    id: 'hotel-sitara-residency',
    name: 'Hotel Sitara Residency',
    location: 'Kalamboli, Navi Mumbai, Maharashtra',
    address: 'Riddhi Arcade, Plot No 857 C&D, near Bema Office Complex, Sector KWC, Kalamboli, Panvel, Navi Mumbai, Maharashtra 410218',
    description:
      'A distinguished contemporary hotel in Kalamboli, Navi Mumbai offering modern comfort, 20+ elegant rooms, dedicated service, and thoughtful hospitality for business travelers, families, and transit guests.',
    image: images.propertySitara.src,
    fallback: images.propertySitara.fallback,
    alt: 'Hotel Sitara Residency Kalamboli Navi Mumbai',
    website: 'https://hotelsitararesidency.com/',
    mapsLink: 'https://share.google/FVBaMISKA650gOovh',
    phone: '+91 99873 98964 / 74004 32396',
    roomCategories: [
      { name: 'Executive Room' },
      { name: 'Executive Family Suite' },
      { name: 'Executive Triple Room' },
    ],
    amenities: [
      '20+ Available Rooms',
      'Air Conditioning & Power Backup',
      'Complimentary Wi-Fi',
      'Free On-Site Parking',
      'Room Service & Housekeeping',
    ],
  },
];

export const property = properties[0]!;
export const roomCategories = properties[0]!.roomCategories;

export const careers = {
  intro: 'Join our team and be a part of a dynamic hospitality environment where your skills and passion make a difference.',
  benefits: [
    'Professional work environment',
    'Learning and development opportunities',
    'Growth and career advancement',
    'Supportive and inclusive culture',
  ],
  // TODO: confirm real openings with the client
  positions: [
    'Front Office Executive',
    'Hotel Receptionist',
    'Guest Relations Executive',
    'Reservations Executive',
    'Housekeeping Supervisor',
    'Maintenance Technician',
    'Other / General Application',
  ],
};

export const enquiryTypes = [
  'Hotel management enquiry',
  'Partnership / hotel owner enquiry',
  'Guest enquiry',
  'Media / other',
];
