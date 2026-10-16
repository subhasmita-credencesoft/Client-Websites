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
