import type { MetadataRoute } from 'next';

import { journalCards } from '@/features/blog';
import { business } from '@/core/config/business';
import { roomSlugsById } from '@/core/config/hotelmate';
import { ROUTES } from '@/core/constants/routes';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? business.website;

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: 'daily' | 'weekly' | 'monthly';
  }> = [
    { path: ROUTES.home, priority: 1.0, changeFrequency: 'daily' },
    { path: ROUTES.bedrooms, priority: 0.9, changeFrequency: 'daily' },
    { path: ROUTES.location, priority: 0.8, changeFrequency: 'monthly' },
    { path: ROUTES.contact, priority: 0.8, changeFrequency: 'monthly' },
    { path: ROUTES.gallery, priority: 0.75, changeFrequency: 'weekly' },
    { path: ROUTES.blog, priority: 0.8, changeFrequency: 'weekly' },
    { path: ROUTES.thingsToDo, priority: 0.75, changeFrequency: 'monthly' },
    { path: ROUTES.leisure, priority: 0.7, changeFrequency: 'monthly' },
    { path: ROUTES.kids, priority: 0.7, changeFrequency: 'monthly' },
  ];

  const now = new Date();

  const dynamicRoutes: MetadataRoute.Sitemap = [
    // Unique room detail pages
    ...Array.from(new Set(Object.values(roomSlugsById))).map((slug) => ({
      url: `${BASE_URL}${ROUTES.bedroom(slug)}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.85,
    })),
    // Blog articles
    ...journalCards.map((c) => ({
      url: `${BASE_URL}${ROUTES.blogDetail(c.slug)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${BASE_URL}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...dynamicRoutes,
  ];
}
