import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/InnerHero.module.scss';
import { SITE } from '@/data/site';

export interface InnerHeroBreadcrumbItem {
  label: string;
  href?: string;
}

interface InnerHeroProps {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  breadcrumb?: InnerHeroBreadcrumbItem[];
}

export default function InnerHero({ image, eyebrow, title, subtitle, cta, breadcrumb }: InnerHeroProps) {
  const jsonLd =
    breadcrumb && breadcrumb.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumb.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.label,
            ...(item.href ? { item: `${SITE.domain}${item.href}` } : {}),
          })),
        }
      : null;

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={image} fetchPriority="high" />
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </Head>
      <section className={styles.hero} aria-label={title}>
      <div className={styles.background} style={{ backgroundImage: `url('${image}')` }} role="img" aria-label={title} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            {breadcrumb.map((item, i) => (
              <span key={item.label} className={styles.breadcrumbItem}>
                {item.href ? (
                  <Link href={item.href} className={styles.breadcrumbLink}>
                    {item.label}
                  </Link>
                ) : (
                  <span className={styles.breadcrumbCurrent} aria-current="page">
                    {item.label}
                  </span>
                )}
                {i < breadcrumb.length - 1 && <span className={styles.breadcrumbSeparator}>/</span>}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {cta && (
          <div className={styles.ctaRow}>
            <Link href={cta.href} className="btn btn-light">
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </section>
    </>
  );
}
