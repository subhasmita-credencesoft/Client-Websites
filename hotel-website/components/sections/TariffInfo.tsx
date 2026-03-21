"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePropertyData } from "../providers/PropertyDataProvider";
import Container from "../ui/Container";
import {
  TARIFF_CHECKIN_LABEL,
  TARIFF_CHECKIN_TIME,
  TARIFF_CHECKOUT_LABEL,
  TARIFF_CHECKOUT_TIME,
  TARIFF_DAY_PICNIC_DETAILS,
  TARIFF_DAY_PICNIC_FOOTNOTE,
  TARIFF_DAY_PICNIC_HIGHLIGHT,
  TARIFF_DAY_PICNIC_TITLE,
  TARIFF_FALLBACK_ROWS,
  TARIFF_GROUP_PACKAGE_ALL_DAYS_HEADER,
  TARIFF_GROUP_PACKAGE_OCCUPANCY_HEADER,
  TARIFF_GROUP_PACKAGE_ROWS,
  TARIFF_GROUP_PACKAGE_TITLE_LINES,
  TARIFF_INTRO_TEXT,
  TARIFF_LOADING_TEXT,
  TARIFF_MAIN_TABLE_PLAN_HEADER,
  TARIFF_MAIN_TABLE_ROOM_TYPE_HEADER,
  TARIFF_MAIN_TABLE_TITLE,
  type TariffRow,
} from "@/data/sections/tariffInfo";

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
  if (minimum && maximum && minimum === maximum) {
    return `${minimum} Guest${minimum > 1 ? "s" : ""}`;
  }
  if (minimum && maximum) {
    return `${minimum}-${maximum} Guests`;
  }
  if (maximum) {
    return `Up to ${maximum} Guests`;
  }
  return "Double Occupancy";
}

gsap.registerPlugin(ScrollTrigger);

export default function TariffInfo() {
  const { property, isLoading } = usePropertyData();
  const sectionRef = useRef<HTMLElement | null>(null);

  const gstPercent = useMemo(() => {
    const taxList = property?.taxDetails ?? [];
    const gstItem = taxList.find((tax) => (tax?.name || "").toLowerCase().includes("gst"));
    return gstItem?.percentage ?? taxList[0]?.percentage ?? 12;
  }, [property?.taxDetails]);

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
            ? `${roomPrice} + ${gstPercent} % GST on ${occupancy} with Breakfast${extraPersonText}`
            : `Rate on request + ${gstPercent} % GST`,
        };
      });

    if (rows.length > 0) {
      return rows;
    }

    return TARIFF_FALLBACK_ROWS.map((row) => ({
      ...row,
      value: row.value.replace("{gst}", String(gstPercent)),
    }));
  }, [property?.localCurrency, property?.minimumRoomPrice, property?.minimumRoooPrice, property?.roomList, gstPercent]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
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
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.03,
            scrollTrigger: {
              trigger: ".tariff-table-wrap",
              start: "top 85%",
              once: true,
            },
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

  return (
    <section ref={sectionRef} data-no-global-gsap className="bg-[#f3efe8] py-14 text-[#1f3c44] sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-6xl">
          <p className="tariff-intro text-[0.95rem] leading-relaxed text-[#1f3c44]/80 sm:text-[1rem]">
            {TARIFF_INTRO_TEXT}
          </p>
          {isLoading && <p className="tariff-intro mt-3 text-[0.9rem] text-[#1f3c44]/70">{TARIFF_LOADING_TEXT}</p>}
          <p className="tariff-intro mt-4 text-[1rem] leading-relaxed text-[#1f3c44]/85 sm:text-[1.03rem]">
            {TARIFF_CHECKIN_LABEL} <span className="font-semibold">{TARIFF_CHECKIN_TIME}</span> {TARIFF_CHECKOUT_LABEL} <span className="font-semibold">{TARIFF_CHECKOUT_TIME}</span>
          </p>

          <div className="tariff-table-wrap mt-10 overflow-x-auto rounded-sm border border-[#1f3c44]/10">
            <table className="w-full min-w-[740px] border-collapse">
              <thead>
                <tr className="bg-[#8e9792] text-white">
                  <th colSpan={2} className="px-4 py-4 text-center font-serif text-2xl sm:text-3xl">
                    {TARIFF_MAIN_TABLE_TITLE}
                  </th>
                </tr>
                <tr className="bg-[#8e9792] text-white">
                  <th className="w-1/2 border-t border-white/35 px-4 py-3 text-center text-[1rem] font-medium sm:text-[1.06rem]">{TARIFF_MAIN_TABLE_ROOM_TYPE_HEADER}</th>
                  <th className="w-1/2 border-t border-white/35 px-4 py-3 text-center text-[1rem] font-medium sm:text-[1.06rem]">{TARIFF_MAIN_TABLE_PLAN_HEADER}</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {roomTariffRows.map((row) => (
                  <tr key={row.name} className="tariff-row bg-[#8e9792]">
                    <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] font-semibold sm:text-[1.02rem]">{row.name}</td>
                    <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] sm:text-[1.02rem]">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="tariff-table-wrap mt-12 overflow-x-auto rounded-sm border border-[#1f3c44]/10">
            <table className="w-full min-w-[740px] border-collapse">
              <thead>
                <tr className="bg-[#8e9792] text-white">
                  <th colSpan={2} className="px-4 py-4 text-center font-serif text-xl leading-snug sm:text-2xl md:text-3xl">
                    {TARIFF_GROUP_PACKAGE_TITLE_LINES[0]}
                    <br />
                    {TARIFF_GROUP_PACKAGE_TITLE_LINES[1]}
                    <br />
                    {TARIFF_GROUP_PACKAGE_TITLE_LINES[2]}
                  </th>
                </tr>
                <tr className="bg-[#8e9792] text-white">
                  <th className="w-1/2 border-t border-white/35 px-4 py-3 text-center text-[1rem] font-medium sm:text-[1.06rem]">{TARIFF_GROUP_PACKAGE_OCCUPANCY_HEADER}</th>
                  <th className="w-1/2 border-t border-white/35 px-4 py-3 text-center text-[1rem] font-medium sm:text-[1.06rem]">{TARIFF_GROUP_PACKAGE_ALL_DAYS_HEADER}</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {TARIFF_GROUP_PACKAGE_ROWS.map((row) => (
                  <tr key={row.name} className="tariff-row bg-[#8e9792]">
                    <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] font-semibold sm:text-[1.02rem]">{row.name}</td>
                    <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] sm:text-[1.02rem]">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-14 max-w-5xl">
            <h3 className="tariff-detail font-serif text-3xl text-[#1f3c44] sm:text-4xl">{TARIFF_DAY_PICNIC_TITLE}</h3>
            <p className="tariff-detail mt-6 text-[1rem] font-semibold leading-relaxed text-[#1f3c44] sm:text-[1.06rem]">
              {TARIFF_DAY_PICNIC_HIGHLIGHT}
            </p>
            <p className="tariff-detail mt-3 text-[0.96rem] leading-[1.75] text-[#1f3c44]/85 sm:text-[1rem]">
              {TARIFF_DAY_PICNIC_DETAILS[0]}
            </p>
            <p className="tariff-detail mt-3 text-[0.96rem] leading-[1.75] text-[#1f3c44]/85 sm:text-[1rem]">
              {TARIFF_DAY_PICNIC_DETAILS[1]}
            </p>
            <p className="tariff-detail mt-8 text-[0.96rem] font-medium text-[#1f3c44]/90 sm:text-[1rem]">{TARIFF_DAY_PICNIC_FOOTNOTE}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
