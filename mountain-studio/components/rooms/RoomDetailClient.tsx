"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import { useState } from "react";
import type { Room } from "@/types";
import { bookingEngineUrl } from "@/lib/data";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

interface RoomDetailClientProps {
  room: Room;
  similar: Room[];
}

export function RoomDetailClient({ room, similar }: RoomDetailClientProps) {
  const [index, setIndex] = useState(0);
  const [rulesOpen, setRulesOpen] = useState<number | null>(0);

  return (
    <div className="pt-24">
      <section className="container-shell">
        <div className="relative overflow-hidden rounded-[36px]">
          <div className="relative aspect-[16/7]">
            <AnimatePresence mode="wait">
              <motion.div
                key={room.images[index]}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="absolute inset-0"
              >
                <Image src={room.images[index]} alt={room.name} fill priority className="object-cover" sizes="100vw" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
            <div className="absolute inset-x-6 top-6 flex items-center justify-between">
              <div className="rounded-full border border-gold/20 bg-dark/55 px-4 py-2 text-xs uppercase tracking-[0.28em] text-ivory/70">
                <Link href="/">Home</Link> &nbsp;&gt;&nbsp; <Link href="/rooms">Rooms</Link> &nbsp;&gt;&nbsp; {room.name}
              </div>
              <div className="flex gap-3">
                <button
                  aria-label="Previous image"
                  onClick={() => setIndex((value) => (value - 1 + room.images.length) % room.images.length)}
                  className="rounded-full border border-gold/25 bg-dark/55 p-3 text-ivory"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  aria-label="Next image"
                  onClick={() => setIndex((value) => (value + 1) % room.images.length)}
                  className="rounded-full border border-gold/25 bg-dark/55 p-3 text-ivory"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3 bg-dark-2 p-4">
            {room.images.concat(room.images).slice(0, 5).map((image, thumbIndex) => (
              <button
                key={`${image}-${thumbIndex}`}
                onClick={() => setIndex(thumbIndex % room.images.length)}
                className="relative aspect-[5/4] overflow-hidden rounded-2xl"
              >
                <Image src={image} alt="" fill className="object-cover" sizes="20vw" />
                <div className={`absolute inset-0 ${thumbIndex % room.images.length === index ? "ring-2 ring-gold" : "bg-black/25"}`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-10 xl:grid-cols-[1.6fr_0.9fr]">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <h1 className="display-title text-5xl">{room.name}</h1>
                <div className="mt-3 flex items-center gap-2 text-gold">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={16} fill={starIndex < Math.round(room.rating) ? "currentColor" : "none"} />
                  ))}
                  <span className="ml-2 text-sm uppercase tracking-[0.24em] text-ivory/60">{room.rating} / 5</span>
                </div>
              </div>
              <button className="rounded-full border border-gold/25 px-4 py-3 text-xs uppercase tracking-[0.28em] text-gold">
                <Heart size={14} className="mr-2 inline-block" />
                Wishlist
              </button>
            </div>

            <div className="mt-10 grid gap-3 rounded-[28px] border border-gold/15 bg-dark-2 p-6 sm:grid-cols-5">
              {[`${room.size} SQFT`, room.beds, room.floor, room.view, `${room.guests} Guests`].map((item) => (
                <div key={item} className="text-center text-xs uppercase tracking-[0.28em] text-ivory/62">
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-[65ch] text-lg leading-9 text-ivory/72">{room.description}</p>

            <div className="mt-14">
              <h2 className="font-display text-4xl">Amenities</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {room.amenities.concat(room.amenities).slice(0, 12).map((item, itemIndex) => (
                  <div key={`${item}-${itemIndex}`} className="rounded-2xl border border-gold/12 bg-dark-2 px-4 py-4 text-sm text-ivory/68">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14">
              <h2 className="font-display text-4xl">What&apos;s Included</h2>
              <div className="mt-6 space-y-4">
                {room.includes.map((item) => (
                  <div key={item} className="rounded-2xl border border-gold/12 bg-dark-2 px-5 py-4 text-ivory/72">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14">
              <h2 className="font-display text-4xl">House Rules</h2>
              <div className="mt-6 space-y-4">
                {[
                  ["Check-in & Checkout", "Check-in begins at 1:00 PM and check-out is at 11:00 AM. Early or late timing depends on availability and direct confirmation."],
                  ["Booking Support", "Guests can use the live Redwings Studio booking engine or contact the team directly for room planning and stay guidance."],
                  ["Stay Planning", "Maximum occupancy varies by room, with the property suited for couples, families, and small group stays under the Redwings banner."]
                ].map(([label, value], itemIndex) => (
                  <div key={label} className="overflow-hidden rounded-2xl border border-gold/12 bg-dark-2">
                    <button
                      onClick={() => setRulesOpen((current) => (current === itemIndex ? null : itemIndex))}
                      className="flex w-full items-center justify-between px-5 py-4 text-left font-display text-2xl"
                    >
                      {label}
                      <span className="text-gold">{rulesOpen === itemIndex ? "-" : "+"}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {rulesOpen === itemIndex ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden px-5 pb-5 text-base leading-8 text-ivory/65"
                        >
                          {value}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <h2 className="font-display text-4xl">Similar Rooms</h2>
              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {similar.map((item) => (
                  <Link key={item.slug} href={`/rooms/${item.slug}`} className="group overflow-hidden rounded-[26px] border border-gold/12 bg-dark-2">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={item.images[0]} alt={item.name} fill className="object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-3xl">{item.name}</h3>
                      <p className="mt-3 text-sm uppercase tracking-[0.28em] text-ivory/55">{item.type}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="xl:sticky xl:top-[120px] xl:h-fit">
            <div className="rounded-[30px] border border-gold/18 bg-dark-2 p-6">
              <div className="space-y-5">
                <div className="rounded-2xl border border-gold/12 p-5 text-sm leading-7 text-ivory/65">
                  Use the booking button below to open the live Redwings Studio booking engine and check availability directly.
                </div>
                <LuxuryButton href={bookingEngineUrl} label="Book This Room" className="w-full justify-center" />
                <LuxuryButton href="#" label="Add to Wishlist" variant="ghost" className="w-full justify-center" />
                <div className="rounded-2xl border border-gold/12 p-4 text-xs uppercase tracking-[0.28em] text-ivory/55">
                  Direct booking engine access
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
