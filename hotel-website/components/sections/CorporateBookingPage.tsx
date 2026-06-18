"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "./PageHero";
import Container from "../ui/Container";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────── DATA ─────────────────────────── */

const HIGHLIGHTS = [
  {
    title: "Conference & Meeting Spaces",
    description:
      "Conference halls, banquet spaces, and lawns support presentations, training sessions, day conferences, launches, and business events — all in one property.",
  },
  {
    title: "Block Accommodation for Your Team",
    description:
      "Book rooms for your entire group in one venue with meals, stay coordination, and seamless group logistics during planning.",
  },
  {
    title: "Team Building & Downtime",
    description:
      "Between sessions, teams can use the pool, lawns, Water Fun & Play, and activity zones for unstructured time that actually builds teams.",
  },
];

const STATS = [
  { value: "Corporate", label: "Conferences, offsites & training programs" },
  { value: "Retreat + Stay", label: "Rooms, meals & activities in one venue" },
  { value: "Direct", label: "WhatsApp or call for a fast quote" },
];

const VENUE_CAPACITIES = [
  { name: "Utsav Banquet", capacity: "250 Guests", area: "2500 sq ft", feature: "AC" },
  { name: "Utsav Lawn", capacity: "400 Guests", area: "5000 sq ft", feature: null },
  { name: "Sanskriti Banquet", capacity: "40 Guests", area: "1200 sq ft", feature: "AC" },
  { name: "Sanskriti Lawn", capacity: "200 Guests", area: "2500 sq ft", feature: null },
  { name: "Pool Side Lawns", capacity: "200 Guests", area: "1500 sq ft", feature: null },
  { name: "Lounge", capacity: "40 Guests", area: "600 sq ft", feature: null },
];

const PACKAGES = [
  {
    tag: "Senior Management",
    name: "Leadership Retreat",
    description:
      "Focused environment for strategy planning, decision-making, and executive stays away from everyday distractions.",
    includes: ["Premium Rooms", "Private Meeting Space", "Curated Dining", "Dedicated Coordinator"],
    accent: "#c67a3a",
  },
  {
    tag: "Departments & Teams",
    name: "Team Offsite",
    description:
      "A balanced mix of productive work sessions and team-building activities designed to re-energise your team.",
    includes: ["Group Accommodation", "All Meals", "Activity Zones", "Flexible Schedule"],
    accent: "#1f3c44",
  },
  {
    tag: "Large Corporate Groups",
    name: "Conference / Event",
    description:
      "Ideal for seminars, product launches, training days, and large-scale business events with full venue support.",
    includes: ["Event Space", "Guest Management", "Food Service", "Custom Setup"],
    accent: "#c67a3a",
  },
];

const TIMELINE = [
  {
    time: "10:00 AM",
    title: "Arrival & Check-In",
    description: "Teams arrive, settle into rooms, and receive their day briefing from the coordination team.",
  },
  {
    time: "11:30 AM",
    title: "Meetings & Sessions",
    description: "Conference rooms and event spaces support presentations, workshops, and focused discussions.",
  },
  {
    time: "02:00 PM",
    title: "Lunch & Networking",
    description: "Buffet meals offer a natural break for relaxation, connection, and informal team conversations.",
  },
  {
    time: "05:00 PM",
    title: "Team Activities",
    description: "Outdoor games, recreational zones, and bonding activities close out the structured day.",
  },
];

const FEATURES = [
  {
    title: "Conference Facilities",
    description:
      "Spacious, well-equipped halls for meetings, presentations, and training sessions — fully supported by our on-site team.",
    image: "https://bookonelocal.in/cdn/conference3-1.jpg",
  },
  {
    title: "Team Building Activities",
    description:
      "Structured and informal activities designed to improve collaboration, morale, and team bonding beyond the boardroom.",
    image: "https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif",
  },
  {
    title: "Dining & Catering",
    description:
      "Buffet and customised meal options carefully curated to match corporate schedules and dietary preferences.",
    image: "din3.avif",
  },
];

const GALLERY_IMAGES = [
  { src: "https://bookonelocal.in/cdn/uks-exterior-1.jpg", alt: "UK's Resort exterior" },
  { src: "https://bookonelocal.in/cdn/conference3-1.jpg", alt: "Conference hall" },
  { src: "https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif", alt: "Outdoor lawns" },
  { src: "/sports1.avif", alt: "Resort grounds" },
];

/* ─────────────────────────── COMPONENT ─────────────────────── */

export default function CorporateBookingPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".corp-section").forEach((section) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: section, start: "top 82%", once: true },
          });
          tl.fromTo(
            section.querySelectorAll(".corp-kicker"),
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out", stagger: 0.05 }
          )
            .fromTo(
              section.querySelectorAll(".corp-title"),
              { yPercent: 110, autoAlpha: 0 },
              { yPercent: 0, autoAlpha: 1, duration: 0.85, ease: "power4.out" },
              "<+0.05"
            )
            .fromTo(
              section.querySelectorAll(".corp-copy"),
              { y: 18, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.58, ease: "power3.out", stagger: 0.06 },
              "<+0.08"
            )
            .fromTo(
              section.querySelectorAll(".corp-card"),
              { y: 24, rotateX: 6, transformPerspective: 1200, autoAlpha: 0 },
              { y: 0, rotateX: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out", stagger: 0.08 },
              "<+0.05"
            );
        });

        gsap.utils.toArray<HTMLElement>(".corp-parallax").forEach((el) => {
          gsap.to(el, {
            yPercent: -6,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 },
          });
        });
      }, rootRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* ── HERO ── */}
      <PageHero
        title="Corporate Booking"
        subtitle="Plan corporate stays, team offsites, conferences, and business gatherings at UK's Resort with comfort, space, and direct enquiry support."
        backgroundImage="https://bookonelocal.in/cdn/uks-exterior-1.jpg"
        backgroundVideo="https://bookonelocal.in/cdn/Corporate-Page-VIdeo.mp4"
        breadcrumb="Home / Corporate"
      />

      {/* ── INTRO ── */}
      <section className="corp-section bg-[#f7f3ec] py-16 sm:py-20 md:py-24">
        <Container>

          {/* ── Top: eyebrow + full-width title + copy ── */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="corp-kicker text-[0.68rem] font-bold uppercase tracking-[0.42em] text-[#c67a3a]">
              Business Stays
            </p>
            <div className="overflow-hidden mt-4">
              <h2 className="corp-title font-serif text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.93] text-[#1f3c44]">
                Seamless Corporate<br className="hidden sm:block" /> Offsites and Conferences.
              </h2>
            </div>
            <p className="corp-copy mt-6 mx-auto max-w-2xl text-[1.02rem] leading-8 text-[#1f3c44]/65">
              UK&apos;s Resort has hosted corporate groups from Mumbai, Pune, and across Maharashtra for over a decade —
              from leadership retreats to large team conferences. Comfortable accommodation, event-ready spaces,
              delicious food, and space for your team to actually decompress.
            </p>
          </div>

          {/* ── Stats row ── */}
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                ),
                value: "Corporate",
                label: "Conferences, offsites & training programs",
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                ),
                value: "Retreat + Stay",
                label: "Rooms, meals & activities in one venue",
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                ),
                value: "Direct",
                label: "WhatsApp or call for a fast quote",
              },
            ].map((item, i) => (
              <div
                key={item.value}
                className="corp-card group flex items-start gap-4 rounded-[1.6rem] border border-[#1f3c44]/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1f3c44] text-[#c67a3a] shadow-sm">
                  {item.icon}
                </span>
                <div>
                  <p className="font-serif text-[1.55rem] leading-none text-[#1f3c44]">{item.value}</p>
                  <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#1f3c44]/50 leading-snug">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Highlights grid ── */}
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {HIGHLIGHTS.map((item, i) => (
              <article
                key={item.title}
                className="corp-card group relative overflow-hidden rounded-[1.8rem] border border-[#1f3c44]/8 bg-[#1f3c44] p-7 shadow-sm"
              >
                {/* Radial accent glow */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(198,122,58,0.25)_0%,transparent_70%)]" />
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.32em] text-[#c67a3a]">
                  0{i + 1}
                </p>
                <h3 className="mt-4 font-serif text-[1.55rem] leading-tight text-white">{item.title}</h3>
                <div className="mt-3 h-px w-10 bg-gradient-to-r from-[#c67a3a] to-transparent" />
                <p className="mt-4 text-sm leading-7 text-white/60">{item.description}</p>
              </article>
            ))}
          </div>

        </Container>
      </section>


      {/* ── GALLERY STRIP ── */}
      <section className="corp-section overflow-hidden bg-[#1f3c44] py-5">
        <div className="flex gap-4 overflow-x-auto px-6 pb-2 lg:overflow-visible lg:gap-5 lg:px-0 lg:grid lg:grid-cols-4">
          {GALLERY_IMAGES.map((img) => (
            <div
              key={img.alt}
              className="corp-card group relative h-56 min-w-[18rem] flex-shrink-0 overflow-hidden rounded-2xl lg:min-w-0 lg:h-64"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1023px) 320px, 25vw"
                className="corp-parallax object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f2229]/60 to-transparent" />
              <p className="absolute bottom-4 left-5 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-white/70">
                {img.alt}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── VENUE CAPACITIES ── */}
      <section className="corp-section bg-[#f7f3ec] py-16 sm:py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <p className="corp-kicker text-[0.68rem] font-bold uppercase tracking-[0.38em] text-[#c67a3a]">
              Venue Capacities
            </p>
            <div className="overflow-hidden mt-4">
              <h2 className="corp-title font-serif text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.96] text-[#1f3c44]">
                Spaces for Every Gathering
              </h2>
            </div>
            <p className="corp-copy mt-5 text-[1rem] leading-8 text-[#1f3c44]/65">
              From intimate boardroom sessions to large conference events — we have a space that fits.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VENUE_CAPACITIES.map((venue) => (
              <article
                key={venue.name}
                className="corp-card group relative overflow-hidden rounded-[1.8rem] border border-[#1f3c44]/10 bg-white p-7 text-center shadow-[0_12px_28px_rgba(31,60,68,0.06)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(31,60,68,0.10)]"
              >
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c67a3a]/10">
                  <svg className="h-5 w-5 text-[#c67a3a]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11" />
                  </svg>
                </div>
                <h3 className="font-serif text-[1.55rem] leading-tight text-[#1f3c44]">{venue.name}</h3>
                <p className="mt-3 text-[1.3rem] font-bold text-[#c67a3a]">{venue.capacity}</p>
                <p className="mt-1 text-sm text-[#1f3c44]/55">{venue.area}</p>
                {venue.feature && (
                  <span className="mt-3 inline-block rounded-full bg-[#1f3c44]/8 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#1f3c44]">
                    {venue.feature}
                  </span>
                )}
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── PACKAGES ── */}
      {/* Commented out as per request
      <section className="corp-section bg-[#1f3c44] py-16 sm:py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <p className="corp-kicker text-[0.68rem] font-bold uppercase tracking-[0.38em] text-[#c67a3a]">
              Corporate Packages
            </p>
            <div className="overflow-hidden mt-4">
              <h2 className="corp-title font-serif text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.96] text-white">
                Corporate formats designed for different business needs.
              </h2>
            </div>
            <p className="corp-copy mt-5 text-[1rem] leading-8 text-white/60">
              Choose the format that matches your team size, objective, and schedule.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {PACKAGES.map((pkg, i) => (
              <article
                key={pkg.name}
                className="corp-card group flex flex-col overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/8 p-7 transition hover:bg-white/12 hover:border-white/18"
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-[#c67a3a]">{pkg.tag}</p>
                <h3 className="mt-4 font-serif text-[2rem] leading-[0.96] text-white">{pkg.name}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-white/60">{pkg.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {pkg.includes.map((point) => (
                    <span
                      key={point}
                      className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/70"
                    >
                      {point}
                    </span>
                  ))}
                </div>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-[#c67a3a]/60 to-transparent" />
                <p className="mt-4 text-[0.64rem] font-bold uppercase tracking-[0.24em] text-[#c67a3a]">
                  Package 0{i + 1}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      */}

      {/* ── EXPERIENCE FLOW / TIMELINE ── */}
      <section className="corp-section bg-[#f7f3ec] py-16 sm:py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <p className="corp-kicker text-[0.68rem] font-bold uppercase tracking-[0.38em] text-[#c67a3a]">
              Corporate Flow
            </p>
            <div className="overflow-hidden mt-4">
              <h2 className="corp-title font-serif text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.96] text-[#1f3c44]">
                A structured corporate stay experience.
              </h2>
            </div>
            <p className="corp-copy mt-5 text-[1rem] leading-8 text-[#1f3c44]/65">
              From arrival to wrap-up, every stage is designed for smooth coordination and productivity.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-4">
            {TIMELINE.map((step, i) => (
              <article
                key={step.time}
                className="corp-card relative overflow-hidden rounded-[1.8rem] border border-[#1f3c44]/10 bg-white p-6 sm:p-7 shadow-sm"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(198,122,58,0.12)_0%,transparent_70%)]" />
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-[#c67a3a]">
                  Stop 0{i + 1}
                </p>
                <h3 className="mt-3 font-serif text-[1.9rem] leading-none text-[#1f3c44]">{step.time}</h3>
                <p className="mt-4 text-[0.96rem] font-semibold leading-6 text-[#1f3c44]">{step.title}</p>
                <p className="mt-3 text-sm leading-7 text-[#1f3c44]/60">{step.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FEATURES / ACTIVITY SHOWCASE ── */}
      <section className="corp-section bg-white py-16 sm:py-20 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            {/* Sticky left */}
            <div className="lg:sticky lg:top-28">
              <p className="corp-kicker text-[0.68rem] font-bold uppercase tracking-[0.38em] text-[#c67a3a]">
                Corporate Features
              </p>
              <div className="overflow-hidden mt-4">
                <h2 className="corp-title font-serif text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.96] text-[#1f3c44]">
                  Everything needed for a successful corporate event.
                </h2>
              </div>
              <p className="corp-copy mt-5 max-w-md text-[1rem] leading-8 text-[#1f3c44]/65">
                A mix of professional infrastructure and leisure options ensures a balanced and memorable corporate
                experience.
              </p>
              <Link
                href="https://wa.me/919822012343?text=Hi%2C%20I%20want%20to%20plan%20a%20corporate%20event%20at%20UK%27s%20Resort.%20Please%20share%20package%20details."
                target="_blank"
                rel="noreferrer"
                className="corp-copy mt-8 inline-flex min-h-[3rem] items-center gap-2 rounded-full bg-[#1f3c44] px-7 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#c67a3a]"
              >
                WhatsApp to Enquire ›
              </Link>
            </div>

            {/* Right – feature list */}
            <div className="grid gap-10">
              {FEATURES.map((item, i) => (
                <article
                  key={item.title}
                  className={`corp-card group grid gap-6 border-b border-[#1f3c44]/8 pb-10 last:border-b-0 last:pb-0 lg:grid-cols-[1fr_1.15fr] lg:items-center ${i % 2 === 1 ? "lg:grid-cols-[1.15fr_1fr]" : ""}`}
                >
                  <div className={`relative min-h-[17rem] overflow-hidden rounded-[1.8rem] lg:min-h-[20rem] ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1023px) 100vw, 460px"
                      className="corp-parallax object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1f3c44]/25 via-transparent to-transparent" />
                  </div>
                  <div className={`flex flex-col justify-center px-1 lg:px-3 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.26em] text-[#c67a3a]">
                      Business Use 0{i + 1}
                    </p>
                    <h3 className="mt-4 font-serif text-[clamp(1.85rem,3vw,2.5rem)] leading-[0.97] text-[#1f3c44]">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#1f3c44]/65">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── PLANNING / CONTACT ── */}
      <section className="corp-section bg-[#f7f3ec] py-16 sm:py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Image */}
          <div className="corp-card overflow-hidden rounded-[2rem]">
            <div
              className="corp-parallax min-h-[24rem] bg-cover bg-center sm:min-h-[28rem]"
              style={{ backgroundImage: `url("https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif")` }}
            />
          </div>

          {/* Text */}
          <div className="corp-card rounded-[1.8rem] border border-[#1f3c44]/10 bg-[linear-gradient(180deg,#ffffff_0%,#f5f0e8_100%)] p-7 sm:p-9 shadow-sm">
            <p className="corp-kicker text-[0.68rem] font-bold uppercase tracking-[0.38em] text-[#c67a3a]">Planning</p>
            <div className="overflow-hidden mt-4">
              <h2 className="corp-title font-serif text-[clamp(2.1rem,3.8vw,3.4rem)] leading-[0.98] text-[#1f3c44]">
                Tell us about your event.
              </h2>
            </div>
            <p className="corp-copy mt-5 text-[1rem] leading-8 text-[#1f3c44]/70">
              Share your group size, preferred dates, and the type of event. We&apos;ll send you a tailored package with
              pricing within a few hours. No forms, no waiting — just WhatsApp or call.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="https://wa.me/919822012343?text=Hi%2C%20I%20want%20to%20plan%20a%20corporate%20event%20at%20UK%27s%20Resort.%20Please%20share%20package%20details."
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[3rem] items-center gap-2 rounded-full bg-[#1f3c44] px-7 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#c67a3a]"
              >
                WhatsApp to Enquire ›
              </Link>
              <Link
                href="mailto:info@uksresort.com"
                className="inline-flex min-h-[3rem] items-center gap-2 rounded-full border border-[#1f3c44]/20 bg-transparent px-7 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[#1f3c44] transition hover:bg-[#1f3c44]/5"
              >
                Email Us
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="corp-section bg-[#1f3c44] py-16 sm:py-20 md:py-24">
        <Container className="max-w-5xl">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 shadow-[0_24px_70px_rgba(10,30,40,0.35)]">
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src="https://bookonelocal.in/cdn/uks-exterior-1.jpg"
                alt="UK's Resort Corporate Event"
                fill
                sizes="100vw"
                className="object-cover object-center"
                unoptimized
              />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(20,59,71,0.88)_0%,rgba(31,77,89,0.78)_50%,rgba(198,122,58,0.30)_140%)]" />
            </div>

            {/* Content */}
            <div className="relative z-10 px-7 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-16">
              <p className="corp-kicker text-[0.7rem] font-bold uppercase tracking-[0.36em] text-white/60">
                Enquire Now
              </p>
              <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                <div>
                  <div className="overflow-hidden">
                    <h2 className="corp-title font-serif text-[clamp(2.2rem,4vw,3.9rem)] leading-[0.94] text-white">
                      Tell us about your event.
                    </h2>
                  </div>
                  <p className="corp-copy mt-5 max-w-2xl text-[1rem] leading-8 text-white/70">
                    Share your group size, preferred dates, and event type. We&apos;ll send a tailored package and
                    pricing within a few hours.
                  </p>
                </div>
                <div className="flex flex-wrap items-end gap-3 lg:justify-end">
                  <Link
                    href="https://wa.me/919822012343?text=Hi%2C%20I%20want%20to%20plan%20a%20corporate%20event%20at%20UK%27s%20Resort.%20Please%20share%20package%20details."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full bg-[#c49a3c] px-8 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[#143b47] shadow-[0_10px_26px_rgba(196,154,60,0.32)] transition hover:bg-[#d1ab58]"
                  >
                    WhatsApp to Enquire ›
                  </Link>
                  <Link
                    href="mailto:info@uksresort.com"
                    className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white/18"
                  >
                    Email Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
