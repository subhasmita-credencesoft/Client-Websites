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
 * Sends all known parameter formats so the widget picks up dates regardless of version.
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

  const start = new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate());
  const end = new Date(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate());

  const pad = (n: number) => String(n).padStart(2, "0");

  // YYYY-MM-DD format
  const checkInIso = `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`;
  const checkOutIso = `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}`;

  const safeAdults   = Math.max(1, adults);
  const safeChildren = Math.max(0, children);
  const safeRooms    = Math.max(1, rooms);
  const numGuests    = safeAdults + safeChildren;

  const nights = Math.max(
    1,
    Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
  );

  const query = new URLSearchParams();

  query.set("bookingEngine", "true");

  // Format 1 — ISO (newer BookOne engines)
  query.set("checkin",  checkInIso);
  query.set("checkout", checkOutIso);

  // Format 2 — split day/month/year (legacy BookOne widget, used on Orchard Resort)
  query.set("checkinDay",    String(start.getDate()));
  query.set("checkinMonth",  String(start.getMonth() + 1));
  query.set("checkinYear",   String(start.getFullYear()));
  query.set("checkoutDay",   String(end.getDate()));
  query.set("checkoutMonth", String(end.getMonth() + 1));
  query.set("checkoutYear",  String(end.getFullYear()));

  // Format 3 — fromDate/toDate (HotelMate API format)
  query.set("fromDate", checkInIso);
  query.set("toDate",   checkOutIso);

  // Nights
  query.set("nights", String(nights));

  // Guests — all known param names
  query.set("adults",      String(safeAdults));
  query.set("numAdults",   String(safeAdults));
  query.set("children",    String(safeChildren));
  query.set("Children",    String(safeChildren));
  query.set("numGuests",   String(numGuests));
  query.set("noOfPersons", String(numGuests));

  // Rooms
  query.set("rooms",      String(safeRooms));
  query.set("noOfRooms",  String(safeRooms));

  return `${cleanBaseUrl}?${query.toString()}`;
}