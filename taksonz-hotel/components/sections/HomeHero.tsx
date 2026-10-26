import { Photo } from "@/components/ui/Photo";
import { SplitWords } from "@/components/ui/SplitWords";
import { HeroContentFx } from "@/components/ui/ScrollFx";
import { ButtonLink } from "@/components/ui/Button";
import { BookingPanel } from "@/components/booking/BookingPanel";
import { HeroVideo } from "./HeroVideo";
import { content } from "@/data/content";
import { heroVideo } from "@/data/images";
import { site } from "@/data/site";
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
      </HeroContentFx>
      <div className={styles.cue} aria-hidden><span>Scroll</span><i /></div>
      <div className={`container ${styles.panelWrap}`}>
        <BookingPanel />
      </div>
    </section>
  );
}
