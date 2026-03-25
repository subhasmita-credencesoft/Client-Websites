"use client";

import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { homePageData } from "@/data/home";

export function WhyTripDipCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const { whyTripDip } = homePageData;

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">{whyTripDip.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">{whyTripDip.description}</p>
        </div>

        <div className="relative max-w-6xl mx-auto px-0 md:px-10">
          <div className="overflow-hidden rounded-2xl shadow-2xl" ref={emblaRef}>
            <div className="flex">
              {whyTripDip.reasons.map((reason, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 relative min-h-[420px] sm:min-h-[500px] md:h-[600px]">
                  <Image
                    src={reason.image}
                    alt={reason.title}
                    fill
                    sizes="100vw"
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-16 z-20 text-white flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="bg-primary p-3 sm:p-4 rounded-full mb-5 md:mb-6 text-white shadow-lg animate-bounce">
                      <reason.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">{reason.title}</h3>
                    <p className="text-base md:text-xl text-white/90 max-w-2xl leading-relaxed mb-6 md:mb-8">
                      {reason.description}
                    </p>
                    <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary rounded-full px-6 md:px-8 py-5 md:py-6 text-base md:text-lg">
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="absolute top-4 left-4 md:top-1/2 md:left-0 md:-translate-x-1/2 md:-translate-y-1/2 bg-white text-primary p-2.5 md:p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all z-30"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            className="absolute top-4 right-4 md:top-1/2 md:right-0 md:translate-x-1/2 md:-translate-y-1/2 bg-white text-primary p-2.5 md:p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all z-30"
            onClick={scrollNext}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
