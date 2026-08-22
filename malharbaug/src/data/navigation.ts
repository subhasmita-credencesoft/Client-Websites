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
      { label: 'Corporate Meetings', href: '/events/corporate' },
      { label: 'Wedding Functions', href: '/events/wedding' },
      { label: 'Birthday Celebrations', href: '/events/birthday' },
    ],
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Nearby', href: '/nearby' },
  { label: 'Travel Guide', href: '/travel-guide' },
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
    heading: 'Plan Your Trip',
    links: [
      { label: 'Alibaug Travel Guide', href: '/travel-guide' },
      { label: 'Things to Do in Alibaug', href: '/travel-guide/things-to-do-in-alibaug' },
      { label: 'Nagaon Beach Guide', href: '/travel-guide/nagaon-beach-travel-guide' },
      { label: 'Mumbai to Alibaug Trip', href: '/travel-guide/mumbai-to-alibaug-weekend-trip' },
      { label: 'Nearby Attractions', href: '/nearby' },
    ],
  },
  {
    heading: 'Events',
    links: [
      { label: 'Corporate Meetings', href: '/events/corporate' },
      { label: 'Wedding Functions', href: '/events/wedding' },
      { label: 'Birthday Celebrations', href: '/events/birthday' },
    ],
  },
  {
    heading: 'From the Blog',
    links: [
      { label: 'All Blog Posts', href: '/blog' },
      { label: 'Family Resort Checklist', href: '/blog/family-resort-in-alibaug' },
      { label: 'Resort With Swimming Pool', href: '/blog/alibaug-resort-with-swimming-pool' },
      { label: 'Villa vs Rooms for Groups', href: '/blog/group-stay-villa-vs-rooms-alibaug' },
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
