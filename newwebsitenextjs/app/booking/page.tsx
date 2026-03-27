"use client";

import Image from "next/image";
import { Suspense, useMemo, useState } from "react";
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
  const searchParams = useSearchParams();
  const roomCatalog = useMemo(() => [...stayCardsPrimary, ...stayCardsSecondary], []);
  const packageCatalog = useMemo(
    () => offersCards.filter((card) => realPackageTitles.includes(card.title as (typeof realPackageTitles)[number])),
    [],
  );
  const guestOptions = ["50", "100", "150", "200", "250", "300", "350", "400", "450", "500"];

  const selectedRoomFromQuery = searchParams.get("room") ?? "";
  const selectedPackageFromQuery = searchParams.get("package") ?? "";
  const selectedPage = searchParams.get("page") ?? "";
  const selectedOffer = searchParams.get("offer") ?? "";
  const selectedLabel = searchParams.get("label") ?? "";
  const selectedDetails = searchParams.get("details") ?? "";
  const initialRoomValue = roomCatalog.some((room) => room.title === selectedRoomFromQuery) ? selectedRoomFromQuery : "";
  const initialPackageValue = packageCatalog.some((pkg) => pkg.title === selectedPackageFromQuery) ? selectedPackageFromQuery : "";
  const todayDate = getTodayDateString();

  const [checkIn, setCheckIn] = useState(todayDate);
  const [checkOut, setCheckOut] = useState(todayDate);
  const [guestValue, setGuestValue] = useState("");
  const [roomValue, setRoomValue] = useState(initialRoomValue);
  const [packageValue, setPackageValue] = useState(initialPackageValue);

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

  return (
    <main className="relative overflow-hidden bg-[#2d4a3e] text-white">
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

      <section className="mx-auto max-w-[96rem] px-6 pb-10 md:px-12">
        <div className="grid gap-8 xl:grid-cols-[0.82fr_1.18fr]">
          <form className="glass-panel rounded-[2rem] p-7 md:p-10 xl:sticky xl:top-36 xl:self-start">
            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="date"
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
                className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none"
              />
              <input
                type="date"
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
                className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none"
              />
              <select
                className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none"
                value={guestValue}
                onChange={(event) => setGuestValue(event.target.value)}
              >
                <option value="" disabled>
                  Guest Count
                </option>
                {guestOptions.map((count) => (
                  <option key={count} value={count} className="text-black">
                    {count}
                  </option>
                ))}
              </select>
              <select
                className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none"
                value={roomValue}
                onChange={(event) => setRoomValue(event.target.value)}
              >
                <option value="" disabled>
                  Room Type
                </option>
                {roomCatalog.map((room) => (
                  <option key={room.title} value={room.title} className="text-black">
                    {room.title}
                  </option>
                ))}
              </select>
              <select
                className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none md:col-span-2"
                value={packageValue}
                onChange={(event) => setPackageValue(event.target.value)}
              >
                <option value="" disabled>
                  Package Preference
                </option>
                {packageCatalog.map((pkg) => (
                  <option key={pkg.title} value={pkg.title} className="text-black">
                    {pkg.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex border border-[#c8a871] bg-[#c8a871] px-9 py-3 text-sm font-semibold uppercase tracking-wide text-black"
            >
              BOOK NOW
            </button>
          </form>

          <div className="space-y-8">
            <div className="rounded-[2rem] border border-[#c9a46e]/20 bg-[#1f342b] p-6 shadow-[0_22px_48px_rgba(8,16,11,0.16)]">
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="relative h-[18rem] overflow-hidden rounded-[1.6rem] lg:w-[22rem]">
                  <Image
                    src={activeRoomCard?.image ?? "/images/DSC08717.avif"}
                    alt={activeRoomCard?.title ?? "Selected room"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 22rem"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">Booking Snapshot</p>
                  <h2 className="mt-4 text-2xl leading-tight md:text-[2rem]">
                    {activeRoomCard?.title ?? "Choose a room to view full booking details"}
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/85 md:text-base">
                    {activeRoomCard?.description ??
                      "Select a room type and package preference to see the room image, tariff, package price, and booking breakdown."}
                  </p>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-[1.3rem] border border-white/10 bg-[#2d463b] px-5 py-4">
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#c9a46e]">Room Tariff</p>
                      <p className="mt-2 text-xl leading-snug text-white md:text-[1.75rem]">{activeRoomCard?.tariff ?? "Select room"}</p>
                    </div>
                    <div className="rounded-[1.3rem] border border-white/10 bg-[#2d463b] px-5 py-4">
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#c9a46e]">Per Person Package</p>
                      <p className="mt-2 text-xl leading-snug text-white md:text-[1.75rem]">{activeRoomCard?.packagePrice ?? "Select package"}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-[1.3rem] border border-white/10 bg-[#2d463b] px-5 py-4">
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#c9a46e]">Selected Package</p>
                      <p className="mt-2 text-xl leading-snug text-white md:text-[1.7rem]">{activePackageCard?.title ?? "Select package"}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/78">
                        {activePackagePricing?.highlight ?? activePackageCard?.subtitle ?? "Choose a package to view offer details."}
                      </p>
                    </div>
                    <div className="rounded-[1.3rem] border border-white/10 bg-[#2d463b] px-5 py-4">
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#c9a46e]">Offer Pricing</p>
                      <p className="mt-2 text-base text-white md:text-lg">Weekday: {activePackagePricing?.weekday ?? "On request"}</p>
                      <p className="mt-1 text-base text-white md:text-lg">Weekend: {activePackagePricing?.weekend ?? "On request"}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 text-sm text-white/80">
                    <p>Guest Count: {guestValue || "Not selected yet"}</p>
                    <p>Check-In: {checkIn || "Not selected yet"}</p>
                    <p>Check-Out: {checkOut || "Not selected yet"}</p>
                    <p>Selected Package: {(activePackageCard?.title ?? packageValue) || "Not selected yet"}</p>
                    <p>Selected Offer: {selectedOffer || "Standard booking enquiry"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl text-[#f4eee2] md:text-3xl">Room Options</h3>
                <p className="text-sm uppercase tracking-[0.18em] text-[#c9a46e]">All rooms</p>
              </div>

              <div className="grid gap-6">
                {roomCatalog.map((room) => (
                  <article
                    key={room.title}
                    className={`grid overflow-hidden rounded-[1.8rem] border shadow-[0_18px_40px_rgba(8,16,11,0.14)] md:grid-cols-[22rem_1fr] ${
                      room.title === roomValue ? "border-[#d7b17c]/55 bg-[#20362c]" : "border-white/10 bg-[#182920]"
                    }`}
                  >
                    <div className="relative h-[16rem] md:h-full">
                      <Image src={room.image} alt={room.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 22rem" />
                    </div>
                    <div className="p-6 md:p-7">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-[#c9a46e]">Room Details</p>
                          <h4 className="mt-2 text-2xl leading-tight text-white md:text-[2rem]">{room.title}</h4>
                          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/82 md:text-base">{room.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setRoomValue(room.title)}
                          className="rounded-full border border-[#c9a46e]/40 bg-[#2e453a] px-5 py-2 text-xs uppercase tracking-[0.18em] text-[#f6e2c0]"
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
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl text-[#f4eee2] md:text-3xl">Package Options</h3>
                <p className="text-sm uppercase tracking-[0.18em] text-[#c9a46e]">All packages</p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {packageCatalog.map((pkg) => {
                  const pricing = packagePricing[pkg.title];

                  return (
                    <article
                      key={pkg.title}
                      className={`overflow-hidden rounded-[1.8rem] border shadow-[0_18px_40px_rgba(8,16,11,0.14)] ${
                        pkg.title === packageValue ? "border-[#d7b17c]/55 bg-[#20362c]" : "border-white/10 bg-[#182920]"
                      }`}
                    >
                      <div className="relative h-[16rem]">
                        <Image src={pkg.image} alt={pkg.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                      </div>
                      <div className="p-6">
                        <p className="text-xs uppercase tracking-[0.18em] text-[#c9a46e]">Package Details</p>
                        <h4 className="mt-2 text-2xl leading-tight text-white md:text-[2rem]">{pkg.title}</h4>
                        <p className="mt-3 text-sm leading-relaxed text-white/82 md:text-base">{pkg.description}</p>

                        <div className="mt-5 space-y-3">
                          <div className="rounded-[1.1rem] border border-white/10 bg-[#2d463b] px-4 py-3">
                            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#c9a46e]">Weekday</p>
                            <p className="mt-1 text-base text-white md:text-lg">{pricing?.weekday ?? "On request"}</p>
                          </div>
                          <div className="rounded-[1.1rem] border border-white/10 bg-[#2d463b] px-4 py-3">
                            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#c9a46e]">Weekend</p>
                            <p className="mt-1 text-base text-white md:text-lg">{pricing?.weekend ?? "On request"}</p>
                          </div>
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-white/78">{pricing?.highlight ?? pkg.subtitle}</p>

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
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function BookingPageFallback() {
  return (
    <main className="relative overflow-hidden bg-[#2d4a3e] text-white">
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
