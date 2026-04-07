"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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
  TARIFF_DAY_PICNIC_TITLE,
  TARIFF_FALLBACK_ROWS,
  TARIFF_GROUP_PACKAGE_ALL_DAYS_HEADER,
  TARIFF_GROUP_PACKAGE_OCCUPANCY_HEADER,
  TARIFF_GROUP_PACKAGE_ROWS,
  TARIFF_GROUP_PACKAGE_TITLE_LINES,
  TARIFF_INTRO_TEXT,
  TARIFF_MAIN_TABLE_PLAN_HEADER,
  TARIFF_MAIN_TABLE_ROOM_TYPE_HEADER,
  TARIFF_MAIN_TABLE_TITLE,
  type TariffRow,
} from "@/data/sections/tariffInfo";

/* ─────────────────────────── helpers ─────────────────────────── */
function formatPrice(price?: number | null, currency = "INR") {
  if (typeof price !== "number" || Number.isNaN(price)) return null;
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `Rs. ${Math.round(price)}`;
  }
}

function formatOccupancyLabel(minimum?: number | null, maximum?: number | null) {
  if (minimum && maximum && minimum === maximum) return `${minimum} Guest${minimum > 1 ? "s" : ""}`;
  if (minimum && maximum) return `${minimum}–${maximum} Guests`;
  if (maximum) return `Up to ${maximum} Guests`;
  return "Double Occupancy";
}

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────── constants ─────────────────────────── */
const BOOKING_ENGINE_URL = "https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true";

const tariffHighlights = [
  "Breakfast-inclusive plans",
  "Transparent resort pricing",
  "Direct booking path",
] as const;

const dayPicnicFeatureCards = [
  {
    icon: Ticket,
    title: "Access Included",
    copy: "Package per person per night includes entry to Big Water Park, Rain Dance, indoor games, outdoor games like cricket and football, plus Kids Play Park access.",
  },
  {
    icon: UtensilsCrossed,
    title: "Meals Covered",
    copy: "Your package includes 01 Lunch, 01 Hi Tea, 01 Dinner, and 01 Breakfast for each person.",
  },
  {
    icon: Coffee,
    title: "Breakfast & Hi-Tea Menu",
    copy: "Idli sambhar chutney, poha, bread omelette, tea or coffee, plus hi-tea with veg sandwich. Extra dishes are chargeable.",
  },
] as const;

/* ─────────────────────────── component ─────────────────────────── */
export default function TariffInfo() {
  const { property } = usePropertyData();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [expandedCard, setExpandedCard] = useState(dayPicnicFeatureCards[0].title);

  /* GST */
  const gstPercent = useMemo(() => {
    const taxList = property?.taxDetails ?? [];
    const gstItem = taxList.find((tax) => (tax?.name || "").toLowerCase().includes("gst"));
    return gstItem?.percentage ?? taxList[0]?.percentage ?? 12;
  }, [property?.taxDetails]);

  /* room rows */
  const roomTariffRows = useMemo<TariffRow[]>(() => {
    const rooms = property?.roomList ?? [];
    const currency = property?.localCurrency || "INR";
    const rows = rooms
      .filter((room) => room?.name)
      .map((room) => {
        const roomName = room?.name?.trim() || "Room";
        const roomPrice =
          formatPrice(room?.pricePerNight, currency) ||
          formatPrice(room?.roomOnlyPrice, currency) ||
          formatPrice(property?.minimumRoomPrice, currency) ||
          formatPrice(property?.minimumRoooPrice, currency);
        const occupancy = formatOccupancyLabel(room?.minimumOccupancy, room?.maximumOccupancy);
        const extraPersonText =
          typeof room?.extraChargePerPerson === "number"
            ? ` | Extra Person ${formatPrice(room.extraChargePerPerson, currency)}`
            : "";
        return {
          name: roomName,
          value: roomPrice
            ? `${roomPrice} + ${gstPercent}% GST on ${occupancy} with Breakfast${extraPersonText}`
            : `Rate on request + ${gstPercent}% GST`,
        };
      });
    if (rows.length > 0) return rows;
    return TARIFF_FALLBACK_ROWS.map((row) => ({
      ...row,
      value: row.value.replace("{gst}", String(gstPercent)),
    }));
  }, [property?.localCurrency, property?.minimumRoomPrice, property?.minimumRoooPrice, property?.roomList, gstPercent]);

  /* GSAP */
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        });
        tl.fromTo(
          ".tariff-intro",
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", stagger: 0.06 },
        )
          .fromTo(
            ".tariff-table-wrap",
            { y: 24, autoAlpha: 0, scale: 0.99 },
            { y: 0, autoAlpha: 1, scale: 1, duration: 0.85, ease: "power3.out", stagger: 0.08 },
            "<+0.08",
          )
          .fromTo(
            ".tariff-detail",
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", stagger: 0.08 },
            "<+0.08",
          );

        gsap.fromTo(
          ".tariff-row",
          { y: 8, autoAlpha: 0 },
          {
            y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out", stagger: 0.03,
            scrollTrigger: { trigger: ".tariff-table-wrap", start: "top 85%", once: true },
          },
        );

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            end: "bottom top",
            scrub: 1,
          },
        })
          .to(".tariff-table-wrap", { y: -12, ease: "none" }, 0)
          .to(".tariff-detail", { y: -8, autoAlpha: 0.92, ease: "none" }, 0);
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  /* ── render ── */
  return (
    <section
      ref={sectionRef}
      data-no-global-gsap
      /* 
        PALETTE:
          page bg:   #F5F0E8  (warm ivory)
          deep bg:   #0D2B2F  (deep forest teal — rich, not muddy)
          mid tone:  #1A4A50  (forest teal)
          accent:    #C49A3C  (burnished gold — consistent throughout)
          accent lt: #E8C97A  (light gold for dark surfaces)
          text dark: #0D2B2F
          text body: #2C4A50
          border:    rgba(13,43,47,0.12)
      */
      className="relative overflow-hidden bg-[#F5F0E8] py-14 text-[#0D2B2F] sm:py-20 lg:py-24"
    >
      {/* subtle page texture overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(196,154,60,0.10) 0%, transparent 30%), radial-gradient(circle at 82% 88%, rgba(13,43,47,0.07) 0%, transparent 28%)",
        }}
      />

      <Container>
        <div className="mx-auto max-w-6xl">

          {/* ── TOP HERO ROW ── */}
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">

            {/* left — intro card */}
            <div className="rounded-3xl border border-[rgba(13,43,47,0.10)] bg-white/75 p-7 shadow-[0_20px_56px_rgba(13,43,47,0.08)] backdrop-blur-sm sm:p-10">
              <span className="tariff-intro inline-flex rounded-full border border-[#C49A3C]/35 bg-[#FBF4E4] px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#C49A3C]">
                Direct Booking Tariff
              </span>

              <h2 className="tariff-intro mt-5 font-serif text-[2.4rem] leading-[0.9] text-[#0D2B2F] sm:text-[3.6rem]">
                Plan faster.
                <br />
                <span className="text-[#1A4A50]">Book with confidence.</span>
              </h2>

              <p className="tariff-intro mt-5 max-w-2xl text-[0.97rem] leading-8 text-[#2C4A50]">
                {TARIFF_INTRO_TEXT} Review the latest room pricing, compare stay options, and move
                directly into the booking engine when you are ready to confirm.
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                {tariffHighlights.map((item) => (
                  <span
                    key={item}
                    className="tariff-intro rounded-full border border-[rgba(13,43,47,0.12)] bg-[#EDF4F5] px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#1A4A50]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* right — booking CTA dark card */}
           {/* ─── RIGHT CARD: Booking CTA ─────────────────────────────────────────
    ROOT CAUSE OF WASHED-OUT LOOK:
    1. The <Image> was bleeding through at opacity-30 (warm sage tones)
    2. Tailwind doesn't generate /8, /12, /22, /55, /80 opacity utilities
       by default — so bg-white/8, border-white/12, text-white/55 etc.
       all rendered as TRANSPARENT, making tiles and text invisible/faint.
    FIX: Remove image entirely. Use inline style={{ }} for every color
    that uses opacity so they are guaranteed to render correctly.
─────────────────────────────────────────────────────────────────── */}
<div
  className="tariff-detail relative overflow-hidden rounded-3xl p-7 sm:p-10"
  style={{
    backgroundColor: "#0D2B2F",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 32px 80px rgba(13,43,47,0.40)",
  }}
>
  {/* ── Decorative background layers (no image) ── */}

  {/* Gold glow — top right */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0"
    style={{
      background:
        "radial-gradient(ellipse 70% 55% at 95% 5%,  rgba(196,154,60,0.22) 0%, transparent 55%)," +
        "radial-gradient(ellipse 60% 50% at 5%  95%, rgba(22,62,69,0.65)   0%, transparent 50%)",
    }}
  />

  {/* Subtle dot-grid texture */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0"
    style={{
      backgroundImage:
        "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
      backgroundSize: "22px 22px",
    }}
  />

  {/* Top gold accent line */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 top-0"
    style={{
      height: "2px",
      background:
        "linear-gradient(90deg, transparent 0%, #C49A3C 50%, transparent 100%)",
    }}
  />

  {/* ── Content ── */}
  <div className="relative" style={{ zIndex: 2 }}>

    {/* Eyebrow */}
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        style={{
          display: "block",
          width: 28,
          height: 2,
          background: "#C49A3C",
          borderRadius: 2,
          flexShrink: 0,
        }}
      />
      <p
        className="text-[0.65rem] font-bold uppercase tracking-[0.32em]"
        style={{ color: "#C49A3C" }}
      >
        Ready To Reserve
      </p>
    </div>

    {/* Headline */}
    <h3
      className="mt-5 font-serif"
      style={{
        fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)",
        lineHeight: 1.05,
        color: "#ffffff",
        maxWidth: "14ch",
      }}
    >
      Turn tariff browsing{" "}
      <span style={{ color: "#E8C97A" }}>into a direct booking</span>
    </h3>

    {/* Body text */}
    <p
      className="mt-5 text-[0.96rem]"
      style={{
        lineHeight: 1.9,
        color: "rgba(255,255,255,0.78)",
        maxWidth: "40ch",
      }}
    >
      Once guests see pricing clearly, the next step should feel effortless.
      Send them straight to live availability and reservation confirmation.
    </p>

    {/* Divider */}
    <div
      style={{
        marginTop: 28,
        height: 1,
        background: "rgba(255,255,255,0.10)",
      }}
    />

    {/* Check-in / Check-out tiles */}
    <div className="mt-7 grid gap-4 sm:grid-cols-2">
      {[
        { label: "Check-in",  value: TARIFF_CHECKIN_TIME  },
        { label: "Check-out", value: TARIFF_CHECKOUT_TIME },
      ].map(({ label, value }) => (
        <div
          key={label}
          className="rounded-2xl p-5"
          style={{
            background: "rgba(255,255,255,0.07)",  /* was bg-white/8 — broken */
            border: "1px solid rgba(196,154,60,0.35)",
          }}
        >
          <p
            className="text-[0.63rem] font-bold uppercase tracking-[0.26em]"
            style={{ color: "#C49A3C" }}          /* was text-white/55 — invisible */
          >
            {label}
          </p>
          <p
            className="mt-3 font-serif leading-none"
            style={{ fontSize: "1.95rem", color: "#ffffff" }}
          >
            {value}
          </p>
        </div>
      ))}
    </div>

    {/* CTA buttons */}
    <div className="mt-8 flex flex-wrap gap-4">
      <Link
        href={BOOKING_ENGINE_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] transition hover:-translate-y-0.5 active:translate-y-0"
        style={{
          background: "#C49A3C",
          color: "#0D2B2F",
          boxShadow: "0 10px 26px rgba(196,154,60,0.45)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#D9B455")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#C49A3C")}
      >
        Book Now
      </Link>
      <Link
        href="/rooms"
        className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] transition"
        style={{
          border: "1px solid rgba(255,255,255,0.32)", /* was border-white/22 — broken */
          color: "#ffffff",
          background: "transparent",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.10)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        Explore Rooms
      </Link>
    </div>

  </div>
</div>
          </div>

          {/* ── ROOM TARIFF TABLE ── */}
          <TariffTableBlock
            eyebrow="Room Tariff"
            title={TARIFF_MAIN_TABLE_TITLE}
            subtitle="Breakfast-inclusive room plans with clear pricing visibility for faster decision-making."
            headers={[TARIFF_MAIN_TABLE_ROOM_TYPE_HEADER, TARIFF_MAIN_TABLE_PLAN_HEADER]}
            rows={roomTariffRows}
            className="mt-10"
          />

          {/* ── GROUP PACKAGE TABLE ── */}
          <TariffTableBlock
            eyebrow="Group Stay Package"
            title={TARIFF_GROUP_PACKAGE_TITLE_LINES[0]}
            subtitle={`${TARIFF_GROUP_PACKAGE_TITLE_LINES[1]} ${TARIFF_GROUP_PACKAGE_TITLE_LINES[2]}`}
            headers={[TARIFF_GROUP_PACKAGE_OCCUPANCY_HEADER, TARIFF_GROUP_PACKAGE_ALL_DAYS_HEADER]}
            rows={TARIFF_GROUP_PACKAGE_ROWS}
            className="mt-10"
          />

          {/* ── DAY PICNIC + CONVERSION ROW ── */}
          <div className="mt-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">

            {/* Day picnic card */}
            <div className="rounded-3xl border border-[rgba(13,43,47,0.10)] bg-white p-7 shadow-[0_22px_56px_rgba(13,43,47,0.07)] sm:p-9">
              <h3 className="tariff-detail font-serif text-3xl text-[#0D2B2F] sm:text-4xl">
                {TARIFF_DAY_PICNIC_TITLE}
              </h3>
              <p className="tariff-detail mt-5 text-[0.98rem] font-semibold leading-relaxed text-[#1A4A50] sm:text-[1.04rem]">
                {TARIFF_DAY_PICNIC_HIGHLIGHT}
              </p>

              <div className="mt-7 grid gap-3.5">
                {dayPicnicFeatureCards.map((item) => {
                  const Icon = item.icon;
                  const isExpanded = expandedCard === item.title;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setExpandedCard(isExpanded ? "" : item.title)}
                      className={[
                        "tariff-detail group w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5",
                        isExpanded
                          ? "border-[#C49A3C]/40 bg-[#0D2B2F] text-white shadow-[0_16px_36px_rgba(13,43,47,0.20)]"
                          : "border-[rgba(13,43,47,0.10)] bg-[#F9F5EE] hover:border-[#C49A3C]/30 hover:bg-white hover:shadow-[0_10px_28px_rgba(13,43,47,0.07)]",
                      ].join(" ")}
                    >
                      <div className="flex items-start gap-4">
                        {/* icon */}
                        <div
                          className={[
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                            isExpanded
                              ? "scale-110 bg-[#C49A3C] text-[#0D2B2F]"
                              : "bg-[#1A4A50] text-white group-hover:scale-105",
                          ].join(" ")}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-3">
                            <h4
                              className={[
                                "text-[0.98rem] font-semibold sm:text-[1.02rem]",
                                isExpanded ? "text-white" : "text-[#0D2B2F]",
                              ].join(" ")}
                            >
                              {item.title}
                            </h4>
                            <span
                              className={[
                                "ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                                isExpanded
                                  ? "rotate-180 border-white/20 bg-white/10 text-white"
                                  : "border-[rgba(13,43,47,0.12)] bg-white text-[#1A4A50]",
                              ].join(" ")}
                            >
                              <ChevronDown className="h-4 w-4" aria-hidden="true" />
                            </span>
                          </div>

                          <div
                            className={[
                              "grid transition-all duration-300 ease-out",
                              isExpanded ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-1 grid-rows-[0fr] opacity-0",
                            ].join(" ")}
                          >
                            <div className="overflow-hidden">
                              <p
                                className={[
                                  "text-[0.94rem] leading-7 sm:text-[0.97rem]",
                                  isExpanded ? "text-white/82" : "text-[#2C4A50]",
                                ].join(" ")}
                              >
                                {item.copy}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="tariff-detail mt-6 text-[0.94rem] font-medium leading-7 text-[#2C4A50] sm:text-[0.98rem]">
                {TARIFF_DAY_PICNIC_FOOTNOTE}
              </p>
            </div>

            {/* conversion CTA card — deep forest teal */}
            <div className="tariff-detail relative overflow-hidden rounded-3xl border border-[#1A4A50]/25 bg-[#1A4A50] p-7 text-white shadow-[0_24px_60px_rgba(13,43,47,0.18)] sm:p-9">
              {/* glows */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(196,154,60,0.14),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(13,43,47,0.30),transparent_30%)]" />
              {/* top shimmer */}
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#C49A3C]/40 to-transparent" />

              <div className="relative z-10">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#E8C97A]">
                  Conversion Focus
                </p>
                <h3 className="mt-4 font-serif text-[2rem] leading-[0.94] sm:text-[2.6rem]">
                  Ready to lock in your stay?
                </h3>
                <p className="mt-5 max-w-2xl text-[0.96rem] leading-8 text-white/80">
                  The tariff page creates pricing clarity. The strongest next step is direct
                  booking through our engine, where guests can check live availability and
                  complete their reservation.
                </p>

                {/* stat pills */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { label: "Direct savings", value: "Best Rate" },
                    { label: "Booking time", value: "< 3 min" },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-sm"
                    >
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.20em] text-white/50">
                        {label}
                      </p>
                      <p className="mt-2 font-serif text-[1.5rem] leading-none text-[#E8C97A]">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={BOOKING_ENGINE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#C49A3C] px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#0D2B2F] shadow-[0_10px_24px_rgba(196,154,60,0.28)] transition hover:-translate-y-0.5 hover:bg-[#D4B05A] active:translate-y-0"
                  >
                    Open Booking Engine
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-white/22 px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white/10 active:bg-white/5"
                  >
                    Contact Our Team
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────── sub-component ─────────────────────────── */
interface TariffTableBlockProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  headers: [string, string];
  rows: TariffRow[];
  className?: string;
}

function TariffTableBlock({ eyebrow, title, subtitle, headers, rows, className = "" }: TariffTableBlockProps) {
  return (
    <div
      className={[
        "tariff-table-wrap overflow-hidden rounded-3xl border border-[rgba(13,43,47,0.10)] bg-white/82 shadow-[0_20px_56px_rgba(13,43,47,0.08)] backdrop-blur-sm",
        className,
      ].join(" ")}
    >
      {/* header */}
      <div className="border-b border-[rgba(13,43,47,0.08)] px-6 py-6 sm:px-9">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-[#C49A3C]">
          {eyebrow}
        </p>
        <h3 className="mt-3 font-serif text-[1.75rem] leading-tight text-[#0D2B2F] sm:text-[2.2rem]">
          {title}
        </h3>
        <p className="mt-3 text-[0.95rem] leading-7 text-[#2C4A50]">{subtitle}</p>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="bg-[#0D2B2F] text-white">
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

      {/* bottom accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#C49A3C]/60 via-[#C49A3C] to-[#C49A3C]/60" />
    </div>
  );
}
