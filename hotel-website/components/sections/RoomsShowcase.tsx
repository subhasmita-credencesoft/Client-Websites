"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useCallback, JSX } from "react";
import roomsData from "../../data/rooms";
import { formatPrice } from "../../lib/format";
import Container from "../ui/Container";
import type { Room } from "../../types/room";

// ── SVG icon components — no emoji, consistent on all devices ──
const FacilityIcons: Record<string, () => JSX.Element> = {
  "room-service": () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17h18M12 3v4M5 17a7 7 0 0 1 14 0"/><circle cx="12" cy="7" r="1"/>
    </svg>
  ),
  "newspaper": () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M8 7h8M8 11h8M8 15h5"/>
    </svg>
  ),
  "toiletries": () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6v4H9zM7 7h10l1 14H6L7 7z"/><path d="M12 11v4"/>
    </svg>
  ),
  "wifi": () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/>
    </svg>
  ),
  "work-desk": () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="3" rx="1"/><path d="M5 10v7M19 10v7M9 17h6"/>
    </svg>
  ),
  "tv-satellite": () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 12.5l7-7 7 7-7 7-7-7z"/><path d="M15 6l3-3M18 15l3 3M6 18l-3 3M9 3L6 6"/>
    </svg>
  ),
  "luggage": () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="9" width="18" height="13" rx="2"/><path d="M9 9V7a3 3 0 0 1 6 0v2M12 13v3"/>
    </svg>
  ),
  "lcd-tv": () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 22h8M12 18v4"/>
    </svg>
  ),
  "water": () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6 8 4 12.5 4 15a8 8 0 0 0 16 0c0-2.5-2-7-8-13z"/>
    </svg>
  ),
  "laundry": () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2"/><circle cx="12" cy="13" r="4"/><path d="M6 6h.01M9 6h2"/>
    </svg>
  ),
  "hot-water": () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M8 6c0 4 8 4 8 8a4 4 0 0 1-8 0c0-4 8-4 8-8"/>
    </svg>
  ),
  "ac": () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="8" rx="2"/><path d="M7 14v4M12 14v4M17 14v4M7 6V2M12 6V2M17 6V2"/>
    </svg>
  ),
};

const FallbackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/>
  </svg>
);

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
              {room.facilities?.map((f) => {
                const IconComp = FacilityIcons[f.icon] ?? FallbackIcon;
                return (
                  <div
                    key={f.label}
                    className="flex items-center gap-2 rounded-xl bg-white/10 px-2.5 py-2 backdrop-blur-sm"
                  >
                    <span className="text-white/70 shrink-0">
                      <IconComp />
                    </span>
                    <span className="text-[0.58rem] font-medium uppercase tracking-wide text-white/80">
                      {f.label}
                    </span>
                  </div>
                );
              })}
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

  // ── Auto-rotate every 4 seconds ──
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, 4000);
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
