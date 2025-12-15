import { GeoLocation } from "./geo-location";

export interface Booking {
  locality?: any,
  pickup?: GeoLocation | null;
  dropoff?: GeoLocation | null;
  date?: string;
  time?: string;
  tripType?: 'one-way' | 'return';

  passengers?: {
    type?: 'personal' | 'corporate';
    adults?: number;
    children?: number;
    luggage?: number;
  };

  vehicle?: {
    id?: any;
    name?: string;
    carNumber: string;
    seats?: number;
    bags?: number;      // ✅ FIXED
    price?: number;
    image?: string;     // ✅ Add this because you use car.image
  };

  traveller?: {
    firstName?: string;
    lastName?: string;
    mobile?: string;
    email?: string;
    notes?: string;
  };

  bookingRef?: string;
}
