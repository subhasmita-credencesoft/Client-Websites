"use client";

import Container from "../ui/Container";

const clients = [
  "Corporate Partner A",
  "Event Management Group",
  "Global Tech Inc",
  "Luxury Weddings Co",
  "Family Travel Magazine",
  "Business Solutions Pvt Ltd",
  "Wanderlust Travels",
  "Elite Retreats",
];

export default function ClientsMarquee() {
  return (
    <section className="bg-white py-16 overflow-hidden">
      <Container>
        <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-8">
          Trusted By
        </p>
      </Container>
      
      <div className="relative flex overflow-x-hidden border-y border-gray-100 bg-gray-50/50 py-10">
        <div className="animate-marquee whitespace-nowrap flex items-center hover:[animation-play-state:paused]">
          {[...clients, ...clients, ...clients].map((client, i) => (
            <span key={i} className="mx-8 text-xl font-serif text-gray-400 hover:text-[#b68b5b] transition-colors cursor-default">
              {client}
            </span>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
