import type { Metadata } from "next";
import { HeroFor } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VenueCards } from "@/components/sections/VenueCards";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ButtonLink } from "@/components/ui/Button";
import { content } from "@/data/content";
import { faqsByTopic } from "@/data/faqs";
import { pages } from "@/data/pages";
import { corporateVenues } from "@/data/venues";
import { metaFor } from "@/lib/seo/metadata";

const page = pages.meetings;
export const metadata: Metadata = metaFor(page);

export default function MeetingsPage() {
  const c = content.meetings;
  return (
    <>
      <HeroFor page={page} />
      <section className="section">
        <div className="container">
          <Breadcrumbs items={[{ label: "Meetings" }]} />
          <div style={{ height: "2rem" }} />
          <SectionHeading title={c.venues.title} intro={c.venues.intro} />
          <VenueCards venues={corporateVenues} />
          <p style={{ marginTop: "1.25rem", fontSize: "0.8125rem", color: "var(--grey)" }}>{c.venues.note}</p>
        </div>
      </section>

      <section id="enquire" className="section section--white" aria-labelledby="menq">
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHeading title={<span id="menq">{c.enquiry.title}</span>} intro={c.enquiry.intro} />
          <EnquiryForm type="meeting" submitLabel={c.enquiry.submit} messageLabel={c.enquiry.messageLabel} />
        </div>
      </section>

      <section className="section" aria-labelledby="mfaq">
        <div className="container">
          <SectionHeading title={<span id="mfaq">{c.faqTitle}</span>} />
          <FaqAccordion items={faqsByTopic("events", "general")} />
          <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <ButtonLink href="/location" variant="secondary">Directions</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">Contact the hotel</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
