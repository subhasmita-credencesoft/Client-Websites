export type ServiceOpenItem = {
  day?: string | null;
  openingTime?: string | null;
  closingTime?: string | null;
  breakFromTime?: string | null;
  breakToTime?: string | null;
};

export type TaxSlab = {
  minAmount?: number | null;
  maxAmount?: number | null;
  percentage?: number | null;
};

export type TaxDetail = {
  name?: string | null;
  percentage?: number | null;
  country?: string | null;
  state?: string | null;
  taxableAmount?: number | null;
  taxAmount?: number | null;
  taxSlabsList?: TaxSlab[] | null;
};

export type PropertyService = {
  id?: number | null;
  name?: string | null;
  description?: string | null;
  serviceType?: string | null;
};

export type PropertyImage = {
  url?: string | null;
  name?: string | null;
  description?: string | null;
  mainImage?: boolean | null;
};

export type PropertyAddress = {
  streetName?: string | null;
  suburb?: string | null;
  city?: string | null;
  state?: string | null;
  postcode?: string | null;
  country?: string | null;
};

export type SocialLinks = {
  aboutUs?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  youtube?: string | null;
  linkedin?: string | null;
};

export type BusinessServiceDto = {
  policy?: string | null;
  serviceOpenList?: ServiceOpenItem[] | null;
};

export type PropertyApiResponse = {
  id?: number;
  name?: string | null;
  shortName?: string | null;
  email?: string | null;
  mobile?: string | null;
  whatsApp?: string | null;
  managerFirstName?: string | null;
  managerLastName?: string | null;
  managerEmailAddress?: string | null;
  address?: PropertyAddress | null;
  propertyStatus?: string | null;
  logoUrl?: string | null;
  localCurrency?: string | null;
  website?: string | null;
  longitude?: string | null;
  latitude?: string | null;
  businessType?: string | null;
  businessSubtype?: string | null;
  businessDescription?: string | null;
  seoFriendlyName?: string | null;
  imageList?: PropertyImage[] | null;
  propertyServicesList?: PropertyService[] | null;
  businessServiceDtoList?: BusinessServiceDto[] | null;
  taxDetails?: TaxDetail[] | null;
  socialMediaLinks?: SocialLinks[] | null;
  roomList?: RoomItem[] | null;
  minimumRoooPrice?: number | null;
  minimumRoomPrice?: number | null;
};

export type RoomRatePlan = {
  code?: string | null;
  name?: string | null;
  effectiveDate?: string | null;
  expiryDate?: string | null;
  active?: boolean | null;
  amount?: number | null;
  currencyCode?: string | null;
  minimumOccupancy?: number | null;
  maximumOccupancy?: number | null;
  extraChargePerPerson?: number | null;
  extraChargePerChild?: number | null;
};

export type RatesAndAvailability = {
  id?: number | null;
  date?: string | null;
  price?: number | null;
  noOfAvailable?: number | null;
  noOfBooked?: number | null;
  noOfOnHold?: number | null;
  totalNoRooms?: number | null;
  roomName?: string | null;
  status?: string | null;
  restriction?: string | null;
  updateType?: string | null;
  roomRatePlans?: RoomRatePlan[] | null;
};

export type RoomFacility = {
  id?: number | null;
  name?: string | null;
  description?: string | null;
};

export type RoomItem = {
  id?: number | null;
  name?: string | null;
  description?: string | null;
  propertyId?: number | null;
  roomOnlyPrice?: number | null;
  pricePerNight?: number | null;
  pricePerWeek?: number | null;
  priceFortNight?: number | null;
  priceMonthly?: number | null;
  minimumOccupancy?: number | null;
  maximumOccupancy?: number | null;
  extraChargePerPerson?: number | null;
  noOfRooms?: number | null;
  noOfChild?: number | null;
  dayTrip?: boolean | null;
  minimumLengthOfStay?: number | null;
  maximumLengthOfStay?: number | null;
  size?: string | null;
  smoking?: string | null;
  imageList?: PropertyImage[] | null;
  roomFacilities?: RoomFacility[] | null;
  ratesAndAvailabilityDtos?: RatesAndAvailability[] | null;
};
