import Image from "next/image";
import { MagneticButton } from "@/components/ui/magnetic-button";
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
          className="site-title-lg text-[#cba977]"
        >
          {content.title}
        </h3>
        <p className="site-copy-lg mx-auto mt-4 max-w-4xl text-white">
          {content.subtitle}
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-[92rem] gap-9 md:grid-cols-3">
        {awardCards.map((award, index) => (
          <article
            key={award.title}
            data-card
            className="site-subtle-card px-6 py-7 text-center"
          >
            <div
              className="mx-auto aspect-[4/5] max-w-xs overflow-hidden rounded-[1.25rem] bg-white [will-change:transform]"
              data-card-image
              data-bg-parallax
              data-bg-depth="6"
            >
              <Image
                src={award.image}
                alt={award.title}
                width={360}
                height={380}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                quality={65}
                sizes="(max-width: 768px) calc(100vw - 40px), 320px"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="site-title-md mt-8 text-white">
              {award.title}
            </p>
            <p className="site-copy mt-3 text-white/85 md:text-lg">
              {award.subtitle}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <MagneticButton href="/rules" variant="primary">{content.cta}</MagneticButton>
      </div>
    </SectionShell>
  );
}
