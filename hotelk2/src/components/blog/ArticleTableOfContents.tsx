import { headingId } from '@/lib/blog';
import type { BlogBlock } from '@/types/blog';
import styles from './ArticleBody.module.scss';

interface TocHeading {
  level: 2 | 3;
  text: string;
}

/**
 * ArticleTableOfContents
 * Builds a "On this page" navigation from the article's H2/H3 blocks. Anchors
 * match the ids assigned by ArticleBody. Hidden when there is not enough
 * structure to be useful.
 */
export function ArticleTableOfContents({ blocks }: { blocks: BlogBlock[] }) {
  const headings: TocHeading[] = blocks.flatMap((block) =>
    block.type === 'heading' ? [{ level: block.level, text: block.text }] : [],
  );

  if (headings.length < 2) return null;

  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <p className={styles.tocTitle}>On this page</p>
      <ul className={styles.tocList}>
        {headings.map((heading) => (
          <li key={headingId(heading.text)} className={heading.level === 3 ? styles.tocSub : ''}>
            <a href={`#${headingId(heading.text)}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
