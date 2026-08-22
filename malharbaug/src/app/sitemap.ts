import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { rooms } from '@/data/rooms';
import { resortFacilities } from '@/data/amenities';
import { eventCategories } from '@/data/events';
import { travelGuides } from '@/data/travelGuide';
import { blogPosts } from '@/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages: { path: string; priority: number; freq: 'daily' | 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '', priority: 1, freq: 'weekly' },
    { path: '/rooms', priority: 0.9, freq: 'monthly' },
    ...rooms.map((r) => ({ path: `/rooms/${r.slug}`, priority: 0.9, freq: 'monthly' as const })),
    { path: '/amenities', priority: 0.7, freq: 'monthly' },
    ...resortFacilities.map((f) => ({ path: `/amenities/${f.slug}`, priority: 0.6, freq: 'monthly' as const })),
    { path: '/restaurant', priority: 0.7, freq: 'monthly' },
    { path: '/packages', priority: 0.8, freq: 'monthly' },
    { path: '/events', priority: 0.7, freq: 'monthly' },
    ...eventCategories.map((e) => ({ path: `/events/${e.id}`, priority: 0.6, freq: 'monthly' as const })),
    { path: '/gallery', priority: 0.5, freq: 'monthly' },
    { path: '/nearby', priority: 0.7, freq: 'monthly' },
    { path: '/travel-guide', priority: 0.8, freq: 'weekly' },
    ...travelGuides.map((g) => ({ path: `/travel-guide/${g.slug}`, priority: 0.8, freq: 'monthly' as const })),
    { path: '/blog', priority: 0.7, freq: 'weekly' },
    ...blogPosts.map((p) => ({ path: `/blog/${p.slug}`, priority: 0.7, freq: 'monthly' as const })),
    { path: '/about', priority: 0.5, freq: 'yearly' },
    { path: '/contact', priority: 0.8, freq: 'monthly' },
    { path: '/privacy-policy', priority: 0.2, freq: 'yearly' },
    { path: '/terms-conditions', priority: 0.2, freq: 'yearly' },
    { path: '/refund-policy', priority: 0.3, freq: 'yearly' },
    { path: '/cancellation-policy', priority: 0.3, freq: 'yearly' },
  ];

  return staticPages.map(({ path, priority, freq }) => ({
    url: path === '' ? `${baseUrl}/` : `${baseUrl}${path}/`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  }));
}
