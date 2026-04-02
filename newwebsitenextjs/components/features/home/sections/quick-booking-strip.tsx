"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
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
  const [eventType, setEventType] = useState(content.eventTypes[0] ?? "Destination Wedding");

  const bookingHref = useMemo(() => {
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests,
      eventType,
    });

    return `/booking?${params.toString()}`;
  }, [checkIn, checkOut, guests, eventType]);

  return (
    <section className="relative z-20 -mt-6 px-5 pb-6 md:-mt-8 md:px-10 md:pb-8">
      <div className="mx-auto max-w-[94rem]">
        <div className="rounded-[1.55rem] border border-[#c9a46e]/20 bg-[#15110d]/94 px-4 py-3 shadow-[0_18px_36px_rgba(8,16,11,0.18)] backdrop-blur-sm md:px-5 md:py-3">
          <div className="grid gap-3 xl:grid-cols-[minmax(9.5rem,0.72fr)_minmax(0,4.28fr)] xl:items-end">
            <div className="min-w-0">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#c9a46e]">Quick Booking</p>
              <h2 className="mt-1 hidden text-balance text-lg leading-tight text-[#fff0d9] md:text-[1.15rem] xl:block">{content.title}</h2>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_0.78fr_1.12fr_auto] xl:items-end">
              <label className="grid gap-1">
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#c9a46e]">
                  {content.fields.checkIn}
                </span>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="h-11 rounded-[0.9rem] border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition-colors focus:border-[#c9a46e]/50"
                />
              </label>

              <label className="grid gap-1">
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#c9a46e]">
                  {content.fields.checkOut}
                </span>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="h-11 rounded-[0.9rem] border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition-colors focus:border-[#c9a46e]/50"
                />
              </label>

              <label className="grid gap-1">
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#c9a46e]">
                  {content.fields.guests}
                </span>
                <input
                  type="number"
                  min={1}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="h-11 rounded-[0.9rem] border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition-colors focus:border-[#c9a46e]/50"
                />
              </label>

              <label className="grid gap-1">
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#c9a46e]">
                  {content.fields.eventType}
                </span>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="h-11 rounded-[0.9rem] border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition-colors focus:border-[#c9a46e]/50"
                >
                  {content.eventTypes.map((option) => (
                    <option key={option} value={option} className="text-black">
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid items-end">
                <Link
                  href={bookingHref}
                  className="inline-flex h-11 items-center justify-center rounded-[0.9rem] border border-[#c9a467] bg-[#c9a467] px-5 text-[0.72rem] font-semibold tracking-[0.18em] text-black transition-colors hover:bg-[#d7b57c] xl:min-w-[11rem]"
                  data-cursor="hover"
                >
                  {content.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
