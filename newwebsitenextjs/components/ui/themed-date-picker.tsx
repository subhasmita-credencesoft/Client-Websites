"use client";

import { forwardRef } from "react";
import DatePicker from "react-datepicker";
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
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={cn(
        "mountain-datepicker-trigger inline-flex w-full items-center justify-between gap-3 rounded-[inherit] text-left",
        className,
      )}
    >
      <span>{value || "Select date"}</span>
      <span aria-hidden="true" className="text-white/42">▾</span>
    </button>
  );
});

function formatDisplayDate(value: string) {
  const parsed = normalizeDate(value);
  if (!parsed) return "";
  const day = String(parsed.getDate()).padStart(2, "0");
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const year = parsed.getFullYear();
  return `${day}-${month}-${year}`;
}

export function ThemedDatePicker({
  value,
  onChange,
  minDate,
  className,
  popperClassName,
}: ThemedDatePickerProps) {
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
