"use client";

import Image from "next/image";
import Link from "next/link";
import { addDays, format } from "date-fns";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

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

function RoomShowcaseCard({ room, className }: { room: ShowcaseRoom; className?: string }) {
  const [imageSrc, setImageSrc] = useState(room.image || "/images/room_3.jpg");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-[#1f3c44]/10 bg-white shadow-[0_18px_38px_rgba(31,60,68,0.08)] ${className ?? ""}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={room.name}
          fill
          sizes="(max-width: 1024px) 100vw, 600px"
          className={`object-cover transition-[transform,opacity,filter] duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04] ${
            isImageLoaded ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[2px]"
          }`}
          unoptimized={imageSrc.startsWith("http")}
          onError={() => {
            if (imageSrc !== "/images/room_3.jpg") setImageSrc("/images/room_3.jpg");
          }}
          onLoad={() => setIsImageLoaded(true)}
        />
        <span className="absolute right-4 top-4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white text-center shadow-md sm:right-6 sm:top-6">
          <span className="text-[0.55rem] font-semibold uppercase tracking-wide text-[#1f3c44]/60">From</span>
          <span className="text-[0.75rem] font-bold text-[#c67a3a]">{formatPrice(room.pricePerNight)}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between border-t border-[#1f3c44]/8 px-5 py-6 text-center sm:px-7">
        <h3 className="room-title font-serif text-2xl text-[#1f3c44] sm:text-3xl">{room.name}</h3>
        <p className="room-meta mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#1f3c44]/60 sm:text-[0.7rem]">
          {room.size} - {room.minOccupancy}-{room.capacity} Person - {room.bedType}
        </p>
        <p className="room-desc mt-3 min-h-10 line-clamp-2 text-[0.76rem] leading-relaxed text-[#1f3c44]/65">
          {room.description}
        </p>
        <div className="room-tags mt-4 flex flex-wrap items-center justify-center gap-1.5">
          {room.facilities.slice(0, 3).map((facility) => (
            <span key={facility} className="rounded-full bg-[#f2ede4] px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.12em] text-[#1f3c44]/75">
              {facility}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function RoomsShowcase() {
  const { property, isLoading, error } = usePropertyData();
  const [mounted, setMounted] = useState(false);
  const [fallbackRooms, setFallbackRooms] = useState<RoomItem[] | null>(null);
  const [fallbackLoading, setFallbackLoading] = useState(false);
  const [fallbackError, setFallbackError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [transitionKey, setTransitionKey] = useState(0);
  const [animationError, setAnimationError] = useState<string | null>(null);
  const fallbackAttemptedRef = useRef(false);
  const transitionTimerRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (property?.roomList?.length || fallbackRooms || fallbackLoading || fallbackAttemptedRef.current) return;
    if (isLoading) return;
    fallbackAttemptedRef.current = true;

    const loadFallback = async () => {
      setFallbackLoading(true);
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
        setFallbackRooms([]);
        setFallbackError("Unable to load rooms right now. Please try again shortly.");
        console.error("RoomsShowcase fallback fetch failed:", err);
      } finally {
        setFallbackLoading(false);
      }
    };

    loadFallback();
  }, [property?.roomList, fallbackRooms, fallbackLoading, isLoading]);

  const mappedRooms = useMemo(() => {
    const sourceRooms = (property?.roomList?.length ? property.roomList : fallbackRooms) || [];
    const fallbackImage = property?.imageList?.[0]?.url || "/images/room_3.jpg";
    return sourceRooms.map((room, index) => mapRoomToShowcase(room, index, fallbackImage));
  }, [property?.roomList, fallbackRooms, property?.imageList]);

  const rooms = useMemo(() => mappedRooms.slice(0, 6), [mappedRooms]);
  const total = rooms.length;
  const safeActiveIndex = total > 0 ? activeIndex % total : 0;

  const commitSlide = useCallback(
    (nextIndex: number, direction: "left" | "right") => {
      if (total === 0 || isTransitioning) return;
      setIsTransitioning(true);
      setSlideDirection(direction);
      setTransitionKey((prev) => prev + 1);
      setActiveIndex(nextIndex);

      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = window.setTimeout(() => {
        setIsTransitioning(false);
      }, 620);
    },
    [isTransitioning, total],
  );

  const goNext = useCallback(() => {
    if (total === 0) return;
    const nextIndex = (safeActiveIndex + 1) % total;
    commitSlide(nextIndex, "right");
  }, [commitSlide, safeActiveIndex, total]);

  const goPrev = useCallback(() => {
    if (total === 0) return;
    const prevIndex = (safeActiveIndex - 1 + total) % total;
    commitSlide(prevIndex, "left");
  }, [commitSlide, safeActiveIndex, total]);

  useEffect(() => {
    if (isPaused || total === 0) return;
    const timer = window.setInterval(goNext, 4000);
    return () => window.clearInterval(timer);
  }, [goNext, isPaused, total]);

  const display = useMemo(() => {
    if (total === 0) return [];
    const prevIndex = (safeActiveIndex - 1 + total) % total;
    const nextIndex = (safeActiveIndex + 1) % total;
    return [rooms[prevIndex], rooms[safeActiveIndex], rooms[nextIndex]];
  }, [safeActiveIndex, rooms, total]);

  const counterCurrent = total > 0 ? String(safeActiveIndex + 1).padStart(2, "0") : "00";
  const counterTotal = String(total || 0).padStart(2, "0");

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    };
  }, []);

  useEffect(() => {
    let mm: gsap.MatchMedia | null = null;

    try {
      mm = gsap.matchMedia();
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
            ".rooms-showcase-kicker",
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
          )
            .fromTo(
              ".rooms-showcase-title",
              { yPercent: 105, autoAlpha: 0, filter: "blur(8px)" },
              { yPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.95, ease: "power4.out" },
              "<+0.06",
            )
            .fromTo(
              ".rooms-showcase-counter",
              { y: 10, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" },
              "<",
            )
            .fromTo(
              ".rooms-showcase-stage",
              { y: 24, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.85, ease: "power3.out" },
              "<+0.08",
            )
            .fromTo(
              ".rooms-showcase-actions",
              { y: 14, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" },
              "<+0.04",
            );

          gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              end: "bottom top",
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          }).to(".rooms-center-card .object-cover", { scale: 1.08, yPercent: 6, ease: "none" }, 0);
        }, sectionRef);

        return () => ctx.revert();
      });
      setAnimationError(null);
    } catch (err) {
      setAnimationError("Animation temporarily unavailable.");
      console.error("RoomsShowcase GSAP init failed:", err);
    }

    return () => {
      if (mm) mm.revert();
    };
  }, []);

  useEffect(() => {
    if (total === 0) return;
    const stage = sectionRef.current?.querySelector(".rooms-showcase-stage");
    if (!stage) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = stage.querySelectorAll<HTMLElement>(".rooms-showcase-card");
      const enterFromX = slideDirection === "right" ? 26 : -26;
      const sideOffset = slideDirection === "right" ? 16 : -16;

      gsap.fromTo(
        cards[1],
        { x: enterFromX, y: 12, autoAlpha: 0.65, scale: 0.98 },
        {
          x: 0,
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.58,
          ease: "power3.out",
          overwrite: "auto",
        },
      );

      gsap.fromTo(
        [cards[0], cards[2]],
        { x: sideOffset, y: 10, autoAlpha: 0.45, scale: 0.96 },
        {
          x: 0,
          y: 0,
          autoAlpha: 0.72,
          scale: 0.98,
          duration: 0.52,
          stagger: 0.04,
          ease: "power2.out",
          overwrite: "auto",
        },
      );

      gsap.fromTo(
        stage.querySelector(".rooms-center-card .object-cover"),
        { scale: 1.08 },
        { scale: 1, duration: 0.82, ease: "power2.out", overwrite: "auto" },
      );
      gsap.fromTo(
        stage.querySelectorAll(".rooms-center-card .room-title, .rooms-center-card .room-meta, .rooms-center-card .room-desc, .rooms-center-card .room-tags"),
        { y: 18, autoAlpha: 0, filter: "blur(3px)" },
        {
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.52,
          stagger: 0.06,
          ease: "power3.out",
          overwrite: "auto",
        },
      );
    });
    return () => mm.revert();
  }, [safeActiveIndex, transitionKey, total, slideDirection]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const raf = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [rooms.length, safeActiveIndex, transitionKey]);

  return (
    <section ref={sectionRef} data-no-global-gsap className="bg-white py-20 text-[#1f3c44]">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
          <div className="rooms-showcase-kicker flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.22em] sm:gap-6 sm:text-xs sm:tracking-[0.35em]">
            <span>Rooms &amp; Suites</span>
          </div>
          <span className="rooms-showcase-counter text-sm text-[#1f3c44]/60">
            {counterCurrent} / {counterTotal}
          </span>
        </div>

        <div className="mt-6 overflow-hidden sm:mt-8">
          <h2 className="rooms-showcase-title font-serif text-3xl sm:text-4xl md:text-6xl">Discover our rooms</h2>
        </div>
      </Container>

      {(!mounted || isLoading || fallbackLoading) && (
        <Container>
          <div className="mt-8 rounded-2xl border border-[#1f3c44]/10 bg-[#f7f5f1] p-6 text-center text-sm text-[#1f3c44]/70">
            Loading rooms...
          </div>
        </Container>
      )}

      {mounted && !isLoading && !fallbackLoading && (error || fallbackError) && rooms.length === 0 && (
        <Container>
          <div className="mt-8 rounded-2xl border border-[#1f3c44]/10 bg-[#f7f5f1] p-6 text-center text-sm text-[#1f3c44]/70">
            {fallbackError || error}
          </div>
        </Container>
      )}

      {animationError && (
        <Container>
          <div className="mt-6 rounded-2xl border border-[#1f3c44]/10 bg-[#f7f5f1] p-4 text-center text-xs text-[#1f3c44]/65 sm:text-sm">
            {animationError}
          </div>
        </Container>
      )}

      {mounted && !isLoading && !fallbackLoading && !error && !fallbackError && rooms.length === 0 && (
        <Container>
          <div className="mt-8 rounded-2xl border border-[#1f3c44]/10 bg-[#f7f5f1] p-6 text-center text-sm text-[#1f3c44]/70">
            No rooms available right now.
          </div>
        </Container>
      )}

      {mounted && !isLoading && !fallbackLoading && rooms.length > 0 && (
        <>
          <Container>
            <div
              className="rooms-showcase-stage relative mt-8 lg:mt-10"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="-mx-1 grid w-[calc(100%+0.5rem)] items-stretch gap-1 sm:-mx-2 sm:w-[calc(100%+1rem)] sm:gap-2 lg:mx-auto lg:w-full lg:max-w-[1380px] lg:grid-cols-[1fr_1.45fr_1fr]">
                {display.map((room, index) => {
                  const isCenter = index === 1;
                  return (
                    <RoomShowcaseCard
                      key={`${room.id}-${index}-${isCenter ? transitionKey : safeActiveIndex}`}
                      room={room}
                      className={`transform-gpu transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isCenter
                          ? "rooms-showcase-card rooms-center-card z-10 block scale-100 opacity-100"
                          : "rooms-showcase-card z-0 hidden scale-[0.98] opacity-70 lg:block lg:translate-y-5"
                      }`}
                    />
                  );
                })}
              </div>

              <button
                onClick={goPrev}
                aria-label="Previous room"
                className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#1f3c44]/10 bg-white/90 text-[#1f3c44] shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-[#1f3c44] hover:text-white sm:left-3 sm:h-12 sm:w-12 lg:-left-6"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                onClick={goNext}
                aria-label="Next room"
                className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#1f3c44]/10 bg-white/90 text-[#1f3c44] shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-[#1f3c44] hover:text-white sm:right-3 sm:h-12 sm:w-12 lg:-right-6"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </Container>

          <Container>
            <div className="mt-6 flex justify-center gap-2">
              {rooms.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i === safeActiveIndex) return;
                    commitSlide(i, i > safeActiveIndex ? "right" : "left");
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === safeActiveIndex ? "w-6 bg-[#1f3c44]" : "w-1.5 bg-[#1f3c44]/30"
                  }`}
                  aria-label={`Go to room ${i + 1}`}
                />
              ))}
            </div>

            <div className="rooms-showcase-actions mt-8 flex justify-center sm:mt-10 lg:mt-12">
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
      <style>{`
        .rooms-center-card .object-cover {
          will-change: transform;
        }
      `}</style>
    </section>
  );
}



