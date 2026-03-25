import { PropertyCard } from "@/components/property/PropertyCard";
import { homePageData } from "@/data/home";

export function FeaturedSection() {
  const { featured } = homePageData;

  return (
    <section className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary uppercase tracking-wide mb-4">{featured.title}</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
}
