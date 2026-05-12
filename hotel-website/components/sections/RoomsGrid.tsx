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

function formatCapacityLabel(minOccupancy: number, capacity: number) {
  const guestLabel = capacity > 1 ? "Persons" : "Person";
  return `${minOccupancy}-${capacity} ${guestLabel}`;
}

function RoomCard({ room, virtualTourUrl }: { room: DisplayRoom; virtualTourUrl: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="rooms-grid-card relative h-[320px] w-full cursor-pointer"
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
            className="rooms-grid-media object-cover"
            unoptimized={room.image.startsWith("http")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <button
            type="button"
            className="absolute left-4 top-4 rounded-full border border-white/45 bg-black/35 px-2.5 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-black/50 sm:left-5 sm:top-5 sm:px-3 sm:text-[0.6rem]"
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
            <p className="mb-2 text-[0.72rem] uppercase tracking-[0.18em] text-white/80 sm:text-xs">
              {room.size} &middot; {formatCapacityLabel(room.minOccupancy, room.capacity)} &middot; {room.bedType}
            </p>
            <span className="border-b border-white/40 pb-px text-[0.6rem] uppercase tracking-[0.2em] text-white/60">
              Click to view facilities 
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
            className="object-cover"
            unoptimized={room.image.startsWith("http")}
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,22,0.38)_0%,rgba(10,18,22,0.2)_30%,rgba(10,18,22,0.72)_100%)]" />

          <div className="relative z-10 flex h-full flex-col px-6 py-5">
            <div className="flex justify-end">
              <span className="inline-flex rounded-full border border-white/45 bg-black/28 px-3 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-white">
                Facilities
              </span>
            </div>

            <div className="pt-4">
              <h3 className="mb-1 font-serif text-2xl text-white">{room.name}</h3>
              <p className="mb-4 text-[0.72rem] uppercase tracking-[0.18em] text-white/82 sm:text-xs">
                {room.size} &middot; {formatCapacityLabel(room.minOccupancy, room.capacity)} &middot; {room.bedType}
              </p>
              <p className="max-w-xl text-[0.68rem] leading-relaxed text-white/88">
                {room.description}
              </p>
            </div>

            <div className="flex flex-1 items-center justify-center">
              <div className="flex max-w-[32rem] flex-wrap items-center justify-center gap-2">
                {room.facilities.map((facility) => (
                  <div
                    key={facility}
                    className="rounded-full border border-white/22 bg-white/14 px-4 py-2 text-[0.58rem] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm"
                  >
                    {facility}
                  </div>
                ))}
              </div>
            </div>

            <p className="pt-4 text-center text-[0.6rem] uppercase tracking-[0.2em] text-white/58">
              Click to go back
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

