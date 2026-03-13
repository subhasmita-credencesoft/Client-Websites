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
    <section className="bg-[#f3efe8] py-12 text-[#1f3c44] sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <div className="flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.22em] sm:gap-6 sm:text-xs sm:tracking-[0.35em]">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1f3c44]/30 text-[0.8rem] font-semibold sm:h-12 sm:w-12 sm:text-sm">
                01
              </span>
              <span>The Resort</span>
            </div>
           <h2 className="mt-6 font-serif text-3xl leading-tight sm:mt-7 sm:text-4xl md:mt-8 md:text-5xl">
              Enjoy summer in the
              <br />
              lap of luxury
            </h2>
            <p className="mt-5 max-w-2xl text-[0.98rem] leading-7 text-[#1f3c44]/80 sm:mt-6 sm:text-base">
              Welcome to our oasis of luxury and tranquility, where every aspect
              of your experience is meticulously crafted to exceed your
              expectations. Our resort is a perfect combination of distinctly
              designed rooms in a setting of rare natural beauty which only
              Samui has to offer.
            </p>
           <div className="mt-8 flex items-center gap-4 sm:mt-10 sm:gap-6">
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
             <div className="relative h-64 w-full sm:h-72 lg:h-80">
                <Image
                  src="/images/h1_img1.jpg"
                  alt="Resort view"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
              </div>
             <div className="flex items-center justify-center gap-3 border-t border-[#1f3c44]/10 bg-white px-4 py-4 text-center text-[0.82rem] text-[#1f3c44]/70 sm:px-6 sm:py-6 sm:text-sm">
               <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#1f3c44]/20 text-[0.68rem] sm:h-10 sm:w-10 sm:text-xs">
                  TC
                </span>
                Award-winning resort in the paradise island
              </div>
            </div>
          </div>
        </div>
       <div className="mt-12 grid gap-6 text-center text-[0.92rem] text-[#1f3c44]/90 sm:mt-14 sm:grid-cols-2 sm:text-sm lg:mt-16 lg:grid-cols-6 lg:gap-8">
          {highlights.map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-3 sm:gap-4">
             <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#1f3c44]/30 sm:h-12 sm:w-12">
             <item.Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.4} />
              </span>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
