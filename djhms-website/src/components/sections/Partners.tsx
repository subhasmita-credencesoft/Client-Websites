import { about } from '@/data/site';
import { Container } from '@/components/ui/Container';
import styles from './Partners.module.scss';

export function Partners() {
  return (
    <section className={styles.section} aria-labelledby="partners-title">
      <Container>
        <div className={styles.layout}>
          <header className={styles.heading}>
            <p className={styles.eyebrow}>Diamond Jubilee Hotel Management Services</p>
            <span className={styles.goldRule} aria-hidden="true" />
            <h2 id="partners-title">Managing / Authorized Partners</h2>
            <p className={styles.intro}>The leadership team behind our hospitality management services.</p>
            <p className={styles.count}>
              <strong>{String(about.partners.length).padStart(2, '0')}</strong>
              <span>Partners</span>
            </p>
          </header>

          <div className={styles.directory}>
            {about.partners.map((partner, index) => (
              <article className={styles.partner} key={partner.name}>
                <div className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
                <div className={styles.profile}>
                  <p className={styles.role}>{partner.designation}</p>
                  <h3 className={styles.name}>{partner.name}</h3>
                  <div className={styles.location}>
                    <span className={styles.locationLabel}>Resident of State</span>
                    <span className={styles.state}>{partner.state}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
