"use client";

import { useEffect, useState } from "react";
import { buildDirectBookingEngineUrl, normalizeDate, formatDate } from "@/lib/constants/booking";
import { homeSectionContent } from "@/lib/data/content/resort-content";
import { ThemedDatePicker } from "@/components/ui/themed-date-picker";
import { cn } from "@/lib/utils/cn";

type QuickBookingStripProps = {
  insideHero?: boolean;
};

function getTodayDateString(offsetDays = 0) {
  const now = new Date();
  now.setDate(now.getDate() + offsetDays);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function QuickBookingStrip({ insideHero = false }: QuickBookingStripProps) {
  const content = homeSectionContent.quickBooking;
  const [isReady, setIsReady] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const initialCheckIn = getTodayDateString();
      const initialCheckOut = getTodayDateString(1);

      setCheckIn(initialCheckIn);
      setCheckOut(initialCheckOut);
      setIsReady(true);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const handleCheckInChange = (nextCheckIn: string) => {
    setCheckIn(nextCheckIn);

    const nextCheckInDate = normalizeDate(nextCheckIn);
    const currentCheckOutDate = normalizeDate(checkOut);

    if (!nextCheckInDate || !currentCheckOutDate || currentCheckOutDate > nextCheckInDate) {
      return;
    }

    const nextCheckOutDate = new Date(nextCheckInDate);
    nextCheckOutDate.setDate(nextCheckOutDate.getDate() + 1);
    setCheckOut(formatDate(nextCheckOutDate));
  };

  const handleBookingRedirect = () => {
    const bookingHref = buildDirectBookingEngineUrl({
      checkIn,
      checkOut,
      guests: Number(guests) || 1,
      rooms: 1,
    });

    window.location.assign(bookingHref);
  };

  return (
    <section
      className={cn(
        "relative z-20 px-4 md:px-8",
        insideHero ? "w-full px-0 pt-1 md:pt-1.5" : "-mt-12 bg-black pb-0 md:-mt-16 md:pb-0",
      )}
      data-reveal={insideHero ? true : undefined}
    >
      <div
        className="mx-auto max-w-[62rem]"
        data-parallax={insideHero ? true : undefined}
        data-parallax-depth={insideHero ? "4" : undefined}
      >
        <div className="overflow-hidden rounded-[1.05rem] border border-[rgba(var(--color-primary-rgb),0.18)] bg-[linear-gradient(180deg,rgba(20,16,13,0.96)_0%,rgba(15,12,10,0.92)_100%)] px-2.5 py-2.5 shadow-[0_18px_34px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:px-3 sm:py-3 md:px-3.5 md:py-3">
          <div className="mb-2 flex flex-col gap-1 border-b border-white/8 pb-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.5rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-primary-hover)]">
                Quick Booking
              </p>
              <p className="mt-0.5 text-[0.82rem] font-medium text-white/88 md:text-[0.88rem]">
                {content.title}
              </p>
            </div>
            <p className="text-[0.64rem] uppercase tracking-[0.14em] text-white/50">
              Instant availability check
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_0.55fr_auto] xl:items-end">
            <label className="grid gap-1">
              <span className="text-[0.5rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-hover)]">
                {content.fields.checkIn}
              </span>
              <ThemedDatePicker
                value={checkIn}
                onChange={handleCheckInChange}
                minDate={getTodayDateString()}
                disabled={!isReady}
                className="h-10 rounded-[0.75rem] border border-white/10 bg-white/[0.04] px-3 text-[0.78rem] text-white transition-colors hover:border-white/18 focus-visible:border-[#c9a46e]/50 sm:h-10 sm:text-[0.8rem] xl:h-10 xl:text-[0.76rem]"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-[0.5rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-hover)]">
                {content.fields.checkOut}
              </span>
              <ThemedDatePicker
                value={checkOut}
                onChange={setCheckOut}
                minDate={checkIn}
                disabled={!isReady}
                className="h-10 rounded-[0.75rem] border border-white/10 bg-white/[0.04] px-3 text-[0.78rem] text-white transition-colors hover:border-white/18 focus-visible:border-[#c9a46e]/50 sm:h-10 sm:text-[0.8rem] xl:h-10 xl:text-[0.76rem]"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-[0.5rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-hover)]">
                {content.fields.guests}
              </span>
              <input
                type="number"
                min={1}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                disabled={!isReady}
                className="h-10 rounded-[0.75rem] border border-white/10 bg-white/[0.04] px-3 text-[0.78rem] text-white outline-none transition-colors hover:border-white/18 focus:border-[#c9a46e]/50 sm:h-10 sm:text-[0.8rem] xl:h-10 xl:text-[0.76rem]"
              />
            </label>

            <div className="grid items-end sm:col-span-2 xl:col-span-1">
              <button
                type="button"
                onClick={handleBookingRedirect}
                disabled={!isReady}
                className="inline-flex h-10 w-full items-center justify-center rounded-[0.78rem] border border-[#c9a467] bg-[#c9a467] px-4 text-[0.56rem] font-semibold tracking-[0.14em] text-black transition-colors hover:bg-[#d7b57c] sm:h-10 sm:text-[0.58rem] xl:h-10 xl:min-w-[9.5rem] xl:text-[0.56rem]"
                data-cursor="hover"
              >
                {content.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
