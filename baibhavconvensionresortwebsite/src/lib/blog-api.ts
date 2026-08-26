const BLOG_API_BASE = 'https://api.bookone.io/api-lms/api/v1/marketing/admin';
const PROPERTY_ID = 2338;
const ORGANISATION_ID = 1;
const PAGE_SIZE = 50;

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
  seo?: ApiBlogSeo;
}

interface RawCoverImage {
  url?: unknown;
  altText?: unknown;
}

interface RawBlogItem {
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
}

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function optStr(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() !== '' ? value : undefined;
}

function normalizeBlog(item: RawBlogItem): ApiBlogPost | null {
  const slug = optStr(item.slug);
  const title = optStr(item.title);
  if (!item || typeof item.id !== 'number' || !slug || !title) return null;

  const seo = item.seo ?? undefined;

  return {
    id: item.id,
    slug,
    title,
    excerpt: str(item.excerpt),
    contentHtml: str(item.content),
    coverImageUrl: optStr(item.coverImage?.url),
    coverImageAlt: optStr(item.coverImage?.altText),
    authorName: optStr(item.author?.name),
    readTime: typeof item.readTime === 'number' ? item.readTime : undefined,
    publishedAt: optStr(item.publishedAt) ?? null,
    seo:
      seo && typeof seo === 'object'
        ? {
            metaTitle: optStr(seo.metaTitle) ?? null,
            metaDescription: optStr(seo.metaDescription) ?? null,
            canonicalUrl: optStr(seo.canonicalUrl) ?? null,
            ogTitle: optStr(seo.ogTitle) ?? null,
            ogDescription: optStr(seo.ogDescription) ?? null,
            ogImage: optStr(seo.ogImage) ?? null,
            twitterTitle: optStr(seo.twitterTitle) ?? null,
            twitterDescription: optStr(seo.twitterDescription) ?? null,
            twitterImage: optStr(seo.twitterImage) ?? null,
          }
        : undefined,
  };
}

export async function fetchBlogsFromApi(): Promise<ApiBlogPost[]> {
  try {
    const res = await fetch(
      `${BLOG_API_BASE}/properties/${PROPERTY_ID}/blogs?organisationId=${ORGANISATION_ID}&page=0&size=${PAGE_SIZE}`,
      { headers: { Accept: 'application/json' } }
    );
    if (!res.ok) {
      console.error(`Blog API responded with ${res.status}`);
      return [];
    }
    const json = await res.json();
    const items = json?.data?.items;
    if (!Array.isArray(items)) return [];
    return items
      .map((item: RawBlogItem) => normalizeBlog(item))
      .filter((post): post is ApiBlogPost => post !== null)
      .sort((a, b) => {
        const aTime = a.publishedAt ? Date.parse(a.publishedAt) : 0;
        const bTime = b.publishedAt ? Date.parse(b.publishedAt) : 0;
        if (bTime !== aTime) return bTime - aTime;
        return b.id - a.id;
      });
  } catch (error) {
    console.error('Failed to load blogs from API', error);
    return [];
  }
}
