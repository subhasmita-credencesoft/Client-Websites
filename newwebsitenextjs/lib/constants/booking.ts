const DIRECT_BOOKING_ENGINE_BASE_URL = "https://bookone.io/the-mountain-by-redwings";

type DirectBookingUrlOptions = {
  checkIn?: string | Date;
  checkOut?: string | Date;
  guests?: number;
  rooms?: number;
};

export function normalizeDate(value?: string | Date) {
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

export function formatDate(date: Date) {
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

  const params = new URLSearchParams({
    bookingEngine: "true",
    fromDate,
    toDate,
    noOfRooms: String(safeRooms),
    noOfPersons: String(safeGuests),
  });

  return `${DIRECT_BOOKING_ENGINE_BASE_URL}?${params.toString()}`;
}

export const DIRECT_BOOKING_ENGINE_URL = buildDirectBookingEngineUrl();
