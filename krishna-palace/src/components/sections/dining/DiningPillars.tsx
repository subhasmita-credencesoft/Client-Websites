import SectionHead from '@/components/sections/shared/SectionHead';
import PillarsGrid from '@/components/sections/shared/PillarsGrid';
import { diningPillars } from '@/data/pages/dining';

export default function DiningPillars() {
  return (
    <section className="section section--dark">
      <SectionHead
        eyebrow="Our Philosophy"
        title="Three pillars of dining."
        body="Rooted in genuine regional warmth, authentic ingredients, and diverse settings."
      />
      <PillarsGrid items={diningPillars} />
    </section>
  );
}
