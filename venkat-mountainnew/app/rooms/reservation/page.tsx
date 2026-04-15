"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AvailabilityCard from "../../../components/features/AvailabilityCard";
import Container from "../../../components/ui/Container";
import { availabilityRooms } from "../../../data/hotelAvailability";
import { formatPrice } from "../../../lib/format";
import { roomDetails } from "@/lib/site-data";

type SortKey = "title" | "price" | "occupancy" | "availability";

type ListingRoom = {
  listingId: string;
  id: number;
  slug: string;
  name: string;
  summary: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  size: string;
  bedType: string;
  image: string;
  availableRooms: number;
};

const listingRooms: ListingRoom[] = availabilityRooms.map((room) => {
  const roomDetail = roomDetails.find((item) => item.slug === room.slug);

  return {
    listingId: String(room.id),
    id: room.id,
    slug: room.slug,
    name: room.name,
    summary: roomDetail?.summary ?? "Comfortable stay experience aligned with the estate hospitality flow.",
    description:
      roomDetail?.description[0] ??
      "A thoughtfully prepared stay option with practical comforts, clean interiors, and event-friendly convenience.",
    pricePerNight: room.roomOnlyPrice,
    capacity: room.maximumOccupancy,
    size: roomDetail?.size ?? "Premium layout",
    bedType: roomDetail?.bedding ?? "Comfort bedding",
    image: room.image,
    availableRooms: room.noOfRooms,
  };
});

const sortLabels: Record<SortKey, string> = {
  title: "Title",
  price: "Price",
  occupancy: "Occupancy",
  availability: "Available rooms",
};

function RoomsReservationContent() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<SortKey>("title");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const initialCheckIn = searchParams.get("fromDate") ?? searchParams.get("checkIn") ?? "";
  const initialCheckOut = searchParams.get("toDate") ?? searchParams.get("checkOut") ?? "";
  const guestsFromQuery = Number.parseInt(searchParams.get("noOfPersons") ?? "0", 10);
  const adultsFromLegacyQuery = Number.parseInt(searchParams.get("adults") ?? "0", 10);
  const childrenFromLegacyQuery = Number.parseInt(searchParams.get("children") ?? "0", 10);
  const selectedRoom = searchParams.get("room") ?? "";
  const initialGuests =
    Math.max(0, Number.isNaN(guestsFromQuery) ? 0 : guestsFromQuery) ||
    Math.max(0, (Number.isNaN(adultsFromLegacyQuery) ? 0 : adultsFromLegacyQuery))
      + Math.max(0, Number.isNaN(childrenFromLegacyQuery) ? 0 : childrenFromLegacyQuery);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!sortRef.current?.contains(event.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const sortedRooms = useMemo(() => {
    const filtered = listingRooms.filter((room) => {
      const matchesRoom = selectedRoom ? room.slug === selectedRoom : true;
      const matchesGuests = initialGuests > 0 ? room.capacity >= initialGuests : true;
      return matchesRoom && matchesGuests;
    });

    const cloned = [...filtered];
    cloned.sort((a, b) => {
      if (sortBy === "title") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.pricePerNight - b.pricePerNight;
      if (sortBy === "occupancy") return b.capacity - a.capacity;
      return b.availableRooms - a.availableRooms;
    });
    return cloned;
  }, [initialGuests, selectedRoom, sortBy]);

  return (
    <>
      <section className="relative min-h-[42vh] overflow-hidden text-white sm:min-h-[50vh] md:min-h-[62vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/room_4.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/46" />
        <Container className="relative flex min-h-[62vh] flex-col items-center justify-center text-center">
         <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl">Rooms Reservation</h1>
          <p className="mt-4 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/90 sm:mt-5 sm:text-[0.7rem] sm:tracking-[0.35em]">
            Home / Rooms Reservation
          </p>
        </Container>
      </section>

      <section className="bg-[#f2f1ec] py-10 text-[#133e5a] sm:py-12 md:py-16">
        <Container>
         <p className="mx-auto max-w-4xl text-center text-[1.15rem] leading-relaxed sm:text-[1.45rem] md:text-[2.4rem]">
            Discover our beautiful Rooms &amp; Suites with outstanding views of valleys, mountains and
            lake.
          </p>

         <div className="mt-10 grid items-start gap-8 md:mt-12 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_21rem]">
            <div>
             <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
               <p className="text-base text-[#6f7d89] sm:text-lg">{sortedRooms.length} Rooms Found</p>

                <div className="relative" ref={sortRef}>
                  <button
                    type="button"
                    className="flex items-center gap-2 text-base text-[#6f7d89] sm:gap-3 sm:text-lg"
                    onClick={() => setSortOpen((open) => !open)}
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
                    <div className="absolute right-0 top-10 z-20 min-w-52 overflow-hidden rounded-xl border border-[#d6d9dd] bg-white shadow-lg">
                      {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                        <button
                          key={key}
                          type="button"
                          className={`block w-full border-b border-[#eceef0] px-4 py-2.5 text-left text-[1.08rem] last:border-b-0 ${
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

             <div className="grid gap-8 lg:grid-cols-2">
                {sortedRooms.map((room) => (
                  <article key={room.listingId}>
                    <div
                      className="relative h-64 overflow-hidden rounded-2xl bg-[#d8d8d8] sm:h-72 md:h-80"
                      style={{
                        backgroundImage: `url(${room.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/52 via-black/15 to-transparent" />
                      <p className="absolute bottom-5 left-6 text-sm font-semibold uppercase tracking-[0.14em] text-white">
                        From{" "}
                        <span className="text-[#e39a50]">
                          {formatPrice(room.pricePerNight).replace(".00", "")}
                        </span>{" "}
                        Per Night
                      </p>
                    </div>

                    <h3 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
                      <Link href={`/rooms/${room.slug}`}>{room.name}</Link>
                    </h3>
                    <p className="mt-2 text-[0.82rem] font-semibold uppercase tracking-[0.24em] text-[#7d8692]">
                      {room.size} - Up to {room.capacity} Guest{room.capacity > 1 ? "s" : ""} - {room.availableRooms} Room{room.availableRooms > 1 ? "s" : ""} Left
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-[#123f5c] md:text-[1.15rem]">
                      {room.description}
                    </p>
                  </article>
                ))}
                {sortedRooms.length === 0 ? (
                  <div className="rounded-2xl border border-[#d6d9dd] bg-white p-8 text-[#123f5c] shadow-sm lg:col-span-2">
                    <h3 className="font-serif text-3xl">No rooms match this search</h3>
                    <p className="mt-3 text-base leading-7 text-[#6f7d89]">
                      Try changing the dates or reducing the guest count to see more availability options.
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            <AvailabilityCard
              initialCheckIn={initialCheckIn}
              initialCheckOut={initialCheckOut}
              initialGuests={initialGuests}
              initialRoom={selectedRoom}
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
