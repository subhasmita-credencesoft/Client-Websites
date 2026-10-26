import { SmartImage } from '@/components/ui/SmartImage';
import { FALLBACK_IMAGE, services } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Services.module.scss';

export function Services() {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <Container>
        <Reveal>
        <SectionHeading
          id="services-title"
          eyebrow="Our Services"
          title="Comprehensive Hospitality Management Solutions"
          subtitle="We offer a range of services to support hotel operations, guest experiences and business growth."
        />
        </Reveal>
        <ul className={styles.grid}>
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % 4) * 110} variant="zoom" className={`${styles.card} ${s.layout === 'wide' ? styles.wide : ''}`}>
              <div className={styles.media}>
                <SmartImage src={s.image} fallback={FALLBACK_IMAGE} alt={s.imageAlt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className={styles.img} />
              </div>
              <div className={styles.body}>
                <Icon name={s.icon} size={22} className={styles.icon} />
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
