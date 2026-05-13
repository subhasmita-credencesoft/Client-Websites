export type BookingEngineUrlInput = {
  baseUrl: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children?: number;
  rooms?: number;
};

/**
 * Builds a clean booking engine URL for BookOne.
 * Avoids parameter redundancy to prevent engine confusion.
 */
export function buildBookingEngineUrl({
  baseUrl,
  checkIn,
  checkOut,
  adults,
  children = 0,
  rooms = 1,
}: BookingEngineUrlInput) {
  const cleanBaseUrl = baseUrl.split("?")[0];

  // Normalize to local date boundaries
  const start = new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate());
  const end = new Date(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate());

  // Format helpers
  const pad = (n: number) => String(n).padStart(2, "0");
  const d = (date: Date) => pad(date.getDate());
  const m = (date: Date) => pad(date.getMonth() + 1);
  const y = (date: Date) => String(date.getFullYear());

  // Format: DD-MM-YYYY (Most reliable for BookOne legacy/mobile engines)
  const checkInDisplay = `${d(start)}-${m(start)}-${y(start)}`;
  const checkOutDisplay = `${d(end)}-${m(end)}-${y(end)}`;

  const query = new URLSearchParams();
  query.set("bookingEngine", "true");

  // Primary date parameters - Use 'checkin' and 'checkout' (lowercase)
  // as it is the most globally supported across BookOne versions.
  query.set("checkin", checkInDisplay);
  query.set("checkout", checkOutDisplay);

  // Guest and Room parameters
  const safeAdults = Math.max(1, adults);
  const safeChildren = Math.max(0, children);

  query.set("adults", String(safeAdults));
  query.set("children", String(safeChildren));
  query.set("rooms", String(rooms));

  return `${cleanBaseUrl}?${query.toString()}`;
}
