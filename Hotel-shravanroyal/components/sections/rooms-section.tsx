"use client";

import { motion } from "framer-motion";
import { BedDouble, Users } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/shared/container";
import { CtaButton } from "@/components/shared/cta-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { hotelInfo } from "@/data/hotel";
import { rooms } from "@/data/rooms";
import { SECTION_IDS } from "@/lib/constants";

export function RoomsSection() {
  return (
    <section className="section-shell bg-gradient-to-b from-transparent to-secondary/55" id={SECTION_IDS.rooms}>
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading description="Browse curated stay options designed for couples, families, and business visitors. Room content is data-driven for easy updates as inventory details evolve." eyebrow="Rooms & Suites" title="Stay options crafted for restful, polished comfort" />
          <CtaButton href={hotelInfo.bookingUrl} label="Book Your Stay" variant="outline" />
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {rooms.map((room, index) => (
            <motion.div key={room.id} initial={{ opacity: 0, y: 28 }} transition={{ duration: 0.45, delay: index * 0.08 }} viewport={{ once: true, amount: 0.25 }} whileInView={{ opacity: 1, y: 0 }}>
              <Card className="group h-full overflow-hidden border-white/60 bg-white/85 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <Image alt={room.alt} className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105" height={700} src={room.image} style={room.imagePosition ? { objectPosition: room.imagePosition } : undefined} width={700} />
                  <div className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-sm sm:left-5 sm:top-5 sm:px-4 sm:py-2 sm:text-xs">{room.name}</div>
                </div>
                <CardContent className="flex h-full flex-col p-5 sm:p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-primary" />{room.occupancy}</span>
                    <span className="inline-flex items-center gap-2"><BedDouble className="h-4 w-4 text-primary" />Premium bedding</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">{room.name}</h3>
                  <p className="mt-3 text-muted-foreground">{room.description}</p>
                  <ul className="mt-5 space-y-2.5 text-sm text-stone-700">
                    {room.features.map((feature) => (
                      <li key={feature} className="rounded-2xl bg-secondary/70 px-4 py-2.5">{feature}</li>
                    ))}
                  </ul>
                  <div className="mt-6 sm:mt-8"><CtaButton href={hotelInfo.bookingUrl} label={room.ctaLabel} /></div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}