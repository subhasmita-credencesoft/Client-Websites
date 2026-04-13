"use client";

import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { Modal } from "@/components/ui/Modal";
import { bookingEngineUrl } from "@/lib/data";

const roomOptions = ["Any Room", "Budget Double Room", "Standard Room", "Superior King Room", "Standard Room Pool Access", "Superior Pool View"];

function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(date);
}

export function BookingBar() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3)
  });
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState(roomOptions[0]);
  const [openField, setOpenField] = useState<"dates" | null>(null);

  const values = useMemo(
    () => ({
      checkIn: range?.from ? formatDate(range.from) : "Add date",
      checkOut: range?.to ? formatDate(range.to) : "Add date"
    }),
    [range]
  );

  return (
    <>
      <div className="container-shell relative z-20 -mt-16">
        <div className="grid gap-5 rounded-[28px] border border-gold/20 bg-dark/85 p-6 shadow-glow backdrop-blur-xl md:grid-cols-2 xl:grid-cols-[1fr_1fr_0.7fr_0.8fr_auto] xl:items-end">
          <button onClick={() => setOpenField("dates")} className="border-b border-gold/35 pb-4 text-left">
            <div className="font-display text-xl text-ivory">Check-in</div>
            <div className="mt-2 text-sm uppercase tracking-[0.28em] text-ivory/55">{values.checkIn}</div>
          </button>
          <button onClick={() => setOpenField("dates")} className="border-b border-gold/35 pb-4 text-left">
            <div className="font-display text-xl text-ivory">Check-out</div>
            <div className="mt-2 text-sm uppercase tracking-[0.28em] text-ivory/55">{values.checkOut}</div>
          </button>
          <div className="border-b border-gold/35 pb-4">
            <div className="font-display text-xl text-ivory">Guests</div>
            <div className="mt-2 flex items-center gap-4 text-sm uppercase tracking-[0.28em] text-ivory/55">
              <button aria-label="Decrease guests" onClick={() => setGuests((value) => Math.max(1, value - 1))}>
                <Minus size={16} />
              </button>
              <span>{guests} Guests</span>
              <button aria-label="Increase guests" onClick={() => setGuests((value) => value + 1)}>
                <Plus size={16} />
              </button>
            </div>
          </div>
          <label className="border-b border-gold/35 pb-4">
            <div className="font-display text-xl text-ivory">Room Type</div>
            <select
              value={roomType}
              onChange={(event) => setRoomType(event.target.value)}
              className="mt-2 w-full bg-transparent text-sm uppercase tracking-[0.28em] text-ivory/55"
            >
              {roomOptions.map((option) => (
                <option key={option} value={option} className="bg-dark text-ivory">
                  {option}
                </option>
              ))}
            </select>
          </label>
          <a
            href={bookingEngineUrl}
            className="shimmer-button inline-flex items-center justify-center rounded-full bg-gold px-6 py-4 text-xs uppercase tracking-[0.32em] text-dark transition hover:bg-gold-light md:col-span-2 xl:col-span-1"
          >
            Check Availability
          </a>
        </div>
      </div>

      <Modal open={openField === "dates"} onClose={() => setOpenField(null)} title="Select your dates">
        <div className="day-picker">
          <DayPicker mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
        </div>
      </Modal>
    </>
  );
}
