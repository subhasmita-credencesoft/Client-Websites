import type { CardItem } from '@/shared/types/content';
import { journalCards } from '@/features/blog/data/blog';

export const thingsCards: CardItem[] = [
  {
    ...journalCards[0],
    slug: 'ardmore-cliff-walk',
    title: 'Around Kalamboli',
    eyebrow: '20 minutes from the hotel',
    description:
      'A practical guide to Panvel and the wider Navi Mumbai area, with the essentials for getting around.',
    meta: 'Local guide',
  },
  {
    ...journalCards[1],
    slug: 'beaches-and-bays',
    title: 'Quick city escapes',
    eyebrow: 'For a day out',
    description:
      'Malls, gardens, waterfronts and hill stations — short trips for an easy day off.',
    meta: 'Our local map',
  },
  {
    ...journalCards[2],
    slug: 'market-town-mornings',
    title: 'Markets & malls',
    eyebrow: 'For a slow wander',
    description:
      'Local markets, modern malls and everything in between for a relaxed morning out.',
    meta: '20 minutes by car',
  },
];