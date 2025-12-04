export interface Traveler {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
}

export interface Booking {
  pickup: string;
  drop: string;
  date: string;
  time: string;
  tripType: 'oneway' | 'return' | string;
  adults: number;
  children: number;
  luggage: number;
  vehicle: any | null;
  traveler: Traveler;
}
