import { getPostBySlug, toCardData } from '@/lib/blog';
import type { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/Button';
import { BlogCard } from './BlogCard';
import page from '@/components/layout/PageContent.module.scss';
import styles from './ArticleBody.module.scss';

interface BlogTeasersProps {
  /** Slugs of published articles to surface on this page. */
  slugs: string[];
  title?: string;
  kicker?: string;
  intro?: string;
  /** Link to the full blog index. */
  allHref?: string;
}

/**
 * BlogTeasers
 * Renders relevant blog articles on existing site pages so the blog is
 * reachable from crawlable internal links (not only the main navigation).
 * Only published slugs render; invalid or draft slugs are silently skipped.
 */
export function BlogTeasers({
  slugs,
  title = 'From our blog',
  kicker = 'Travel Tips',
  intro,
  allHref = '/blog',
}: BlogTeasersProps) {
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => Boolean(post));

  if (posts.length === 0) return null;

  return (
    <section className={page.band} aria-labelledby="blog-teasers-heading">
      <div className={page.container}>
        <div className={page.sectionHead}>
          <span className={page.kicker}>{kicker}</span>
          <h2 id="blog-teasers-heading" className={page.heading}>
            {title}
          </h2>
          {intro && <p className={page.lead}>{intro}</p>}
        </div>

        <div className={styles.related}>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={toCardData(post)} />
          ))}
        </div>

        <div className={styles.moreWrap}>
          <Button href={allHref} variant="ghost">
            View all articles
          </Button>
        </div>
      </div>
    </section>
  );
}
