"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Container from "../ui/Container";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Standard Package",
    price: "₹3,999",
    duration: "Per Night",
    features: ["Deluxe Room", "Complimentary Breakfast", "Access to Pool", "Free WiFi"],
    featured: false,
  },
  {
    name: "Premium Escape",
    price: "₹5,499",
    duration: "Per Night",
    features: ["Super Deluxe Room", "All Meals Included", "Water Park Access", "Evening High Tea", "Spa Discount"],
    featured: true,
  },
  {
    name: "Family Weekend",
    price: "₹7,999",
    duration: "Per Night",
    features: ["Family Suite", "Breakfast & Dinner", "Adventure Games", "Kids Play Area"],
    featured: false,
  },
];

export default function TariffHome() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".tariff-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
          },
        }
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} className="bg-[#f7f3ee] py-24">
      <Container>
        <div className="text-center">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#244332]">Tariff & Pricing</span>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl text-[#1b1a17]">Select Your Experience</h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:items-center">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`tariff-card relative flex flex-col rounded-2xl p-8 transition-shadow hover:shadow-[0_0_30px_rgba(26,56,45,0.15)] ${
                plan.featured
                  ? "z-10 scale-105 bg-[#244332] text-white shadow-2xl"
                  : "bg-white text-[#1b1a17] shadow-lg"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#b68b5b] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Most Popular
                </div>
              )}
              <h3 className="mb-2 font-serif text-2xl">{plan.name}</h3>
              <div className="mb-6 flex items-end gap-2 border-b border-[#b68b5b]/20 pb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className={`text-sm ${plan.featured ? "text-gray-300" : "text-gray-500"}`}>
                  / {plan.duration}
                </span>
              </div>
              <ul className="mb-8 flex-1 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className={`h-5 w-5 ${plan.featured ? "text-[#b68b5b]" : "text-[#244332]"}`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full rounded-full py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
                  plan.featured
                    ? "bg-[#b68b5b] text-white hover:bg-[#a57a4a]"
                    : "border-2 border-[#244332] bg-transparent text-[#244332] hover:bg-[#244332] hover:text-white"
                }`}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
