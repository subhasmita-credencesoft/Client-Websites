export const PUBLIC_BLOG_API_URL =
  'https://api.bookone.io/api-lms/api/v1/marketing/public/properties/2338/blogs?organisationId=1&page=0&size=50';
export const ADMIN_BLOG_API_URL =
  'https://api.bookone.io/api-lms/api/v1/marketing/admin/properties/2338/blogs?organisationId=1&page=0&size=50';

const FETCH_TIMEOUT_MS = 10000;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;
const CACHE_TTL_MS = 60 * 1000; // 1 minute build cache

export interface ApiBlogSeo {
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImage?: string | null;
}

export interface ApiBlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
  authorName?: string | null;
  readTime?: number | null;
  publishedAt?: string | null;
  status?: string | null;
  seo?: ApiBlogSeo;
}

export interface RawCoverImage {
  url?: unknown;
  altText?: unknown;
}

export interface RawBlogItem {
  id?: unknown;
  slug?: unknown;
  title?: unknown;
  excerpt?: unknown;
  content?: unknown;
  coverImage?: RawCoverImage;
  author?: { name?: unknown } | null;
  seo?: Record<string, unknown> | null;
  readTime?: unknown;
  publishedAt?: unknown;
  status?: unknown;
}

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function optStr(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined;
}

export function extractExcerpt(
  excerptRaw: unknown,
  metaDescRaw: unknown,
  contentRaw: unknown
): string {
  const excerpt = optStr(excerptRaw);
  if (excerpt) return excerpt;

  const metaDesc = optStr(metaDescRaw);
  if (metaDesc) return metaDesc;

  const content = str(contentRaw);
  if (content) {
    const plain = content
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (plain.length > 160) {
      return plain.slice(0, 157).trim() + '...';
    }
    return plain;
  }
  return '';
}

export function normalizeBlog(item: RawBlogItem): ApiBlogPost | null {
  if (!item || typeof item !== 'object') return null;

  const slug = optStr(item.slug);
  const title = optStr(item.title);
  if (typeof item.id !== 'number' || !slug || !title) return null;

  // Filter out unpublished drafts if status is set to DRAFT
  const status = optStr(item.status);
  if (status && status.toUpperCase() === 'DRAFT') {
    return null;
  }

  const seo = item.seo ?? undefined;
  const excerpt = extractExcerpt(item.excerpt, seo?.metaDescription, item.content);

  return {
    id: item.id,
    slug,
    title,
    excerpt,
    contentHtml: str(item.content),
    coverImageUrl: optStr(item.coverImage?.url),
    coverImageAlt: optStr(item.coverImage?.altText),
    authorName: optStr(item.author?.name),
    readTime: typeof item.readTime === 'number' ? item.readTime : undefined,
    publishedAt: optStr(item.publishedAt) ?? null,
    status: status ?? 'PUBLISHED',
    seo:
      seo && typeof seo === 'object'
        ? {
            metaTitle: optStr(seo.metaTitle) ?? null,
            metaDescription: optStr(seo.metaDescription) || excerpt || null,
            canonicalUrl: optStr(seo.canonicalUrl) ?? null,
            ogTitle: optStr(seo.ogTitle) ?? null,
            ogDescription: optStr(seo.ogDescription) || excerpt || null,
            ogImage: optStr(seo.ogImage) || optStr(item.coverImage?.url) || null,
            twitterTitle: optStr(seo.twitterTitle) ?? null,
            twitterDescription: optStr(seo.twitterDescription) || excerpt || null,
            twitterImage: optStr(seo.twitterImage) || optStr(item.coverImage?.url) || null,
          }
        : undefined,
  };
}

// In-memory cache with TTL to prevent redundant network calls during build
// while allowing fresh updates in development and long-running servers.
let cachedBlogPosts: ApiBlogPost[] | null = null;
let lastCacheTime = 0;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchFromUrlWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * 100% API-based blog post fetcher with retry logic, timeout protection,
 * TTL caching, draft filtering, and graceful failure. No hardcoded blog content.
 */
export async function fetchBlogsFromApi(forceRefresh = false): Promise<ApiBlogPost[]> {
  const isDev = process.env.NODE_ENV !== 'production';
  const now = Date.now();

  // If not forcing refresh and cache is fresh, return cached posts
  if (!forceRefresh && !isDev && cachedBlogPosts !== null && now - lastCacheTime < CACHE_TTL_MS) {
    return cachedBlogPosts;
  }

  // URLs to try: primary public endpoint first, admin endpoint as fallback
  const urlsToTry = [PUBLIC_BLOG_API_URL, ADMIN_BLOG_API_URL];

  for (const url of urlsToTry) {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const res = await fetchFromUrlWithTimeout(url);

        if (!res.ok) {
          console.warn(
            `[blog-api] Attempt ${attempt}/${MAX_RETRIES} on ${url}: BookOne API responded with status ${res.status}.`
          );
          if (attempt < MAX_RETRIES) {
            await wait(RETRY_DELAY_MS * attempt);
            continue;
          }
          break; // Try next URL
        }

        const json = await res.json();
        const items = json?.data?.items;

        if (!Array.isArray(items)) {
          console.warn(
            `[blog-api] Attempt ${attempt}/${MAX_RETRIES} on ${url}: Invalid response format from BookOne API.`
          );
          if (attempt < MAX_RETRIES) {
            await wait(RETRY_DELAY_MS * attempt);
            continue;
          }
          break; // Try next URL
        }

        const normalized = items
          .map((item: RawBlogItem) => normalizeBlog(item))
          .filter((post): post is ApiBlogPost => post !== null)
          .sort((a, b) => {
            const aTime = a.publishedAt ? Date.parse(a.publishedAt) : 0;
            const bTime = b.publishedAt ? Date.parse(b.publishedAt) : 0;
            if (bTime !== aTime) return bTime - aTime;
            return b.id - a.id;
          });

        cachedBlogPosts = normalized;
        lastCacheTime = Date.now();
        return cachedBlogPosts;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn(
          `[blog-api] Attempt ${attempt}/${MAX_RETRIES} on ${url}: Network request failed (${errorMessage}).`
        );

        if (attempt < MAX_RETRIES) {
          await wait(RETRY_DELAY_MS * attempt);
        }
      }
    }
  }

  console.error(
    `[blog-api] All attempts to fetch blogs from BookOne API failed. Returning last known cache or empty list.`
  );
  // Do NOT permanently overwrite cache with empty array on network failure
  return cachedBlogPosts || [];
}

/**
 * Fetch a single blog post by slug, either from cache/API.
 */
export async function fetchBlogBySlug(slug: string): Promise<ApiBlogPost | null> {
  const blogs = await fetchBlogsFromApi();
  const found = blogs.find((b) => b.slug === slug);
  if (found) return found;

  // If not found in cache, force fresh refresh from API
  const freshBlogs = await fetchBlogsFromApi(true);
  return freshBlogs.find((b) => b.slug === slug) || null;
}
