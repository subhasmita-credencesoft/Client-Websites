import { FaqAccordion } from "@/components/site/FaqAccordion";
import { HeroSection } from "@/components/site/HeroSection";
import { InfoCard } from "@/components/site/InfoCard";
import { PackageTabs } from "@/components/site/PackageTabs";
import { Section } from "@/components/site/Section";
import { faqItems, imageCatalog } from "@/lib/site-data";

export default function OffersPage() {
  return (
    <>
      <HeroSection
        image={imageCatalog.celebrationSpace}
        eyebrow="Wedding Packages"
        title="Flexible all-inclusive packages"
        subtitle="Per person, per day pricing that brings stay, meals, venue usage, and event hospitality into one clean structure."
        specs={[
          "Packages include stay, meals, services, lawn access, and venue usage",
          "Weekday and weekend pricing supported",
          "Classic, Signature, and Premium Luxe celebration tiers",
        ]}
      />

      <Section
        background="light"
        sectionLabel="PACKAGE TIERS"
        title="Choose the celebration format that matches your event"
      >
        <PackageTabs />
      </Section>

      <Section
        background="lighter"
        sectionLabel="WHAT'S INCLUDED"
        title="Meal and service flow"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {[
            "Breakfast: tea, coffee, and selected dishes for the start of the day",
            "Hi-tea: beverages and snacks timed around event transitions",
            "Lunch: roti, sabji, dal, rice, salad, and accompaniments",
            "Starters: package-based enhancements depending on the selected tier",
            "Dinner: full meal service with upgrade flexibility and premium additions",
          ].map((item) => (
            <InfoCard key={item} title={item.split(":")[0]} description={item} />
          ))}
        </div>
      </Section>

      <Section
        background="light"
        sectionLabel="UPGRADES"
        title="Ways to personalize the event"
      >
        <div className="grid gap-6 lg:grid-cols-4">
          {[
            "Additional starters and meal enhancements",
            "Live counters for premium service formats",
            "Premium beverage planning",
            "Late checkout and rooming upgrades",
          ].map((item) => (
            <InfoCard
              key={item}
              title={item}
              description="Available on request to help tailor the wedding experience around your guest expectations and event flow."
            />
          ))}
        </div>
      </Section>

      <Section
        background="lighter"
        sectionLabel="COMMON QUESTIONS"
        title="FAQs"
      >
        <FaqAccordion items={faqItems.offers} />
      </Section>
    </>
  );
}
