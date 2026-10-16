import { hotel } from '@/data/site';

export type ShowcaseContent = {
  id?: string;
  reverse?: boolean;
  number: string;
  image: string;
  imageAlt: string;
  badge: string;
  eyebrow: string;
  tagline: string;
  title: string;
  description: string;
  meta: { label: string; value: string }[];
  actions: { href: string; label: string; outline?: boolean; external?: boolean }[];
};

export const banquetQuickNav = [
  { index: '01', label: 'Venue Specifications', href: '#features' },
  { index: '02', label: 'Curated Occasions', href: '#occasions' },
  { index: '03', label: 'Catering & Logistics', href: '#catering' },
  { index: '04', label: 'Reserve Venue', href: '#reserve' },
];

export const banquetShowcases: ShowcaseContent[] = [
  {
    number: '01',
    image: '/images/05-kp-hosapete-16.jpg',
    imageAlt: 'The Grand Banquet Hall at Hotel Krishna Palace set with theater seating',
    badge: 'Capacity: 300+ Guests',
    eyebrow: 'Multipurpose Event Arena · Station Road',
    tagline: 'Expansive, flexible, fully air-conditioned.',
    title: 'The Grand Hall.',
    description:
      'Designed to adapt gracefully to diverse event configurations — from classroom and theatre arrangements for business conventions to round-table cocktail celebrations and banquet receptions. Equipped with professional sound, projection facilities, and dedicated back-of-house preparation zones.',
    meta: [
      { label: 'Maximum Capacity', value: '300+ Attendees' },
      { label: 'Climate Control', value: 'Central Air Conditioning' },
      { label: 'Parking', value: 'Complimentary On-Site Parking' },
      { label: 'Location', value: 'Dedicated Event Wing' },
    ],
    actions: [
      { href: `tel:${hotel.phoneHref}`, label: 'Discuss with event manager' },
      {
        href: `mailto:${hotel.reservationEmail}?subject=Banquet%20Venue%20Booking%20Inquiry`,
        label: 'Request rate card',
        outline: true,
      },
    ],
  },
  {
    id: 'catering',
    reverse: true,
    number: '02',
    image: '/images/25-kp-hosapete-16.jpg',
    imageAlt: 'Catering buffet presentation and hospitality at Hotel Krishna Palace',
    badge: 'Culinary Excellence',
    eyebrow: 'Customized Banqueting Menus',
    tagline: 'Flavours tailored to your gathering.',
    title: 'Gourmet Catering & Banquets.',
    description:
      'Our culinary masters formulate bespoke multi-cuisine menus spanning traditional South Indian feasts, rich North Indian delicacies, and continental spreads. From welcome high teas and coffee breaks during conferences to lavish evening banquet buffets with live food counters.',
    meta: [
      { label: 'Cuisine Styles', value: 'Indian, Regional & Continental' },
      { label: 'Service Formats', value: 'Buffet, Plated & High-Tea' },
      { label: 'Beverages', value: 'Mocktails, Soft Bar & Spirits' },
      { label: 'Dietary Care', value: 'Strict Pure-Veg / Jain Options' },
    ],
    actions: [
      {
        href: `mailto:${hotel.reservationEmail}?subject=Banquet%20Catering%20Inquiry`,
        label: 'Explore menu options',
      },
      { href: `tel:${hotel.phoneHref}`, label: 'Call banquet team', outline: true },
    ],
  },
];

export const banquetOccasions = [
  {
    time: 'Corporate',
    period: 'Business & Leadership',
    title: 'Conferences & Seminars',
    body: 'High-speed Wi-Fi, crystal-clear sound, stage dais setup, and continuous refreshment breaks to keep delegates engaged and focused.',
    link: {
      href: `mailto:${hotel.reservationEmail}?subject=Corporate%20Conference%20Enquiry`,
      label: 'Plan conference',
    },
  },
  {
    time: 'Commercial',
    period: 'Showcases & Debuts',
    title: 'Product Launches & Expos',
    body: 'Dynamic presentation stage, dramatic lighting options, and prominent branding entryways ideal for dealer meets, vehicle unveils, and tech rollouts.',
    link: {
      href: `mailto:${hotel.reservationEmail}?subject=Product%20Launch%20Enquiry`,
      label: 'Plan launch',
    },
  },
  {
    time: 'Glamour',
    period: 'Evenings & Runways',
    title: 'Fashion & Cultural Galas',
    body: 'Ramp configuration capability, professional backstage green-room arrangements, and ambient mood lighting for awards nights and cultural showcases.',
    link: {
      href: `mailto:${hotel.reservationEmail}?subject=Fashion%20Event%20Enquiry`,
      label: 'Plan gala',
    },
  },
  {
    time: 'Festive',
    period: 'Evenings & Receptions',
    title: 'Cocktail Dinners & Receptions',
    body: 'Chic lounge setups, curated finger-foods, craft mocktails and bar service, complemented by fine music and celebratory banqueting.',
    link: {
      href: `mailto:${hotel.reservationEmail}?subject=Cocktail%20Dinner%20Enquiry`,
      label: 'Plan celebration',
    },
  },
];

export const banquetPillars = [
  {
    kicker: 'Audio & Visual Tech',
    title: 'Complete Production Support',
    body: 'High-lumen projection, wireless microphones, podium acoustics, and dedicated technicians on stand-by so your presentations never miss a beat.',
  },
  {
    kicker: 'Accessibility & Parking',
    title: 'Convenient Station Road Access',
    body: 'Centrally situated with expansive complimentary parking for cars and delegates, conveniently located minutes from the Hosapete railway hub.',
  },
  {
    kicker: 'Stay + Event Bundles',
    title: 'Guest Room Blocks',
    body: 'Combine your convention or wedding celebrations with comfortable guest stays across our Executive Rooms and Mini Suites at preferential residential rates.',
  },
];

export const banquetGallery = [
  { src: '/images/05-kp-hosapete-16.jpg', alt: 'Banquet theater layout' },
  { src: '/images/07-b7.jpg', alt: 'Banquet celebration dinner layout' },
  { src: '/images/08-b3.jpg', alt: 'Banquet hall lighting and stage view' },
  { src: '/images/09-b4.jpg', alt: 'Banquet conference preparation' },
  { src: '/images/25-kp-hosapete-16.jpg', alt: 'Hospitality and event catering service' },
];
