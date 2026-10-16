import OutletShowcase from '@/components/sections/shared/OutletShowcase';
import { banquetShowcases } from '@/data/pages/banquet';

export default function BanquetShowcases() {
  return (
    <section className="section" id="features">
      {banquetShowcases.map((showcase) => (
        <OutletShowcase key={showcase.number} {...showcase} />
      ))}
    </section>
  );
}
