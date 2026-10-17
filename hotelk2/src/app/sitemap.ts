import type { MetadataRoute } from 'next';
import { SITE } from '@/data/site';
import { ROOMS } from '@/data/rooms';
import { getCategoriesWithPosts, getPublishedPosts } from '@/lib/blog';

const BASE = SITE.url.replace(/\/$/, '');

/** Date the core marketing pages last changed (kept stable across builds). */
const STATIC_LASTMOD = new Date('2026-10-17');

/**
 * Generated XML sitemap (served at /sitemap.xml with static export).
 * Includes the core marketing pages, every room detail page, and all published
 * blog articles and their category archives. Drafts and noindex pages are
 * excluded via the `getPublishedPosts` helper.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: STATIC_LASTMOD, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/about`, lastModified: STATIC_LASTMOD, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/rooms`, lastModified: STATIC_LASTMOD, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/services`, lastModified: STATIC_LASTMOD, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/conference-hall`, lastModified: STATIC_LASTMOD, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/gallery`, lastModified: STATIC_LASTMOD, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/travel-guide`, lastModified: STATIC_LASTMOD, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: STATIC_LASTMOD, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: STATIC_LASTMOD, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const roomPages: MetadataRoute.Sitemap = ROOMS.filter((room) => room.hasDetailPage).map((room) => ({
    url: `${BASE}/rooms/${room.slug}`,
    lastModified: STATIC_LASTMOD,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = getPublishedPosts()
    .filter((post) => !post.noindex)
    .map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  const categoryPages: MetadataRoute.Sitemap = getCategoriesWithPosts().map((entry) => ({
    url: `${BASE}/blog/category/${entry.category.slug}`,
    lastModified: STATIC_LASTMOD,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticPages, ...roomPages, ...blogPages, ...categoryPages];
}
