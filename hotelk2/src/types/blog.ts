/**
 * Blog content model.
 *
 * Articles are stored as typed, structured content (not raw HTML/MDX) so the
 * project keeps its zero-extra-dependency, static-export-friendly setup while
 * still supporting rich, reusable article layouts. A single source of truth
 * feeds the listing page, article pages, category archives, sitemap and
 * structured data.
 */

export type BlogIntent =
  | 'informational'
  | 'commercial'
  | 'transactional'
  | 'navigational';

export interface BlogCategory {
  slug: string;
  name: string;
  /** Short, unique intro shown on the category archive page. */
  description: string;
  /** Representative photo (path under /public) used on the category banner. */
  image: string;
  imageAlt: string;
}

/**
 * A single block of article body content.
 * Inline links and bold are written in the text using `[label](/path)` and
 * `**bold**`; see `renderInline` in `src/lib/blog-inline.tsx`.
 */
export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'table'; caption?: string; headers: string[]; rows: string[][] }
  | { type: 'callout'; title?: string; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | {
      type: 'image';
      src: string;
      alt: string;
      caption?: string;
      width: number;
      height: number;
    }
  | { type: 'links'; title: string; items: { label: string; href: string }[] };

export interface BlogFaqItem {
  q: string;
  a: string;
}

export interface BlogPost {
  /** URL slug; article lives at `/blog/<slug>`. */
  slug: string;
  /** Visible H1 / card title. */
  title: string;
  /** Short summary used on cards, meta descriptions fallbacks and related lists. */
  excerpt: string;
  /** Primary target query. Documentation only — never emitted as a meta keyword. */
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: BlogIntent;
  audience: string;
  /** Category slug (must exist in BLOG_CATEGORIES). */
  category: string;
  tags: string[];
  featuredImage: string;
  featuredImageAlt: string;
  /** Genuine author/publisher. Uses the organisation, not a fabricated person. */
  author: string;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  /** ISO date; only set when the article is meaningfully revised. */
  updatedAt?: string;
  seoTitle: string;
  seoDescription: string;
  relatedSlugs: string[];
  /** Marks the single hero article on the blog index. */
  featured?: boolean;
  /** Drafts are excluded from listings, categories and the sitemap. */
  draft?: boolean;
  /** Opt a single article out of indexing (rarely needed). */
  noindex?: boolean;
  content: BlogBlock[];
  faq?: BlogFaqItem[];
}

/** Editorial backlog entry — documents planned and published topics. */
export interface EditorialTopic {
  title: string;
  slug: string;
  primaryKeyword: string;
  intent: BlogIntent;
  audience: string;
  status: 'published' | 'planned';
}
