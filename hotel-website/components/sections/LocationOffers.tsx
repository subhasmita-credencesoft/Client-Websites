"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import { usePropertyData } from "../providers/PropertyDataProvider";

const offerSlides = [
  {
    id: "offer-1",
    image: "/images/special_offers1.jpg",
    label: "Early Booking",
    title: "15% Off Advance Reservations",
    description: "Plan ahead and enjoy exclusive savings when you book your stay in advance.",
  },
  {
    id: "offer-2",
    image: "/images/special_offers2.jpg",
    label: "Summer Escape",
    title: "Complimentary Breakfast",
    description: "Start your mornings with a freshly prepared breakfast included in your stay.",
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function LocationOffers() {
  const { property } = usePropertyData();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  const address = [
    property?.address?.streetName,
    property?.address?.suburb,
    property?.address?.city,
    property?.address?.state,
    property?.address?.postcode,
    property?.address?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const addressText =
    address ||
    "Ashtvinayak Mahad Phata, Old Mumbai - Pune Highway (NH4), Khopoli, Dist. Raigad - 410203, Maharashtra, India";

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % offerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
          ".location-title",
          { yPercent: 105, autoAlpha: 0, filter: "blur(8px)" },
          {
            yPercent: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.08,
            ease: "power4.out",
          },
        )
          .fromTo(
            ".location-map",
            { y: 24, autoAlpha: 0, scale: 0.985 },
            { y: 0, autoAlpha: 1, scale: 1, duration: 0.85, ease: "power3.out" },
            "<+0.06",
          )
          .fromTo(
            ".location-info-item",
            { y: 16, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out", stagger: 0.08 },
            "<+0.08",
          )
          .fromTo(
            ".offer-card",
            { y: 26, autoAlpha: 0, scale: 0.99 },
            { y: 0, autoAlpha: 1, scale: 1, duration: 0.9, ease: "power3.out" },
            "<-0.55",
          )
          .fromTo(
            ".offer-dot",
            { y: 8, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out", stagger: 0.04 },
            "<+0.02",
          );
      }, sectionRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const offerCard = sectionRef.current?.querySelector<HTMLElement>(".offer-card");
        if (!offerCard) return;

        const content = offerCard.querySelector<HTMLElement>(".offer-content");
        const bg = offerCard.querySelector<HTMLElement>(".offer-bg");

        if (content) {
          gsap.fromTo(
            content,
            { y: 14, autoAlpha: 0, filter: "blur(4px)" },
            { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.55, ease: "power3.out", overwrite: "auto" },
          );
        }

        if (bg) {
          gsap.fromTo(
            bg,
            { scale: 1.08, filter: "brightness(0.9)" },
            { scale: 1, filter: "brightness(1)", duration: 0.8, ease: "power2.out", overwrite: "auto" },
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [activeIndex]);

  return (
    <section ref={sectionRef} data-no-global-gsap className="bg-white py-12 text-[#1f3c44] sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="flex flex-col">
            <div className="overflow-hidden">
              <h2 className="location-title font-serif text-2xl sm:text-3xl">Location and info</h2>
            </div>

            <div className="location-map mt-6 overflow-hidden rounded-3xl border border-[#1f3c44]/10">
              <iframe
                title="Location map"
                className="h-[280px] w-full sm:h-[340px] lg:h-[380px]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15558.123456789!2d73.318836!3d18.826129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7fd68dbb32757%3A0x45a268bbfa521ef0!2sUK's%20RESORT%2C%20Khopoli!5e0!3m2!1sen!2sin!4v1730970000000!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-3">
              <div className="location-info-item">
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#1f3c44]/60 sm:text-xs sm:tracking-[0.3em]">
                  Address
                </p>
                <p className="mt-2 text-[0.88rem] leading-6 text-[#1f3c44]/80 sm:text-sm sm:leading-7">{addressText}</p>
              </div>
              <div className="location-info-item">
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#1f3c44]/60 sm:text-xs sm:tracking-[0.3em]">
                  Check in/out
                </p>
                <p className="mt-2 text-[0.88rem] leading-6 text-[#1f3c44]/80 sm:text-sm sm:leading-7">Check-in from 2 PM</p>
                <p className="text-[0.88rem] leading-6 text-[#1f3c44]/80 sm:text-sm sm:leading-7">Check-out by 10 AM</p>
              </div>
              <div className="location-info-item">
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#1f3c44]/60 sm:text-xs sm:tracking-[0.3em]">
                  Reservations
                </p>
                <p className="mt-2 text-[0.88rem] leading-6 text-[#1f3c44]/80 sm:text-sm sm:leading-7 underline">+91 2192 268333</p>
                <p className="text-[0.88rem] leading-6 text-[#1f3c44]/80 sm:text-sm sm:leading-7 underline">+91 98220 12343</p>
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "mailto:info@uksresort.com";
                  }}
                  className="mt-1 block text-[0.88rem] leading-6 text-[#1f3c44]/80 underline sm:text-sm sm:leading-7"
                >
                  info@uksresort.com
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="overflow-hidden">
              <h2 className="location-title font-serif text-2xl sm:text-3xl">Special offers</h2>
            </div>

            <div className="mt-6 flex flex-col">
              <div className="offer-card relative h-[300px] w-full overflow-hidden rounded-3xl text-white sm:h-[360px] lg:h-[400px]">
                <div
                  className="offer-bg absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${offerSlides[activeIndex].image})` }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="offer-content relative flex h-full flex-col items-center justify-end p-6 text-center sm:p-8">
                  <p className="text-[0.68rem] uppercase tracking-[0.3em] text-white/80 sm:text-xs sm:tracking-[0.4em]">
                    {offerSlides[activeIndex].label}
                  </p>
                  <h3 className="mt-3 font-serif text-xl sm:text-2xl">{offerSlides[activeIndex].title}</h3>
                  <p className="mt-2 text-[0.88rem] text-white/80 sm:text-sm">{offerSlides[activeIndex].description}</p>
                  <button
                    type="button"
                    className="mt-5 inline-flex h-10 items-center justify-center rounded-full border border-white/40 px-6 text-[0.68rem] font-semibold uppercase tracking-[0.2em] transition hover:bg-white/10 sm:mt-6 sm:text-xs"
                  >
                    Explore offer
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                {offerSlides.map((slide, i) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`offer-dot h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-6 bg-[#1f3c44]" : "w-2 bg-[#1f3c44]/30"
                    }`}
                    aria-label={`Show ${slide.label}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
