export type HotelMateImage = {
  url?: string | null;
  mainImage?: boolean | null;
};

export type HotelMateRoomFacility = {
  id?: number | null;
  name?: string | null;
};

export type HotelMateRatePlan = {
  name?: string | null;
  amount?: number | null;
  currencyCode?: string | null;
  extraChargePerPerson?: number | null;
};

export type HotelMateAvailability = {
  date?: string | null;
  price?: number | null;
  noOfAvailable?: number | null;
  status?: string | null;
  roomRatePlans?: HotelMateRatePlan[] | null;
};

export type HotelMateRoom = {
  id: number;
  name?: string | null;
  description?: string | null;
  roomOnlyPrice?: number | null;
  minimumOccupancy?: number | null;
  maximumOccupancy?: number | null;
  noOfRooms?: number | null;
  extraChargePerPerson?: number | null;
  imageList?: HotelMateImage[] | null;
  roomFacilities?: HotelMateRoomFacility[] | null;
  ratesAndAvailabilityDtos?: HotelMateAvailability[] | null;
};

export type HotelMateProperty = {
  id: number;
  name?: string | null;
  shortName?: string | null;
  email?: string | null;
  localCurrency?: string | null;
  seoFriendlyName?: string | null;
  businessDescription?: string | null;
  imageList?: HotelMateImage[] | null;
  roomList?: HotelMateRoom[] | null;
};
