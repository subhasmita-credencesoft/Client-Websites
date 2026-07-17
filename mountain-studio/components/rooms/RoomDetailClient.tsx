"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Wifi, Tv, Wind, Droplets, Clock, Phone } from "lucide-react";
import { useState } from "react";
import type { Room } from "@/types";
import { bookingEngineUrl } from "@/lib/data";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

interface RoomDetailClientProps {
  room: Room;
  similar: Room[];
}

const amenityIcons: Record<string, typeof Wifi> = {
  Wifi: Wifi,
  "Flat TV": Tv,
  "Room Service": Clock,
  Geyser: Droplets,
  "24 Hours Room Service": Phone,
};

export function RoomDetailClient({ room, similar }: RoomDetailClientProps) {
  const [index, setIndex] = useState(0);
  const [rulesOpen, setRulesOpen] = useState<number | null>(0);

  return (
    <div className="pt-24">
      {/* Image gallery */}
      <section className="container-shell">
        <div className="relative overflow-hidden rounded-[36px]">
          <div className="relative aspect-[16/7]">
            <AnimatePresence mode="wait">
              <motion.div
                key={room.images[index]}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="absolute inset-0"
              >
                <Image src={room.images[index]} alt={room.name} fill priority className="object-cover" sizes="100vw" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-transparent to-black/20" />

            {/* Breadcrumb */}
            <div className="absolute left-6 top-6 rounded-full border border-white/15 bg-dark/55 px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-ivory/70 backdrop-blur-sm">
              <Link href="/" className="text-ivory/50 transition hover:text-ivory">Home</Link>
              <span className="mx-2 text-gold/40">/</span>
              <Link href="/rooms" className="text-ivory/50 transition hover:text-ivory">Rooms</Link>
              <span className="mx-2 text-gold/40">/</span>
              <span className="text-ivory/80">{room.name}</span>
            </div>

            {/* Nav arrows */}
            <div className="absolute right-6 top-6 flex gap-2">
              <button
                aria-label="Previous image"
                onClick={() => setIndex((v) => (v - 1 + room.images.length) % room.images.length)}
                className="rounded-full border border-white/15 bg-dark/50 p-3 text-ivory/80 backdrop-blur-sm transition hover:bg-dark/70 hover:text-gold"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                aria-label="Next image"
                onClick={() => setIndex((v) => (v + 1) % room.images.length)}
                className="rounded-full border border-white/15 bg-dark/50 p-3 text-ivory/80 backdrop-blur-sm transition hover:bg-dark/70 hover:text-gold"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Image counter */}
            <div className="absolute bottom-6 left-6 rounded-full border border-white/15 bg-dark/55 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-ivory/60 backdrop-blur-sm">
              {index + 1} / {room.images.length}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-2 bg-dark-2 p-3">
            {room.images.concat(room.images).slice(0, 5).map((image, thumbIndex) => (
              <button
                key={`${image}-${thumbIndex}`}
                onClick={() => setIndex(thumbIndex % room.images.length)}
                className="relative aspect-[5/4] overflow-hidden rounded-xl"
              >
                <Image src={image} alt="" fill className="object-cover" sizes="20vw" />
                <div className={`absolute inset-0 transition ${thumbIndex % room.images.length === index ? "ring-2 ring-gold ring-offset-2 ring-offset-dark-2" : "bg-black/30"}`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Room info + booking sidebar */}
      <section className="section-space">
        <div className="container-shell grid gap-12 xl:grid-cols-[1.5fr_1fr]">
          {/* Main content */}
          <div>
            {/* Title + rating */}
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <h1 className="display-title text-5xl">{room.name}</h1>
                <p className="mt-2 text-sm uppercase tracking-[0.25em] text-ivory/45">{room.type}</p>
                <div className="mt-4 flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} className="text-gold" fill={i < Math.round(room.rating) ? "currentColor" : "none"} />
                  ))}
                  <span className="ml-1 text-sm text-ivory/55">{room.rating} / 5</span>
                </div>
              </div>
            </div>

            {/* Quick facts */}
            <div className="mt-10 grid grid-cols-5 gap-px overflow-hidden rounded-[24px] border border-gold/12 bg-gold/8">
              {[`${room.size} SQFT`, room.beds, room.floor, room.view, `${room.guests} Guests`].map((item) => (
                <div key={item} className="bg-dark-2 px-4 py-5 text-center">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-ivory/55">{item}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="mt-10 max-w-[60ch] text-[15px] leading-relaxed text-ivory/65">{room.description}</p>

            {/* Highlights */}
            {room.highlights.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-3xl">Highlights</h2>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {room.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-gold/10 bg-dark-2 px-5 py-4 text-sm text-ivory/65">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            <div className="mt-14">
              <h2 className="font-display text-3xl">Amenities</h2>
              <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {room.amenities.map((item, i) => {
                  const Icon = amenityIcons[item];
                  return (
                    <div key={`${item}-${i}`} className="flex items-center gap-3 rounded-2xl border border-gold/10 bg-dark-2 px-5 py-4">
                      {Icon ? <Icon size={16} className="shrink-0 text-gold/70" /> : <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold/50" />}
                      <span className="text-sm text-ivory/65">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* What's included */}
            <div className="mt-14">
              <h2 className="font-display text-3xl">What&apos;s Included</h2>
              <div className="mt-5 space-y-2">
                {room.includes.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-gold/10 bg-dark-2 px-5 py-4 text-sm text-ivory/65">
                    <span className="text-gold">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* House rules */}
            <div className="mt-14">
              <h2 className="font-display text-3xl">House Rules</h2>
              <div className="mt-5 space-y-2">
                {[
                  ["Check-in & Checkout", "Check-in begins at 1:00 PM and check-out is at 11:00 AM. Early or late timing depends on availability and direct confirmation."],
                  ["Booking Support", "Guests can use the live Redwings Studio booking engine or contact the team directly for room planning and stay guidance."],
                  ["Stay Planning", "Maximum occupancy varies by room, with the property suited for couples, families, and small group stays under the Redwings banner."]
                ].map(([label, value], itemIndex) => (
                  <div key={label} className="overflow-hidden rounded-2xl border border-gold/10 bg-dark-2">
                    <button
                      onClick={() => setRulesOpen((c) => (c === itemIndex ? null : itemIndex))}
                      className="flex w-full items-center justify-between px-6 py-5 text-left"
                    >
                      <span className="font-display text-xl">{label}</span>
                      <span className="text-gold/70 text-lg">{rulesOpen === itemIndex ? "−" : "+"}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {rulesOpen === itemIndex && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden px-6 pb-5 text-sm leading-relaxed text-ivory/55"
                        >
                          {value}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar rooms */}
            <div className="mt-16">
              <h2 className="font-display text-3xl">Similar Rooms</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((item) => (
                  <Link key={item.slug} href={`/rooms/${item.slug}`} className="group overflow-hidden rounded-[24px] border border-gold/10 bg-dark-2 transition hover:border-gold/25">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={item.images[0]} alt={item.name} fill className="object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl">{item.name}</h3>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-ivory/40">{item.type}</p>
                      <p className="mt-3 font-display text-lg text-gold">₹{item.price.toLocaleString("en-IN")}<span className="text-xs text-ivory/40"> /night</span></p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Booking sidebar */}
          <aside className="xl:sticky xl:top-[100px] xl:h-fit">
            <div className="overflow-hidden rounded-[32px] border border-gold/15 bg-dark-2 shadow-[0_8px_60px_rgba(0,0,0,0.4)]">
              {/* Price header */}
              <div className="border-b border-gold/10 bg-dark-3/50 px-6 py-5">
                <p className="text-[11px] uppercase tracking-[0.25em] text-ivory/40">Starting from</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-display text-4xl text-gold-light">₹{room.price.toLocaleString("en-IN")}</span>
                  <span className="text-sm text-ivory/40">/night</span>
                </div>
                <p className="mt-1 text-[11px] text-ivory/35">Inclusive of all taxes</p>
              </div>

              {/* Info */}
              <div className="px-6 py-5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ivory/50">Room Type</span>
                  <span className="text-ivory/80">{room.type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ivory/50">Size</span>
                  <span className="text-ivory/80">{room.size} sqft</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ivory/50">Beds</span>
                  <span className="text-ivory/80">{room.beds}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ivory/50">Max Guests</span>
                  <span className="text-ivory/80">{room.guests}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ivory/50">View</span>
                  <span className="text-ivory/80">{room.view}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6 space-y-3">
                <LuxuryButton href={bookingEngineUrl} label="Book This Room" className="w-full justify-center" />
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center rounded-full border border-gold/25 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-ivory/70 transition hover:border-gold hover:text-gold"
                >
                  Talk to The Team
                </Link>
              </div>

              {/* Footer note */}
              <div className="border-t border-gold/8 bg-dark-3/30 px-6 py-4 text-center text-[11px] uppercase tracking-[0.18em] text-ivory/35">
                Instant confirmation · Free cancellation
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
