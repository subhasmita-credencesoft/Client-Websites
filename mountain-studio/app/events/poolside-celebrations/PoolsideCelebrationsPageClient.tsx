"use client";

import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { bookingEngineUrl, imageSet } from "@/lib/data";

export function PoolsideCelebrationsPageClient() {
  return (
    <>
      <PageHero
        image={imageSet.pool}
        eyebrow="Poolside Celebrations"
        title="Poolside Gathering Space"
        description="A poolside zone suited to music nights, private get-togethers, and relaxed celebration moments."
        ctaHref={bookingEngineUrl}
        ctaLabel="Check Venue Availability"
        secondaryHref="/contact"
        secondaryLabel="Contact The Team"
        priority
      />

      <section className="section-space">
        <div className="container-shell">
          <div className="mb-12 max-w-5xl">
            <p className="eyebrow">Poolside Celebrations</p>
            <h2 className="display-title text-5xl">A relaxed poolside setting for wedding festivities.</h2>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-ivory/68">
              The poolside area creates a festive yet relaxed zone for cocktail evenings, music gatherings,
              rain-dance energy, and celebration moments with a destination feel.
            </p>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-ivory/68">
              Explore scenic event spaces, celebration flow, and booking-ready venue details crafted for destination weddings
              at Redwings Studio.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:grid-rows-2">
            {[imageSet.pool, imageSet.homeHero, imageSet.exterior, imageSet.ballroom].map((image, index) => (
              <div
                key={`${image}-${index}`}
                className={`relative overflow-hidden rounded-[28px] ${index === 0 ? "md:row-span-2 min-h-[420px]" : "min-h-[200px]"}`}
              >
                <Image src={image} alt="Poolside celebrations" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <p className="eyebrow">Editorial Perspective</p>
            <h2 className="display-title text-5xl">Poolside celebrations that feel festive, relaxed, and unmistakably destination-led.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/68">
              This setting works especially well for cocktail nights, music-led gatherings, and informal celebration moments
              that need atmosphere, flexibility, and a destination mood without losing event clarity.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LuxuryButton href={bookingEngineUrl} label="Check Venue Availability" />
              <LuxuryButton href="/contact" label="Plan Your Wedding" variant="ghost" />
            </div>
          </div>
          <div className="rounded-[32px] border border-gold/16 bg-dark p-8">
            <div className="space-y-4 text-sm leading-8 text-ivory/64">
              <p>Ideal for cocktails, music nights, family gatherings, and relaxed wedding moments.</p>
              <p>Supports festive energy with an open, destination-style visual setting.</p>
              <p>Pairs naturally with evening celebrations, candid photography, and guest interaction.</p>
              <p>Balances fun, movement, and wedding atmosphere in one celebration zone.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
