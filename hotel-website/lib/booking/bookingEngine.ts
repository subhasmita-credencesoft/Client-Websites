import type { PropertyApiResponse } from "../../types/property";

export function toSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function getPropertyRoomOptions(property: PropertyApiResponse | null | undefined) {
  return (property?.roomList || [])
    .map((room) => room?.name)
    .filter((name): name is string => Boolean(name))
    .map((name) => ({ label: name, value: toSlug(name) }));
}

type BookingEngineParams = {
  baseUrl?: string | null;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children?: number;
  rooms?: number;
};

export function buildBookingEngineUrl({
  baseUrl,
  checkIn,
  checkOut,
  adults,
  children = 0,
  rooms = 1,
}: BookingEngineParams) {
  const safeBaseUrl = baseUrl || "https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true";
  const cleanBaseUrl = safeBaseUrl.split("?")[0];
  const checkInOnly = new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate());
  const checkOutOnly = new Date(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate());
  const diffMs = checkOutOnly.getTime() - checkInOnly.getTime();
  const nights = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));
  const numGuests = Math.max(0, adults) + Math.max(0, children);
  const checkOutIso = `${checkOutOnly.getFullYear()}-${String(checkOutOnly.getMonth() + 1).padStart(2, "0")}-${String(checkOutOnly.getDate()).padStart(2, "0")}`;

  const query = [
    `bookingEngine=true`,
    `checkinDay=${checkIn.getDate()}`,
    `checkinMonth=${checkIn.getMonth() + 1}`,
    `checkinYear=${checkIn.getFullYear()}`,
    `checkoutDay=${checkOutOnly.getDate()}`,
    `checkoutMonth=${checkOutOnly.getMonth() + 1}`,
    `checkoutYear=${checkOutOnly.getFullYear()}`,
    `checkOut=${checkOutIso}`,
    `toDate=${checkOutIso}`,
    `date_to=${checkOutIso}`,
    `nights=${nights}`,
    `numGuests=${numGuests}`,
    `numAdults=${Math.max(0, adults)}`,
    `Children=${Math.max(0, children)}`,
    `rooms=${Math.max(1, rooms)}`,
  ].join("&");

  return `${cleanBaseUrl}?${query}`;
}
