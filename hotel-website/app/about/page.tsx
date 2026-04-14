import type { Metadata } from "next";
import dynamic from "next/dynamic";
import AboutHero from "../../components/sections/AboutHero";
import WelcomeSection from "../../components/sections/WelcomeSection";
import { dynamicImportWithRetry } from "../../lib/dynamicImportWithRetry";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Learn more about UK's Resort, its hospitality story, and the experiences that define each stay in Khopoli.",
  path: "/about",
  image: "https://bookonelocal.in/cdn/3.png",
});

const ResortIntro = dynamic(dynamicImportWithRetry(() => import("../../components/sections/ResortIntro"), "about-resort-intro"), {
  loading: () => <section className="min-h-[65vh] bg-white" aria-hidden="true" />,
});
const Testimonials = dynamic(dynamicImportWithRetry(() => import("../../components/sections/Testimonials"), "about-testimonials"), {
  loading: () => <section className="min-h-[60vh] bg-[#f3efe8]" aria-hidden="true" />,
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WelcomeSection />
      <ResortIntro />
      {/* <PropertyDetailsPanel /> */}
      <Testimonials />
    </>
  );
}

