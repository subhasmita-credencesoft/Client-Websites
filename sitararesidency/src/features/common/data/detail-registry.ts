import type { DetailContent, DetailKind } from '@/shared/types/content';
import { business } from '@/core/config/business';
import { heroImage } from '@/features/common/data/images';
import { offerDetails } from '@/features/home/data/offers';
import { diningFallback } from '@/features/dining';
import { blogArticlesMap, blogFallback } from '@/features/blog/data/blog';

const genericFallback: DetailContent = {
  title: 'A comfortable kind of stay',
  eyebrow: `At ${business.name}`,
  intro: 'Make a little space for the things you usually rush past.',
  paragraphs: [
    'The hotel is ready when you are. Settle into a place that knows how to welcome people, and how to leave them in peace.',
    'Our team is attentive, our standards are high, and there is always something warm waiting when you come back in the evening.',
  ],
  image: heroImage,
  facts: ['Thoughtful details', 'Warm welcome', 'Practical comforts', 'Good things to eat'],
};

export const detailCopy: Record<string, DetailContent> = {
  ...offerDetails,
};

export function detailFor(kind: DetailKind, slug: string): DetailContent {
  if (kind === 'blog' && blogArticlesMap[slug]) {
    return blogArticlesMap[slug];
  }
  return (
    detailCopy[slug] ??
    (kind === 'dining'
      ? diningFallback
      : kind === 'blog'
        ? blogFallback
        : genericFallback)
  );
}
