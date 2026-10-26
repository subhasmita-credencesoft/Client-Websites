import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import type { Venue } from "@/data/venues";
import styles from "./VenueCards.module.scss";

export function VenueCards({ venues, cta = "Enquire" }: { venues: Venue[]; cta?: string }) {
  return (
    <ul className={styles.grid}>
      {venues.map((v, i) => (
        <Reveal as="li" key={v.slug} delay={i * 0.1} className={styles.card}>
          <div className={styles.media}><Photo src={v.image} alt="" decorative sizes="(min-width: 768px) 33vw, 100vw" /></div>
          <div className={styles.body}>
            <h3>{v.name}</h3>
            <p className={styles.spec}>Capacity: {v.capacity} guests · {v.areaSqFt.toLocaleString("en-IN")} sq. ft.</p>
            <p>{v.description}</p>
            <p className={styles.for}>Suitable for: {v.suitableFor.join(", ")}</p>
            <Link href={`#enquire`} className={styles.link}>{cta} <span aria-hidden>→</span><span className="visually-hidden"> about {v.name}</span></Link>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
