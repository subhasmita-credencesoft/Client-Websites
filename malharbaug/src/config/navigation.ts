import { NavItem, Room } from '@/types';

function roomNavItems(rooms: Room[]): NavItem[] {
  return rooms.map((room) => ({ label: room.title, href: `/rooms/${room.slug}` }));
}

export function buildPrimaryNav(rooms: Room[]): NavItem[] {
  return [
    { label: 'Home', href: '/' },
    {
      label: 'Rooms',
      href: '/rooms',
      children: roomNavItems(rooms),
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
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];
}

export function buildFooterNav(rooms: Room[]): { heading: string; links: NavItem[] }[] {
  return [
    {
      heading: 'Quick Links',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About Malhar Baug', href: '/about' },
        { label: 'Rooms & Villas', href: '/rooms' },
        { label: 'Amenities', href: '/amenities' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Nearby Attractions', href: '/nearby' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
    {
      heading: 'Accommodation',
      links: [...roomNavItems(rooms), { label: 'Contact Us', href: '/contact' }],
    },
    {
      heading: 'Plan Your Trip',
      links: [
        { label: 'Alibaug Travel Guide', href: '/travel-guide' },
        { label: 'Things to Do in Alibaug', href: '/travel-guide/things-to-do-in-alibaug' },
        { label: 'Nagaon Beach Guide', href: '/travel-guide/nagaon-beach-travel-guide' },
        { label: 'Mumbai to Alibaug Trip', href: '/travel-guide/mumbai-to-alibaug-weekend-trip' },
        { label: 'Resort Blog', href: '/blog' },
      ],
    },
    {
      heading: 'Events & Functions',
      links: [
        { label: 'All Event Venues', href: '/events' },
        { label: 'Corporate Meetings', href: '/events/corporate' },
        { label: 'Wedding Functions', href: '/events/wedding' },
        { label: 'Birthday Celebrations', href: '/events/birthday' },
      ],
    },
  ];
}
