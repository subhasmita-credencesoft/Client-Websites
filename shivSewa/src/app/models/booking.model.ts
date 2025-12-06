export interface Booking {
  pickup?: string;
  dropoff?: string;
  date?: string;
  time?: string;
  tripType?: 'one-way' | 'return';

  passengers?: {
    type?: 'solo' | 'group' | 'family' | 'corporate';
    adults?: number;
    children?: number;
    luggage?: number;
  };

  vehicle?: {
    name?: string;
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
  };

  bookingRef?: string;
}
