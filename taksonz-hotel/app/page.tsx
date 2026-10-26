import type { Metadata } from "next";
import Link from "next/link";
import { HomeHero } from "@/components/sections/HomeHero";
import { Split, TileLink, FeatureGrid } from "@/components/sections/Blocks";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeaturedRooms } from "@/components/rooms/FeaturedRooms";
import { ImageGrid } from "@/components/gallery/ImageGrid";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { content } from "@/data/content";
import { faqs } from "@/data/faqs";
import { galleryImages } from "@/data/gallery";
import { addressLine, mapLinkUrl, site } from "@/data/site";
import { buildMetadata } from "@/lib/seo/metadata";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${site.name} — ${site.tagline}`,
    description: `Contemporary comfort in the heart of ${site.address.city}. Rooms and suites, dining, banquets and meetings at ${site.name}.`,
    path: "/",
  }),
  title: { absolute: `${site.name} — ${site.tagline}` },
};

export default function HomePage() {
  const c = content.home;
  return (
    <>
      <HomeHero />

      {/* Extra top padding on desktop compensates for the hero booking panel negative margin overlap */}
      <section className={`section ${styles.heroOffset}`}>
        <div className="container">
          <SectionHeading eyebrow={c.offer.eyebrow} title={c.offer.title} intro={c.offer.intro} />
          <div className={styles.tiles}>
            {c.offer.tiles.map((t, i) => (
              <Reveal key={t.href} delay={(i % 2) * 0.1}><TileLink {...t} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="featured-rooms">
        <div className="container">
          <SectionHeading eyebrow={c.rooms.eyebrow} title={<span id="featured-rooms">{c.rooms.title}</span>} intro={c.rooms.intro} />
          <FeaturedRooms className={styles.rooms} />
          <div style={{ marginTop: "2.5rem" }}><ButtonLink href="/rooms" variant="secondary" arrow>{c.rooms.cta}</ButtonLink></div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ display: "grid", gap: "clamp(4rem,8vw,8rem)" }}>
          <Split image={c.diningSplit.image} eyebrow={c.diningSplit.eyebrow} title={c.diningSplit.title}>
            <p>{c.diningSplit.text}</p>
            <div><ButtonLink href="/dining" variant="secondary" arrow>{c.diningSplit.cta}</ButtonLink></div>
          </Split>
          <Split image={c.eventsSplit.image} reverse eyebrow={c.eventsSplit.eyebrow} title={c.eventsSplit.title}>
            <p>{c.eventsSplit.text}</p>
            <div><ButtonLink href="/banquets" arrow>{c.eventsSplit.cta}</ButtonLink></div>
          </Split>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="why">
        <div className="container">
          <SectionHeading eyebrow={c.why.eyebrow} title={<span id="why">{c.why.title}</span>} />
          <FeatureGrid items={c.why.items} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={c.gallery.eyebrow} title={c.gallery.title} />
          <ImageGrid images={galleryImages.slice(0, 4)} variant="strip" />
          <div style={{ marginTop: "2rem" }}><ButtonLink href="/gallery" variant="secondary" arrow>{c.gallery.cta}</ButtonLink></div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <Split image={c.location.image} eyebrow={c.location.eyebrow} title={c.location.title}>
            <p>{addressLine}</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <ButtonLink href="/location" variant="secondary" arrow>Directions & map</ButtonLink>
              <a href={mapLinkUrl} target="_blank" rel="noopener noreferrer" style={{ alignSelf: "center", textDecoration: "underline", textUnderlineOffset: 3 }}>Open in Google Maps<span className="visually-hidden"> (opens in new tab)</span></a>
            </div>
          </Split>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-h">
        <div className="container">
          <SectionHeading eyebrow={c.faq.eyebrow} title={<span id="faq-h">{c.faq.title}</span>} />
          <FaqAccordion items={faqs.slice(0, 4)} />
          <p style={{ marginTop: "1.5rem" }}><Link href="/faq" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>{c.faq.cta}</Link></p>
        </div>
      </section>

      <CtaBanner title={c.cta.title} text={c.cta.text} image={c.cta.image}>
        <ButtonLink href={site.bookingUrl} target="_blank" rel="noopener noreferrer" variant="light" size="lg" arrow>Book a Stay</ButtonLink>
        <ButtonLink href="/contact" variant="ghost" size="lg">Contact us</ButtonLink>
      </CtaBanner>
    </>
  );
}
