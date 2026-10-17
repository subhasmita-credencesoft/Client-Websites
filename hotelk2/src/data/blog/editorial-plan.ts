import type { EditorialTopic } from '@/types/blog';

/**
 * Editorial backlog for the Hotel K2 blog.
 *
 * Documents the planned topic map so new articles can be written against a
 * clear primary keyword and intent, avoiding cannibalisation. Topics marked
 * `published` have a matching article in `src/data/blog/articles/`. The rest
 * are recommendations that still need to be written and fact-checked before
 * publishing — they are never auto-published.
 *
 * Keyword volumes are intentionally not asserted here: this plan is based on
 * search intent and topical fit, not on unverified volume data.
 */
export const EDITORIAL_PLAN: EditorialTopic[] = [
  {
    title: 'Where to Stay in Chakradharpur: A Complete Guide to Hotel K2',
    slug: 'where-to-stay-in-chakradharpur',
    primaryKeyword: 'where to stay in Chakradharpur',
    intent: 'commercial',
    audience: 'Travellers planning a stay in Chakradharpur',
    status: 'published',
  },
  {
    title: 'Hotels Near Chakradharpur Railway Station: What to Know Before You Book',
    slug: 'hotels-near-chakradharpur-railway-station',
    primaryKeyword: 'hotels near Chakradharpur railway station',
    intent: 'commercial',
    audience: 'Train travellers stopping in Chakradharpur',
    status: 'published',
  },
  {
    title: 'Places to Visit Near Chakradharpur: Waterfalls, Temples and Dams',
    slug: 'places-to-visit-near-chakradharpur',
    primaryKeyword: 'places to visit near Chakradharpur',
    intent: 'informational',
    audience: 'Tourists exploring West Singhbhum',
    status: 'published',
  },
  {
    title: 'Choosing the Right Room at Hotel K2: A Simple Comparison',
    slug: 'choosing-a-room-at-hotel-k2',
    primaryKeyword: 'Hotel K2 rooms',
    intent: 'transactional',
    audience: 'Guests ready to book',
    status: 'published',
  },
  {
    title: 'Planning an Event in Chakradharpur: Banquet and Conference Hall Guide',
    slug: 'banquet-and-conference-hall-chakradharpur',
    primaryKeyword: 'banquet hall in Chakradharpur',
    intent: 'commercial',
    audience: 'People organising events in Chakradharpur',
    status: 'published',
  },
  {
    title: 'How to Reach Chakradharpur: Train, Road and Air Travel Guide',
    slug: 'how-to-reach-chakradharpur',
    primaryKeyword: 'how to reach Chakradharpur',
    intent: 'informational',
    audience: 'Travellers planning a trip to Chakradharpur',
    status: 'published',
  },
  {
    title: 'A Business Traveller’s Guide to Staying in Chakradharpur',
    slug: 'business-travel-guide-chakradharpur',
    primaryKeyword: 'business hotel in Chakradharpur',
    intent: 'commercial',
    audience: 'Business travellers and contractors',
    status: 'planned',
  },
  {
    title: 'Family Stay in Chakradharpur: Tips for Travelling with Children',
    slug: 'family-stay-chakradharpur',
    primaryKeyword: 'family hotel in Chakradharpur',
    intent: 'commercial',
    audience: 'Families visiting Jharkhand',
    status: 'planned',
  },
  {
    title: 'A Weekend Itinerary Around Chakradharpur',
    slug: 'weekend-itinerary-chakradharpur',
    primaryKeyword: 'Chakradharpur itinerary',
    intent: 'informational',
    audience: 'Weekend travellers',
    status: 'planned',
  },
  {
    title: 'The Best Time to Visit Chakradharpur and West Singhbhum',
    slug: 'best-time-to-visit-chakradharpur',
    primaryKeyword: 'best time to visit Chakradharpur',
    intent: 'informational',
    audience: 'Trip planners',
    status: 'planned',
  },
  {
    title: 'What to Pack for a Trip to Jharkhand',
    slug: 'what-to-pack-jharkhand',
    primaryKeyword: 'what to pack for Jharkhand',
    intent: 'informational',
    audience: 'First-time visitors to Jharkhand',
    status: 'planned',
  },
  {
    title: 'Chakradharpur Railway Station: A Practical Guide for Passengers',
    slug: 'chakradharpur-railway-station-guide',
    primaryKeyword: 'Chakradharpur railway station',
    intent: 'informational',
    audience: 'Rail passengers',
    status: 'planned',
  },
  {
    title: 'Hirni Falls: What to Expect on a Day Trip',
    slug: 'hirni-falls-day-trip',
    primaryKeyword: 'Hirni Falls',
    intent: 'informational',
    audience: 'Nature and waterfall visitors',
    status: 'planned',
  },
  {
    title: 'Day Trips to Nakti Dam: A Calm Escape Near Chakradharpur',
    slug: 'nakti-dam-day-trip',
    primaryKeyword: 'Nakti Dam',
    intent: 'informational',
    audience: 'Day-trippers and photographers',
    status: 'planned',
  },
  {
    title: 'Temples Around Chakradharpur: Mahadevsal and Kera Mandir',
    slug: 'temples-around-chakradharpur',
    primaryKeyword: 'temples near Chakradharpur',
    intent: 'informational',
    audience: 'Pilgrims and cultural travellers',
    status: 'planned',
  },
  {
    title: 'How to Book a Hotel in Chakradharpur Directly and Save',
    slug: 'how-to-book-hotel-chakradharpur',
    primaryKeyword: 'hotel booking in Chakradharpur',
    intent: 'transactional',
    audience: 'Guests comparing booking options',
    status: 'planned',
  },
  {
    title: 'Hosting a Conference in Chakradharpur: A Checklist',
    slug: 'hosting-conference-chakradharpur',
    primaryKeyword: 'conference hall in Chakradharpur',
    intent: 'commercial',
    audience: 'Event and business organisers',
    status: 'planned',
  },
  {
    title: 'Local Food and Markets in Chakradharpur',
    slug: 'local-food-markets-chakradharpur',
    primaryKeyword: 'Etwari Bazar Chakradharpur',
    intent: 'informational',
    audience: 'Visitors interested in local culture',
    status: 'planned',
  },
];
