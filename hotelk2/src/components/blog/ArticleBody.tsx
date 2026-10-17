import Image from 'next/image';
import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';
import { renderInline } from '@/lib/blog-inline';
import { headingId } from '@/lib/blog';
import type { BlogBlock } from '@/types/blog';
import styles from './ArticleBody.module.scss';

interface ArticleBodyProps {
  blocks: BlogBlock[];
}

function renderBlock(block: BlogBlock, index: number): ReactNode {
  switch (block.type) {
    case 'paragraph':
      return <p key={index}>{renderInline(block.text)}</p>;

    case 'heading':
      return block.level === 2 ? (
        <h2 key={index} id={headingId(block.text)}>
          {block.text}
        </h2>
      ) : (
        <h3 key={index} id={headingId(block.text)}>
          {block.text}
        </h3>
      );

    case 'list': {
      const items = block.items.map((item, itemIndex) => (
        <li key={itemIndex}>{renderInline(item)}</li>
      ));
      return block.ordered ? (
        <ol key={index} className={styles.list}>
          {items}
        </ol>
      ) : (
        <ul key={index} className={styles.list}>
          {items}
        </ul>
      );
    }

    case 'table':
      return (
        <div key={index} className={styles.tableWrap}>
          <table className={styles.table}>
            {block.caption && <caption>{block.caption}</caption>}
            <thead>
              <tr>
                {block.headers.map((header, headerIndex) => (
                  <th key={headerIndex} scope="col">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'callout':
      return (
        <aside key={index} className={styles.callout}>
          {block.title && <strong className={styles.calloutTitle}>{block.title}</strong>}
          <p>{renderInline(block.text)}</p>
        </aside>
      );

    case 'quote':
      return (
        <blockquote key={index} className={styles.quote}>
          <p>{renderInline(block.text)}</p>
          {block.cite && <cite>{block.cite}</cite>}
        </blockquote>
      );

    case 'image':
      return (
        <figure key={index} className={styles.figure}>
          <Image
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            sizes="(min-width: 1024px) 720px, 100vw"
            className={styles.figureImage}
          />
          {block.caption && <figcaption className={styles.figcaption}>{block.caption}</figcaption>}
        </figure>
      );

    case 'links':
      return (
        <nav key={index} className={styles.linkList} aria-label={block.title}>
          <strong className={styles.linkListTitle}>{block.title}</strong>
          <ul className={styles.linkListItems}>
            {block.items.map((item) => (
              <li key={item.href}>
                {item.href.startsWith('/') ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      );

    default:
      return <Fragment key={index} />;
  }
}

/**
 * ArticleBody
 * Renders the typed content blocks of an article. Internal links use
 * `next/link`; images use the project's configured loader with explicit
 * width/height to avoid layout shift.
 */
export function ArticleBody({ blocks }: ArticleBodyProps) {
  return <div className={styles.prose}>{blocks.map(renderBlock)}</div>;
}
