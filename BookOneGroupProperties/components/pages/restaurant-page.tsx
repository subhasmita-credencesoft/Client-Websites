import Image from "next/image";
import { pageContent } from "@/data/pages";

export function RestaurantPage() {
  const { restaurant } = pageContent;

  return (
    <main className="pt-32">
      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary/70">
            {restaurant.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold text-primary md:text-5xl">
            {restaurant.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {restaurant.description}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
            <div className="relative min-h-[320px] sm:min-h-[420px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={restaurant.image}
                alt={restaurant.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>

            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-1">
              {restaurant.highlights.map((highlight) => (
                <div key={highlight.title} className="rounded-2xl border bg-white p-6 md:p-8 shadow-sm">
                  <h2 className="text-xl font-bold text-primary">{highlight.title}</h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
