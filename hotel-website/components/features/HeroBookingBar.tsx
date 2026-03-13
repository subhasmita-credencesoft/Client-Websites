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

const ROOM_OPTIONS = [
  { value: "deluxe-room", label: "DELUXE ROOM" },
  { value: "super-deluxe-room", label: "SUPER DELUXE ROOM" },
  { value: "one-day-picnic", label: "ONE DAY PICNIC" },
  { value: "conference", label: "CONFERENCE" },
  { value: "special-offer", label: "SPECIAL OFFER" },
  { value: "monsoon-offer", label: "MONSOON OFFER" },
];

const DateTrigger = forwardRef<HTMLButtonElement, DateTriggerProps>(function DateTrigger(
  { onClick, displayText, className = "" },
  ref,
) {
  return (
    <button
      type="button"
      ref={ref}
      onClick={onClick}
      className={`flex h-9 w-full items-center justify-between px-2 text-left text-[0.82rem] font-medium text-white md:h-10 md:px-3 md:text-[0.86rem] lg:h-11 lg:text-[0.9rem] ${className}`}
    >
      <span className="whitespace-nowrap">{displayText}</span>
      <svg
        className="h-3.5 w-3.5 text-white/95"
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
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectOpen, setSelectOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const guestPanelRef = useRef<HTMLDivElement>(null);
  const selectPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!guestPanelRef.current?.contains(event.target as Node)) {
        setGuestsOpen(false);
      }
      if (!selectPanelRef.current?.contains(event.target as Node)) {
        setSelectOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const totalGuests = useMemo(() => adults + children, [adults, children]);
  const checkIn = toIsoDate(checkInDate);
  const checkOut = toIsoDate(checkOutDate);
  const canSearch = Boolean(checkInDate && checkOutDate && totalGuests > 0 && selectedRoom);

  const errors = submitted
    ? {
        room: !selectedRoom,
        checkIn: !checkInDate,
        checkOut: !checkOutDate,
        guests: totalGuests === 0,
      }
    : { room: false, checkIn: false, checkOut: false, guests: false };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (!canSearch) return;
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      adults: String(adults),
      children: String(children),
      room: selectedRoom,
    });
    router.push(`/rooms/reservation?${params.toString()}`);
  }

  const selectedRoomLabel = ROOM_OPTIONS.find((o) => o.value === selectedRoom)?.label;

  return (
    <form
      className="relative mx-auto mt-6 w-[85vw] max-w-[22rem] px-0 sm:mt-7 sm:max-w-[26rem] md:mt-8 md:max-w-[38rem] lg:max-w-[58rem] xl:mt-10 xl:max-w-[72rem]"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="flex w-full flex-col rounded-[1.4rem] border border-white/65 bg-[#746b67]/78 px-3 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-[14px] md:px-5 md:py-3 lg:flex-row lg:items-center lg:gap-0 lg:px-6 lg:py-2">
        <div className="flex w-full flex-col md:flex-row md:items-center lg:flex-1">

          {/* ── Select / Room Type ── */}
          <div className="relative flex-1 min-w-[8rem]" ref={selectPanelRef}>
            <button
              type="button"
              className={`flex h-9 w-full items-center justify-between px-2 text-left text-[0.82rem] font-medium md:h-10 md:px-3 md:text-[0.86rem] lg:h-11 lg:text-[0.9rem] ${
                selectedRoomLabel ? "text-white" : "text-white/70"
              }`}
              onClick={() => {
                setSelectOpen((o) => !o);
                setGuestsOpen(false);
              }}
            >
              <span className="truncate whitespace-nowrap pr-1">
                {selectedRoomLabel ?? "Select"}
              </span>
              <svg
                className={`h-3.5 w-3.5 shrink-0 text-white/95 transition-transform duration-200 ${selectOpen ? "rotate-180" : ""}`}
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

            {errors.room && (
              <p className="absolute -bottom-4 left-2 text-[0.65rem] font-medium text-red-300 md:left-3">
                Please select a room type
              </p>
            )}

            {selectOpen && (
              <div className="absolute bottom-[calc(100%+0.6rem)] left-1/2 z-50 w-[min(220px,92vw)] -translate-x-1/2 overflow-hidden rounded-xl bg-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] sm:left-0 sm:translate-x-0">
                <div className="max-h-[220px] overflow-y-auto">
                  {ROOM_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`flex w-full items-center px-4 py-2.5 text-left text-[0.78rem] font-semibold tracking-wide transition hover:bg-[#f5f0eb] ${
                        selectedRoom === option.value
                          ? "bg-[#f5f0eb] text-[#e29a4e]"
                          : "text-[#0f415f]"
                      }`}
                      onClick={() => {
                        setSelectedRoom(option.value);
                        setSelectOpen(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mx-1 h-px bg-white/40 md:h-8 md:w-px lg:h-9" />

          {/* ── Check In ── */}
          <div className="relative flex-1 min-w-[8rem]">
            <DatePicker
              selected={checkInDate}
              onChange={(date: Date | null) => {
                setCheckInDate(date);
                if (checkOutDate && date && checkOutDate < date) setCheckOutDate(null);
              }}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              onCalendarOpen={() => { setGuestsOpen(false); setSelectOpen(false); }}
              popperPlacement="top-start"
              popperClassName="hotel-datepicker-popper"
              calendarClassName="hotel-datepicker"
              wrapperClassName="block w-full min-w-[8rem]"
              customInput={
                <DateTrigger
                  displayText={checkInDate ? format(checkInDate, "dd/MM/yyyy") : "Check in"}
                />
              }
            />
            {errors.checkIn && (
              <p className="absolute -bottom-4 left-2 text-[0.65rem] font-medium text-red-300 md:left-3">
                Required
              </p>
            )}
          </div>

          <div className="mx-1 h-px bg-white/40 md:h-8 md:w-px lg:h-9" />

          {/* ── Check Out ── */}
          <div className="relative flex-1 min-w-[8rem]">
            <DatePicker
              selected={checkOutDate}
              onChange={(date: Date | null) => setCheckOutDate(date)}
              dateFormat="dd/MM/yyyy"
              minDate={checkInDate ?? new Date()}
              onCalendarOpen={() => { setGuestsOpen(false); setSelectOpen(false); }}
              popperPlacement="top-start"
              popperClassName="hotel-datepicker-popper"
              calendarClassName="hotel-datepicker"
              wrapperClassName="block w-full min-w-[8rem]"
              customInput={
                <DateTrigger
                  displayText={checkOutDate ? format(checkOutDate, "dd/MM/yyyy") : "Check out"}
                />
              }
            />
            {errors.checkOut && (
              <p className="absolute -bottom-4 left-2 text-[0.65rem] font-medium text-red-300 md:left-3">
                Required
              </p>
            )}
          </div>

          <div className="mx-1 h-px bg-white/40 md:h-8 md:w-px lg:h-9" />

          {/* ── Guests ── */}
          <div className="relative flex-1 overflow-visible" ref={guestPanelRef}>
            <button
              type="button"
              className={`flex h-9 w-full items-center justify-between px-2 text-left text-[0.82rem] font-medium md:h-10 md:px-3 md:text-[0.86rem] lg:h-11 lg:text-[0.9rem] ${
                totalGuests > 0 ? "text-white" : "text-white/70"
              }`}
              onClick={() => { setGuestsOpen((open) => !open); setSelectOpen(false); }}
            >
              <span className="whitespace-nowrap">
                {totalGuests > 0 ? `${totalGuests} Guest${totalGuests > 1 ? "s" : ""}` : "Guests"}
              </span>
              <svg
                className={`h-3.5 w-3.5 text-white/95 transition-transform duration-200 ${guestsOpen ? "rotate-180" : ""}`}
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

            {errors.guests && (
              <p className="absolute -bottom-4 left-2 text-[0.65rem] font-medium text-red-300 md:left-3">
                Add at least 1 guest
              </p>
            )}

            {guestsOpen && (
              <div className="absolute bottom-[calc(100%+0.6rem)] left-1/2 z-50 w-[min(240px,92vw)] -translate-x-1/2 rounded-xl bg-white p-3 text-[#0f415f] shadow-[0_18px_45px_rgba(0,0,0,0.28)] sm:left-auto sm:right-0 sm:translate-x-0">
                {/* Adults Row */}
                <div className="flex items-center justify-between py-2 border-b border-black/8">
                  <span className="text-[0.88rem] font-medium">Adult</span>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-black/20 text-[1.1rem] leading-none transition hover:bg-black/5 disabled:opacity-30"
                      onClick={() => setAdults((c) => Math.max(0, c - 1))}
                      disabled={adults === 0}
                    >
                      −
                    </button>
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-black/15 text-[0.9rem] font-semibold">
                      {adults}
                    </span>
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-black/20 text-[1.1rem] leading-none transition hover:bg-black/5"
                      onClick={() => setAdults((c) => c + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Children Row */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-[0.88rem] font-medium">Children</span>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-black/20 text-[1.1rem] leading-none transition hover:bg-black/5 disabled:opacity-30"
                      onClick={() => setChildren((c) => Math.max(0, c - 1))}
                      disabled={children === 0}
                    >
                      −
                    </button>
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-black/15 text-[0.9rem] font-semibold">
                      {children}
                    </span>
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-black/20 text-[1.1rem] leading-none transition hover:bg-black/5"
                      onClick={() => setChildren((c) => c + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Search Button ── */}
        <div className="mt-2.5 w-full md:mt-3 lg:ml-3 lg:mt-0 lg:w-auto">
          <button
            type="submit"
            className="flex h-9 w-full min-w-0 items-center justify-center gap-1.5 rounded-full bg-[#e29a4e] px-6 text-[0.76rem] font-bold uppercase tracking-[0.06em] text-white transition hover:bg-[#d58b42] md:h-10 md:text-[0.78rem] lg:h-11 lg:min-w-36 lg:text-[0.8rem]"
          >
            Search
            <svg
              className="h-3.5 w-3.5"
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
      <input type="hidden" name="room" value={selectedRoom} />
    </form>
  );
}