import Link from "next/link";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { bookingEngineUrl } from "@/lib/data";

export function BlogCTA() {
  return (
    <section className="rounded-[28px] border border-gold/15 bg-dark-2 p-8 text-center sm:p-12 lg:p-16">
      <p className="eyebrow">Plan Your Goa Stay</p>
      <h2 className="display-title text-4xl sm:text-5xl">
        Make Your Trip to Goa Unforgettable
      </h2>
      <p className="mx-auto mt-6 max-w-[60ch] text-base leading-8 text-ivory/65">
        Stay at Redwings Studio in Arpora — comfortable studio apartments with
        pool access, free Wi-Fi, and easy reach to Baga, Calangute, and Anjuna
        beaches. Rooms from ₹1,950 per night.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <LuxuryButton href={bookingEngineUrl} label="Check Availability" />
        <LuxuryButton href="/rooms" label="View All Rooms" variant="ghost" className="border-gold/55" />
        <LuxuryButton href="/tariff" label="See Tariff" variant="ghost" className="border-gold/55" />
        <LuxuryButton href="/contact" label="Contact Us" variant="ghost" className="border-gold/55" />
      </div>
    </section>
  );
}
