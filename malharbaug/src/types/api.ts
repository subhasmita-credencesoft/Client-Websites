export interface ApiImage {
  id?: number | string | null;
  name?: string | null;
  url: string;
  description?: string | null;
  mainImage?: boolean;
}

export interface ApiFacility {
  id: number;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  logoUrl?: string | null;
}

export interface ApiAvailability {
  id?: number;
  date?: string;
  price?: number | string | null;
  noOfAvailable?: number | null;
}

export interface ApiRoom {
  id: number;
  name: string;
  description?: string | null;
  roomOnlyPrice?: number | string | null;
  minimumOccupancy?: number | string | null;
  maximumOccupancy?: number | string | null;
  imageList?: ApiImage[] | null;
  roomFacilities?: ApiFacility[] | null;
  ratesAndAvailabilityDtos?: ApiAvailability[] | null;
}

export interface ApiAddress {
  country?: string | null;
  postcode?: string | null;
  streetNumber?: string | null;
  streetName?: string | null;
  suburb?: string | null;
  city?: string | null;
  state?: string | null;
  locality?: string | null;
}

export interface ApiService {
  id?: number | string | null;
  name?: string | null;
}

export interface ApiProperty {
  id: number;
  name: string;
  email?: string | null;
  mobile?: string | null;
  whatsApp?: string | null;
  managerContactNo?: string | null;
  managerEmailAddress?: string | null;
  address?: ApiAddress | null;
  latitude?: string | number | null;
  longitude?: string | number | null;
  imageList?: ApiImage[] | null;
  roomList?: ApiRoom[] | null;
  propertyServicesList?: ApiService[] | null;
  minimumRoooPrice?: number | string | null;
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  phone2: string;
  phone2Display: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  addressLines: string[];
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  mapEmbedUrl: string;
}
