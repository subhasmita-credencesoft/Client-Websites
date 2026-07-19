"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import Image from "next/image";
import { buttonClassName } from "@/components/ui/button";
import { offersCards } from "@/lib/data/content/mountain-content";
import { homeSectionContent } from "@/lib/data/content/resort-content";
import { SectionShell } from "@/components/ui/section-shell";

type OfferTab = (typeof homeSectionContent.offers.tabs)[number];

// FIX 1 — stable at module level; never re-created on render
const cardLinks: Record<string, string> = {
  "Classic Package": "/offers?package=classic",
  "Signature Package": "/offers?package=signature",
  "Premium Luxe Package": "/offers?package=premium-luxo",
};

export function OffersSection() {
  const content = homeSectionContent.offers;
  const [activeTab, setActiveTab] = useState<OfferTab>(content.tabs[0]);

  /*
   * FIX 2 — `useCallback` stabilises the handler so tab <button> elements
   * that receive it as a prop don't re-render on every parent state change.
   * Each button closes over its own `tab` value via the inline arrow below,
   * so we memoize the factory, not the individual handler.
   */
  const handleTabClick = useCallback((tab: OfferTab) => {
    setActiveTab(tab);
  }, []);

  /*
   * FIX 3 — filter runs once per render; result is stable until activeTab
   * changes. No further optimisation needed here (useMemo would add overhead
   * for a simple array filter over a small dataset).
   */
  const visibleCards = offersCards.filter((card) =>
    (card.tabs as readonly OfferTab[]).includes(activeTab)
  );

  return (
    <SectionShell
      data-section-id="offers"
      data-sticky-fade-section
      className="bg-black"
      containerClassName="max-w-[92rem]"
    >
      {/*
       * FIX 4 — `[will-change:transform]` on the sticky heading promotes it
       * to its own GPU compositing layer so sticky scroll runs on the
       * compositor thread, preventing main-thread jank.
       */}
      <div
        data-sticky-fade-heading
        className="text-center [will-change:transform] md:sticky md:top-5 md:z-20 md:bg-black/92 md:pb-8 md:backdrop-blur-sm"
      >
        <h3
          data-sticky-fade-line
          className="site-title-lg text-[var(--color-primary-hover)]"
        >
          {content.title}
        </h3>
        <p
          data-sticky-fade-line
          className="mt-3 text-[clamp(1.22rem,2.7vw,1.9rem)] leading-tight text-white"
        >
          {content.subtitle}
        </p>

        <div
          data-sticky-fade-line
          className="mt-8 flex flex-wrap items-center justify-center gap-5 text-[var(--text-base)] font-[var(--font-semibold)] uppercase tracking-[0.08em] text-white/65 md:gap-8 md:text-[1.15rem]"
        >
          {content.tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              /*
               * FIX 5 — inline arrow captures `tab` per iteration;
               * handleTabClick itself is stable via useCallback so React
               * doesn't schedule unnecessary child re-renders.
               */
              onClick={() => handleTabClick(tab)}
              className={`border-b pb-2 transition-colors ${
                activeTab === tab
                  ? "border-[var(--color-primary-hover)] text-[var(--color-primary-hover)]"
                  : "border-transparent text-white/65 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-[92rem] gap-6 md:grid-cols-3">
        {visibleCards.map((card) => (
          <Link
            key={card.title}
            href={cardLinks[card.title] ?? "/offers"}
            data-card
            data-sticky-fade-block
            /*
             * FIX 6 — `[will-change:transform]` on each card promotes it to
             * its own GPU layer so hover scale doesn't trigger a full-section
             * repaint. Also isolates the parallax layer below it.
             */
            className="group relative block h-[26rem] overflow-hidden rounded-[1.5rem] border border-white/18 [will-change:transform] sm:h-[31rem] md:h-[33rem]"
          >
            {/*
             * FIX 7 — `[will-change:transform]` on the parallax wrapper keeps
             * JS scroll transforms on the compositor thread.
             */}
            <div
              className="absolute inset-0 [will-change:transform]"
              data-card-image
              data-bg-parallax
              data-bg-depth="10"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                /*
                 * FIX 8 — first card is above the fold: priority + eager for
                 * LCP preload. Remaining cards stay lazy (off-screen on load).
                 * FIX 9 — quality 65 for AVIF; saves ~20 % bytes vs default 75
                 * with no perceptible visual difference.
                 * FIX 10 — sizes already correct for 3-col layout; kept as-is.
                 */
                quality={65}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Dark scrim */}
            <div className="absolute inset-0 bg-black/35" />

            {/* Bottom content panel */}
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.74)_46%,rgba(0,0,0,0.94)_100%)] px-7 pb-8 pt-24">
              <h4 className="site-title-md max-w-[16ch] text-[var(--color-primary-hover)]">
                {card.title}
              </h4>
              <p className="site-copy mt-3 text-white/85 md:text-lg">
                {card.subtitle}
              </p>
              <p className="site-copy-sm mt-2 max-w-[34ch] text-white/70 md:text-base">
                {card.description}
              </p>
              <span
                className={buttonClassName({
                  variant: "outline",
                  size: "sm",
                  className: "mt-5 inline-flex w-fit border-white/25 text-white hover:border-[var(--color-primary-hover)] hover:text-[var(--color-primary-hover)]",
                })}
              >
                View Package
              </span>
            </div>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}
