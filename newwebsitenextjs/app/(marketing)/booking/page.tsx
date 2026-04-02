"use client";

import Image from "next/image";
import { Suspense, useMemo, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { buildDirectBookingEngineUrl } from "@/lib/constants/booking";
import { stayCardsPrimary, stayCardsSecondary } from "@/lib/data/content/mountain-content";

function getTodayDateString(offsetDays = 0) {
  const now = new Date();
  now.setDate(now.getDate() + offsetDays);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function BookingPageContent() {
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const searchParams = useSearchParams();
  const roomCatalog = useMemo(() => [...stayCardsPrimary, ...stayCardsSecondary], []);
  const selectedRoomFromQuery = searchParams.get("room") ?? "";
  const selectedCheckInFromQuery = searchParams.get("checkIn") ?? getTodayDateString();
  const selectedCheckOutFromQuery = searchParams.get("checkOut") ?? getTodayDateString(1);
  const selectedGuestsFromQuery = Number(searchParams.get("guests") ?? "2");
  const initialRoomValue = roomCatalog.some((room) => room.title === selectedRoomFromQuery) ? selectedRoomFromQuery : "";
  const todayDate = getTodayDateString();
  const tomorrowDate = getTodayDateString(1);

  const [checkIn, setCheckIn] = useState(selectedCheckInFromQuery || todayDate);
  const [checkOut, setCheckOut] = useState(selectedCheckOutFromQuery || tomorrowDate);
  const [guestCount, setGuestCount] = useState(Number.isFinite(selectedGuestsFromQuery) && selectedGuestsFromQuery > 0 ? selectedGuestsFromQuery : 2);
  const [roomValue, setRoomValue] = useState(initialRoomValue);
  const [roomFilterQuery, setRoomFilterQuery] = useState("");

  const selectedRoomCard = useMemo(
    () => roomCatalog.find((room) => room.title === roomValue) ?? null,
    [roomCatalog, roomValue],
  );

  const activeRoomCard = selectedRoomCard ?? roomCatalog[0] ?? null;
  const filteredRooms = useMemo(() => {
    const query = roomFilterQuery.trim().toLowerCase();
    if (!query) return roomCatalog;
    return roomCatalog.filter((room) =>
      `${room.title} ${room.description} ${room.tariff} ${room.packagePrice}`.toLowerCase().includes(query),
    );
  }, [roomCatalog, roomFilterQuery]);
  const isFormComplete = Boolean(checkIn && checkOut && guestCount > 0 && roomValue);
  const bookingEngineHref = useMemo(
    () =>
      buildDirectBookingEngineUrl({
        checkIn,
        checkOut,
        guests: guestCount,
        rooms: 1,
      }),
    [checkIn, checkOut, guestCount],
  );
  const enquiryContactHref = useMemo(() => {
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: String(guestCount),
      room: roomValue,
    });

    return `/contact?${params.toString()}`;
  }, [checkIn, checkOut, guestCount, roomValue]);
  const decrementGuestCount = () => {
    setGuestCount((current) => Math.max(1, current - 1));
  };
  const incrementGuestCount = () => {
    setGuestCount((current) => current + 1);
  };
  const handleBookingRedirect = () => {
    if (!isFormComplete) return;

    window.location.assign(bookingEngineHref);
  };

  if (!isMounted) {
    return <BookingPageFallback />;
  }

  return (
    <main className="relative bg-[#11100e] text-white">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="noise-overlay" />
      </div>
      <SiteHeader />
      <section
        className="relative min-h-[68svh] overflow-hidden pt-32 md:min-h-[72svh] md:pt-44"
        data-section-id="booking-hero"
      >
        <div className="absolute inset-0">
          <Image
            src={activeRoomCard?.image ?? "/images/DSC08717.avif"}
            alt={activeRoomCard?.title ?? "Celebration planning at The Mountain, Karjat"}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.44)_40%,rgba(0,0,0,0.76)_100%)]" />
        <div className="absolute inset-x-[8%] top-24 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent md:top-28" />

        <div className="relative z-10 mx-auto flex min-h-[68svh] max-w-[96rem] items-end px-4 pb-10 md:min-h-[72svh] md:px-12 md:pb-16">
          <div className="max-w-4xl" data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d6b07a]" data-reveal-child>
              Availability Planning
            </p>
            <h1
              className="mt-4 text-balance text-[clamp(40px,5vw,74px)] leading-[0.96] text-[#f6ead8]"
              data-section-title
            >
              Check Availability For Your Dates
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/88 md:text-xl" data-reveal-child>
              Choose your dates, guest count, and preferred room category to continue into the direct booking engine for The Mountain by Redwings.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[96rem] px-4 py-8 md:px-12 md:py-14">
        <div className="grid gap-8 xl:grid-cols-[minmax(22rem,0.76fr)_minmax(0,1.24fr)] xl:items-start">
          <div className="xl:sticky xl:top-28 xl:self-start">
            <div className="rounded-[1.75rem] border border-[#c9a46e]/22 bg-[linear-gradient(180deg,#17120f_0%,#1d1612_100%)] p-5 shadow-[0_18px_36px_rgba(8,16,11,0.22)] md:p-6">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a46e]">
                  Availability Planner
                </p>
                <h2 className="mt-2 text-[1.8rem] text-[#f4eee2] md:text-[2rem]">Plan your stay</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/72">
                  Choose dates, guests, and the room category you prefer. This keeps the booking journey aligned with the property's actual room inventory.
                </p>
              </div>

              <div className="grid gap-3.5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Preferred check-in
                  </span>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="rounded-[1.05rem] border border-white/10 bg-[#120e0b] px-4 py-3 text-[0.95rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Preferred check-out
                  </span>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="rounded-[1.05rem] border border-white/10 bg-[#120e0b] px-4 py-3 text-[0.95rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50"
                  />
                </label>
                <div className="grid gap-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Total guests
                  </span>
                  <div className="flex items-center rounded-[1.05rem] border border-white/10 bg-[#120e0b] px-2 py-2">
                    <button
                      type="button"
                      onClick={decrementGuestCount}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg text-white transition-colors hover:border-[#c9a46e]/40 hover:text-[#f6ead8] disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={guestCount <= 1}
                      aria-label="Decrease guest count"
                    >
                      -
                    </button>
                    <div className="flex-1 text-center">
                      <p className="text-[1.05rem] font-semibold text-white">{guestCount}</p>
                      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/45">Guests</p>
                    </div>
                    <button
                      type="button"
                      onClick={incrementGuestCount}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg text-white transition-colors hover:border-[#c9a46e]/40 hover:text-[#f6ead8]"
                      aria-label="Increase guest count"
                    >
                      +
                    </button>
                  </div>
                </div>
                <label className="grid gap-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Stay option
                  </span>
                  <select
                    required
                    value={roomValue}
                    onChange={(e) => setRoomValue(e.target.value)}
                    className="rounded-[1.05rem] border border-white/10 bg-[#120e0b] px-4 py-3 text-[0.95rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50"
                  >
                    <option value="" disabled>
                      Select stay option
                    </option>
                    {roomCatalog.map((room) => (
                      <option key={room.title} value={room.title} className="text-black">
                        {room.title}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                type="button"
                onClick={handleBookingRedirect}
                disabled={!isFormComplete}
                className="mt-6 inline-flex w-full items-center justify-center border border-[#c8a871] bg-[#c8a871] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* ── RIGHT: SCROLLABLE CONTENT ────────────────────────────────── */}
          <div className="space-y-8">

            {/* Inquiry Snapshot */}
            <div className="rounded-[1.5rem] border border-[#c9a46e]/22 bg-[linear-gradient(180deg,#16110e_0%,#1b1511_100%)] p-4 shadow-[0_18px_36px_rgba(8,16,11,0.2)] md:p-5">
              <div className="grid gap-4 xl:grid-cols-[18rem_minmax(0,1fr)] xl:items-start">
                <div className="relative overflow-hidden rounded-[1.15rem] border border-white/10 bg-[#15100d] xl:sticky xl:top-28">
                  <div className="relative aspect-[4/3] min-h-[12rem] w-full md:min-h-[15rem]">
                  <Image
                    src={activeRoomCard?.image ?? "/images/DSC08717.avif"}
                    alt={activeRoomCard?.title ?? "Selected room"}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1280px) 100vw, 18rem"
                  />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Booking Snapshot
                  </p>
                  <h2 className="mt-2 text-[1.55rem] leading-tight text-[#f6ead8] md:text-[1.75rem]">
                    {activeRoomCard?.title ?? "Choose a stay option to view planning details"}
                  </h2>
                  <p className="mt-2 max-w-3xl text-[0.92rem] leading-relaxed text-white/85">
                    {activeRoomCard?.description ??
                      "Select a stay option to see tariff, room details, and the booking summary for your preferred stay."}
                  </p>

                  <div className="mt-4 rounded-[1.05rem] border border-white/10 bg-[linear-gradient(180deg,#2a221b_0%,#342a22_100%)] px-4 py-3.5">
                    <div className="grid gap-x-6 gap-y-3 md:grid-cols-2">
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Room Tariff</p>
                        <p className="mt-1 text-[1rem] leading-snug text-white md:text-[1.1rem]">
                          {activeRoomCard?.tariff ?? "Select room"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Booking Note</p>
                        <p className="mt-1 text-[1rem] leading-snug text-white md:text-[1.1rem]">
                          {activeRoomCard?.packagePrice ?? "Select package"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Property</p>
                        <p className="mt-1 text-[1rem] leading-snug text-white md:text-[1.1rem]">
                          The Mountain by Redwings
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Selected Stay</p>
                        <p className="mt-1 text-[1rem] leading-snug text-white md:text-[1.1rem]">
                          {activeRoomCard?.title ?? "Select stay"}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-white/78">
                          Premium room-led stay booking powered directly by the property booking engine.
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Booking Engine</p>
                        <p className="mt-1 text-sm text-white md:text-[0.96rem]">Direct property booking</p>
                        <p className="mt-1 text-sm text-white md:text-[0.96rem]">Live availability for selected dates</p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Guest Count</p>
                        <p className="mt-1 text-sm text-white/86">{guestCount}</p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Check-In</p>
                        <p className="mt-1 text-sm text-white/86">{checkIn || "Not selected yet"}</p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Check-Out</p>
                        <p className="mt-1 text-sm text-white/86">{checkOut || "Not selected yet"}</p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Room Based Booking</p>
                        <p className="mt-1 text-sm text-white/86">Selected room category will continue into booking</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-[1.4rem] border border-[#c9a46e]/22 bg-[linear-gradient(180deg,#17120f_0%,#1d1612_100%)] p-5 shadow-[0_18px_36px_rgba(8,16,11,0.18)]">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Room Selection</p>
                <p className="mt-3 text-sm leading-relaxed text-white/82 md:text-base">
                  Select the room category that best fits your stay plan, then continue with the dates and guest count already chosen.
                </p>
              </article>
              <article className="rounded-[1.4rem] border border-[#c9a46e]/22 bg-[linear-gradient(180deg,#17120f_0%,#1d1612_100%)] p-5 shadow-[0_18px_36px_rgba(8,16,11,0.18)]">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Property Fit</p>
                <p className="mt-3 text-sm leading-relaxed text-white/82 md:text-base">
                  The page is now aligned around the property's actual room inventory and premium stay experience rather than package-led planning.
                </p>
              </article>
              <article className="rounded-[1.4rem] border border-[#c9a46e]/22 bg-[linear-gradient(180deg,#17120f_0%,#1d1612_100%)] p-5 shadow-[0_18px_36px_rgba(8,16,11,0.18)]">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Live Availability</p>
                <p className="mt-3 text-sm leading-relaxed text-white/82 md:text-base">
                  Book Now sends the selected dates and guests into the direct booking engine so availability is checked against the property flow.
                </p>
              </article>
            </div>

            <div className="rounded-[1.5rem] border border-[#c9a46e]/22 bg-[linear-gradient(180deg,#16110e_0%,#1b1511_100%)] p-5 shadow-[0_18px_36px_rgba(8,16,11,0.2)] md:p-6">
              <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Planning Overview</p>
                  <h3 className="mt-3 text-2xl leading-tight text-[#f6ead8] md:text-[2rem]">
                    Premium room selection reviewed together with your stay dates
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">
                    This page helps guests compare room categories in one place, then continue directly into booking with the selected stay details.
                  </p>
                </div>
                <div className="grid gap-3">
                  <div className="rounded-[1.1rem] border border-white/10 bg-[linear-gradient(180deg,#241d17_0%,#2e241d_100%)] px-4 py-3 text-sm leading-relaxed text-white/82 md:text-base">
                    Standard Room: practical premium stay with essential comfort
                  </div>
                  <div className="rounded-[1.1rem] border border-white/10 bg-[linear-gradient(180deg,#241d17_0%,#2e241d_100%)] px-4 py-3 text-sm leading-relaxed text-white/82 md:text-base">
                    Cliff View Room and Family Room: stronger room-led premium stay options
                  </div>
                  <div className="rounded-[1.1rem] border border-white/10 bg-[linear-gradient(180deg,#241d17_0%,#2e241d_100%)] px-4 py-3 text-sm leading-relaxed text-white/82 md:text-base">
                    Glass Jacuzi Room and Bunglow: larger-format or more distinctive premium choices
                  </div>
                </div>
              </div>
            </div>

            {/* Stay Options */}
            <div>
              <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="text-2xl text-[#f4eee2] md:text-3xl">Stay Options For Guests</h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[#c9a46e]">
                    {filteredRooms.length} {filteredRooms.length === 1 ? "stay option" : "stay options"} shown
                  </p>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/72 md:text-base">
                    These room categories are aligned with the current property inventory so the booking flow stays room-based and premium in presentation.
                  </p>
                </div>
                <label className="block w-full md:max-w-xs">
                  <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">Filter stay options</span>
                  <input
                    type="text"
                    value={roomFilterQuery}
                    onChange={(e) => setRoomFilterQuery(e.target.value)}
                    placeholder="Search stay, tariff, guest type..."
                    className="w-full rounded-[1.05rem] border border-white/10 bg-[#20362c] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#c9a46e]/50"
                  />
                </label>
              </div>

              <div className="grid gap-6">
                {filteredRooms.map((room) => (
                  <article
                    key={room.title}
                    className={`grid overflow-hidden rounded-[1.8rem] border shadow-[0_18px_40px_rgba(8,16,11,0.14)] md:grid-cols-[22rem_1fr] ${
                      room.title === roomValue
                        ? "border-[#d7b17c]/55 bg-[linear-gradient(180deg,#1b1511_0%,#231a15_100%)]"
                        : "border-white/10 bg-[linear-gradient(180deg,#15110e_0%,#1c1511_100%)]"
                    }`}
                  >
                    <div className="relative h-[14rem] md:h-full">
                      <Image
                        src={room.image}
                        alt={room.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 22rem"
                      />
                    </div>
                    <div className="p-6 md:p-7">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-[#c9a46e]">Stay Details</p>
                          <h4 className="mt-2 text-2xl leading-tight text-white md:text-[2rem]">
                            {room.title}
                          </h4>
                          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/82 md:text-base">
                            {room.description}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setRoomValue(room.title)}
                          className="shrink-0 rounded-full border border-[#c9a46e]/40 bg-[linear-gradient(180deg,#3a2d22_0%,#473529_100%)] px-5 py-2 text-xs uppercase tracking-[0.18em] text-[#f6e2c0]"
                        >
                          Select Stay
                        </button>
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div className="rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,#2a221b_0%,#342a22_100%)] px-4 py-4">
                          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#c9a46e]">Tariff</p>
                          <p className="mt-2 text-lg leading-snug text-white md:text-xl">{room.tariff}</p>
                        </div>
                        <div className="rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,#2a221b_0%,#342a22_100%)] px-4 py-4">
                          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#c9a46e]">Stay + Meals</p>
                          <p className="mt-2 text-lg leading-snug text-white md:text-xl">{room.packagePrice}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
                {filteredRooms.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-[#182920] px-5 py-6 text-sm text-white/70">
                    No room options matched your filter.
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#c9a46e]/22 bg-[linear-gradient(180deg,#16110e_0%,#1b1511_100%)] p-5 shadow-[0_18px_36px_rgba(8,16,11,0.2)] md:p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Booking Terms</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-[1.1rem] border border-white/10 bg-[linear-gradient(180deg,#241d17_0%,#2e241d_100%)] px-4 py-3 text-sm leading-relaxed text-white/82 md:text-base">
                  50% advance is required to block dates, with the remaining 50% due before check-in.
                </div>
                <div className="rounded-[1.1rem] border border-white/10 bg-[linear-gradient(180deg,#241d17_0%,#2e241d_100%)] px-4 py-3 text-sm leading-relaxed text-white/82 md:text-base">
                  Final billing is based on confirmed dates, room selection, and guest count in the booking engine.
                </div>
                <div className="rounded-[1.1rem] border border-white/10 bg-[linear-gradient(180deg,#241d17_0%,#2e241d_100%)] px-4 py-3 text-sm leading-relaxed text-white/82 md:text-base">
                  Check-in and check-out selections from this planner are carried into the direct booking page.
                </div>
                <div className="rounded-[1.1rem] border border-white/10 bg-[linear-gradient(180deg,#241d17_0%,#2e241d_100%)] px-4 py-3 text-sm leading-relaxed text-white/82 md:text-base">
                  Government ID and property rules continue to apply for all staying guests.
                </div>
              </div>
            </div>
          </div>
          {/* ── END RIGHT COLUMN ─────────────────────────────────────────── */}

        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function BookingPageFallback() {
  return (
    <main className="relative bg-[#2d4a3e] text-white">
      <div className="noise-overlay" />
      <SiteHeader />
      <section className="mx-auto max-w-[96rem] px-6 pb-12 pt-44 md:px-12 md:pt-48">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">Booking Enquiry</p>
          <h1 className="mt-5 text-4xl md:text-6xl">Plan Your Stay Or Celebration</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">
            Share your dates, guest count, stay preferences, and package direction. The Mountain team will confirm
            availability and guide the next step toward your booking quotation.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-[96rem] px-6 pb-20 md:px-12">
        <div className="glass-panel rounded-[2rem] p-7 text-white/75 md:p-10">Loading inquiry details...</div>
      </section>
      <SiteFooter />
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<BookingPageFallback />}>
      <BookingPageContent />
    </Suspense>
  );
}
