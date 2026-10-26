import type { MetadataRoute } from 'next';
import { business } from '@/core/config/business';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? business.website;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/search'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Applebot-Extended', 'Google-Extended'],
        allow: ['/', '/llms.txt', '/bedrooms', '/location', '/gallery', '/blog'],
        disallow: ['/api/', '/_next/', '/search'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
