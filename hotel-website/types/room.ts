export type Facility = {
  icon: string;
  label: string;
};

export type Room = {
  id: string;
  name: string;
  slug: string;
  category: string;
  summary: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  size: string;
  bedType: string;
  amenities: string[];
  image: string;
  checkIn?: string;
  checkOut?: string;
  facilityDescription?: string;
  facilities?: Facility[];
};