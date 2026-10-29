import { journalCards } from '@/features/blog';
import { thingsCards } from '@/features/things-to-do';
import { navItems } from '@/core/constants/nav';
import { ROUTES } from '@/core/constants/routes';

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
  href: ROUTES.bedrooms,
  keywords: ['room', 'rooms', 'stay', 'bedrooms', 'accommodation', 'suite'],
};

const eventsEntry: SearchEntry = {
  title: 'Events & Banquets',
  description: 'Host corporate conferences, board meetings, seminars, and social gatherings at Hotel Sitara Residency.',
  href: ROUTES.events,
  keywords: [
    'event',
    'events',
    'banquet',
    'banquets',
    'meeting',
    'meetings',
    'conference',
    'boardroom',
    'hall',
    'party',
    'seminar',
    'gathering',
    'ring ceremony',
    'engagement',
    'sagai',
    'roka',
    'birthday',
    'kids birthday',
    'anniversary',
    'family gathering',
    'baby shower',
    'godh bharai',
    'dohale jevan',
    'namkaran',
    'haldi',
    'mehendi',
    'sangeet',
  ],
};

const ringCeremonyEntry: SearchEntry = {
  title: 'Ring Ceremony & Pre-Wedding Celebrations',
  description: 'Host ring ceremonies, Sagai, Roka, Haldi, and Mehendi with customized stage decor and royal banquet dining.',
  href: `${ROUTES.events}#functions-we-host`,
  keywords: ['ring ceremony', 'engagement', 'sagai', 'roka', 'pre wedding', 'haldi', 'mehendi', 'sangeet'],
};

const birthdayEntry: SearchEntry = {
  title: 'Birthday Parties & Celebrations',
  description: 'Celebrate kids 1st birthdays, theme parties, and milestone 50th/60th birthdays with balloons, sound & feast.',
  href: `${ROUTES.events}#functions-we-host`,
  keywords: ['birthday', 'birthday party', 'kids birthday', 'party hall', 'cake cutting', 'jubilee', 'anniversary'],
};

export const searchEntries: SearchEntry[] = [
  roomsEntry,
  eventsEntry,
  ringCeremonyEntry,
  birthdayEntry,
  ...navItems.map((item) => ({
    title: item.label,
    description: `Explore ${item.label.toLowerCase()} at Hotel Sitara Residency.`,
    href: item.href,
    keywords: [item.label.toLowerCase()],
  })),
  ...cardEntries.map(({ title, description, href, keywords }) => ({ title, description, href, keywords })),
];
