import Button from "@/components/ui/Button";
import { HeroSection } from "@/components/site/HeroSection";
import { InfoCard } from "@/components/site/InfoCard";
import { Section } from "@/components/site/Section";
import { imageCatalog, siteMeta } from "@/lib/site-data";

export default function ContactPage() {
  return (
    <>
      <HeroSection
        image={imageCatalog.eventSpace}
        eyebrow="Contact"
        title="Connect with The Mountain team"
        subtitle="Reach out for property tours, package guidance, wedding planning support, and stay coordination."
        specs={[
          siteMeta.phone,
          siteMeta.altPhone,
          "Property visits by appointment",
        ]}
      />

      <Section
        background="light"
        sectionLabel="CONTACT INFORMATION"
        title="Ways to reach us"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <InfoCard title="Phone" description={siteMeta.phone} details={[siteMeta.altPhone, siteMeta.hours]} />
          <InfoCard title="Email" description={siteMeta.email} details={["Response during business hours", "Ideal for event briefs and proposals"]} />
          <InfoCard title="Address" description={siteMeta.address} details={["Karjat, Maharashtra", "Private estate visits by appointment"]} />
        </div>
      </Section>

      <Section
        background="lighter"
        sectionLabel="PLAN A VISIT"
        title="Schedule your property visit"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] bg-[var(--primary-900)] p-8 text-white">
            <p className="max-w-3xl text-base leading-8 text-white/80">
              Property visits are the best way to understand the lawns, rooming options, event areas,
              and overall celebration flow. Reach out to reserve a guided walk-through with our team.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button href={siteMeta.phoneHref}>Call Now</Button>
              <Button href={`mailto:${siteMeta.email}`} variant="light-outline">
                Email Us
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            <InfoCard
              image={imageCatalog.weddingLawn01}
              title="Book A Property Tour"
              description="Walk the venue, review the stay options, and understand how each celebration space can be mapped for your event."
            />
          </div>
        </div>
      </Section>
    </>
  );
}
