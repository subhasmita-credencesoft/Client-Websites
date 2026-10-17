import { ROOMS } from '@/data/rooms';
import type { BlogPost } from '@/types/blog';

const BEST_FOR: Record<string, string> = {
  'single-bed-premium-room': 'Solo travellers and short business trips',
  'double-bed-standard-room': 'Couples and budget-conscious guests',
  'double-bed-classic-room': 'Couples who want a little more comfort',
  'double-bed-premium-room': 'Couples and longer stays',
  'triple-bed-premium-room': 'Small families and groups of three',
  'four-bed-suite-room': 'Families and larger groups',
};

const ROOM_ROWS = ROOMS.map((room) => [
  `[${room.name}](/rooms/${room.slug})`,
  BEST_FOR[room.slug] ?? 'Guests looking for a comfortable stay',
  `₹${(room.price ?? 0).toLocaleString('en-IN')}`,
]);

export const choosingARoomAtHotelK2: BlogPost = {
  slug: 'choosing-a-room-at-hotel-k2',
  title: 'Choosing the Right Room at Hotel K2: A Simple Comparison',
  excerpt:
    'Single, double, triple or suite? A clear comparison of the six room types at Hotel K2 in Chakradharpur, with tariffs, to help you book the right one.',
  primaryKeyword: 'Hotel K2 rooms',
  secondaryKeywords: [
    'rooms in Chakradharpur',
    'Hotel K2 room types',
    'double bed room Chakradharpur',
    'family room in Chakradharpur',
  ],
  intent: 'transactional',
  audience: 'Guests ready to book a room at Hotel K2',
  category: 'stay-rooms',
  tags: ['Hotel K2', 'Rooms', 'Booking'],
  featuredImage: '/newimages/PremiumroomDoublebed.png',
  featuredImageAlt: 'Premium double-bed room at Hotel K2, Chakradharpur',
  author: 'Hotel K2',
  publishedAt: '2026-10-17',
  seoTitle: 'Choosing the Right Room at Hotel K2 | Room Comparison',
  seoDescription:
    'Compare the six room types at Hotel K2, Chakradharpur — single, double standard, classic and premium, triple and four-bed suite — with tariffs from ₹999 a night.',
  relatedSlugs: [
    'where-to-stay-in-chakradharpur',
    'hotels-near-chakradharpur-railway-station',
    'banquet-and-conference-hall-chakradharpur',
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Hotel K2 has six room types, all air-conditioned and all with free Wi-Fi, an LED television, a geyser and power backup. The right choice usually comes down to two things: **how many people are travelling** and **how much space you want**. Here is a straightforward comparison.',
    },
    { type: 'heading', level: 2, text: 'The six room types compared' },
    {
      type: 'table',
      caption: 'Hotel K2 room types and starting tariffs (₹ per night)',
      headers: ['Room', 'Best for', 'From / night'],
      rows: ROOM_ROWS,
    },
    { type: 'heading', level: 2, text: 'How to decide' },
    {
      type: 'list',
      items: [
        '**Travelling alone** — the single-bed premium room is comfortable and good value.',
        '**A couple on a budget** — the double-bed standard room keeps costs down.',
        '**A couple wanting more comfort** — step up to the double-bed classic or premium room.',
        '**A family or group of three** — the triple-bed premium room gives everyone a bed.',
        '**A larger family or group** — the four-bed suite offers the most space.',
      ],
    },
    { type: 'heading', level: 2, text: 'What every room includes' },
    {
      type: 'paragraph',
      text: 'Whichever you choose, the essentials are the same: air conditioning, free Wi-Fi, LED TV, a geyser for hot water and power backup. Daily housekeeping and 24-hour room service are also available. You can see the full amenity list on the [rooms page](/rooms).',
    },
    { type: 'heading', level: 2, text: 'Book early for families and groups' },
    {
      type: 'paragraph',
      text: 'The larger rooms — the triple-bed premium and the four-bed suite — are the first to fill, and the data at times shows only one or two available. If your dates are fixed and you are travelling as a group, booking ahead is sensible.',
    },
    { type: 'heading', level: 2, text: 'Ready to book' },
    {
      type: 'paragraph',
      text: 'Check live availability through our online booking engine, or call the front desk on +91 8709490824. If you are part of a larger group visiting for an event, see our [conference hall and banquet guide](/blog/banquet-and-conference-hall-chakradharpur).',
    },
  ],
  faq: [
    {
      q: 'What room types does Hotel K2 offer?',
      a: 'Hotel K2 offers six types: single-bed premium, double-bed standard, double-bed classic, double-bed premium, triple-bed premium and four-bed suite. All are air-conditioned with free Wi-Fi, LED TV and geyser.',
    },
    {
      q: 'Which is the cheapest room at Hotel K2?',
      a: 'The double-bed standard room has the lowest starting tariff, from ₹999 per night. The single-bed premium room is a good value option for solo travellers.',
    },
    {
      q: 'Which room is best for a group?',
      a: 'For groups, the triple-bed premium room and the four-bed suite offer the most beds and space. Booking ahead is recommended as these rooms are limited.',
    },
  ],
};
