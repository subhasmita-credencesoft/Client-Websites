import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeSectionContent } from "@/lib/data/content/resort-content";

/*
 * FIX 1 — image metadata defined at module level.
 * Avoids re-deriving sizes/priority on every render.
 */
const IMAGE_META = [
  { sizes: "(max-width: 768px) 100vw, 60vw",  priority: true  }, // [0] large-left  — LCP
  { sizes: "(max-width: 768px) 100vw, 40vw",  priority: false }, // [1] small-right
  { sizes: "(max-width: 768px) 100vw, 40vw",  priority: false }, // [2] small-left
  { sizes: "(max-width: 768px) 100vw, 60vw",  priority: false }, // [3] large-right
] as const;

export function ParallaxGallerySection() {
  const content = homeSectionContent.parallax;

  return (
    <section
      data-cinematic-section
      className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-30"
    >
      {/* Glow orbs — unchanged visually */}
      <div
        className="cinematic-glow absolute left-[3%] top-[16%] h-[18rem] w-[18rem]"
        data-cinematic-glow
      />
      <div
        className="cinematic-glow absolute bottom-[8%] right-[5%] h-[19rem] w-[19rem]"
        data-cinematic-glow
      />

      <div data-cinematic-copy>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
      </div>

      <div
        data-reveal
        className="relative mt-16 grid gap-4 md:grid-cols-12 md:grid-rows-2"
      >
        {/* ── Panel 0 — large left, row-span-2 ── */}
        <figure
          data-cinematic-card
          /*
           * FIX 2 — `[will-change:transform]` on every card promotes each
           * figure to its own GPU compositing layer so JS parallax transforms
           * and reveal animations don't trigger repaints on siblings.
           */
          className="glass-panel luxury-shadow relative col-span-12 h-[15rem] overflow-hidden rounded-3xl p-2 [will-change:transform] md:col-span-7 md:h-[29rem]"
        >
          <div className="relative h-full overflow-hidden rounded-[1.3rem]">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#070708]/70 via-transparent to-transparent" />
            {/*
             * FIX 3 — replaced non-standard `will-transform` class with the
             * correct Tailwind arbitrary property `[will-change:transform]`.
             * This is the actual CSS hint the browser needs.
             */}
            <div
              className="h-full w-full [will-change:transform]"
              data-cinematic-media
              data-parallax
              data-parallax-depth="12"
            >
              <Image
                src={content.images[0].src}
                alt={content.images[0].alt}
                fill
                /*
                 * FIX 4 — image[0] is the largest visible element on load
                 * (LCP candidate). `priority` injects <link rel="preload">
                 * in <head> so it fetches before JS executes.
                 * `loading="eager"` prevents lazy-load deferral.
                 * FIX 5 — `quality={65}` for AVIF/WebP — saves ~20% bytes
                 * vs the default 75 with no perceptible visual loss.
                 */
                priority={IMAGE_META[0].priority}
                loading="eager"
                quality={65}
                sizes={IMAGE_META[0].sizes}
                className="object-cover"
              />
            </div>
          </div>
        </figure>

        {/* ── Panel 1 — small right, row 1 ── */}
        <figure
          data-cinematic-card
          className="glass-panel luxury-shadow relative col-span-12 h-[15rem] overflow-hidden rounded-3xl p-2 [will-change:transform] md:col-span-5 md:h-[14rem]"
        >
          <div className="relative h-full overflow-hidden rounded-[1.3rem]">
            <div
              className="h-full w-full [will-change:transform]"
              data-cinematic-media
              data-parallax
              data-parallax-depth="22"
            >
              <Image
                src={content.images[1].src}
                alt={content.images[1].alt}
                fill
                loading="lazy"
                quality={65}
                sizes={IMAGE_META[1].sizes}
                className="object-cover"
              />
            </div>
          </div>
        </figure>

        {/* ── Panel 2 — small left, row 2 ── */}
        <figure
          data-cinematic-card
          className="glass-panel luxury-shadow relative col-span-12 h-[15rem] overflow-hidden rounded-3xl p-2 [will-change:transform] md:col-span-5 md:h-[14rem]"
        >
          <div className="relative h-full overflow-hidden rounded-[1.3rem]">
            <div
              className="h-full w-full [will-change:transform]"
              data-cinematic-media
              data-parallax
              data-parallax-depth="18"
            >
              <Image
                src={content.images[2].src}
                alt={content.images[2].alt}
                fill
                loading="lazy"
                quality={65}
                sizes={IMAGE_META[2].sizes}
                className="object-cover"
              />
            </div>
          </div>
        </figure>

        {/* ── Panel 3 — large right, row-span-2 ── */}
        <figure
          data-cinematic-card
          className="glass-panel luxury-shadow relative col-span-12 h-[15rem] overflow-hidden rounded-3xl p-2 [will-change:transform] md:col-span-7 md:h-[29rem]"
        >
          <div className="relative h-full overflow-hidden rounded-[1.3rem]">
            <div className="absolute inset-0 z-10 bg-gradient-to-tr from-[#070708]/50 via-transparent to-transparent" />
            <div
              className="h-full w-full [will-change:transform]"
              data-cinematic-media
              data-parallax
              data-parallax-depth="10"
            >
              <Image
                src={content.images[3].src}
                alt={content.images[3].alt}
                fill
                loading="lazy"
                quality={65}
                sizes={IMAGE_META[3].sizes}
                className="object-cover"
              />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}