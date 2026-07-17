import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { activities, bookingEngineUrl, imageSet } from "@/lib/data";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Activities at Redwings Studio Goa — Nature Walks, Wellness & Tours",
  description: "Explore leisure activities at Redwings Studio, Goa — sunrise nature walks, wellness by water, valley tours, chef-led market walks, and resort art trails during your stay.",
  alternates: { canonical: "https://redwingsstudio.com/activities" },
  openGraph: {
    title: "Activities at Redwings Studio Goa",
    description: "Sunrise nature walks, wellness sessions, valley tours, and more during your Goa stay.",
    images: [{ url: "/mountain-studio/hero-main.jpeg", width: 1200, height: 630, alt: "Activities at Redwings Studio Goa" }],
  },
  twitter: { card: "summary_large_image", title: "Activities — Redwings Studio Goa", description: "Sunrise nature walks, wellness sessions, valley tours, and more.", images: ["/mountain-studio/hero-main.jpeg"] },
};

export default function ActivitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Activities", url: `${SITE_URL}/activities` }])) }}
      />
      <PageHero
        image={imageSet.homeHero}
        eyebrow="Activities"
        title="Easy leisure moments beyond your room."
        description="Explore downtime, local movement, and simple on-property experiences that make a Goa stay feel fuller."
        priority
      />

      <section className="section-space">
        <div className="container-shell">
          <div className="mb-12 max-w-3xl">
            <p className="eyebrow">Resort Signatures</p>
            <h2 className="display-title text-5xl">Each activity is styled with the same attention as the hotel itself.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {activities.map((activity, index) => (
              <article
                key={activity.title}
                className="group overflow-hidden rounded-[30px] border border-gold/16 bg-dark-2 transition duration-500 hover:-translate-y-1 hover:shadow-glow"
                style={{ animation: `fadeup 0.8s ${index * 0.08}s both` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={activity.image} alt={activity.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/25 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-gold/30 bg-dark/60 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-gold-light">
                    {activity.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-4xl">{activity.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-ivory/64">{activity.description}</p>
                  <LuxuryButton href={bookingEngineUrl} label="Reserve Experience" className="mt-6" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Private Planning</p>
            <h2 className="display-title text-5xl">Let concierge shape a full day, weekend, or celebration itinerary.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ivory/68">
              From proposals and anniversaries to executive retreats, our team can combine multiple experiences into one flowing schedule.
            </p>
          </div>
          <form className="rounded-[32px] border border-gold/16 bg-dark p-6 sm:p-8">
            {["Name", "Email", "Preferred Date", "Experience Type"].map((field) => (
              <label key={field} className="mb-5 block">
                <span className="mb-3 block text-xs uppercase tracking-[0.28em] text-gold-light">{field}</span>
                <input className="w-full rounded-2xl border border-gold/16 bg-dark-2 px-4 py-4" />
              </label>
            ))}
            <button className="rounded-full bg-gold px-6 py-4 text-xs uppercase tracking-[0.3em] text-dark">Request Planning</button>
          </form>
        </div>
      </section>
    </>
  );
}
