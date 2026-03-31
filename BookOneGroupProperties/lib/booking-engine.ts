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
  const checkInOnly = new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate());
  const checkOutOnly = new Date(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate());
  const diffMs = checkOutOnly.getTime() - checkInOnly.getTime();
  const nights = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));
  const safeAdults = Math.max(0, adults);
  const safeChildren = Math.max(0, children);
  const safeRooms = Math.max(1, rooms);
  const numGuests = safeAdults + safeChildren;
  const checkInDay = String(checkInOnly.getDate()).padStart(2, "0");
  const checkInMonth = String(checkInOnly.getMonth() + 1).padStart(2, "0");
  const checkOutDay = String(checkOutOnly.getDate()).padStart(2, "0");
  const checkOutMonth = String(checkOutOnly.getMonth() + 1).padStart(2, "0");
  const checkInIso = `${checkInOnly.getFullYear()}-${String(checkInOnly.getMonth() + 1).padStart(2, "0")}-${String(checkInOnly.getDate()).padStart(2, "0")}`;
  const checkOutIso = `${checkOutOnly.getFullYear()}-${String(checkOutOnly.getMonth() + 1).padStart(2, "0")}-${String(checkOutOnly.getDate()).padStart(2, "0")}`;
  const checkInDisplay = `${checkInDay}/${checkInMonth}/${checkInOnly.getFullYear()}`;
  const checkOutDisplay = `${checkOutDay}/${checkOutMonth}/${checkOutOnly.getFullYear()}`;

  const query = new URLSearchParams({
    bookingEngine: "true",
    checkinDay: checkInDay,
    checkinMonth: checkInMonth,
    checkinYear: String(checkInOnly.getFullYear()),
    checkoutDay: checkOutDay,
    checkoutMonth: checkOutMonth,
    checkoutYear: String(checkOutOnly.getFullYear()),
    checkIn: checkInIso,
    checkOut: checkOutIso,
    checkin: checkInDisplay,
    checkout: checkOutDisplay,
    fromDate: checkInIso,
    toDate: checkOutIso,
    date_from: checkInIso,
    date_to: checkOutIso,
    nights: String(nights),
    numGuests: String(numGuests),
    numAdults: String(safeAdults),
    adults: String(safeAdults),
    Children: String(safeChildren),
    children: String(safeChildren),
    rooms: String(safeRooms),
    noOfRooms: String(safeRooms),
    noOfPersons: String(numGuests),
    guests: String(numGuests),
  });

  return `${cleanBaseUrl}?${query.toString()}`;
}
