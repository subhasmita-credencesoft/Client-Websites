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
        insideHero ? "w-full px-0 pt-1.5 md:pt-2" : "-mt-12 bg-black pb-0 md:-mt-16 md:pb-0",
      )}
      data-reveal={insideHero ? true : undefined}
    >
      <div
        className="mx-auto max-w-[60rem]"
        data-parallax={insideHero ? true : undefined}
        data-parallax-depth={insideHero ? "4" : undefined}
      >
        <div className="rounded-[0.9rem] border border-[#c9a46e]/18 bg-[#15110d]/95 px-2 py-2 shadow-[0_10px_22px_rgba(8,16,11,0.14)] backdrop-blur-sm sm:px-2.5 sm:py-2.5 md:px-3 md:py-2.5">
          <div className="mb-1 flex items-center justify-between gap-3">
            <p className="text-[0.46rem] font-semibold uppercase tracking-[0.18em] text-[#c9a46e] sm:text-[0.5rem]">Quick Booking</p>
          </div>

          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_0.55fr_auto] xl:items-end">
            <label className="grid gap-1">
              <span className="text-[0.46rem] font-semibold uppercase tracking-[0.12em] text-[#c9a46e] sm:text-[0.48rem]">
                {content.fields.checkIn}
              </span>
              <ThemedDatePicker
                value={checkIn}
                onChange={handleCheckInChange}
                minDate={getTodayDateString()}
                disabled={!isReady}
                className="h-8.5 rounded-[0.62rem] border border-white/10 bg-black/20 px-2.5 text-[0.76rem] text-white transition-colors hover:border-white/16 focus-visible:border-[#c9a46e]/50 sm:h-9 sm:text-[0.8rem] xl:h-8.5 xl:text-[0.74rem]"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-[0.46rem] font-semibold uppercase tracking-[0.12em] text-[#c9a46e] sm:text-[0.48rem]">
                {content.fields.checkOut}
              </span>
              <ThemedDatePicker
                value={checkOut}
                onChange={setCheckOut}
                minDate={checkIn}
                disabled={!isReady}
                className="h-8.5 rounded-[0.62rem] border border-white/10 bg-black/20 px-2.5 text-[0.76rem] text-white transition-colors hover:border-white/16 focus-visible:border-[#c9a46e]/50 sm:h-9 sm:text-[0.8rem] xl:h-8.5 xl:text-[0.74rem]"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-[0.46rem] font-semibold uppercase tracking-[0.12em] text-[#c9a46e] sm:text-[0.48rem]">
                {content.fields.guests}
              </span>
              <input
                type="number"
                min={1}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                disabled={!isReady}
                className="h-8.5 rounded-[0.62rem] border border-white/10 bg-black/20 px-2.5 text-[0.76rem] text-white outline-none transition-colors hover:border-white/16 focus:border-[#c9a46e]/50 sm:h-9 sm:text-[0.8rem] xl:h-8.5 xl:text-[0.74rem]"
              />
            </label>

            <div className="grid items-end sm:col-span-2 xl:col-span-1">
              <button
                type="button"
                onClick={handleBookingRedirect}
                disabled={!isReady}
                className="inline-flex h-8.5 w-full items-center justify-center rounded-[0.62rem] border border-[#c9a467] bg-[#c9a467] px-3 text-[0.56rem] font-semibold tracking-[0.13em] text-black transition-colors hover:bg-[#d7b57c] sm:h-9 sm:text-[0.58rem] xl:h-8.5 xl:min-w-[8.2rem] xl:text-[0.54rem]"
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
