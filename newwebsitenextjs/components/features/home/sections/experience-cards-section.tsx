"use client";

import { experienceCards, homeSectionContent } from "@/lib/data/content/resort-content";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function ExperienceCardsSection() {
  return (
    <section
      id="experiences"
      data-section-id="experiences"
      data-cinematic-section
      className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32"
    >
      <div className="cinematic-glow absolute right-[4%] top-[10%] h-[16rem] w-[16rem]" data-cinematic-glow />
      <div data-cinematic-copy>
        <SectionHeading
          eyebrow={homeSectionContent.experiences.eyebrow}
          title={homeSectionContent.experiences.title}
          description={homeSectionContent.experiences.description}
        />
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {experienceCards.map((card) => (
          <LuxuryCard
            key={card.title}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}
      </div>
    </section>
  );
}
