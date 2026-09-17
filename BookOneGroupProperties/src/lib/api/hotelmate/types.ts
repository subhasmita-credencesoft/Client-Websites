export type HotelMateAddress = {
  country?: string | null;
  postcode?: string | null;
  streetNumber?: string | null;
  streetName?: string | null;
  suburb?: string | null;
  city?: string | null;
  state?: string | null;
  locality?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
};

export type HotelMateImage = {
  url?: string | null;
  mainImage?: boolean | null;
};

export type HotelMateFacility = {
  name?: string | null;
  description?: string | null;
};

export type HotelMateRoom = {
  id?: number | null;
  name?: string | null;
  description?: string | null;
  roomOnlyPrice?: number | null;
  minimumOccupancy?: number | null;
  maximumOccupancy?: number | null;
  noOfRooms?: number | null;
  imageList?: HotelMateImage[] | null;
  roomFacilities?: HotelMateFacility[] | null;
  dayTrip?: boolean | null;
  ratesAndAvailabilityDtos?: HotelMateRateAvailability[] | null;
};

export type HotelMateRateAvailability = {
  price?: number | null;
  noOfAvailable?: number | null;
  totalNoRooms?: number | null;
  noOfBooked?: number | null;
  date?: string | null;
  status?: string | null;
  roomRatePlans?: HotelMateRoomRatePlan[] | null;
};

export type HotelMateRoomRatePlan = {
  name?: string | null;
  amount?: number | string | null;
  minimumOccupancy?: number | null;
  maximumOccupancy?: number | null;
};

export type HotelMateService = {
  name?: string | null;
  description?: string | null;
  servicePrice?: number | null;
};

export type HotelMateProperty = {
  id?: number | null;
  name?: string | null;
  seoFriendlyName?: string | null;
  email?: string | null;
  mobile?: string | null;
  whatsApp?: string | null;
  slogan?: string | null;
  website?: string | null;
  managerFirstName?: string | null;
  managerLastName?: string | null;
  managerContactNo?: string | null;
  managerEmailAddress?: string | null;
  address?: HotelMateAddress | null;
  businessSubtype?: string | null;
  businessType?: string | null;
  businessDescription?: string | null;
  pricePerNight?: number | null;
  // NOTE: "Rooo" is a deliberate mirror of the real HotelMate API field name.
  minimumRoooPrice?: number | null;
  maximumOccupancy?: number | null;
  minimumOccupancy?: number | null;
  verified?: boolean | null;
  noOfBookOneReview?: number | null;
  bookOneRating?: number | null;
  imageList?: HotelMateImage[] | null;
  roomList?: HotelMateRoom[] | null;
  propertyServicesList?: HotelMateService[] | null;
};

export type HotelMateAvailabilityRoom = {
  id?: number | null;
  name?: string | null;
  noOfRooms?: number | null;
  roomOnlyPrice?: number | null;
  ratesAndAvailabilityDtos?: HotelMateRateAvailability[] | null;
};

export type HotelMateAvailabilityResponse = {
  roomList?: HotelMateAvailabilityRoom[] | null;
};