import type { BlogPost } from '@/types/blog';
import { whereToStayInChakradharpur } from './articles/where-to-stay-in-chakradharpur';
import { hotelsNearChakradharpurRailwayStation } from './articles/hotels-near-chakradharpur-railway-station';
import { placesToVisitNearChakradharpur } from './articles/places-to-visit-near-chakradharpur';
import { choosingARoomAtHotelK2 } from './articles/choosing-a-room-at-hotel-k2';
import { banquetAndConferenceHall } from './articles/banquet-and-conference-hall-chakradharpur';
import { howToReachChakradharpur } from './articles/how-to-reach-chakradharpur';

/**
 * Single source of truth for every article. Add a new import + entry here when
 * a new post file is created. Ordering for display is handled in `src/lib/blog.ts`.
 */
export const BLOG_POSTS: BlogPost[] = [
  whereToStayInChakradharpur,
  hotelsNearChakradharpurRailwayStation,
  placesToVisitNearChakradharpur,
  choosingARoomAtHotelK2,
  banquetAndConferenceHall,
  howToReachChakradharpur,
];

export { BLOG_CATEGORIES, getCategoryBySlug } from './categories';
export { EDITORIAL_PLAN } from './editorial-plan';
