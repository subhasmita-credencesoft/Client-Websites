import type { NavItem, FooterNavGroup } from '@/core/types/nav';
import { ROUTES } from '@/core/constants/routes';

export const navItems: NavItem[] = [
  {
    label: 'Home',
    href: ROUTES.home,
  },
  {
    label: 'Bedrooms',
    href: ROUTES.bedrooms,
    hasSubmenu: true,
    subItems: [
      { label: 'Executive Room', href: ROUTES.bedroom('executive-room') },
      { label: 'Executive Family Suite', href: ROUTES.bedroom('executive-family-suite') },
      { label: 'Executive Triple Room', href: ROUTES.bedroom('executive-triple-room') },
    ],
  },
  {
    label: 'Events & Banquets',
    href: ROUTES.events,
    hasSubmenu: true,
    subItems: [
      { label: 'All Event Spaces & Venues', href: ROUTES.events },
      { label: 'Grand Conference Hall (75 Pax)', href: ROUTES.eventDetail('grand-hall') },
      { label: 'Executive Boardroom (16 Pax)', href: ROUTES.eventDetail('executive-boardroom') },
      { label: 'Celebrations & Social Lounge (50 Pax)', href: ROUTES.eventDetail('celebrations-lounge') },
    ],
  },
  {
    label: 'Leisure',
    href: ROUTES.leisure,
    hasSubmenu: true,
    subItems: [
      { label: 'Hotel Leisure & Amenities', href: ROUTES.leisure },
      { label: 'Sightseeing Around Kalamboli', href: ROUTES.thingsToDo },
      { label: 'Location & Connectivity', href: ROUTES.location },
    ],
  },
  {
    label: 'Journal',
    href: ROUTES.blog,
    hasSubmenu: true,
    subItems: [
      { label: 'Local’s Guide to Kalamboli', href: ROUTES.blogDetail('navi-mumbai-travel-guide') },
      { label: 'Corporate Stay Insights', href: ROUTES.blogDetail('corporate-stay-kalamboli-panvel') },
      { label: 'Weekend Escapes & Trails', href: ROUTES.blogDetail('panvel-weekend-getaways') },
      { label: 'Airport Corridor Transit', href: ROUTES.blogDetail('navi-mumbai-international-airport-guide') },
    ],
  },
  {
    label: 'Gallery',
    href: ROUTES.gallery,
  },
  {
    label: 'Contact',
    href: ROUTES.contact,
  },
];

export const footerNavGroups: FooterNavGroup[] = [
  {
    label: 'Find your way',
    items: [
      { label: 'Bedrooms', href: ROUTES.bedrooms, testId: 'link-footer-stay' },
      { label: 'Events & Banquets', href: ROUTES.events, testId: 'link-footer-events' },
      { label: 'Gallery', href: ROUTES.gallery, testId: 'link-footer-gallery' },
      { label: 'Leisure', href: ROUTES.leisure, testId: 'link-footer-leisure' },
      { label: 'Contact', href: ROUTES.contact, testId: 'link-footer-contact' },
    ],
  },
];
