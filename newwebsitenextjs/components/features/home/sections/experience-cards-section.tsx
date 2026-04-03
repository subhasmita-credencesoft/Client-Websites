import { experienceCards, homeSectionContent } from "@/lib/data/content/resort-content";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function ExperienceCardsSection() {
  return (
    <section
      id="experiences"
      data-section-id="experiences"
      data-cinematic-section
      data-sticky-fade-section
      className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32"
    >
      <div className="cinematic-glow absolute right-[4%] top-[10%] h-[16rem] w-[16rem]" data-cinematic-glow />
      <div data-cinematic-copy data-sticky-fade-heading className="md:sticky md:top-5 md:z-20 md:bg-black/88 md:pb-8 md:backdrop-blur-sm">
        <SectionHeading
          eyebrow={homeSectionContent.experiences.eyebrow}
          title={homeSectionContent.experiences.title}
          description={homeSectionContent.experiences.description}
        />
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {experienceCards.map((card) => (
          <div key={card.title} data-sticky-fade-block className="md:sticky md:top-10">
            <LuxuryCard
              title={card.title}
              description={card.description}
              image={card.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
