import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/HomeSections.module.scss';

export default function LocationAdvantage() {
  return (
    <section className={styles.locationAdvantage} aria-labelledby="location-advantage-heading">
      <div className="container">
        <div className={styles.locationCard}>
          <div data-reveal>
            <p className="caption">Strategic location</p>
            <h2 className="h2" style={{ marginTop: 8 }}>
              The perfect midpoint on the Bhubaneswar Cuttack corridor
            </h2>
            <p className={styles.locationText}>
              Situated right on NH-16 at Phulnakhara, guests and delegates from both cities reach us without
              inner-city traffic  just minutes from Nandankanan and major transit hubs.
            </p>
            <ul className={styles.locationPoints}>
              <li>~18 km from Biju Patnaik International Airport</li>
              <li>~15 km from Bhubaneswar Railway Station</li>
              <li>~16 km from Cuttack Railway Station</li>
            </ul>
            <Link href="/location" className="btn btn-primary">
              Plan Your Visit
            </Link>
          </div>
            <div className={styles.locationImageWrap} data-reveal>
              <Image
                src="/newedit/Reciption.avif"
                alt="Reception at Baibhab Resorts & Conventions"
                className={styles.locationImage}
                loading="lazy"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
        </div>
      </div>
    </section>
  );
}
