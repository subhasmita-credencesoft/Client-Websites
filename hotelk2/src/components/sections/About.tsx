import Image from 'next/image';
import { ABOUT, SITE } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import styles from './About.module.scss';

/**
 * About — mirrors the source site's welcome block. Holds the page's single h1
 * (as on the live site) with justified body copy, a Book Now CTA, and the
 * property photo on the left at desktop (scroll-reveal animation).
 */
export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.container}>
        <div className={styles.grid}>
          <Reveal direction="right" className={styles.content}>
            <h1 id="about-heading" className={styles.heading}>
              {ABOUT.heading}
            </h1>
            <p className={styles.body}>{ABOUT.body}</p>
            <div className={styles.actions}>
              <Button href={SITE.bookingUrl} variant="primary">
                Book Now
              </Button>
            </div>
          </Reveal>

          <Reveal direction="left" delay={120} className={styles.mediaWrap}>
            <Image
              src={ABOUT.image}
              alt={ABOUT.imageAlt}
              width={960}
              height={400}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={styles.image}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
