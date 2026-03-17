"use client";

import { useState, useEffect } from "react";
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
export default function LocationOffers() {
  const { property } = usePropertyData();
  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
    <section className="bg-white py-12 text-[#1f3c44] sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">

          {/* LEFT — Location */}
          <div className="flex flex-col">
            <h2 className="font-serif text-2xl sm:text-3xl">Location and info</h2>

            <div className="mt-6 overflow-hidden rounded-3xl border border-[#1f3c44]/10">
              <iframe
                title="Location map"
                className="h-[280px] w-full sm:h-[340px] lg:h-[380px]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15558.123456789!2d73.318836!3d18.826129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7fd68dbb32757%3A0x45a268bbfa521ef0!2sUK's%20RESORT%2C%20Khopoli!5e0!3m2!1sen!2sin!4v1730970000000!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-3">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#1f3c44]/60 sm:text-xs sm:tracking-[0.3em]">
                  Address
                </p>
                <p className="mt-2 text-[0.88rem] leading-6 text-[#1f3c44]/80 sm:text-sm sm:leading-7">
                  {addressText}
                </p>
              </div>
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#1f3c44]/60 sm:text-xs sm:tracking-[0.3em]">
                  Check in/out
                </p>
                <p className="mt-2 text-[0.88rem] leading-6 text-[#1f3c44]/80 sm:text-sm sm:leading-7">
                  Check-in from 2 PM
                </p>
                <p className="text-[0.88rem] leading-6 text-[#1f3c44]/80 sm:text-sm sm:leading-7">
                  Check-out by 10 AM
                </p>
              </div>
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#1f3c44]/60 sm:text-xs sm:tracking-[0.3em]">
                  Reservations
                </p>
                <p className="mt-2 text-[0.88rem] leading-6 text-[#1f3c44]/80 sm:text-sm sm:leading-7 underline">
                  +91 2192 268333
                </p>
                <p className="text-[0.88rem] leading-6 text-[#1f3c44]/80 sm:text-sm sm:leading-7 underline">
                  +91 98220 12343
                </p>
                <button
                  type="button"
                  onClick={() => { window.location.href = "mailto:info@uksresort.com"; }}
                  className="mt-1 block text-[0.88rem] leading-6 text-[#1f3c44]/80 underline sm:text-sm sm:leading-7"
                >
                  info@uksresort.com
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — Special Offers */}
          <div className="flex flex-col">
            <h2 className="font-serif text-2xl sm:text-3xl">Special offers</h2>

            <div className="mt-6 flex flex-col">
              <div
                className="relative h-[300px] w-full overflow-hidden rounded-3xl bg-cover bg-center text-white transition-all duration-500 sm:h-[360px] lg:h-[400px]"
                style={{ backgroundImage: `url(${offerSlides[activeIndex].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="relative flex h-full flex-col items-center justify-end p-6 text-center sm:p-8">
                  <p className="text-[0.68rem] uppercase tracking-[0.3em] text-white/80 sm:text-xs sm:tracking-[0.4em]">
                    {offerSlides[activeIndex].label}
                  </p>
                  <h3 className="mt-3 font-serif text-xl sm:text-2xl">
                    {offerSlides[activeIndex].title}
                  </h3>
                  <p className="mt-2 text-[0.88rem] text-white/80 sm:text-sm">
                    {offerSlides[activeIndex].description}
                  </p>
                  <button
                    type="button"
                    className="mt-5 inline-flex h-10 items-center justify-center rounded-full border border-white/40 px-6 text-[0.68rem] font-semibold uppercase tracking-[0.2em] transition hover:bg-white/10 sm:mt-6 sm:text-xs"
                  >
                    Explore offer
                  </button>
                </div>
              </div>

              {/* Dots */}
              <div className="mt-4 flex items-center gap-2">
                {offerSlides.map((slide, i) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-6 bg-[#1f3c44]"
                        : "w-2 bg-[#1f3c44]/30"
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
