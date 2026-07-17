"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { RoomCard } from "@/components/sections/RoomCard";
import { rooms, imageSet } from "@/lib/data";
import { cn } from "@/lib/utils";

const filters = ["All", "Budget Room", "Standard Room", "Superior Room", "Pool Access Room", "Pool View Room"] as const;
const sorts = ["Size", "Rating", "Price"] as const;

export function RoomsPageClient() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [sortBy, setSortBy] = useState<(typeof sorts)[number]>("Size");

  const filtered = useMemo(() => {
    let next = filter === "All" ? rooms : rooms.filter((room) => room.type === filter);
    next = [...next].sort((a, b) => {
      if (sortBy === "Size") return b.size - a.size;
      if (sortBy === "Price") return a.price - b.price;
      return b.rating - a.rating;
    });
    return next;
  }, [filter, sortBy]);

  return (
    <>
      <PageHero
        image={imageSet.lobby}
        eyebrow="Rooms & Suites"
        title="Find Your Perfect Room in Goa"
        description="From budget-friendly stays to pool-view retreats — 5 room types designed for every kind of Goa getaway."
        priority
      />

      <section className="section-space">
        <div className="container-shell">
          {/* Header */}
          <div className="mb-12 max-w-3xl">
            <p className="eyebrow">Our Rooms</p>
            <h2 className="display-title text-5xl">Every room at Redwings Studio is owner-managed and guest-ready.</h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ivory/55">
              Choose from budget doubles to premium pool-view rooms. All rooms include Wi-Fi, TV, room service, and direct booking support.
            </p>
          </div>

          {/* Filters bar */}
          <div className="flex flex-col gap-5 rounded-[28px] border border-gold/12 bg-dark-2 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter rooms">
              {filters.map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  aria-pressed={item === filter}
                  className={cn(
                    "rounded-full px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] transition",
                    item === filter
                      ? "bg-gold text-dark"
                      : "border border-gold/15 text-ivory/55 hover:border-gold/40 hover:text-ivory"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-3 rounded-full border border-gold/15 bg-dark-3 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-ivory/50">
              Sort
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as (typeof sorts)[number])}
                  className="appearance-none bg-transparent pr-5 text-xs text-gold"
                  aria-label="Sort rooms"
                >
                  {sorts.map((item) => (
                    <option key={item} value={item} className="bg-dark text-ivory">{item}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gold/60" size={13} />
              </div>
            </label>
          </div>

          {/* Results count */}
          <p className="mt-6 text-sm text-ivory/55">
            Showing {filtered.length} room{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Room grid */}
          <div className="mt-8 grid gap-7 lg:grid-cols-2">
            {filtered.map((room) => (
              <RoomCard key={room.slug} room={room} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-20 text-center">
              <p className="font-display text-3xl text-ivory/55">No rooms match this filter</p>
              <button onClick={() => setFilter("All")} className="mt-4 text-sm text-gold hover:text-gold-light">
                View all rooms
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
