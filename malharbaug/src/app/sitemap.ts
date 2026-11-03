import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { getRooms } from '@/lib/api';
import { resortFacilities } from '@/data/amenities';
import { eventCategories } from '@/data/events';
import { travelGuides } from '@/data/travelGuide';
import { blogPosts } from '@/data/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const rooms = await getRooms();
  const now = new Date();

  // Core high-priority pages — most valuable for Google ranking
  const corePages: { path: string; priority: number; freq: 'always' | 'daily' | 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '',                priority: 1.0, freq: 'daily' },      // Homepage
    { path: '/rooms',          priority: 0.95, freq: 'weekly' },    // Rooms list — high commercial intent
    { path: '/amenities',      priority: 0.85, freq: 'weekly' },    // Amenities — high informational intent
    { path: '/packages',       priority: 0.85, freq: 'weekly' },    // Packages — transactional
    { path: '/events',         priority: 0.85, freq: 'weekly' },    // Events — high local intent
    { path: '/nearby',         priority: 0.85, freq: 'weekly' },    // Nearby attractions — informational + local
    { path: '/contact',        priority: 0.85, freq: 'weekly' },    // Contact — local SEO crucial
    { path: '/about',          priority: 0.75, freq: 'monthly' },   // About — brand/trust
    { path: '/restaurant',     priority: 0.80, freq: 'weekly' },    // Dining — local intent
    { path: '/gallery',        priority: 0.70, freq: 'monthly' },   // Gallery — visual discovery
    { path: '/travel-guide',   priority: 0.85, freq: 'weekly' },    // Travel guide — informational
    { path: '/blog',           priority: 0.80, freq: 'weekly' },    // Blog — long-tail content
  ];

  // Dynamic room detail pages — high commercial intent
  const roomPages = rooms.map((r) => ({
    path: `/rooms/${r.slug}`,
    priority: 0.90,
    freq: 'weekly' as const,
  }));

  // Amenity detail pages — informational/service
  const amenityPages = resortFacilities.map((f) => ({
    path: `/amenities/${f.slug}`,
    priority: 0.80,
    freq: 'weekly' as const,
  }));

  // Event category pages — local intent
  const eventPages = eventCategories.map((e) => ({
    path: `/events/${e.id}`,
    priority: 0.75,
    freq: 'weekly' as const,
  }));

  // Travel guide posts — informational content
  const travelGuidePages = travelGuides.map((g) => ({
    path: `/travel-guide/${g.slug}`,
    priority: 0.80,
    freq: 'weekly' as const,
  }));

  // Blog posts — long-tail SEO content
  const blogPages = blogPosts.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: 0.75,
    freq: 'weekly' as const,
  }));

  // Legal / policy pages — low priority
  const legalPages = [
    { path: '/privacy-policy',       priority: 0.20, freq: 'yearly' as const },
    { path: '/terms-conditions',     priority: 0.20, freq: 'yearly' as const },
    { path: '/refund-policy',        priority: 0.20, freq: 'yearly' as const },
    { path: '/cancellation-policy',  priority: 0.20, freq: 'yearly' as const },
  ];

  const allPages = [
    ...corePages,
    ...roomPages,
    ...amenityPages,
    ...eventPages,
    ...travelGuidePages,
    ...blogPages,
    ...legalPages,
  ];

  return allPages.map(({ path, priority, freq }) => ({
    url: path === '' ? `${baseUrl}/` : `${baseUrl}${path}/`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));
}
