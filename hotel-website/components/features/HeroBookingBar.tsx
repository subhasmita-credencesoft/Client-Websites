"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";

function toIsoDate(date: Date | null) {
  if (!date) return "";
  return format(date, "yyyy-MM-dd");
}

type DateTriggerProps = {
  onClick?: () => void;
  displayText: string;
  className?: string;
};

const DateTrigger = forwardRef<HTMLButtonElement, DateTriggerProps>(function DateTrigger(
  { onClick, displayText, className = "" },
  ref,
) {
  return (
    <button
      type="button"
      ref={ref}
      onClick={onClick}
      className={`flex h-12 w-full items-center justify-between px-2 text-left text-[1.02rem] font-medium text-white sm:text-[1.06rem] md:h-14 md:px-4 md:text-[1.12rem] lg:h-16 lg:text-[1.18rem] ${className}`}
    >
      <span className="whitespace-nowrap">{displayText}</span>
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
  );
});

export default function HeroBookingBar() {
  const router = useRouter();
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const guestPanelRef = useRef<HTMLDivElement>(null);

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
  const checkIn = toIsoDate(checkInDate);
  const checkOut = toIsoDate(checkOutDate);
  const canSearch = Boolean(checkInDate && checkOutDate && totalGuests > 0);

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
  className="relative mx-auto mt-6 w-[85vw] max-w-[24rem] px-0 sm:mt-7 sm:max-w-[28rem] md:mt-8 md:max-w-[40rem] lg:max-w-[56rem] xl:mt-10 xl:max-w-[72rem]"
  onSubmit={handleSubmit}
>
      <div className="flex w-full flex-col rounded-[1.8rem] border border-white/65 bg-[#746b67]/78 px-4 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-[14px] md:px-6 md:py-4 lg:flex-row lg:items-center lg:gap-0 lg:px-7 lg:py-3">
        <div className="flex w-full flex-col md:flex-row md:items-center lg:flex-1">
          <div className="flex-1 min-w-[9.5rem]">
            <DatePicker
              selected={checkInDate}
              onChange={(date: Date | null) => {
                setCheckInDate(date);
                if (checkOutDate && date && checkOutDate < date) {
                  setCheckOutDate(null);
                }
              }}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            onCalendarOpen={() => setGuestsOpen(false)}
            popperPlacement="top-start"
            popperClassName="hotel-datepicker-popper"
              calendarClassName="hotel-datepicker"
              wrapperClassName="block w-full min-w-[9.5rem]"
              customInput={
                <DateTrigger
                  displayText={checkInDate ? format(checkInDate, "dd/MM/yyyy") : "Check in"}
                />
              }
            />
          </div>

          <div className="mx-1 h-px bg-white/40 md:h-10 md:w-px lg:h-12" />

          <div className="flex-1 min-w-[9.5rem]">
            <DatePicker
              selected={checkOutDate}
              onChange={(date: Date | null) => setCheckOutDate(date)}
              dateFormat="dd/MM/yyyy"
              minDate={checkInDate ?? new Date()}
              onCalendarOpen={() => setGuestsOpen(false)}
              popperPlacement="top-start"
              popperClassName="hotel-datepicker-popper"
              calendarClassName="hotel-datepicker"
              wrapperClassName="block w-full min-w-[9.5rem]"
              customInput={
                <DateTrigger
                  displayText={checkOutDate ? format(checkOutDate, "dd/MM/yyyy") : "Check out"}
                />
              }
            />
          </div>

          <div className="mx-1 h-px bg-white/40 md:h-10 md:w-px lg:h-12" />

         <div className="relative flex-1 overflow-visible" ref={guestPanelRef}>
            <button
              type="button"
              className="flex h-12 w-full items-center justify-between px-2 text-left text-[1.02rem] font-medium text-white sm:text-[1.06rem] md:h-14 md:px-4 md:text-[1.12rem] lg:h-16 lg:text-[1.18rem]"
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
              <div className="absolute bottom-[calc(100%+0.75rem)] left-1/2 z-50 w-[280px] max-w-[92vw] -translate-x-1/2 rounded-2xl bg-white p-3 text-[#0f415f] shadow-[0_18px_45px_rgba(0,0,0,0.28)] sm:left-auto sm:right-0 sm:w-[300px] sm:max-w-none sm:translate-x-0 sm:p-4">
               <div className="mb-4 flex items-center justify-between text-[1.2rem] leading-none sm:text-[1.5rem]">
                  <span>Adult</span>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="text-[1.7rem] leading-none"
                      onClick={() => setAdults((count) => Math.max(0, count - 1))}
                    >
                      -
                    </button>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/15 text-[1.3rem]">
                      {adults}
                    </span>
                    <button
                      type="button"
                      className="text-[1.7rem] leading-none"
                      onClick={() => setAdults((count) => count + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[1.9rem] leading-none">
                  <span>Children</span>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="text-[1.7rem] leading-none"
                      onClick={() => setChildren((count) => Math.max(0, count - 1))}
                    >
                      -
                    </button>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/15 text-[1.3rem]">
                      {children}
                    </span>
                    <button
                      type="button"
                      className="text-[1.7rem] leading-none"
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

        <div className="mt-3 w-full md:mt-4 lg:ml-4 lg:mt-0 lg:w-auto">
          <button
            type="submit"
            disabled={!canSearch}
            className="flex h-12 w-full min-w-0 items-center justify-center gap-2 rounded-full bg-[#e29a4e] px-8 text-[0.86rem] font-bold uppercase tracking-[0.06em] text-white transition hover:bg-[#d58b42] disabled:cursor-not-allowed disabled:opacity-65 md:h-[3.25rem] md:text-[0.88rem] lg:h-14 lg:min-w-48 lg:text-[0.9rem]"
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

      <input type="hidden" name="adults" value={adults} />
      <input type="hidden" name="children" value={children} />
      <input type="hidden" name="checkIn" value={checkIn} />
      <input type="hidden" name="checkOut" value={checkOut} />
    </form>
  );
}
