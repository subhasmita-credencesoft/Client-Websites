import Image from 'next/image';
import Link from 'next/link';
import { postPath, type BlogCardData } from '@/lib/blog';
import styles from './BlogCard.module.scss';

interface BlogCardProps {
  post: BlogCardData;
  /** Renders the wide hero layout used for the featured article. */
  featured?: boolean;
}

/**
 * BlogCard
 * Presentational article card used on the blog index, category archives, the
 * related-articles section and blog teasers. A single semantic <article> with
 * a real link, a fixed aspect-ratio image (no layout shift) and a <time> date.
 */
export function BlogCard({ post, featured = false }: BlogCardProps) {
  const href = postPath(post.slug);

  return (
    <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <Link href={href} className={styles.imageLink} tabIndex={-1} aria-hidden="true">
        <div className={styles.imageWrap}>
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes={featured ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
            className={styles.image}
          />
        </div>
      </Link>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>{post.categoryName}</span>
          <span className={styles.dot} aria-hidden="true">
            &middot;
          </span>
          <time dateTime={post.publishedAt} className={styles.date}>
            {post.dateLabel}
          </time>
        </div>

        <h3 className={styles.title}>
          <Link href={href} className={styles.titleLink}>
            {post.title}
          </Link>
        </h3>

        <p className={styles.excerpt}>{post.excerpt}</p>

        <div className={styles.footer}>
          <span className={styles.readTime}>{post.readingTime} min read</span>
          <Link href={href} className={styles.readMore}>
            Read article
          </Link>
        </div>
      </div>
    </article>
  );
}
