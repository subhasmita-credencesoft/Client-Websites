"use client";

import { forwardRef, useEffect, useState } from "react";
import { formatDate, normalizeDate } from "@/lib/constants/booking";
import { cn } from "@/lib/utils/cn";

type ThemedDatePickerProps = {
  value: string;
  onChange: (value: string) => void;
  minDate?: string;
  className?: string;
  popperClassName?: string;
};

type DateInputButtonProps = {
  value?: string;
  onClick?: () => void;
  className?: string;
};

const DateInputButton = forwardRef<HTMLButtonElement, DateInputButtonProps>(function DateInputButton(
  { value, onClick, className },
  ref,
) {
  const displayValue = value || "Select date";

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={cn(
        "mountain-datepicker-trigger inline-flex w-full items-center justify-between gap-3 rounded-[0.65rem] text-left",
        className,
      )}
    >
      <span className="truncate">{displayValue}</span>
      <span aria-hidden="true" className="shrink-0 text-white/42">
        <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current">
          <path d="M2.15 4.3a.75.75 0 0 1 1.06 0L6 7.09 8.79 4.3a.75.75 0 1 1 1.06 1.06L6.53 8.69a.75.75 0 0 1-1.06 0L2.15 5.36a.75.75 0 0 1 0-1.06Z" />
        </svg>
      </span>
    </button>
  );
});

export function ThemedDatePicker({
  value,
  onChange,
  minDate,
  className,
  popperClassName,
}: ThemedDatePickerProps) {
  const [DatePicker, setDatePicker] = useState<null | typeof import("react-datepicker").default>(null);

  useEffect(() => {
    let isMounted = true;

    import("react-datepicker").then((module) => {
      if (!isMounted) return;
      setDatePicker(() => module.default);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!DatePicker) {
    return (
      <input
        type="date"
        value={value}
        min={minDate}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "mountain-datepicker-trigger inline-flex w-full items-center justify-between gap-3 rounded-[0.65rem] text-left",
          className,
        )}
      />
    );
  }

  return (
    <DatePicker
      selected={normalizeDate(value)}
      onChange={(date: Date | null) => {
        if (!date) return;
        onChange(formatDate(date));
      }}
      minDate={normalizeDate(minDate) ?? undefined}
      dateFormat="dd-MM-yyyy"
      calendarClassName="mountain-datepicker"
      popperClassName={cn("mountain-datepicker-popper", popperClassName)}
      customInput={<DateInputButton className={className} />}
      showPopperArrow={false}
      fixedHeight
    />
  );
}
