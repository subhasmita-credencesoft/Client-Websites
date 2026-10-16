import type { MetadataRoute } from 'next';
import { fetchRoomIds } from '@/lib/api/hotel';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

const staticRoutes: MetadataRoute.Sitemap = [
  '',
  '/rooms-rates/',
  '/restaurant/',
  '/dining/',
  '/dining/fiesta/',
  '/dining/madira/',
  '/banquet/',
  '/tourism/',
  '/contact/',
].map((path) => ({
  url: new URL(path || '/', SITE_URL).toString(),
  changeFrequency: 'weekly' as const,
  priority: path === '' ? 1 : 0.7,
}));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let roomRoutes: MetadataRoute.Sitemap = [];
  try {
    const ids = await fetchRoomIds();
    roomRoutes = ids.map((id) => ({
      url: new URL(`/rooms-rates/${id}/`, SITE_URL).toString(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }));
  } catch {
    roomRoutes = [];
  }
  return [...staticRoutes, ...roomRoutes];
}
