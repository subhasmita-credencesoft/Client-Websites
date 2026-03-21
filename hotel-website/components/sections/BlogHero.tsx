import PageHero from "./PageHero";
import { BLOG_HERO_CONFIG } from "@/data/sections/pageHeroes";

export default function BlogHero() {
  return <PageHero {...BLOG_HERO_CONFIG} />;
}
