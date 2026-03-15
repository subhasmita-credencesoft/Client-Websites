import DiningHero from "../../components/sections/DiningHero";
import HeroBookingBarDock from "../../components/sections/HeroBookingBarDock";
import DiningShowcase from "../../components/sections/DiningShowcase";
import DiningCulinaryExperience from "../../components/sections/DiningCulinaryExperience";
import DiningMoodSlider from "../../components/sections/DiningMoodSlider";

export default function DiningPage() {
  return (
    <>
      <DiningHero />
      {/* <HeroBookingBarDock /> */}
      <DiningCulinaryExperience />
      <DiningMoodSlider />
      <DiningShowcase />
    </>
  );
}
