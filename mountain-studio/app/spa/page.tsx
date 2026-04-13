"use client";

import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { bookingEngineUrl, treatments, imageSet } from "@/lib/data";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export default function SpaPage() {
  return (
    <>
      <PageHero
        image={imageSet.spa}
        eyebrow="Spa"
        title="Wellness designed as a sequence of soft, restorative scenes."
        description="Thermal journeys, bespoke treatments, and signature rituals unfold in a misted atmosphere of calm."
        priority
      />

      <section className="section-space text-center">
        <div className="container-shell max-w-4xl">
          <p className="font-display text-4xl italic text-gold-light sm:text-5xl">
            “Care begins with slowing the room, the breath, and the nervous system.”
          </p>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell">
          <h2 className="display-title text-5xl">Treatments</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {treatments.map((treatment) => (
              <article key={treatment.name} className="group relative overflow-hidden rounded-[28px] border border-gold/16">
                <Image src={treatment.image} alt={treatment.name} width={900} height={1100} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
                <div className="absolute inset-x-6 bottom-6">
                  <h3 className="font-display text-4xl">{treatment.name}</h3>
                  <p className="mt-3 text-sm uppercase tracking-[0.28em] text-gold-light">{treatment.duration} · {treatment.price}</p>
                  <p className="mt-4 text-sm leading-7 text-ivory/72">{treatment.description}</p>
                  <LuxuryButton href={bookingEngineUrl} label="Book Treatment" className="mt-5" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <h2 className="display-title text-5xl">Facilities</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {["Sauna", "Steam", "Plunge Pool", "Relaxation Room"].map((item) => (
              <div key={item} className="rounded-[28px] border border-gold/16 bg-dark-2 p-8">
                <div className="mb-6 h-14 w-14 rounded-full border border-gold/28 bg-gold/10" />
                <h3 className="font-display text-3xl">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell">
          <p className="eyebrow">Signature Ritual</p>
          <h2 className="display-title text-5xl">Five steps through water, breath, heat, touch, and stillness.</h2>
          <div className="mt-10 flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
            {["Arrival Tea", "Thermal Circuit", "Tailored Treatment", "Sound Reset", "Quiet Lounge"].map((step, index) => (
              <div key={step} className="min-w-[260px] rounded-[28px] border border-gold/16 bg-dark p-6">
                <div className="font-mono text-sm tracking-[0.3em] text-gold-light">0{index + 1}</div>
                <h3 className="mt-4 font-display text-4xl">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Spa Booking</p>
            <h2 className="display-title text-5xl">Reserve your treatment in a few quiet steps.</h2>
          </div>
          <form className="rounded-[32px] border border-gold/16 bg-dark-2 p-6 sm:p-8">
            {["Date", "Time", "Treatment", "Name", "Email"].map((field) => (
              <label key={field} className="mb-5 block">
                <span className="mb-3 block text-xs uppercase tracking-[0.28em] text-gold-light">{field}</span>
                <input className="w-full rounded-2xl border border-gold/16 bg-dark px-4 py-4" />
              </label>
            ))}
            <button className="rounded-full bg-gold px-6 py-4 text-xs uppercase tracking-[0.3em] text-dark">Book Treatment</button>
          </form>
        </div>
      </section>
    </>
  );
}
