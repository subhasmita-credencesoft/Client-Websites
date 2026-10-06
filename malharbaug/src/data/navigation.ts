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
    { label: 'Contact', href: '/contact' },
  ];
}

export function buildFooterNav(rooms: Room[]): { heading: string; links: NavItem[] }[] {
  return [
    {
      heading: 'Quick Links',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Rooms', href: '/rooms' },
        { label: 'Amenities', href: '/amenities' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Nearby', href: '/nearby' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      heading: 'Accommodation',
      links: [...roomNavItems(rooms), { label: 'Packages & Offers', href: '/packages' }],
    },
    {
      heading: 'Plan Your Trip',
      links: [
        { label: 'Alibaug Travel Guide', href: '/travel-guide' },
        { label: 'Things to Do in Alibaug', href: '/travel-guide/things-to-do-in-alibaug' },
        { label: 'Nagaon Beach Guide', href: '/travel-guide/nagaon-beach-travel-guide' },
        { label: 'Mumbai to Alibaug Trip', href: '/travel-guide/mumbai-to-alibaug-weekend-trip' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      heading: 'Events',
      links: [
        { label: 'All Events', href: '/events' },
        { label: 'Corporate Meetings', href: '/events/corporate' },
        { label: 'Wedding Functions', href: '/events/wedding' },
        { label: 'Birthday Celebrations', href: '/events/birthday' },
      ],
    },
  ];
}
