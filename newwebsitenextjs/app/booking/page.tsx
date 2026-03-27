"use client";

import Image from "next/image";
import { Suspense, useMemo, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { offersCards, stayCardsPrimary, stayCardsSecondary } from "@/lib/data/mountain-content";

const realPackageTitles = ["Classic Package", "Signature Package", "Premium Luxe Package"] as const;

const packagePricing: Record<string, { weekday: string; weekend: string; highlight: string }> = {
  "Classic Package": {
    weekday: "Rs. 4,500 / person",
    weekend: "Rs. 5,500 / person",
    highlight: "5 meals + stay + venue access",
  },
  "Signature Package": {
    weekday: "Rs. 5,500 / person",
    weekend: "Rs. 6,500 / person",
    highlight: "Classic package + 2 extra starters + 1 extra gravy",
  },
  "Premium Luxe Package": {
    weekday: "Rs. 6,500 / person",
    weekend: "Rs. 7,500 / person",
    highlight: "Signature package + 2 live counters",
  },
};

function getTodayDateString() {
  const now = new Date();
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
  const packageCatalog = useMemo(
    () => offersCards.filter((card) => realPackageTitles.includes(card.title as (typeof realPackageTitles)[number])),
    [],
  );
  const selectedRoomFromQuery = searchParams.get("room") ?? "";
  const selectedPackageFromQuery = searchParams.get("package") ?? "";
  const selectedOffer = searchParams.get("offer") ?? "";
  const initialRoomValue = roomCatalog.some((room) => room.title === selectedRoomFromQuery) ? selectedRoomFromQuery : "";
  const initialPackageValue = packageCatalog.some((pkg) => pkg.title === selectedPackageFromQuery)
    ? selectedPackageFromQuery
    : "";
  const todayDate = getTodayDateString();

  const [checkIn, setCheckIn] = useState(todayDate);
  const [checkOut, setCheckOut] = useState(todayDate);
  const [guestCount, setGuestCount] = useState(0);
  const [roomValue, setRoomValue] = useState(initialRoomValue);
  const [packageValue, setPackageValue] = useState(initialPackageValue);
  const [roomFilterQuery, setRoomFilterQuery] = useState("");
  const [packageFilterQuery, setPackageFilterQuery] = useState("");

  const selectedRoomCard = useMemo(
    () => roomCatalog.find((room) => room.title === roomValue) ?? null,
    [roomCatalog, roomValue],
  );
  const selectedPackageCard = useMemo(
    () => packageCatalog.find((pkg) => pkg.title === packageValue) ?? null,
    [packageCatalog, packageValue],
  );

  const activeRoomCard = selectedRoomCard ?? roomCatalog[0] ?? null;
  const activePackageCard = selectedPackageCard ?? packageCatalog[0] ?? null;
  const activePackagePricing = activePackageCard ? packagePricing[activePackageCard.title] : null;
  const filteredRooms = useMemo(() => {
    const query = roomFilterQuery.trim().toLowerCase();
    if (!query) return roomCatalog;
    return roomCatalog.filter((room) =>
      `${room.title} ${room.description} ${room.tariff} ${room.packagePrice}`.toLowerCase().includes(query),
    );
  }, [roomCatalog, roomFilterQuery]);
  const filteredPackages = useMemo(() => {
    const query = packageFilterQuery.trim().toLowerCase();
    if (!query) return packageCatalog;
    return packageCatalog.filter((pkg) =>
      `${pkg.title} ${pkg.subtitle} ${pkg.description}`.toLowerCase().includes(query),
    );
  }, [packageCatalog, packageFilterQuery]);
  const decrementGuestCount = () => {
    setGuestCount((current) => Math.max(0, current - 1));
  };
  const incrementGuestCount = () => {
    setGuestCount((current) => current + 1);
  };

  if (!isMounted) {
    return <BookingPageFallback />;
  }

  return (
    <main className="relative bg-[#2d4a3e] text-white">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="noise-overlay" />
      </div>
      <SiteHeader />
      <section
        className="relative min-h-[72svh] overflow-hidden pt-40 md:pt-44"
        data-section-id="booking-hero"
      >
        <div className="absolute inset-0">
          <Image
            src={activeRoomCard?.image ?? "/images/DSC08717.avif"}
            alt={activeRoomCard?.title ?? "Booking hero"}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.44)_40%,rgba(0,0,0,0.76)_100%)]" />
        <div className="absolute inset-x-[8%] top-28 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[72svh] max-w-[96rem] items-end px-6 pb-12 md:px-12 md:pb-16">
          <div className="max-w-4xl" data-reveal>
            <p
              className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d6b07a]"
              data-reveal-child
            >
              Booking
            </p>
            <h1
              className="mt-4 text-balance text-[clamp(40px,5vw,74px)] leading-[0.96] text-[#f6ead8]"
              data-section-title
            >
              {activeRoomCard?.title ?? "Request A Booking"}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/88 md:text-xl" data-reveal-child>
              {activeRoomCard?.description ??
                "Share your dates, guest count, room type, and package preference. The Mountain team will confirm availability and respond with the next steps."}
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[96rem] px-6 py-10 md:px-12 md:py-14">
        <div className="grid gap-8 xl:grid-cols-[minmax(22rem,0.76fr)_minmax(0,1.24fr)] xl:items-start">
          <div className="xl:sticky xl:top-28 xl:self-start">
            <form className="glass-panel rounded-[1.75rem] border border-[#c9a46e]/20 p-5 shadow-[0_18px_36px_rgba(8,16,11,0.14)] md:p-6">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a46e]">
                  Booking Form
                </p>
                <h2 className="mt-2 text-[1.8rem] text-[#f4eee2] md:text-[2rem]">Plan your stay</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/72">
                  Choose your dates, guests, room type, and package. This panel stays visible while you
                  scroll.
                </p>
              </div>

              <div className="grid gap-3.5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Check-in
                  </span>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="rounded-[1.05rem] border border-white/10 bg-black/20 px-4 py-3 text-[0.95rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Check-out
                  </span>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="rounded-[1.05rem] border border-white/10 bg-black/20 px-4 py-3 text-[0.95rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50"
                  />
                </label>
                <div className="grid gap-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Guest count
                  </span>
                  <div className="flex items-center rounded-[1.05rem] border border-white/10 bg-black/20 px-2 py-2">
                    <button
                      type="button"
                      onClick={decrementGuestCount}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg text-white transition-colors hover:border-[#c9a46e]/40 hover:text-[#f6ead8] disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={guestCount === 0}
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
                    Room type
                  </span>
                  <select
                    required
                    value={roomValue}
                    onChange={(e) => setRoomValue(e.target.value)}
                    className="rounded-[1.05rem] border border-white/10 bg-black/20 px-4 py-3 text-[0.95rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50"
                  >
                    <option value="" disabled>
                      Select room
                    </option>
                    {roomCatalog.map((room) => (
                      <option key={room.title} value={room.title} className="text-black">
                        {room.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 md:col-span-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Package preference
                  </span>
                  <select
                    required
                    value={packageValue}
                    onChange={(e) => setPackageValue(e.target.value)}
                    className="rounded-[1.05rem] border border-white/10 bg-black/20 px-4 py-3 text-[0.95rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50"
                  >
                    <option value="" disabled>
                      Select package
                    </option>
                    {packageCatalog.map((pkg) => (
                      <option key={pkg.title} value={pkg.title} className="text-black">
                        {pkg.title}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center border border-[#c8a871] bg-[#c8a871] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black"
              >
                Book now
              </button>
            </form>
          </div>

          {/* ── RIGHT: SCROLLABLE CONTENT ────────────────────────────────── */}
          <div className="space-y-8">

            {/* Booking Snapshot */}
            <div className="rounded-[1.75rem] border border-[#c9a46e]/20 bg-[#1f342b] p-5 shadow-[0_18px_36px_rgba(8,16,11,0.16)]">
              <div className="grid gap-5 xl:grid-cols-[18rem_minmax(0,1fr)] xl:items-start">
                <div className="relative h-[15rem] overflow-hidden rounded-[1.35rem]">
                  <Image
                    src={activeRoomCard?.image ?? "/images/DSC08717.avif"}
                    alt={activeRoomCard?.title ?? "Selected room"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 22rem"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Booking Snapshot
                  </p>
                  <h2 className="mt-3 text-[1.75rem] leading-tight text-[#f6ead8] md:text-[1.95rem]">
                    {activeRoomCard?.title ?? "Choose a room to view full booking details"}
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/85">
                    {activeRoomCard?.description ??
                      "Select a room type and package preference to see the room image, tariff, package price, and booking breakdown."}
                  </p>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="rounded-[1.05rem] border border-white/10 bg-[#2d463b] px-4 py-3.5">
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#c9a46e]">Room Tariff</p>
                      <p className="mt-2 text-lg leading-snug text-white md:text-[1.35rem]">
                        {activeRoomCard?.tariff ?? "Select room"}
                      </p>
                    </div>
                    <div className="rounded-[1.05rem] border border-white/10 bg-[#2d463b] px-4 py-3.5">
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#c9a46e]">Per Person Package</p>
                      <p className="mt-2 text-lg leading-snug text-white md:text-[1.35rem]">
                        {activeRoomCard?.packagePrice ?? "Select package"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-[1.05rem] border border-white/10 bg-[#2d463b] px-4 py-3.5">
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#c9a46e]">Selected Package</p>
                      <p className="mt-2 text-lg leading-snug text-white md:text-[1.3rem]">
                        {activePackageCard?.title ?? "Select package"}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/78">
                        {activePackagePricing?.highlight ??
                          activePackageCard?.subtitle ??
                          "Choose a package to view offer details."}
                      </p>
                    </div>
                    <div className="rounded-[1.05rem] border border-white/10 bg-[#2d463b] px-4 py-3.5">
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#c9a46e]">Offer Pricing</p>
                      <p className="mt-2 text-[0.96rem] text-white md:text-base">
                        Weekday: {activePackagePricing?.weekday ?? "On request"}
                      </p>
                      <p className="mt-2 text-[0.96rem] text-white md:text-base">
                        Weekend: {activePackagePricing?.weekend ?? "On request"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
                    <p className="rounded-[0.95rem] border border-white/8 bg-white/[0.03] px-3 py-2">Guest Count: {guestCount}</p>
                    <p className="rounded-[0.95rem] border border-white/8 bg-white/[0.03] px-3 py-2">Check-In: {checkIn || "Not selected yet"}</p>
                    <p className="rounded-[0.95rem] border border-white/8 bg-white/[0.03] px-3 py-2">Check-Out: {checkOut || "Not selected yet"}</p>
                    <p className="rounded-[0.95rem] border border-white/8 bg-white/[0.03] px-3 py-2">Selected Package: {(activePackageCard?.title ?? packageValue) || "Not selected yet"}</p>
                    <p className="rounded-[0.95rem] border border-white/8 bg-white/[0.03] px-3 py-2 sm:col-span-2">Selected Offer: {selectedOffer || "Standard booking enquiry"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Options */}
            <div>
              <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="text-2xl text-[#f4eee2] md:text-3xl">Room Options</h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[#c9a46e]">
                    {filteredRooms.length} {filteredRooms.length === 1 ? "room" : "rooms"} shown
                  </p>
                </div>
                <label className="block w-full md:max-w-xs">
                  <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">Filter rooms</span>
                  <input
                    type="text"
                    value={roomFilterQuery}
                    onChange={(e) => setRoomFilterQuery(e.target.value)}
                    placeholder="Search room, tariff, stay..."
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
                        ? "border-[#d7b17c]/55 bg-[#20362c]"
                        : "border-white/10 bg-[#182920]"
                    }`}
                  >
                    <div className="relative h-[16rem] md:h-full">
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
                          <p className="text-xs uppercase tracking-[0.2em] text-[#c9a46e]">Room Details</p>
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
                          className="shrink-0 rounded-full border border-[#c9a46e]/40 bg-[#2e453a] px-5 py-2 text-xs uppercase tracking-[0.18em] text-[#f6e2c0]"
                        >
                          Select Room
                        </button>
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div className="rounded-[1.2rem] border border-white/10 bg-[#2d463b] px-4 py-4">
                          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#c9a46e]">Tariff</p>
                          <p className="mt-2 text-lg leading-snug text-white md:text-xl">{room.tariff}</p>
                        </div>
                        <div className="rounded-[1.2rem] border border-white/10 bg-[#2d463b] px-4 py-4">
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

            {/* Package Options */}
            <div>
              <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="text-2xl text-[#f4eee2] md:text-3xl">Package Options</h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[#c9a46e]">
                    {filteredPackages.length} {filteredPackages.length === 1 ? "package" : "packages"} shown
                  </p>
                </div>
                <label className="block w-full md:max-w-xs">
                  <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">Filter packages</span>
                  <input
                    type="text"
                    value={packageFilterQuery}
                    onChange={(e) => setPackageFilterQuery(e.target.value)}
                    placeholder="Search package, pricing..."
                    className="w-full rounded-[1.05rem] border border-white/10 bg-[#20362c] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#c9a46e]/50"
                  />
                </label>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {filteredPackages.map((pkg) => {
                  const pricing = packagePricing[pkg.title];
                  return (
                    <article
                      key={pkg.title}
                      className={`overflow-hidden rounded-[1.8rem] border shadow-[0_18px_40px_rgba(8,16,11,0.14)] ${
                        pkg.title === packageValue
                          ? "border-[#d7b17c]/55 bg-[#20362c]"
                          : "border-white/10 bg-[#182920]"
                      }`}
                    >
                      <div className="relative h-[16rem]">
                        <Image
                          src={pkg.image}
                          alt={pkg.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="p-6">
                        <p className="text-xs uppercase tracking-[0.18em] text-[#c9a46e]">Package Details</p>
                        <h4 className="mt-2 text-2xl leading-tight text-white md:text-[2rem]">{pkg.title}</h4>
                        <p className="mt-3 text-sm leading-relaxed text-white/82 md:text-base">
                          {pkg.description}
                        </p>

                        <div className="mt-5 space-y-3">
                          <div className="rounded-[1.1rem] border border-white/10 bg-[#2d463b] px-4 py-3">
                            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#c9a46e]">Weekday</p>
                            <p className="mt-1 text-base text-white md:text-lg">
                              {pricing?.weekday ?? "On request"}
                            </p>
                          </div>
                          <div className="rounded-[1.1rem] border border-white/10 bg-[#2d463b] px-4 py-3">
                            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#c9a46e]">Weekend</p>
                            <p className="mt-1 text-base text-white md:text-lg">
                              {pricing?.weekend ?? "On request"}
                            </p>
                          </div>
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-white/78">
                          {pricing?.highlight ?? pkg.subtitle}
                        </p>

                        <button
                          type="button"
                          onClick={() => setPackageValue(pkg.title)}
                          className="mt-5 rounded-full border border-[#c9a46e]/40 bg-[#2e453a] px-5 py-2 text-xs uppercase tracking-[0.18em] text-[#f6e2c0]"
                        >
                          Select Package
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
              {filteredPackages.length === 0 ? (
                <div className="mt-6 rounded-[1.5rem] border border-dashed border-white/15 bg-[#182920] px-5 py-6 text-sm text-white/70">
                  No package options matched your filter.
                </div>
              ) : null}
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">Booking</p>
          <h1 className="mt-5 text-4xl md:text-6xl">Request A Booking</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">
            Share your dates, guest count, room type, and package preference. The Mountain team will confirm
            availability and respond with the next steps.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-[96rem] px-6 pb-20 md:px-12">
        <div className="glass-panel rounded-[2rem] p-7 text-white/75 md:p-10">Loading booking details...</div>
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
