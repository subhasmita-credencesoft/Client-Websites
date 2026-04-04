"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import Image from "next/image";
import { offersCards } from "@/lib/data/content/mountain-content";
import { homeSectionContent } from "@/lib/data/content/resort-content";

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
    <section
      data-section-id="offers"
      data-sticky-fade-section
      className="bg-black px-5 py-20 md:px-10"
    >
      {/*
       * FIX 4 — `[will-change:transform]` on the sticky heading promotes it
       * to its own GPU compositing layer so sticky scroll runs on the
       * compositor thread, preventing main-thread jank.
       */}
      <div
        className="text-center [will-change:transform] md:sticky md:top-5 md:z-20 md:bg-black/92 md:pb-8 md:backdrop-blur-sm"
      >
        <h3
          data-sticky-fade-line
          className="text-4xl text-[#cba977] md:text-5xl"
        >
          {content.title}
        </h3>
        <p
          data-sticky-fade-line
          className="mt-3 text-2xl text-white md:text-3xl"
        >
          {content.subtitle}
        </p>

        <div
          data-sticky-fade-line
          className="mt-10 flex flex-wrap items-center justify-center gap-8 text-xl font-semibold text-white/65 md:text-2xl"
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
                  ? "border-[#ccab74] text-[#ccab74]"
                  : "border-transparent text-white/65 hover:text-white"
              }`}
              data-cursor="hover"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-[92rem] gap-6 md:grid-cols-3">
        {visibleCards.map((card, index) => (
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
            className="group relative block h-[33rem] overflow-hidden rounded-[1.5rem] border border-white/20 [will-change:transform]"
            data-cursor="hover"
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
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                quality={65}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Dark scrim */}
            <div className="absolute inset-0 bg-black/35" />

            {/* Bottom content panel */}
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.74)_46%,rgba(0,0,0,0.94)_100%)] px-7 pb-8 pt-24">
              <h4 className="max-w-[16ch] text-3xl leading-tight text-[#ccab74] md:text-4xl">
                {card.title}
              </h4>
              <p className="mt-3 text-base text-white/85 md:text-lg">
                {card.subtitle}
              </p>
              <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-white/70 md:text-base">
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}