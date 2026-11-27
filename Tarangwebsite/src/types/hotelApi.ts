// The Hotel Mate API Response Interfaces

export interface ApiRoomFacility {
  id: number;
  organisationId?: number;
  name: string;
  description?: string;
  imageUrl?: string;
  logoUrl?: string;
}

export interface ApiImage {
  id?: number | null;
  name?: string;
  url: string;
  description?: string;
  mainImage?: boolean;
}

export interface ApiRatePlan {
  code: string;
  name: string;
  effectiveDate?: string;
  expiryDate?: string;
  description?: string | null;
  active?: boolean;
  amount: number;
  roomId?: number;
  currencyCode?: string;
  minimumOccupancy?: number;
  maximumOccupancy?: number;
  extraChargePerPerson?: number;
  extraChargePerChild?: number;
  extraChargePerChild3To5yrs?: number;
  noOfChildren?: number;
  status?: string;
}

export interface ApiRateDto {
  id: number;
  price: number;
  totalNoRooms: number;
  noOfBooked: number;
  noOfAvailable: number;
  noOfOnHold: number;
  date: string;
  roomName: string;
  propertyName: string;
  roomId: number;
  propertyId: number;
  status: string;
  roomRatePlans?: ApiRatePlan[];
}

export interface ApiRoom {
  id: number;
  name: string;
  description: string;
  propertyId: number;
  amenities?: any[];
  roomOnlyPrice: number;
  totalPriceServices?: number | null;
  totalPriceAmenities?: number | null;
  totalPriceRoom?: number | null;
  pricePerNight?: number | null;
  minimumOccupancy: number;
  maximumOccupancy: number;
  noOfChild?: number;
  extraChargePerPerson?: number | null;
  noOfRooms: number;
  roomDetails?: string | null;
  imageList: ApiImage[];
  ratesAndAvailabilityDtos?: ApiRateDto[];
  roomFacilities?: ApiRoomFacility[];
  shared?: boolean;
  featured?: boolean;
}

export interface HotelApiResponse {
  id: number;
  name: string;
  shortName?: string;
  email?: string;
  slogan?: string;
  mobile?: string;
  whatsApp?: string;
  address?: any;
  propertyStatus?: string;
  seoFriendlyName?: string;
  roomList: ApiRoom[];
  minimumOccupancy?: number;
  maximumOccupancy?: number;
  minimumRoooPrice?: number;
}

export interface AvailabilityQueryParams {
  fromDate?: string;
  toDate?: string;
  noOfRooms?: number;
  noOfPersons?: number;
  propertyId?: string | number;
}
