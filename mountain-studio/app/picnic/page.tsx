"use client";

import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { bookingEngineUrl, imageSet, picnicPackages } from "@/lib/data";

const familyMoments = [
  "Treasure hunts, storytelling corners, and supervised lawn games for younger guests.",
  "Chef-curated kids picnic boxes with fresh juices, pastries, and playful dessert finishes.",
  "Family-friendly seating clusters so adults can relax while children stay engaged nearby."
];

const corporateMoments = [
  "Leadership off-sites with styled brunch setups, breakout lawns, and concierge-managed pacing.",
  "Client hosting with premium bar service, branded details, and sunset networking moments.",
  "Team celebrations that blend open-air dining, music, and activity-led engagement."
];

const sampleFlow = [
  {
    title: "Arrival Styling",
    text: "Soft drapery, layered table textures, florals, and curated music set the tone before guests arrive."
  },
  {
    title: "Seasonal Dining",
    text: "Chef-led menus are paced for the occasion, from light family lunches to elevated corporate grazing boards."
  },
  {
    title: "Experience Layering",
    text: "We can add lawn games, live music, kids programming, photographers, or a sunset toast to complete the scene."
  },
  {
    title: "Golden Hour Finish",
    text: "Every picnic is timed to land beautifully, whether the mood is family-led, romantic, or designed for a corporate group."
  }
];

export default function PicnicPage() {
  return (
    <>
      <PageHero
        image={imageSet.exterior}
        eyebrow="Picnic Experiences"
        title="Open-air moments for families and groups"
        description="From daytime picnics to casual private gatherings, Redwings Studio supports outdoor moments with a relaxed Goa-resort feel."
        ctaHref={bookingEngineUrl}
        ctaLabel="Reserve Picnic"
        secondaryHref="/contact"
        secondaryLabel="Plan a Custom Event"
        priority
      />

      <section className="section-space">
        <div className="container-shell">
          <div className="mb-12 max-w-4xl">
            <p className="eyebrow">Signature Formats</p>
            <h2 className="display-title text-5xl">Three picnic formats, each shaped around a different kind of memory.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-ivory/68">
              Whether you are planning a relaxed family afternoon, a children-first celebration, or a refined open-air corporate gathering, we build the atmosphere around the pace and purpose of the event.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {picnicPackages.map((pkg, index) => (
              <article
                key={pkg.title}
                className="group overflow-hidden rounded-[30px] border border-gold/16 bg-dark-2"
                style={{ animation: `fadeup 0.8s ${index * 0.1}s both` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
                </div>
                <div className="p-6">
                  <p className="eyebrow mb-3">{pkg.subtitle}</p>
                  <h2 className="font-display text-4xl">{pkg.title}</h2>
                  <div className="mt-5 space-y-3 text-sm leading-7 text-ivory/64">
                    {pkg.inclusions.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                  <LuxuryButton href={bookingEngineUrl} label="Reserve Picnic" className="mt-6" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[32px]">
            <Image
              src={imageSet.pool}
              alt="Family picnic experience"
              width={1100}
              height={1200}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Family & Kids Zone</p>
            <h2 className="display-title text-5xl">A children-friendly picnic experience that still feels beautifully elevated.</h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-ivory/68">
              {familyMoments.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
            <div className="mt-8">
              <LuxuryButton href="/contact" label="Plan Family Picnic" variant="outline" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="eyebrow">Corporate Lawn Events</p>
            <h2 className="display-title text-5xl">Open-air corporate hosting with polish, comfort, and strong event flow.</h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-ivory/68">
              {corporateMoments.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-gold/18 px-4 py-3 text-xs uppercase tracking-[0.28em] text-gold-light">Brand-led styling</span>
              <span className="rounded-full border border-gold/18 px-4 py-3 text-xs uppercase tracking-[0.28em] text-gold-light">Outdoor networking flow</span>
              <span className="rounded-full border border-gold/18 px-4 py-3 text-xs uppercase tracking-[0.28em] text-gold-light">Concierge event support</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[32px]">
            <Image
              src={imageSet.ballroom}
              alt="Corporate picnic setup"
              width={1100}
              height={900}
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell">
          <div className="mb-10 max-w-4xl">
            <p className="eyebrow">Experience Flow</p>
            <h2 className="display-title text-5xl">How a Redwings Studio picnic unfolds from setup to golden hour.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {sampleFlow.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[28px] border border-gold/16 bg-dark p-6"
                style={{ animation: `fadeup 0.75s ${index * 0.08}s both` }}
              >
                <div className="font-mono text-sm tracking-[0.3em] text-gold-light">0{index + 1}</div>
                <h3 className="mt-4 font-display text-3xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ivory/64">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="grid gap-5">
            {[
              ["Location", " Goa"],
              ["Ideal For", "Family outings, birthday groups, and company day events"],
              ["Support", "Food, seating, timing, and setup planning through the team"],
              ["Booking", "Direct call or email support instead of a long request form"]
            ].map(([title, text]) => (
              <article key={title} className="rounded-[32px] border border-gold/16 bg-dark-2 p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.28em] text-gold-light">{title}</p>
                <p className="mt-4 text-lg leading-8 text-ivory/68">{text}</p>
              </article>
            ))}
          </div>
          <div>
            <p className="eyebrow">Tailored Planning</p>
            <h2 className="display-title text-5xl">Need a picnic built around children, family celebration, or corporate hosting?</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/68">
              We can tailor menus, kids activities, event styling, branded touches, photographers, music, and timing. The result feels relaxed for guests and highly organized behind the scenes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LuxuryButton href="/contact" label="Speak to Concierge" />
              <LuxuryButton href="/corporate-events" label="Corporate Events" variant="ghost" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

