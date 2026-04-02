"use client";

import Image from "next/image";
import { type FormEvent, Suspense, useMemo, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { stayCardsPrimary, stayCardsSecondary } from "@/lib/data/content/mountain-content";

const packageCatalog = [
  {
    title: "Classic Package",
    subtitle: "A balanced bundled format for beautifully hosted wedding stays.",
    description:
      "Designed for families who want stay, meals, and venue access combined into one clear planning direction.",
    image: "/images/DSC08836.avif",
  },
  {
    title: "Signature Package",
    subtitle: "A richer hospitality format for more generous hosting.",
    description:
      "Adds extra starters and more dining depth for wedding functions that call for a fuller guest experience.",
    image: "/images/DSC08849.avif",
  },
  {
    title: "Premium Luxe Package",
    subtitle: "An elevated package for premium destination celebrations.",
    description:
      "Built for wedding weekends that deserve stronger presentation, richer hospitality, and live dining counters.",
    image: "/images/DSC08831.avif",
  },
] as const;

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
  const selectedPackageFromQuery = searchParams.get("package") ?? "";
  const selectedOffer = searchParams.get("offer") ?? "";
  const selectedEventTypeFromQuery = searchParams.get("eventType") ?? "Destination Wedding";
  const selectedCheckInFromQuery = searchParams.get("checkIn") ?? getTodayDateString();
  const selectedCheckOutFromQuery = searchParams.get("checkOut") ?? getTodayDateString(1);
  const selectedGuestsFromQuery = Number(searchParams.get("guests") ?? "2");
  const initialRoomValue = roomCatalog.some((room) => room.title === selectedRoomFromQuery) ? selectedRoomFromQuery : "";
  const initialPackageValue = packageCatalog.some((pkg) => pkg.title === selectedPackageFromQuery)
    ? selectedPackageFromQuery
    : "";
  const todayDate = getTodayDateString();
  const tomorrowDate = getTodayDateString(1);

  const [checkIn, setCheckIn] = useState(selectedCheckInFromQuery || todayDate);
  const [checkOut, setCheckOut] = useState(selectedCheckOutFromQuery || tomorrowDate);
  const [guestCount, setGuestCount] = useState(Number.isFinite(selectedGuestsFromQuery) && selectedGuestsFromQuery > 0 ? selectedGuestsFromQuery : 2);
  const [eventType, setEventType] = useState(selectedEventTypeFromQuery);
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
    [packageValue],
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
  }, [packageFilterQuery]);
  const isFormComplete = Boolean(checkIn && checkOut && guestCount > 0 && roomValue && packageValue);
  const enquiryWhatsAppHref = useMemo(() => {
    const message = [
      "Hello The Mountain, Karjat team,",
      "",
      "I would like to check availability.",
      `Event Type: ${eventType}`,
      `Check-In: ${checkIn || "Not selected"}`,
      `Check-Out: ${checkOut || "Not selected"}`,
      `Guests: ${guestCount || 0}`,
      `Room Type: ${roomValue || "Not selected"}`,
      `Package: ${packageValue || "Not selected"}`,
      `Selected Offer: ${selectedOffer || "Standard enquiry"}`,
    ].join("\n");

    return `https://wa.me/919833866655?text=${encodeURIComponent(message)}`;
  }, [checkIn, checkOut, eventType, guestCount, packageValue, roomValue, selectedOffer]);
  const enquiryContactHref = useMemo(() => {
    const params = new URLSearchParams({
      eventType,
      checkIn,
      checkOut,
      guests: String(guestCount),
      room: roomValue,
      package: packageValue,
      offer: selectedOffer || "Standard enquiry",
    });

    return `/contact?${params.toString()}`;
  }, [checkIn, checkOut, eventType, guestCount, packageValue, roomValue, selectedOffer]);
  const decrementGuestCount = () => {
    setGuestCount((current) => Math.max(1, current - 1));
  };
  const incrementGuestCount = () => {
    setGuestCount((current) => current + 1);
  };
  const handleAvailabilitySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormComplete) return;

    window.open(enquiryWhatsAppHref, "_blank", "noopener,noreferrer");
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
        className="relative min-h-[72svh] overflow-hidden pt-40 md:pt-44"
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
        <div className="absolute inset-x-[8%] top-28 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[72svh] max-w-[96rem] items-end px-6 pb-12 md:px-12 md:pb-16">
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
              Plan your destination wedding, guest stay, or celebration weekend with dates, room choice, and package preference in one premium booking flow.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[96rem] px-6 py-10 md:px-12 md:py-14">
        <div className="grid gap-8 xl:grid-cols-[minmax(22rem,0.76fr)_minmax(0,1.24fr)] xl:items-start">
          <div className="xl:sticky xl:top-28 xl:self-start">
            <form
              className="rounded-[1.75rem] border border-[#c9a46e]/20 bg-[#182920] p-5 shadow-[0_18px_36px_rgba(8,16,11,0.22)] md:p-6"
              onSubmit={handleAvailabilitySubmit}
            >
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a46e]">
                  Availability Planner
                </p>
                <h2 className="mt-2 text-[1.8rem] text-[#f4eee2] md:text-[2rem]">Plan your wedding or stay</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/72">
                  Choose dates, guests, stay option, and package tier. This planner keeps the booking journey clear while you compare rooms and celebration value.
                </p>
              </div>

                <div className="grid gap-3.5 md:grid-cols-2">
                <label className="grid gap-2 md:col-span-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Event type
                  </span>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="rounded-[1.05rem] border border-white/10 bg-black/20 px-4 py-3 text-[0.95rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50"
                  >
                    {["Destination Wedding", "Wedding Guest Stay", "Luxury Stay", "Private Event"].map((option) => (
                      <option key={option} value={option} className="text-black">
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Preferred check-in
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
                    Preferred check-out
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
                    Total guests
                  </span>
                  <div className="flex items-center rounded-[1.05rem] border border-white/10 bg-black/20 px-2 py-2">
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
                    className="rounded-[1.05rem] border border-white/10 bg-black/20 px-4 py-3 text-[0.95rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50"
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
                <label className="grid gap-2 md:col-span-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Wedding package
                  </span>
                  <select
                    required
                    value={packageValue}
                    onChange={(e) => setPackageValue(e.target.value)}
                    className="rounded-[1.05rem] border border-white/10 bg-black/20 px-4 py-3 text-[0.95rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50"
                  >
                    <option value="" disabled>
                      Select wedding package
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
                disabled={!isFormComplete}
                className="mt-6 inline-flex w-full items-center justify-center border border-[#c8a871] bg-[#c8a871] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
              >
                Check Availability On WhatsApp
              </button>
              <Link
                href={enquiryContactHref}
                className="mt-3 inline-flex w-full items-center justify-center rounded-[1rem] border border-white/15 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white/88 transition-colors hover:border-[#c9a46e]/40 hover:text-white"
              >
                Send Detailed Enquiry
              </Link>
            </form>
          </div>

          {/* ── RIGHT: SCROLLABLE CONTENT ────────────────────────────────── */}
          <div className="space-y-8">

            {/* Inquiry Snapshot */}
            <div className="rounded-[1.5rem] border border-[#c9a46e]/20 bg-[#182920] p-4 shadow-[0_18px_36px_rgba(8,16,11,0.2)] md:p-5">
              <div className="grid gap-4 xl:grid-cols-[18rem_minmax(0,1fr)] xl:items-start">
                <div className="relative overflow-hidden rounded-[1.15rem] border border-white/10 bg-[#182920] xl:sticky xl:top-28">
                  <div className="relative aspect-[4/3] min-h-[14rem] w-full md:min-h-[15rem]">
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
                      "Select a stay option and wedding package to see tariff, package pricing, and the bundled hospitality direction for your event."}
                  </p>

                  <div className="mt-4 rounded-[1.05rem] border border-white/10 bg-[#2d463b] px-4 py-3.5">
                    <div className="grid gap-x-6 gap-y-3 md:grid-cols-2">
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Room Tariff</p>
                        <p className="mt-1 text-[1rem] leading-snug text-white md:text-[1.1rem]">
                          {activeRoomCard?.tariff ?? "Select room"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Per Person Package</p>
                        <p className="mt-1 text-[1rem] leading-snug text-white md:text-[1.1rem]">
                          {activeRoomCard?.packagePrice ?? "Select package"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Event Type</p>
                        <p className="mt-1 text-[1rem] leading-snug text-white md:text-[1.1rem]">
                          {eventType}
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Selected Package</p>
                        <p className="mt-1 text-[1rem] leading-snug text-white md:text-[1.1rem]">
                          {activePackageCard?.title ?? "Select package"}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-white/78">
                          {activePackagePricing?.highlight ??
                            activePackageCard?.subtitle ??
                            "Choose a package to view the hospitality inclusions."}
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Offer Pricing</p>
                        <p className="mt-1 text-sm text-white md:text-[0.96rem]">
                          Weekday: {activePackagePricing?.weekday ?? "On request"}
                        </p>
                        <p className="mt-1 text-sm text-white md:text-[0.96rem]">
                          Weekend: {activePackagePricing?.weekend ?? "On request"}
                        </p>
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
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Selected Package</p>
                        <p className="mt-1 text-sm text-white/86">{selectedOffer || "Standard wedding enquiry"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-[1.4rem] border border-[#c9a46e]/20 bg-[#182920] p-5 shadow-[0_18px_36px_rgba(8,16,11,0.18)]">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">How Quotation Works</p>
                <p className="mt-3 text-sm leading-relaxed text-white/82 md:text-base">
                  Final pricing is shaped by package tier, guest count, dates, weekday or weekend selection, and total stay required.
                </p>
              </article>
              <article className="rounded-[1.4rem] border border-[#c9a46e]/20 bg-[#182920] p-5 shadow-[0_18px_36px_rgba(8,16,11,0.18)]">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Package Basis</p>
                <p className="mt-3 text-sm leading-relaxed text-white/82 md:text-base">
                  Packages are calculated per person per day and include stay, meals, services, lawn access, and venue usage.
                </p>
              </article>
              <article className="rounded-[1.4rem] border border-[#c9a46e]/20 bg-[#182920] p-5 shadow-[0_18px_36px_rgba(8,16,11,0.18)]">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Guest Overflow Note</p>
                <p className="mt-3 text-sm leading-relaxed text-white/82 md:text-base">
                  If guest count exceeds 140 people, a nearby 10 BHK property is available at additional cost for overflow stay planning.
                </p>
              </article>
            </div>

            <div className="rounded-[1.5rem] border border-[#c9a46e]/20 bg-[#182920] p-5 shadow-[0_18px_36px_rgba(8,16,11,0.2)] md:p-6">
              <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Planning Overview</p>
                  <h3 className="mt-3 text-2xl leading-tight text-[#f6ead8] md:text-[2rem]">
                    Stay, meals, venue access, and package value reviewed together
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">
                    This page helps families compare guest stay options and package depth in one place, making it easier to move from interest to confirmed enquiry with more confidence.
                  </p>
                </div>
                <div className="grid gap-3">
                  <div className="rounded-[1.1rem] border border-white/10 bg-[#21382e] px-4 py-3 text-sm leading-relaxed text-white/82 md:text-base">
                    Classic Package: 5 meals + stay + venue access
                  </div>
                  <div className="rounded-[1.1rem] border border-white/10 bg-[#21382e] px-4 py-3 text-sm leading-relaxed text-white/82 md:text-base">
                    Signature Package: Classic package + 2 extra starters + 1 extra gravy in lunch and dinner
                  </div>
                  <div className="rounded-[1.1rem] border border-white/10 bg-[#21382e] px-4 py-3 text-sm leading-relaxed text-white/82 md:text-base">
                    Premium Luxe: Signature package + 2 live counters
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
                    These stay categories are designed to support wedding hosting, guest comfort, and family togetherness across the full celebration.
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
                          className="shrink-0 rounded-full border border-[#c9a46e]/40 bg-[#2e453a] px-5 py-2 text-xs uppercase tracking-[0.18em] text-[#f6e2c0]"
                        >
                          Select Stay
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
                  <h3 className="text-2xl text-[#f4eee2] md:text-3xl">Wedding Package Options</h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[#c9a46e]">
                    {filteredPackages.length} {filteredPackages.length === 1 ? "package" : "packages"} shown
                  </p>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/72 md:text-base">
                    Compare weekday and weekend pricing to understand how each package tier changes in hospitality depth and guest experience.
                  </p>
                </div>
                <label className="block w-full md:max-w-xs">
                  <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">Filter packages</span>
                  <input
                    type="text"
                    value={packageFilterQuery}
                    onChange={(e) => setPackageFilterQuery(e.target.value)}
                    placeholder="Search package, pricing, inclusions..."
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

            <div className="rounded-[1.5rem] border border-[#c9a46e]/20 bg-[#182920] p-5 shadow-[0_18px_36px_rgba(8,16,11,0.2)] md:p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Booking Terms</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-[1.1rem] border border-white/10 bg-[#21382e] px-4 py-3 text-sm leading-relaxed text-white/82 md:text-base">
                  50% advance is required to block dates, with the remaining 50% due before check-in.
                </div>
                <div className="rounded-[1.1rem] border border-white/10 bg-[#21382e] px-4 py-3 text-sm leading-relaxed text-white/82 md:text-base">
                  Final billing is based on confirmed headcount and outside catering is not allowed in package bookings.
                </div>
                <div className="rounded-[1.1rem] border border-white/10 bg-[#21382e] px-4 py-3 text-sm leading-relaxed text-white/82 md:text-base">
                  Check-in is 2:00 PM and check-out is 11:00 AM for smooth multi-day event planning.
                </div>
                <div className="rounded-[1.1rem] border border-white/10 bg-[#21382e] px-4 py-3 text-sm leading-relaxed text-white/82 md:text-base">
                  Decorators and vendors require prior approval, and staying guests must carry valid government ID.
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
