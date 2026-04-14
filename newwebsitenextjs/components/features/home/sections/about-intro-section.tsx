import Image from "next/image";
import Link from "next/link";
import { homeSectionContent } from "@/lib/data/content/resort-content";
import { SectionShell } from "@/components/ui/section-shell";

export function AboutIntroSection() {
  const content = homeSectionContent.about;

  return (
    <SectionShell
      data-section-id="about"
      data-sticky-fade-section
      className="bg-black"
      containerClassName="grid max-w-[92rem] gap-10 md:grid-cols-[1.3fr_0.7fr] md:items-center"
    >
        <div
          data-sticky-fade-heading
          className="md:sticky md:top-5 [will-change:transform]"
        >
          <h2
            data-sticky-fade-line
            className="site-title-md max-w-4xl text-balance text-[#cba977]"
          >
            {content.title}
          </h2>

          <p
            data-sticky-fade-line
            className="mt-6 max-w-4xl text-[clamp(1.4rem,4vw,2.3rem)] leading-tight text-white"
          >
            {content.highlight}
          </p>

          <p
            data-sticky-fade-line
            className="site-copy mt-7 max-w-4xl"
          >
            {content.body}
          </p>

          <div data-sticky-fade-line className="mt-8">
            <Link
              href="/about"
              /*
               * backdrop-blur is GPU-expensive; isolate it on its own
               * compositing layer so it doesn't repaint siblings.
               */
              className="site-button site-button-secondary px-7 [will-change:transform]"
              data-cursor="hover"
            >
              {content.cta}
            </Link>
          </div>
        </div>

        {/* RIGHT — sticky image card */}
        <aside
          data-sticky-fade-block
          className="mx-auto w-full max-w-sm md:sticky md:top-8 [will-change:transform]"
        >
          <div className="border-[5px] border-[#b99253] bg-[#f3eee7] p-4 shadow-[0_0_30px_rgba(185,146,84,0.3)]">
            <div className="border-[4px] border-[#d9bf8e] bg-white p-4">
              {/*
               * FIX 1 — reserve exact pixel space so the browser never
               *          shifts layout after the image loads (eliminates CLS).
               * FIX 2 — `will-change: transform` isolates the JS parallax
               *          scroll handler onto its own GPU layer; repaints
               *          no longer cascade to surrounding content.
               */}
              <div
                className="relative overflow-hidden [will-change:transform]"
                style={{ height: "22rem" }}
                data-card-image
                data-bg-parallax
                data-bg-depth="7"
              >
                <Image
                  src="https://bookonelocal.in/cdn/DSC08846.avif"
                  alt="The Mountain quotation detail"
                  fill
                  /*
                   * FIX 3 — `priority` tells Next.js to <link rel="preload">
                   *          this image immediately; critical for LCP when the
                   *          section is above the fold.
                   * FIX 4 — `loading="eager"` prevents the lazy-load skip that
                   *          would otherwise delay first paint.
                   * FIX 5 — tighter `sizes` matches the actual rendered width
                   *          (max-w-sm = 384 px, minus 2×(5+4+4) px of borders
                   *          and padding ≈ 358 px) so the browser fetches the
                   *          smallest sufficient srcset variant.
                   * FIX 6 — `quality={65}` is enough for .avif; the codec's
                   *          own compression is very efficient, so the default
                   *          75 wastes bandwidth with no perceptible gain.
                   */
                  priority
                  loading="eager"
                  quality={65}
                  sizes="(max-width: 768px) calc(100vw - 40px), 358px"
                  className="object-cover"
                />
              </div>

              <p className="pt-4 text-center text-base text-black md:text-lg">
                {content.awardTitle}
              </p>
              <p className="text-center text-sm text-black/75 md:text-base">
                {content.awardSubtitle}
              </p>
            </div>
          </div>
        </aside>
    </SectionShell>
  );
}
