export const REDWINGS_PROPERTY_ID = 3064;
export const REDWINGS_USER_ID = 3633;
export const HOTELMATE_BASE_URL = "https://api.thehotelmate.co/api/thm";
export const HOTELMATE_ROOM_API_BASE_URL = "https://api.thehotelmate.co/api";

type HotelMateImage = {
  url?: string | null;
};

type HotelMateRatePlan = {
  code?: string | null;
  name?: string | null;
  amount?: number | null;
  currencyCode?: string | null;
  maximumOccupancy?: number | null;
  extraChargePerPerson?: number | null;
};

export type HotelMateRoomPlan = {
  code?: string | null;
  name?: string | null;
  effectiveDate?: string | null;
  expiryDate?: string | null;
  description?: string | null;
  active?: boolean | null;
  amount?: number | null;
  roomId?: number | null;
  minimumLengthOfStay?: number | null;
  maximumLengthOfStay?: number | null;
  status?: string | null;
  restriction?: string | null;
  currencyCode?: string | null;
  minimumOccupancy?: number | null;
  maximumOccupancy?: number | null;
  extraChargePerPerson?: number | null;
  noOfChildren?: number | null;
};

type HotelMateRateAvailability = {
  roomId?: number | null;
  propertyId?: number | null;
  roomName?: string | null;
  propertyName?: string | null;
  noOfAvailable?: number | null;
  totalNoRooms?: number | null;
  price?: number | null;
  roomRatePlans?: HotelMateRatePlan[] | null;
};

type HotelMateRoom = {
  id?: number | null;
  propertyId?: number | null;
  name: string;
  description?: string | null;
  roomOnlyPrice?: number | null;
  pricePerNight?: number | null;
  maximumOccupancy?: number | null;
  minimumOccupancy?: number | null;
  extraChargePerPerson?: number | null;
  noOfRooms?: number | null;
  imageList?: HotelMateImage[] | null;
  ratesAndAvailabilityDtos?: HotelMateRateAvailability[] | null;
};

export type HotelMatePropertyAvailability = {
  id: number;
  name: string;
  seoFriendlyName?: string | null;
  address?: {
    suburb?: string | null;
    city?: string | null;
    state?: string | null;
  } | null;
  roomList?: HotelMateRoom[] | null;
};

export type HotelMatePropertyDetails = {
  id?: number | null;
  name?: string | null;
  seoFriendlyName?: string | null;
  address?: {
    suburb?: string | null;
    city?: string | null;
    state?: string | null;
  } | null;
  roomList?: HotelMateRoom[] | null;
};

export type LiveRoomCard = {
  title: string;
  description: string;
  tariff: string;
  packagePrice: string;
  image: string;
  propertyId: number;
  propertyName: string;
  roomId: number | null;
  roomName: string;
  ratePlanCode: string;
  ratePlanName: string;
  currencyCode: string;
  price: number | null;
  availableRooms: number;
  totalRooms: number;
  maxOccupancy: number;
  extraChargePerPerson: number | null;
};

export function buildRedwingsAvailabilityUrl(checkIn: string, checkOut: string, guests: number) {
  const params = new URLSearchParams({
    fromDate: checkIn,
    toDate: checkOut,
    noOfRooms: "1",
    noOfPersons: String(Math.max(1, guests)),
  });

  return `${HOTELMATE_BASE_URL}/checkAvailability/${REDWINGS_PROPERTY_ID}?${params.toString()}`;
}

export function buildRedwingsPropertyDetailsUrl() {
  return `${HOTELMATE_ROOM_API_BASE_URL}/user/findById/${REDWINGS_USER_ID}`;
}

export function buildRedwingsRoomPlanUrl(propertyId: number, roomId: number) {
  return `${HOTELMATE_ROOM_API_BASE_URL}/room/property/${propertyId}/room/${roomId}/roomPlan`;
}

function stripHtml(value?: string | null) {
  if (!value) return "";
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function formatCurrency(amount?: number | null) {
  if (typeof amount !== "number" || Number.isNaN(amount)) return "On request";
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

export function mapRedwingsAvailabilityToRoomCards(
  payload: HotelMatePropertyAvailability,
  fallbackImage: string,
): LiveRoomCard[] {
  const roomList = payload.roomList ?? [];

  return roomList.map((room) => {
    const rateAvailability = room.ratesAndAvailabilityDtos?.[0] ?? null;
    const ratePlan = rateAvailability?.roomRatePlans?.[0] ?? null;
    const price = ratePlan?.amount ?? rateAvailability?.price ?? room.roomOnlyPrice ?? null;
    const availableRooms = rateAvailability?.noOfAvailable ?? room.noOfRooms ?? 0;
    const totalRooms = rateAvailability?.totalNoRooms ?? room.noOfRooms ?? availableRooms;
    const maxOccupancy = ratePlan?.maximumOccupancy ?? room.maximumOccupancy ?? 0;
    const extraChargePerPerson = ratePlan?.extraChargePerPerson ?? null;
    const image = room.imageList?.find((item) => item.url)?.url ?? fallbackImage;
    const cleanDescription = stripHtml(room.description);

    const stayHighlights = [
      availableRooms > 0 ? `${availableRooms} room${availableRooms === 1 ? "" : "s"} available` : "Currently sold out",
      maxOccupancy > 0 ? `Up to ${maxOccupancy} guests` : null,
      typeof extraChargePerPerson === "number" && extraChargePerPerson > 0
        ? `Extra guest ${formatCurrency(extraChargePerPerson)}`
        : null,
    ].filter(Boolean);

    return {
      title: room.name,
      description: cleanDescription || "Comfortable room stay with hotel amenities and availability support.",
      tariff: `Room Tariff ${formatCurrency(price)}`,
      packagePrice: stayHighlights.join(" | "),
      image,
      propertyId: payload.id,
      propertyName: payload.name,
      roomId: rateAvailability?.roomId ?? null,
      roomName: rateAvailability?.roomName ?? room.name,
      ratePlanCode: ratePlan?.code ?? "",
      ratePlanName: ratePlan?.name ?? "",
      currencyCode: ratePlan?.currencyCode ?? "INR",
      price,
      availableRooms,
      totalRooms: totalRooms ?? 0,
      maxOccupancy,
      extraChargePerPerson,
    };
  });
}

export function mapRedwingsPropertyDetailsToRoomCards(
  payload: HotelMatePropertyDetails,
  fallbackImage: string,
): LiveRoomCard[] {
  const roomList = payload.roomList ?? [];
  const propertyId = payload.id ?? REDWINGS_PROPERTY_ID;
  const propertyName = payload.name || "Hotel Redwings Castle";

  return roomList.map((room) => {
    const rateAvailability = room.ratesAndAvailabilityDtos?.[0] ?? null;
    const ratePlan = rateAvailability?.roomRatePlans?.[0] ?? null;
    const price = ratePlan?.amount ?? rateAvailability?.price ?? room.pricePerNight ?? room.roomOnlyPrice ?? null;
    const availableRooms = rateAvailability?.noOfAvailable ?? room.noOfRooms ?? 0;
    const totalRooms = rateAvailability?.totalNoRooms ?? room.noOfRooms ?? availableRooms;
    const maxOccupancy =
      ratePlan?.maximumOccupancy ??
      room.maximumOccupancy ??
      room.minimumOccupancy ??
      0;
    const extraChargePerPerson = ratePlan?.extraChargePerPerson ?? room.extraChargePerPerson ?? null;
    const image = room.imageList?.find((item) => item.url)?.url ?? fallbackImage;
    const cleanDescription = stripHtml(room.description);

    const stayHighlights = [
      totalRooms > 0 ? `${totalRooms} room${totalRooms === 1 ? "" : "s"} in inventory` : "Room details available",
      maxOccupancy > 0 ? `Up to ${maxOccupancy} guests` : null,
      typeof extraChargePerPerson === "number" && extraChargePerPerson > 0
        ? `Extra guest ${formatCurrency(extraChargePerPerson)}`
        : null,
    ].filter(Boolean);

    return {
      title: room.name,
      description: cleanDescription || "Comfortable room stay with hotel amenities and room information.",
      tariff: `Room Tariff ${formatCurrency(price)}`,
      packagePrice: stayHighlights.join(" | "),
      image,
      propertyId: room.propertyId ?? propertyId,
      propertyName,
      roomId: rateAvailability?.roomId ?? room.id ?? null,
      roomName: rateAvailability?.roomName ?? room.name,
      ratePlanCode: ratePlan?.code ?? "",
      ratePlanName: ratePlan?.name ?? "",
      currencyCode: ratePlan?.currencyCode ?? "INR",
      price,
      availableRooms,
      totalRooms: totalRooms ?? 0,
      maxOccupancy,
      extraChargePerPerson,
    };
  });
}
