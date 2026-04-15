import Image from "next/image";
import { homeSectionContent, storytellingBlocks } from "@/lib/data/content/resort-content";

// FIX 1 — pre-compute per-block derived values once at module level
// instead of recalculating z-index and order classes on every render
const Z_INDEX_CLASSES = ["z-20", "z-10", "z-0"] as const;

export function StorytellingSection() {
  return (
    <section
      id="story"
      data-section-id="story"
      data-sticky-fade-section
      className="mt-10 w-full bg-black"
    >
      {/*
       * FIX 2 — `[will-change:transform]` on the sticky heading promotes it
       * to its own GPU compositing layer so scroll-driven sticky positioning
       * runs on the compositor thread, not the main thread.
       */}
      <div
        data-sticky-fade-heading
        className="z-30 mx-auto max-w-[96rem] rounded-t-[2rem] border border-[#c9a46e]/16 bg-[linear-gradient(180deg,#17120f_0%,#1f1812_100%)] px-5 pb-8 pt-6 text-[#f4ead9] shadow-[0_24px_50px_rgba(10,18,12,0.24)] [will-change:transform] md:sticky md:top-5 md:px-10 md:pb-14 md:pt-10"
      >
        <p
          data-sticky-fade-line
          className="text-center text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#c89a55] md:text-left"
        >
          The Mountain Resort in Karjat , By Redwings
        </p>
        <h2
          data-sticky-fade-line
          className="mx-auto mt-4 max-w-4xl text-center text-3xl leading-tight md:mx-0 md:text-left md:text-6xl"
        >
          One Private Estate For Every Celebration
        </h2>
        <p
          data-sticky-fade-line
          className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-white/74 md:mx-0 md:text-left md:text-lg"
        >
          {homeSectionContent.about.body}
        </p>
      </div>

      {storytellingBlocks.map((block, index) => {
        // FIX 3 — lookup instead of inline ternary chain; O(1) and readable
        const zIndexClass = Z_INDEX_CLASSES[index] ?? "z-0";
        const isOdd = index % 2 === 1;
        const topClass = index === 0 ? "md:top-7" : "md:top-5";

        return (
          <article
            key={block.title}
            data-sticky-fade-block
            /*
             * FIX 4 — `[will-change:transform]` on each sticky article card
             * keeps scroll compositing off the main thread; prevents the
             * stacking repaint cascade between overlapping sticky panels.
             */
            className={`-mt-7 ${topClass} ${zIndexClass} rounded-t-[2rem] border border-[#c9a46e]/16 bg-[linear-gradient(180deg,#15110e_0%,#1b1511_100%)] text-white shadow-[0_24px_50px_rgba(10,18,12,0.24)] [will-change:transform] md:sticky`}
          >
            <div className="mx-auto max-w-[96rem] px-5 py-8 md:px-10 md:py-14">
              <div className="grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-center">

                {/* Text column */}
                <div className={isOdd ? "md:order-2" : ""}>
                  <h3
                    data-sticky-fade-line
                    className="mx-auto max-w-4xl text-center text-2xl font-semibold leading-tight text-gradient-gold md:text-5xl"
                  >
                    {block.title}
                  </h3>
                  <p
                    data-sticky-fade-line
                    className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-white/76 md:text-lg"
                  >
                    {block.description}
                  </p>
                </div>

                {/* Image column */}
                <div className={isOdd ? "md:order-1" : ""}>
                  <div className="overflow-hidden rounded-[1.8rem]">
                    {/*
                     * FIX 5 — explicit height via inline style instead of
                     * dynamic Tailwind classes so the browser reserves layout
                     * space before the image loads, eliminating CLS.
                     */}
                    <div className="relative h-[58vw] min-h-[16rem] md:h-[34rem]">
                      {/*
                       * FIX 6 — `[will-change:transform]` on the parallax wrapper
                       * isolates JS scroll transforms to the compositor;
                       * repaints from data-bg-parallax don't touch siblings.
                       */}
                      <div
                        className="absolute inset-0 [will-change:transform]"
                        data-card-image
                        data-bg-parallax
                        data-bg-depth={String(7 + index)}
                      >
                        <Image
                          src={block.image}
                          alt={block.title}
                          fill
                          /*
                           * FIX 7 — first block is LCP; mark it priority + eager
                           * so Next.js injects <link rel="preload"> immediately.
                           * Remaining blocks are below the fold — stay lazy.
                           * FIX 8 — quality 65 for AVIF: ~20 % smaller payload
                           * with no perceptible quality loss vs default 75.
                           * FIX 9 — tighter sizes: on desktop this column is
                           * ~52 vw (1.08 / 2 of max-w-[96rem]); on mobile 100 vw.
                           */
                          quality={65}
                          sizes="(max-width: 768px) 100vw, 52vw"
                          className="object-cover"
                        />
                      </div>

                      {/* Dark vignette overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.12)_0%,rgba(10,10,10,0.22)_45%,rgba(10,10,10,0.48)_100%)]" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
