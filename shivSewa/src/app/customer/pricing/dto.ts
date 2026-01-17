import { GeoLocation } from '../models/geo-location';

export interface QuoteRequest {
  tripType: 'pickup_drop' | 'outstation' | 'rental';
  vehicleCategory: 'sedan' | 'suv' | 'premium_suv';

  pickup: GeoLocation;
  drop: GeoLocation;

  pickupDate: string; // yyyy-mm-dd
  pickupTime: string; // HH:mm

  returnDate?: string;
  returnTime?: string;

  distanceKmOverride?: number;
}
