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
      containerClassName="grid max-w-[92rem] gap-10 md:grid-cols-[1.25fr_0.75fr] md:items-center md:gap-14"
    >
      <div data-sticky-fade-heading className="md:sticky md:top-5 [will-change:transform]">
        <h2 data-sticky-fade-line className="site-title-md max-w-4xl text-balance text-[var(--color-primary-hover)]">
          {content.title}
        </h2>

        <p data-sticky-fade-line className="mt-5 max-w-4xl text-[clamp(1.3rem,3.8vw,2.15rem)] leading-tight text-white">
          {content.highlight}
        </p>

        <p data-sticky-fade-line className="site-copy mt-6 max-w-4xl text-white/80">
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
          >
            {content.cta}
          </Link>
        </div>
      </div>

      <aside data-sticky-fade-block className="mx-auto w-full max-w-sm md:sticky md:top-8 [will-change:transform]">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[0_18px_48px_rgba(0,0,0,0.24)]">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-background)] p-4">
            <div
              className="relative h-[22rem] overflow-hidden rounded-[var(--radius-md)] [will-change:transform]"
              data-card-image
              data-bg-parallax
              data-bg-depth="7"
            >
              <Image
                src="https://bookonelocal.in/cdn/DSC08846.avif"
                alt="The Mountain quotation detail"
                fill
                quality={65}
                sizes="(max-width: 768px) calc(100vw - 40px), 358px"
                className="object-cover"
              />
            </div>

            <p className="pt-4 text-center text-[var(--text-base)] font-[var(--font-medium)] text-[var(--color-text-primary)] md:text-[var(--text-lg)]">{content.awardTitle}</p>
            <p className="text-center text-[var(--text-sm)] text-[var(--color-text-secondary)] md:text-[var(--text-base)]">{content.awardSubtitle}</p>
          </div>
        </div>
      </aside>
    </SectionShell>
  );
}
