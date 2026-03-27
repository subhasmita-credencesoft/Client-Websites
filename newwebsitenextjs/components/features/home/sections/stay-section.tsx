import Image from "next/image";
import Link from "next/link";
import { stayCardsPrimary, stayCardsSecondary } from "@/lib/data/content/mountain-content";

function StayCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  const hrefMap: Record<string, string> = {
    "Standard Room": "/garden-villa-resort",
    "Cliff Room": "/luxury-resort",
    "Family Room": "/camp-della-resort-room",
    "Glass Cottage": "/adventure-resort",
    Bungalow: "/della-enclave-villa-rooms",
  };

  const href = hrefMap[title] ?? "/luxury-resort";

  return (
    <article
      data-card
      className="group relative h-[31rem] overflow-hidden border border-[#b99253]/45 bg-black transition-all duration-500 hover:border-[#d5b27a] hover:shadow-[0_18px_38px_rgba(9,18,14,0.22)]"
    >
      <Link href={href} className="absolute inset-0 z-10" aria-label={`View ${title}`}>
        <span className="sr-only">View details</span>
      </Link>

      <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="10">
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,18,15,0.24)_0%,rgba(12,18,15,0.18)_38%,rgba(12,18,15,0.34)_100%)] transition-all duration-500 group-hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(15,22,18,0.12)_30%,rgba(15,22,18,0.28)_100%)]" />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.16),transparent_34%)]" />
      <div className="absolute inset-x-0 bottom-[5.75rem] h-px bg-white/24 transition-all duration-500 group-hover:bg-[#d3b07b]/45" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-all duration-500 group-hover:-translate-y-5">
        <h4 className="max-w-[12ch] text-3xl leading-tight text-[#ccab74] drop-shadow-[0_2px_10px_rgba(0,0,0,0.18)] md:text-[3.2rem]">
          {title}
        </h4>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(16,24,20,0.06)_22%,rgba(16,24,20,0.38)_100%)] px-5 pb-4 pt-22 text-left md:px-7">
        <div className="translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-center text-xl text-[#ccab74] md:text-2xl">View Details {">"}</p>
        </div>
        <div className="mt-8 translate-y-5 opacity-0 transition-all duration-500 delay-75 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-sm leading-relaxed text-[#e8dcc6] md:text-base">{description}</p>
        </div>
      </div>
    </article>
  );
}

export function StaySection() {
  return (
    <section data-section-id="stay" className="bg-black py-14">
      <div className="overflow-hidden border-y border-white/15 py-4">
        <div className="flex w-max gap-8 whitespace-nowrap text-2xl text-[#cba977] md:text-3xl" data-marquee-track>
          {Array.from({ length: 8 }).map((_, index) => (
            <p key={index}>Stay &amp; Accommodation Details | Multiple premium stay options with modern amenities and comfortable furnishings</p>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[96rem] px-1">
        <div className="grid gap-5 md:grid-cols-3">
          {stayCardsPrimary.map((card) => (
            <StayCard key={card.title} {...card} />
          ))}
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {stayCardsSecondary.map((card) => (
            <StayCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
