export interface Experience {
  id: string;
  title: string;
  category: 'Beach & Adventure' | 'Heritage & Culture' | 'Nature & Leisure';
  distance: string;
  duration: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  highlights: string[];
}

export const EXPERIENCES_DATA: Experience[] = [
  {
    id: 'nagaon-beach-water-sports',
    title: 'Nagaon Beach Water Sports & Sunset',
    category: 'Beach & Adventure',
    distance: '4.1 km (8 mins drive)',
    duration: 'Half day',
    shortDesc:
      'The premier water-sports capital of Alibaug with thrilling jet skiing, banana rides, parasailing, and gentle flat sands.',
    fullDesc:
      'Nagaon Beach is famous for its clean, flat shores lined with whispering Suru (casuarina) trees and calm waters. It is the premier hub in Alibaug for high-adrenaline water adventures: parasailing high over the Arabian Sea, jet-skiing across crashing waves, bumper tube rides, and ATV beach rides. After the thrill, relax with fresh coconut water and local street snacks while watching fiery orange sunsets.',
    image: '/images/hero/hero-drone-sunset.jpg',
    highlights: [
      'Parasailing & Speedboat tours',
      'Jet Ski, Banana boat & Bumper rides',
      'ATV rides along the sandy shoreline',
      'Tender coconut stalls and fresh corn',
    ],
  },
  {
    id: 'akshi-beach-peaceful-retreat',
    title: 'Akshi Beach & Shoreline Walks',
    category: 'Nature & Leisure',
    distance: '5.0 km (10 mins drive)',
    duration: '2 to 3 hours',
    shortDesc:
      'A serene, untouched shoreline with tranquil casuarina trees and migratory sea birds, ideal for morning walks.',
    fullDesc:
      'If you prefer quiet contemplation away from commercial crowds, Akshi Beach is a paradise just minutes from Tarangan Resort. Bordered by dense groves of suru trees and traditional fishing settlements, the beach offers pristine waters and hosts thousands of migratory birds including sandpipers, terns, and seagulls during the winter months.',
    image: '/images/hero/hero-palm-pathway.jpg',
    highlights: [
      'Peaceful, uncrowded natural shoreline',
      'Bird-watching sanctuary for coastal migratory species',
      'Authentic fishing village lifestyle and photography',
    ],
  },
  {
    id: 'kolaba-fort-sea-citadel',
    title: 'Historical Kolaba Sea Fort',
    category: 'Heritage & Culture',
    distance: '8.7 km (18 mins drive)',
    duration: '3 hours',
    shortDesc:
      'The legendary 300-year-old sea fortress built by Chhatrapati Shivaji Maharaj, accessible during low tide.',
    fullDesc:
      'A marvel of Maratha naval engineering standing in the Arabian Sea off the coast of Alibag town. During low tide, visitors can walk or take a traditional horse cart directly through the shallow sea to reach the massive black-stone battlements. Inside, discover historic freshwater wells, ancient cannons, and the revered Siddhivinayak temple.',
    image: '/images/facilities/lawn-statue-warrior.jpg',
    highlights: [
      'Iconic 17th-century island fort architecture',
      'Walk through the sea bed during low tide',
      'Magnificent 360-degree views of the Arabian Sea',
      'Historical freshwater temple tanks surrounded by saltwater',
    ],
  },
  {
    id: 'revdanda-portuguese-ruins',
    title: 'Revdanda Beach & Portuguese Fort Ruins',
    category: 'Heritage & Culture',
    distance: '11.5 km (20 mins drive)',
    duration: 'Half day',
    shortDesc:
      'Black sand beaches, historic 16th-century Portuguese fortress walls overgrown with banyans, and betel nut gardens.',
    fullDesc:
      'Revdanda offers a fascinating blend of historical intrigue and dramatic coastal scenery. Explore the remnants of the massive Portuguese fort walls where ancient stone arches and canons stand wrapped in banyan roots right next to the beach, followed by scenic drives along coconut-fringed coastal highways.',
    image: '/images/facilities/drone-sunset-aerial.jpg',
    highlights: [
      'Dramatic black sand coastline',
      'Centuries-old stone fort arches and bell tower',
      'Fresh tender coconut and betel nut orchards',
    ],
  },
];
