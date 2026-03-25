import Image from "next/image";
import { homePageData } from "@/data/home";

export function ServicesSection() {
  const { services } = homePageData;

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-10 md:gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 md:mb-8">{services.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-10 md:mb-12 text-base md:text-lg">
              {services.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {services.items.map((service) => (
                <div key={service.label} className="flex flex-col items-center text-center gap-3 group">
                  <div className="p-4 bg-secondary/50 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wide text-foreground/80">{service.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full h-[320px] sm:h-[420px] md:h-[520px]">
            <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={services.image}
                alt={services.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
