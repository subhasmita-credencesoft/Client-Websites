"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { hotelInfo } from "@/data/hotel";
import { SECTION_IDS } from "@/lib/constants";

const contactCards = [
  {
    title: "Call",
    value: hotelInfo.contactPhone,
    description: "Connect directly for room availability, stay details, and booking support.",
    href: `tel:${hotelInfo.contactPhone.replace(/\s+/g, "")}`,
    icon: Phone,
  },
  {
    title: "Email",
    value: hotelInfo.contactEmail,
    description: "Share your travel plans, arrival details, and special requirements.",
    href: `mailto:${hotelInfo.contactEmail}`,
    icon: Mail,
  },
  {
    title: "Location",
    value: "Jaipur, Rajasthan",
    description: "Easy access with direct map guidance to the hotel location.",
    href: hotelInfo.directionsUrl,
    icon: MapPin,
  },
  {
    title: "WhatsApp",
    value: hotelInfo.whatsApp,
    description: "Send a quick WhatsApp message for direct stay and booking queries.",
    href: `https://wa.me/91${hotelInfo.whatsApp}`,
    icon: MessageCircle,
  },
];

export function ContactSection() {
  return (
    <section className="section-shell bg-[linear-gradient(180deg,rgba(249,245,240,0.72),rgba(255,255,255,1))]" id={SECTION_IDS.contact}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <motion.div
            className="flex flex-col justify-between gap-8"
            initial={{ opacity: 0, x: -24, y: 20 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
          >
            <div className="space-y-6">
              <SectionHeading
                description="A more refined contact experience focused on direct communication, location access, and personalized stay assistance."
                eyebrow="Contact & Assistance"
                title="Reach us directly for a smoother and more premium stay experience"
              />

              <div className="rounded-[2rem] border border-border/60 bg-white/80 p-6 shadow-[0_20px_55px_rgba(28,25,23,0.06)] backdrop-blur-sm sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">Why Contact Directly</p>
                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-lg font-semibold text-stone-900">Faster reservation support</p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      Get quick help for room selection, availability, and travel planning without filling a long form.
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-stone-900">Personalized assistance</p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      Discuss family stays, business visits, check-in timing, or arrival preferences in a more direct way.
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-stone-900">Easy location access</p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      Reach the property quickly with direct call and directions support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24, y: 20 }}
            transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
          >
            <Card className="overflow-hidden rounded-[2rem] border-border/60 bg-white/92 shadow-[0_28px_70px_rgba(28,25,23,0.1)]">
              <CardContent className="p-6 sm:p-8">
                <div className="rounded-[1.8rem] bg-[linear-gradient(135deg,rgba(250,245,237,0.95),rgba(255,255,255,1))] p-6 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">Contact Details</p>
                  <h3 className="mt-3 font-display text-3xl font-semibold text-stone-900 sm:text-4xl">Direct hospitality support</h3>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                    Choose the most convenient way to connect with our team for reservations, travel planning, and location assistance.
                  </p>
                </div>

                <div className="mt-6 grid gap-4">
                  {contactCards.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link key={item.title} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined}>
                        <div className="rounded-[1.6rem] border border-border/60 bg-white px-5 py-5 transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_18px_38px_rgba(28,25,23,0.08)] sm:px-6">
                          <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary/70">{item.title}</p>
                              <p className="mt-2 text-xl font-semibold text-stone-900">{item.value}</p>
                              <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-[1.8rem] bg-stone-950 px-6 py-6 text-white sm:px-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/55">Property Address</p>
                  <p className="mt-4 text-lg font-medium leading-8 text-white/92">{hotelInfo.address}</p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button asChild className="h-12 rounded-xl bg-[#c79a5b] px-6 text-base font-semibold text-white hover:bg-[#b88b4f]">
                      <Link href={hotelInfo.directionsUrl} target="_blank">
                        Get Directions
                      </Link>
                    </Button>
                    <Button asChild className="h-12 rounded-xl border-white/20 bg-white/10 px-6 text-base font-semibold text-white hover:bg-white/16" variant="outline">
                      <Link href={`https://wa.me/91${hotelInfo.whatsApp}`} target="_blank">
                        WhatsApp Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
