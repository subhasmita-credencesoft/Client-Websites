import { pageContent } from "@/data/pages";

export function ContactPage() {
  const { contact } = pageContent;

  return (
    <main className="pt-32">
      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary/70">
            {contact.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold text-primary md:text-5xl">
            {contact.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {contact.description}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto grid gap-6 px-6 md:grid-cols-3">
          {contact.cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="flex items-center gap-6 rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-[0.65rem] font-bold uppercase tracking-widest text-primary/70">
                    {card.title}
                  </h2>
                  <p className="mt-1 text-base font-bold text-foreground sm:text-lg">
                    {card.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
