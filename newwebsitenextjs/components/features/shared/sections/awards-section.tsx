import Image from "next/image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Card } from "@/components/ui/card";
import { awardCards } from "@/lib/data/content/mountain-content";
import { homeSectionContent } from "@/lib/data/content/resort-content";
import { SectionShell } from "@/components/ui/section-shell";

export function AwardsSection() {
  const content = homeSectionContent.awards;

  return (
    <SectionShell data-section-id="awards" className="bg-black" containerClassName="text-center">
      <div className="text-center" data-reveal>
        <h3
          data-section-title
          className="site-title-lg text-[var(--color-primary-hover)]"
        >
          {content.title}
        </h3>
        <p className="site-copy-lg mx-auto mt-4 max-w-4xl text-white">
          {content.subtitle}
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-[84rem] gap-6 md:grid-cols-3 xl:gap-8">
        {awardCards.map((award, index) => (
          <Card
            as="article"
            key={award.title}
            variant="subtle"
            data-card
            className="flex h-full flex-col px-5 py-5 text-center md:px-6 md:py-6"
          >
            <div
              className="mx-auto aspect-[4/5] w-full max-w-[22rem] overflow-hidden rounded-[1.5rem] bg-white [will-change:transform]"
              data-card-image
              data-bg-parallax
              data-bg-depth="6"
            >
              <Image
                src={award.image}
                alt={award.title}
                width={360}
                height={450}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                quality={65}
                sizes="(max-width: 768px) min(100vw - 40px, 360px), (max-width: 1280px) 30vw, 360px"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-5 text-[clamp(1.2rem,2.2vw,1.8rem)] font-semibold leading-tight text-white">
              {award.title}
            </p>
            <p className="site-copy mx-auto mt-3 max-w-[26rem] text-white/82 md:text-base">
              {award.subtitle}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <MagneticButton href="/rules" variant="primary">{content.cta}</MagneticButton>
      </div>
    </SectionShell>
  );
}
