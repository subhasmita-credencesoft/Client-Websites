import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import styles from './CtaBand.module.scss';

interface CtaBandProps {
  /** Hide one of the two cards when it would point at the page you are already on. */
  hide?: 'careers' | 'contact';
}

export function CtaBand({ hide }: CtaBandProps) {
  return (
    <section className={styles.section} aria-label="Next steps">
      <Container className={`${styles.grid} ${hide ? styles.single : ''}`}>
        {hide !== 'careers' && (
          <Reveal variant="left" className={styles.card}>
            <h2>Build Your Career in Hospitality</h2>
            <p>Join a professional, supportive team and grow with us.</p>
            <Button href="/careers" arrow>
              View Open Positions
            </Button>
          </Reveal>
        )}
        {hide !== 'contact' && (
          <Reveal variant="right" delay={120} className={`${styles.card} ${styles.alt}`}>
            <h2>Looking for a Management Partner?</h2>
            <p>Hotel owners and business partners – tell us about your property.</p>
            <Button href="/contact" variant="outline" arrow>
              Contact Us
            </Button>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
