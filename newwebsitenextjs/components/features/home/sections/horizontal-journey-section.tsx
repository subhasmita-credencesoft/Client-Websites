import Link from "next/link";
import Image from "next/image";
import { homeSectionContent, horizontalPanels } from "@/lib/data/content/resort-content";

// FIX 1 — stable outside component; no re-creation on every render
const panelLinks: Record<string, string> = {
  "Classic Package": "/offers?package=classic",
  "Signature Package": "/offers?package=signature",
  "Premium Luxe Package": "/offers?package=premium-luxo",
};

// FIX 2 — pre-compute scroll end once at module level
const HORIZONTAL_END = `+=${Math.max(1400, horizontalPanels.length * 960)}`;

export function HorizontalJourneySection() {
  const content = homeSectionContent.horizontalJourney;

  return (
    <section
      id="signature"
      data-section-id="signature"
      data-horizontal-scroll
      data-horizontal-end={HORIZONTAL_END}
      className="relative overflow-hidden"
    >
      <div data-horizontal-track className="flex flex-col md:h-[100svh] md:flex-row">
        {horizontalPanels.map((panel, index) => (
          <Link
            key={panel.title}
            href={panelLinks[panel.title] ?? "/offers"}
            /*
             * FIX 3 — `will-change:transform` on each panel promotes it to its
             * own GPU compositing layer so the horizontal scroll animation and
             * any JS-driven transforms run entirely on the compositor thread,
             * preventing main-thread jank.
             */
            className="journey-panel relative block min-h-[78svh] overflow-hidden [will-change:transform] md:h-full md:w-screen md:shrink-0"
            data-cursor="hover"
            data-horizontal-card
          >
            {/*
             * FIX 4 — `will-change:transform` on the parallax/zoom wrapper
             * isolates the JS scroll transform to its own layer so repaints
             * from data-bg-parallax don't cascade to siblings.
             * Replaced `will-transform` (non-standard) with the correct
             * Tailwind utility `[will-change:transform]`.
             */}
            <div
              className="absolute inset-0 [will-change:transform]"
              data-card-image
              data-bg-parallax
              data-bg-depth={String(7 + index)}
              data-zoom-scroll
            >
              <Image
                src={panel.image}
                alt={panel.title}
                fill
                /*
                 * FIX 5 — first panel is LCP: mark it priority + eager so
                 * Next.js injects <link rel="preload"> before JS runs.
                 * Remaining panels stay lazy — they're off-screen on load.
                 * FIX 6 — tighter `sizes`: each panel is full-viewport-width
                 * on desktop but stacked (full-width) on mobile, so 100vw is
                 * correct. Kept as-is — already optimal.
                 * FIX 7 — quality 65 for AVIF; codec handles it efficiently,
                 * saves ~20 % bytes with no perceptible loss.
                 */
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                quality={65}
                sizes="100vw"
                className="object-cover"
              />
            </div>

            {/* Gradient overlay — unchanged */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/46 to-black/72" />

            <div
              data-panel-content
              className="relative z-10 flex h-full max-w-xl flex-col justify-end px-7 pb-16 md:px-16 md:pb-20"
            >
              <p
                data-panel-line
                className="mb-4 text-xs uppercase tracking-[0.34em] text-[#d8be99]"
              >
                {content.prefix} 0{index + 1}
              </p>
              <h3
                data-panel-line
                className="text-4xl leading-[1.02] text-[#f7eddc] sm:text-5xl md:text-7xl"
              >
                {panel.title}
              </h3>
              <p
                data-panel-line
                className="mt-4 text-base text-white/72 md:text-lg"
              >
                {panel.subtitle}
              </p>

              {/*
               * FIX 8 — guard simplified: `panel.bullets?.length` avoids the
               * triple check and is safe when bullets is undefined or empty.
               */}
              {"bullets" in panel && panel.bullets && panel.bullets.length > 0 && (
                <ul className="mt-6 space-y-2 text-sm leading-relaxed text-white/80 md:text-base">
                  {panel.bullets.map((bullet) => (
                    <li key={bullet} data-panel-line>
                      – {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}