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

export default function ResortIntro() {
  return (
    <section className="bg-[#f3efe8] py-20 text-[#1f3c44]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <div className="flex items-center gap-6 text-xs uppercase tracking-[0.35em]">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#1f3c44]/30 text-sm font-semibold">
                01
              </span>
              <span>The Resort</span>
            </div>
            <h2 className="mt-8 font-serif text-4xl leading-tight md:text-5xl">
              Enjoy summer in the
              <br />
              lap of luxury
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#1f3c44]/80">
              Welcome to our oasis of luxury and tranquility, where every aspect
              of your experience is meticulously crafted to exceed your
              expectations. Our resort is a perfect combination of distinctly
              designed rooms in a setting of rare natural beauty which only
              Samui has to offer.
            </p>
            <div className="mt-10 flex items-center gap-6">
              <Button
                href="/rooms"
                variant="outline"
                className="h-11 rounded-full border-[#1f3c44]/30 px-6 text-xs uppercase tracking-[0.2em] text-[#1f3c44] hover:border-[#1f3c44]"
              >
                Explore more
              </Button>
              <div className="h-px flex-1 bg-[#1f3c44]/15" />
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
              <div className="relative h-80 w-full">
                <Image
                  src="/images/h1_img1.jpg"
                  alt="Resort view"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-center gap-3 border-t border-[#1f3c44]/10 bg-white px-6 py-6 text-sm text-[#1f3c44]/70">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1f3c44]/20 text-xs">
                  TC
                </span>
                Award-winning resort in the paradise island
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 grid gap-8 text-center text-sm text-[#1f3c44]/90 sm:grid-cols-2 lg:grid-cols-6">
          {highlights.map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#1f3c44]/30">
                <item.Icon className="h-6 w-6" strokeWidth={1.4} />
              </span>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
