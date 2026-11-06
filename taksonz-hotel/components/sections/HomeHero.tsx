import { Photo } from "@/components/ui/Photo";
import { SplitWords } from "@/components/ui/SplitWords";
import { HeroContentFx } from "@/components/ui/ScrollFx";
import { ButtonLink } from "@/components/ui/Button";
import { BookingPanel } from "@/components/booking/BookingPanel";
import { HeroVideo } from "./HeroVideo";
import { content } from "@/data/content";
import { heroVideo } from "@/data/images";
import { site } from "@/data/site";
import { Trophy, Leaf, Star } from "lucide-react";
import styles from "./HomeHero.module.scss";

export function HomeHero() {
  const c = content.home;
  return (
    <section className={styles.hero} aria-labelledby="home-title">
      {/* Poster image is the LCP element (priority, never lazy); the video fades in over it once it plays. */}
      <HeroVideo sources={heroVideo.sources}>
        <Photo src={heroVideo.poster} alt="" decorative priority sizes="100vw" />
      </HeroVideo>
      <div className={styles.shade} />
      <HeroContentFx className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>{c.eyebrow}</p>
        <h1 id="home-title" className={styles.title}>
          <SplitWords text={c.title[0]} delay={0.25} />
          <br />
          <SplitWords text={c.title[1]} delay={0.55} />
        </h1>
        <p className={styles.sub}>{c.subtitle}</p>
        <div className={styles.cta}>
          <ButtonLink href={site.bookingUrl} target="_blank" rel="noopener noreferrer" variant="light" size="lg" arrow>Book a Stay</ButtonLink>
          <ButtonLink href="/rooms" variant="ghost" size="lg">Explore Rooms</ButtonLink>
        </div>
        <p className={styles.trustBar} aria-label="Awards and guest review highlights">
          <span><Trophy size={16} aria-hidden /> Awarded by Ministry of Tourism &amp; HRANI</span>
          <span><Leaf size={16} aria-hidden /> Punjab Tourism &amp; PHDCCI: Best Energy Conservation Enterprise</span>
          <span><Star size={16} aria-hidden /> 4.2 stars across 3,160+ Google reviews</span>
        </p>
      </HeroContentFx>
      <div className={styles.cue} aria-hidden><span>Scroll</span><i /></div>
      <div className={`container ${styles.panelWrap}`}>
        <BookingPanel />
      </div>
    </section>
  );
}
