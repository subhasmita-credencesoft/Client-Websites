import { HeroSection } from "@/components/site/HeroSection";
import { InfoCard } from "@/components/site/InfoCard";
import { Section } from "@/components/site/Section";
import { imageCatalog } from "@/lib/site-data";

export default function ExperiencesPage() {
  return (
    <>
      <HeroSection
        image={imageCatalog.poolside01}
        eyebrow="Experiences"
        title="Experiences that make the wedding stay more memorable"
        subtitle="The Mountain is designed for more than one ceremony. It supports the full social rhythm of a destination celebration."
        specs={[
          "Pool access for social downtime",
          "Multiple event zones for varied celebration moods",
          "Natural backdrops for photography and guest leisure",
        ]}
      />

      <Section
        background="light"
        sectionLabel="AT THE ESTATE"
        title="Moments guests enjoy between the events"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Scenic property walks and open-air relaxation",
            "Poolside downtime between functions",
            "Photography-friendly green backdrops across the estate",
            "A private stay experience that keeps families together",
          ].map((item) => (
            <InfoCard key={item} title={item.split(" ")[0]} description={item} />
          ))}
        </div>
      </Section>
    </>
  );
}
