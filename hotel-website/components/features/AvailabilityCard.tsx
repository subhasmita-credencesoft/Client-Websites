"use client";

import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { forwardRef, useState } from "react";
import { useRouter } from "next/navigation";

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
     className="mt-3 flex w-full items-center justify-between border-b border-[#d6d9dd] pb-3 text-[0.95rem] text-[#123f5c] sm:pb-4 sm:text-[1rem] md:text-[1.08rem]"
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
  initialGuests = 0,
}: AvailabilityCardProps) {
  const router = useRouter();
  const [checkInDate, setCheckInDate] = useState<Date | null>(parseIsoDate(initialCheckIn));
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(parseIsoDate(initialCheckOut));
  const [guests, setGuests] = useState(Math.max(0, initialGuests));
  const checkIn = checkInDate ? format(checkInDate, "dd/MM/yyyy") : "";
  const checkOut = checkOutDate ? format(checkOutDate, "dd/MM/yyyy") : "";
  const canCheckRates = Boolean(checkInDate && checkOutDate && guests > 0);

  function handleCheckRates() {
    if (!canCheckRates) return;
    const query = new URLSearchParams({
      checkIn: format(checkInDate as Date, "yyyy-MM-dd"),
      checkOut: format(checkOutDate as Date, "yyyy-MM-dd"),
      adults: String(guests),
      children: "0",
      noOfRooms: "1",
    });
    router.push(`/rooms/reservation?${query.toString()}`);
  }

  return (
    <aside className="rounded-2xl bg-white p-5 shadow-[0_12px_30px_rgba(17,33,41,0.06)] sm:p-6 md:p-8 lg:sticky lg:top-24">
      <h3 className="font-serif text-2xl text-[#103f5c] sm:text-[1.75rem] md:text-3xl">Check Availability</h3>

      <div className="mt-6 space-y-5 sm:mt-7 sm:space-y-6 md:mt-8 md:space-y-7">
        <label className="block">
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

        <label className="block">
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

        <label className="block">
          <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#7d8692] sm:text-[0.72rem] sm:tracking-[0.24em]">
            Guests
          </span>
         <div className="mt-3 flex items-center justify-between border-b border-[#d6d9dd] pb-3 text-[0.95rem] text-[#123f5c] sm:pb-4 sm:text-[1rem] md:text-[1.08rem]">
            <button
              type="button"
              className="text-[1rem] text-[#123f5c] sm:text-[1.1rem] md:text-[1.2rem]"
              onClick={() => setGuests((value) => Math.max(0, value - 1))}
            >
              -
            </button>
            <span>{guests}</span>
            <button
              type="button"
             className="text-[1rem] text-[#123f5c] sm:text-[1.1rem] md:text-[1.2rem]"
              onClick={() => setGuests((value) => value + 1)}
            >
              +
            </button>
          </div>
        </label>
      </div>

      <button
        type="button"
        onClick={handleCheckRates}
        disabled={!canCheckRates}
        className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#df984e] text-[0.76rem] font-semibold uppercase tracking-[0.06em] text-white transition hover:bg-[#cf8841] disabled:cursor-not-allowed disabled:opacity-60 sm:mt-8 sm:h-13 sm:text-[0.82rem] md:mt-9 md:h-14 md:text-[0.86rem]"
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
