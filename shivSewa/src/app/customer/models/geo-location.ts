export interface GeoLocation {
  place_id: string;
  name: string;
  latitude: number;
  longitude: number;
  service_address: {
    city?: string;
    state?: string;
    suburb?: string | null;
    locality?: string | null;
    postcode?: string;
    streetName?: string | null;
    addressLine1?: string;
    addressLine2?: string | null;
    streetNumber?: string | null;
  };
}
