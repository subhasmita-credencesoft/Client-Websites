import type { CardItem, DetailContent } from '@/shared/types/content';
import { business } from '@/core/config/business';
import { diningImage, heroImage, localAreaImage, receptionOfferImages } from '@/features/common/data/images';

export const offerCards: CardItem[] = [
  {
    slug: 'three-nights-by-the-sea',
    title: 'Stay longer, rest easy',
    eyebrow: 'Make a proper break of it',
    description:
      'A relaxed longer stay with breakfast each morning and a late checkout to match.',
    image: receptionOfferImages[0],
    meta: 'From ₹12,500 per room',
  },
  {
    slug: 'a-table-at-ardmore',
    title: 'Dinner, bed & breakfast',
    eyebrow: 'Make a night of it',
    description:
      'A comfortable overnight stay with a relaxed evening meal and breakfast to follow.',
    image: receptionOfferImages[1],
    meta: 'From ₹6,800 per room',
  },
  {
    slug: 'little-wild-weekend',
    title: 'Family weekend stay',
    eyebrow: 'Made for families',
    description:
      'A family-friendly weekend with breakfasts included and room for everyone to unwind.',
    image: receptionOfferImages[2],
    meta: 'From ₹12,900 per room',
  },
];

export const offerDetails: Record<string, DetailContent> = {
  'three-nights-by-the-sea': {
    title: 'Stay longer, rest easy',
    eyebrow: `A ${business.name} offer`,
    intro: 'The best trips have a little more room.',
    paragraphs: [
      'Give yourself an extra night or two. This is the stay for longer plans, unhurried mornings and the easy feeling of not rushing.',
      'Breakfast is included each morning and checkout is flexible, because leaving early is sometimes enough of a rush.',
    ],
    image: localAreaImage,
    facts: ['Three nights', 'Breakfast each morning', 'Late checkout', 'Available year-round'],
  },
  'a-table-at-ardmore': {
    title: 'Dinner, bed & breakfast',
    eyebrow: `A ${business.name} offer`,
    intro: 'Come for the room. Stay for supper.',
    paragraphs: [
      'An overnight escape built around our restaurant. Arrive in time to settle in, then enjoy an unhurried evening meal from our multicuisine menu.',
      'The next morning begins with something warm, something fresh and nowhere else you need to be.',
    ],
    image: diningImage,
    facts: ['One night', 'Evening meal', 'Breakfast included', 'Room service available'],
  },
  'little-wild-weekend': {
    title: 'Family weekend stay',
    eyebrow: `A ${business.name} offer`,
    intro: 'Good days out. Better memories back home.',
    paragraphs: [
      'Bring the whole gang. We’ll have a family suite ready, breakfasts sorted, and plenty of suggestions for easy day trips around Navi Mumbai.',
      'There is room to relax when you get back, naturally.',
    ],
    image: heroImage,
    facts: ['Two nights', 'Family suite', 'Breakfast included', 'Local travel tips'],
  },
};