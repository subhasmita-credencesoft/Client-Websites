"use client";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { homeSectionContent } from "@/lib/data/content/resort-content";

export function ReservationSection() {
  const content = homeSectionContent.reservation;

  return (
    <section
      id="reserve"
      data-section-id="reserve"
      data-reveal
      className="relative mx-auto max-w-7xl px-5 pb-28 pt-6 md:px-8 md:pb-34"
    >
      <div className="glass-panel luxury-shadow overflow-hidden rounded-[2.2rem] p-8 md:p-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(216,189,150,0.23),transparent_36%),radial-gradient(circle_at_100%_0%,rgba(95,121,158,0.2),transparent_36%)]" />
        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#deb88c]">{content.eyebrow}</p>
            <h3 className="max-w-2xl text-balance text-3xl leading-tight text-[#fff0d9] md:text-5xl">
              {content.title}
            </h3>
            <p className="mt-4 max-w-xl text-sm text-white/70 md:text-base">
              {content.description}
            </p>
          </div>
          <MagneticButton href="/booking" className="w-fit whitespace-nowrap">
            {content.cta}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
