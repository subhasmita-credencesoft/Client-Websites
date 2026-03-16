"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { addDays, format } from "date-fns";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { formatPrice } from "../../lib/format";
import { htmlToText } from "../../lib/sanitizeHtml";
import { usePropertyData } from "../providers/PropertyDataProvider";
import { fetchPropertyAvailability } from "../../lib/services/propertyService";
import type { RoomItem } from "../../types/property";

type RoomsGridProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

type DisplayRoom = {
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

const facilityIconMap: Record<string, string> = {
  wifi: "WiFi",
  "room service": "Room Service",
  "flat tv": "TV",
  "air-condition": "AC",
  "air conditioning": "AC",
};

function normalizeLabel(value: string) {
  return value.trim().toLowerCase();
}

function RoomCard({ room }: { room: DisplayRoom }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative h-[320px] w-full cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped((p) => !p)}
    >
      <div
        className="relative h-full w-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-2xl" style={{ backfaceVisibility: "hidden" }}>
          <Image
            src={room.image}
            alt={room.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            unoptimized={room.image.startsWith("http")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute right-4 top-4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white shadow-md">
            <span className="text-[9px] font-semibold uppercase tracking-widest leading-tight text-[#1f3c44]/60">
              From
            </span>
            <span className="text-sm font-bold leading-tight text-[#c67a3a]">
              {formatPrice(room.pricePerNight)}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 w-full px-6 pb-5 text-white">
            <h3 className="mb-1 font-serif text-2xl font-light">{room.name}</h3>
            <p className="mb-2 text-xs uppercase tracking-widest text-white/80">
              {room.size} · {room.minOccupancy}-{room.capacity} Person · {room.bedType}
            </p>
            <span className="border-b border-white/40 pb-px text-[0.6rem] uppercase tracking-[0.2em] text-white/60">
              Click to view facilities →
            </span>
          </div>
        </div>

        <div
          className="absolute inset-0 overflow-hidden rounded-2xl bg-[#1f3c44]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Image
            src={room.image}
            alt={room.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-10"
            unoptimized={room.image.startsWith("http")}
          />

          <div className="relative z-10 flex h-full flex-col overflow-y-auto px-6 py-5">
            <div className="mb-4 border-b border-white/10 pb-4">
              <h3 className="mb-1 font-serif text-xl text-white">{room.name}</h3>
              <p className="text-[0.65rem] leading-relaxed text-white/70">{room.description}</p>
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
  const { property, isLoading, error } = usePropertyData();
  const [fallbackRooms, setFallbackRooms] = useState<RoomItem[] | null>(null);
  const [fallbackLoading, setFallbackLoading] = useState(false);
  const [fallbackError, setFallbackError] = useState<string | null>(null);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);

  const sourceRooms = (property?.roomList?.length ? property.roomList : fallbackRooms) || [];

  useEffect(() => {
    if (property?.roomList?.length || fallbackRooms || fallbackLoading || fallbackAttempted) return;
    if (isLoading) return;
    setFallbackLoading(true);
    setFallbackAttempted(true);
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
        setFallbackError("Availability API is temporarily unavailable.");
      })
      .finally(() => setFallbackLoading(false));
  }, [property?.roomList, fallbackRooms, fallbackLoading, fallbackAttempted, isLoading]);

  const displayRooms = useMemo<DisplayRoom[]>(() => {
    return sourceRooms.map((room, index) => {
      const firstRate = room.ratesAndAvailabilityDtos?.[0];
      const firstImage = room.imageList?.[0]?.url || property?.imageList?.[0]?.url || "/images/room_3.jpg";
      const facilitiesRaw = (room.roomFacilities || [])
        .map((facility) => facility?.name)
        .filter((value): value is string => Boolean(value));
      const facilities = facilitiesRaw.length > 0
        ? facilitiesRaw.map((name) => facilityIconMap[normalizeLabel(name)] || name).slice(0, 6)
        : ["Comfort Stay"];
      const min = Number(room.minimumOccupancy ?? 1) || 1;
      const max = Number(room.maximumOccupancy ?? min) || min;
      const price = Number(firstRate?.price ?? room.pricePerNight ?? room.roomOnlyPrice ?? 0);
      return {
        id: String(room.id ?? index),
        name: room.name || `Room ${index + 1}`,
        image: firstImage,
        pricePerNight: price,
        capacity: max,
        minOccupancy: min,
        size: room.size || "Resort Room",
        bedType: max > 3 ? "Multiple Beds" : "1 Bed",
        description: htmlToText(room.description) || "Comfortable stay with modern amenities.",
        facilities,
      };
    });
  }, [property, sourceRooms]);

  const finalSubtitle =
    subtitle ||
    htmlToText(property?.businessDescription).slice(0, 220) ||
    "Choose a suite that pairs handcrafted interiors with thoughtful amenities.";

  return (
    <section className="bg-[#f3efe8] py-16 text-[#1f3c44]">
      <Container>
        <div className="text-center">
          <SectionHeading eyebrow={eyebrow} title={title} subtitle={finalSubtitle} align="center" />
          <div className="mx-auto mb-10 h-px w-full max-w-3xl bg-[#1f3c44]/15" />
        </div>

        {(isLoading || fallbackLoading) && (
          <div className="rounded-2xl border border-[#1f3c44]/10 bg-white p-6 text-center text-sm text-[#1f3c44]/70">
            Loading room list...
          </div>
        )}

        {!isLoading && !fallbackLoading && (error || fallbackError) && displayRooms.length === 0 && (
          <div className="rounded-2xl border border-[#1f3c44]/10 bg-white p-6 text-center text-sm text-[#1f3c44]/70">
            {fallbackError || `${error} Trying availability endpoint...`}
          </div>
        )}

        {!isLoading && !fallbackLoading && !error && !fallbackError && displayRooms.length === 0 && (
          <div className="rounded-2xl border border-[#1f3c44]/10 bg-white p-6 text-center text-sm text-[#1f3c44]/70">
            No rooms available right now.
          </div>
        )}

        {!isLoading && !fallbackLoading && displayRooms.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2">
            {displayRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
