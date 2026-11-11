import { hotel } from '@/data/site';
import type { PropertyInfo, RoomDetail, RoomOffer } from '@/types/hotel';

export const DEFAULT_PROPERTY: PropertyInfo = {
  name: hotel.name,
  email: hotel.reservationEmail,
  mobile: hotel.phoneDisplay,
  whatsapp: hotel.mobileDisplay,
  gstNumber: '29AABCH4847G1ZF',
  currency: 'INR',
  city: 'Hosapete',
  address: hotel.address,
  description: '',
  amenities: [],
};

export const DEFAULT_ROOMS: RoomOffer[] = [];

export const DEFAULT_ROOM_DETAILS: Record<string, RoomDetail> = {};
