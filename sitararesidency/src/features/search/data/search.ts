import { journalCards } from '@/features/blog';
import { thingsCards } from '@/features/things-to-do';
import { navItems } from '@/core/constants/nav';

export type SearchEntry = {
  title: string;
  description: string;
  href: string;
  keywords: string[];
};

const cardEntries = [
  ...thingsCards.map((card) => ({ ...card, href: '/things-to-do', keywords: ['leisure', 'experience', 'navi mumbai'] })),
  ...journalCards.map((card) => ({ ...card, href: `/blog/${card.slug}`, keywords: ['journal', 'guide', 'navi mumbai'] })),
];

const roomsEntry: SearchEntry = {
  title: 'Rooms',
  description: 'Browse live rooms, rates and availability at the hotel.',
  href: '/bedrooms',
  keywords: ['room', 'rooms', 'stay', 'bedrooms', 'accommodation', 'suite'],
};

export const searchEntries: SearchEntry[] = [
  roomsEntry,
  ...navItems.map((item) => ({
    title: item.label,
    description: `Explore ${item.label.toLowerCase()} at Hotel Sitara Residency.`,
    href: item.href,
    keywords: [item.label.toLowerCase()],
  })),
  ...cardEntries.map(({ title, description, href, keywords }) => ({ title, description, href, keywords })),
];