import type { ListingType, SectionConfig } from '@/shared/types/content';
import { business } from '@/core/config/business';
import {
  diningImage,
  heroImage,
  localAreaImage,
  sittingRoomImage,
} from '@/features/common/data/images';
import { offerCards } from '@/features/home/data/offers';
import { diningCards } from '@/features/dining';
import { journalCards } from '@/features/blog';
import { thingsCards } from '@/features/things-to-do';

export function sectionConfig(type: ListingType): SectionConfig {
  const config: Record<ListingType, SectionConfig> = {
    bedrooms: {
      eyebrow: `Stay at ${business.name}`,
      title: 'Rooms from the booking engine',
      intro:
        'Live rooms, rates and availability fetched directly from our booking engine.',
      image: sittingRoomImage,
      items: [],
    },
    dining: {
      eyebrow: 'Eat & drink',
      title: 'Come hungry.',
      intro:
        'Breakfast, lunch and dinner served through the day, with familiar favourites and regional dishes.',
      image: diningImage,
      items: diningCards,
    },
    offers: {
      eyebrow: 'Stay a little longer',
      title: 'Good reasons to come away.',
      intro:
        'A few considered stays that add a little more comfort to your trip.',
      image: heroImage,
      items: offerCards,
    },
    'things-to-do': {
      eyebrow: 'Out and about',
      title: 'The area is calling.',
      intro:
        'Based in Kalamboli, close to Panvel and well connected across Navi Mumbai. Here are a few places to begin.',
      image: localAreaImage,
      items: thingsCards,
    },
    blog: {
      eyebrow: 'Hotel Sitara Residency · The Journal',
      title: 'Stories & Local Guides',
      intro:
        'Curated local itineraries, business transit advice, and neighbourhood secrets from our hospitality team in Kalamboli, Navi Mumbai.',
      image: '/sitaraabout.avif',
      items: journalCards,
    },
  };
  return config[type];
}
