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

  const staticPages: { path: string; priority: number; freq: 'daily' | 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '', priority: 1.0, freq: 'daily' },
    { path: '/rooms', priority: 0.9, freq: 'weekly' },
    ...rooms.map((r) => ({ path: `/rooms/${r.slug}`, priority: 0.9, freq: 'weekly' as const })),
    { path: '/amenities', priority: 0.8, freq: 'weekly' },
    ...resortFacilities.map((f) => ({ path: `/amenities/${f.slug}`, priority: 0.8, freq: 'weekly' as const })),
    { path: '/restaurant', priority: 0.8, freq: 'weekly' },
    { path: '/packages', priority: 0.8, freq: 'weekly' },
    { path: '/events', priority: 0.8, freq: 'weekly' },
    ...eventCategories.map((e) => ({ path: `/events/${e.id}`, priority: 0.7, freq: 'weekly' as const })),
    { path: '/gallery', priority: 0.7, freq: 'monthly' },
    { path: '/nearby', priority: 0.7, freq: 'weekly' },
    { path: '/travel-guide', priority: 0.8, freq: 'weekly' },
    ...travelGuides.map((g) => ({ path: `/travel-guide/${g.slug}`, priority: 0.8, freq: 'weekly' as const })),
    { path: '/blog', priority: 0.8, freq: 'weekly' },
    ...blogPosts.map((p) => ({ path: `/blog/${p.slug}`, priority: 0.8, freq: 'weekly' as const })),
    { path: '/about', priority: 0.6, freq: 'monthly' },
    { path: '/contact', priority: 0.8, freq: 'weekly' },
    { path: '/privacy-policy', priority: 0.3, freq: 'yearly' },
    { path: '/terms-conditions', priority: 0.3, freq: 'yearly' },
    { path: '/refund-policy', priority: 0.3, freq: 'yearly' },
    { path: '/cancellation-policy', priority: 0.3, freq: 'yearly' },
  ];

  return staticPages.map(({ path, priority, freq }) => ({
    url: path === '' ? `${baseUrl}/` : `${baseUrl}${path}/`,
    lastModified: new Date('2026-11-01T00:00:00.000Z'),
    changeFrequency: freq,
    priority,
  }));
}
