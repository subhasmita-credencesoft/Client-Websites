import Image from "next/image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { homeSectionContent } from "@/lib/data/content/resort-content";

export function MediaCoverageSection() {
  const content = homeSectionContent.media;

  return (
    <section data-section-id="media" className="bg-black px-5 py-20 md:px-12">
      <div className="mx-auto grid max-w-[92rem] gap-12 md:grid-cols-2 md:items-center">
        <div data-card className="relative mx-auto h-[30rem] w-full max-w-[38rem] overflow-hidden">
          <Image
            src="/images/DSC08849.avif"
            alt="Media coverage"
            fill
            className="object-cover"
            data-card-image
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>

        <div data-reveal className="text-center md:text-left">
          <p data-section-title className="text-sm uppercase tracking-[0.35em] text-[#cba977]">
            {content.eyebrow}
          </p>
          <h3 className="mt-5 text-3xl leading-tight text-white md:text-5xl" data-section-title>
            {content.title}
          </h3>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/85 md:mx-0 md:text-lg">
            {content.description}
          </p>
          <div className="mt-9">
            <MagneticButton href="/mountain-view-destination">{content.cta}</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
