"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { RoomCard } from "@/components/sections/RoomCard";
import { rooms, imageSet } from "@/lib/data";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { cn } from "@/lib/utils";

const filters = ["All", "Budget Room", "Standard Room", "Superior Room", "Pool Access Room", "Pool View Room"] as const;
const sorts = ["Size", "Rating"] as const;

/**
 * RoomsPageClient — interactive filter/sort/pagination (client component).
 * Extracted from app/rooms/page.tsx so the page can export SEO metadata.
 */
export function RoomsPageClient() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [sortBy, setSortBy] = useState<(typeof sorts)[number]>("Size");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let next = filter === "All" ? rooms : rooms.filter((room) => room.type === filter);
    next = [...next].sort((a, b) => {
      if (sortBy === "Size") return b.size - a.size;
      return b.rating - a.rating;
    });
    return next;
  }, [filter, sortBy]);

  const paged = filtered.slice((page - 1) * 4, page * 4);
  const pageCount = Math.max(1, Math.ceil(filtered.length / 4));

  return (
    <>
      <PageHero
        image={imageSet.lobby}
        eyebrow="Rooms"
        title="Room options at Redwings Studio"
        description="Explore the actual Redwings Studio room inventory, from budget and standard rooms to pool-access and pool-view stays in Goa."
        priority
      />

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Curated Inventory"
            title="Browse the Redwings Studio room lineup by type, size, or rating."
          />

          <div className="mt-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap gap-3" role="group" aria-label="Filter rooms by type">
              {filters.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setFilter(item);
                    setPage(1);
                  }}
                  aria-pressed={item === filter}
                  className={cn(
                    "rounded-full border px-4 py-3 text-xs uppercase tracking-[0.3em] transition",
                    item === filter
                      ? "border-gold bg-gold text-dark"
                      : "border-gold/20 bg-dark-2 text-ivory/65 hover:border-gold hover:text-gold"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-3 rounded-full border border-gold/20 bg-dark-2 px-5 py-3 text-xs uppercase tracking-[0.28em] text-ivory/65">
              Sort By
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value as (typeof sorts)[number])}
                  className="appearance-none bg-transparent pr-6 text-gold"
                  aria-label="Sort rooms"
                >
                  {sorts.map((item) => (
                    <option key={item} value={item} className="bg-dark text-ivory">
                      {item}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gold" size={14} />
              </div>
            </label>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {paged.map((room) => (
              <RoomCard key={room.slug} room={room} />
            ))}
          </div>

          {pageCount > 1 && (
            <nav className="mt-12 flex flex-wrap gap-3" aria-label="Room pagination">
              {Array.from({ length: pageCount }).map((_, index) => {
                const value = index + 1;
                return (
                  <button
                    key={value}
                    onClick={() => setPage(value)}
                    aria-current={value === page ? "page" : undefined}
                    className={cn(
                      "h-11 w-11 rounded-full border text-sm transition",
                      value === page
                        ? "border-gold bg-gold text-dark"
                        : "border-gold/20 text-ivory/65 hover:border-gold hover:text-gold"
                    )}
                  >
                    {value}
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
