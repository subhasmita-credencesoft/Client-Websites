import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url;

  return {
    rules: [
      // ── All bots: allow everything except private/API paths ──
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/static/',
          '*.json$',
        ],
      },

      // ── Primary search engine crawlers — full access ──
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Googlebot-Video',
          'Storebot-Google',
          'Bingbot',
          'Slurp',          // Yahoo
          'DuckDuckBot',
          'Baiduspider',
          'YandexBot',
          'Sogou',
          'Exabot',
          'ia_archiver',    // Wayback Machine
        ],
        allow: '/',
      },

      // ── AI & LLM crawlers — allow full site (good for AI-assisted search) ──
      {
        userAgent: [
          'Google-Extended',      // Gemini training
          'GPTBot',               // OpenAI ChatGPT
          'OAI-SearchBot',        // OpenAI search
          'ClaudeBot',            // Anthropic Claude
          'PerplexityBot',        // Perplexity AI
          'Applebot',             // Apple Siri / Spotlight
          'Applebot-Extended',
          'CCBot',                // Common Crawl
          'Amazonbot',            // Alexa
          'cohere-ai',            // Cohere
          'Meta-ExternalAgent',   // Meta AI
          'Meta-ExternalFetcher',
          'Bytespider',           // ByteDance / TikTok
          'ChatGPT-User',
        ],
        allow: '/',
      },

      // ── Block aggressive scrapers and known bad bots ──
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'DotBot',
          'MJ12bot',
          'DataForSeoBot',
          'BLEXBot',
          'Screaming Frog SEO Spider',
        ],
        disallow: '/',
      },
    ],

    // ── Sitemaps — primary + image sitemap ──
    sitemap: [
      `${base}/sitemap.xml`,
      `${base}/sitemap-images.xml`,
    ],

    host: base,
  };
}
