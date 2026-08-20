import { Offer } from '@/types';
import { SITE } from './site';

export const OFFERS: Offer[] = [
  {
    id: 'offer-wedding-classic',
    title: 'Wedding Classic Package',
    category: 'Wedding & Events',
    tagline: 'Venue + Catering + Guest Rooms',
    description:
      'The essentials, bundled: Royal Imperial Hall or lawn venue for two functions, a curated multi-cuisine buffet, and 10 guest rooms for the immediate family.',
    includes: [
      'Venue for two functions (hall or lawn)',
      'Multi-cuisine buffet for up to 300 guests',
      '10 guest rooms for family & VIPs',
      'Bridal & groom dressing suites',
      'Dedicated event manager',
    ],
    price: 'Starting ₹1,49,000',
    ctaLabel: 'Request Proposal',
    ctaHref: '/contact?inquiry=Banquets+%2F+Events',
  },
  {
    id: 'offer-wedding-signature',
    title: 'Wedding Signature Package',
    category: 'Wedding & Events',
    tagline: 'Full-destination wedding experience',
    description:
      'A complete celebration across hall and lawn  Mehendi, Sangeet, and reception  with in-house catering, decor support, and rooms for the entire wedding party.',
    includes: [
      'Hall + lawn for 3+ functions',
      'Full catering with live counters',
      '30 guest rooms across categories',
      'Decorator coordination & vendor desk',
      'Valet parking & driver rest area',
    ],
    price: 'Starting ₹4,25,000',
    ctaLabel: 'Request Proposal',
    ctaHref: '/contact?inquiry=Banquets+%2F+Events',
  },
  {
    id: 'offer-corporate-mice',
    title: 'Corporate & MICE Package',
    category: 'Wedding & Events',
    tagline: 'Boardroom to banquet under one roof',
    description:
      'A one-stop conference package  Executive Boardroom or Imperial Hall, full AV, high-speed Wi-Fi, tea breaks, and lunch for your delegates.',
    includes: [
      'Venue with full AV & stage setup',
      'Dedicated event-grade Wi-Fi',
      'Tea/coffee breaks & buffet lunch',
      'Breakout room access',
      'Delegate parking & security',
    ],
    price: 'On request',
    ctaLabel: 'Request Proposal',
    ctaHref: '/contact?inquiry=Banquets+%2F+Events',
  },
  {
    id: 'offer-weekend',
    title: 'Weekend Getaway Deal',
    category: 'Seasonal Stay',
    tagline: 'Stay 2 nights, 3rd night free',
    description:
      'Unwind on the Bhubaneswar Cuttack corridor  access, breakfast for two, and a late checkout to make the most of your weekend.',
    includes: [
      '2 nights with complimentary 3rd night',
      'Breakfast for two each day',
      'lawn access',
      'Late checkout until 2 PM',
    ],
    price: 'From ₹6,500 / night',
    ctaLabel: 'Book a Stay',
    ctaHref: SITE.bookingEngine,
  },
  {
    id: 'offer-corporate-bulk',
    title: 'Corporate Bulk Booking',
    category: 'Seasonal Stay',
    tagline: 'Volume rates for teams & events',
    description:
      'Preferred rates for 10+ rooms, extended stays, and event-linked accommodation  with a dedicated corporate desk for billing and scheduling.',
    includes: [
      'Discounted room rates for 10+ rooms',
      'Priority room assignment',
      'Event-linked accommodation blocks',
      'Central billing for teams',
    ],
    price: 'On request',
    ctaLabel: 'Inquire Now',
    ctaHref: '/contact?inquiry=Group',
  },
];
