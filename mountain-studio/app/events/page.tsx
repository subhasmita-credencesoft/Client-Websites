"use client";

import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { bookingEngineUrl, imageSet, studioGallery } from "@/lib/data";

const journeyChapters = [
  {
    chapter: "Chapter 01",
    title: "Arrival that feels like a destination reveal",
    description:
      "The approach into the estate sets the mood immediately, with greenery, open skies, and a mountain-facing calm that makes the celebration feel removed from the city."
  },
  {
    chapter: "Chapter 02",
    title: "Ceremonies framed by natural depth and light",
    description:
      "Morning rituals, couple portraits, and family moments all benefit from a softer natural backdrop that feels more cinematic than a standard venue setting."
  },
  {
    chapter: "Chapter 03",
    title: "Evenings that transition beautifully into celebration",
    description:
      "As the light changes, the estate holds its atmosphere with open-air elegance, making cocktails, receptions, and family gatherings feel connected to the landscape."
  }
];

const venueAdvantages = [
  {
    number: "01",
    title: "Scenic Mountain Surroundings",
    description:
      "Natural mountain views and open landscapes create a beautiful destination atmosphere for ceremonies, couple portraits, and wedding storytelling moments."
  },
  {
    number: "02",
    title: "Spacious Event Lawns",
    description:
      "Large lawns support Haldi, Mehendi, Sangeet, Cocktail Night, wedding ceremonies, and receptions with comfortable guest movement."
  },
  {
    number: "03",
    title: "Photography-Ready Backdrops",
    description:
      "The property layout gives scenic corners, natural greenery, and destination-style compositions for rituals, portraits, and celebration storytelling."
  },
  {
    number: "04",
    title: "Private Estate Feel",
    description:
      "Mountain Studio offers a private estate atmosphere that keeps the celebration focused on the family, the couple, and the shared experience of being together."
  }
];

const planningNotes = [
  {
    title: "Planning Note 01",
    heading: "Perfect for destination wedding photography",
    description:
      "The venue naturally supports couple shoots, family portraits, ceremony frames, and celebration coverage through greenery, open views, and scenic corners spread across the estate."
  },
  {
    title: "Planning Note 02",
    heading: "A calm venue setting with flexible celebration flow",
    description:
      "Mountain Studio's layout allows functions to move comfortably from guest arrival to rituals, ceremonies, cocktails, and receptions while preserving a private destination atmosphere."
  },
  {
    title: "Planning Note 03",
    heading: "Works beautifully across intimate and larger events",
    description:
      "Whether the celebration is intimate or larger in scale, the mountain-facing setting and open property planning help create a balanced and memorable event experience."
  },
  {
    title: "Planning Note 04",
    heading: "Natural beauty that strengthens the wedding mood",
    description:
      "The landscape itself becomes part of the celebration, giving events a softer, more cinematic destination feel instead of a closed indoor venue experience."
  }
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        image={imageSet.homeHero}
        eyebrow="Property Spaces"
        title="Explore the event-friendly sides of Redwings Studio"
        description="Browse the open areas, poolside setting, and property spaces used for private gatherings and stay-led events."
        ctaHref={bookingEngineUrl}
        ctaLabel="Check Venue Availability"
        secondaryHref="/contact"
        secondaryLabel="Contact The Team"
        priority
      />

      <section className="section-space">
        <div className="container-shell">
          <div className="mb-12 max-w-5xl">
            <p className="eyebrow">Home / Mountain View Destination</p>
            <h2 className="display-title text-5xl">A scenic destination venue designed for ceremonies, celebrations, and memorable family gatherings.</h2>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-ivory/68">
              Mountain Studio offers lush natural surroundings, valley views, open lawns,
              and a peaceful destination setting ideal for weddings, photography, rituals, and private event celebrations hosted in one estate.
            </p>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-ivory/68">
              Explore scenic event spaces, celebration flow, and booking-ready venue details crafted for destination weddings at
              Mountain Studio.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["7 Acres", "Private green estate"],
              ["Mountain Views", "Scenic ceremony backdrop"],
              ["Multi-Event", "From Haldi to Reception"],
              ["All In One", "Stay, venue, hospitality"]
            ].map(([title, body]) => (
              <article key={title} className="rounded-[28px] border border-gold/16 bg-dark-2 p-6">
                <h3 className="font-display text-4xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-ivory/64">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell">
          <div className="mb-10 max-w-4xl">
            <p className="eyebrow">Private Event Spaces</p>
            <h2 className="display-title text-5xl">Explore venue spaces shaped for different celebration moods.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {[
              {
                title: "Wedding Lawns",
                href: "/events/wedding-lawns",
                image: "/mountain-studio/event-card-02.jpeg",
                text: "Open green lawns designed for ceremonies, sangeet, mehendi, and grand wedding celebrations."
              },
              {
                title: "Poolside Celebrations",
                href: "/events/poolside-celebrations",
                image: "/mountain-studio/event-card-01.jpeg",
                text: "Poolside zones for cocktails, music nights, and relaxed celebration moments."
              }
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group overflow-hidden rounded-[30px] border border-gold/16 bg-dark"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-4xl">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-ivory/64">{item.text}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Signature Venue Story</p>
            <h2 className="display-title text-5xl">Designed for premium destination celebrations.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/68">
              From scenic ceremonies to open-air receptions, Mountain Studio gives couples and families a venue backdrop
              that feels private, natural, and celebration-ready throughout the full event journey.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LuxuryButton href={bookingEngineUrl} label="Check Venue Availability" />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[32px]">
            <Image src={imageSet.exterior} alt="Mountain landscape view" width={1200} height={900} className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-[32px] border border-gold/16 bg-dark-2 p-8">
            <p className="eyebrow">Booking Direction</p>
            <h2 className="font-display text-4xl">A venue page should help families understand how the celebration can actually work.</h2>
            <p className="mt-6 text-base leading-8 text-ivory/64">
              From scenic ceremony settings to guest movement and event sequencing, this venue section is shaped to support enquiry decisions, not just browsing.
            </p>
          </div>
          <div className="space-y-4 text-lg leading-8 text-ivory/68">
            <p>7 acres of lush green natural landscape</p>
            <p>Beautiful mountain and valley-facing views</p>
            <p>Large lawns for wedding functions and rituals</p>
            <p>Scenic photography and videography settings</p>
          </div>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell">
          <div className="mb-10 max-w-4xl">
            <p className="eyebrow">Celebration Journey</p>
            <h2 className="display-title text-5xl">How this venue experience unfolds across the wedding.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-ivory/68">
              Discover how each venue space supports ceremonies, guest movement, and the overall celebration journey across the estate.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {journeyChapters.map((item) => (
              <article key={item.chapter} className="rounded-[28px] border border-gold/16 bg-dark p-6">
                <div className="font-mono text-sm tracking-[0.3em] text-gold-light">{item.chapter}</div>
                <h3 className="mt-4 font-display text-3xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ivory/64">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <div className="mb-10 max-w-4xl">
            <p className="eyebrow">Venue Advantages</p>
            <h2 className="display-title text-5xl">7 acres of green landscape, scenic mountain surroundings, and a destination wedding backdrop crafted for unforgettable celebrations.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {venueAdvantages.map((item) => (
              <article key={item.number} className="rounded-[28px] border border-gold/16 bg-dark-2 p-6 sm:p-8">
                <div className="font-mono text-sm tracking-[0.3em] text-gold-light">{item.number}</div>
                <h3 className="mt-4 font-display text-4xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ivory/64">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow">Editorial Perspective</p>
            <h2 className="display-title text-5xl">Where celebrations unfold against the calm of the mountains.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/68">
              This venue is especially suited for families who want scenery, privacy, and shared celebration flow in one place instead of moving guests between disconnected locations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Scenic ceremonies", "Portrait-ready corners", "Private-estate feel", "Natural wedding mood"].map((item) => (
                <span key={item} className="rounded-full border border-gold/18 px-4 py-3 text-xs uppercase tracking-[0.28em] text-gold-light">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[32px]">
            <Image src={imageSet.ballroom} alt="Mountain venue perspective" width={1200} height={900} className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <div className="mb-10 max-w-4xl">
            <p className="eyebrow">Venue Gallery</p>
            <h2 className="display-title text-5xl">Venue imagery, scenic corners, and event-ready details help planners and families understand how the celebration can flow across the property.</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {studioGallery.slice(8, 14).map((item, index) => (
              <div
                key={item.title}
                className={`relative overflow-hidden rounded-[28px] ${index === 0 ? "md:col-span-2 min-h-[420px]" : "min-h-[240px]"}`}
              >
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-4xl text-lg leading-8 text-ivory/68">
            From scenic ceremonies to open-air receptions, Mountain Studio gives couples and families a venue backdrop that feels private,
            natural, and celebration-ready throughout the full event journey.
          </p>

          <div className="mt-8">
            <LuxuryButton href={bookingEngineUrl} label="Check Venue Availability" />
          </div>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell">
          <div className="mb-10 max-w-4xl">
            <p className="eyebrow">Planning Notes</p>
            <h2 className="display-title text-5xl">Venue details that support a smoother celebration.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {planningNotes.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-gold/16 bg-dark p-6 sm:p-8">
                <div className="font-mono text-sm tracking-[0.3em] text-gold-light">{item.title}</div>
                <h3 className="mt-4 font-display text-3xl">{item.heading}</h3>
                <p className="mt-4 text-sm leading-7 text-ivory/64">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell text-center">
          <p className="eyebrow">A destination setting that elevates every celebration</p>
          <div className="mt-8 flex justify-center">
            <LuxuryButton href="/contact" label="Plan Your Wedding" />
          </div>
        </div>
      </section>
    </>
  );
}


