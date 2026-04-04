"use client";

import { useState } from "react";
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
  const [checkIn, setCheckIn] = useState(getTodayDateString());
  const [checkOut, setCheckOut] = useState(getTodayDateString(1));
  const [guests, setGuests] = useState("2");

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
        insideHero ? "w-full px-0 pt-2 md:pt-3" : "-mt-14 bg-black pb-0 md:-mt-20 md:pb-0",
      )}
      data-reveal={insideHero ? true : undefined}
    >
      <div
        className="mx-auto max-w-[66rem]"
        data-parallax={insideHero ? true : undefined}
        data-parallax-depth={insideHero ? "4" : undefined}
      >
        <div className="rounded-[0.95rem] border border-[#c9a46e]/18 bg-[#15110d]/95 px-2.5 py-2.5 shadow-[0_10px_22px_rgba(8,16,11,0.14)] backdrop-blur-sm sm:px-3 sm:py-3 md:px-3.5 md:py-3">
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <p className="text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e] sm:text-[0.52rem]">Quick Booking</p>
          </div>

          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_0.5fr_auto] xl:items-end">
            <label className="grid gap-1">
              <span className="text-[0.48rem] font-semibold uppercase tracking-[0.12em] text-[#c9a46e] sm:text-[0.5rem]">
                {content.fields.checkIn}
              </span>
              <ThemedDatePicker
                value={checkIn}
                onChange={handleCheckInChange}
                minDate={getTodayDateString()}
                className="h-9 rounded-[0.62rem] border border-white/10 bg-black/20 px-2.5 text-[0.78rem] text-white transition-colors hover:border-white/16 focus-visible:border-[#c9a46e]/50 sm:h-9.5 sm:text-[0.82rem] xl:h-9 xl:text-[0.76rem]"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-[0.48rem] font-semibold uppercase tracking-[0.12em] text-[#c9a46e] sm:text-[0.5rem]">
                {content.fields.checkOut}
              </span>
              <ThemedDatePicker
                value={checkOut}
                onChange={setCheckOut}
                minDate={checkIn}
                className="h-9 rounded-[0.62rem] border border-white/10 bg-black/20 px-2.5 text-[0.78rem] text-white transition-colors hover:border-white/16 focus-visible:border-[#c9a46e]/50 sm:h-9.5 sm:text-[0.82rem] xl:h-9 xl:text-[0.76rem]"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-[0.48rem] font-semibold uppercase tracking-[0.12em] text-[#c9a46e] sm:text-[0.5rem]">
                {content.fields.guests}
              </span>
              <input
                type="number"
                min={1}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="h-9 rounded-[0.62rem] border border-white/10 bg-black/20 px-2.5 text-[0.78rem] text-white outline-none transition-colors hover:border-white/16 focus:border-[#c9a46e]/50 sm:h-9.5 sm:text-[0.82rem] xl:h-9 xl:text-[0.76rem]"
              />
            </label>

            <div className="grid items-end sm:col-span-2 xl:col-span-1">
              <button
                type="button"
                onClick={handleBookingRedirect}
                className="inline-flex h-9 w-full items-center justify-center rounded-[0.62rem] border border-[#c9a467] bg-[#c9a467] px-3.5 text-[0.58rem] font-semibold tracking-[0.14em] text-black transition-colors hover:bg-[#d7b57c] sm:h-9.5 sm:text-[0.6rem] xl:h-9 xl:min-w-[8.8rem] xl:text-[0.56rem]"
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
