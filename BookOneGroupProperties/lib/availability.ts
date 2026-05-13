export interface RoomAvailability {
  id: number;
  name: string;
  available: boolean;
  price: number;
  currency: string;
}

export interface AvailabilityResponse {
  propertyId: number;
  checkIn: string;
  checkOut: string;
  rooms: RoomAvailability[];
}

export const validateDates = (checkIn: string, checkOut: string) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { valid: false, error: "Invalid dates" };
  }

  if (start < today) {
    return { valid: false, error: "Check-in date cannot be in the past" };
  }

  if (end <= start) {
    return { valid: false, error: "Check-out must be after check-in" };
  }

  return { valid: true };
};
