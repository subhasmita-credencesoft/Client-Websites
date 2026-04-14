import Image from "next/image";
import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";
import { homeSectionContent } from "@/lib/data/content/resort-content";

export function AboutIntroSection() {
  const content = homeSectionContent.about;

  return (
    <SectionShell
      data-section-id="about"
      data-sticky-fade-section
      className="bg-black"
      containerClassName="grid max-w-[92rem] gap-10 md:grid-cols-[1.3fr_0.7fr] md:items-center"
    >
      <div data-sticky-fade-heading className="md:sticky md:top-5 [will-change:transform]">
        <h2 data-sticky-fade-line className="site-title-md max-w-4xl text-balance text-[var(--color-primary-hover)]">
          {content.title}
        </h2>

        <p data-sticky-fade-line className="mt-6 max-w-4xl text-[clamp(1.4rem,4vw,2.3rem)] leading-tight text-white">
          {content.highlight}
        </p>

        <p data-sticky-fade-line className="site-copy mt-7 max-w-4xl">
          {content.body}
        </p>

        <div data-sticky-fade-line className="mt-8">
          <Link
            href="/about"
            className={buttonClassName({
              variant: "secondary",
              size: "md",
              className: "px-7 [will-change:transform]",
            })}
            data-cursor="hover"
          >
            {content.cta}
          </Link>
        </div>
      </div>

      <aside data-sticky-fade-block className="mx-auto w-full max-w-sm md:sticky md:top-8 [will-change:transform]">
        <div className="border-[5px] border-[var(--color-primary)] bg-[var(--color-accent)] p-4 shadow-[0_0_30px_rgba(185,146,84,0.3)]">
          <div className="border-[4px] border-[var(--color-primary-hover)] bg-white p-4">
            <div
              className="relative h-[22rem] overflow-hidden [will-change:transform]"
              data-card-image
              data-bg-parallax
              data-bg-depth="7"
            >
              <Image
                src="https://bookonelocal.in/cdn/DSC08846.avif"
                alt="The Mountain quotation detail"
                fill
                priority
                loading="eager"
                quality={65}
                sizes="(max-width: 768px) calc(100vw - 40px), 358px"
                className="object-cover"
              />
            </div>

            <p className="pt-4 text-center text-base text-black md:text-lg">{content.awardTitle}</p>
            <p className="text-center text-sm text-black/75 md:text-base">{content.awardSubtitle}</p>
          </div>
        </div>
      </aside>
    </SectionShell>
  );
}
