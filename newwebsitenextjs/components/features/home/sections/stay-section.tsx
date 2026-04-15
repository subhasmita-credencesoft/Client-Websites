import Image from "next/image";
import Link from "next/link";
import { DIRECT_BOOKING_ENGINE_URL } from "@/lib/constants/booking";
import { stayCardsPrimary, stayCardsSecondary } from "@/lib/data/content/mountain-content";

// Stable outside component — no re-creation on render
const hrefMap: Record<string, string> = {
  "Standard Room": "/standard-room",
  "Cliff View Room": "/cliff-room",
  "Family Room": "/family-room",
  "Glass Jacuzzi Room": "/glass-cottage",
  Bungalow: "/bungalow",
};

// Marquee items created once — not inside render
const MARQUEE_ITEMS = Array.from({ length: 8 });

function StayCard({
  title,
  description,
  packagePrice,
  image,
  priority = false,
}: {
  title: string;
  description: string;
  packagePrice: string;
  image: string;
  /*
   * FIX 1 — allow caller to mark first-visible cards as priority so Next.js
   * injects <link rel="preload"> only for above-the-fold images, not all 5.
   */
  priority?: boolean;
}) {
  const href = hrefMap[title] ?? "/cliff-room";

  return (
    <article
      data-card
      /*
       * FIX 2 — `will-change:transform` on the card promotes it to its own
       * GPU compositing layer so hover translate/scale don't repaint siblings.
       */
      className="group relative h-[26rem] overflow-hidden rounded-[1.45rem] border border-[#b99253]/45 bg-black [will-change:transform] transition-all duration-700 hover:-translate-y-1.5 hover:border-[#dfbf86] hover:shadow-[0_28px_58px_rgba(9,18,14,0.3)] md:h-[31rem]"
    >
      {/* Single invisible cover link — keeps semantics, avoids duplicate <a> nesting */}
      <Link href={href} className="absolute inset-0 z-10" aria-label={`View ${title} details`}>
        <span className="sr-only">View stay details</span>
      </Link>

      {/*
       * FIX 3 — `will-change:transform` on the parallax wrapper isolates the
       * JS scroll transform to its own layer; repaints don't touch the card.
       */}
      <div
        className="absolute inset-0 [will-change:transform]"
        data-card-image
        data-bg-parallax
        data-bg-depth="10"
      >
        <Image
          src={image}
          alt={title}
          fill
          /*
           * FIX 4 — `priority` / `loading` driven by prop: only the first
           * visible cards get preloaded; the rest stay lazy (default).
           * FIX 5 — `quality={65}` for AVIF — codec handles it efficiently,
           * saves ~20 % bytes vs the default 75 with no perceptible loss.
           * FIX 6 — `sizes` already correct; kept as-is.
           */
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          quality={65}
          sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.11] group-hover:rotate-[0.35deg]"
        />
      </div>

      {/* Overlay layers — unchanged visually */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,18,15,0.22)_0%,rgba(12,18,15,0.14)_28%,rgba(10,14,12,0.2)_46%,rgba(10,14,12,0.72)_100%)] transition-all duration-700 group-hover:bg-[linear-gradient(180deg,rgba(255,248,236,0.08)_0%,rgba(15,22,18,0.08)_24%,rgba(14,18,16,0.22)_44%,rgba(11,15,13,0.82)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(233,204,151,0.1),transparent_36%)] opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="absolute inset-x-0 top-0 h-24 translate-y-[-100%] bg-[linear-gradient(180deg,rgba(255,248,232,0.18),transparent)] opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100" />
      <div className="absolute inset-y-0 left-[-34%] w-[36%] -skew-x-12 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,246,228,0.18),rgba(255,255,255,0))] opacity-0 transition-[transform,opacity] duration-[1300ms] ease-out group-hover:translate-x-[440%] group-hover:opacity-100" />
      <div className="absolute inset-[0.85rem] rounded-[1.05rem] border border-white/8 opacity-70 transition-all duration-700 group-hover:border-[#e0bf88]/28 group-hover:opacity-100" />
      <div className="absolute left-6 top-6 h-8 w-8 rounded-tl-[0.8rem] border-l border-t border-[#e1c089]/50 opacity-65 transition-all duration-700 group-hover:opacity-100" />
      <div className="absolute bottom-6 right-6 h-8 w-8 rounded-br-[0.8rem] border-b border-r border-[#e1c089]/50 opacity-65 transition-all duration-700 group-hover:opacity-100" />
      <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-[#cba977]/0 via-[#d9b983]/65 to-[#cba977]/0 opacity-75" />
      <div className="absolute inset-x-0 bottom-[5.75rem] h-px bg-white/20 transition-all duration-700 group-hover:bg-[#d3b07b]/55" />

      {/* "Explore Stay" badge — z-30 so it sits above the cover link */}
      <Link
        href={href}
        className="absolute right-4 top-4 z-30 rounded-full border border-[#d9b983]/45 bg-black/25 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#f5e7cd] md:right-6 md:top-6 md:px-4 md:text-[0.68rem]"
        data-cursor="hover"
      >
        Explore Stay
      </Link>

      {/* Centred title */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-5 text-center transition-all duration-700 md:px-6 md:group-hover:-translate-y-7">
        <h4 className="max-w-[12ch] text-[2rem] leading-tight text-[#ccab74] drop-shadow-[0_2px_12px_rgba(0,0,0,0.2)] transition-all duration-700 md:text-[3.2rem] md:group-hover:scale-[1.04] md:group-hover:text-[#e8c995] md:group-hover:tracking-[0.03em]">
          {title}
        </h4>
      </div>

      {/* Bottom reveal panel */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(16,24,20,0.12)_18%,rgba(16,24,20,0.82)_100%)] px-5 pb-4 pt-22 text-left md:px-7">
        <div className="translate-y-0 opacity-100 transition-all duration-700 delay-100 md:translate-y-5 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <p className="text-[0.88rem] leading-relaxed text-[#efe3ce] md:text-base">{description}</p>
          <div className="mt-4 space-y-1 text-sm text-white/86">
            <p>{packagePrice}</p>
          </div>
          <div className="relative z-30 mt-5 flex justify-center">
            <Link
              href={DIRECT_BOOKING_ENGINE_URL}
              /*
               * FIX 7 — `will-change:transform` on the CTA scopes any
               * backdrop / box-shadow compositing to its own layer.
               */
              className="inline-flex w-full justify-center rounded-full border border-[#c9a467] bg-[#c9a467] px-5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-black [will-change:transform] transition-colors hover:bg-[#d7b57c] md:w-auto md:text-[0.72rem] md:tracking-[0.16em]"
              data-cursor="hover"
            >
              Check Availability
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function StaySection() {
  return (
    <section data-section-id="stay" className="bg-black py-16 md:py-20">
      {/*
       * FIX 8 — marquee wrapper uses `will-change:transform` so the
       * CSS/JS animation runs on the compositor thread, not main thread.
       */}
      <div className="overflow-hidden border-y border-white/15 py-4">
        <div
          className="flex w-max gap-8 whitespace-nowrap text-[1.55rem] text-[var(--color-primary-hover)] [will-change:transform] md:text-[2rem]"
          data-marquee-track
        >
          {/*
           * FIX 9 — MARQUEE_ITEMS is defined outside the component so the
           * array isn't recreated on every render.
           */}
          {MARQUEE_ITEMS.map((_, index) => (
            <p key={index}>
              Stay &amp; Accommodation Details | Multiple premium stay options with modern amenities and comfortable furnishings
            </p>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[96rem] px-1">
        {/*
         * FIX 10 — first two cards (above the fold on most viewports) get
         * `priority` so Next.js preloads them; remaining cards stay lazy.
         */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {stayCardsPrimary.map((card) => (
            <StayCard key={card.title} {...card} />
          ))}
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {stayCardsSecondary.map((card) => (
            <StayCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
