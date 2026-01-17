import { FareQuote } from "../pricing/pricing.types";
import { GeoLocation } from "./geo-location";

export type TripTypeValue = 'pickup-drop' | 'outstation' | 'rental';
export type TripDirection = 'one-way' | 'return';
export type TripServiceType = 'pickup_drop' | 'outstation' | 'rental';
export interface Booking {
  // Core location info
  pickup?: GeoLocation | null;
  dropoff?: GeoLocation | null;
  locality?: any;

  // Trip configuration
  tripType?: TripDirection;          // ✅ direction
  tripServiceType?: TripServiceType; // ✅ pricing logic
  tripTypeValue?: TripTypeValue;     // ✅ existing
  date?: string;
  time?: string;
  distanceKm?: number;        // Road distance in kilometers (e.g. 18.4)
  durationMinutes?: number;
returnDate?: string;
returnTime?: string;
fareQuote?: FareQuote;
  // Rental specific - Hours and KM
  rentalHours?: number; // Number of hours (default 1, increment/decrement)
  rentalKm?: number; // Number of kilometers (default 10, increment/decrement by 10)
  vehicleCategory: any;
  // Passenger details
  passengers?: {
    type?: 'personal' | 'corporate';
    adults?: number;
    children?: number;
    luggage?: number;
  };

  // Vehicle selection
  vehicle?: {
    id?: any;
    name?: string;
    carNumber: string;
    seats?: number;
    bags?: number;
    price?: number;
    image?: string;
  };

  // Traveller info
  traveller?: {
    firstName?: string;
    lastName?: string;
    mobile?: string;
    email?: string;
    notes?: string;
  };

  // Booking reference
  bookingRef?: string;
}
