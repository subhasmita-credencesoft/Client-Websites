"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Gem, HeartHandshake, MapPinned } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { hotelInfo } from "@/data/hotel";
import { SECTION_IDS } from "@/lib/constants";

const pillars = [
  { icon: Gem, title: "Refined Ambience", text: "Carefully styled interiors create a sense of calm sophistication from lobby to room." },
  { icon: HeartHandshake, title: "Warm Hospitality", text: "A guest-first approach keeps every interaction welcoming, responsive, and thoughtful." },
  { icon: MapPinned, title: "Connected Jaipur Stay", text: "A practical Jaipur location supports smooth city access for leisure and business travel." },
];

export function AboutSection() {
  return (
    <section className="section-shell" id={SECTION_IDS.about}>
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <motion.div
            className="relative overflow-hidden rounded-[2rem] shadow-glow"
            initial={{ opacity: 0, x: -30, y: 24 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
          >
            <Image alt="Elegant interior styling for Hotel Shravan Royal Inn" className="h-full min-h-[320px] w-full object-cover sm:min-h-[440px]" height={900} src="/images/gallery-2.jpg" width={700} />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/55 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-xs uppercase tracking-[0.22em] text-primary/70 sm:text-sm sm:tracking-[0.25em]">Signature Stay</p>
              <p className="mt-2 font-display text-2xl font-semibold text-stone-900 sm:text-3xl">Comfort meets class in Jaipur.</p>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: 30, y: 24 }}
            transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
          >
            <SectionHeading description="A hospitality-led stay experience designed around comfort, elegance, and everyday ease." eyebrow="About The Hotel" title="A modern stay shaped with warmth and understated luxury" />
            <div className="space-y-5">
              {hotelInfo.about.map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  className="text-base text-muted-foreground sm:text-lg"
                  initial={{ opacity: 0, y: 18 }}
                  transition={{ duration: 0.5, delay: 0.14 + index * 0.06, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 24 }}
                    transition={{ duration: 0.45, delay: 0.22 + index * 0.07, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <Card className="overflow-hidden border-0 bg-secondary/65 shadow-none">
                      <CardContent className="p-4 sm:p-5">
                        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-semibold sm:text-xl">{pillar.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{pillar.text}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}