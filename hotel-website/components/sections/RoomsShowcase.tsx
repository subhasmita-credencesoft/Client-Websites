"use client";

import Image from "next/image";
import Link from "next/link";
import { addDays, format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatPrice } from "../../lib/format";
import { htmlToText } from "../../lib/sanitizeHtml";
import { fetchPropertyAvailability } from "../../lib/services/propertyService";
import type { RoomItem } from "../../types/property";
import { usePropertyData } from "../providers/PropertyDataProvider";
import Container from "../ui/Container";

type ShowcaseRoom = {
  id: string;
  name: string;
  image: string;
  pricePerNight: number;
  capacity: number;
  minOccupancy: number;
  size: string;
  bedType: string;
  description: string;
  facilities: string[];
};

function mapRoomToShowcase(room: RoomItem, index: number, fallbackImage: string): ShowcaseRoom {
  const firstRate = room.ratesAndAvailabilityDtos?.[0];
  const firstImage = room.imageList?.[0]?.url || fallbackImage || "/images/room_3.jpg";
  const min = Number(room.minimumOccupancy ?? 1) || 1;
  const max = Number(room.maximumOccupancy ?? min) || min;
  const facilities = (room.roomFacilities || [])
    .map((facility) => facility?.name)
    .filter((value): value is string => Boolean(value))
    .slice(0, 6);
  return {
    id: String(room.id ?? index),
    name: room.name || `Room ${index + 1}`,
    image: firstImage,
    pricePerNight: Number(firstRate?.price ?? room.pricePerNight ?? room.roomOnlyPrice ?? 0),
    capacity: max,
    minOccupancy: min,
    size: room.size || "Resort Room",
    bedType: max > 3 ? "Multiple Beds" : "1 Bed",
    description: htmlToText(room.description) || "Comfortable stay with modern amenities.",
    facilities: facilities.length > 0 ? facilities : ["Comfort Stay"],
  };
}

function RoomFlipCard({ room, className }: { room: ShowcaseRoom; className?: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`relative cursor-pointer ${className ?? ""}`}
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped((prev) => !prev)}
    >
      <div
        className="relative h-full w-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-3xl" style={{ backfaceVisibility: "hidden" }}>
          <Image
            src={room.image}
            alt={room.name}
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover transition duration-700"
            unoptimized={room.image.startsWith("http")}
          />
          <span className="absolute right-4 top-4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white text-center shadow-md sm:right-6 sm:top-6">
            <span className="text-[0.55rem] font-semibold uppercase tracking-wide text-[#1f3c44]/60">From</span>
            <span className="text-[0.75rem] font-bold text-[#c67a3a]">{formatPrice(room.pricePerNight)}</span>
          </span>
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-4 pb-6 pt-24 text-center sm:px-6">
            <h3 className="font-serif text-2xl text-white sm:text-3xl md:text-4xl">{room.name}</h3>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-[0.68rem]">
              {room.size} - {room.minOccupancy}-{room.capacity} Person - {room.bedType}
            </p>
            <span className="mt-1 border-b border-white/40 pb-px text-[0.6rem] uppercase tracking-[0.2em] text-white/60">
              Click to view facilities -&gt;
            </span>
          </div>
        </div>

        <div
          className="absolute inset-0 overflow-hidden rounded-3xl bg-[#1f3c44]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Image
            src={room.image}
            alt={room.name}
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover opacity-10"
            unoptimized={room.image.startsWith("http")}
          />
          <div className="relative z-10 flex h-full flex-col overflow-y-auto px-5 py-5">
            <div className="mb-3 border-b border-white/10 pb-3">
              <h3 className="mb-2 font-serif text-xl text-white">{room.name}</h3>
              <p className="text-[0.65rem] leading-relaxed text-white/65">{room.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
              {room.facilities.map((facility) => (
                <div
                  key={facility}
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-2.5 py-2 backdrop-blur-sm"
                >
                  <span className="text-[0.58rem] font-medium uppercase tracking-wide text-white/80">
                    {facility}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-auto pt-3 text-center text-[0.55rem] uppercase tracking-[0.2em] text-white/30">
              Click to go back &larr;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RoomsShowcase() {
  const { property, isLoading, error } = usePropertyData();
  const [fallbackRooms, setFallbackRooms] = useState<RoomItem[] | null>(null);
  const [fallbackLoading, setFallbackLoading] = useState(false);
  const [fallbackError, setFallbackError] = useState<string | null>(null);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (property?.roomList?.length || fallbackRooms || fallbackLoading || fallbackAttempted) return;
    if (isLoading) return;
    setFallbackAttempted(true);
    setFallbackLoading(true);
    setFallbackError(null);
    fetchPropertyAvailability({
      fromDate: format(new Date(), "yyyy-MM-dd"),
      toDate: format(addDays(new Date(), 1), "yyyy-MM-dd"),
      noOfPersons: 1,
      noOfRooms: 1,
    })
      .then((payload) => setFallbackRooms(payload?.roomList || []))
      .catch(() => {
        setFallbackRooms([]);
        setFallbackError("Unable to load rooms right now.");
      })
      .finally(() => setFallbackLoading(false));
  }, [property?.roomList, fallbackRooms, fallbackLoading, fallbackAttempted, isLoading]);

  const sourceRooms = (property?.roomList?.length ? property.roomList : fallbackRooms) || [];
  const mappedRooms = useMemo(() => {
    const fallbackImage = property?.imageList?.[0]?.url || "/images/room_3.jpg";
    return sourceRooms.map((room, index) => mapRoomToShowcase(room, index, fallbackImage));
  }, [sourceRooms, property?.imageList]);

  const rooms = useMemo(() => mappedRooms.slice(0, 6), [mappedRooms]);
  const total = rooms.length;

  const goNext = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused || total === 0) return;
    const timer = window.setInterval(goNext, 4000);
    return () => window.clearInterval(timer);
  }, [goNext, isPaused, total]);

  useEffect(() => {
    if (activeIndex >= total && total > 0) {
      setActiveIndex(0);
    }
  }, [activeIndex, total]);

  const display = useMemo(() => {
    if (total === 0) return [];
    const prevIndex = (activeIndex - 1 + total) % total;
    const nextIndex = (activeIndex + 1) % total;
    return [rooms[prevIndex], rooms[activeIndex], rooms[nextIndex]];
  }, [activeIndex, rooms, total]);

  const counterCurrent = total > 0 ? String(activeIndex + 1).padStart(2, "0") : "00";
  const counterTotal = String(total || 0).padStart(2, "0");

  return (
    <section className="bg-white py-20 text-[#1f3c44]">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.22em] sm:gap-6 sm:text-xs sm:tracking-[0.35em]">
            <span>Rooms &amp; Suites</span>
          </div>
          <span className="text-sm text-[#1f3c44]/60">
            {counterCurrent} / {counterTotal}
          </span>
        </div>

        <h2 className="mt-6 font-serif text-3xl sm:mt-8 sm:text-4xl md:text-6xl">Discover our rooms</h2>
      </Container>

      {(isLoading || fallbackLoading) && (
        <Container>
          <div className="mt-8 rounded-2xl border border-[#1f3c44]/10 bg-[#f7f5f1] p-6 text-center text-sm text-[#1f3c44]/70">
            Loading rooms...
          </div>
        </Container>
      )}

      {!isLoading && !fallbackLoading && (error || fallbackError) && rooms.length === 0 && (
        <Container>
          <div className="mt-8 rounded-2xl border border-[#1f3c44]/10 bg-[#f7f5f1] p-6 text-center text-sm text-[#1f3c44]/70">
            {fallbackError || error}
          </div>
        </Container>
      )}

      {!isLoading && !fallbackLoading && !error && !fallbackError && rooms.length === 0 && (
        <Container>
          <div className="mt-8 rounded-2xl border border-[#1f3c44]/10 bg-[#f7f5f1] p-6 text-center text-sm text-[#1f3c44]/70">
            No rooms available right now.
          </div>
        </Container>
      )}

      {!isLoading && !fallbackLoading && rooms.length > 0 && (
        <>
          <div
            className="relative mt-8 lg:mt-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="grid gap-3 px-4 sm:px-6 lg:grid-cols-[1fr_1.8fr_1fr] lg:px-8">
              {display.map((room, index) => {
                const isCenter = index === 1;
                return (
                  <RoomFlipCard
                    key={`${room.id}-${index}`}
                    room={room}
                    className={`transform-gpu transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isCenter
                        ? "z-10 block h-[420px] scale-100 opacity-100 sm:h-[500px] md:h-[580px]"
                        : "z-0 hidden h-[380px] scale-[0.97] opacity-50 sm:h-[450px] md:h-[520px] lg:block"
                    }`}
                  />
                );
              })}
            </div>

            <button
              onClick={goPrev}
              aria-label="Previous room"
              className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#1f3c44]/10 bg-white/90 text-[#1f3c44] shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-[#1f3c44] hover:text-white sm:h-13 sm:w-13 lg:left-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={goNext}
              aria-label="Next room"
              className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#1f3c44]/10 bg-white/90 text-[#1f3c44] shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-[#1f3c44] hover:text-white sm:h-13 sm:w-13 lg:right-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <Container>
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

            <div className="mt-8 flex justify-center sm:mt-10 lg:mt-12">
              <Link
                href="/rooms"
                className="inline-flex h-11 items-center justify-center rounded-full border border-[#1f3c44]/30 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#1f3c44] transition hover:border-[#1f3c44] hover:bg-[#1f3c44]/5"
              >
                View all rooms
              </Link>
            </div>
          </Container>
        </>
      )}
    </section>
  );
}
