"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, Crown, MapPinned, Sofa, Sparkles } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { hotelInfo } from "@/data/hotel";

const highlightCards = [
  { icon: Crown, title: "Premium Experience" },
  { icon: MapPinned, title: "Convenient Jaipur Location" },
  { icon: Sofa, title: "Elegant Interiors" },
  { icon: Sparkles, title: "Hospitality-First Service" },
  { icon: BriefcaseBusiness, title: "Leisure and Business Ready" },
];

export function HighlightsSection() {
  return (
    <section className="section-shell">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -28, y: 20 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
          >
            <SectionHeading description="Built to feel premium without losing warmth, the hotel experience is shaped around calm spaces, elegant design, and practical travel convenience." eyebrow="Why Choose Us" title="A stay experience designed to feel polished, personal, and practical" />
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {highlightCards.map((card, index) => {
              const Icon = card.icon;
              const text = hotelInfo.highlights[index] ?? hotelInfo.highlights[hotelInfo.highlights.length - 1];
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <Card className="h-full border-border/50 bg-white/85">
                    <CardContent className="p-6">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary"><Icon className="h-5 w-5" /></div>
                      <h3 className="mt-5 text-2xl font-semibold">{card.title}</h3>
                      <p className="mt-3 text-sm text-muted-foreground">{text}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}