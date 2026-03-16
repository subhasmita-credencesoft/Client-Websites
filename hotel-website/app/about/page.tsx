import dynamic from "next/dynamic";
import AboutHero from "../../components/sections/AboutHero";
import WelcomeSection from "../../components/sections/WelcomeSection";
import PropertyDetailsPanel from "../../components/sections/PropertyDetailsPanel";

const ResortIntro = dynamic(() => import("../../components/sections/ResortIntro"), {
  loading: () => <section className="min-h-[65vh] bg-white" aria-hidden="true" />,
});
const Testimonials = dynamic(() => import("../../components/sections/Testimonials"), {
  loading: () => <section className="min-h-[60vh] bg-[#f3efe8]" aria-hidden="true" />,
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WelcomeSection />
      <ResortIntro />
      <PropertyDetailsPanel />
      <Testimonials />
    </>
  );
}

