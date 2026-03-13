import Hero from "../components/sections/Hero";
import WelcomeSection from "../components/sections/WelcomeSection";
import ResortIntro from "../components/sections/ResortIntro";
import RoomsShowcase from "../components/sections/RoomsShowcase";
import WellnessHero from "../components/sections/WellnessHero";
import DiningShowcase from "../components/sections/DiningShowcase";
import StatsBanner from "../components/sections/StatsBanner";
import Testimonials from "../components/sections/Testimonials";
import LocationOffers from "../components/sections/LocationOffers";
import NewsEvents from "../components/sections/NewsEvents";

export default function Home() {
  return (
    <div>
      <Hero />
      <WelcomeSection />
      <WellnessHero />
      <ResortIntro />
      <RoomsShowcase />
      <DiningShowcase />
      <StatsBanner />
      <LocationOffers />
      <Testimonials />
      {/* <NewsEvents /> */}
    </div>
  );
}
