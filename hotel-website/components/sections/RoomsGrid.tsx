"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { addDays, format } from "date-fns";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { formatPrice } from "../../lib/format";
import { getRoomDisplayImage } from "../../lib/roomImages";
import { htmlToText } from "../../lib/sanitizeHtml";
import { usePropertyData } from "../providers/PropertyDataProvider";
import { fetchPropertyAvailability } from "../../lib/services/propertyService";
import type { RoomItem } from "../../types/property";
import useErrorHandler from "@/hooks/useErrorHandler";
import useClientReady from "../../hooks/useClientReady";
import { useRouter } from "next/navigation";

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
const defaultVirtualTourUrl =
  "https://www.google.co.in/maps/@18.8173616,73.3047087,3a,75y,352.05h,41.3t/data=!3m7!1e1!3m5!1sCIHM0ogKEICAgICE2OrfkAE!2e10!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAFfmt2ZdcMHANYXL6HTiLhFwc2VFENp9NW0onXfyfiteKnx1vGtri8o3bmnZVw5r_9XUiiS6IW73NveF1JIB8trQ2siI-RkCqMqzGN0J44WlpuzjEXtXcmV8UzeigT-8W69UXnjWJ321yg%3Dw900-h600-k-no-pi48.70007873572015-ya110.76994491714902-ro0-fo100!7i13312!8i6656?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D";
const secondCardVirtualTourUrl =
  "https://www.google.co.in/maps/@18.8171664,73.3046375,3a,90y,125.13h,91.65t/data=!3m8!1e1!3m6!1svk2WvYbxaRcAAAQvxYrSYg!2e0!3e2!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-1.6500000000000057%26panoid%3Dvk2WvYbxaRcAAAQvxYrSYg%26yaw%3D125.13!7i13312!8i6656?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D";

gsap.registerPlugin(ScrollTrigger);

function normalizeLabel(value: string) {
  return value.trim().toLowerCase();
}

function formatCapacityLabel(minOccupancy: number, capacity: number, roomName?: string) {
  if (roomName && roomName.toLowerCase().includes("overnight stay")) {
    return `${minOccupancy}+ Persons`;
  }
  const guestLabel = capacity > 1 ? "Persons" : "Person";
  return `${minOccupancy}-${capacity} ${guestLabel}`;
}

function RoomCard({ room, virtualTourUrl }: { room: DisplayRoom; virtualTourUrl: string }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/rooms/${room.id}`);
  };

  return (
    <div
      className="rooms-grid-card relative h-[320px] w-full cursor-pointer overflow-hidden rounded-2xl group shadow-sm transition hover:shadow-md"
      onClick={handleCardClick}
    >
      <Image
        src={room.image}
        alt={room.name}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="rooms-grid-media object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        unoptimized={room.image.startsWith("http")}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      
      <button
        type="button"
        className="absolute left-4 top-4 z-10 rounded-full border border-white/45 bg-black/35 px-2.5 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#c67a3a] sm:left-5 sm:top-5 sm:px-3 sm:text-[0.6rem]"
        onClick={(event) => {
          event.stopPropagation();
          window.open(virtualTourUrl, "_blank", "noopener,noreferrer");
        }}
      >
        <span className="inline-flex items-center gap-1.5 leading-none">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 0 1 14-7" />
            <polyline points="17 3 17 7 13 7" />
            <path d="M21 12a9 9 0 0 1-14 7" />
            <polyline points="7 21 7 17 11 17" />
          </svg>
          <span>360 Tour</span>
        </span>
      </button>

      <div className="absolute right-4 top-4 z-10 flex min-h-[4rem] min-w-[4rem] px-2 py-1.5 flex-col items-center justify-center rounded-3xl bg-white shadow-md">
        <span className="text-[9px] font-semibold uppercase tracking-widest leading-tight text-[#1f3c44]/60 text-center">
          {room.name.toLowerCase().includes('overnight stay') ? 'Per Person' : 'From'}
        </span>
        <span className="text-sm font-bold leading-tight text-[#c67a3a] my-0.5">
          {formatPrice(room.pricePerNight)}
        </span>
        {room.name.toLowerCase().includes('overnight stay') && (
          <span className="text-[8px] font-semibold uppercase tracking-widest leading-tight text-[#1f3c44]/60 text-center">
            on AP
          </span>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full px-6 pb-5 text-white z-10">
        <h3 className="mb-1 font-serif text-2xl font-light">{room.name}</h3>
        <p className="mb-2 text-[0.72rem] uppercase tracking-[0.18em] text-white/80 sm:text-xs">
          {room.size} &middot; {formatCapacityLabel(room.minOccupancy, room.capacity, room.name)} &middot; {room.bedType}
        </p>
        <span className="border-b border-white/40 pb-px text-[0.6rem] uppercase tracking-[0.2em] text-white/60 group-hover:text-[#c67a3a] group-hover:border-[#c67a3a] transition-all">
          Click to view details
        </span>
      </div>
    </div>
  );
}

export default function RoomsGrid({
  eyebrow = "rooms",
  title = "Rooms crafted for deep rest.",
  subtitle = "Choose a suite that pairs handcrafted interiors with thoughtful amenities.",
}: RoomsGridProps) {
  const { property, isLoading, error } = usePropertyData();
  const clientReady = useClientReady();
  const { toUserMessage, logError, notifyError } = useErrorHandler();
  const [fallbackRooms, setFallbackRooms] = useState<RoomItem[] | null>(null);
  const [fallbackLoading, setFallbackLoading] = useState(false);
  const [fallbackError, setFallbackError] = useState<string | null>(null);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (property?.roomList?.length || fallbackRooms || fallbackLoading || fallbackAttempted) return;
    if (isLoading) return;
    const loadFallback = async () => {
      setFallbackLoading(true);
      setFallbackAttempted(true);
      setFallbackError(null);
      try {
        const payload = await fetchPropertyAvailability({
          fromDate: format(new Date(), "yyyy-MM-dd"),
          toDate: format(addDays(new Date(), 1), "yyyy-MM-dd"),
          noOfPersons: 1,
          noOfRooms: 1,
        });
        setFallbackRooms(payload?.roomList || []);
      } catch (err) {
        logError("RoomsGrid fallback availability fetch failed", err);
        setFallbackRooms([]);
        setFallbackError(
          notifyError(err, "Availability API is temporarily unavailable."),
        );
      } finally {
        setFallbackLoading(false);
      }
    };
    void loadFallback();
  }, [
    property?.roomList,
    fallbackRooms,
    fallbackLoading,
    fallbackAttempted,
    isLoading,
    logError,
    notifyError,
    toUserMessage,
  ]);

  const sourceRooms = useMemo(
    () => (property?.roomList?.length ? property.roomList : fallbackRooms) || [],
    [property?.roomList, fallbackRooms],
  );

  const displayRooms = useMemo<DisplayRoom[]>(() => {
    return sourceRooms.map((room, index) => {
      const firstRate = room.ratesAndAvailabilityDtos?.[0];
      const firstImage = getRoomDisplayImage(
        room.name,
        room.imageList,
        property?.imageList?.[0]?.url || "/images/room_3.jpg",
      );
      const facilitiesRaw = (room.roomFacilities || [])
        .map((facility) => facility?.name)
        .filter((value): value is string => Boolean(value));
      const facilities = facilitiesRaw.length > 0
        ? facilitiesRaw.map((name) => facilityIconMap[normalizeLabel(name)] || name).slice(0, 6)
        : ["Comfort Stay"];
      const min = Number(room.minimumOccupancy ?? 1) || 1;
      const max = Number(room.maximumOccupancy ?? min) || min;
      const price = Number(room.roomOnlyPrice ?? firstRate?.price ?? room.pricePerNight ?? 0);
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

  const showLoading = !clientReady || isLoading || fallbackLoading;
  const showError = clientReady && !isLoading && !fallbackLoading && (error || fallbackError) && displayRooms.length === 0;
  const showEmpty = clientReady && !isLoading && !fallbackLoading && !error && !fallbackError && displayRooms.length === 0;

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });

        tl.fromTo(
          ".rooms-grid-heading",
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" },
        ).fromTo(
          ".rooms-grid-divider",
          { scaleX: 0.2, autoAlpha: 0, transformOrigin: "center center" },
          { scaleX: 1, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
          "<+0.08",
        );

        tl.fromTo(
          ".rooms-grid-card",
          { y: 26, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.75, ease: "power3.out", stagger: 0.08 },
          "<+0.1",
        );

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom top",
            scrub: 1,
          },
        }).to(".rooms-grid-media", { yPercent: 6, scale: 1.06, ease: "none" }, 0);
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [displayRooms.length]);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
      }}
      data-no-global-gsap
      className="bg-[#f3efe8] py-16 text-[#1f3c44]"
    >
      <Container>
        <div className="rooms-grid-heading text-center">
          <SectionHeading eyebrow={eyebrow} title={title} subtitle={finalSubtitle} align="center" />
          <div className="rooms-grid-divider mx-auto mb-10 h-px w-full max-w-3xl bg-[#1f3c44]/15" />
        </div>

        {showLoading && (
          <div className="rounded-2xl border border-[#1f3c44]/10 bg-white p-6 text-center text-sm text-[#1f3c44]/70">
            Loading room list...
          </div>
        )}

        {showError && (
          <div role="alert" className="rounded-2xl border border-[#c49a3c]/22 bg-white p-6 text-center text-sm text-[#1f3c44]/70">
            {fallbackError || `${error} Trying availability endpoint...`}
          </div>
        )}

        {showEmpty && (
          <div className="rounded-2xl border border-[#1f3c44]/10 bg-white p-6 text-center text-sm text-[#1f3c44]/70">
            No rooms available right now.
          </div>
        )}

        {!showLoading && displayRooms.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2">
            {displayRooms.map((room, index) => (
              <RoomCard
                key={room.id}
                room={room}
                virtualTourUrl={index === 1 ? secondCardVirtualTourUrl : defaultVirtualTourUrl}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

