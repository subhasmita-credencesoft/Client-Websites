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
              <div key={card.title} className="rounded-2xl border bg-white p-8 shadow-sm">
                <Icon className="h-8 w-8 text-primary" />
                <h2 className="mt-4 text-xl font-bold text-foreground">{card.title}</h2>
                <p className="mt-2 text-muted-foreground">{card.value}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
