import { hotelInfo } from "@/data/hotel";

const NON_AVAILABILITY_PATTERN = /(not available|no rooms|sold out|unavailable|fully booked)/i;

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function getNestedArray(source: UnknownRecord, keys: string[]): unknown[] | null {
  for (const key of keys) {
    const value = source[key];
    if (Array.isArray(value)) {
      return value;
    }
    if (isRecord(value)) {
      const nested = getNestedArray(value, keys);
      if (nested) {
        return nested;
      }
    }
  }

  return null;
}

function getNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function getString(value: unknown) {
  return typeof value === "string" ? value : null;
}

function getBoolean(value: unknown) {
  return typeof value === "boolean" ? value : null;
}

function extractRoomInventory(room: UnknownRecord) {
  const directCount =
    getNumber(room.availableRooms) ??
    getNumber(room.availableCount) ??
    getNumber(room.roomsAvailable) ??
    getNumber(room.inventory) ??
    getNumber(room.noOfRooms);

  if (directCount !== null) {
    return directCount;
  }

  const rates = Array.isArray(room.ratesAndAvailabilityDtos) ? room.ratesAndAvailabilityDtos : null;
  if (!rates) {
    return null;
  }

  return rates.reduce<number>((total, rate) => {
    if (!isRecord(rate)) {
      return total;
    }

    return total + Math.max(0, getNumber(rate.availableRooms) ?? getNumber(rate.availableCount) ?? 0);
  }, 0);
}

function extractRoomPrice(room: UnknownRecord) {
  return (
    getNumber(room.roomOnlyPrice) ??
    getNumber(room.pricePerNight) ??
    getNumber(room.price) ??
    getNumber(room.amount)
  );
}

export function getGuestCount(value: string) {
  const match = value.match(/\d+/);
  return match ? Math.max(1, Number.parseInt(match[0], 10)) : 1;
}

export function buildAvailabilityUrl({
  checkIn,
  checkOut,
  guests,
  rooms = 1,
}: {
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms?: number;
}) {
  const url = new URL(hotelInfo.availabilityApiUrl);
  url.searchParams.set("fromDate", checkIn);
  url.searchParams.set("toDate", checkOut);
  url.searchParams.set("noOfRooms", String(rooms));
  url.searchParams.set("noOfPersons", String(guests));
  return url.toString();
}

export function normalizeAvailabilityResponse(payload: unknown) {
  if (!isRecord(payload)) {
    return {
      available: false,
      message: "We could not verify room availability right now. Please try again.",
    };
  }

  const explicitAvailability =
    getBoolean(payload.available) ??
    getBoolean(payload.isAvailable) ??
    getBoolean(payload.success) ??
    getBoolean(payload.status);

  const message =
    getString(payload.message) ??
    getString(payload.statusMessage) ??
    getString(payload.description);

  if (message && NON_AVAILABILITY_PATTERN.test(message)) {
    return {
      available: false,
      message: "Rooms are not available for the selected dates. Please try different dates.",
    };
  }

  if (explicitAvailability === false) {
    return {
      available: false,
      message: message ?? "Rooms are not available for the selected dates. Please try different dates.",
    };
  }

  const rooms = getNestedArray(payload, ["roomList", "rooms", "availableRooms", "data"]);
  if (rooms) {
    const roomSummaries = rooms
      .filter(isRecord)
      .map((room) => ({
        name: getString(room.name) ?? "Room",
        inventory: extractRoomInventory(room),
        price: extractRoomPrice(room),
        available: getBoolean(room.available),
      }));

    const availableRooms = roomSummaries.filter(
      (room) => room.available === true || (room.inventory !== null && room.inventory > 0),
    );

    if (availableRooms.length > 0) {
      const cheapestAvailableRoom = availableRooms.reduce((best, current) => {
        if (current.price === null) {
          return best;
        }
        if (best.price === null || current.price < best.price) {
          return current;
        }
        return best;
      }, availableRooms[0]);

      const priceNote =
        cheapestAvailableRoom.price !== null
          ? ` Starting from INR ${cheapestAvailableRoom.price.toLocaleString("en-IN")}.`
          : "";

      return {
        available: true,
        message: `${availableRooms.length} room type${availableRooms.length > 1 ? "s are" : " is"} available for your selected dates.${priceNote}`,
      };
    }
  }

  if (explicitAvailability === true) {
    return {
      available: true,
      message: message ?? "Rooms are available for your selected dates. Continue to booking.",
    };
  }

  return {
    available: true,
    message: message ?? "Availability checked successfully. Continue to booking.",
  };
}
