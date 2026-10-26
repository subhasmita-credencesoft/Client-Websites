import { careers } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import styles from './OpenPositions.module.scss';

export function OpenPositions() {
  return (
    <section className={styles.section} aria-labelledby="positions-title">
      <Container>
        <Reveal>
          <SectionHeading id="positions-title" eyebrow="Join Us" title="Open Positions" subtitle="Choose a role below or send a general application." />
        </Reveal>
        <ul className={styles.list}>
          {careers.positions.map((p, i) => (
            <Reveal as="li" key={p} delay={(i % 2) * 100} className={styles.item}>
              <Icon name="concierge" size={22} className={styles.icon} />
              <span>{p}</span>
              <Button href="#apply" variant="navy">
                Apply
              </Button>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
