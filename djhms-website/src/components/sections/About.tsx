import { SmartImage } from '@/components/ui/SmartImage';
import { about, images } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import styles from './About.module.scss';

export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <Container className={styles.grid}>
        <Reveal as="figure" variant="left" className={styles.media}>
          <SmartImage src={images.about.src} fallback={images.about.fallback} alt="Elegant hotel bedroom with blue upholstered headboard" fill sizes="(min-width: 1024px) 30vw, 100vw" className={styles.img} />
          <figcaption className={styles.badge}>
            Your Trusted Partner
            <br />
            in Hospitality Management
          </figcaption>
        </Reveal>

        <Reveal className={styles.copy} delay={120}>
          <p className={styles.eyebrow}>About Us</p>
          <h2 id="about-title" className={styles.title}>
            Who We Are
          </h2>
          <p className={styles.text}>{about.paragraph}</p>
          <Button href="/about" arrow>
            Learn More
          </Button>
        </Reveal>

        <Reveal variant="right" delay={240} className={styles.card}>
          <div className={styles.item}>
            <Icon name="target" size={34} strokeWidth={1.3} className={styles.icon} />
            <div>
              <h3>Our Mission</h3>
              <p>{about.mission}</p>
            </div>
          </div>
          <div className={styles.item}>
            <Icon name="eye" size={34} strokeWidth={1.3} className={styles.icon} />
            <div>
              <h3>Our Vision</h3>
              <p>{about.vision}</p>
            </div>
          </div>
          <div className={styles.item}>
            <Icon name="gem" size={34} strokeWidth={1.3} className={styles.icon} />
            <div>
              <h3>Our Values</h3>
              <ul className={styles.values}>
                {about.values.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
