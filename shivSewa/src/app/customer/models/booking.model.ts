import { GeoLocation } from "./geo-location";

export type TripTypeValue = 'pickup-drop' | 'outstation' | 'rental';
export type TripDirection = 'one-way' | 'return';

export interface Booking {
  // Core location info
  pickup?: GeoLocation | null;
  dropoff?: GeoLocation | null;
  locality?: any;

  // Trip configuration
  tripTypeValue?: TripTypeValue; // The selected trip type: 'pickup-drop', 'outstation', 'rental'
  tripType?: TripDirection; // One-way or return (for future use)
  date?: string;
  time?: string;
  distanceKm?: number;        // Road distance in kilometers (e.g. 18.4)
  durationMinutes?: number;
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
