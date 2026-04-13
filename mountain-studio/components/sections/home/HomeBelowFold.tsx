"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Star } from "lucide-react";
import { activities, amenities, bookingEngineUrl, rooms, testimonials, imageSet, studioGallery } from "@/lib/data";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { RoomCard } from "@/components/sections/RoomCard";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { useRef } from "react";

function StatItem({
  label,
  target,
  suffix = ""
}: {
  label: string;
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewAnimation(ref);
  const count = useCountUp(target, 1300, inView);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl text-gold-light sm:text-5xl">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-sm uppercase tracking-[0.3em] text-ivory/55">{label}</div>
    </div>
  );
}

export default function HomeBelowFold() {
  const marquee = [...testimonials, ...testimonials];

  return (
    <>
      <section className="section-space">
        <div className="container-shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="group relative overflow-hidden rounded-[32px]">
            <div className="absolute inset-3 rounded-[28px] border border-gold/40" />
            <Image
              src={imageSet.exterior}
              alt="Redwings Studio Goa property"
              width={900}
              height={1100}
              className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-[0.2]"
            />
          </div>
          <SectionReveal stagger={0.12}>
            <div className="eyebrow">Redwings Studio. Goa location. Direct booking support.</div>
            <h2 className="display-title">Studio apartment stays managed under the Redwings banner.</h2>
            <p className="max-w-xl text-lg leading-8 text-ivory/68">
              Redwings Studio brings together owner-managed room inventory, Goa location convenience,
              and a visual resort setting designed for short stays, family trips, and group reservations.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-8 text-ivory/68">
              With 10 rooms under the banner, direct phone support, and practical occupancy flexibility, the stay experience stays simple from enquiry to check-in.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LuxuryButton href="/about" label="Discover The Property" />
              <LuxuryButton href="/contact" label="Contact The Team" variant="ghost" className="border-gold/55" />
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Property Overview"
            title="Redwings Studio is built for clear, direct, comfortable Goa stays."
            description="The property combines studio , owner-managed support, and a location that works well for couples, families, and small groups looking to stay in  Goa."
          />
          <div className="mt-10 flex flex-wrap gap-4">
            <LuxuryButton href="/contact" label="Call Or Email" />
            <LuxuryButton href={bookingEngineUrl} label="Reserve Your Stay" variant="ghost" className="border-gold/55" />
            <LuxuryButton href="/gallery" label="View More Images" variant="ghost" className="border-gold/55" />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["10 Rooms", "5 owner rooms plus 5 partner-owner rooms ready under the same banner."],
            // ["Arpora, Goa", "Located at Abalone Resort in a stay-friendly North Goa zone."],
            ["1 PM / 11 AM", "Clear check-in and check-out timing for simpler guest planning."],
            ["20 + 10", "Comfortable occupancy for 20 couples plus 10 additional beds."]
          ].map(([title, body]) => (
            <article key={title} className="rounded-[28px] border border-gold/16 bg-dark-2 p-6">
              <h3 className="font-display text-4xl">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-ivory/64">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Stay"
            title="Studios and stay options selected from the Redwings Studio inventory."
            description="Browse the stay mix, interior styling, and room options used across the Redwings Studio booking lineup."
          />
          <SectionReveal className="mt-12 grid gap-8 lg:grid-cols-3" stagger={0.15} direction="right">
            {rooms.slice(0, 3).map((room) => (
              <RoomCard key={room.slug} room={room} />
            ))}
          </SectionReveal>
        </div>
      </section>

      <section className="section-space clip-diagonal bg-[linear-gradient(135deg,rgba(201,168,76,0.08),transparent_38%),var(--dark)]">
        <div className="container-shell grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <StatItem label="Rooms" target={10} />
          <StatItem label="Extra Beds" target={10} />
          <StatItem label="Goa Location" target={1} />
          <StatItem label="Guest Satisfaction" target={98} suffix="%" />
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Stay Highlights"
            title="Spaces that support Goa stays, group bookings, and a smooth on-property experience."
            description="From common areas to leisure corners and resort surroundings, the property is presented as a clear, image-led stay destination."
          />
          <SectionReveal className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3" stagger={0.12}>
            {amenities.slice(0, 6).map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.slug}
                  className="rounded-[28px] border border-gold/15 bg-dark-2 p-8 transition duration-300 hover:-translate-y-1 hover:shadow-glow"
                >
                  <Icon className="mb-6 text-gold" size={34} />
                  <h3 className="font-display text-3xl">{item.title}</h3>
                  <p className="mt-4 text-base leading-7 text-ivory/65">{item.description}</p>
                  <p className="mt-5 text-xs uppercase tracking-[0.3em] text-gold-light">{item.hours}</p>
                </article>
              );
            })}
          </SectionReveal>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Property Highlights"
            title="A clearer look at the property, the poolside setting, and the stay interiors."
            description="These views show how Redwings Studio feels on arrival, around the common areas, and inside the room experience."
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {[
              { image: imageSet.homeHero, title: "Arrival View", body: "The main Redwings Studio frontage and first impression of the property." },
              { image: imageSet.exterior, title: "Poolside Setting", body: "Open-air resort surroundings with a relaxed Goa stay atmosphere." },
              { image: imageSet.ballroom, title: "Studio Interiors", body: "Warm room styling designed for comfortable short stays and group bookings." }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="group relative min-h-[420px] overflow-hidden rounded-[30px]"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.8, delay: index * 0.12 }}
              >
                <motion.div
                  className="absolute inset-0"
                  whileInView={{ y: [40 - index * 12, -20 + index * 18] }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4 }}
                >
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="33vw" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
                <div className="absolute inset-x-6 bottom-6">
                  <div className="eyebrow">Panel 0{index + 1}</div>
                  <h3 className="font-display text-4xl">{item.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-ivory/74">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Plan Your Stay"
            title="Browse the key parts of Redwings Studio before you book."
            description="Move through the most useful pages for rooms, property visuals, activities, and direct booking contact."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              { title: "Rooms & Stay", href: "/rooms", image: imageSet.roomOne, text: "See the Redwings Studio room mix, stay styling, and booking-ready accommodation options." },
              { title: "Property Gallery", href: "/gallery", image: imageSet.exterior, text: "Explore more images of the poolside view, exteriors, interiors, and the full property atmosphere." },
              { title: "Direct Contact", href: "/contact", image: imageSet.ballroom, text: "Review check-in details, room count, phone numbers, email support, and the full Goa address." }
            ].map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className="group overflow-hidden rounded-[30px] border border-gold/16 bg-dark-2"
                style={{ animation: `fadeup 0.8s ${index * 0.1}s both` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-4xl">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-ivory/64">{item.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space overflow-hidden">
        <div className="container-shell mb-10">
          <SectionHeading
            eyebrow="Testimonials"
            title="A chorus of stays remembered long after checkout."
            description="Guest voices that reflect comfort, easy coordination, and the visual appeal of the property."
          />
        </div>
        <motion.div
          className="flex gap-6 px-5 sm:px-8 lg:px-12"
          drag="x"
          dragConstraints={{ left: -1200, right: 0 }}
          whileHover={{ animationPlayState: "paused" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {marquee.map((item, index) => (
            <article
              key={`${item.name}-${index}`}
              className="min-w-[340px] max-w-[340px] rounded-[28px] border border-gold/15 bg-dark-2 p-7"
            >
              <div className="mb-5 flex gap-1 text-gold">
                {Array.from({ length: item.rating }).map((_, starIndex) => (
                  <Star key={starIndex} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-base leading-8 text-ivory/72">{item.quote}</p>
              <div className="mt-6 text-sm uppercase tracking-[0.28em] text-ivory/55">
                {item.name} Â· {item.flag} {item.country}
              </div>
            </article>
          ))}
        </motion.div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell">
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Instagram"
              title="A mosaic of stays, interiors, and Goa resort views."
              description="Browse more Redwings Studio imagery across rooms, common areas, and the surrounding property atmosphere."
            />
            <LuxuryButton href="/gallery" label="View Gallery" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
            {studioGallery.slice(0, 8).map((item, index) => (
                <div
                  key={`${item.image}-${index}`}
                  className={`group relative overflow-hidden rounded-[24px] ${index === 0 ? "md:col-span-2 md:row-span-2 min-h-[420px]" : "min-h-[200px]"}`}
                >
                  <Image src={item.image} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/35 opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                    <Instagram className="text-gold" size={24} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="section-space relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.12),transparent_52%)]" />
        {Array.from({ length: 40 }).map((_, index) => (
          <span
            key={index}
            className="absolute h-1.5 w-1.5 rounded-full bg-gold/65"
            style={{
              top: `${(index * 17) % 100}%`,
              left: `${(index * 11) % 100}%`,
              animation: `floatin ${4 + (index % 5)}s ease-in-out ${index * 0.1}s infinite`
            }}
          />
        ))}
        <div className="container-shell relative text-center">
          <p className="eyebrow">Reserve Your Dates</p>
          <h2 className="display-title mx-auto max-w-4xl text-balance">
            Reserve your Redwings Studio stay in Goa with direct booking support.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ivory/68">
            From couples and families to small groups, the property keeps room planning, check-in timing, and contact support straightforward.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <LuxuryButton href="/contact" label="Contact The Team" className="px-8 py-4" />
            <LuxuryButton href={bookingEngineUrl} label="Check Availability" variant="ghost" className="border-gold/55 px-8 py-4" />
          </div>
        </div>
      </section>
    </>
  );
}


