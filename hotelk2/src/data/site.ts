import type { ContactDetail, HeaderContact, NavLink, SocialLink } from '@/types';

export const SITE = {
  name: 'Hotel K2',
  shortName: 'Hotel K2',
  location: 'Chakradharpur, West Singhbhum, Jharkhand',
  address: 'K2 Complex, Etwari Bazar, Station Link Road, Chakradharpur, West Singhbhum, Jharkhand 833102',
  url: 'https://www.hotelk2.in/',
  bookingUrl: 'https://bookone.io/Hotel-K2?bookingEngine=true',
  whatsappUrl: 'https://wa.me/08069641075',
  logo: 'https://www.hhickp.com/hari-img/logo.webp',
  description:
    'A premium hotel in Chakradharpur, Jharkhand, offering modern comfort with traditional hospitality for business travelers, families, and tourists.',
  footerAbout:
    'Welcome to Hotel K2, where comfort meets elegance. Conveniently located near Etwari Bazar in Chakradharpur, we provide top-class hospitality and modern amenities for business and leisure travelers.',
  copyrightYear: 2026,
  mapEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d85.630322!3d22.670806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQwJzE0LjkiTiA4NcKwMzcnNDkuMiJF!5e0!3m2!1sen!2sin!4v1756190741493!5m2!1sen!2sin',
  phones: [{ display: '+91 8709490824', href: 'tel:+918709490824' }],
  emails: [{ display: 'hotelk2.ckp@gmail.com', href: 'mailto:hotelk2.ckp@gmail.com' }],
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/#about' },
  { label: 'Accommodations', href: '/#rooms' },
  { label: 'Services', href: '/#services' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Contact Us', href: '/#contact' },
];

export const HEADER_CONTACTS: HeaderContact[] = [
  { icon: 'phone', label: 'Phone', value: '+91 8709490824', href: 'tel:+918709490824' },
  { icon: 'email', label: 'Email', value: 'hotelk2.ckp@gmail.com', href: 'mailto:hotelk2.ckp@gmail.com' },
  {
    icon: 'location',
    label: 'Address',
    value: 'K2 Complex, Etwari Bazar, Station Link Road, Chakradharpur, Jharkhand 833102',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
  { label: 'Twitter', href: 'https://twitter.com/', icon: 'twitter' },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: 'youtube' },
];

export const HERO = {
  eyebrow: 'Best Hotel in Chakradharpur, Jharkhand',
  heading: 'Welcome to Hotel K2',
  body:
    'Welcome to Hotel K2, a premium destination in Chakradharpur, Jharkhand, offering modern comfort with traditional hospitality. Our well-designed rooms and apartments provide the perfect retreat for business travelers, families, and tourists alike. With top-class amenities, exceptional service, and a warm ambiance, we ensure a stay that feels like home.',
  image: '/homehero1.png',
  imageAlt: 'Hotel K2, Chakradharpur',
};

export const ABOUT = {
  eyebrow: 'Welcome to Hotel K2',
  heading: 'Welcome to Hotel K2 : Best Hotel in Chakradharpur , Jharkhand',
  body:
    'Welcome to Hotel K2, a premium destination in Chakradharpur, Jharkhand, offering modern comfort with traditional hospitality. Our well-designed rooms and Apartments provide the perfect retreat for business travelers, families, and tourists alike. With top-class amenities, exceptional service, and a warm ambiance, we ensure a stay that feels like home. Whether you’re here for a short visit or a long getaway, Hotel K2 promises comfort, convenience, and a memorable experience in the heart of Jharkhand.',
  image: '/homehero1.png',
  imageAlt: 'Hotel K2, Chakradharpur',
};

export const CONTACT_DETAILS: ContactDetail[] = [
  {
    label: '24 X 7 FRONT DESK',
    value: '+91 8709490824',
    href: 'tel:+918709490824',
  },
  {
    label: 'ADDRESS',
    value: 'K2 Complex, Etwari Bazar, Station Link Road, Chakradharpur, West Singhbhum, Jharkhand 833102',
  },
  {
    label: 'E-Mail',
    value: 'hotelk2.ckp@gmail.com',
    href: 'mailto:hotelk2.ckp@gmail.com',
  },
];

export const CONTACT_INTRO =
  'We are always happy to hear from you! Whether you’re planning your stay, need help with bookings, or just want to know more about Hotel K2, Chakradharpur — our team is here to assist. Drop us a message and our staff will get back to you at the earliest, usually within 24 hours.';
