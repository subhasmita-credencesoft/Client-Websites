export type IconName =
  | 'hotel'
  | 'bed'
  | 'shield'
  | 'users'
  | 'building'
  | 'sparkles'
  | 'concierge'
  | 'trending'
  | 'wrench'
  | 'handshake'
  | 'target'
  | 'eye'
  | 'gem'
  | 'check'
  | 'arrow'
  | 'phone'
  | 'mail'
  | 'pin'
  | 'globe';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  image: string;
  imageAlt: string;
  layout: 'card' | 'wide';
}

export interface HighlightItem {
  icon: IconName;
  title: string;
  subtitle: string;
}

export interface RoomCategory {
  name: string;
}

export interface PropertyItem {
  id: string;
  name: string;
  location: string;
  address?: string;
  description: string;
  image: string;
  fallback: string;
  alt: string;
  website: string;
  mapsLink?: string;
  phone?: string;
  roomCategories: RoomCategory[];
  amenities?: string[];
}

export interface ApiResponse {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  enquiryType: string;
  message: string;
}

export interface CareerPayload {
  name: string;
  email: string;
  phone: string;
  position: string;
}
