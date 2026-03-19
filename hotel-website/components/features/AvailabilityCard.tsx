"use client";

import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { forwardRef, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buildBookingEngineUrl } from "../../lib/booking/bookingEngine";

const BOOKING_BASE_URL = "https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true&checkinDay=10&checkinMonth=3&checkinYear=2026&nights=1&numGuests=2&numAdults=2&Children=0&rooms=1";
gsap.registerPlugin(ScrollTrigger);

type AvailabilityCardProps = {
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
};

function parseIsoDate(value: string) {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

const DateTrigger = forwardRef<
  HTMLButtonElement,
  { value?: string; onClick?: () => void; placeholder: string }
>(function DateTrigger({ value, onClick, placeholder }, ref) {
  return (
    <button
      type="button"
      ref={ref}
      onClick={onClick}
     className="mt-2.5 flex w-full items-center justify-between border-b border-[#d6d9dd] pb-2.5 text-[0.9rem] text-[#123f5c] sm:pb-3 sm:text-[0.95rem] md:text-[1rem]"
    >
      <span>{value || placeholder}</span>
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
  );
});

export default function AvailabilityCard({
  initialCheckIn = "",
  initialCheckOut = "",
  initialGuests = 1,
}: AvailabilityCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const guestsCountRef = useRef<HTMLSpanElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date | null>(parseIsoDate(initialCheckIn));
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(parseIsoDate(initialCheckOut));
  const [guests, setGuests] = useState(Math.max(0, initialGuests));
  const checkIn = checkInDate ? format(checkInDate, "dd/MM/yyyy") : "";
  const checkOut = checkOutDate ? format(checkOutDate, "dd/MM/yyyy") : "";
  const canCheckRates = Boolean(checkInDate && checkOutDate && guests > 0);

  function handleCheckRates() {
    if (!canCheckRates) return;
    const bookingUrl = buildBookingEngineUrl({
      baseUrl: BOOKING_BASE_URL,
      checkIn: checkInDate as Date,
      checkOut: checkOutDate as Date,
      adults: guests,
      children: 0,
      rooms: 1,
    });
    window.location.href = bookingUrl;
  }

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 88%",
            once: true,
          },
        });

        tl.fromTo(
          ".ac-title",
          { yPercent: 110, autoAlpha: 0, filter: "blur(8px)" },
          { yPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.85, ease: "power4.out" },
        )
          .fromTo(
            ".ac-field",
            { y: 16, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.08, ease: "power3.out" },
            "<+0.08",
          )
          .fromTo(
            ".ac-note, .ac-cta",
            { y: 10, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
            "<+0.06",
          );
      }, cardRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (!guestsCountRef.current) return;

    gsap.fromTo(
      guestsCountRef.current,
      { scale: 0.92, y: 2, autoAlpha: 0.72 },
      { scale: 1, y: 0, autoAlpha: 1, duration: 0.28, ease: "power2.out" },
    );
  }, [guests]);

  useEffect(() => {
    if (!ctaRef.current) return;

    gsap.to(ctaRef.current, {
      scale: canCheckRates ? 1.02 : 1,
      boxShadow: canCheckRates ? "0 14px 30px rgba(223, 152, 78, 0.28)" : "0 0 0 rgba(0,0,0,0)",
      duration: 0.24,
      ease: "power2.out",
    });
  }, [canCheckRates]);

  return (
    <aside ref={cardRef} className="rounded-2xl border border-[#eceae4] bg-white p-4 shadow-[0_8px_18px_rgba(17,33,41,0.02)] sm:p-5 md:p-6 lg:sticky lg:top-24">
      <h3 className="ac-title font-serif text-[2rem] leading-[0.98] text-[#123f5c] sm:text-[2.2rem]">Check Availability</h3>

      <div className="mt-4 space-y-4 sm:mt-5 sm:space-y-5">
        <label className="ac-field block">
        <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#7d8692] sm:text-[0.72rem] sm:tracking-[0.24em]">
            Check in
          </span>
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
            popperPlacement="bottom-start"
            popperClassName="hotel-datepicker-popper"
            calendarClassName="hotel-datepicker"
            customInput={<DateTrigger placeholder="Select Date" value={checkIn} />}
          />
        </label>

        <label className="ac-field block">
          <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#7d8692] sm:text-[0.72rem] sm:tracking-[0.24em]">
            Check out
          </span>
          <DatePicker
            selected={checkOutDate}
            onChange={(date: Date | null) => setCheckOutDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={checkInDate ?? new Date()}
            popperPlacement="bottom-start"
            popperClassName="hotel-datepicker-popper"
            calendarClassName="hotel-datepicker"
            customInput={<DateTrigger placeholder="Select Date" value={checkOut} />}
          />
        </label>

        <div className="ac-field block">
          <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#7d8692] sm:text-[0.72rem] sm:tracking-[0.24em]">
            Guests
          </span>
         <div className="mt-2.5 flex items-center justify-between border-b border-[#d6d9dd] pb-2.5 text-[0.9rem] text-[#123f5c] sm:pb-3 sm:text-[0.95rem] md:text-[1rem]">
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#cfd4d8] text-[1rem] text-[#123f5c] transition hover:bg-white sm:text-[1.1rem] md:text-[1.2rem]"
              onClick={() => setGuests((value) => Math.max(0, value - 1))}
            >
              -
            </button>
            <span ref={guestsCountRef}>{guests}</span>
            <button
              type="button"
             className="flex h-7 w-7 items-center justify-center rounded-full border border-[#cfd4d8] text-[1rem] text-[#123f5c] transition hover:bg-white sm:text-[1.1rem] md:text-[1.2rem]"
              onClick={() => setGuests((value) => value + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <p className="ac-note mt-5 text-[0.68rem] uppercase tracking-[0.14em] text-[#7d8692]">
        Best rate guarantee
      </p>
      <button
        ref={ctaRef}
        type="button"
        onClick={handleCheckRates}
        disabled={!canCheckRates}
        className="ac-cta mt-3.5 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#df984e] text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#cf8841] disabled:cursor-not-allowed disabled:opacity-60 sm:h-11 sm:text-[0.76rem]"
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
