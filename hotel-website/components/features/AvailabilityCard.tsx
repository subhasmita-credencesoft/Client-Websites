"use client";

import { useRef, useState } from "react";

type AvailabilityCardProps = {
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
};

function formatDisplayDate(value: string) {
  if (!value) return "Select Date";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "Select Date";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export default function AvailabilityCard({
  initialCheckIn = "",
  initialCheckOut = "",
  initialGuests = 0,
}: AvailabilityCardProps) {
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(Math.max(0, initialGuests));
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  return (
    <aside className="rounded-2xl bg-white p-8 shadow-[0_12px_30px_rgba(17,33,41,0.06)] lg:sticky lg:top-24">
      <h3 className="font-serif text-5xl text-[#103f5c]">Check Availability</h3>

      <div className="mt-8 space-y-7">
        <label className="block">
          <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#7d8692]">
            Check in
          </span>
          <button
            type="button"
            className="mt-3 flex w-full items-center justify-between border-b border-[#d6d9dd] pb-4 text-2xl text-[#123f5c]"
            onClick={() => {
              checkInRef.current?.showPicker?.();
              checkInRef.current?.focus();
            }}
          >
            <span>{formatDisplayDate(checkIn)}</span>
            <span>
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </button>
          <input
            ref={checkInRef}
            type="date"
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
            className="absolute h-0 w-0 opacity-0"
          />
        </label>

        <label className="block">
          <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#7d8692]">
            Check out
          </span>
          <button
            type="button"
            className="mt-3 flex w-full items-center justify-between border-b border-[#d6d9dd] pb-4 text-2xl text-[#123f5c]"
            onClick={() => {
              checkOutRef.current?.showPicker?.();
              checkOutRef.current?.focus();
            }}
          >
            <span>{formatDisplayDate(checkOut)}</span>
            <span>
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </button>
          <input
            ref={checkOutRef}
            type="date"
            min={checkIn || undefined}
            value={checkOut}
            onChange={(event) => setCheckOut(event.target.value)}
            className="absolute h-0 w-0 opacity-0"
          />
        </label>

        <label className="block">
          <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#7d8692]">
            Guests
          </span>
          <div className="mt-3 flex items-center justify-between border-b border-[#d6d9dd] pb-4 text-2xl text-[#123f5c]">
            <button
              type="button"
              className="text-2xl text-[#123f5c]"
              onClick={() => setGuests((value) => Math.max(0, value - 1))}
            >
              -
            </button>
            <span>{guests}</span>
            <button
              type="button"
              className="text-2xl text-[#123f5c]"
              onClick={() => setGuests((value) => value + 1)}
            >
              +
            </button>
          </div>
        </label>
      </div>

      <button
        type="button"
        className="mt-9 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#df984e] text-[0.86rem] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#cf8841]"
      >
        Check Rates
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m9 6 6 6-6 6" />
        </svg>
      </button>
    </aside>
  );
}
