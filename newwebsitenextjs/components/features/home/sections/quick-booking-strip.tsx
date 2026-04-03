"use client";

import { useState } from "react";
import { buildDirectBookingEngineUrl, normalizeDate, formatDate } from "@/lib/constants/booking";
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
    <section className="relative z-20 -mt-4 px-4 pb-5 md:-mt-8 md:px-8 md:pb-7">
      <div className="mx-auto max-w-[68rem]">
        <div className="rounded-[1rem] border border-[#c9a46e]/18 bg-[#15110d]/95 px-2.5 py-2 shadow-[0_10px_22px_rgba(8,16,11,0.14)] backdrop-blur-sm md:px-3 md:py-2.5">
          <div className="mb-1 flex items-center justify-between gap-3">
            <p className="text-[0.52rem] font-semibold uppercase tracking-[0.22em] text-[#c9a46e] md:text-[0.54rem]">Quick Booking</p>
          </div>

          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-[0.95fr_0.95fr_0.55fr_auto] lg:items-end">
            <label className="grid gap-1">
              <span className="text-[0.5rem] font-semibold uppercase tracking-[0.12em] text-[#c9a46e] md:text-[0.52rem]">
                {content.fields.checkIn}
              </span>
              <ThemedDatePicker
                value={checkIn}
                onChange={handleCheckInChange}
                minDate={getTodayDateString()}
                className="h-9 border border-white/10 bg-black/20 px-2.5 text-[0.74rem] text-white transition-colors md:h-9.5 md:text-[0.78rem] lg:h-9"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-[0.5rem] font-semibold uppercase tracking-[0.12em] text-[#c9a46e] md:text-[0.52rem]">
                {content.fields.checkOut}
              </span>
              <ThemedDatePicker
                value={checkOut}
                onChange={setCheckOut}
                minDate={checkIn}
                className="h-9 border border-white/10 bg-black/20 px-2.5 text-[0.74rem] text-white transition-colors md:h-9.5 md:text-[0.78rem] lg:h-9"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-[0.5rem] font-semibold uppercase tracking-[0.12em] text-[#c9a46e] md:text-[0.52rem]">
                {content.fields.guests}
              </span>
              <input
                type="number"
                min={1}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="h-9 rounded-[0.65rem] border border-white/10 bg-black/20 px-2.5 text-[0.74rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50 md:h-9.5 md:text-[0.78rem] lg:h-9"
              />
            </label>

            <div className="grid items-end sm:col-span-2 lg:col-span-1">
              <button
                type="button"
                onClick={handleBookingRedirect}
                className="inline-flex h-9 items-center justify-center rounded-[0.65rem] border border-[#c9a467] bg-[#c9a467] px-3 text-[0.56rem] font-semibold tracking-[0.14em] text-black transition-colors hover:bg-[#d7b57c] md:h-9.5 md:px-4 md:text-[0.58rem] lg:h-9 lg:min-w-[9.75rem]"
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
