import type { Metadata } from "next";
import { HeroFor } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schema";
import { faqs } from "@/data/faqs";
import { pages } from "@/data/pages";
import { metaFor } from "@/lib/seo/metadata";

const page = pages.faq;
export const metadata: Metadata = metaFor(page);

export default function FaqPage() {
  const schema = faqSchema();
  return (
    <>
      <HeroFor page={page} />
      <section className="section">
        <div className="container">
          <Breadcrumbs items={[{ label: "FAQ" }]} />
          <div style={{ height: "2rem" }} />
          <FaqAccordion items={faqs} />
        </div>
      </section>
      {schema && <JsonLd data={schema} />}
    </>
  );
}
