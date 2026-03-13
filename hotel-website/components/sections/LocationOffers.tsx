"use client";

import { useState } from "react";
import Container from "../ui/Container";

const offerSlides = [
  {
    id: "offer-1",
    image: "/images/special_offers1.jpg",
    label: "Early Booking",
    title: "15% Exclusive Discount",
    description: "Enjoy our offer, making your reservations",
  },
  {
    id: "offer-2",
    image: "/images/special_offers2.jpg",
    label: "Summer Escape",
    title: "Complimentary Spa Access",
    description: "Relax with curated spa rituals and signature treatments",
  },
];

export default function LocationOffers() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
   <section className="bg-white py-12 text-[#1f3c44] sm:py-16 lg:py-20">
      <Container>
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <div>
            <h2 className="font-serif text-[1.6rem] sm:text-2xl">Location and info</h2>
            <div className="mt-6 overflow-hidden rounded-3xl border border-[#1f3c44]/10">
              <iframe
                title="Location map"
                className="h-[360px] w-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19806.74242890257!2d-0.14158856638829688!3d51.503408321969576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c49f0e0d7b%3A0xe3c19c7a5c0f4f8f!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v1730970000000!5m2!1sen!2suk"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
           <div className="mt-6 grid gap-5 text-[0.95rem] sm:mt-8 sm:grid-cols-3 sm:gap-6 sm:text-sm">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#1f3c44]/60 sm:text-xs sm:tracking-[0.3em]">
                  Address
                </p>
                <p className="mt-2">
                  2972 Westheimer Rd.
                  <br />
                  Santa Ana, Illinois
                </p>
              </div>
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#1f3c44]/60 sm:text-xs sm:tracking-[0.3em]">
                  Check in/out
                </p>
                <p className="mt-2">Check-in from 2 PM</p>
                <p>Check-out by 10 AM</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#1f3c44]/60">
                  Reservations
                </p>
                <p className="mt-2 underline">1-800-123-4567</p>
              </div>
            </div>
          </div>
          <div>
          <h2 className="font-serif text-[1.6rem] sm:text-2xl">Special offers</h2>
           <div className="mt-6 overflow-hidden rounded-3xl">
              <div
                className="relative h-[320px] rounded-3xl bg-cover bg-center text-white transition duration-500 sm:h-[380px] lg:h-[420px]"
                style={{ backgroundImage: `url(${offerSlides[activeIndex].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
               <div className="relative flex h-full flex-col justify-end p-5 text-center sm:p-6 lg:p-8">
                 <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/80 sm:text-xs sm:tracking-[0.4em]">
                    {offerSlides[activeIndex].label}
                  </p>
                 <h3 className="mt-3 font-serif text-[1.35rem] sm:mt-4 sm:text-2xl">
                    {offerSlides[activeIndex].title}
                  </h3>
                  <p className="mt-2 text-[0.9rem] text-white/80 sm:text-sm">
                    {offerSlides[activeIndex].description}
                  </p>
                  <button className="mt-5 inline-flex h-10 items-center justify-center rounded-full border border-white/40 px-5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] sm:mt-6 sm:px-6 sm:text-xs sm:tracking-[0.2em]">
                    Explore offer
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[#1f3c44]/60">
                {offerSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 w-2 rounded-full transition ${
                      index === activeIndex ? "bg-[#1f3c44]" : "bg-[#1f3c44]/30"
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
