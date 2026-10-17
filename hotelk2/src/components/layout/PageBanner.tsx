import Link from 'next/link';
import { SITE } from '@/data/site';
import { Reveal } from '@/components/ui/Reveal';
import styles from './PageBanner.module.scss';

interface PageBannerProps {
  /** Small uppercase label above the title. */
  eyebrow: string;
  /** Page H1. */
  title: string;
  /** Optional supporting line under the title. */
  subtitle?: string;
  /** Label for the current page in the breadcrumb trail. */
  breadcrumbLabel: string;
  /** Absolute path of the page, e.g. `/about`. */
  path: string;
  /** Optional middle crumb, e.g. Blog on an article page (Home → parent → current). */
  parent?: { label: string; href: string };
  /** Optional background photograph (path under /public) behind the title. */
  image?: string;
}

/**
 * PageBanner
 * Shared navy banner used by every interior page. Holds the page's single H1,
 * a breadcrumb trail, and an auto-generated BreadcrumbList structured-data
 * block (Home → current page), so interior pages stay consistent and unique.
 */
export function PageBanner({ eyebrow, title, subtitle, breadcrumbLabel, path, parent, image }: PageBannerProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      ...(parent
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: parent.label,
              item: `${SITE.url}${parent.href.replace(/^\//, '')}`,
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: parent ? 3 : 2,
        name: breadcrumbLabel,
        item: `${SITE.url}${path.replace(/^\//, '')}`,
      },
    ],
  };

  return (
    <section className={styles.banner} aria-labelledby="page-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className={styles.bg} aria-hidden="true">
        {image && (
          <span className={styles.bgPhoto} style={{ backgroundImage: `url(${image})` }} />
        )}
        {image && <span className={styles.bgOverlay} />}
      </div>

      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            {parent && (
              <li>
                <Link href={parent.href}>{parent.label}</Link>
              </li>
            )}
            <li aria-current="page">{breadcrumbLabel}</li>
          </ol>
        </nav>

        <Reveal className={styles.inner}>
          <span className={styles.kicker}>{eyebrow}</span>
          <h1 id="page-title" className={styles.title}>
            {title}
          </h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}
