import { HeroSection } from "@/components/site/HeroSection";
import { InfoCard } from "@/components/site/InfoCard";
import { Section } from "@/components/site/Section";
import { imageCatalog } from "@/lib/site-data";

export default function DiningPage() {
  return (
    <>
      <HeroSection
        image={imageCatalog.eventSpace}
        eyebrow="Dining & Hospitality"
        title="Meal planning that supports the full wedding schedule"
        subtitle="From breakfast to dinner, our hospitality structure is designed to keep guests comfortable through every event transition."
        specs={[
          "Breakfast, hi-tea, lunch, starters, and dinner support",
          "Package-based meal planning for wedding groups",
          "Upgrade options for signature and premium celebration formats",
        ]}
      />

      <Section
        background="light"
        sectionLabel="DINING FLOW"
        title="What the food experience is built around"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Breakfast service for the start of family movement and early rituals",
            "Hi-tea and snacks around event transitions and downtime",
            "Lunch planning for larger guest groups and daytime functions",
            "Dinner support that closes the celebration day comfortably",
          ].map((item) => (
            <InfoCard
              key={item}
              title={item.split(" ")[0]}
              description={item}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
