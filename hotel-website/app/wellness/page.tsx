import WellnessHeroPage from "../../components/sections/WellnessHeroPage";
import WellnessSpaIntro from "../../components/sections/WellnessSpaIntro";
import WellnessMoodSlider from "../../components/sections/WellnessMoodSlider";
import WellnessServices from "../../components/sections/WellnessServices";

export default function WellnessPage() {
  return (
    <>
      <WellnessHeroPage />
      <WellnessSpaIntro />
      <WellnessMoodSlider />
      <WellnessServices />
    </>
  );
}
