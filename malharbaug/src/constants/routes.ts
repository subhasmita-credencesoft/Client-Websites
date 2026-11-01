export const ROUTES = {
  HOME: '/',
  ROOMS: '/rooms',
  AMENITIES: '/amenities',
  RESTAURANT: '/restaurant',
  PACKAGES: '/packages',
  EVENTS: '/events',
  GALLERY: '/gallery',
  NEARBY: '/nearby',
  TRAVEL_GUIDE: '/travel-guide',
  BLOG: '/blog',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_CONDITIONS: '/terms-conditions',
  REFUND_POLICY: '/refund-policy',
  CANCELLATION_POLICY: '/cancellation-policy',
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];
