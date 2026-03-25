import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { homePageData } from "@/data/home";

export function PropertyOwnerCTA() {
  const { propertyOwnerCta } = homePageData;
  const BenefitIcon = propertyOwnerCta.benefitIcon;

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="bg-primary rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-6 sm:p-8 md:p-16 flex flex-col justify-center text-white">
            <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-bold tracking-wider uppercase mb-6 w-fit bg-white/10">
              {propertyOwnerCta.badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {propertyOwnerCta.title}
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-8 leading-relaxed">
              {propertyOwnerCta.description}
            </p>

            <ul className="space-y-4 mb-10">
              {propertyOwnerCta.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <BenefitIcon className="w-6 h-6 text-[#25D366] shrink-0 mt-0.5" />
                  <span className="font-medium">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold px-8 h-12 rounded-full text-base">
                <Link href="/properties">List Your Property</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-8 h-12 rounded-full text-base">
                <Link href="/contact">Contact Partnership Team</Link>
              </Button>
            </div>
          </div>

          <div className="lg:w-1/2 relative min-h-[280px] sm:min-h-[360px] lg:min-h-[400px]">
            <Image
              src={propertyOwnerCta.image}
              alt="Property Manager"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}
