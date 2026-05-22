import Image from "next/image";
import { pageContent } from "@/data/pages";

export function AboutPage() {
  const { about } = pageContent;

  return (
    <main className="pt-32">
      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary/70">
            {about.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold text-primary md:text-5xl">
            {about.title}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            {about.description}
          </p>
        </div>
      </section>

      {/* <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-primary md:text-4xl">{about.teamTitle}</h2>
              <p className="mt-3 text-muted-foreground">{about.teamDescription}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {about.team.map((member) => (
                <div key={member.name} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <div className="mb-4 overflow-hidden rounded-2xl bg-secondary/20">
                    {member.image ? (
                      <div className="relative aspect-[4/4.4] w-full">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-40 items-center justify-center bg-primary/10 text-3xl font-bold text-primary">
                        {member.name[0]}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                  <p className="mt-2 font-medium text-primary">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">from {member.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}
