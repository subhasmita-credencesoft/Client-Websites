"use client";

import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { bookingEngineUrl, imageSet } from "@/lib/data";

export default function WeddingLawnsPage() {
  return (
    <>
      <PageHero
        image={imageSet.ballroom}
        eyebrow="Wedding Lawns"
        title="Open Lawn Spaces"
        description="Open lawn areas suitable for private functions, casual gatherings, and event-led property use."
        ctaHref={bookingEngineUrl}
        ctaLabel="Check Venue Availability"
        secondaryHref="/contact"
        secondaryLabel="Contact The Team"
        priority
      />

      <section className="section-space">
        <div className="container-shell">
          <div className="mb-12 max-w-5xl">
            <p className="eyebrow">Home / Wedding Lawns</p>
            <h2 className="display-title text-5xl">Spacious lawns for destination wedding functions.</h2>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-ivory/68">
              Mountain Studio's wedding lawns provide open-air space for traditional rituals, wedding ceremonies,
              and festive celebrations with scenic mountain surroundings and full-estate character.
            </p>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-ivory/68">
              Explore scenic event spaces, celebration flow, and booking-ready venue details crafted for destination weddings
              at Mountain Studio.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:grid-rows-2">
            {[imageSet.ballroom, imageSet.exterior, imageSet.homeHero, imageSet.lobby].map((image, index) => (
              <div
                key={`${image}-${index}`}
                className={`relative overflow-hidden rounded-[28px] ${index === 0 ? "md:row-span-2 min-h-[420px]" : "min-h-[200px]"}`}
              >
                <Image src={image} alt="Wedding lawns" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <p className="eyebrow">Editorial Perspective</p>
            <h2 className="display-title text-5xl">A wedding lawn designed for ceremony emotion and reception scale.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/68">
              The open lawns allow ceremonies and celebrations to feel expansive, scenic, and natural while still supporting
              structured event planning, guest movement, and strong visual storytelling throughout the wedding.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LuxuryButton href={bookingEngineUrl} label="Check Venue Availability" />
              <LuxuryButton href="/contact" label="Plan Your Wedding" variant="ghost" />
            </div>
          </div>
          <div className="rounded-[32px] border border-gold/16 bg-dark p-8">
            <div className="space-y-4 text-sm leading-8 text-ivory/64">
              <p>Perfect for Haldi, Mehendi, wedding ceremonies, Sangeet, and receptions.</p>
              <p>Supports larger guest flow while preserving a destination wedding atmosphere.</p>
              <p>Works beautifully for both emotional rituals and celebration-scale functions.</p>
              <p>Pairs naturally with scenic photography, family gatherings, and multi-function hosting.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


