export type TripType = 'pickup_drop' | 'outstation' | 'rental';
export type VehicleCategory = 'sedan' | 'suv' | 'premium_suv';

export interface FareLine {
  code: string;
  label: string;
  qty: number;
  unitPrice: number;
  amount: number;
}

export interface FareQuote {
  currency: string;
  pricingVersion: string;
  tripType: TripType;
  vehicleCategory: VehicleCategory;
  distanceKm: number;
  total: number;
  lines: FareLine[];
  notes?: string[];
}
