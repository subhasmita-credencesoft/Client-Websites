"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { addDays, format } from "date-fns";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AvailabilityCard from "../../../components/features/AvailabilityCard";
import Container from "../../../components/ui/Container";
import PageHero from "../../../components/sections/PageHero";
import { formatPrice } from "../../../lib/format";
import { getRoomDisplayImage } from "../../../lib/roomImages";
import { fetchPropertyAvailability } from "../../../lib/services/propertyService";
import { htmlToText } from "../../../lib/sanitizeHtml";
import type { PropertyApiResponse, RoomItem } from "../../../types/property";
import useErrorHandler from "@/hooks/useErrorHandler";

type SortKey = "title" | "price" | "rating" | "availability";

type ListingRoom = {
  listingId: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  pricePerNight: number;
  capacity: number;
  minimumOccupancy: number;
  size: string;
  bedType: string;
  noOfRooms: number;
  minStay: number;
  maxStay: number;
  facilities: string[];
  rating: number;
  availabilityDate: string;
  noOfAvailable: number;
  noOfBooked: number;
  noOfOnHold: number;
  totalNoRooms: number;
  dailyAvailability: Array<{
    id: string;
    date: string;
    noOfAvailable: number;
    noOfBooked: number;
    noOfOnHold: number;
    totalNoRooms: number;
    status: string;
    restriction: string;
    price: number;
  }>;
  ratePlans: Array<{
    id: string;
    name: string;
    amount: number;
    currencyCode: string;
  }>;
};

const sortLabels: Record<SortKey, string> = {
  title: "Title",
  price: "Price",
  rating: "Rating",
  availability: "Availability date",
};
const defaultVirtualTourUrl =
  "https://www.google.co.in/maps/@18.8173616,73.3047087,3a,75y,352.05h,41.3t/data=!3m7!1e1!3m5!1sCIHM0ogKEICAgICE2OrfkAE!2e10!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAFfmt2ZdcMHANYXL6HTiLhFwc2VFENp9NW0onXfyfiteKnx1vGtri8o3bmnZVw5r_9XUiiS6IW73NveF1JIB8trQ2siI-RkCqMqzGN0J44WlpuzjEXtXcmV8UzeigT-8W69UXnjWJ321yg%3Dw900-h600-k-no-pi48.70007873572015-ya110.76994491714902-ro0-fo100!7i13312!8i6656?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D";
const secondCardVirtualTourUrl =
  "https://www.google.co.in/maps/@18.8171664,73.3046375,3a,90y,125.13h,91.65t/data=!3m8!1e1!3m6!1svk2WvYbxaRcAAAQvxYrSYg!2e0!3e2!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-1.6500000000000057%26panoid%3Dvk2WvYbxaRcAAAQvxYrSYg%26yaw%3D125.13!7i13312!8i6656?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D";

gsap.registerPlugin(ScrollTrigger);

function toSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function normalizeRoom(room: RoomItem, index: number, fallbackImage: string): ListingRoom {
  const rateRows = room.ratesAndAvailabilityDtos || [];
  const ratePlansMap = new Map<string, { id: string; name: string; amount: number; currencyCode: string }>();
  const dailyAvailability = rateRows.map((rate, rateIndex) => {
    const plans = rate.roomRatePlans || [];
    plans.forEach((plan, planIndex) => {
      const key = `${plan.code || plan.name || "plan"}-${planIndex}`;
      const amount = Number(plan.amount ?? 0);
      if (!ratePlansMap.has(key)) {
        ratePlansMap.set(key, {
          id: key,
          name: plan.name || plan.code || "Plan",
          amount,
          currencyCode: plan.currencyCode || "INR",
        });
      }
    });
    return {
      id: `${rate.id || rate.date || rateIndex}`,
      date: rate.date || "",
      noOfAvailable: Number(rate.noOfAvailable ?? 0),
      noOfBooked: Number(rate.noOfBooked ?? 0),
      noOfOnHold: Number(rate.noOfOnHold ?? 0),
      totalNoRooms: Number(rate.totalNoRooms ?? room.noOfRooms ?? 0),
      status: rate.status || "Open",
      restriction: rate.restriction || "None",
      price: Number(rate.price ?? 0),
    };
  });

  const sortedDaily = [...dailyAvailability].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const syntheticDaily =
    sortedDaily.length > 0
      ? sortedDaily
      : [
          {
            id: `${room.id || index}-synthetic`,
            date: "",
            noOfAvailable: Number(room.noOfRooms ?? 0),
            noOfBooked: 0,
            noOfOnHold: 0,
            totalNoRooms: Number(room.noOfRooms ?? 0),
            status: "Open",
            restriction: "None",
            price: Number(room.roomOnlyPrice ?? room.pricePerNight ?? 0),
          },
        ];
  const planPrices = Array.from(ratePlansMap.values())
    .map((plan) => plan.amount)
    .filter((amount) => amount > 0);
  const priceCandidates = [...planPrices, ...syntheticDaily.map((item) => item.price).filter((value) => value > 0)];
  if (Number(room.roomOnlyPrice ?? 0) > 0) {
    priceCandidates.push(Number(room.roomOnlyPrice));
  }
  const minAvailableAcrossDates =
    syntheticDaily.length > 0 ? Math.min(...syntheticDaily.map((item) => item.noOfAvailable)) : 0;
  const firstAvailableDate =
    syntheticDaily.find((item) => item.noOfAvailable > 0)?.date || syntheticDaily[0]?.date || "";
  const image = getRoomDisplayImage(room.name, room.imageList, fallbackImage);
  const rawDescription = htmlToText(room.description);
  const description = rawDescription || "Comfortable stay with resort amenities.";
  const roomName = room.name || "Room";
  const price = priceCandidates.length > 0 ? Math.min(...priceCandidates) : 0;
  const minOccupancy = Number(room.minimumOccupancy ?? 1) || 1;
  const maxOccupancy = Number(room.maximumOccupancy ?? 1) || 1;
  const totalRoomCount = Number(room.noOfRooms ?? 0);
  const available = minAvailableAcrossDates;
  const firstRow = syntheticDaily[0];
  const facilities = (room.roomFacilities || [])
    .map((facility) => facility?.name)
    .filter((value): value is string => Boolean(value))
    .slice(0, 4);
  return {
    listingId: `${room.id || roomName}-${index}`,
    slug: toSlug(roomName),
    name: roomName,
    description,
    image,
    pricePerNight: price,
    capacity: maxOccupancy,
    minimumOccupancy: minOccupancy,
    size: room.size || "Resort Room",
    bedType: maxOccupancy > 3 ? "Multiple Beds" : "1 Bed",
    noOfRooms: totalRoomCount,
    minStay: Number(room.minimumLengthOfStay ?? 0),
    maxStay: Number(room.maximumLengthOfStay ?? 0),
    facilities,
    rating: 3.8 + (index % 4) * 0.3,
    availabilityDate: firstAvailableDate,
    noOfAvailable: available,
    noOfBooked: Number(firstRow?.noOfBooked ?? 0),
    noOfOnHold: Number(firstRow?.noOfOnHold ?? 0),
    totalNoRooms: Number(firstRow?.totalNoRooms ?? totalRoomCount),
    dailyAvailability: syntheticDaily,
    ratePlans:
      ratePlansMap.size > 0
        ? Array.from(ratePlansMap.values())
        : [
            {
              id: `${room.id || roomName}-room-only`,
              name: "Room Only",
              amount: Number(room.roomOnlyPrice ?? room.pricePerNight ?? 0),
              currencyCode: "INR",
            },
          ],
  };
}

function RoomsReservationContent() {
  const { toUserMessage, logError, notifyError } = useErrorHandler();
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<SortKey>("title");
  const [sortOpen, setSortOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [propertyData, setPropertyData] = useState<PropertyApiResponse | null>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const initialCheckIn = searchParams.get("checkIn") ?? format(new Date(), "yyyy-MM-dd");
  const initialCheckOut = searchParams.get("checkOut") ?? format(addDays(new Date(), 1), "yyyy-MM-dd");
  const selectedRoomQuery = (searchParams.get("room") || "").trim().toLowerCase();
  const adultsFromQuery = Number.parseInt(searchParams.get("adults") ?? "0", 10);
  const childrenFromQuery = Number.parseInt(searchParams.get("children") ?? "0", 10);
  const roomsFromQuery = Number.parseInt(searchParams.get("noOfRooms") ?? "1", 10);
  const initialGuests = Math.max(0, (Number.isNaN(adultsFromQuery) ? 0 : adultsFromQuery))
    + Math.max(0, Number.isNaN(childrenFromQuery) ? 0 : childrenFromQuery);
  const totalGuests = initialGuests > 0 ? initialGuests : 1;
  const totalRooms = Number.isNaN(roomsFromQuery) ? 1 : Math.max(1, roomsFromQuery);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!sortRef.current?.contains(event.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    async function loadAvailability() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchPropertyAvailability(
          {
            fromDate: initialCheckIn,
            toDate: initialCheckOut,
            noOfPersons: totalGuests,
            noOfRooms: totalRooms,
          },
          undefined,
          { signal: controller.signal },
        );
        if (mounted) setPropertyData(data);
      } catch (err) {
        if (mounted && (err as Error).name !== "AbortError") {
          logError("Reservation availability fetch failed", err);
          setError(notifyError(err, "Unable to load room availability right now."));
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadAvailability();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [initialCheckIn, initialCheckOut, totalGuests, totalRooms, logError, notifyError, toUserMessage]);

  const fallbackPropertyImage = propertyData?.imageList?.[0]?.url || "/images/room_3.jpg";
  const listingRooms = useMemo(
    () =>
      (propertyData?.roomList || []).map((room, index) =>
        normalizeRoom(room, index, fallbackPropertyImage),
      ),
    [propertyData?.roomList, fallbackPropertyImage],
  );

  const filteredRooms = useMemo(() => {
    if (!selectedRoomQuery) return listingRooms;
    const directMatches = listingRooms.filter((room) => room.slug === selectedRoomQuery);
    if (directMatches.length > 0) return directMatches;
    return listingRooms.filter((room) => room.slug.includes(selectedRoomQuery));
  }, [listingRooms, selectedRoomQuery]);

  const sortedRooms = useMemo(() => {
    const cloned = [...filteredRooms];
    cloned.sort((a, b) => {
      if (sortBy === "title") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.pricePerNight - b.pricePerNight;
      if (sortBy === "rating") return b.rating - a.rating;
      if (!a.availabilityDate || !b.availabilityDate) return b.noOfAvailable - a.noOfAvailable;
      return new Date(a.availabilityDate).getTime() - new Date(b.availabilityDate).getTime();
    });
    return cloned;
  }, [filteredRooms, sortBy]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        });

        tl.fromTo(
          ".rr-kicker",
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" },
        )
          .fromTo(
            ".rr-title",
            { yPercent: 110, autoAlpha: 0, filter: "blur(8px)" },
            { yPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.95, ease: "power4.out" },
            "<+0.05",
          )
          .fromTo(
            ".rr-toolbar",
            { y: 14, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
            "<+0.05",
          );
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".rr-card");
        if (!cards.length) return;

        gsap.fromTo(
          cards,
          {
            y: 36,
            rotateX: 10,
            transformPerspective: 1200,
            transformOrigin: "50% 100%",
            autoAlpha: 0,
          },
          {
            y: 0,
            rotateX: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: ".rr-list",
              start: "top 84%",
              once: true,
            },
          },
        );

        cards.forEach((card) => {
          const image = card.querySelector(".rr-card-image");
          const lines = card.querySelectorAll<HTMLElement>(".rr-card-line");

          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.12, yPercent: 8 },
              {
                scale: 1,
                yPercent: 0,
                ease: "power2.out",
                duration: 1.1,
                scrollTrigger: {
                  trigger: card,
                  start: "top 86%",
                  once: true,
                },
              },
            );
          }

          if (lines.length) {
            gsap.fromTo(
              lines,
              { y: 18, autoAlpha: 0, filter: "blur(6px)" },
              {
                y: 0,
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 0.6,
                stagger: 0.06,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 82%",
                  once: true,
                },
              },
            );
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [sortedRooms.length, isLoading, error]);

  return (
    <>
      <PageHero
        title="Reservation"
        backgroundImage="https://bookonelocal.in/cdn/room_3.jpg"
        backgroundVideo="https://bookonelocal.in/cdn/Curtains_opening_revealing_202603191629.mp4"
        breadcrumb="Home / Reservation"
      />

      <section ref={sectionRef} data-no-global-gsap className="bg-[#f6f3ed] py-12 text-[#133e5a] sm:py-14 md:py-18">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <p className="rr-kicker text-center text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#7b857f] sm:text-[0.72rem]">
              We have selected the best stays for you
            </p>
            <div className="mt-5 overflow-hidden">
              <p className="rr-title mx-auto max-w-4xl text-center font-serif text-[1.6rem] leading-[1.15] text-[#123f5c] sm:text-[1.9rem] md:text-[2.35rem]">
                Discover our beautiful Rooms &amp; Suites with outstanding views of valleys, mountains and
                lake.
              </p>
            </div>
          </div>

          <div className="mt-10 grid items-start gap-8 md:mt-12 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_21rem]">
            <div className="min-w-0">
              <div className="rr-toolbar relative z-30 mb-8 flex flex-col items-center gap-3 border-b border-[#ddd7ca] pb-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                <p className="rr-card-line text-base text-[#6f7d89] sm:text-lg">
                  {isLoading ? "Loading rooms..." : `${sortedRooms.length} Rooms Found`}
                </p>

                <div className="relative z-40 self-center sm:self-auto" ref={sortRef}>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 text-center text-sm uppercase tracking-[0.14em] text-[#6f7d89] sm:justify-end sm:gap-3"
                    onClick={() => setSortOpen((open) => !open)}
                    disabled={sortedRooms.length === 0}
                  >
                    Sort by
                    <span className="font-semibold text-[#4d6172]">{sortLabels[sortBy]}</span>
                    <svg
                      className={`h-4 w-4 transition ${sortOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {sortOpen && (
                    <div className="absolute right-0 top-10 z-50 min-w-52 overflow-hidden rounded-xl border border-[#d6d9dd] bg-white shadow-lg">
                      {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                        <button
                          key={key}
                          type="button"
                          className={`block w-full border-b border-[#eceef0] px-4 py-2.5 text-left text-[0.95rem] last:border-b-0 ${
                            key === sortBy ? "text-[#133e5a]" : "text-[#6f7d89]"
                          }`}
                          onClick={() => {
                            setSortBy(key);
                            setSortOpen(false);
                          }}
                        >
                          {sortLabels[key]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {isLoading && (
                <div className="rounded-2xl border border-[#d6d9dd] bg-white p-6 text-[#6f7d89]">
                  Loading live availability...
                </div>
              )}

              {!isLoading && error && (
                <div role="alert" className="rounded-2xl border border-[#c49a3c]/22 bg-white p-6 text-[#6f7d89]">
                  {error}
                </div>
              )}

              {!isLoading && !error && sortedRooms.length === 0 && (
                <div className="rounded-2xl border border-[#d6d9dd] bg-white p-6 text-[#6f7d89]">
                  No rooms available for {initialCheckIn} to {initialCheckOut}. Please try different dates.
                </div>
              )}

              {!isLoading && !error && sortedRooms.length > 0 && (
                <div className="rr-list grid gap-7">
                  {sortedRooms.map((room, roomIndex) => (
                    <article
                      key={room.listingId}
                      className="rr-card overflow-hidden rounded-[1.8rem] border border-[#ddd7ca] bg-[#fffdf9] shadow-[0_16px_34px_rgba(26,39,46,0.06)] transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(26,39,46,0.12)]"
                    >
                      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
                        <div
                          className="rr-card-image relative h-64 overflow-hidden bg-[#d8d8d8] sm:h-72 md:h-80 lg:h-full lg:min-h-[26rem]"
                          style={{
                            backgroundImage: `url(${room.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/52 via-black/15 to-transparent" />
                          <button
                            type="button"
                            className="absolute left-5 top-5 rounded-full border border-white/55 bg-black/40 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black/55"
                            onClick={() =>
                              window.open(
                                roomIndex === 1 ? secondCardVirtualTourUrl : defaultVirtualTourUrl,
                                "_blank",
                                "noopener,noreferrer",
                              )
                            }
                          >
                            <span className="inline-flex items-center gap-1.5 leading-none">
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-3.5 w-3.5 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M3 12a9 9 0 0 1 14-7" />
                                <polyline points="17 3 17 7 13 7" />
                                <path d="M21 12a9 9 0 0 1-14 7" />
                                <polyline points="7 21 7 17 11 17" />
                              </svg>
                              <span>360° Tour</span>
                            </span>
                          </button>
                          <p className="rr-card-line absolute bottom-5 left-6 pr-6 text-sm font-semibold uppercase tracking-[0.14em] text-white">
                            From{" "}
                            <span className="text-[#e39a50]">
                              {formatPrice(room.pricePerNight).replace(".00", "")}
                            </span>{" "}
                            Per Night
                          </p>
                        </div>

                        <div className="flex min-w-0 flex-col justify-center p-6 sm:p-7">
                          <h3 className="rr-card-line font-serif text-[2.2rem] leading-[0.92] text-[#123f5c] sm:text-[2.6rem]">
                            <Link href={`/rooms/reservation?room=${room.slug}`}>{room.name}</Link>
                          </h3>
                          <div className="rr-card-line mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#7d8692]">
                            <span>{room.size}</span>
                            <span>{room.minimumOccupancy}-{room.capacity} Person</span>
                            <span>{room.bedType}</span>
                          </div>
                          <p className="rr-card-line mt-4 text-[0.96rem] leading-relaxed text-[#123f5c]/85 md:text-[1rem]">
                            {room.description}
                          </p>
                          <div className="rr-card-line mt-4 flex flex-wrap gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-[#7d8692]">
                            <span>Total: {room.totalNoRooms || room.noOfRooms}</span>
                            <span>Available: {room.noOfAvailable}</span>
                            <span>Booked: {room.noOfBooked}</span>
                            <span>On Hold: {room.noOfOnHold}</span>
                          </div>
                          {(room.minStay > 0 || room.maxStay > 0) && (
                            <p className="rr-card-line mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#7d8692]">
                              Stay: {room.minStay || 0} - {room.maxStay || "999"} nights
                            </p>
                          )}
                          {room.facilities.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {room.facilities.map((facility) => (
                                <span
                                  key={facility}
                                  className="rr-card-line rounded-full border border-[#d6d9dd] bg-white/70 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#5d6a76]"
                                >
                                  {facility}
                                </span>
                              ))}
                            </div>
                          )}
                          {room.ratePlans.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {room.ratePlans.map((plan) => (
                                <span
                                  key={plan.id}
                                  className="rr-card-line rounded-full bg-[#ece4d7] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-[#123f5c]"
                                >
                                  {plan.name}: {formatPrice(plan.amount).replace(".00", "")}
                                </span>
                              ))}
                            </div>
                          )}
                          {/* <div className="mt-6">
                            <Link
                              href=""
                              className="inline-flex h-10 items-center rounded-full border border-[#c9c1b2] px-5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#123f5c] transition hover:bg-[#f1ece3]"
                            >
                              Reserve now
                            </Link>
                          </div> */}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <AvailabilityCard
              initialCheckIn={initialCheckIn}
              initialCheckOut={initialCheckOut}
              initialGuests={initialGuests}
            />
          </div>
        </Container>
      </section>
    </>
  );
}

export default function RoomsReservationPage() {
  return (
    <Suspense fallback={<section className="min-h-screen bg-[#f2f1ec]" />}>
      <RoomsReservationContent />
    </Suspense>
  );
}

