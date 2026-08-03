import { NavItem } from '@/types';

export const primaryNav: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Rooms',
    href: '/rooms',
    children: [
      { label: 'Luxury Deluxe Room', href: '/rooms/luxury-deluxe' },
      { label: 'Family Suite', href: '/rooms/family-suite' },
      { label: 'Private Villa', href: '/rooms/private-villa' },
    ],
  },
  {
    label: 'Amenities',
    href: '/amenities',
    children: [
      { label: 'Swimming Pool', href: '/amenities/swimming-pool' },
      { label: 'Restaurant', href: '/restaurant' },
      { label: 'Kids Activities', href: '/amenities/kids-activities' },
    ],
  },
  {
    label: 'Events',
    href: '/events',
    children: [
      { label: 'Corporate Outings', href: '/events/corporate-outings' },
      { label: 'Destination Weddings', href: '/events/weddings' },
      { label: 'Birthday Parties', href: '/events/birthday' },
    ],
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Nearby', href: '/nearby' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav: { heading: string; links: NavItem[] }[] = [
  {
    heading: 'Quick Links',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Rooms', href: '/rooms' },
      { label: 'Amenities', href: '/amenities' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Accommodation',
    links: [
      { label: 'Luxury Deluxe Room', href: '/rooms/luxury-deluxe' },
      { label: 'Family Suite', href: '/rooms/family-suite' },
      { label: 'Private Villa', href: '/rooms/private-villa' },
    ],
  },
  {
    heading: 'Events',
    links: [
      { label: 'Corporate Outings', href: '/events/corporate-outings' },
      { label: 'Destination Weddings', href: '/events/weddings' },
      { label: 'Birthday Parties', href: '/events/birthday' },
    ],
  },
  {
    heading: 'Policies',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-conditions' },
      { label: 'Refund Policy', href: '/refund-policy' },
      { label: 'Cancellation Policy', href: '/cancellation-policy' },
    ],
  },
];
