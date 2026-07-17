"use client";

import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { bookingEngineUrl, rooms, imageSet } from "@/lib/data";

const inclusions = [
  "Free Wi-Fi in all rooms",
  "Access to pool and common areas",
  "Private bathroom with hot water geyser",
  "Direct booking support via phone and email"
];

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function TariffPageClient() {
  return (
    <>
      <PageHero
        image={imageSet.lobby}
        eyebrow="Tariff"
        title="Room rates and stay inclusions"
        description="Explore current room tariffs, stay categories, and the included services available with each reservation."
        ctaHref={bookingEngineUrl}
        ctaLabel="Book Your Stay"
        secondaryHref="/rooms"
        secondaryLabel="View Rooms"
        priority
      />

      <section className="section-space">
        <div className="container-shell">
          <div className="mb-12 max-w-4xl">
            <p className="eyebrow">Rate Overview</p>
            <h2 className="display-title text-5xl">Tariffs tailored to room type and comfort level.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-ivory/68">
              Rates below are starting prices per night. Final pricing may vary by season, stay length,
              and booking format. Contact the team for custom quotes.
            </p>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-gold/16 bg-dark-2">
            <div className="grid grid-cols-[1.4fr_0.9fr_0.8fr_0.9fr] border-b border-gold/12 px-6 py-5 text-xs uppercase tracking-[0.3em] text-gold-light">
              <div>Room Category</div>
              <div>Size</div>
              <div>Guests</div>
              <div>From / Night</div>
            </div>
            {rooms.map((room) => (
              <div
                key={room.slug}
                className="grid grid-cols-[1.4fr_0.9fr_0.8fr_0.9fr] items-center gap-4 border-b border-gold/10 px-6 py-6 last:border-b-0"
              >
                <div>
                  <h3 className="font-display text-3xl">{room.name}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.28em] text-ivory/50">
                    {room.type} · {room.beds} · {room.view}
                  </p>
                </div>
                <div className="text-sm text-ivory/68">{room.size} sqft</div>
                <div className="text-sm text-ivory/68">{room.guests} guests</div>
                <div className="font-mono text-lg text-gold-light">{formatINR(room.price)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow">What&apos;s Included</p>
            <h2 className="display-title text-5xl">Every stay includes essential comforts for a smooth Goa experience.</h2>
            <div className="mt-8 space-y-4 text-lg leading-8 text-ivory/68">
              {inclusions.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
          <div className="rounded-[32px] border border-gold/16 bg-dark p-8">
            <div className="mb-6 font-display text-4xl">Booking Notes</div>
            <div className="space-y-4 text-sm leading-8 text-ivory/64">
              <p>Taxes are calculated at checkout.</p>
              <p>Flexible and prepaid plans may carry different cancellation windows.</p>
              <p>For extended stays or group reservations, our team can prepare a custom rate proposal.</p>
              <p>Check-in at 1:00 PM and check-out at 11:00 AM.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <LuxuryButton href="/contact" label="Request Custom Quote" />
              <LuxuryButton href={bookingEngineUrl} label="Reserve Now" variant="ghost" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
