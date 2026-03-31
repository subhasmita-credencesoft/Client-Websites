"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker, type DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const dayPickerClassNames = {
  months: "flex flex-col gap-4",
  month: "space-y-4",
  month_grid: "w-full border-collapse",
  caption: "flex items-center justify-center pt-1 relative",
  caption_label: "text-sm font-bold text-slate-800",
  nav: "space-x-1 flex items-center",
  nav_button:
    "h-8 w-8 bg-transparent p-0 text-primary hover:bg-primary/10 rounded-md transition-colors",
  table: "w-full border-collapse space-y-1",
  weekdays: "flex",
  weekday: "w-9 rounded-md text-slate-500 font-semibold text-[0.75rem]",
  head_row: "flex",
  head_cell: "text-slate-500 rounded-md w-9 font-semibold text-[0.75rem]",
  week: "flex w-full mt-2",
  row: "flex w-full mt-2",
  cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
  day: "h-9 w-9 p-0 font-medium rounded-md text-slate-800 hover:bg-primary/10 hover:text-slate-900 transition-colors",
  day_range_start:
    "bg-primary text-white hover:bg-primary hover:text-white",
  day_range_end:
    "bg-primary text-white hover:bg-primary hover:text-white",
  day_selected:
    "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white",
  day_today: "border border-primary text-primary",
  day_outside: "text-slate-300 opacity-70",
  day_disabled: "text-slate-300 opacity-50",
  day_range_middle: "aria-selected:bg-primary/15 aria-selected:text-slate-800",
  day_hidden: "invisible",
};

type DateRangeFieldProps = {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
};

export function DateRangeField({ value, onChange }: DateRangeFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [internalRange, setInternalRange] = useState<DateRange | undefined>();
  const range = value ?? internalRange;

  const handleSelect = (nextRange: DateRange | undefined) => {
    if (value === undefined) {
      setInternalRange(nextRange);
    }
    onChange?.(nextRange);
  };

  useEffect(() => {
    if (range?.from && range?.to) {
      setIsOpen(false);
    }
  }, [range]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const formattedValue = useMemo(() => {
    if (range?.from && range?.to) {
      return `${format(range.from, "MMM d")} - ${format(range.to, "MMM d")}`;
    }

    if (range?.from) {
      return `${format(range.from, "MMM d")} - Check-out`;
    }

    return "Check-in - Check-out";
  }, [range]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex-1 bg-gray-50 rounded-md px-4 py-3 flex items-center gap-3 border border-transparent focus-within:border-primary/50 transition-colors min-w-0",
        isOpen && "z-[120]"
      )}
    >
      <CalendarIcon className="w-5 h-5 text-primary shrink-0" />
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="text-left flex-1 min-w-0"
      >
        <span className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">
          Dates
        </span>
        <span
          className={cn(
            "block font-bold text-sm truncate",
            range?.from ? "text-gray-900" : "text-gray-400"
          )}
        >
          {formattedValue}
        </span>
      </button>

      {isOpen ? (
        <div className="absolute left-0 md:left-1/2 top-full mt-3 z-[130] w-[min(320px,calc(100vw-2rem))] md:w-[320px] md:-translate-x-1/2 rounded-2xl border border-gray-200 bg-white p-3 text-slate-900 shadow-2xl">
          <DayPicker
            animate
            mode="range"
            numberOfMonths={1}
            selected={range}
            onSelect={handleSelect}
            defaultMonth={range?.from}
            showOutsideDays
            disabled={{ before: new Date() }}
            classNames={dayPickerClassNames}
          />
        </div>
      ) : null}
    </div>
  );
}
