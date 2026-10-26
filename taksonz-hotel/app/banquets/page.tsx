import type { Metadata } from "next";
import { HeroFor } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VenueCards } from "@/components/sections/VenueCards";
import { FeatureGrid } from "@/components/sections/Blocks";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { content } from "@/data/content";
import { faqsByTopic } from "@/data/faqs";
import { pages } from "@/data/pages";
import { venues } from "@/data/venues";
import { metaFor } from "@/lib/seo/metadata";

const page = pages.banquets;
export const metadata: Metadata = metaFor(page);

export default function BanquetsPage() {
  const c = content.banquets;
  return (
    <>
      <HeroFor page={page} />
      <section className="section">
        <div className="container">
          <Breadcrumbs items={[{ label: page.title }]} />
          <div style={{ height: "2rem" }} />
          <SectionHeading title={c.venues.title} intro={c.venues.intro} />
          <VenueCards venues={venues} />
          <p style={{ marginTop: "1.25rem", fontSize: "0.8125rem", color: "var(--grey)" }}>{c.venues.note}</p>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="occ">
        <div className="container">
          <SectionHeading eyebrow={c.occasions.eyebrow} title={<span id="occ">{c.occasions.title}</span>} />
          <FeatureGrid items={c.occasions.items} />
        </div>
      </section>

      <section id="enquire" className="section" aria-labelledby="plan">
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHeading eyebrow={c.enquiry.eyebrow} title={<span id="plan">{c.enquiry.title}</span>} intro={c.enquiry.intro} />
          <EnquiryForm type="event" submitLabel={c.enquiry.submit} messageLabel={c.enquiry.messageLabel} />
        </div>
      </section>

      <section className="section section--white" aria-labelledby="efaq">
        <div className="container">
          <SectionHeading title={<span id="efaq">{c.faqTitle}</span>} />
          <FaqAccordion items={faqsByTopic("events")} />
        </div>
      </section>
    </>
  );
}
