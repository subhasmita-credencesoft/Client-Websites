import Image from "next/image";
import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";
import { homeSectionContent } from "@/lib/data/content/resort-content";

export function MediaCoverageSection() {
  const content = homeSectionContent.gastronomy;

  return (
    <section data-section-id="media" className="bg-black px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[92rem] gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-14">
        <div
          data-card
          className="relative mx-auto h-[28rem] w-full max-w-[38rem] overflow-hidden rounded-[1.5rem] border border-white/12 md:sticky md:top-7 md:h-[30rem] [will-change:transform]"
        >
          <Image
            src="https://bookonelocal.in/cdn/DSC08849.avif"
            alt="Wedding hospitality and culinary experience"
            fill
            quality={65}
            sizes="(max-width: 768px) calc(100vw - 40px), min(608px, 40vw)"
            className="object-cover"
            data-card-image
          />
        </div>

        <div className="text-center md:sticky md:top-5 md:text-left [will-change:transform]">
          <p className="site-eyebrow">Wedding Hospitality</p>
          <h3 className="site-title-lg mt-5 text-white">{content.title}</h3>
          <p className="mx-auto mt-4 max-w-2xl text-[clamp(1.18rem,2.4vw,1.75rem)] leading-tight text-[var(--color-primary-hover)] md:mx-0">
            {content.subtitle}
          </p>
          <p className="site-copy mx-auto mt-7 max-w-2xl text-white/82 md:mx-0">
            {content.description}
          </p>

          <ul className="mx-auto mt-6 max-w-2xl space-y-3 text-left text-[var(--text-sm)] leading-relaxed text-white/72 md:mx-0 md:text-[var(--text-base)]">
            {content.highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="text-[var(--color-primary-hover)]">
                  –
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Link
              href="/offers"
              className={buttonClassName({
                variant: "secondary",
                size: "md",
                className: "px-7 [will-change:transform]",
              })}
              data-cursor="hover"
            >
              Explore Packages
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
