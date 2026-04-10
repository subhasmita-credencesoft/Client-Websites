"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/data/testimonials";
import { SECTION_IDS } from "@/lib/constants";

export function TestimonialsSection() {
  return (
    <section className="section-shell bg-gradient-to-b from-secondary/40 to-transparent" id={SECTION_IDS.reviews}>
      <Container>
        <SectionHeading
          align="center"
          description="Selected sample guest feedback blocks are kept editable and do not represent verified platform ratings or counts."
          eyebrow="Featured Feedback"
          title="Guests remember the comfort, cleanliness, and welcoming tone"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.25 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Card className="h-full border-white/70 bg-white/90">
                <CardContent className="p-7">
                  <Quote className="h-8 w-8 text-primary/60" />
                  <p className="mt-5 text-lg text-stone-700">"{testimonial.quote}"</p>
                  <div className="mt-6 border-t border-border/70 pt-5">
                    <p className="text-lg font-semibold text-stone-900">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
