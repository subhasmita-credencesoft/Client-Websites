import type { Metadata } from "next";
import { HeroFor } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Tabs } from "@/components/ui/Tabs";
import { Photo } from "@/components/ui/Photo";
import { FeatureGrid, Split } from "@/components/sections/Blocks";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { content } from "@/data/content";
import { dining } from "@/data/dining";
import { faqsByTopic } from "@/data/faqs";
import { pages } from "@/data/pages";
import { formatINR } from "@/data/rooms";
import { site } from "@/data/site";
import { metaFor } from "@/lib/seo/metadata";
import styles from "./dining.module.scss";

const page = pages.dining;
export const metadata: Metadata = metaFor(page);

export default function DiningPage() {
  const c = content.dining;
  return (
    <>
      <HeroFor page={page} />

      <section className="section">
        <div className="container">
          <Breadcrumbs items={[{ label: page.title }]} />
          <div style={{ height: "2rem" }} />
          <Tabs
            label="Dining venues"
            items={dining.venues.map((v) => ({
              id: v.id,
              label: v.label,
              content: (
                <div className={styles.venue}>
                  <div className={styles.venueMedia}><Photo src={v.image} alt="" decorative sizes="(min-width: 1024px) 60vw, 100vw" /></div>
                  <div>
                    <h2>{v.id === "restaurant" ? dining.name : v.label}</h2>
                    <p>{v.id === "restaurant" ? dining.intro : v.text}</p>
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      <section className="section section--white" aria-label="Dining details">
        <div className="container">
          <FeatureGrid cols={3} items={[
            { icon: "bed", title: "Open Daily", text: dining.hours },
            { icon: "utensils", title: "Cuisine", text: dining.cuisine },
            { icon: "users", title: "Seating Capacity", text: dining.seating },
          ]} />
          <p className={styles.todo}>{c.detailsNote}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="spec">
        <div className="container">
          <SectionHeading eyebrow={c.specialties.eyebrow} title={<span id="spec">{c.specialties.title}</span>} />
          <ul className={styles.dishes}>
            {dining.specialties.map((d, i) => (
              <Reveal as="li" key={d.name} delay={i * 0.1}>
                <div className={styles.dishMedia}><Photo src={d.image} alt="" decorative sizes="(min-width: 768px) 33vw, 100vw" /></div>
                <h3>{d.name}</h3>
                <p>{formatINR(d.price)}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <Split image={c.reserve.image} reverse eyebrow={c.reserve.eyebrow} title={c.reserve.title}>
            <p>{c.reserve.text}</p>
            <div><ButtonLink href="/contact" arrow>{c.reserve.cta}</ButtonLink></div>
          </Split>
        </div>
      </section>

      <section className="section" aria-labelledby="dfaq">
        <div className="container">
          <SectionHeading title={<span id="dfaq">{c.faqTitle}</span>} />
          <FaqAccordion items={faqsByTopic("dining")} />
        </div>
      </section>

      <CtaBanner title={c.cta.title} text={c.cta.text} image={c.cta.image}>
        <ButtonLink href={site.bookingUrl} target="_blank" rel="noopener noreferrer" variant="light" size="lg" arrow>Book Online</ButtonLink>
      </CtaBanner>
    </>
  );
}
