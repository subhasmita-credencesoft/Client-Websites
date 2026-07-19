"use client";

import { useEffect, useState } from "react";
import {
  buildDirectBookingEngineUrl,
  normalizeDate,
  formatDate,
} from "@/lib/constants/booking";
import { homeSectionContent } from "@/lib/data/content/resort-content";
import { ThemedDatePicker } from "@/components/ui/themed-date-picker";

function getTodayDateString(offsetDays = 0) {
  const now = new Date();
  now.setDate(now.getDate() + offsetDays);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function QuickBookingStrip() {
  const content = homeSectionContent.quickBooking;
  const [isReady, setIsReady] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setCheckIn(getTodayDateString());
      setCheckOut(getTodayDateString(1));
      setIsReady(true);
    });
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const handleCheckInChange = (nextCheckIn: string) => {
    setCheckIn(nextCheckIn);
    const nextCheckInDate = normalizeDate(nextCheckIn);
    const currentCheckOutDate = normalizeDate(checkOut);
    if (
      !nextCheckInDate ||
      !currentCheckOutDate ||
      currentCheckOutDate > nextCheckInDate
    ) {
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
    <section className="relative z-30 hidden w-full bg-black px-4 py-3 md:block md:px-8 md:py-4">
      <div className="mx-auto max-w-[66rem]">
        <div className="overflow-hidden rounded-[1rem] border border-[rgba(var(--color-primary-rgb),0.22)] bg-[linear-gradient(180deg,rgba(20,16,13,0.97)_0%,rgba(15,12,10,0.94)_100%)] px-3 py-2 shadow-[0_18px_36px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-4 sm:py-2.5 md:px-5 md:py-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5 xl:grid-cols-[1fr_1fr_0.55fr_auto] xl:items-end">
            <label className="grid gap-1">
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-hover)] sm:text-[0.65rem] md:text-[0.68rem]">
                {content.fields.checkIn}
              </span>
              <ThemedDatePicker
                value={checkIn}
                onChange={handleCheckInChange}
                minDate={getTodayDateString()}
                disabled={!isReady}
                className="h-10 rounded-[0.7rem] border border-white/10 bg-white/[0.04] px-3 text-[0.78rem] text-white transition-colors hover:border-white/18 focus-visible:border-[var(--color-primary)]/50 sm:h-9"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-hover)] sm:text-[0.65rem] md:text-[0.68rem]">
                {content.fields.checkOut}
              </span>
              <ThemedDatePicker
                value={checkOut}
                onChange={setCheckOut}
                minDate={checkIn}
                disabled={!isReady}
                className="h-10 rounded-[0.7rem] border border-white/10 bg-white/[0.04] px-3 text-[0.78rem] text-white transition-colors hover:border-white/18 focus-visible:border-[var(--color-primary)]/50 sm:h-9"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-hover)] sm:text-[0.65rem] md:text-[0.68rem]">
                {content.fields.guests}
              </span>
              <input
                type="number"
                min={1}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                disabled={!isReady}
                className="h-10 rounded-[0.7rem] border border-white/10 bg-white/[0.04] px-3 text-[0.78rem] text-white outline-none transition-colors hover:border-white/18 focus:border-[var(--color-primary)]/50 sm:h-9"
              />
            </label>

            <div className="grid items-end sm:col-span-2 xl:col-span-1">
              <button
                type="button"
                onClick={handleBookingRedirect}
                disabled={!isReady}
                className="inline-flex h-10 w-full items-center justify-center rounded-[0.7rem] border border-[#c9a467] bg-[#c9a467] px-4 text-[0.68rem] font-semibold tracking-[0.14em] text-black transition-colors hover:bg-[var(--color-primary-hover)] sm:h-9 sm:text-[0.72rem] xl:min-w-[9rem]"
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
