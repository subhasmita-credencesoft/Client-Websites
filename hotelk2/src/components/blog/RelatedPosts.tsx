import { toCardData } from '@/lib/blog';
import type { BlogPost } from '@/types/blog';
import { BlogCard } from './BlogCard';
import page from '@/components/layout/PageContent.module.scss';
import styles from './ArticleBody.module.scss';

interface RelatedPostsProps {
  posts: BlogPost[];
  title?: string;
  kicker?: string;
}

/**
 * RelatedPosts
 * Full-width band showing genuinely related articles (explicit relations
 * first, then same-category posts). Renders nothing when there is no match.
 */
export function RelatedPosts({ posts, title = 'Related reading', kicker = 'Keep Exploring' }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className={`${page.band} ${page.bandAlt}`} aria-labelledby="related-heading">
      <div className={page.container}>
        <div className={page.sectionHead}>
          <span className={page.kicker}>{kicker}</span>
          <h2 id="related-heading" className={page.heading}>
            {title}
          </h2>
        </div>

        <div className={styles.related}>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={toCardData(post)} />
          ))}
        </div>
      </div>
    </section>
  );
}
