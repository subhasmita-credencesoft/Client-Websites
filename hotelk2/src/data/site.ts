import type { ContactDetail, HeaderContact, NavLink, SocialLink } from '@/types';

export const SITE = {
  name: 'Hotel K2',
  shortName: 'Hotel K2',
  location: 'Chakradharpur, West Singhbhum, Jharkhand',
  address: 'K2 Complex, Etwari Bazar, Station Link Road, Chakradharpur, West Singhbhum, Jharkhand 833102',
  url: 'https://www.hotelk2.in/',
  bookingUrl: 'https://bookone.io/Hotel-K2?bookingEngine=true',
  whatsappUrl: 'https://wa.me/918709490824',
  logo: 'https://www.hhickp.com/hari-img/logo.webp',
  description:
    'Hotel K2 is the best hotel in Chakradharpur, Jharkhand. Located near Chakradharpur Railway Station at Etwari Bazar, Station Link Road, near Carmel School. AC rooms with free Wi-Fi, TV, geyser, power backup. 24-hour room service, banquet hall, catering, car rental, and self-drive scooty. Budget hotel in Chakradharpur — book now on MakeMyTrip, OYO, or call +91 8709490824.',
  footerAbout:
    'Hotel K2 is the best hotel in Chakradharpur, Jharkhand, located near Chakradharpur Railway Station at Etwari Bazar, Station Link Road. We offer comfortable AC rooms with free Wi-Fi, TV, geyser, power backup, 24-hour room service, banquet hall, and catering services. Whether you are a business traveler, family, or tourist, Hotel K2 provides affordable accommodation and warm hospitality in the heart of West Singhbhum, Jharkhand.',
  copyrightYear: 2026,
  mapEmbedSrc:
    'https://www.google.com/maps/embed?pb=!4v1756190741493!6m8!1m7!1sCAoSLEFGMVFraEw0X0x4Y3F5WV9xU1Vkb3lRejRwLWdvVmpxa2c!2m2!1d22.670806!2d85.630322!3f186.22617!4f0!5f0.7820865974627469',
  phones: [
    { display: '+91 8709490824', href: 'tel:+918709490824' },
    { display: '+91 9123490131', href: 'tel:+919123490131' },
  ],
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
  { icon: 'phone', label: 'Alt Phone', value: '+91 9123490131', href: 'tel:+919123490131' },
  { icon: 'email', label: 'Email', value: 'hotelk2.ckp@gmail.com', href: 'mailto:hotelk2.ckp@gmail.com' },
  {
    icon: 'location',
    label: 'Address',
    value: 'K2 Complex, Etwari Bazar, Station Link Road, Chakradharpur, Jharkhand 833102',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  { label: 'Instagram', href: 'https://www.instagram.com/_hotel_k2_/', icon: 'instagram' },
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
    label: 'ALTERNATE NUMBER',
    value: '+91 9123490131',
    href: 'tel:+919123490131',
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
