import Image from "next/image";
import {
  BedDouble,
  Dumbbell,
  Flower2,
  Sun,
  UtensilsCrossed,
  Waves,
} from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";

const highlights = [
  { title: "Outdoor activity and children's pool", Icon: Waves },
  { title: "Seaside location in the exclusive island resort", Icon: Sun },
  { title: "Luxury family rooms and suites", Icon: BedDouble },
  { title: "Stay Fit programme for all ages", Icon: Dumbbell },
  { title: "Wide range of top restaurants and bars", Icon: UtensilsCrossed },
  { title: "Spa & wellness for everyone", Icon: Flower2 },
];

const values = [
  {
    title: "Vision",
    text: "To serve all our guests with a personal touch, making them feel on top of the world.",
  },
  {
    title: "Mission",
    text: "To be the first choice of our guests.",
  },
];

export default function ResortIntro() {
  return (
    <section className="bg-[#f3efe8] py-14 text-[#1f3c44] sm:py-20 lg:py-24">
      <Container>

        {/* ── Section label row ── */}
        <div className="flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.28em] sm:gap-6 sm:text-xs sm:tracking-[0.38em]">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1f3c44]/30 text-[0.78rem] font-semibold sm:h-12 sm:w-12 sm:text-sm">
            01
          </span>
          <span>About UK&apos;s Resort</span>
          <div className="h-px flex-1 bg-[#1f3c44]/15" />
        </div>

        {/* ── Main two-column grid ── */}
        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">

          {/* ── LEFT: text content ── */}
          <div>

            {/* Headline as large display text like Amoja */}
            <h2 className="font-serif text-[1.7rem] leading-[1.12] tracking-[-0.01em] sm:text-[2.1rem] md:text-[2.6rem] lg:text-[3rem]">
              The Name That Redefines Hospitality Par&#8209;Excellence In The Lush Green Landscape At Khopoli.
            </h2>

            <div className="mt-6 max-w-xl space-y-4 text-[0.95rem] leading-[1.75] text-[#1f3c44]/70 sm:mt-7 sm:text-[0.98rem]">
              <p>
                Just a few miles from the outskirts of the hustle-n-bustle of Mumbai&apos;s concrete jungle,
                a complete at-home experience awaits — one that fulfills your heart&apos;s desires and offers
                the break you have always longed for.
              </p>
              <p>
                A signature business hotel showcasing impeccable hospitality amidst scenic beauty and
                rich history that blends harmoniously with today&apos;s lifestyles.
              </p>
              <p>
                Specially manicured landscaped gardens spread across over 85,000 sq. ft., overlooking
                mountains and greenery as far as the eye can see, creating the perfect setting for your
                business and leisure events.
              </p>
            </div>

            {/* Vision & Mission — inline divider style like Amoja */}
            <div className="mt-9 flex flex-col gap-0 divide-y divide-[#1f3c44]/12 border-y border-[#1f3c44]/12 sm:mt-10">
              {values.map((item) => (
                <div key={item.title} className="flex items-start gap-5 py-5 sm:gap-6 sm:py-6">
                  <span className="mt-0.5 min-w-[5.5rem] text-[0.64rem] uppercase tracking-[0.22em] text-[#d89a55] sm:text-[0.68rem] sm:tracking-[0.26em]">
                    {item.title}
                  </span>
                  <p className="text-[0.9rem] leading-[1.65] text-[#1f3c44]/75 sm:text-[0.93rem]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 sm:mt-10">
              <Button
                href="/rooms"
                variant="outline"
                className="h-11 rounded-full border-[#1f3c44]/35 px-7 text-[0.68rem] uppercase tracking-[0.22em] text-[#1f3c44] transition-colors hover:border-[#1f3c44] hover:bg-[#1f3c44] hover:text-white"
              >
                Explore more
              </Button>
            </div>

          </div>

          {/* ── RIGHT: image card + highlights grid ── */}
          <div className="space-y-6">

            {/* Image card */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_40px_rgba(31,60,68,0.10)]">
              <div className="relative h-60 w-full sm:h-72 lg:h-[22rem]">
                <Image
                  src="/images/BookOne Website Banner Mobile View.png"
                  alt="Resort aerial view"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-3 border-t border-[#1f3c44]/8 bg-white px-5 py-4 sm:px-6 sm:py-5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d89a55]/50 text-[0.62rem] font-semibold text-[#d89a55] sm:h-10 sm:w-10 sm:text-[0.66rem]">
                  TC
                </span>
                <p className="text-[0.8rem] leading-snug text-[#1f3c44]/65 sm:text-[0.83rem]">
                  Award-winning resort in the paradise island
                </p>
              </div>
            </div>

            {/* Highlights grid — 2 columns, icon + label */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {highlights.map(({ title, Icon }) => (
                <div
                  key={title}
                  className="flex flex-col gap-2.5 rounded-xl border border-[#1f3c44]/10 bg-white/70 p-4 transition-shadow hover:shadow-md sm:p-5"
                >
                  <Icon
                    className="h-5 w-5 text-[#d89a55] sm:h-6 sm:w-6"
                    strokeWidth={1.4}
                  />
                  <p className="text-[0.73rem] leading-[1.45] text-[#1f3c44]/80 sm:text-[0.78rem]">
                    {title}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </Container>
    </section>
  );
}