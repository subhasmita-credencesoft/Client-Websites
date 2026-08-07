import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Breadcrumb.module.scss';
import { SITE } from '@/data/site';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE.domain}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb" data-reveal>
      {items.map((item, i) => (
        <span key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {item.href ? (
            <Link href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.current} aria-current="page">
              {item.label}
            </span>
          )}
          {i < items.length - 1 && <span className={styles.separator}>/</span>}
        </span>
      ))}
    </nav>
    </>
  );
}
