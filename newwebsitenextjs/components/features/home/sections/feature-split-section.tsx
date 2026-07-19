import Image from "next/image";
import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";
import { splitFeatures } from "@/lib/data/content/mountain-content";
import { homeSectionContent } from "@/lib/data/content/resort-content";

export function FeatureSplitSection() {
  const content = homeSectionContent.featureSplit;

  return (
    <section className="bg-black">
      {splitFeatures.map((feature, index) => {
        const isEven = index % 2 === 0;
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
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.84)_18%,rgba(0,0,0,0.54)_55%,rgba(0,0,0,0.82)_100%)]" />

            <div className="relative mx-auto flex max-w-[95rem] px-5 py-20 md:px-8 md:py-24">
              <div
                data-feature-content
                data-cinematic-copy
                className={isEven ? "max-w-4xl" : "ml-auto max-w-4xl text-left md:text-center"}
              >
                <h3
                  data-section-title
                  className="site-title-lg text-[var(--color-primary-hover)]"
                >
                  {feature.title}
                </h3>
                <p className="mt-5 max-w-3xl text-[clamp(1.08rem,2.3vw,1.5rem)] leading-relaxed text-white">
                  {feature.description}
                </p>
                <div className="mt-9">
                  <Link
                    href={feature.href}
                    className={buttonClassName({
                      variant: "secondary",
                      size: "md",
                      className: "px-7 [will-change:transform]",
                    })}
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
