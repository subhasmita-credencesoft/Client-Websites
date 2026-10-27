import type { ImageSource } from '@/shared/types/content';
import { ROUTES } from '@/core/constants/routes';
import {
  receptionComfortImage,
  receptionDiningImage,
  receptionLocationImage,
  receptionRestaurantImage,
  receptionWelcomeImage,
  sittingRoomImage,
} from '@/features/common/data/images';

export type HomeLink = {
  href: string;
  label: string;
};

export type HomeFeature = HomeLink & {
  image: ImageSource;
  eyebrow: string;
  title: string;
  description: string;
};

export const homeHighlights = [
  {
    title: 'Stay',
    description: 'Impeccably appointed rooms and suites for discerning travellers in the heart of Navi Mumbai.',
  },
  {
    title: 'Dine',
    description: 'Culinary excellence from breakfast through to late-evening room service.',
  },
  {
    title: 'Relax',
    description: 'A sanctuary of calm — where thoughtful design meets genuine warmth.',
  },
] as const;

export const homeCallouts: HomeFeature[] = [
  {
    image: receptionComfortImage,
    eyebrow: 'Curated Comfort',
    title: 'Every detail considered',
    description: 'Premium bedding, individual climate control, complimentary Wi-Fi and attentive 24-hour service.',
    href: ROUTES.leisure,
    label: 'Discover our facilities',
  },
  {
    image: receptionLocationImage,
    eyebrow: 'Prime Location',
    title: 'Where Navi Mumbai connects',
    description: 'Strategically placed in Kalamboli — moments from Panvel, the highway and the airport corridor.',
    href: ROUTES.location,
    label: 'Find our location',
  },
];

export const homeFeatures = {
  rooms: {
    image: sittingRoomImage,
    title: 'Space crafted for you',
    description: 'From our signature Executive Family Suite to our versatile Triple Rooms — every category is finished with premium touches that transform a stay into an experience.',
    href: ROUTES.bedrooms,
    label: 'Explore all rooms & suites',
  },
  dining: {
    image: receptionDiningImage,
    title: 'Flavours worth remembering',
    description: 'Savour carefully crafted menus, casual lunches and memorable dinners. Our kitchen is open whenever you are hungry.',
    href: ROUTES.dining,
    label: 'Discover dining',
  },
  diningRoom: {
    image: receptionRestaurantImage,
    eyebrow: 'All-day dining',
    title: 'Refined, relaxed flavours',
    description: 'An unhurried setting for breakfast, a working lunch or a leisurely supper with family.',
    href: ROUTES.diningDetail('the-dining-room'),
    label: 'Visit the restaurant',
  },
  bar: {
    image: sittingRoomImage,
    eyebrow: 'The lounge & café',
    title: 'Pause. Breathe. Enjoy.',
    description: 'A warm, inviting space for coffee, light bites and easy conversation at any hour.',
    href: ROUTES.diningDetail('the-sitting-room-bar'),
    label: 'Visit the lounge',
  },
} as const;

export const homePageCopy = {
  hero: {
    eyebrow: 'Hotel Sitara Residency · Kalamboli',
    heading: 'Where luxury meets Navi Mumbai',
    description: 'An elevated sanctuary of comfort, style and personalised hospitality in the heart of Kalamboli.',
    action: 'Reserve your suite',
    scrollLabel: 'Scroll to discover',
  },
  booking: {
    arrival: 'Arrival',
    departure: 'Departure',
    guests: 'Guests',
    datePlaceholder: 'Select date',
    guestPlaceholder: '2 Guests',
    action: 'Check availability',
  },
  welcome: {
    image: receptionWelcomeImage,
    eyebrow: 'Hotel Sitara Residency',
    heading: 'A genuine sense of arrival',
    description: [
      "Hotel Sitara Residency is Kalamboli's premier destination for travellers who refuse to compromise on quality. Whether you are here for business, a family celebration or a leisurely retreat, we deliver warm, considered hospitality that stays with you long after check-out.",
      'Enjoy premium rooms, exceptional dining, seamless connectivity, secure parking and the peace of mind that comes from a hotel that genuinely cares about your stay.',
    ],
    action: 'Explore our rooms',
  },
  callouts: { eyebrow: 'The Sitara Experience', heading: 'Crafted for every guest' },
  rooms: { eyebrow: 'Accommodation', heading: 'Rooms & Suites', action: 'View all accommodation' },
  dining: { eyebrow: 'Culinary', heading: 'Dine with distinction', action: 'All dining experiences' },
  location: {
    image: receptionWelcomeImage,
    eyebrow: 'Location',
    heading: 'Perfectly placed in Navi Mumbai',
    description: "Set at the crossroads of connectivity — Kalamboli places you minutes from Panvel station, the expressway and Mumbai's international airport corridor.",
    action: 'Get directions',
  },
} as const;