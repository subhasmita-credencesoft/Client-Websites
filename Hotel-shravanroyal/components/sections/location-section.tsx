"use client";

import { motion } from "framer-motion";
import { ExternalLink, MapPinned, Navigation } from "lucide-react";

import { Container } from "@/components/shared/container";
import { CtaButton } from "@/components/shared/cta-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { hotelInfo } from "@/data/hotel";
import { SECTION_IDS } from "@/lib/constants";

const mapEmbedUrl = "https://www.google.com/maps?q=26.8340515,75.7583633&z=17&output=embed";

export function LocationSection() {
  return (
    <section className="section-shell" id={SECTION_IDS.location}>
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -24, y: 18 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
          >
            <Card className="overflow-hidden border-border/60 bg-stone-950 text-white">
              <CardContent className="flex h-full flex-col p-5 sm:p-6 lg:p-8">
                <SectionHeading
                  description="Find the hotel in Sanganer, Jaipur with a live map preview and quick access to directions."
                  eyebrow="Location"
                  title="Easy to find, well placed for Jaipur stays"
                />
                <div className="mt-6 space-y-4 text-stone-300 sm:mt-8 sm:space-y-5">
                  <div className="flex items-start gap-3"><MapPinned className="mt-1 h-5 w-5 shrink-0 text-amber-400" /><p>{hotelInfo.address}</p></div>
                  <div className="flex items-start gap-3"><Navigation className="mt-1 h-5 w-5 shrink-0 text-amber-400" /><p>Ideal for travelers, families, couples, and business visitors seeking convenient city access.</p></div>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
                  <CtaButton href={hotelInfo.directionsUrl} label="Get Directions" />
                  <CtaButton href="/contact" label="Send Inquiry" variant="outline" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24, y: 18 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-border/70 bg-white p-3 shadow-soft sm:rounded-[2rem] sm:p-4">
              <div className="flex h-full min-h-[320px] flex-col rounded-[1.25rem] bg-gradient-to-br from-stone-200 via-stone-100 to-amber-50 p-4 sm:min-h-[420px] sm:rounded-[1.5rem] sm:p-6">
                <div className="flex items-center justify-between gap-4 rounded-[1.25rem] bg-white/85 p-4 shadow-sm backdrop-blur-sm">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-primary/75">Map Preview</p>
                    <p className="mt-1 text-lg font-semibold text-stone-900">Hotel Shravan Royal Inn</p>
                  </div>
                  <a aria-label="Open hotel location in Google Maps" href={hotelInfo.directionsUrl} rel="noreferrer" target="_blank">
                    <ExternalLink className="h-5 w-5 text-primary" />
                  </a>
                </div>
                <div className="mt-5 flex flex-1 overflow-hidden rounded-[1.5rem] border border-border/60 bg-white shadow-inner">
                  <iframe
                    allowFullScreen
                    className="h-full min-h-[260px] w-full sm:min-h-[320px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={mapEmbedUrl}
                    title="Hotel Shravan Royal Inn location map"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
