import { SITE } from '@/data/site';
import { Button } from '@/components/ui/Button';
import styles from './PageContent.module.scss';

interface CtaSectionProps {
  title: string;
  text: string;
  /** Optional internal link shown as a secondary action. */
  secondaryHref?: string;
  secondaryLabel?: string;
}

/**
 * CtaSection
 * Shared closing call-to-action panel for interior pages. Always offers the
 * direct booking action and, optionally, one internal link.
 */
export function CtaSection({ title, text, secondaryHref, secondaryLabel }: CtaSectionProps) {
  return (
    <section className={styles.band}>
      <div className={styles.container}>
        <div className={`${styles.cta} ${styles.narrow}`}>
          <h2 className={styles.ctaTitle}>{title}</h2>
          <p className={styles.ctaText}>{text}</p>
          <div className={styles.ctaActions}>
            <Button href={SITE.bookingUrl} variant="primary">
              Book Now
            </Button>
            {secondaryHref && secondaryLabel && (
              <Button href={secondaryHref} variant="ghost">
                {secondaryLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
