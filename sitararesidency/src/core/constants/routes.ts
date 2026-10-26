/**
 * Canonical route paths. Import these instead of hardcoding path strings so
 * navigation and links stay consistent across the app.
 */
export const ROUTES = {
  home: '/',
  bedrooms: '/bedrooms',
  bedroom: (slug: string) => `/bedrooms/${slug}`,
  dining: '/dining',
  diningDetail: (slug: string) => `/dining/${slug}`,
  blog: '/blog',
  blogDetail: (slug: string) => `/blog/${slug}`,
  gallery: '/gallery',
  contact: '/contact',
  location: '/location',
  leisure: '/leisure',
  kids: '/kids',
  thingsToDo: '/things-to-do',
  search: '/search',
  manageBooking: '/manage-booking',
} as const;

export type RouteKey = keyof typeof ROUTES;
