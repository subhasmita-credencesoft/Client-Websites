"use client";

import { motion } from "framer-motion";
import { BedDouble, ConciergeBell, Headset, ParkingSquare, Snowflake, Sparkles, UsersRound, Wifi } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { amenities } from "@/data/amenities";
import { SECTION_IDS } from "@/lib/constants";

const iconMap = {
  wifi: Wifi,
  parkingSquare: ParkingSquare,
  snowflake: Snowflake,
  conciergeBell: ConciergeBell,
  headset: Headset,
  sparkles: Sparkles,
  bedDouble: BedDouble,
  usersRound: UsersRound,
} as const;

export function AmenitiesSection() {
  return (
    <section className="section-shell" id={SECTION_IDS.amenities}>
      <Container>
        <SectionHeading align="center" description="Thoughtful essentials and practical comforts come together to support a smooth premium stay." eyebrow="Amenities" title="Everything you need for a comfortable Jaipur visit" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {amenities.map((amenity, index) => {
            const Icon = iconMap[amenity.icon as keyof typeof iconMap];
            return (
              <motion.div key={amenity.id} initial={{ opacity: 0, y: 24 }} transition={{ duration: 0.4, delay: index * 0.05 }} viewport={{ once: true, amount: 0.25 }} whileInView={{ opacity: 1, y: 0 }}>
                <Card className="h-full border-0 bg-gradient-to-br from-white to-secondary/60 shadow-soft">
                  <CardContent className="p-5 sm:p-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft sm:h-14 sm:w-14"><Icon className="h-5 w-5 sm:h-6 sm:w-6" /></div>
                    <h3 className="mt-4 text-xl font-semibold sm:text-2xl">{amenity.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{amenity.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}