import Link from 'next/link';
import { FALLBACK_IMAGE } from '@/data/site';
import { Container } from './Container';
import { SmartImage } from './SmartImage';
import styles from './PageHeader.module.scss';

interface PageHeaderProps {
  title: string;
  crumb: string;
  subtitle?: string;
  image: string;
}

/** Banner shown at the top of every inner page. */
export function PageHeader({ title, crumb, subtitle, image }: PageHeaderProps) {
  return (
    <section className={styles.header} aria-labelledby="page-title">
      <div className={styles.photo} aria-hidden="true">
        <SmartImage src={image} fallback={FALLBACK_IMAGE} alt="" fill priority quality={90} sizes="100vw" className={styles.img} />
      </div>
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <Container className={styles.inner}>
        <nav aria-label="Breadcrumb" className={styles.crumbs}>
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <h1 id="page-title" className={styles.title}>
          {title}
        </h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </Container>
    </section>
  );
}
