import { about } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import styles from './ValuesGrid.module.scss';

const icons = ['shield', 'gem', 'sparkles', 'users', 'check', 'trending'] as const;

export function ValuesGrid() {
  return (
    <section className={styles.section} aria-labelledby="values-title">
      <Container>
        <Reveal>
          <SectionHeading id="values-title" eyebrow="What Guides Us" title="Our Core Values" />
        </Reveal>
        <ul className={styles.grid}>
          {about.values.map((v, i) => (
            <Reveal as="li" key={v} variant="zoom" delay={(i % 3) * 110} className={styles.card}>
              <Icon name={icons[i % icons.length] ?? 'check'} size={28} strokeWidth={1.4} className={styles.icon} />
              <h3>{v}</h3>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
