import styles from '@/styles/Testimonials.module.scss';
import { Testimonial } from '@/types';
import StarRating from '@/components/ui/StarRating';

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.container}>
        <div className={styles.header} data-reveal>
          <p className="caption">Traveler & client stories</p>
          <h2 className="h2" style={{ marginTop: 8 }}>
            Real feedback from real events
          </h2>
        </div>
        <div className={styles.grid}>
          {testimonials.map((t) => (
            <article key={t.id} className={styles.card} data-reveal data-reveal-stagger>
              <StarRating rating={t.rating} />
              <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
              <div className={styles.author}>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.meta}>
                  {t.location} &middot; {t.tripName}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
