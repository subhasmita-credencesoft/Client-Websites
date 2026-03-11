"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import roomsData from "../../data/rooms";
import { formatPrice } from "../../lib/format";
import Container from "../ui/Container";
import type { Room } from "../../types/room";

export default function RoomsShowcase() {
  const rooms: Room[] = useMemo(() => roomsData.slice(0, 6), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = rooms.length || 1;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(timer);
  }, [total]);

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
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-xs uppercase tracking-[0.35em]">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#1f3c44]/30 text-sm font-semibold">
              02
            </span>
            <span>Rooms & Suites</span>
          </div>
          <span className="text-sm text-[#1f3c44]/60">
            {counterCurrent} - {counterTotal}
          </span>
        </div>
        <h2 className="mt-8 font-serif text-4xl md:text-6xl">
          Discover our rooms
        </h2>
      </Container>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.7fr_1.6fr_0.7fr]">
        {display.map((room, index) => (
          <div
            key={`${room.name}-${index}`}
            className={`group relative overflow-hidden rounded-3xl transform-gpu transition-[transform,opacity,filter] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
              index === 1
                ? "z-10 scale-100 opacity-100 translate-y-0 lg:scale-[1.02]"
                : "opacity-70 translate-y-4 lg:scale-[0.96] blur-[0.5px]"
            }`}
          >
            <div className="relative h-72 w-full md:h-96">
              <Image
                src={room.image}
                alt={room.name}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <span className="absolute right-6 top-6 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#c67a3a]">
              <span className="text-[#1f3c44]/70">From</span>
              {formatPrice(room.pricePerNight)}
            </span>
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-6 pb-6 pt-24 text-center">
              <h3 className="font-serif text-2xl text-white md:text-3xl">
                {room.name}
              </h3>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/80">
                {room.size} · {room.capacity} PERSON · {room.bedType}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Container className="mt-12 flex justify-center">
        <Link
          href="/rooms"
          className="inline-flex h-11 items-center justify-center rounded-full border border-[#1f3c44]/30 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#1f3c44] transition hover:border-[#1f3c44]"
        >
          View all rooms
        </Link>
      </Container>
    </section>
  );
}
