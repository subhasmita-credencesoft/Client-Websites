import type { Metadata } from "next";
import { HeroFor } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGrid, Split, Stats } from "@/components/sections/Blocks";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ButtonLink } from "@/components/ui/Button";
import { content } from "@/data/content";
import { pages } from "@/data/pages";
import { metaFor } from "@/lib/seo/metadata";

const page = pages.about;
export const metadata: Metadata = metaFor(page);

export default function AboutPage() {
  const c = content.about;
  return (
    <>
      <HeroFor page={page} />
      <section className="section">
        <div className="container">
          <Breadcrumbs items={[{ label: "About" }]} />
          <div style={{ height: "2rem" }} />
          <SectionHeading eyebrow={c.story.eyebrow} title={c.story.title} intro={c.story.intro} />
          <FeatureGrid items={c.story.features} />
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <Split image={c.values.image} eyebrow={c.values.eyebrow} title={c.values.title}>
            <p>{c.values.text}</p>
            <div><ButtonLink href="/rooms" variant="secondary" arrow>{c.values.cta}</ButtonLink></div>
          </Split>
        </div>
      </section>

      <section className="section" aria-label="The hotel in numbers">
        <div className="container"><Stats items={c.stats} /></div>
      </section>

      <CtaBanner title={c.cta.title} text={c.cta.text} image={c.cta.image}>
        <ButtonLink href="/rooms" variant="light" size="lg" arrow>Explore rooms</ButtonLink>
      </CtaBanner>
    </>
  );
}
