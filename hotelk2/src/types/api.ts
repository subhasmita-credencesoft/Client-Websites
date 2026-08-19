export interface ApiImage {
  id: number | null;
  name: string;
  url: string;
  description: string | null;
  mainImage: boolean;
}

export interface ApiAddress {
  country: string;
  postcode: string;
  streetNumber: string;
  streetName: string;
  suburb: string;
  city: string;
  state: string;
  locality: string;
  addressLine1: string | null;
  addressLine2: string | null;
}

export interface ApiTaxSlab {
  minAmount: number;
  maxAmount: number;
  percentage: number;
}

export interface ApiTaxDetail {
  name: string;
  percentage: number;
  country: string;
  state: string;
  taxableAmount: number;
  taxAmount: number;
  taxSlabsList: ApiTaxSlab[];
}

export interface ApiRoomFacility {
  id: number;
  organisationId: number;
  name: string;
  description: string;
  logoUrl: string;
  imageUrl: string;
}

export interface ApiRoomRatePlan {
  code: string;
  name: string;
  effectiveDate: string;
  expiryDate: string;
  description: string | null;
  active: boolean;
  amount: number;
  roomId: number;
  deviationFromStandardPlan: number;
  minimumLengthOfStay: number;
  maximumLengthOfStay: number;
  status: string;
  restriction: string;
  currencyCode: string;
  minimumOccupancy: number;
  maximumOccupancy: number;
  extraChargePerPerson: number;
  extraChargePerChild: number;
  extraChargePerChild3To5yrs: number;
  noOfChildren: number;
  childAgeLimit: number;
  dayOfTheWeekList: string[];
  propertyServicesList: unknown[];
  onedayPlan: unknown;
  otaPlanList: unknown[];
  nonRoomPlan: unknown;
  checkoutPeriod: unknown;
  planExist: unknown;
  isCloseToDeparture: boolean;
}

export interface ApiRateAvailability {
  id: number;
  price: number;
  totalNoRooms: number;
  noOfBooked: number;
  noOfAvailable: number;
  noOfOnHold: number;
  date: string;
  roomName: string;
  propertyName: string;
  fromDate: string | null;
  toDate: string | null;
  roomId: number;
  propertyId: number;
  updateCount: number;
  updateType: unknown;
  ratePlanCode: unknown;
  status: string;
  restriction: string;
  channelManagerUpdateType: unknown;
  roomRatePlans: ApiRoomRatePlan[];
  stopSellOBE: unknown;
  stopSellOTA: unknown;
  otaAvailabilityList: unknown[];
  imageList: unknown;
  description: unknown;
  roomDetails: unknown;
  ratePlanName: unknown;
}

export interface ApiRoom {
  id: number;
  name: string;
  description: string;
  propertyId: number;
  roomOnlyPrice: number | null;
  totalPriceServices: number | null;
  totalPriceAmenities: number | null;
  totalPriceRoom: number | null;
  pricePerNight: number | null;
  pricePerWeek: number | null;
  priceFortNight: number | null;
  priceMonthly: number | null;
  minimumOccupancy: number;
  maximumOccupancy: number;
  extraChargePerPerson: number | null;
  noOfRooms: number;
  roomDetails: unknown;
  imageList: ApiImage[];
  minimumLengthOfStay: number;
  maximumLengthOfStay: number;
  size: unknown;
  smoking: unknown;
  hsnCode: unknown;
  ranking: number;
  roomFacilities: ApiRoomFacility[];
  noOfChild: number;
  businessProductName: string;
  dayTrip: boolean;
  ratesAndAvailabilityDtos: ApiRateAvailability[];
  shared: boolean;
}

export interface ApiPropertyService {
  id: number | null;
  organisationId: number;
  name: string;
  description: string | null;
  logoUrl: string | null;
  imageUrl: string | null;
  businessType: string;
  serviceType: string;
}

export interface ApiPropertyResponse {
  id: number;
  name: string;
  shortName: string;
  email: string;
  slogan: string;
  mobile: string;
  whatsApp: string;
  managerFirstName: string;
  managerLastName: string;
  managerContactNo: string;
  managerEmailAddress: string;
  address: ApiAddress;
  propertyStatus: string;
  gstNumber: string;
  udyamRegistrationNumber: string;
  minimumOccupancy: number;
  maximumOccupancy: number;
  logoUrl: string;
  localCurrency: string;
  placeId: string;
  website: string;
  paymentGateway: string;
  paymentGatewayApiKey: string;
  paymentGatewayPublicKey: string;
  paymentGatewayCallbackUrl: string;
  organisationId: number;
  longitude: string;
  latitude: string;
  businessType: string;
  businessDescription: string;
  plan: string;
  verified: boolean;
  seoFriendlyName: string;
  imageList: ApiImage[];
  taxDetails: ApiTaxDetail[];
  roomList: ApiRoom[];
  sacCode: string;
  fssaiRegNumber: string;
  minimumRoooPrice: number;
  socialMediaLinks: unknown[];
  pointOfSaleList: unknown[];
  businessSubtype: string;
  propertyServicesList: ApiPropertyService[];
  propertyInvoicePrintHeader: boolean;
  featuredBusiness: boolean;
}
