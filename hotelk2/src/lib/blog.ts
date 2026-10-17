import type { BlogBlock, BlogCategory, BlogPost } from '@/types/blog';
import { BLOG_CATEGORIES, BLOG_POSTS } from '@/data/blog';

export const BLOG_BASE_PATH = '/blog';

export function postPath(slug: string): string {
  return `${BLOG_BASE_PATH}/${slug}`;
}

export function categoryPath(slug: string): string {
  return `${BLOG_BASE_PATH}/category/${slug}`;
}

/** Published posts, newest first. Drafts are always excluded. */
export function getPublishedPosts(): BlogPost[] {
  return BLOG_POSTS.filter((post) => !post.draft).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getFeaturedPost(): BlogPost | undefined {
  const posts = getPublishedPosts();
  return posts.find((post) => post.featured) ?? posts[0];
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug && !post.draft);
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return getPublishedPosts().filter((post) => post.category === categorySlug);
}

export interface CategoryWithPosts {
  category: BlogCategory;
  posts: BlogPost[];
}

/** Categories that actually contain published content (no empty archives). */
export function getCategoriesWithPosts(): CategoryWithPosts[] {
  return BLOG_CATEGORIES.map((category) => ({
    category,
    posts: getPostsByCategory(category.slug),
  })).filter((entry) => entry.posts.length > 0);
}

/**
 * Related posts: explicit `relatedSlugs` first, then other posts in the same
 * category, so the section is always populated with genuinely relevant links.
 */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const published = getPublishedPosts().filter((p) => p.slug !== post.slug);
  const bySlug = new Map(published.map((p) => [p.slug, p]));
  const related: BlogPost[] = [];

  for (const slug of post.relatedSlugs) {
    const found = bySlug.get(slug);
    if (found && !related.includes(found)) related.push(found);
  }
  for (const candidate of published) {
    if (related.length >= limit) break;
    if (candidate.category === post.category && !related.includes(candidate)) related.push(candidate);
  }
  return related.slice(0, limit);
}

function collectText(post: BlogPost): string {
  const parts: string[] = [post.title, post.excerpt];

  const pushBlock = (block: BlogBlock) => {
    switch (block.type) {
      case 'paragraph':
      case 'heading':
      case 'callout':
      case 'quote':
        parts.push(block.text);
        break;
      case 'list':
        parts.push(...block.items);
        break;
      case 'table':
        parts.push(...block.headers, ...block.rows.flat());
        break;
      case 'image':
        if (block.caption) parts.push(block.caption);
        break;
      case 'links':
        parts.push(block.title, ...block.items.map((item) => item.label));
        break;
    }
  };

  post.content.forEach(pushBlock);
  post.faq?.forEach((item) => parts.push(item.q, item.a));
  return parts.join(' ');
}

/** Plain-text version of a post with inline markup stripped. */
export function getPostText(post: BlogPost): string {
  return collectText(post)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1');
}

/** Estimated reading time in minutes (assumes ~200 words per minute). */
export function readingTimeMinutes(post: BlogPost): number {
  const words = getPostText(post).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const DATE_FORMATTER = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** Formats an ISO date (YYYY-MM-DD) without timezone drift. */
export function formatPostDate(iso: string): string {
  return DATE_FORMATTER.format(new Date(`${iso}T00:00:00Z`));
}

/** Stable, URL-safe id for headings so table-of-contents links resolve. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function getCategoryName(slug: string): string {
  return BLOG_CATEGORIES.find((category) => category.slug === slug)?.name ?? slug;
}

/** Serializable subset passed to the client-side blog explorer. */
export interface BlogCardData {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryName: string;
  publishedAt: string;
  dateLabel: string;
  readingTime: number;
  image: string;
  imageAlt: string;
}

export function toCardData(post: BlogPost): BlogCardData {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    categoryName: getCategoryName(post.category),
    publishedAt: post.publishedAt,
    dateLabel: formatPostDate(post.publishedAt),
    readingTime: readingTimeMinutes(post),
    image: post.featuredImage,
    imageAlt: post.featuredImageAlt,
  };
}

export function getAllCardData(): BlogCardData[] {
  return getPublishedPosts().map(toCardData);
}
