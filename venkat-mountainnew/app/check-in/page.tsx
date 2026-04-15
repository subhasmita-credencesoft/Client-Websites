import { HeroSection } from "@/components/site/HeroSection";
import { InfoCard } from "@/components/site/InfoCard";
import { Section } from "@/components/site/Section";
import { imageCatalog, siteMeta } from "@/lib/site-data";

export default function CheckInPage() {
  return (
    <>
      <HeroSection
        image={imageCatalog.stayEstate}
        eyebrow="CHECK-IN & PAYMENT"
        title="Arrival and payment clarity"
        subtitle="Everything guests and hosts need to know before they arrive."
      />
      <Section
        background="light"
        sectionLabel="CHECK-IN PROCESS"
        title="Arrival procedures"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <InfoCard title="Check-in" description="From 2:00 PM onward with guest registration and ID verification." />
          <InfoCard title="Check-out" description="11:00 AM unless a late-checkout upgrade has been approved." />
          <InfoCard title="Registration" description="Guest lists, contact details, and room allocations should be shared in advance for smooth arrival." />
        </div>
      </Section>
      <Section
        background="lighter"
        sectionLabel="PAYMENT TIMELINE"
        title="What is due and when"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <InfoCard title="Date Blocking" description="50% advance secures the dates and begins reservation planning." />
          <InfoCard title="Pre-arrival Balance" description="Remaining 50% is completed before check-in against final headcount and package scope." />
          <InfoCard title="GST & Add-ons" description="GST and approved upgrades are reflected in final billing." />
        </div>
      </Section>
      <Section
        background="light"
        sectionLabel="WHAT'S INCLUDED"
        title="Typical inclusions"
      >
        <div className="grid gap-6 lg:grid-cols-4">
          {[
            "Stay accommodation",
            "Meal package as selected",
            "Venue access",
            "Parking and basic guest support",
          ].map((item) => (
            <InfoCard key={item} title={item} description="Final scope depends on the package tier and contracted event plan." />
          ))}
        </div>
      </Section>
      <Section
        background="lighter"
        sectionLabel="SUPPORT"
        title="Need payment help?"
      >
        <div className="rounded-[32px] border border-[var(--neutral-200)] bg-white p-8">
          <p className="text-base leading-8 text-[var(--text-secondary)]">
            For billing, timing, or guest-arrival questions, reach the reservations desk during operating hours.
          </p>
          <p className="mt-4 text-lg font-semibold text-[var(--text-primary)]">{siteMeta.phone}</p>
        </div>
      </Section>
    </>
  );
}
