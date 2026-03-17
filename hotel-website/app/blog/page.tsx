import BlogGrid from "../../components/sections/BlogGrid";
import BlogHero from "../../components/sections/BlogHero";
import BlogFeature from "../../components/sections/BlogFeature";
import BlogFilterGrid from "../../components/sections/BlogFilterGrid";
import HeroBookingBarDock from "../../components/sections/HeroBookingBarDock";

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      {/* <HeroBookingBarDock /> */}
      {/* <BlogFeature /> */}
      <BlogFilterGrid />
    </>
  );
}
