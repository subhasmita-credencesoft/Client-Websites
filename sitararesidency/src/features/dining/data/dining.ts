import type { CardItem, DetailContent } from '@/shared/types/content';
import { business } from '@/core/config/business';
import { diningImage, receptionRestaurantImage, sittingRoomImage } from '@/features/common/data/images';

export const diningCards: CardItem[] = [
  {
    slug: 'the-dining-room',
    title: 'The Dining Room',
    eyebrow: 'Multicuisine dining',
    description:
      'A welcoming restaurant for breakfast, lunch and dinner, with familiar favourites and regional dishes.',
    image: diningImage,
    meta: 'Breakfast · Lunch · Dinner',
  },
  {
    slug: 'breakfast-at-ardmore',
    title: `Events & gatherings at ${business.name}`,
    eyebrow: 'Celebrate together',
    description:
      'Flexible spaces and thoughtful hospitality for celebrations, family occasions and corporate gatherings.',
    image: receptionRestaurantImage,
    meta: 'On request',
  },
  {
    slug: 'the-sitting-room-bar',
    title: 'The Café & Lounge',
    eyebrow: 'Coffee, snacks & easy evenings',
    description:
      'A relaxed spot for coffee, light bites, room-service pickups and easy conversation.',
    image: sittingRoomImage,
    meta: 'Open through the day',
  },
];

export const diningFallback: DetailContent = {
  title: 'Our dining room',
  eyebrow: `Eat & drink · at ${business.name}`,
  intro: 'A table worth settling in for.',
  paragraphs: [
    'Our dining room keeps things simple and satisfying — familiar favourites and regional dishes, served for breakfast, lunch and dinner.',
    'Come for a meal, stay for a conversation. Room service is available through the day whenever you’d rather stay in.',
  ],
  image: diningImage,
  facts: ['Breakfast · lunch · dinner', 'Multicuisine menu', 'Room service', 'Events on request'],
};