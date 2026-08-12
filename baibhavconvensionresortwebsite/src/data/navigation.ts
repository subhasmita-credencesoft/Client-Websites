import { NavLink } from '@/types';

export const NAV_LINKS: NavLink[] = [
  {
    label: 'Stay',
    href: '/stay',
    children: [
      { label: 'Premium Room', href: '/stay/premium-room', description: 'Comfortable stay with modern amenities' },
      { label: 'Deluxe Room', href: '/stay/deluxe-room', description: 'Spacious & comfortable accommodation' },
    ],
  },
  {
    label: 'Weddings & Events',
    href: '/events',
    children: [
      { label: 'Weddings & Social', href: '/events/weddings', description: 'Mandaps, Sangeet & receptions' },
      { label: 'Corporate & MICE', href: '/events/corporate', description: 'Conferences, launches & seminars' },
      { label: 'Venues & Capacity', href: '/events/venues', description: 'Halls, lawns & boardrooms' },
      { label: 'Event Inquiry', href: '/contact?inquiry=Banquets+%2F+Events', description: 'Request a custom proposal' },
    ],
  },
  {
    label: 'Dining',
    href: '/dining',
    children: [
      { label: 'In-House Restaurant', href: '/dining#restaurant', description: 'Odia, Indian & continental' },
      { label: 'Fusion bites', href: '/dining#catering', description: 'Buffets, live counters & more' },
    ],
  },
  { label: 'Amenities', href: '/amenities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Location', href: '/location' },
];
