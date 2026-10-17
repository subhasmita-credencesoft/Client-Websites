/**
 * Central SEO keyword plan for Hotel K2, Chakradharpur.
 *
 * Keyword hierarchy (avoid every page competing for the same term):
 * - Homepage  -> primary: "hotel in Chakradharpur"
 * - Room pages -> primary: "<room type> in Chakradharpur"
 *
 * These strings feed the `keywords` meta tag only. Rankable relevance still
 * comes from titles, headings, and body copy on each page.
 */

/** Default / homepage keyword set. */
export const SITE_KEYWORDS: string[] = [
  'hotel in Chakradharpur',
  'hotels in Chakradharpur',
  'best hotel in Chakradharpur',
  'Hotel K2 Chakradharpur',
  'Hotel K2 Chakradharpur Jharkhand',
  'Hotel K2 West Singhbhum',
  'hotels in Chakradharpur Jharkhand',
  'hotel in West Singhbhum',
  'accommodation in Chakradharpur',
  'lodging in Chakradharpur',
  'stay in Chakradharpur',
  'places to stay in Chakradharpur',
  'hotel rooms in Chakradharpur',
  'hotel booking Chakradharpur',
  'Chakradharpur hotel booking',
  'Chakradharpur hotels and rooms',
  'hotel near Chakradharpur town',
  'hotel near Etwari Bazar',
  'hotel at Station Link Road Chakradharpur',
  'hotel near Carmel School Chakradharpur',
  'hotel near Chakradharpur Railway Station',
  'hotels near Chakradharpur Railway Station',
  'hotel near Chakradharpur market',
  'budget hotel in Chakradharpur',
  'affordable hotel in Chakradharpur',
  'AC room in Chakradharpur',
  'AC hotel rooms Chakradharpur',
  'family hotel in Chakradharpur',
  'business hotel in Chakradharpur',
  'hotel with free Wi-Fi Chakradharpur',
  'hotel with room service Chakradharpur',
  'hotel with 24 hour front desk Chakradharpur',
  'Hotel K2 room booking',
  'Hotel K2 online booking',
  'Hotel K2 contact number',
];

/** Keywords shared by every room detail page. */
const ROOM_BASE_KEYWORDS: string[] = [
  'hotel room in Chakradharpur',
  'AC room in Chakradharpur',
  'AC hotel rooms Chakradharpur',
  'double bed room Chakradharpur',
  'family room in Chakradharpur',
  'hotel room booking Chakradharpur',
  'hotel room price Chakradharpur',
  'hotel room rates Chakradharpur',
  'rooms in Chakradharpur',
  'Hotel K2 rooms',
  'Hotel K2 room booking',
  'Hotel K2 Chakradharpur',
  'hotel with Wi-Fi Chakradharpur',
  'hotel with room service Chakradharpur',
  'clean hotel rooms Chakradharpur',
  'hotel room with TV Chakradharpur',
  'hotel room with geyser Chakradharpur',
  'hotel near Chakradharpur Railway Station',
];

/** Room-type specific keywords, keyed by room slug. */
const ROOM_TYPE_KEYWORDS: Record<string, string[]> = {
  'four-bed-suite-room': [
    'four bed suite room Chakradharpur',
    'suite room in Chakradharpur',
    'family room with multiple beds Chakradharpur',
    'hotel for group stay Chakradharpur',
    'family suite Chakradharpur',
  ],
  'double-bed-standard-room': [
    'double bed standard room Chakradharpur',
    'standard room in Chakradharpur',
    'budget hotel room Chakradharpur',
    'affordable rooms in Chakradharpur',
    'hotel room for two people Chakradharpur',
  ],
  'double-bed-classic-room': [
    'double bed classic room Chakradharpur',
    'classic room in Chakradharpur',
    'premium double room Chakradharpur',
    'comfortable room in Chakradharpur',
    'hotel room for couples Chakradharpur',
  ],
  'double-bed-premium-room': [
    'premium room in Chakradharpur',
    'premium double room Chakradharpur',
    'premium double AC room Chakradharpur',
    'king bed room Chakradharpur',
    'Hotel K2 premium room',
  ],
  'single-bed-premium-room': [
    'single bed room Chakradharpur',
    'single room hotel Chakradharpur',
    'solo traveller hotel Chakradharpur',
    'business room booking Chakradharpur',
    'hotel room for one person Chakradharpur',
  ],
  'triple-bed-premium-room': [
    'triple bed room Chakradharpur',
    'triple bed premium room Chakradharpur',
    'hotel room for three people Chakradharpur',
    'family hotel room Chakradharpur',
    'group stay hotel Chakradharpur',
  ],
};

/** Build the keyword list for a room detail page. */
export function roomKeywords(slug: string, name: string): string[] {
  return [
    `${name} Chakradharpur`,
    `Hotel K2 ${name}`,
    ...(ROOM_TYPE_KEYWORDS[slug] ?? []),
    ...ROOM_BASE_KEYWORDS,
  ];
}

/**
 * Per-page keyword sets for the main site pages, keyed by route slug.
 * Each page targets a single primary intent (carried by its H1 and title) plus
 * supporting long-tail variations, so no two pages compete for the same head term.
 */
export const PAGE_KEYWORDS = {
  about: [
    'about Hotel K2',
    'Hotel K2 Chakradharpur',
    'best hotel in Chakradharpur',
    'hotel in Chakradharpur Jharkhand',
    'family hotel in Chakradharpur',
    'Hotel K2 Etwari Bazar',
    'hotel near Chakradharpur Railway Station',
    'hotel with banquet hall in Chakradharpur',
    'hospitality in Chakradharpur',
    'budget hotel in Chakradharpur',
  ],
  rooms: [
    'rooms in Chakradharpur',
    'hotel rooms in Chakradharpur',
    'AC rooms in Chakradharpur',
    'premium double room Chakradharpur',
    'family room in Chakradharpur',
    'single room hotel Chakradharpur',
    'triple bed room Chakradharpur',
    'suite room in Chakradharpur',
    'hotel room price in Chakradharpur',
    'Hotel K2 room booking',
    'budget hotel rooms in Chakradharpur',
    'couple friendly hotel in Chakradharpur',
  ],
  services: [
    'hotel facilities in Chakradharpur',
    'hotel services in Chakradharpur',
    'hotel with free Wi-Fi Chakradharpur',
    'hotel with room service Chakradharpur',
    'car rental in Chakradharpur',
    'self drive scooty Chakradharpur',
    'hotel with banquet hall in Chakradharpur',
    'catering service in Chakradharpur',
    '24 hour front desk hotel Chakradharpur',
    'hotel with power backup Chakradharpur',
    'Hotel K2 amenities',
  ],
  'conference-hall': [
    'conference hall in Chakradharpur',
    'meeting hall in Chakradharpur',
    'banquet hall in Chakradharpur',
    'conference hall booking Chakradharpur',
    'business meetings Chakradharpur',
    'party hall in Chakradharpur',
    'marriage hall in Chakradharpur',
    'event venue in Chakradharpur',
    'seminar hall Chakradharpur',
    'Hotel K2 conference hall',
  ],
  gallery: [
    'Hotel K2 photos',
    'Hotel K2 Chakradharpur photos',
    'Hotel K2 room photos',
    'hotel room photos Chakradharpur',
    'Hotel K2 exterior photos',
    'Hotel K2 conference hall photos',
    'hotel gallery Chakradharpur',
    'Hotel K2 images',
  ],
  contact: [
    'Hotel K2 contact Chakradharpur',
    'Hotel K2 phone number',
    'Hotel K2 address Chakradharpur',
    'Hotel K2 Chakradharpur location',
    'how to reach Hotel K2 Chakradharpur',
    'hotel near Chakradharpur Railway Station',
    'Hotel K2 directions',
    'Hotel K2 booking contact',
  ],
  'travel-guide': [
    'places to visit in Chakradharpur',
    'Chakradharpur tourist places',
    'Hirni Falls',
    'Mahadevsal Temple',
    'Nakti Dam',
    'things to do in Chakradharpur',
    'tourist attractions West Singhbhum',
    'Chakradharpur travel guide',
    'places near Chakradharpur',
    'sightseeing in Chakradharpur',
  ],
};
