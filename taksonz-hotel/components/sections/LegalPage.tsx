import { HeroFor } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { PageMeta } from "@/data/pages";
import { legalNotice, type LegalSection } from "@/data/legal";

export function LegalPage({ page, sections }: { page: PageMeta; sections: LegalSection[] }) {
  return (
    <>
      <HeroFor page={page} />
      <section className="section">
        <div className="container">
          <Breadcrumbs items={[{ label: page.title }]} />
          <div style={{ height: "2rem" }} />
          <p style={{ maxWidth: "68ch", padding: "0.9rem 1.1rem", border: "1px dashed var(--champagne)", borderRadius: 8, background: "var(--white)", fontSize: "0.875rem", marginBottom: "2rem" }}>{legalNotice}</p>
          <div className="prose">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                <p>{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
