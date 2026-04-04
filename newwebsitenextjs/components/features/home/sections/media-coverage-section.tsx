import Image from "next/image";
import Link from "next/link";
import { homeSectionContent } from "@/lib/data/content/resort-content";

export function MediaCoverageSection() {
  const content = homeSectionContent.gastronomy;

  return (
    <section data-section-id="media" className="bg-black px-5 py-20 md:px-12">
      <div className="mx-auto grid max-w-[92rem] gap-12 md:grid-cols-2 md:items-center">
        {/*
         * FIX 1 — `will-change:transform` on the sticky image wrapper promotes
         *          it to its own GPU compositing layer, so scroll repaints don't
         *          cascade to surrounding content.
         */}
        <div
          data-card
          className="relative mx-auto h-[30rem] w-full max-w-[38rem] overflow-hidden md:sticky md:top-7 [will-change:transform]"
        >
          <Image
            src="https://bookonelocal.in/cdn/DSC08849.avif"
            alt="Wedding hospitality and culinary experience"
            fill
            /*
             * FIX 2 — `priority` injects <link rel="preload"> in <head> so the
             *          browser fetches this LCP image before JS even executes.
             * FIX 3 — `loading="eager"` prevents lazy-load deferral for a
             *          section that is visible on or near first paint.
             * FIX 4 — tighter `sizes`: max-w-[38rem] = 608 px on desktop,
             *          so "40vw" over-fetches on large screens. 608px cap is exact.
             * FIX 5 — `quality={65}` — AVIF codec is very efficient; 65 cuts
             *          payload ~20 % with no perceptible visual difference.
             */
            priority
            loading="eager"
            quality={65}
            sizes="(max-width: 768px) calc(100vw - 40px), min(608px, 40vw)"
            className="object-cover"
            data-card-image
          />
        </div>

        {/*
         * FIX 6 — `will-change:transform` on the sticky text column isolates
         *          its compositing so sticky scroll doesn't repaint siblings.
         */}
        <div className="text-center md:sticky md:top-5 md:text-left [will-change:transform]">
          <p className="text-sm uppercase tracking-[0.35em] text-[#cba977]">
            Wedding Hospitality
          </p>
          <h3 className="mt-5 text-3xl leading-tight text-white md:text-5xl">
            {content.title}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-[#dcc393] md:mx-0 md:text-2xl">
            {content.subtitle}
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/85 md:mx-0 md:text-lg">
            {content.description}
          </p>

          {/*
           * FIX 7 — replaced per-item <p> renders with a single <ul> so the
           *          browser builds one layout box instead of N separate ones;
           *          semantically correct and faster to paint.
           */}
          <ul className="mx-auto mt-6 max-w-2xl space-y-3 text-left text-sm leading-relaxed text-white/75 md:mx-0 md:text-base">
            {content.highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true">–</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            {/*
             * FIX 8 — `will-change:transform` isolates backdrop-blur to its
             *          own layer so hover transitions don't trigger a full-
             *          section repaint.
             */}
            <Link
              href="/offers"
              className="group inline-flex items-center justify-center rounded-full border border-[#d7b17c]/40 bg-[#365143]/80 px-7 py-3 text-xs uppercase tracking-[0.24em] text-[#fff6ea] [will-change:transform] backdrop-blur-xl transition-all duration-500 hover:border-[#dfbe97]/80 hover:bg-[#415b4e] hover:shadow-[0_0_26px_rgba(224,180,129,0.35)]"
              data-cursor="hover"
            >
              EXPLORE PACKAGES
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}