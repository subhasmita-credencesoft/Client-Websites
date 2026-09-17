import { PropertyCard } from "@/components/features/properties/PropertyCard";
import { homePageData } from "@/data/home";

type FeaturedSectionProps = {
  data: Awaited<ReturnType<typeof import("@/lib/properties/service").getFeaturedPropertiesData>>;
};

export function FeaturedSection({ data }: FeaturedSectionProps) {
  const { featured } = homePageData;

  return (
    <section className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
<h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">{featured.title}</h2>
            <div className="gold-rule-center mb-8 md:mb-10 w-24" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
}
