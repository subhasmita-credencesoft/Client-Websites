import SectionHead from '@/components/sections/shared/SectionHead';
import TimelineGrid from '@/components/sections/shared/TimelineGrid';
import { diningTimeline } from '@/data/pages/dining';

export default function DiningTimeline() {
  return (
    <section className="section section--warm">
      <SectionHead
        eyebrow="A Day in Flavours"
        title="The culinary journey."
        body="From daybreak to starlight, find the right table at every turn of your journey."
      />
      <TimelineGrid items={diningTimeline} />
    </section>
  );
}
