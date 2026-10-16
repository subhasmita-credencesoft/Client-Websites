import SectionHead from '@/components/sections/shared/SectionHead';
import FeatureList from '@/components/sections/shared/FeatureList';
import { diningOutlets } from '@/data/dining';

export default function FiestaHighlights() {
  const fiesta = diningOutlets.find((outlet) => outlet.slug === 'fiesta')!;

  return (
    <section className="section section--warm">
      <SectionHead
        eyebrow="Highlights"
        title="What to expect at Fiesta"
        body="Designed for easy mornings, sociable lunches and satisfying family dinners."
      />
      <FeatureList items={fiesta.features} />
    </section>
  );
}
