"use client";

import { PageHero } from "@/components/sections/PageHero";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { bookingEngineUrl, imageSet } from "@/lib/data";

const offerSections = [
  {
    label: "Direct Booking Benefit",
    title: "Book Direct With The Redwings Team",
    description:
      "Call or email the Redwings Studio team directly for clearer availability, better coordination, and simpler planning before you confirm your stay.",
    points: [
      "Direct phone and email support",
      "Faster room-count confirmation",
      "Clear check-in and check-out guidance",
      "Help with group and multi-room planning"
    ]
  },
  {
    label: "Group Stay Support",
    title: "Best Suited For Family And Group Stays",
    description:
      "With 10 rooms under the Redwings banner, the property works well for families, friend groups, and small private bookings that want to stay close together.",
    points: [
      "10 rooms available under one banner",
      "Useful for couples, families, and friend groups",
      "Simple occupancy planning before arrival",
      "Direct coordination for multi-room stays"
    ]
  },
  {
    label: "Longer Stay Planning",
    title: "Better Value On Planned Stays",
    description:
      "If you are planning a longer Goa stay, a repeat stay, or a more organized multi-room booking, the team can guide you toward the most practical booking format.",
    points: [
      "Useful for planned weekend and midweek stays",
      "Suitable for longer-stay enquiries",
      "Support for repeat guest planning",
      "Flexible booking discussion before confirmation"
    ]
  },
  {
    label: "Property Advantage",
    title: "A Stay Format Built Around Clarity",
    description:
      "The Redwings Studio website is designed to make booking easier: property visuals, room details, contact information, and stay guidance are all available before you enquire.",
    points: [
      "View rooms before booking",
      "See property images across the site",
      "Access full contact details in one place",
      "Review stay timing and occupancy clearly"
    ]
  }
];

const bookingBenefits = [
  {
    title: "Check-In Simplicity",
    text: "Clear timing keeps arrival planning straightforward: check-in at 1:00 PM and check-out at 11:00 AM."
  },
  {
    title: "Direct Human Support",
    text: "Instead of complicated package forms, guests can speak directly with the Redwings Studio team for actual booking help."
  },
  {
    title: "Goa Stay Relevance",
    text: "This page now reflects the real property model: studio apartment stays in Goa."
  }
];

export default function OffersPage() {
  return (
    <>
      <PageHero
        image={imageSet.exterior}
        eyebrow="Offers And Booking Benefits"
        title="Stay offers that match Redwings Studio"
        description="Explore the booking advantages, direct-support benefits, and stay-planning formats that fit Redwings Studio in Goa."
        ctaHref={bookingEngineUrl}
        ctaLabel="Check Availability"
        secondaryHref="/contact"
        secondaryLabel="Contact The Team"
        priority
      />

      <section className="section-space">
        <div className="container-shell">
          <div className="mb-12 max-w-4xl">
            <p className="eyebrow">Offers Overview</p>
            <h2 className="display-title text-5xl">A better fit for this website: direct booking value, group planning, and stay clarity.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-ivory/68">
              Redwings Studio is not a destination wedding package site. This page is now aligned with how the property actually works:
              owner-managed room inventory, direct contact support, and practical Goa stay planning.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {offerSections.map((item) => (
              <article key={item.title} className="rounded-[32px] border border-gold/16 bg-dark-2 p-6 sm:p-8">
                <div className="eyebrow">{item.label}</div>
                <h3 className="display-title text-4xl sm:text-5xl">{item.title}</h3>
                <p className="mt-5 max-w-3xl text-base leading-8 text-ivory/68 sm:text-lg">{item.description}</p>

                <div className="mt-8 grid gap-3">
                  {item.points.map((line) => (
                    <div key={line} className="rounded-[20px] border border-gold/12 bg-dark p-4 text-sm leading-7 text-ivory/66">
                      {line}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Why It Fits</p>
            <h2 className="display-title text-5xl">Why these offers make more sense for Redwings Studio.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/68">
              The property is best represented through stay benefits and booking guidance, not old venue packages.
              Guests need room clarity, occupancy information, property visuals, and direct support that actually reflects the Goa stay model.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LuxuryButton href={bookingEngineUrl} label="Check Availability" />
              <LuxuryButton href="/contact" label="Contact The Team" variant="ghost" />
            </div>
          </div>

          <div className="grid gap-5">
            {bookingBenefits.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-gold/16 bg-dark p-6">
                <h3 className="font-display text-3xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ivory/64">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell text-center">
          <p className="eyebrow">Direct Booking Support</p>
          <h2 className="display-title mx-auto max-w-4xl text-balance">
            For the most accurate offer, room count, and stay plan, contact the Redwings Studio team directly.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ivory/68">
            This gives guests the clearest route to availability, booking assistance, and room planning before arrival in Goa.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <LuxuryButton href="/contact" label="Contact The Team" className="px-8 py-4" />
            <LuxuryButton href="/rooms" label="View Rooms" variant="ghost" className="border-gold/55 px-8 py-4" />
          </div>
        </div>
      </section>
    </>
  );
}
