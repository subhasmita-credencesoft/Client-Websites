"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useCallback } from "react";
import roomsData from "../../data/rooms";
import { formatPrice } from "../../lib/format";
import Container from "../ui/Container";
import type { Room } from "../../types/room";

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

function RoomFlipCard({
  room,
  className,
}: {
  room: Room;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`relative cursor-pointer ${className ?? ""}`}
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped((p) => !p)}
    >
      {/* Inner wrapper — rotates */}
      <div
        className="relative w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT: image ── */}
        <div
          className="absolute inset-0 overflow-hidden rounded-3xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src={room.image}
            alt={room.name}
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover transition duration-700"
            priority
          />
          {/* Price badge */}
          <span className="absolute right-4 top-4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white text-center shadow-md sm:right-6 sm:top-6">
            <span className="text-[0.55rem] font-semibold uppercase tracking-wide text-[#1f3c44]/60">From</span>
            <span className="text-[0.75rem] font-bold text-[#c67a3a]">{formatPrice(room.pricePerNight)}</span>
          </span>
          {/* Bottom info */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-4 pb-6 pt-24 text-center sm:px-6">
            <h3 className="font-serif text-2xl text-white sm:text-3xl md:text-4xl">
              {room.name}
            </h3>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-[0.68rem]">
              {room.size} · {room.capacity} Person · {room.bedType}
            </p>
            <span className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-white/60 border-b border-white/40 pb-px">
              Click to view facilities →
            </span>
          </div>
        </div>

        {/* ── BACK: facilities ── */}
        <div
          className="absolute inset-0 overflow-hidden rounded-3xl bg-[#1f3c44]"
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
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover opacity-10"
          />

          <div className="relative z-10 flex h-full flex-col px-5 py-5 overflow-y-auto">
            {/* Name + meta */}
            <div className="mb-3 border-b border-white/10 pb-3">
              <h3 className="font-serif text-xl text-white mb-2">{room.name}</h3>
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

            {/* Facility description */}
            <p className="mb-3 text-[0.65rem] leading-relaxed text-white/60">
              {room.facilityDescription}
            </p>

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

            <p className="mt-auto pt-3 text-center text-[0.55rem] uppercase tracking-[0.2em] text-white/30">
              Click to go back ←
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RoomsShowcase() {
  const rooms: Room[] = useMemo(() => roomsData.slice(0, 6), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = rooms.length || 1;

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, 3000);
    return () => clearInterval(timer);
  }, [goNext, isPaused]);

  const display = useMemo(() => {
    const safeRooms = rooms.length ? rooms : roomsData;
    const safeTotal = safeRooms.length;
    const prevIndex = (activeIndex - 1 + safeTotal) % safeTotal;
    const nextIndex = (activeIndex + 1) % safeTotal;
    return [safeRooms[prevIndex], safeRooms[activeIndex], safeRooms[nextIndex]];
  }, [activeIndex, rooms]);

  const counterCurrent = String(activeIndex + 1).padStart(2, "0");
  const counterTotal = String(total).padStart(2, "0");

  return (
    <section className="bg-white py-20 text-[#1f3c44]">
      <Container>
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.22em] sm:gap-6 sm:text-xs sm:tracking-[0.35em]">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1f3c44]/30 text-[0.8rem] font-semibold sm:h-12 sm:w-12 sm:text-sm">
              02
            </span>
            <span>Rooms &amp; Suites</span>
          </div>
          <span className="text-sm text-[#1f3c44]/60">
            {counterCurrent} / {counterTotal}
          </span>
        </div>

        {/* Title */}
        <h2 className="mt-6 font-serif text-3xl sm:mt-8 sm:text-4xl md:text-6xl">
          Discover our rooms
        </h2>
      </Container>

      {/* ── Full-width carousel (no Container padding) ── */}
      <div
        className="mt-8 lg:mt-10 relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Cards grid */}
        <div className="grid lg:grid-cols-[1fr_1.8fr_1fr] gap-3 px-4 sm:px-6 lg:px-8">
          {display.map((room, index) => {
            const isCenter = index === 1;
            return (
              <RoomFlipCard
                key={`${room.id}-${index}`}
                room={room}
                className={`
                  transform-gpu transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${isCenter
                    ? "h-[420px] sm:h-[500px] md:h-[580px] scale-100 opacity-100 z-10 block"
                    : "h-[380px] sm:h-[450px] md:h-[520px] opacity-50 scale-[0.97] z-0 hidden lg:block"
                  }
                `}
              />
            );
          })}
        </div>

        {/* ── Prev / Next Arrow Buttons ── */}
        <button
          onClick={goPrev}
          aria-label="Previous room"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20
            flex h-11 w-11 items-center justify-center
            rounded-full bg-white/90 shadow-lg border border-[#1f3c44]/10
            text-[#1f3c44] hover:bg-[#1f3c44] hover:text-white
            transition-all duration-300 backdrop-blur-sm
            sm:h-13 sm:w-13 lg:left-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          onClick={goNext}
          aria-label="Next room"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20
            flex h-11 w-11 items-center justify-center
            rounded-full bg-white/90 shadow-lg border border-[#1f3c44]/10
            text-[#1f3c44] hover:bg-[#1f3c44] hover:text-white
            transition-all duration-300 backdrop-blur-sm
            sm:h-13 sm:w-13 lg:right-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <Container>
        {/* Dot indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {rooms.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-[#1f3c44]" : "w-1.5 bg-[#1f3c44]/30"
              }`}
              aria-label={`Go to room ${i + 1}`}
            />
          ))}
        </div>

        {/* View all rooms */}
        <div className="mt-8 flex justify-center sm:mt-10 lg:mt-12">
          <Link
            href="/rooms"
            className="inline-flex h-11 items-center justify-center rounded-full border border-[#1f3c44]/30 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#1f3c44] transition hover:border-[#1f3c44] hover:bg-[#1f3c44]/5"
          >
            View all rooms
          </Link>
        </div>
      </Container>
    </section>
  );
}