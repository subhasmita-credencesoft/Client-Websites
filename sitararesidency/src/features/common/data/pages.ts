import { business } from '@/core/config/business';
import { localAreaImage, diningImage, heroImage, sittingRoomImage } from '@/features/common/data/images';
import type { ImageSource } from '@/shared/types/content';

type MetadataCopy = {
  title: string;
  description: string;
};

type IntroCopy = MetadataCopy & {
  eyebrow: string;
  heading: string;
  intro: string;
  image: ImageSource;
};

export const contactPage: IntroCopy = {
  title: 'Contact',
  description: 'Questions about rooms, directions or planning your stay? Our team is here to help.',
  eyebrow: 'Talk to us',
  heading: 'Come say hello.',
  intro: 'Questions about rooms, directions or planning your stay? Our team is here to help.',
  image: sittingRoomImage,
};

export const voucherPage: IntroCopy & {
  options: readonly { label: string; amount: string }[];
} = {
  title: 'Gift vouchers',
  description: 'A thoughtful stay, meal or moment of time together at Hotel Sitara Residency.',
  eyebrow: 'A good thing to give',
  heading: 'Give them a little away.',
  intro: 'A comfortable stay, a relaxed meal, or simply the promise of time together. Our vouchers arrive by email, beautifully simple.',
  image: diningImage,
  options: [
    { label: 'A night away', amount: 'Enquire for rates' },
    { label: 'Dinner for two', amount: 'Enquire for rates' },
    { label: 'A custom amount', amount: 'Your choice' },
  ],
};

export const kidsPage: IntroCopy & {
  promise: {
    eyebrow: string;
    heading: string;
    description: string;
    tiles: readonly { title: string; description: string }[];
  };
} = {
  title: 'Families',
  description: 'Comfortable family stays in Kalamboli, Navi Mumbai.',
  eyebrow: 'For families',
  heading: 'Good days, all together.',
  intro: 'Space to settle in, thoughtful essentials and a comfortable base for family time in Navi Mumbai.',
  image: heroImage,
  promise: {
    eyebrow: 'Our family promise',
    heading: 'No complicated plans required.',
    description: 'We make family stays straightforward with practical rooms, helpful local guidance and a warm welcome for every guest.',
    tiles: [
      { title: 'Local guidance', description: 'Ask our team for helpful routes, local stops and easy plans for the day.' },
      { title: 'Flexible mornings', description: 'Take your time checking out and planning the day ahead with our team.' },
    ],
  },
};

export const leisurePage: IntroCopy & {
  tiles: readonly { title: string; description: string }[];
} = {
  title: 'Facilities',
  description: `Practical comforts and thoughtful service at ${business.name}.`,
  eyebrow: 'At the hotel',
  heading: 'A place to land.',
  intro: 'Everything you need for an easy stay, from a comfortable room to the practical details that make travel simpler.',
  image: sittingRoomImage,
  tiles: [
    { title: 'Comfortable rooms', description: 'Air-conditioned rooms with the essentials for a restful stay.' },
    { title: 'Parking & access', description: 'Convenient parking and a well-connected Kalamboli location.' },
    { title: 'Room service', description: 'Thoughtful service when you prefer to take things at your own pace.' },
    { title: 'The little extras', description: 'Wi-Fi, housekeeping, power backup and help from our team when you need it.' },
  ],
};

export const locationPage: IntroCopy & {
  details: readonly { label: string; value: string; href?: string }[];
  map: { heading: string; description: string; action: string };
  features: readonly string[];
} = {
  title: 'Location & contact',
  description: `Find ${business.name} in Kalamboli, Panvel, Navi Mumbai.`,
  eyebrow: `Find ${business.name}`,
  heading: 'Easy to find in Kalamboli',
  intro: 'A convenient base in Panvel, Navi Mumbai for business travel, local visits and comfortable overnight stays.',
  image: localAreaImage,
  details: [
    { label: 'Address', value: business.address.lines.join(', ') },
    { label: 'Call us', value: business.phones.display, href: `tel:${business.phones.primary}` },
    { label: 'Email us', value: business.email, href: `mailto:${business.email}` },
  ],
  map: {
    heading: 'Plan your route',
    description: 'Use Google Maps for directions to Riddhi Arcade in Kalamboli, Panvel.',
    action: 'Open in Google Maps',
  },
  features: ['Parking available', 'Wi-Fi available', '24/7 power backup'],
};

export const galleryPage = {
  title: 'Gallery',
  description: `A glimpse of the rooms and welcoming spaces at ${business.name}.`,
  eyebrow: `A glimpse of ${business.shortName}`,
  heading: 'Look around.',
  intro: `A glimpse of the rooms and welcoming spaces waiting for you at ${business.name}.`,
  image: heroImage,
  images: [heroImage, localAreaImage, sittingRoomImage, diningImage, heroImage, localAreaImage],
} as const;

export const searchPage: MetadataCopy & { heading: string; intro: string } = {
  title: 'Search',
  description: 'Search rooms, dining, offers and local information at Hotel Sitara Residency.',
  heading: 'Take your time.',
  intro: 'Search rooms, dining, offers and information about your stay.',
};

export const manageBookingPage: MetadataCopy & {
  eyebrow: string;
  heading: string;
  intro: string;
  contact: readonly { label: string; value: string; href: string }[];
  action: string;
} = {
  title: 'Manage booking',
  description: `Contact ${business.name} to update an existing reservation.`,
  eyebrow: 'Existing reservation',
  heading: 'Need to change a booking?',
  intro: 'Our reservations team can help with changes, special requests and confirmation details. Please have your booking name and dates ready.',
  contact: [
    { label: 'Call reservations', value: business.phones.primaryDisplay, href: `tel:${business.phones.primary}` },
    { label: 'Email reservations', value: business.email, href: `mailto:${business.email}?subject=Booking%20assistance` },
  ],
  action: 'Send a detailed enquiry',
};

export const notFoundPage = {
  eyebrow: 'A wrong turn',
  code: '404',
  heading: 'This page has wandered off.',
  description: 'The page you were looking for is not here. Try the hotel, the local area or the road back home.',
  homeAction: 'Back to the hotel',
  contactAction: 'Ask for help',
} as const;