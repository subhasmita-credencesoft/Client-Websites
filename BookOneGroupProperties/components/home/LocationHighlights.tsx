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

type LocationHighlightsData = Awaited<ReturnType<typeof import("@/lib/hotelmate-properties").getLocationHighlightsData>>;

type LocationHighlightsProps = {
  data?: LocationHighlightsData;
};

export function LocationHighlights({ data }: LocationHighlightsProps) {
  return (
    <Suspense fallback={<LocationHighlightsContent locationFromUrl={null} data={data} />}>
      <LocationHighlightsFromSearchParams data={data} />
    </Suspense>
  );
}

function LocationHighlightsFromSearchParams({ data }: LocationHighlightsProps) {
  const searchParams = useSearchParams();
  const locationFromUrl = searchParams?.get("location") ?? null;

  return <LocationHighlightsContent locationFromUrl={locationFromUrl} data={data} />;
}

type LocationHighlightsContentProps = {
  locationFromUrl: string | null;
  data?: LocationHighlightsData;
};

function LocationHighlightsContent({ locationFromUrl, data }: LocationHighlightsContentProps) {
  const locationHighlights = data ?? homePageData.locationHighlights;
  const defaultLocation = useMemo(
    () =>
      locationHighlights.locations.some((location) => location.id === locationFromUrl)
        ? locationFromUrl
        : locationHighlights.locations[0]?.id ?? "near-pune",
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
    <section className="border-b border-border/40 bg-muted/30 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-primary md:text-3xl">{locationHighlights.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">{locationHighlights.description}</p>
          </div>
          <div className="no-scrollbar flex w-full gap-2 overflow-x-auto pb-2 md:w-auto">
            {locationHighlights.locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setActiveLocation(location.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${activeLocation === location.id
                    ? "scale-105 bg-primary text-white shadow-md"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
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
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {activeProperties.map((property) => (
                <a
                  key={property.id}
                  href={property.link || "#"}
                  target={property.link?.startsWith("http") ? "_blank" : undefined}
                  rel={property.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  <div className="group h-full cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute left-3 top-3">
                        <Badge className="bg-white/90 font-bold text-primary shadow-sm backdrop-blur-sm hover:bg-white">
                          {property.type}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{property.rating}</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                          {property.title}
                        </h3>
                        <span className="shrink-0 font-bold text-primary">
                          {property.price > 0 ? (
                            <>
                              {formatCurrency(property.price)}
                              <span className="text-xs font-normal text-muted-foreground">/night</span>
                            </>
                          ) : (
                            <span className="text-sm">Price on Request</span>
                          )}
                        </span>
                      </div>

                      <div className="mb-4 flex items-start text-xs leading-relaxed text-muted-foreground">
                        <MapPin className="mr-1 mt-0.5 h-3 w-3 shrink-0" />
                        <span className="break-words">
                          {property.location}
                          <span className="mx-2">&bull;</span>
                          <span>{property.features}</span>
                        </span>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full transition-colors group-hover:bg-primary group-hover:text-white"
                      >
                        View Details <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </a>
              ))}

              <Link
                href={`/properties?location=${activeLocation}`}
                className="group flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-muted/20 px-4 text-center transition-all hover:border-primary hover:bg-primary/5 md:min-h-[300px]"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <ArrowRight className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-foreground">View all</h3>
                <p className="mt-1 text-sm text-muted-foreground">{activeLocationLabel?.count}</p>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
