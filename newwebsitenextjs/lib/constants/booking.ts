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

  const trimmedValue = value.trim();
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmedValue);
  const displayMatch = /^(\d{2})-(\d{2})-(\d{4})$/.exec(trimmedValue);

  let year = 0;
  let month = 0;
  let day = 0;

  if (isoMatch) {
    year = Number(isoMatch[1]);
    month = Number(isoMatch[2]);
    day = Number(isoMatch[3]);
  } else if (displayMatch) {
    day = Number(displayMatch[1]);
    month = Number(displayMatch[2]);
    year = Number(displayMatch[3]);
  } else {
    return null;
  }

  if (!year || !month || !day) return null;

  const parsed = new Date(year, month - 1, day);
  if (Number.isNaN(parsed.getTime())) return null;

  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null;
  }

  return parsed;
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getNightCount(checkIn: Date, checkOut: Date) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const difference = checkOut.getTime() - checkIn.getTime();
  return Math.max(1, Math.round(difference / millisecondsPerDay));
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
  const checkinYear = String(normalizedCheckIn.getFullYear());
  const checkinMonth = String(normalizedCheckIn.getMonth() + 1);
  const checkinDay = String(normalizedCheckIn.getDate());
  const nights = String(getNightCount(normalizedCheckIn, safeCheckOut));

  const params = new URLSearchParams({
    bookingEngine: "true",
    checkinYear,
    checkinMonth,
    checkinDay,
    nights,
    numGuests: String(safeGuests),
    numAdults: String(safeGuests),
    Children: "0",
    fromDate,
    toDate,
    noOfRooms: String(safeRooms),
    noOfPersons: String(safeGuests),
    noOfAdults: String(safeGuests),
    noOfChildren: "0",
    rooms: String(safeRooms),
    guests: String(safeGuests),
    adults: String(safeGuests),
    children: "0",
    checkIn: fromDate,
    checkOut: toDate,
  });

  return `${DIRECT_BOOKING_ENGINE_BASE_URL}?${params.toString()}`;
}

export const DIRECT_BOOKING_ENGINE_URL = buildDirectBookingEngineUrl();
