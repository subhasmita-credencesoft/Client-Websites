"use client";

import { experienceCards, homeSectionContent } from "@/lib/data/content/resort-content";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function ExperienceCardsSection() {
  return (
    <section
      id="experiences"
      data-section-id="experiences"
      className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32"
    >
      <SectionHeading
        eyebrow={homeSectionContent.experiences.eyebrow}
        title={homeSectionContent.experiences.title}
        description={homeSectionContent.experiences.description}
      />

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
