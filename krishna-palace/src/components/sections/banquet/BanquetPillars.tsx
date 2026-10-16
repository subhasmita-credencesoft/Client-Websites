import SectionHead from '@/components/sections/shared/SectionHead';
import PillarsGrid from '@/components/sections/shared/PillarsGrid';
import { banquetPillars } from '@/data/pages/banquet';

export default function BanquetPillars() {
  return (
    <section className="section section--dark">
      <SectionHead
        eyebrow="Our Commitment"
        title="Why hosts trust Krishna Palace."
        body="Over a decade of hospitality heritage in the heart of Hosapete."
      />
      <PillarsGrid items={banquetPillars} />
    </section>
  );
}
