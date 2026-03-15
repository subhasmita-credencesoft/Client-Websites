import dynamic from "next/dynamic";
import Hero from "../components/sections/Hero";
import WelcomeSection from "../components/sections/WelcomeSection";

const WellnessHero = dynamic(() => import("../components/sections/WellnessHero"), {
  loading: () => <section className="min-h-[70vh] bg-[#f6f3ed]" aria-hidden="true" />,
});
const ResortIntro = dynamic(() => import("../components/sections/ResortIntro"), {
  loading: () => <section className="min-h-[65vh] bg-white" aria-hidden="true" />,
});
const RoomsShowcase = dynamic(() => import("../components/sections/RoomsShowcase"), {
  loading: () => <section className="min-h-[70vh] bg-white" aria-hidden="true" />,
});
const DiningShowcase = dynamic(() => import("../components/sections/DiningShowcase"), {
  loading: () => <section className="min-h-[70vh] bg-[#f3efe8]" aria-hidden="true" />,
});
const LocationOffers = dynamic(() => import("../components/sections/LocationOffers"), {
  loading: () => <section className="min-h-[65vh] bg-[#f6f3ed]" aria-hidden="true" />,
});
const Testimonials = dynamic(() => import("../components/sections/Testimonials"), {
  loading: () => <section className="min-h-[60vh] bg-[#f3efe8]" aria-hidden="true" />,
});

export default function Home() {
  return (
    <div>
      <Hero />
      <WelcomeSection />
      <WellnessHero />
      <ResortIntro />
      <RoomsShowcase />
      <DiningShowcase />
      <LocationOffers />
      <Testimonials />
    </div>
  );
}

