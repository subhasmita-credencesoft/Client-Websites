import { business } from '@/core/config/business';

export type HeroSlide = {
  eyebrow: string;
  heading: string;
  description: string;
  primaryAction: string;
  primaryHref: string;
  secondaryAction: string;
  secondaryHref: string;
};

export const heroSlides: readonly HeroSlide[] = [
  {
    eyebrow: 'Hotel Sitara Residency · Kalamboli',
    heading: 'Best Corporate Stays in Navi Mumbai',
    description: 'Purpose-built for business travellers — high-speed Wi-Fi, power backup, 24-hr service and a strategic address steps from the expressway.',
    primaryAction: 'Reserve Your Room',
    primaryHref: business.bookingUrl,
    secondaryAction: 'Explore Rooms',
    secondaryHref: '/bedrooms',
  },
  {
    eyebrow: 'Premium Accommodation · Kalamboli',
    heading: 'Spacious Rooms, Designed for Comfort',
    description: 'Generously sized rooms with plush bedding, individual climate control and premium amenities — every inch crafted for a restful stay.',
    primaryAction: 'View All Rooms',
    primaryHref: '/bedrooms',
    secondaryAction: 'Check Availability',
    secondaryHref: business.bookingUrl,
  },
  {
    eyebrow: 'Family Getaway · Navi Mumbai',
    heading: 'Ideal for Family Stays',
    description: 'Spacious family suites with warm hospitality, secure parking and room service — everything your family needs under one roof.',
    primaryAction: 'Book a Family Suite',
    primaryHref: business.bookingUrl,
    secondaryAction: 'Explore Suites',
    secondaryHref: '/bedrooms',
  },
  {
    eyebrow: 'Prime Location · Panvel, Navi Mumbai',
    heading: 'Best Location in Kalamboli',
    description: 'Minutes from Panvel Station, the Mumbai–Pune Expressway and the airport corridor — perfectly placed for business and leisure.',
    primaryAction: 'Get Directions',
    primaryHref: '/contact',
    secondaryAction: 'Book Now',
    secondaryHref: business.bookingUrl,
  },
];
