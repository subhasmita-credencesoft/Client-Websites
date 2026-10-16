import QuickNavSection from '@/components/sections/shared/QuickNav';
import { diningQuickNav } from '@/data/pages/dining';

export default function DiningIntro() {
  return (
    <QuickNavSection
      eyebrow="The Culinary Collection"
      title="Two ways to gather."
      body="Every journey through the heritage of Hampi deserves an equally memorable table. At Hotel Krishna Palace, our two distinct food and beverage destinations offer an experience matched to every hour of the day and every mood of the evening."
      items={diningQuickNav}
    />
  );
}
