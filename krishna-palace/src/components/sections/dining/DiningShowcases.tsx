import OutletShowcase from '@/components/sections/shared/OutletShowcase';
import { diningShowcases } from '@/data/pages/dining';

export default function DiningShowcases() {
  return (
    <section className="section">
      {diningShowcases.map((showcase) => (
        <OutletShowcase key={showcase.number} {...showcase} />
      ))}
    </section>
  );
}
