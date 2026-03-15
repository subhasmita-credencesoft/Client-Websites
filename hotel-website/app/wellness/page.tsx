import dynamic from "next/dynamic";
import WellnessHeroPage from "../../components/sections/WellnessHeroPage";

const WellnessSpaIntro = dynamic(() => import("../../components/sections/WellnessSpaIntro"), {
  loading: () => <section className="min-h-[70vh] bg-[#f4f1ea]" aria-hidden="true" />,
});
const WellnessMoodSlider = dynamic(() => import("../../components/sections/WellnessMoodSlider"), {
  loading: () => <section className="min-h-[70vh] bg-[#1c2427]" aria-hidden="true" />,
});

export default function WellnessPage() {
  return (
    <>
      <WellnessHeroPage />
      <WellnessSpaIntro />
      <WellnessMoodSlider />
    </>
  );
}

