import { Venue } from '@/types';

export const VENUES: Venue[] = [
  {
    id: 'venue-imperial',
    slug: 'royal-imperial-hall',
    name: 'Royal Imperial Hall',
    venueType: 'Indoor Banquet',
    area: '5000 sq. ft.',
    ceilingHeight: '22 ft column-free',
    seatedCapacity: 350,
    floatingCapacity: 500,
    idealFor: 'Weddings, Receptions, Corporate Galas',
    description:
      'Our flagship column-free banquet hall with premium lighting, a grand stage, and enough space for a 350-guest seated reception or a 500-guest high-energy gala.',
    features: [
      'Column-free 22 ft ceiling',
      'In-built stage & LED wall',
      'Dedicated bridal & groom dressing suites',
      'Sound, lighting & DJ setup supported',
      'Temperature-controlled throughout',
      'Coat room & guest lounge',
    ],
    layouts: [
      { name: 'Theater', value: '500' },
      { name: 'Cluster', value: '220' },
      { name: 'U-Shape', value: '120' },
      { name: 'Floating / Cocktail', value: '500' },
    ],
    image: '/newedit/Luxurious Courtyard Entrance at Night.avif',
    video: 'https://bookonelocal.in/cdn/imperialhall.MP4',
  },
  {
    id: 'venue-lawn',
    slug: 'grand-green-lawn',
    name: 'Grand Green Lawn',
    venueType: 'Outdoor Lawn',
    area: '8000 sq. ft. manicured lawn',
    seatedCapacity: 500,
    floatingCapacity: 800,
    idealFor: 'Mega Weddings, Cultural Functions, Exhibitions',
    description:
      'A sprawling manicured lawn for large open-air celebrations  mandap setups, stage, and full weather-backup planning so your outdoor event is never at risk.',
    features: [
      'Mandap & stage setups supported',
      'Weather-backup indoor hall agreement',
      'Ample generator power backup',
      'Dedicated catering & serving lanes',
      'Fireworks & aerial rigging permitted',
      'Direct lawn access for VIP arrivals',
    ],
    layouts: [
      { name: 'Theater', value: '800' },
      { name: 'Seated Rounds', value: '500' },
      { name: 'Floating / Cocktail', value: '800+' },
      { name: 'Exhibition', value: '2,000 sq. ft. booths' },
    ],
    image: '/newedit/Preimum Lawn.avif',
    video: 'https://bookonelocal.in/cdn/GrandGreenLawn.MP4',
  },
  {
    id: 'venue-boardroom',
    slug: 'executive-boardroom',
    name: 'Executive Boardroom',
    venueType: 'Conference Room',
    area: '1000 sq. ft.',
    seatedCapacity: 30,
    floatingCapacity: 50,
    idealFor: 'Corporate Meetings, Strategy Sessions',
    description:
      'A focused, acoustically treated boardroom for high-stakes meetings  with a teleconference setup, whiteboard walls, and discreet service.',
    features: [
      '4K display & wired presentation',
      'Audio-conference / telepresence ready',
      'Acoustic wall panels',
      'Dedicated breakout annex',
      'Standing tea & coffee service',
    ],
    layouts: [
      { name: 'Boardroom', value: '30' },
      { name: 'Theater', value: '50' },
      { name: 'U-Shape', value: '24' },
      { name: 'Breakout', value: '4 zones' },
    ],
    image: '/newedit/Waiting area.avif',
  },
  {
    id: 'venue-mini',
    slug: 'mangal-mini-hall',
    name: 'Mangal Mini Hall',
    venueType: 'Indoor Banquet',
    area: '1200 sq. ft.',
    ceilingHeight: '14 ft',
    seatedCapacity: 120,
    floatingCapacity: 200,
    idealFor: 'Intimate Weddings, Mehndi, Birthday Parties',
    description:
      'An intimate hall ideal for pre-wedding functions, small receptions, and family celebrations  full catering and decor support included.',
    features: [
      'Compact stage & dance floor',
      'Attached preparation room',
      'Flexible decor policy',
      'Direct access to lawn & parking',
    ],
    layouts: [
      { name: 'Theater', value: '200' },
      { name: 'Seated Rounds', value: '120' },
      { name: 'U-Shape', value: '60' },
      { name: 'Floating / Cocktail', value: '200' },
    ],
    image: '/mangalhall.jpeg',
  },
];

export const getVenueBySlug = (slug: string): Venue | undefined =>
  VENUES.find((venue) => venue.slug === slug);
