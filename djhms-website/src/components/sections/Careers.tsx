import { SmartImage } from '@/components/ui/SmartImage';
import { careers, images } from '@/data/site';
import { CareerForm } from '@/components/forms/CareerForm';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Careers.module.scss';

export function Careers() {
  return (
    <section id="careers" className={styles.section} aria-labelledby="careers-title">
      <Container className={styles.grid}>
        <Reveal variant="left" className={styles.banner}>
          <SmartImage src={images.career.src} fallback={images.career.fallback} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className={styles.img} />
          <div className={styles.shade} />
          <div className={styles.bannerCopy}>
            <h2 id="careers-title">
              Build Your Career
              <br />
              in Hospitality
            </h2>
            <p>{careers.intro}</p>
            <Button href="#apply" arrow>
              View Open Positions
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120} className={styles.why}>
          <h3>Why Work With Us?</h3>
          <ul>
            {careers.benefits.map((b) => (
              <li key={b}>
                <Icon name="check" size={16} strokeWidth={2.5} className={styles.tick} />
                {b}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal variant="right" delay={220} className={styles.apply} id="apply">
          <h3>Apply Now</h3>
          <CareerForm />
        </Reveal>
      </Container>
    </section>
  );
}
