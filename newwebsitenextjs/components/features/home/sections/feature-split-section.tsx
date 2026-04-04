import Image from "next/image";
import Link from "next/link";
import { splitFeatures } from "@/lib/data/content/mountain-content";
import { homeSectionContent } from "@/lib/data/content/resort-content";

export function FeatureSplitSection() {
  const content = homeSectionContent.featureSplit;

  return (
    <section className="bg-black">
      {splitFeatures.map((feature, index) => {
        const isEven = index % 2 === 0;
        const isFirst = index === 0;

        return (
          <article
            key={feature.id}
            data-feature-stage
            data-cinematic-section
            data-section-id={feature.id}
            className="relative min-h-[72svh] overflow-hidden"
          >
            <div
              className="absolute inset-0 z-0 [will-change:transform]"
              data-feature-image
              data-cinematic-media
              data-bg-parallax
              data-bg-depth="10"
            >
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                priority={isFirst}
                loading={isFirst ? "eager" : "lazy"}
                quality={65}
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div
              aria-hidden="true"
              className="cinematic-glow absolute left-[8%] top-[18%] h-[18rem] w-[18rem] [will-change:transform]"
              data-cinematic-glow
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.84)_18%,rgba(0,0,0,0.5)_55%,rgba(0,0,0,0.8)_100%)]" />

            <div className="relative mx-auto flex max-w-[95rem] px-5 py-24 md:px-10">
              <div
                data-feature-content
                data-cinematic-copy
                className={isEven ? "max-w-4xl" : "ml-auto max-w-4xl text-left md:text-center"}
              >
                <h3
                  data-section-title
                  className="text-3xl leading-tight text-[#cba977] md:text-5xl"
                >
                  {feature.title}
                </h3>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white md:text-2xl">
                  {feature.description}
                </p>
                <div className="mt-9">
                  <Link
                    href={feature.href}
                    className="group inline-flex items-center justify-center rounded-full border border-[#d7b17c]/40 bg-[#365143]/80 px-7 py-3 text-xs uppercase tracking-[0.24em] text-[#fff6ea] [will-change:transform] backdrop-blur-xl transition-all duration-500 hover:border-[#dfbe97]/80 hover:bg-[#415b4e] hover:shadow-[0_0_26px_rgba(224,180,129,0.35)]"
                    data-cursor="hover"
                  >
                    {feature.cta || content.ctaFallback}
                  </Link>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}