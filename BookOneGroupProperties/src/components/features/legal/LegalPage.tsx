import { legalPageContent, siteContact } from "@/data/site";

type LegalPageKey = keyof typeof legalPageContent;

type LegalPageProps = {
  pageKey: LegalPageKey;
};

export function LegalPage({ pageKey }: LegalPageProps) {
  const page = legalPageContent[pageKey];

  return (
    <main className="pt-32">
      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary/70">
            Legal
          </p>
          <h1 className="mt-4 text-4xl font-bold text-primary md:text-5xl">
            {page.title}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            {page.description}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          <div className="space-y-6">
            {page.sections.map((section) => (
              <article key={section.heading} className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-xl font-bold text-primary md:text-2xl">{section.heading}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{section.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-primary/10 bg-primary/5 p-6 text-sm text-muted-foreground">
            For booking or policy questions, contact us at <a className="font-semibold text-primary hover:underline" href={`mailto:${siteContact.email}`}>{siteContact.email}</a> or <a className="font-semibold text-primary hover:underline" href={siteContact.phoneHref}>{siteContact.phoneDisplay}</a>.
          </div>
        </div>
      </section>
    </main>
  );
}
