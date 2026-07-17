"use client";

import Image from "next/image";
import { useState } from "react";
import { MapPin, Clock, Navigation, ChevronDown } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { bookingEngineUrl, imageSet } from "@/lib/data";
import { cn } from "@/lib/utils";

interface Attraction {
  name: string;
  distance: string;
  driveTime: string;
  category: string;
  description: string;
  image: string;
  slug: string;
}

interface NearbyAttractionsPageClientProps {
  attractions: Attraction[];
}

const categories = ["All", "Beach", "Heritage", "Market", "Nightlife", "Scenic", "Nature"] as const;

export function NearbyAttractionsPageClient({ attractions }: NearbyAttractionsPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? attractions
    : attractions.filter((a) => a.category === activeCategory);

  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600&h=900&fit=crop"
        eyebrow="Explore Goa"
        title="Nearby Attractions & Tourist Places"
        description="Discover the best beaches, heritage sites, markets, and scenic spots near Redwings Studio, Arpora, North Goa."
        priority
      />

      {/* Quick Stats */}
      <section className="section-space">
        <div className="container-shell">
          <div className="mb-12 max-w-4xl">
            <p className="eyebrow">What&apos;s Nearby</p>
            <h2 className="display-title text-5xl">Redwings Studio is perfectly positioned in Arpora, North Goa.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-ivory/68">
              From world-famous beaches and historic forts to vibrant markets and scenic routes, everything in Goa is just a short drive away.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "01", title: "5 min", body: "Saturday Night Market, Arpora" },
              { icon: "02", title: "10 min", body: "Baga Beach & Tito's Lane" },
              { icon: "03", title: "15 min", body: "Calangute & Anjuna Beach" },
              { icon: "04", title: "20 min", body: "Fort Aguada & Chapora Fort" },
            ].map((item) => (
              <article key={item.title} className="rounded-[28px] border border-gold/16 bg-dark-2 p-6">
                <div className="font-mono text-sm tracking-[0.3em] text-gold-light">{item.icon}</div>
                <div className="mt-4 font-display text-4xl text-gold-light">{item.title}</div>
                <p className="mt-3 text-sm leading-7 text-ivory/64">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter + Attractions Grid */}
      <section className="section-space bg-dark-2">
        <div className="container-shell">
          <div className="mb-10 flex flex-wrap gap-3" role="group" aria-label="Filter attractions by category">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={cat === activeCategory}
                className={cn(
                  "rounded-full border px-4 py-3 text-xs uppercase tracking-[0.3em] transition",
                  cat === activeCategory
                    ? "border-gold bg-gold text-dark"
                    : "border-gold/20 bg-dark text-ivory/65 hover:border-gold hover:text-gold"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {filtered.map((attraction, index) => (
              <article
                key={attraction.slug}
                className="group overflow-hidden rounded-[30px] border border-gold/16 bg-dark transition duration-500 hover:-translate-y-1 hover:shadow-glow"
                style={{ animation: `fadeup 0.8s ${index * 0.08}s both` }}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={attraction.image}
                    alt={`${attraction.name} — Tourist attraction near Redwings Studio Goa`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-gold/30 bg-dark/60 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-gold-light">
                    {attraction.category}
                  </div>
                  <div className="absolute right-5 top-5 rounded-full border border-gold/30 bg-dark/60 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-ivory/80">
                    {attraction.distance}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-3xl">{attraction.name}</h3>
                  <div className="mt-3 flex items-center gap-4 text-xs uppercase tracking-[0.24em] text-ivory/50">
                    <span className="flex items-center gap-1.5">
                      <Navigation size={12} className="text-gold" />
                      {attraction.distance} from property
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className="text-gold" />
                      {attraction.driveTime} drive
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-ivory/64">{attraction.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Getting Around</p>
            <h2 className="display-title text-5xl">Easy ways to explore Goa from Redwings Studio.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ivory/68">
              The property team can help arrange transport, suggest routes, and plan day trips to make the most of your Goa stay.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LuxuryButton href={bookingEngineUrl} label="Book Your Stay" />
              <LuxuryButton href="/contact" label="Plan Day Trips" variant="ghost" className="border-gold/55" />
            </div>
          </div>
          <div className="grid gap-5">
            {[
              { title: "Scooter & Bike Rentals", text: "The most popular and flexible way to explore Goa at your own pace. Available locally in Arpora." },
              { title: "Private Car with Driver", text: "Hire a car for full-day sightseeing across North and South Goa. Arrange through the concierge." },
              { title: "Auto-Rickshaws", text: "Available for short trips to nearby beaches, markets, and restaurants." },
              { title: "Airport Transfers", text: "Dabolim Airport is 40 km away. Mopa Airport is 30 km. Pre-arranged transfers available." },
            ].map((item) => (
              <article key={item.title} className="rounded-[24px] border border-gold/16 bg-dark-2 p-6">
                <h3 className="font-display text-2xl text-ivory">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ivory/64">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-space bg-dark-2">
        <div className="container-shell text-center">
          <p className="eyebrow">Plan Your Goa Trip</p>
          <h2 className="display-title mx-auto max-w-4xl text-balance">
            Stay at Redwings Studio and explore the best of Goa, just minutes from your door.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ivory/68">
            From beaches and forts to markets and waterfalls, every day in Goa brings something new.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <LuxuryButton href={bookingEngineUrl} label="Check Availability" className="px-8 py-4" />
            <LuxuryButton href="/contact" label="Contact The Team" variant="ghost" className="border-gold/55 px-8 py-4" />
          </div>
        </div>
      </section>
    </>
  );
}
