import Image from 'next/image';
import { SERVICES } from '@/data/services';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Services.module.scss';

/**
 * Services — mirrors the source site's terracotta icon tiles. Icons are
 * grayscale + inverted so dark icons render white on the accent plate.
 */
export function Services() {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-heading">
      <div className={styles.container}>
        <Reveal className={styles.headingWrap}>
          <h2 id="services-heading" className={styles.heading}>
            Our Services
          </h2>
        </Reveal>

        <ul className={styles.grid}>
          {SERVICES.map((service, index) => (
            <Reveal as="li" key={service.label} delay={(index % 3) * 100} className={styles.item}>
              <span className={styles.iconWrap} aria-hidden="true">
                {service.svgIcon ? (
                  <svg
                    className={`${styles.icon} ${service.invert ? styles.iconInvert : ''}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="50"
                    height="50"
                  >
                    <path d={service.svgIcon} />
                  </svg>
                ) : (
                  <Image
                    src={service.icon}
                    alt=""
                    width={50}
                    height={50}
                    className={`${styles.icon} ${service.invert ? styles.iconInvert : ''}`}
                  />
                )}
              </span>
              <h3 className={styles.label}>{service.label}</h3>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
