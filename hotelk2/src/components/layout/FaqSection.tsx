import styles from './PageContent.module.scss';

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
  /** Unique heading id (must be unique within the page). */
  id?: string;
}

/**
 * FaqSection
 * Renders an accessible native <details> accordion plus a matching FAQPage
 * structured-data block. Used on interior pages so each page carries its own
 * unique, page-relevant Q&A (the homepage keeps its own FAQ set).
 */
export function FaqSection({ items, title = 'Frequently asked questions', id = 'faq-heading' }: FaqSectionProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <section className={`${styles.band} ${styles.bandAlt}`} aria-labelledby={id}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>FAQs</span>
          <h2 id={id} className={styles.heading}>
            {title}
          </h2>
        </div>

        <div className={styles.faq}>
          {items.map((item) => (
            <details key={item.q} className={styles.faqItem}>
              <summary>{item.q}</summary>
              <div className={styles.faqAnswer}>{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
