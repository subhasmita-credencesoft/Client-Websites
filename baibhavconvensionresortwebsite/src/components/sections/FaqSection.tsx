import Head from 'next/head';
import { PolicyItem } from '@/types';
import PolicyAccordion from '@/components/sections/PolicyAccordion';
import styles from '@/styles/FaqSection.module.scss';

interface FaqSectionProps {
  items: PolicyItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export default function FaqSection({
  items,
  eyebrow = 'FAQs',
  title = 'Frequently Asked Questions',
  subtitle = 'Quick answers to the questions our guests and event hosts ask most.',
}: FaqSectionProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
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
      <section className={styles.section}>
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.header} data-reveal>
              <p className="caption">{eyebrow}</p>
              <h2 className="h2" style={{ marginTop: 8 }}>
                {title}
              </h2>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
            <div className={styles.accordion}>
              <PolicyAccordion policies={items} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
