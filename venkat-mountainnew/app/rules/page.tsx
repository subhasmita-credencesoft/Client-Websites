import { FaqAccordion } from "@/components/site/FaqAccordion";
import { HeroSection } from "@/components/site/HeroSection";
import { InfoCard } from "@/components/site/InfoCard";
import { Section } from "@/components/site/Section";
import { faqItems, imageCatalog, siteMeta } from "@/lib/site-data";

export default function RulesPage() {
  return (
    <>
      <HeroSection
        image={imageCatalog.eventSpace}
        eyebrow="Rules & Regulations"
        title="Clear terms for a smooth destination wedding experience"
        subtitle="Booking, payment, guest stay, and vendor policies that help the event run professionally."
        specs={[
          "50% advance required to block the dates",
          "Remaining 50% before check-in",
          "Check-in 2:00 PM | Check-out 11:00 AM",
        ]}
      />

      <Section
        background="light"
        sectionLabel="CHECK-IN / PAYMENT TERMS"
        title="Booking and billing structure"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="Advance & Blocking"
            description="A confirmed advance secures the dates and allows the planning process to begin."
            details={[
              "50% advance required to block the dates",
              "Advance is non-refundable",
              "Dates can be rescheduled subject to availability",
            ]}
          />
          <InfoCard
            title="Final Payment"
            description="The remaining booking balance is completed before guest arrival."
            details={[
              "Remaining 50% before check-in",
              "Packages are calculated on final confirmed headcount",
              "Event billing is aligned before arrival",
            ]}
          />
          <InfoCard
            title="Stay Timings"
            description="Clear check-in and check-out timings help group coordination and room turnover."
            details={[
              "Check-in time: 2:00 PM",
              "Check-out time: 11:00 AM",
              "Rooming and guest documentation handled at arrival",
            ]}
          />
        </div>
      </Section>

      <Section
        background="lighter"
        sectionLabel="SPECIAL ALLOWANCES"
        title="What the venue supports"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <InfoCard
            title="Unlimited Music Hours"
            description="Enjoy music anytime on the lawn with no sound restrictions and no additional sound license requirement."
          />
          <InfoCard
            title="24x7 Pool Access"
            description="Guests can access the pool zone through the celebration stay, whether for relaxation or social-event moments."
          />
          <InfoCard
            title="Full Venue Access"
            description="The entire property is planned as a private-estate style event experience with no outsider interference."
          />
        </div>
      </Section>

      <Section
        background="light"
        sectionLabel="PROPERTY RULES"
        title="Important guest and vendor guidelines"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <InfoCard
            title="Mandatory Requirements"
            description="Some rules are essential for safety, compliance, and smooth group management."
            details={[
              "Government ID proof mandatory for all staying guests",
              "Guest registration required at check-in",
              "Valid contact details should be shared",
            ]}
          />
          <InfoCard
            title="Approvals & Restrictions"
            description="Some elements require prior operational approval before the event."
            details={[
              "Outside catering is not allowed in package bookings",
              "Decorators and vendors require prior approval",
              "Any property damage will be chargeable",
            ]}
          />
          <InfoCard
            title="Guest Conduct"
            description="The venue is flexible, but celebrations should remain respectful and well-managed."
            details={[
              "Loud music allowed within property limits respectfully",
              "Smoking permitted only in designated areas",
              "Lost belongings are the guest's responsibility",
            ]}
          />
        </div>
      </Section>

      <Section
        background="lighter"
        sectionLabel="COMMON QUESTIONS"
        title="FAQs"
      >
        <FaqAccordion items={faqItems.rules} />
      </Section>

      <Section
        background="light"
        sectionLabel="DIRECT CONTACT"
        title="Need a clarification before booking?"
      >
        <div className="rounded-[32px] bg-[var(--primary-900)] p-8 text-white">
          <p className="text-base leading-8 text-white/78">
            Speak with our team for vendor approvals, payment clarifications, group stay planning,
            and any questions related to your destination wedding booking.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <a href={siteMeta.phoneHref} className="text-lg font-semibold text-[var(--accent-gold)]">
              {siteMeta.phone}
            </a>
            <a href={siteMeta.altPhoneHref} className="text-lg font-semibold text-[var(--accent-gold)]">
              {siteMeta.altPhone}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
