import type { BlogCategory } from '@/types/blog';

/**
 * Blog categories.
 *
 * A category archive page is generated for every category that has at least
 * one published article (see `getCategoriesWithPosts`). Each category here
 * carries enough published content to be genuinely useful rather than thin.
 */
export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'stay-rooms',
    name: 'Stay & Rooms',
    description:
      'Practical guidance on choosing and booking accommodation in Chakradharpur — room types, tariffs and what to look for near the railway station.',
    image: '/newimages/PremiumroomDoublebed3.png',
    imageAlt: 'Premium room at Hotel K2, Chakradharpur',
  },
  {
    slug: 'local-travel',
    name: 'Local Travel',
    description:
      'How to reach Chakradharpur and what to see around West Singhbhum — travel routes, waterfalls, temples and day-trip ideas.',
    image: '/nearbyimage/hirnifall.png',
    imageAlt: 'Hirni Falls near Chakradharpur, Jharkhand',
  },
  {
    slug: 'hotel-guide',
    name: 'Hotel Guide & Events',
    description:
      'Everything about staying and celebrating at Hotel K2 — an overview of the hotel and advice for conferences, banquets and events.',
    image: '/conference/confresshall1.jpeg',
    imageAlt: 'Conference and banquet hall at Hotel K2, Chakradharpur',
  },
];

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((category) => category.slug === slug);
}
