import { site } from "@/data/site";

/** Today's date (YYYY-MM-DD) in the property's timezone — not the visitor's. */
export function todayInPropertyTz(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: site.timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

/** Adds days to a YYYY-MM-DD string without timezone drift. */
export function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number) as [number, number, number];
  const date = new Date(Date.UTC(y, m - 1, d + days));
  return date.toISOString().slice(0, 10);
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = Date.parse(`${checkIn}T00:00:00Z`);
  const b = Date.parse(`${checkOut}T00:00:00Z`);
  return Math.max(0, Math.round((b - a) / 86_400_000));
}

export function formatDisplayDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-IN", { timeZone: "UTC", day: "numeric", month: "short", year: "numeric" }).format(d);
}

export interface SearchErrors {
  checkIn?: string;
  checkOut?: string;
  adults?: string;
}

export function validateSearch(v: { checkIn: string; checkOut: string; adults: number }): SearchErrors {
  const errors: SearchErrors = {};
  const today = todayInPropertyTz();
  if (!v.checkIn) errors.checkIn = "Choose a check-in date.";
  else if (v.checkIn < today) errors.checkIn = "Check-in cannot be in the past.";
  if (!v.checkOut) errors.checkOut = "Choose a check-out date.";
  else if (v.checkIn && v.checkOut <= v.checkIn) errors.checkOut = "Check-out must be after check-in.";
  if (!v.adults || v.adults < 1) errors.adults = "At least one adult is required.";
  return errors;
}
