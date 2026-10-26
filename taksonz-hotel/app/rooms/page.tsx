import type { Metadata } from "next";
import { HeroFor } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RoomList } from "@/components/rooms/RoomList";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeatureGrid } from "@/components/sections/Blocks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { content } from "@/data/content";
import { faqsByTopic } from "@/data/faqs";
import { pages } from "@/data/pages";
import { RATE_NOTE, site } from "@/data/site";
import { metaFor } from "@/lib/seo/metadata";

const page = pages.rooms;
export const metadata: Metadata = metaFor(page);

export default function RoomsPage() {
  const c = content.rooms;
  return (
    <>
      <HeroFor page={page} />
      <section className="section">
        <div className="container">
          <Breadcrumbs items={[{ label: page.title }]} />
          <div style={{ height: "2rem" }} />
          <RoomList />
          <p style={{ marginTop: "1.5rem", fontSize: "0.8125rem", color: "var(--grey)" }}>{RATE_NOTE}</p>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="amen">
        <div className="container">
          <SectionHeading eyebrow={c.amenitiesBlock.eyebrow} title={<span id="amen">{c.amenitiesBlock.title}</span>} />
          <FeatureGrid items={c.amenitiesBlock.items} />
        </div>
      </section>

      <section className="section" aria-labelledby="rfaq">
        <div className="container">
          <SectionHeading eyebrow={c.faq.eyebrow} title={<span id="rfaq">{c.faq.title}</span>} />
          <FaqAccordion items={faqsByTopic("rooms", "booking")} />
        </div>
      </section>

      <CtaBanner title={c.cta.title} text={c.cta.text} image={c.cta.image}>
        <ButtonLink href={site.bookingUrl} target="_blank" rel="noopener noreferrer" variant="light" size="lg" arrow>Book Online</ButtonLink>
      </CtaBanner>
    </>
  );
}
