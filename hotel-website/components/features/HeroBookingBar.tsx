"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

function formatDisplayDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export default function HeroBookingBar() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const guestPanelRef = useRef<HTMLDivElement>(null);
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!guestPanelRef.current?.contains(event.target as Node)) {
        setGuestsOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const totalGuests = useMemo(() => adults + children, [adults, children]);
  const canSearch = Boolean(checkIn && checkOut && totalGuests > 0);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSearch) {
      return;
    }

    const params = new URLSearchParams({
      checkIn,
      checkOut,
      adults: String(adults),
      children: String(children),
    });

    router.push(`/rooms/reservation?${params.toString()}`);
  }

  return (
    <form
      className="relative mx-auto mt-6 w-full max-w-[22rem] px-2 sm:mt-7 sm:max-w-[28rem] sm:px-0 md:mt-8 md:max-w-[46rem] lg:max-w-[52rem] xl:mt-10 xl:max-w-[74rem]"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full flex-col rounded-[2rem] border border-white/65 bg-[#746b67]/78 px-4 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-[14px] md:px-6 md:py-5 xl:flex-row xl:items-center xl:gap-0 xl:px-8 xl:py-3">
        <div className="flex w-full flex-col md:flex-row md:items-center xl:flex-1">
          <button
            type="button"
            className="flex h-12 flex-1 items-center justify-between px-2 text-left text-[1.05rem] font-medium text-white sm:text-[1.1rem] md:h-14 md:px-4 md:text-[1.15rem] xl:h-16 xl:text-[1.2rem]"
            onClick={() => {
              setGuestsOpen(false);
              checkInRef.current?.showPicker?.();
              checkInRef.current?.focus();
            }}
          >
            <span className="whitespace-nowrap">{checkIn ? formatDisplayDate(checkIn) : "Check in"}</span>
            <svg
              className="h-5 w-5 text-white/95"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <div className="mx-1 h-px bg-white/40 md:h-10 md:w-px xl:h-12" />

          <button
            type="button"
            className="flex h-12 flex-1 items-center justify-between px-2 text-left text-[1.05rem] font-medium text-white sm:text-[1.1rem] md:h-14 md:px-4 md:text-[1.15rem] xl:h-16 xl:text-[1.2rem]"
            onClick={() => {
              setGuestsOpen(false);
              checkOutRef.current?.showPicker?.();
              checkOutRef.current?.focus();
            }}
          >
            <span className="whitespace-nowrap">{checkOut ? formatDisplayDate(checkOut) : "Check out"}</span>
            <svg
              className="h-5 w-5 text-white/95"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <div className="mx-1 h-px bg-white/40 md:h-10 md:w-px xl:h-12" />

          <div className="relative flex-1" ref={guestPanelRef}>
            <button
              type="button"
              className="flex h-12 w-full items-center justify-between px-2 text-left text-[1.05rem] font-medium text-white sm:text-[1.1rem] md:h-14 md:px-4 md:text-[1.15rem] xl:h-16 xl:text-[1.2rem]"
              onClick={() => setGuestsOpen((open) => !open)}
            >
              <span className="whitespace-nowrap">
                {totalGuests > 0 ? `${totalGuests} Guest${totalGuests > 1 ? "s" : ""}` : "Guests"}
              </span>
              <svg
                className="h-5 w-5 text-white/95"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {guestsOpen && (
              <div className="absolute bottom-[calc(100%+0.75rem)] left-0 z-20 w-full rounded-2xl bg-white p-5 text-[#0f415f] shadow-[0_18px_45px_rgba(0,0,0,0.28)] lg:w-[20rem] lg:p-6">
                <div className="mb-5 flex items-center justify-between text-[1.5rem] lg:text-[1.9rem]">
                  <span>Adult</span>
                  <div className="flex items-center gap-5">
                    <button
                      type="button"
                      className="text-[1.5rem] leading-none lg:text-[1.8rem]"
                      onClick={() => setAdults((count) => Math.max(0, count - 1))}
                    >
                      -
                    </button>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/15 text-[1.2rem] lg:h-10 lg:w-10 lg:text-[1.6rem]">
                      {adults}
                    </span>
                    <button
                      type="button"
                      className="text-[1.5rem] leading-none lg:text-[1.8rem]"
                      onClick={() => setAdults((count) => count + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[1.5rem] lg:text-[1.9rem]">
                  <span>Children</span>
                  <div className="flex items-center gap-5">
                    <button
                      type="button"
                      className="text-[1.5rem] leading-none lg:text-[1.8rem]"
                      onClick={() => setChildren((count) => Math.max(0, count - 1))}
                    >
                      -
                    </button>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/15 text-[1.2rem] lg:h-10 lg:w-10 lg:text-[1.6rem]">
                      {children}
                    </span>
                    <button
                      type="button"
                      className="text-[1.5rem] leading-none lg:text-[1.8rem]"
                      onClick={() => setChildren((count) => count + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 w-full md:mt-4 xl:ml-5 xl:mt-0 xl:w-auto">
          <button
            type="submit"
            disabled={!canSearch}
            className="flex h-12 w-full min-w-0 items-center justify-center gap-2 rounded-full bg-[#e29a4e] px-8 text-[0.88rem] font-bold uppercase tracking-[0.06em] text-white transition hover:bg-[#d58b42] disabled:cursor-not-allowed disabled:opacity-65 md:h-13 md:text-[0.9rem] xl:h-14 xl:min-w-52 xl:text-[0.92rem]"
          >
            Search
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <input
        ref={checkInRef}
        type="date"
        name="checkIn"
        value={checkIn}
        onChange={(event) => setCheckIn(event.target.value)}
        className="pointer-events-none absolute left-0 top-0 h-0 w-0 opacity-0"
      />
      <input
        ref={checkOutRef}
        type="date"
        name="checkOut"
        value={checkOut}
        min={checkIn || undefined}
        onChange={(event) => setCheckOut(event.target.value)}
        className="pointer-events-none absolute left-0 top-0 h-0 w-0 opacity-0"
      />
      <input type="hidden" name="adults" value={adults} />
      <input type="hidden" name="children" value={children} />
    </form>
  );
}
