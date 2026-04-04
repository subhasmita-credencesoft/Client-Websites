import Image from "next/image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { awardCards } from "@/lib/data/content/mountain-content";
import { homeSectionContent } from "@/lib/data/content/resort-content";

export function AwardsSection() {
  const content = homeSectionContent.awards;

  return (
    <section data-section-id="awards" className="bg-black px-5 py-20 md:px-10">
      <div className="text-center" data-reveal>
        <h3
          data-section-title
          className="text-3xl leading-tight text-[#cba977] md:text-5xl"
        >
          {content.title}
        </h3>
        <p className="mx-auto mt-4 max-w-4xl text-lg text-white md:text-2xl">
          {content.subtitle}
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-[92rem] gap-9 md:grid-cols-3">
        {awardCards.map((award, index) => (
          <article
            key={award.title}
            data-card
            className="border-x border-white/20 px-7 text-center"
          >
            <div
              className="mx-auto h-[24rem] max-w-xs overflow-hidden bg-white [will-change:transform]"
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
            <p className="mt-8 text-2xl leading-tight text-white md:text-3xl">
              {award.title}
            </p>
            <p className="mt-3 text-xl leading-snug text-white/85 md:text-2xl">
              {award.subtitle}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <MagneticButton href="/rules">{content.cta}</MagneticButton>
      </div>
    </section>
  );
}