"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Coffee, Ticket, UtensilsCrossed } from "lucide-react";
import { usePropertyData } from "../providers/PropertyDataProvider";
import Container from "../ui/Container";
import {
  TARIFF_CHECKIN_TIME,
  TARIFF_CHECKOUT_TIME,
  TARIFF_DAY_PICNIC_FOOTNOTE,
  TARIFF_DAY_PICNIC_HIGHLIGHT,
  TARIFF_DAY_PICNIC_MIN_PAX,
  TARIFF_DAY_PICNIC_RATE,
  TARIFF_DAY_PICNIC_TITLE,
  TARIFF_DAY_PICNIC_WASH_ROOM,
  TARIFF_FALLBACK_ROWS,
  TARIFF_GROUP_PACKAGE_ALL_DAYS_HEADER,
  TARIFF_GROUP_PACKAGE_OCCUPANCY_HEADER,
  TARIFF_GROUP_PACKAGE_ROWS,
  TARIFF_GROUP_PACKAGE_TITLE_LINES,
  TARIFF_INTRO_TEXT,
  TARIFF_MAIN_TABLE_PLAN_HEADER,
  TARIFF_MAIN_TABLE_ROOM_TYPE_HEADER,
  TARIFF_MAIN_TABLE_TITLE,
  TARIFF_PICNIC_MENU,
  type TariffRow,
} from "@/data/sections/tariffInfo";

gsap.registerPlugin(ScrollTrigger);

const BOOKING_ENGINE_URL = "https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true";

const dayPicnicFeatureCards = [
  {
    icon: Ticket,
    title: "Access Included",
    copy: "Includes Big Water Park, Rain Dance, Indoor Games, Outdoor Games (Cricket, Football) & Kids Play Park.",
  },
  {
    icon: UtensilsCrossed,
    title: "Meals Covered",
    copy: "Breakfast, Lunch & Hi Tea as per the detailed menu below. Any dish outside this menu will be charged extra.",
  },
  {
    icon: Coffee,
    title: "Wash & Change Room",
    copy: "Room for Wash & Change available at ₹ 4,000 per room per day.",
  },
] as const;

type DayPicnicCardTitle = (typeof dayPicnicFeatureCards)[number]["title"];

export default function TariffInfo() {
  // property data kept for future use; tariff rows are static
  usePropertyData();

  const sectionRef = useRef<HTMLElement | null>(null);
  const [expandedCard, setExpandedCard] = useState<DayPicnicCardTitle | "">(
    dayPicnicFeatureCards[0].title,
  );

  // Static tariff rows — correct rates defined in data/sections/tariffInfo.ts
  const roomTariffRows = TARIFF_FALLBACK_ROWS;

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });

        introTl
          .fromTo(
            ".tariff-intro",
            { y: 14, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out", stagger: 0.06 },
          )
          .fromTo(
            ".tariff-hero-card",
            { y: 28, autoAlpha: 0, scale: 0.985 },
            { y: 0, autoAlpha: 1, scale: 1, duration: 0.78, ease: "power3.out", stagger: 0.08 },
            "<+0.1",
          )
          .fromTo(
            ".tariff-table-wrap",
            { y: 24, autoAlpha: 0, scale: 0.99 },
            { y: 0, autoAlpha: 1, scale: 1, duration: 0.78, ease: "power3.out", stagger: 0.08 },
            "<+0.08",
          )
          .fromTo(
            ".tariff-detail",
            { y: 18, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.62, ease: "power3.out", stagger: 0.08 },
            "<+0.06",
          );

        gsap.fromTo(
          ".tariff-row",
          { y: 8, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.46,
            ease: "power3.out",
            stagger: 0.03,
            scrollTrigger: {
              trigger: ".tariff-table-wrap",
              start: "top 86%",
              once: true,
            },
          },
        );

        gsap.to(".tariff-hero-accent", {
          y: -10,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.16,
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-no-global-gsap
      className="relative overflow-hidden bg-[#F5F0E8] py-14 text-[#0D2B2F] sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(196,154,60,0.10) 0%, transparent 30%), radial-gradient(circle at 82% 88%, rgba(13,43,47,0.07) 0%, transparent 28%)",
        }}
      />

      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="tariff-hero-card rounded-[2rem] border border-[rgba(13,43,47,0.10)] bg-white px-7 py-8 shadow-[0_22px_54px_rgba(13,43,47,0.08)] sm:px-10 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(16rem,0.95fr)] lg:items-start">
              <div>
                <p className="tariff-intro text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#C49A3C]">
                  Tariff & Stay Details
                </p>

                <h2 className="tariff-intro mt-5 max-w-[12ch] font-serif text-[2.35rem] leading-[0.94] text-[#0D2B2F] sm:text-[3.3rem]">
                  Clear pricing for stays, groups, and day outings.
                </h2>

                <p className="tariff-intro mt-5 max-w-3xl text-[0.98rem] leading-8 text-[#2C4A50]">
                  {TARIFF_INTRO_TEXT}
                </p>
              </div>

              <div className="tariff-intro rounded-[1.7rem] border border-[rgba(13,43,47,0.10)] bg-[#F9F5EE] p-5 sm:p-6 lg:sticky lg:top-28">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#C49A3C]">
                  Quick Stay Summary
                </p>

                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl border border-[rgba(13,43,47,0.08)] bg-white px-4 py-3.5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#6C7C80]">
                      Check-in
                    </p>
                    <p className="mt-1 font-serif text-[1.45rem] leading-none text-[#0D2B2F]">
                      {TARIFF_CHECKIN_TIME}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[rgba(13,43,47,0.08)] bg-white px-4 py-3.5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#6C7C80]">
                      Check-out
                    </p>
                    <p className="mt-1 font-serif text-[1.45rem] leading-none text-[#0D2B2F]">
                      {TARIFF_CHECKOUT_TIME}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[rgba(13,43,47,0.08)] bg-white px-4 py-3.5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#6C7C80]">
                      Includes
                    </p>
                    <p className="mt-1 text-[0.95rem] leading-7 text-[#1A4A50]">
                      Breakfast-inclusive room plans
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <Link
                    href={BOOKING_ENGINE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#C49A3C] px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#0D2B2F] transition hover:bg-[#D4B05A]"
                  >
                    Check Availability
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <TariffTableBlock
            eyebrow="Room Tariff — Double Occupancy"
            title={TARIFF_MAIN_TABLE_TITLE}
            subtitle="Rates are per room on Double Occupancy, Breakfast included. Check-in: 1 PM | Check-out: 10 AM. GST applicable as per Government Regulations."
            headers={[TARIFF_MAIN_TABLE_ROOM_TYPE_HEADER, TARIFF_MAIN_TABLE_PLAN_HEADER]}
            rows={roomTariffRows}
            className="mt-10"
          />

          <TariffTableBlock
            eyebrow="Overnight Stay — Quotation"
            title={TARIFF_GROUP_PACKAGE_TITLE_LINES[0]}
            subtitle={`${TARIFF_GROUP_PACKAGE_TITLE_LINES[1]} · ${TARIFF_GROUP_PACKAGE_TITLE_LINES[2]} · ${TARIFF_GROUP_PACKAGE_TITLE_LINES[3]}`}
            headers={[TARIFF_GROUP_PACKAGE_OCCUPANCY_HEADER, TARIFF_GROUP_PACKAGE_ALL_DAYS_HEADER]}
            rows={TARIFF_GROUP_PACKAGE_ROWS}
            className="mt-10"
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="tariff-detail rounded-3xl border border-[rgba(13,43,47,0.10)] bg-white p-7 shadow-[0_22px_56px_rgba(13,43,47,0.07)] sm:p-9">
              {/* Header + Rate Badge */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-[#C49A3C]">One Day Picnic</p>
                  <h3 className="mt-2 font-serif text-3xl text-[#0D2B2F] sm:text-4xl">{TARIFF_DAY_PICNIC_TITLE}</h3>
                </div>
              </div>

              {/* Offer Card */}
              <div className="mt-6 rounded-2xl border-2 border-[#C49A3C]/30 bg-gradient-to-br from-[#FDF8EE] to-[#F9F5EE] p-6 text-center shadow-[0_12px_36px_rgba(196,154,60,0.20)]">
                <span className="inline-block rounded-full bg-[#0D2B2F] px-6 py-3 font-serif text-[1.6rem] font-semibold text-[#C49A3C] sm:text-[1.9rem]">
                  {TARIFF_DAY_PICNIC_RATE}
                </span>
                <p className="mt-8 text-[0.95rem] font-bold uppercase tracking-[0.22em] text-[#0D2B2F]">{TARIFF_DAY_PICNIC_MIN_PAX}</p>
                <a
                  href={BOOKING_ENGINE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#C49A3C] to-[#D4B05A] px-6 py-4 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0D2B2F] shadow-[0_8px_24px_rgba(196,154,60,0.35)] transition hover:from-[#D4B05A] hover:to-[#C49A3C] hover:shadow-[0_12px_32px_rgba(196,154,60,0.45)]"
                >
                  <span>Book Now &amp; Get 20% Discount</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0D2B2F]/10 text-xs">→</span>
                </a>
              </div>

              <p className="mt-6 text-[0.97rem] leading-7 text-[#1A4A50]">{TARIFF_DAY_PICNIC_HIGHLIGHT}</p>

              {/* Feature highlight cards */}
              <div className="mt-6 grid gap-3">
                {dayPicnicFeatureCards.map((item) => {
                  const Icon = item.icon;
                  const isExpanded = expandedCard === item.title;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setExpandedCard(isExpanded ? "" : item.title)}
                      className={[
                        "group w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300",
                        isExpanded
                          ? "border-[#C49A3C]/40 bg-[#10323a] text-white shadow-[0_16px_36px_rgba(13,43,47,0.20)]"
                          : "border-[rgba(13,43,47,0.10)] bg-[#F9F5EE] hover:border-[#C49A3C]/30 hover:bg-white hover:shadow-[0_10px_28px_rgba(13,43,47,0.07)]",
                      ].join(" ")}
                    >
                      <div className="flex items-start gap-4">
                        <div className={["flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300", isExpanded ? "bg-[#C49A3C] text-[#0D2B2F]" : "bg-[#1A4A50] text-white"].join(" ")}>
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className={["text-[0.97rem] font-semibold", isExpanded ? "text-white" : "text-[#0D2B2F]"].join(" ")}>{item.title}</h4>
                            <span className={["ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300", isExpanded ? "rotate-180 border-white/20 bg-white/10 text-white" : "border-[rgba(13,43,47,0.12)] bg-white text-[#1A4A50]"].join(" ")}>
                              <ChevronDown className="h-4 w-4" aria-hidden="true" />
                            </span>
                          </div>
                          <div className={["grid transition-all duration-300 ease-out", isExpanded ? "mt-2 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"].join(" ")}>
                            <div className="overflow-hidden">
                              <p className={["text-[0.93rem] leading-7", isExpanded ? "text-white/82" : "text-[#2C4A50]"].join(" ")}>{item.copy}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Full Picnic Menu */}
              <div className="mt-7 rounded-2xl border border-[rgba(13,43,47,0.10)] bg-[#F9F5EE] p-5 sm:p-6">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-[#C49A3C]">Full Menu Included</p>
                <div className="mt-4 grid gap-5 sm:grid-cols-3">
                  {(Object.values(TARIFF_PICNIC_MENU) as { label: string; items: readonly string[] }[]).map((course) => (
                    <div key={course.label}>
                      <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#0D2B2F]">{course.label}</p>
                      <ul className="space-y-1">
                        {course.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-[0.88rem] text-[#2C4A50]">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C49A3C]" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wash Room Charge */}
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#C49A3C]/30 bg-[#FDF8EE] px-5 py-3.5">
                <span className="text-[#C49A3C]" aria-hidden="true">🛁</span>
                <p className="text-[0.9rem] font-semibold text-[#1A4A50]">{TARIFF_DAY_PICNIC_WASH_ROOM}</p>
              </div>

              {/* Footnote */}
              <p className="mt-5 text-[0.88rem] leading-7 text-[#6C7C80]">{TARIFF_DAY_PICNIC_FOOTNOTE}</p>
            </div>

            <div className="tariff-detail relative overflow-hidden rounded-3xl border border-[#1A4A50]/12 bg-white p-7 text-[#0D2B2F] shadow-[0_22px_56px_rgba(13,43,47,0.07)] sm:p-9">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(196,154,60,0.10),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(13,43,47,0.05),transparent_28%)]" />

              <div className="relative z-10">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#C49A3C]">
                  Ready to book?
                </p>
                <h3 className="mt-4 font-serif text-[2rem] leading-[0.94] sm:text-[2.6rem]">
                  Choose the booking path that fits your visit.
                </h3>
                <p className="mt-5 max-w-2xl text-[0.96rem] leading-8 text-[#2C4A50]">
                  For room stays, use the live booking engine. For group packages, picnics, and corporate block bookings, contact the team directly for tailored pricing and availability.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <a
                    href={BOOKING_ENGINE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-2xl border border-[rgba(13,43,47,0.08)] bg-[#F9F5EE] p-4 transition hover:border-[#C49A3C]/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(13,43,47,0.10)]"
                  >
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.20em] text-[#6C7C80]">
                      Room stays
                    </p>
                    <p className="mt-2 font-serif text-[1.5rem] leading-none text-[#0D2B2F] transition-colors group-hover:text-[#C49A3C]">
                      Check live availability
                    </p>
                  </a>
                  <a
                    href="https://wa.me/918779814559?text=Hi%2C%20I%27m%20looking%20to%20book%20a%20group%20package%20at%20UK%27s%20Resort.%20Please%20share%20availability%20and%20pricing."
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-2xl border border-[rgba(13,43,47,0.08)] bg-[#F9F5EE] p-4 transition hover:border-[#C49A3C]/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(13,43,47,0.10)]"
                  >
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.20em] text-[#6C7C80]">
                      Groups
                    </p>
                    <p className="mt-2 font-serif text-[1.5rem] leading-none text-[#0D2B2F] transition-colors group-hover:text-[#C49A3C]">
                      WhatsApp your date and size
                    </p>
                  </a>
                </div>

                <div className="mt-8 rounded-2xl border border-[rgba(13,43,47,0.08)] bg-[#F9F5EE] p-4 transition hover:border-[#C49A3C]/30 hover:bg-white sm:p-5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.20em] text-[#6C7C80]">
                    Corporate enquiries
                  </p>
                  <p className="mt-2 text-[0.96rem] leading-7 text-[#1A4A50]">
                    Call or email for group block rates:{" "}
                    <a
                      href="tel:+918779814559"
                      className="font-semibold text-[#0D2B2F] underline decoration-[#C49A3C]/40 underline-offset-2 transition hover:text-[#C49A3C] hover:decoration-[#C49A3C]"
                    >
                      +91 87798 14559
                    </a>{" "}
                    or{" "}
                    <a
                      href="mailto:info@uksresort.com"
                      className="font-semibold text-[#0D2B2F] underline decoration-[#C49A3C]/40 underline-offset-2 transition hover:text-[#C49A3C] hover:decoration-[#C49A3C]"
                    >
                      info@uksresort.com
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

interface TariffTableBlockProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  headers: [string, string];
  rows: TariffRow[];
  className?: string;
}

function TariffTableBlock({
  eyebrow,
  title,
  subtitle,
  headers,
  rows,
  className = "",
}: TariffTableBlockProps) {
  return (
    <div
      className={[
        "tariff-table-wrap overflow-hidden rounded-3xl border border-[rgba(13,43,47,0.10)] bg-white/88 shadow-[0_20px_56px_rgba(13,43,47,0.08)] backdrop-blur-sm",
        className,
      ].join(" ")}
    >
      <div className="border-b border-[rgba(13,43,47,0.08)] px-6 py-6 sm:px-9">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-[#C49A3C]">
          {eyebrow}
        </p>
        <h3 className="mt-3 font-serif text-[1.75rem] leading-tight text-[#0D2B2F] sm:text-[2.2rem]">
          {title}
        </h3>
        <p className="mt-3 text-[0.95rem] leading-7 text-[#2C4A50]">{subtitle}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="bg-[#10323a] text-white">
              <th className="w-1/2 px-5 py-4 text-center text-[0.92rem] font-semibold tracking-wide">
                {headers[0]}
              </th>
              <th className="w-1/2 px-5 py-4 text-center text-[0.92rem] font-semibold tracking-wide">
                {headers[1]}
              </th>
            </tr>
          </thead>
          <tbody className="text-[#0D2B2F]">
            {rows.map((row, index) => (
              <tr
                key={row.name}
                className={[
                  "tariff-row transition-colors duration-150 hover:bg-[#EDF4F5]",
                  index % 2 === 0 ? "bg-[#F9F5EE]" : "bg-white",
                ].join(" ")}
              >
                <td className="border-t border-[rgba(13,43,47,0.07)] px-5 py-4 text-center text-[0.96rem] font-semibold">
                  {row.name}
                </td>
                <td className="border-t border-[rgba(13,43,47,0.07)] px-5 py-4 text-center text-[0.96rem] text-[#2C4A50]">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-[#C49A3C]/60 via-[#C49A3C] to-[#C49A3C]/60" />
    </div>
  );
}
 