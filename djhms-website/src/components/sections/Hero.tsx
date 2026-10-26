import { highlights, images, site } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { HeroBackdrop } from './HeroBackdrop';
import styles from './Hero.module.scss';

// Deterministic "gold dust" particles (no Math.random → no hydration mismatch).
const particles = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  size: 3 + ((i * 5) % 7),
  duration: 11 + ((i * 3) % 9),
  delay: -((i * 2.3) % 14),
}));

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <HeroBackdrop layers={[images.hero]} />
      <div className={styles.overlay} />
      <div className={styles.light} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.particles} aria-hidden="true">
        {particles.map((p, i) => (
          <span key={i} style={{ left: p.left, width: p.size, height: p.size, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }} />
        ))}
      </div>
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <p className={`${styles.eyebrow} ${styles.in1}`}>{site.name.toUpperCase()}</p>
          <h1 id="hero-title" className={styles.title}>
            <span className={`${styles.line} ${styles.in2}`}>Elevating Hospitality.</span>
            <span className={`${styles.line} ${styles.in3}`}>Creating Memorable Experiences.</span>
          </h1>
          <p className={`${styles.lead} ${styles.in4}`}>
            Professional hospitality management focused on comfortable stays, efficient hotel operations and thoughtful guest service.
          </p>
          <div className={`${styles.actions} ${styles.in5}`}>
            <Button href="/services" arrow>
              Our Services
            </Button>
            <Button href="/contact" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
        <ul className={styles.highlights}>
          {highlights.map((h, i) => (
            <li key={h.title} style={{ animationDelay: `${0.9 + i * 0.18}s` }}>
              <Icon name={h.icon} size={30} strokeWidth={1.4} className={styles.icon} />
              <span>
                {h.title}
                <br />
                {h.subtitle}
              </span>
            </li>
          ))}
        </ul>
      </Container>
      {/* <a href="#about" className={styles.scroll} aria-label="Scroll to About section">
        <span />
      </a> */}
    </section>
  );
}
