const DIRECT_BOOKING_ENGINE_BASE_URL = "https://bookone.io/the-mountain-by-redwings";
const PROPERTY_AVAILABILITY_ID = 3521;

type DirectBookingUrlOptions = {
  checkIn?: string | Date;
  checkOut?: string | Date;
  guests?: number;
  rooms?: number;
};

function normalizeDate(value?: string | Date) {
  if (!value) return null;

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }

  const [year, month, day] = value.split("-").map((part) => Number(part));

  if (!year || !month || !day) return null;

  const parsed = new Date(year, month - 1, day);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDefaultDates() {
  const checkIn = new Date();
  checkIn.setHours(0, 0, 0, 0);

  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + 1);

  return { checkIn, checkOut };
}

export function buildDirectBookingEngineUrl({
  checkIn,
  checkOut,
  guests = 2,
  rooms = 1,
}: DirectBookingUrlOptions = {}) {
  const defaults = getDefaultDates();
  const normalizedCheckIn = normalizeDate(checkIn) ?? defaults.checkIn;
  const normalizedCheckOut = normalizeDate(checkOut) ?? defaults.checkOut;
  const safeCheckOut =
    normalizedCheckOut.getTime() <= normalizedCheckIn.getTime()
      ? new Date(normalizedCheckIn.getFullYear(), normalizedCheckIn.getMonth(), normalizedCheckIn.getDate() + 1)
      : normalizedCheckOut;
  const fromDate = formatDate(normalizedCheckIn);
  const toDate = formatDate(safeCheckOut);
  const safeGuests = Math.max(1, guests);
  const safeRooms = Math.max(1, rooms);
  const nights = Math.max(
    1,
    Math.round((safeCheckOut.getTime() - normalizedCheckIn.getTime()) / (1000 * 60 * 60 * 24)),
  );

  const params = new URLSearchParams({
    bookingEngine: "true",
    checkinDay: String(normalizedCheckIn.getDate()),
    checkinMonth: String(normalizedCheckIn.getMonth() + 1),
    checkinYear: String(normalizedCheckIn.getFullYear()),
    checkoutDay: String(safeCheckOut.getDate()),
    checkoutMonth: String(safeCheckOut.getMonth() + 1),
    checkoutYear: String(safeCheckOut.getFullYear()),
    checkOut: toDate,
    fromDate,
    toDate,
    date_to: toDate,
    nights: String(nights),
    noOfRooms: String(safeRooms),
    rooms: String(safeRooms),
    noOfPersons: String(safeGuests),
    numGuests: String(safeGuests),
    numAdults: String(safeGuests),
    Children: "0",
    propertyId: String(PROPERTY_AVAILABILITY_ID),
  });

  return `${DIRECT_BOOKING_ENGINE_BASE_URL}?${params.toString()}`;
}

export const DIRECT_BOOKING_ENGINE_URL = buildDirectBookingEngineUrl();
export const DIRECT_BOOKING_AVAILABILITY_API_URL = `https://api.thehotelmate.co/api/thm/checkAvailability/${PROPERTY_AVAILABILITY_ID}`;
