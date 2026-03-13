"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import rooms from "../../data/rooms";
import { formatPrice } from "../../lib/format";
import type { Room } from "../../types/room";

type RoomsGridProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

const facilityIconMap: Record<string, string> = {
  "room-service": "🛎️",
  "newspaper": "📰",
  "toiletries": "🧴",
  "wifi": "📶",
  "work-desk": "🖥️",
  "tv-satellite": "📡",
  "luggage": "🧳",
  "lcd-tv": "📺",
  "water": "💧",
  "laundry": "👕",
  "hot-water": "🚿",
  "ac": "❄️",
};

function RoomCard({ room }: { room: Room }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative h-[320px] w-full cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped((p) => !p)}
    >
      {/* Inner wrapper — rotates on click */}
      <div
        className="relative w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT: Room image ── */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src={room.image}
            alt={room.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Price badge */}
          <div className="absolute top-4 right-4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white shadow-md">
            <span className="text-[9px] font-semibold uppercase tracking-widest leading-tight text-[#1f3c44]/60">
              From
            </span>
            <span className="text-sm font-bold leading-tight text-[#c67a3a]">
              {formatPrice(room.pricePerNight)}
            </span>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 w-full px-6 pb-5 text-white">
            <h3 className="font-serif text-2xl font-light mb-1">{room.name}</h3>
            <p className="text-xs uppercase tracking-widest text-white/80 mb-2">
              {room.size}&nbsp;·&nbsp;{room.capacity} Person&nbsp;·&nbsp;{room.bedType}
            </p>
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-white/60 border-b border-white/40 pb-px">
              Click to view facilities →
            </span>
          </div>
        </div>

        {/* ── BACK: Facilities overlay ── */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl bg-[#1f3c44]"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Faded bg image */}
          <Image
            src={room.image}
            alt={room.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-10"
          />

          <div className="relative z-10 flex h-full flex-col px-6 py-5 overflow-y-auto">
            {/* Room name + meta */}
            <div className="mb-4 border-b border-white/10 pb-4">
              <h3 className="font-serif text-xl text-white mb-1">{room.name}</h3>
              <div className="flex flex-wrap gap-4">
                <div>
                  <p className="text-[0.55rem] uppercase tracking-widest text-white/40">Check-in</p>
                  <p className="text-xs font-semibold text-white">{room.checkIn}</p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="text-[0.55rem] uppercase tracking-widest text-white/40">Check-out</p>
                  <p className="text-xs font-semibold text-white">{room.checkOut}</p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="text-[0.55rem] uppercase tracking-widest text-white/40">Category</p>
                  <p className="text-xs font-semibold text-white">{room.category}</p>
                </div>
              </div>
            </div>

            {/* Facilities grid */}
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {room.facilities?.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-2.5 py-2 backdrop-blur-sm"
                >
                  <span className="text-sm">{facilityIconMap[f.icon] ?? "✦"}</span>
                  <span className="text-[0.58rem] font-medium uppercase tracking-wide text-white/80">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Flip back hint */}
            <p className="mt-auto pt-4 text-center text-[0.6rem] uppercase tracking-[0.2em] text-white/30">
              Click to go back ←
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RoomsGrid({
  eyebrow = "Suites",
  title = "Rooms crafted for deep rest.",
  subtitle = "Choose a suite that pairs handcrafted interiors with thoughtful amenities.",
}: RoomsGridProps) {
  return (
    <section className="bg-[#f3efe8] py-16 text-[#1f3c44]">
      <Container>
        <div className="text-center">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            align="center"
          />
          <div className="mx-auto mb-10 h-px w-full max-w-3xl bg-[#1f3c44]/15" />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </Container>
    </section>
  );
}