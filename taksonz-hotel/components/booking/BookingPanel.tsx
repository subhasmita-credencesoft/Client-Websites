"use client";

import { useEffect, useId, useState } from "react";
import { Calendar, Users, Baby, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { addDays, todayInPropertyTz, validateSearch, type SearchErrors } from "@/lib/booking/dates";
import { site } from "@/data/site";
import styles from "./BookingPanel.module.scss";

interface Props {
  initial?: { checkIn?: string; checkOut?: string; adults?: number; children?: number };
  roomSlug?: string;
  variant?: "floating" | "inline";
  submitLabel?: string;
}

export function BookingPanel({ initial, variant = "floating", submitLabel = "Check Availability" }: Props) {
  const uid = useId();
  const [today, setToday] = useState("");
  const [checkIn, setCheckIn] = useState(initial?.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(initial?.checkOut ?? "");
  const [adults, setAdults] = useState(initial?.adults ?? 2);
  const [children, setChildren] = useState(initial?.children ?? 0);
  const [errors, setErrors] = useState<SearchErrors>({});

  useEffect(() => {
    const t = todayInPropertyTz();
    setToday(t);
    setCheckIn((v) => v || t);
    setCheckOut((v) => v || addDays(t, 1));
  }, []);

  function onCheckIn(value: string) {
    setCheckIn(value);
    if (value && checkOut && checkOut <= value) setCheckOut(addDays(value, 1));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateSearch({ checkIn, checkOut, adults });
    setErrors(errs);
    if (Object.keys(errs).length) return;

    // Parse dates into components
    const [ciYear, ciMonth, ciDay] = checkIn.split("-").map(Number);
    const [coYear, coMonth, coDay] = checkOut.split("-").map(Number);

    // Calculate nights
    const msPerDay = 86400000;
    const nights = Math.max(1, Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / msPerDay
    ));

    const totalGuests = adults + children;

    const params = new URLSearchParams({
      checkinDay:   String(ciDay),
      checkinMonth: String(ciMonth),
      checkinYear:  String(ciYear),
      checkoutDay:   String(coDay),
      checkoutMonth: String(coMonth),
      checkoutYear:  String(coYear),
      checkIn:   checkIn,
      checkOut:  checkOut,
      toDate:    checkOut,
      date_to:   checkOut,
      nights:    String(nights),
      numAdults: String(adults),
      Children:  String(children),
      numGuests: String(totalGuests),
      rooms:     "1",
    });

    window.open(`${site.bookingUrl}&${params.toString()}`, "_blank", "noopener,noreferrer");
  }

  const errMsg = (id: string, msg?: string) =>
    msg ? <p id={`${uid}-${id}-err`} className={styles.err} role="alert">{msg}</p> : null;

  return (
    <form
      className={[styles.panel, variant === "floating" ? styles.floating : styles.inline].join(" ")}
      onSubmit={submit}
      noValidate
      aria-label="Check availability"
    >
      {/* Check-in */}
      <div className={styles.field}>
        <label htmlFor={`${uid}-in`}>Check-in</label>
        <div className={styles.inputWrap}>
          <Calendar className={styles.fieldIcon} size={18} strokeWidth={2} aria-hidden />
          <input
            id={`${uid}-in`}
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => onCheckIn(e.target.value)}
            aria-invalid={!!errors.checkIn}
            aria-describedby={errors.checkIn ? `${uid}-in-err` : undefined}
            required
          />
        </div>
        {errMsg("in", errors.checkIn)}
      </div>

      {/* Check-out */}
      <div className={styles.field}>
        <label htmlFor={`${uid}-out`}>Check-out</label>
        <div className={styles.inputWrap}>
          <Calendar className={styles.fieldIcon} size={18} strokeWidth={2} aria-hidden />
          <input
            id={`${uid}-out`}
            type="date"
            value={checkOut}
            min={checkIn ? addDays(checkIn, 1) : today}
            onChange={(e) => setCheckOut(e.target.value)}
            aria-invalid={!!errors.checkOut}
            aria-describedby={errors.checkOut ? `${uid}-out-err` : undefined}
            required
          />
        </div>
        {errMsg("out", errors.checkOut)}
      </div>

      {/* Adults */}
      <div className={styles.field}>
        <label htmlFor={`${uid}-ad`}>Adults</label>
        <div className={styles.inputWrap}>
          <Users className={styles.fieldIcon} size={18} strokeWidth={2} aria-hidden />
          <select
            id={`${uid}-ad`}
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            aria-invalid={!!errors.adults}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "Adult" : "Adults"}</option>
            ))}
          </select>
          <ChevronDown className={styles.selectArrow} size={16} strokeWidth={2} aria-hidden />
        </div>
        {errMsg("ad", errors.adults)}
      </div>

      {/* Children */}
      <div className={styles.field}>
        <label htmlFor={`${uid}-ch`}>Children</label>
        <div className={styles.inputWrap}>
          <Baby className={styles.fieldIcon} size={18} strokeWidth={2} aria-hidden />
          <select
            id={`${uid}-ch`}
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
          >
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "Child" : "Children"}</option>
            ))}
          </select>
          <ChevronDown className={styles.selectArrow} size={16} strokeWidth={2} aria-hidden />
        </div>
      </div>

      {/* Submit */}
      <div className={styles.submit}>
        <Button type="submit" size="lg" className={styles.submitBtn}>
          <Search size={18} strokeWidth={2.2} className={styles.submitIcon} aria-hidden />
          <span>{submitLabel}</span>
        </Button>
      </div>
    </form>
  );
}
