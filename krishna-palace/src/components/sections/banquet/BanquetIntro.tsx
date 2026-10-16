import QuickNavSection from '@/components/sections/shared/QuickNav';
import { banquetQuickNav } from '@/data/pages/banquet';

export default function BanquetIntro() {
  return (
    <QuickNavSection
      eyebrow="Grand Gatherings & Business"
      title="A venue crafted for distinction."
      body="Hotel Krishna Palace provides the premier hospitality and event infrastructure in Hosapete. Whether orchestrating high-stakes regional corporate conferences, elegant product debuts, fashion spectacles, or lavish celebratory dinners, our dedicated team delivers seamless hospitality with verified on-site catering and production capabilities."
      items={banquetQuickNav}
    />
  );
}
