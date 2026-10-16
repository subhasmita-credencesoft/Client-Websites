import SectionHead from '@/components/sections/shared/SectionHead';
import TimelineGrid from '@/components/sections/shared/TimelineGrid';
import { banquetOccasions } from '@/data/pages/banquet';

export default function BanquetOccasions() {
  return (
    <section className="section section--warm" id="occasions">
      <SectionHead
        eyebrow="Tailored Formats"
        title="Curated for every occasion."
        body="From high-level executive summits to intimate family milestones, our team ensures seamless logistics and attentive execution."
      />
      <TimelineGrid items={banquetOccasions} />
    </section>
  );
}
