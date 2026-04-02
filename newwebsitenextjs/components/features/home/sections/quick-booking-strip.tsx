"use client";

import { useState } from "react";
import { buildDirectBookingEngineUrl } from "@/lib/constants/booking";
import { homeSectionContent } from "@/lib/data/content/resort-content";

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
  const [eventType, setEventType] = useState<string>(content.eventTypes[0] ?? "Destination Wedding");
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
    <section className="relative z-20 -mt-3 px-4 pb-6 md:-mt-6 md:px-8 md:pb-8">
      <div className="mx-auto max-w-[76rem]">
        <div className="rounded-[1.25rem] border border-[#c9a46e]/20 bg-[#15110d]/95 px-3 py-3 shadow-[0_18px_36px_rgba(8,16,11,0.18)] backdrop-blur-sm md:px-4 md:py-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#c9a46e]">Quick Booking</p>
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 xl:grid-cols-[1fr_1fr_0.7fr_1fr_auto] xl:items-end">
            <label className="grid gap-1">
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#c9a46e]">
                {content.fields.checkIn}
              </span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="h-9 rounded-[0.8rem] border border-white/10 bg-black/20 px-3 text-[0.82rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50 md:h-10 md:text-[0.88rem]"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#c9a46e]">
                {content.fields.checkOut}
              </span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="h-9 rounded-[0.8rem] border border-white/10 bg-black/20 px-3 text-[0.82rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50 md:h-10 md:text-[0.88rem]"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#c9a46e]">
                {content.fields.guests}
              </span>
              <input
                type="number"
                min={1}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="h-9 rounded-[0.8rem] border border-white/10 bg-black/20 px-3 text-[0.82rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50 md:h-10 md:text-[0.88rem]"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#c9a46e]">
                {content.fields.eventType}
              </span>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="h-9 rounded-[0.8rem] border border-white/10 bg-black/20 px-3 text-[0.82rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50 md:h-10 md:text-[0.88rem]"
              >
                {content.eventTypes.map((option) => (
                  <option key={option} value={option} className="text-black">
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <div className="col-span-2 grid items-end xl:col-span-1">
              <button
                type="button"
                onClick={handleBookingRedirect}
                className="inline-flex h-9 items-center justify-center rounded-[0.8rem] border border-[#c9a467] bg-[#c9a467] px-4 text-[0.64rem] font-semibold tracking-[0.16em] text-black transition-colors hover:bg-[#d7b57c] md:h-10 md:px-5 xl:min-w-[10rem]"
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
