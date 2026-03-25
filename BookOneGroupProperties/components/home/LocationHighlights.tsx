"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { homePageData } from "@/data/home";
import { formatCurrency } from "@/lib/currency";

export function LocationHighlights() {
  return (
    <Suspense fallback={<LocationHighlightsContent locationFromUrl={null} />}>
      <LocationHighlightsFromSearchParams />
    </Suspense>
  );
}

function LocationHighlightsFromSearchParams() {
  const searchParams = useSearchParams();
  const locationFromUrl = searchParams?.get("location") ?? null;

  return <LocationHighlightsContent locationFromUrl={locationFromUrl} />;
}

type LocationHighlightsContentProps = {
  locationFromUrl: string | null;
};

function LocationHighlightsContent({ locationFromUrl }: LocationHighlightsContentProps) {
  const { locationHighlights } = homePageData;
  const defaultLocation = useMemo(
    () =>
      locationHighlights.locations.some((location) => location.id === locationFromUrl)
        ? locationFromUrl
        : locationHighlights.locations[0]?.id ?? "alibaug",
    [locationFromUrl, locationHighlights.locations],
  );
  const [activeLocation, setActiveLocation] = useState(defaultLocation);

  useEffect(() => {
    setActiveLocation(defaultLocation);
  }, [defaultLocation]);

  const activeLocationLabel = locationHighlights.locations.find((location) => location.id === activeLocation);
  const activeProperties =
    locationHighlights.propertiesByLocation[
      activeLocation as keyof typeof locationHighlights.propertiesByLocation
    ] ?? [];

  return (
    <section className="py-12 bg-muted/30 border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">{locationHighlights.title}</h2>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">{locationHighlights.description}</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {locationHighlights.locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setActiveLocation(location.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                  activeLocation === location.id
                    ? "bg-primary text-white shadow-md transform scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {location.name}
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLocation}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {activeProperties.map((property) => (
                <a
                  key={property.id}
                  href={property.link || "#"}
                  target={property.link?.startsWith("http") ? "_blank" : undefined}
                  rel={property.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 text-primary hover:bg-white backdrop-blur-sm shadow-sm font-bold">
                          {property.type}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1 backdrop-blur-sm">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {property.rating}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                          {property.title}
                        </h3>
                        <span className="font-bold text-primary shrink-0">
                          {formatCurrency(property.price)}
                          <span className="text-xs text-muted-foreground font-normal">/night</span>
                        </span>
                      </div>

                      <div className="flex items-start text-xs text-muted-foreground mb-4 leading-relaxed">
                        <MapPin className="w-3 h-3 mr-1 mt-0.5 shrink-0" />
                        <span className="break-words">
                          {activeLocationLabel?.name}
                          <span className="mx-2">•</span>
                          <span>{property.features}</span>
                        </span>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                      >
                        View Details <ArrowRight className="w-3 h-3 ml-2" />
                      </Button>
                    </div>
                  </div>
                </a>
              ))}

              <Link
                href={`/properties?location=${activeLocation}`}
                className="flex flex-col items-center justify-center h-full min-h-[240px] md:min-h-[300px] bg-muted/20 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group cursor-pointer text-center px-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-foreground">View all in {activeLocationLabel?.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{activeLocationLabel?.count}</p>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}