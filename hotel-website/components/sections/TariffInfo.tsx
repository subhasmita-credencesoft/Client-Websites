"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePropertyData } from "../providers/PropertyDataProvider";
import Container from "../ui/Container";

type TariffRow = {
  name: string;
  value: string;
};

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

    return [
      {
        name: "Deluxe",
        value: `Rs. 3950 + ${gstPercent} % GST on Double Occupancy with Breakfast`,
      },
      {
        name: "Super Deluxe",
        value: `Rs. 4950 + ${gstPercent} % GST on Double Occupancy with Breakfast`,
      },
      {
        name: "Extra Person (Above 5 years)",
        value: `Rs. 1400 + ${gstPercent} % GST with Extra Mattress & Breakfast`,
      },
    ];
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
            Tariff as follows (Taxes as per Govt Regulations)
          </p>
          {isLoading && <p className="tariff-intro mt-3 text-[0.9rem] text-[#1f3c44]/70">Loading latest tariff details...</p>}
          <p className="tariff-intro mt-4 text-[1rem] leading-relaxed text-[#1f3c44]/85 sm:text-[1.03rem]">
            Check in Time: <span className="font-semibold">12:00 Noon</span> Check Out Time: <span className="font-semibold">11:00 AM</span>
          </p>

          <div className="tariff-table-wrap mt-10 overflow-x-auto rounded-sm border border-[#1f3c44]/10">
            <table className="w-full min-w-[740px] border-collapse">
              <thead>
                <tr className="bg-[#8e9792] text-white">
                  <th colSpan={2} className="px-4 py-4 text-center font-serif text-2xl sm:text-3xl">
                    Tariff for Double Occupancy
                  </th>
                </tr>
                <tr className="bg-[#8e9792] text-white">
                  <th className="w-1/2 border-t border-white/35 px-4 py-3 text-center text-[1rem] font-medium sm:text-[1.06rem]">Room Type</th>
                  <th className="w-1/2 border-t border-white/35 px-4 py-3 text-center text-[1rem] font-medium sm:text-[1.06rem]">CP Plan (Room Rate + Break Fast)</th>
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
                    Package for Over Night Picnic for Groups (MINIMUM 20 PAX)
                    <br />
                    (Per Person Per Night with all Meals)
                    <br />
                    Includes 01 Lunch, 01 Hi Tea, 01 Dinner &amp; 01 Breakfast.
                  </th>
                </tr>
                <tr className="bg-[#8e9792] text-white">
                  <th className="w-1/2 border-t border-white/35 px-4 py-3 text-center text-[1rem] font-medium sm:text-[1.06rem]">Occupancy</th>
                  <th className="w-1/2 border-t border-white/35 px-4 py-3 text-center text-[1rem] font-medium sm:text-[1.06rem]">All Days</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="tariff-row bg-[#8e9792]">
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] font-semibold sm:text-[1.02rem]">Double Occupancy</td>
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] sm:text-[1.02rem]">Rs. 2750 + 18 % GST</td>
                </tr>
                <tr className="tariff-row bg-[#8e9792]">
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] font-semibold sm:text-[1.02rem]">Triple Occupancy</td>
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] sm:text-[1.02rem]">Rs. 2550 + 18 % GST</td>
                </tr>
                <tr className="tariff-row bg-[#8e9792]">
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] font-semibold sm:text-[1.02rem]">Quadriple Occupancy</td>
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] sm:text-[1.02rem]">Rs. 2350 + 18 % GST</td>
                </tr>
                <tr className="tariff-row bg-[#8e9792]">
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] font-semibold sm:text-[1.02rem]">Five Sharing Occupancy</td>
                  <td className="border-t border-white/35 px-4 py-3 text-center text-[0.98rem] sm:text-[1.02rem]">Rs. 2250 + 18 % GST</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-14 max-w-5xl">
            <h3 className="tariff-detail font-serif text-3xl text-[#1f3c44] sm:text-4xl">Tariff for One Day Picnic</h3>
            <p className="tariff-detail mt-6 text-[1rem] font-semibold leading-relaxed text-[#1f3c44] sm:text-[1.06rem]">
              TARIFF DAY PICNIC FOR GROUPS (MINIMUM 20 PAX) RATE Rs. 1099 PER PERSON + 18 % GST Rates as follows Per Person:
            </p>
            <p className="tariff-detail mt-3 text-[0.96rem] leading-[1.75] text-[#1f3c44]/85 sm:text-[1rem]">
              (Package Per Person Per Night include 01 Lunch, 01 Hi Tea, 01 Dinner &amp; 01 Break Fast, Entry to Big Water Park, Rain Dance, indoor games, Outdoor Games like cricket, Football &amp; Kids Play Park)
            </p>
            <p className="tariff-detail mt-3 text-[0.96rem] leading-[1.75] text-[#1f3c44]/85 sm:text-[1rem]">
              BREAKFAST, IDLI SAMBHAR CHUTNEY, POHA, BREAD OMLETT, TEA+COFFIE, LUNCH, CHICKEN ROGAN JOSH, VEG KADAI, MIX VEG DRY, DAL FRY, JEERA RICE, ROTI, NAAN, PARATHA, SALAD, PAPAD, PICKLE, GULAB JAMUN, HI TEA, TEA+COFFIE WITH VEG SANDWICH. Any Dish apart from this will be charged extra.
            </p>
            <p className="tariff-detail mt-8 text-[0.96rem] font-medium text-[#1f3c44]/90 sm:text-[1rem]">*Except Holidays &amp; Festivals</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
