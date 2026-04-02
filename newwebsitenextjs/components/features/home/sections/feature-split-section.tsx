import Image from "next/image";
import { splitFeatures } from "@/lib/data/content/mountain-content";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { homeSectionContent } from "@/lib/data/content/resort-content";

export function FeatureSplitSection() {
  const content = homeSectionContent.featureSplit;

  return (
    <section className="bg-black">
      {splitFeatures.map((feature, index) => (
        <article key={feature.id} data-feature-stage data-cinematic-section data-section-id={feature.id} className="relative min-h-[72svh] overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            data-feature-image
            data-cinematic-media
            data-bg-parallax
            data-bg-depth="10"
          >
            <Image src={feature.image} alt={feature.title} fill className="object-cover" sizes="100vw" />
          </div>
          <div className="cinematic-glow absolute left-[8%] top-[18%] h-[18rem] w-[18rem]" data-cinematic-glow />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.84)_18%,rgba(0,0,0,0.5)_55%,rgba(0,0,0,0.8)_100%)]" />
          <div className="relative mx-auto flex max-w-[95rem] px-5 py-24 md:px-10">
            <div
              data-feature-content
              data-cinematic-copy
              className={index % 2 === 0 ? "max-w-4xl" : "ml-auto max-w-4xl text-left md:text-center"}
            >
              <h3 data-section-title className="text-3xl leading-tight text-[#cba977] md:text-5xl">
                {feature.title}
              </h3>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white md:text-2xl">{feature.description}</p>
              <div className="mt-9">
                <MagneticButton href={feature.href}>{feature.cta || content.ctaFallback}</MagneticButton>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
