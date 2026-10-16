export type RatePlan = {
  code: string;
  name: string;
  amount: number | null;
  minimumOccupancy: number | null;
  maximumOccupancy: number | null;
  effectiveDate: string | null;
  expiryDate: string | null;
  extraChargePerPerson: number | null;
  extraChargePerChild: number | null;
  minimumStay: number | null;
  maximumStay: number | null;
};

export type RoomDetail = {
  id: string;
  name: string;
  description: string;
  images: string[];
  image: string | null;
  price: number | null;
  rateDetail: string;
  gstPercent: number;
  available: number | null;
  totalRooms: number | null;
  inventory: number | null;
  minOccupancy: number | null;
  maxOccupancy: number | null;
  minimumStay: number | null;
  maximumStay: number | null;
  size: string | null;
  plans: RatePlan[];
};

export type RoomOffer = {
  id: string;
  name: string;
  description: string;
  image: string | null;
  images: string[];
  price: number | null;
  rateDetail: string;
  available: number | null;
  totalRooms: number | null;
  maxOccupancy: number | null;
  plans: RatePlan[];
};

export type PropertyInfo = {
  name: string;
  email: string;
  mobile: string;
  whatsapp: string;
  gstNumber: string;
  currency: string;
  city: string;
  address: string;
  description: string;
  amenities: string[];
};

export type Availability = {
  rooms: RoomOffer[];
  gstPercent: number;
  property: PropertyInfo;
};

export type SiteInfo = {
  name: string;
  address: string;
  reservationEmail: string;
  phoneDisplay: string;
  phoneHref: string;
  mobileDisplay: string;
  mobileHref: string;
  bookingUrl: string;
};

export type DiningOutlet = {
  slug: string;
  name: string;
  badge: string;
  type: string;
  positioning: string;
  tagline: string;
  description: string;
  extendedDescription: string[];
  image: string;
  alt: string;
  hours?: string;
  category?: string;
  cuisine?: string;
  costForTwo?: string;
  features: string[];
  note?: string;
};

export type Destination = {
  name: string;
  image: string | null;
  alt: string;
  note: string;
};
