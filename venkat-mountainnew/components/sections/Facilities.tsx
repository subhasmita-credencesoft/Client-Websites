import {
  BellRing,
  Compass,
  Dumbbell,
  Sparkles,
  SunMedium,
  UtensilsCrossed,
} from "lucide-react";

import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import facilities from "../../data/facilities";

const facilityIconMap = {
  sparkles: Sparkles,
  utensils: UtensilsCrossed,
  map: Compass,
  sun: SunMedium,
  dumbbell: Dumbbell,
  "concierge-bell": BellRing,
} as const;

export default function Facilities() {
  return (
    <section className="py-16 bg-mist">
      <Container>
        <SectionHeading
          eyebrow="Facilities"
          title="Wellness, dining, and restorative spaces."
          subtitle="Everything on-site is designed to keep your day open and unhurried."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility) => (
            <div key={facility.title} className="rounded-2xl border border-ink/10 bg-white p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5efe5] text-[#c68a4b]">
                {(() => {
                  const Icon = facilityIconMap[facility.icon as keyof typeof facilityIconMap];
                  return Icon ? <Icon className="h-5 w-5" /> : null;
                })()}
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-ink/50">{facility.category}</p>
              <h3 className="mt-3 font-serif text-xl">{facility.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{facility.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
