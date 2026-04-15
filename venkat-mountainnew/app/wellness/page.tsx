import { HeroSection } from "@/components/site/HeroSection";
import { InfoCard } from "@/components/site/InfoCard";
import { Section } from "@/components/site/Section";
import { imageCatalog } from "@/lib/site-data";

export default function WellnessPage() {
  return (
    <>
      <HeroSection
        image={imageCatalog.poolside02}
        eyebrow="Stay & Leisure"
        title="Relaxed destination-stay comforts at the estate"
        subtitle="The Mountain combines celebration hosting with the calmer side of a destination property stay."
        specs={[
          "24x7 pool access",
          "Natural green surroundings",
          "Private estate comfort across the celebration stay",
        ]}
      />

      <Section
        background="light"
        sectionLabel="COMFORT EXPERIENCE"
        title="What guests appreciate during the stay"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Open spaces for breathing room between functions",
            "Private-estate atmosphere with fewer outside disturbances",
            "Stay formats that support both premium and family groups",
            "Hospitality support that keeps the event feel comfortable end to end",
          ].map((item) => (
            <InfoCard key={item} title={item.split(" ")[0]} description={item} />
          ))}
        </div>
      </Section>
    </>
  );
}
