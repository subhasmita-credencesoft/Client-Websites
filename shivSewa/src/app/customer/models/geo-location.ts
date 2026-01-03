export interface GeoLocation {
  place_id: string;
  name: string;
  latitude: number;
  longitude: number;
  service_address: {
    city?: string | null;
    state?: string | null;
    suburb?: string | null;
    locality?: string | null;
    postcode?: string | null;
    streetName?: string | null;
    addressLine1?: string | null;
    addressLine2?: string | null;
    streetNumber?: string | null;
    country?: string | null;
  };
}
