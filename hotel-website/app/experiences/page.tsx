import dynamic from "next/dynamic";
import ExperiencesHero from "../../components/sections/ExperiencesHero";
import BlogFeature from "@/components/sections/BlogFeature";

const ExperiencesIntro = dynamic(() => import("../../components/sections/ExperiencesIntro"), {
  loading: () => <section className="min-h-[65vh] bg-[#f6f3ed]" aria-hidden="true" />,
});
const ExperiencesShowcase = dynamic(() => import("../../components/sections/ExperiencesShowcase"), {
  loading: () => <section className="min-h-[70vh] bg-[#f6f3ed]" aria-hidden="true" />,
});
const ExperiencesExplore = dynamic(() => import("../../components/sections/ExperiencesExplore"), {
  loading: () => <section className="min-h-[65vh] bg-[#f6f3ed]" aria-hidden="true" />,
});

export default function ExperiencesPage() {
  return (
    <>
      <ExperiencesHero />
        <BlogFeature />
      {/* <ExperiencesIntro /> */}
      <ExperiencesShowcase />
      <ExperiencesExplore />
    </>
  );
}

