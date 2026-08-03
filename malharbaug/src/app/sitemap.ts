import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://malharbaugresort.com';
  const pages = [
    '', '/about', '/rooms', '/rooms/luxury-deluxe', '/rooms/family-suite', '/rooms/private-villa',
    '/amenities', '/amenities/swimming-pool', '/amenities/kids-activities',
    '/amenities/indoor-games', '/amenities/outdoor-games', '/amenities/garden', '/amenities/open-lawn',
    '/amenities/restaurant', '/amenities/parking', '/amenities/free-wifi', '/amenities/24-hour-front-desk',
    '/amenities/room-service', '/amenities/family-seating', '/amenities/event-lawn', '/amenities/bbq-area',
    '/amenities/bonfire-area', '/amenities/rain-dance', '/amenities/conference-space',
    '/amenities/power-backup', '/amenities/daily-housekeeping',
    '/restaurant', '/gallery', '/events',
    '/events/corporate', '/events/wedding', '/events/birthday', '/events/team-outing',
    '/events/family-gathering', '/events/anniversary', '/events/engagement', '/events/baby-shower',
    '/events/bachelor-party', '/events/school-picnic', '/events/private-event',
    '/packages', '/offers', '/nearby', '/contact', '/privacy-policy', '/terms-conditions',
    '/refund-policy', '/cancellation-policy',
  ];
  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'weekly' as const : 'monthly' as const,
    priority: page === '' ? 1 : page.startsWith('/rooms') || page.startsWith('/packages') ? 0.8 : 0.5,
  }));
}
