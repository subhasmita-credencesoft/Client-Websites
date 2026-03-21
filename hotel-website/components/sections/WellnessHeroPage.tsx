import PageHero from "./PageHero";
import { WELLNESS_HERO_PAGE_CONFIG } from "@/data/sections/pageHeroes";

export default function WellnessHeroPage() {
  return <PageHero {...WELLNESS_HERO_PAGE_CONFIG} />;
}
