"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AvailabilityCard from "../../../components/features/AvailabilityCard";
import Container from "../../../components/ui/Container";
import rooms from "../../../data/rooms";
import { formatPrice } from "../../../lib/format";

type SortKey = "title" | "price" | "rating" | "availability";

type ListingRoom = (typeof rooms)[number] & {
  listingId: string;
  rating: number;
  availabilityDate: string;
};

const listingRooms: ListingRoom[] = [...rooms, ...rooms].map((room, index) => ({
  ...room,
  listingId: `${room.id}-${index}`,
  rating: 3.8 + (index % 4) * 0.3,
  availabilityDate: `2026-03-${String(12 + index).padStart(2, "0")}`,
}));

const sortLabels: Record<SortKey, string> = {
  title: "Title",
  price: "Price",
  rating: "Rating",
  availability: "Availability date",
};

function RoomsReservationContent() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<SortKey>("title");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const initialCheckIn = searchParams.get("checkIn") ?? "";
  const initialCheckOut = searchParams.get("checkOut") ?? "";
  const adultsFromQuery = Number.parseInt(searchParams.get("adults") ?? "0", 10);
  const childrenFromQuery = Number.parseInt(searchParams.get("children") ?? "0", 10);
  const initialGuests = Math.max(0, (Number.isNaN(adultsFromQuery) ? 0 : adultsFromQuery))
    + Math.max(0, Number.isNaN(childrenFromQuery) ? 0 : childrenFromQuery);

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
    const cloned = [...listingRooms];
    cloned.sort((a, b) => {
      if (sortBy === "title") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.pricePerNight - b.pricePerNight;
      if (sortBy === "rating") return b.rating - a.rating;
      return new Date(a.availabilityDate).getTime() - new Date(b.availabilityDate).getTime();
    });
    return cloned;
  }, [sortBy]);

  return (
    <>
      <section className="relative min-h-[62vh] overflow-hidden text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/room_4.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/46" />
        <Container className="relative flex min-h-[62vh] flex-col items-center justify-center text-center">
          <h1 className="font-serif text-4xl md:text-6xl">Rooms Reservation</h1>
          <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-white/90">
            Home / Rooms Reservation
          </p>
        </Container>
      </section>

      <section className="bg-[#f2f1ec] py-16 text-[#133e5a]">
        <Container>
          <p className="mx-auto max-w-4xl text-center text-xl leading-relaxed md:text-[2.4rem]">
            Discover our beautiful Rooms &amp; Suites with outstanding views of valleys, mountains and
            lake.
          </p>

          <div className="mt-14 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_21rem]">
            <div>
              <div className="mb-8 flex items-center justify-between">
                <p className="text-lg text-[#6f7d89]">{sortedRooms.length} Rooms Found</p>

                <div className="relative" ref={sortRef}>
                  <button
                    type="button"
                    className="flex items-center gap-3 text-lg text-[#6f7d89]"
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

              <div className="grid gap-8 md:grid-cols-2">
                {sortedRooms.map((room) => (
                  <article key={room.listingId}>
                    <div
                      className="relative h-80 overflow-hidden rounded-2xl bg-[#d8d8d8]"
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
                      {room.size} - 1-{room.capacity} Person -{" "}
                      {room.bedType.includes("King") ? "2 Beds" : "1 Bed"}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-[#123f5c] md:text-[1.15rem]">
                      {room.description}
                    </p>
                  </article>
                ))}
              </div>
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
