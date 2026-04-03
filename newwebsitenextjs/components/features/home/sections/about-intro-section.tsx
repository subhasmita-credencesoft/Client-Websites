import Image from "next/image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { homeSectionContent } from "@/lib/data/content/resort-content";

export function AboutIntroSection() {
  const content = homeSectionContent.about;

  return (
    <section data-section-id="about" data-sticky-fade-section className="bg-black px-5 py-24 md:px-12 md:py-30">
      <div className="mx-auto grid max-w-[92rem] gap-10 md:grid-cols-[1.3fr_0.7fr] md:items-center">
        <div data-sticky-fade-heading className="md:sticky md:top-5">
          <h2
            data-sticky-fade-line
            className="text-balance text-2xl font-semibold leading-tight text-[#cba977] md:text-4xl"
          >
            {content.title}
          </h2>
          <p data-sticky-fade-line className="mt-6 max-w-4xl text-xl leading-snug text-white md:text-[2.15rem]">
            {content.highlight}
          </p>
          <p data-sticky-fade-line className="mt-7 max-w-4xl text-sm leading-relaxed text-white/85 md:text-base">
            {content.body}
          </p>
          <div data-sticky-fade-line className="mt-8">
            <MagneticButton href="/about">{content.cta}</MagneticButton>
          </div>
        </div>

        <aside data-sticky-fade-block className="mx-auto w-full max-w-sm md:sticky md:top-8">
          <div className="border-[5px] border-[#b99253] bg-[#f3eee7] p-4 shadow-[0_0_30px_rgba(185,146,84,0.3)]">
            <div className="border-[4px] border-[#d9bf8e] bg-white p-4">
              <div className="relative h-[22rem] overflow-hidden">
                <Image
                  src="https://bookonelocal.in/cdn/DSC08846.avif"
                  alt="The Mountain quotation detail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 22rem"
                />
              </div>
              <p className="pt-4 text-center text-base text-black md:text-lg">{content.awardTitle}</p>
              <p className="text-center text-sm text-black/75 md:text-base">{content.awardSubtitle}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

