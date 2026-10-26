import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ['', '/about', '/services', '/properties', '/careers', '/contact', '/privacy', '/terms', '/cookies'].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path ? 'monthly' : 'weekly',
    priority: path === '' ? 1 : ['/privacy', '/terms', '/cookies'].includes(path) ? 0.3 : 0.8,
  }));
}
