export type BookingEngineUrlInput = {
  baseUrl: string;
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
}: BookingEngineUrlInput) {
  const cleanBaseUrl = baseUrl.split("?")[0];

  // Normalize to local date boundaries
  const start = new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate());
  const end = new Date(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate());

  const diffMs = end.getTime() - start.getTime();
  const nights = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));

  // Format helpers
  const pad = (n: number) => String(n).padStart(2, "0");
  const d = (date: Date) => pad(date.getDate());
  const m = (date: Date) => pad(date.getMonth() + 1);
  const y = (date: Date) => String(date.getFullYear());

  const checkInIso = `${y(start)}-${m(start)}-${d(start)}`;
  const checkOutIso = `${y(end)}-${m(end)}-${d(end)}`;

  // Use hyphens (DD-MM-YYYY) which is more standard for BookOne than slashes
  const checkInDisplay = `${d(start)}-${m(start)}-${y(start)}`;
  const checkOutDisplay = `${d(end)}-${m(end)}-${y(end)}`;

  const query = new URLSearchParams();
  query.set("bookingEngine", "true");

  // Primary date parameters
  query.set("checkin", checkInDisplay);
  query.set("checkout", checkOutDisplay);
  query.set("checkIn", checkInIso);
  query.set("checkOut", checkOutIso);
  query.set("fromDate", checkInIso);
  query.set("toDate", checkOutIso);

  // Component date parameters (some versions expect no leading zeros, others do)
  // We'll provide both or just standardized ones. Let's try without leading zeros for components
  // as some legacy systems prefer numeric values.
  query.set("checkinDay", String(start.getDate()));
  query.set("checkinMonth", String(start.getMonth() + 1));
  query.set("checkinYear", y(start));
  query.set("checkoutDay", String(end.getDate()));
  query.set("checkoutMonth", String(end.getMonth() + 1));
  query.set("checkoutYear", y(end));

  query.set("nights", String(nights));

  // Guest and Room parameters
  const safeAdults = Math.max(1, adults);
  const safeChildren = Math.max(0, children);
  const totalPersons = safeAdults + safeChildren;

  query.set("adults", String(safeAdults));
  query.set("numAdults", String(safeAdults));
  query.set("children", String(safeChildren));
  query.set("Children", String(safeChildren));
  query.set("numGuests", String(totalPersons));
  query.set("guests", String(totalPersons));
  query.set("noOfPersons", String(totalPersons));

  query.set("rooms", String(rooms));
  query.set("noOfRooms", String(rooms));

  return `${cleanBaseUrl}?${query.toString()}`;
}

