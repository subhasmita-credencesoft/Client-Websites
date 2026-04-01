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
  const href = {
    pathname: "/booking",
    query: { room: title },
  };

  return (
    <article
      data-card
      className="group relative h-[31rem] overflow-hidden rounded-[1.45rem] border border-[#b99253]/45 bg-black transition-all duration-700 hover:-translate-y-1.5 hover:border-[#dfbf86] hover:shadow-[0_28px_58px_rgba(9,18,14,0.3)]"
    >
      <Link href={href} className="absolute inset-0 z-10" aria-label={`View ${title}`}>
        <span className="sr-only">View details</span>
      </Link>

      <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="10">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.11] group-hover:rotate-[0.35deg]"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,18,15,0.22)_0%,rgba(12,18,15,0.14)_28%,rgba(10,14,12,0.2)_46%,rgba(10,14,12,0.72)_100%)] transition-all duration-700 group-hover:bg-[linear-gradient(180deg,rgba(255,248,236,0.08)_0%,rgba(15,22,18,0.08)_24%,rgba(14,18,16,0.22)_44%,rgba(11,15,13,0.82)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(233,204,151,0.1),transparent_36%)] opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="absolute inset-x-0 top-0 h-24 translate-y-[-100%] bg-[linear-gradient(180deg,rgba(255,248,232,0.18),transparent)] opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100" />
      <div className="absolute inset-y-0 left-[-34%] w-[36%] -skew-x-12 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,246,228,0.18),rgba(255,255,255,0))] opacity-0 transition-[transform,opacity] duration-[1300ms] ease-out group-hover:translate-x-[440%] group-hover:opacity-100" />
      <div className="absolute inset-[0.85rem] rounded-[1.05rem] border border-white/8 opacity-70 transition-all duration-700 group-hover:border-[#e0bf88]/28 group-hover:opacity-100" />
      <div className="absolute left-6 top-6 h-8 w-8 rounded-tl-[0.8rem] border-l border-t border-[#e1c089]/50 opacity-65 transition-all duration-700 group-hover:opacity-100" />
      <div className="absolute bottom-6 right-6 h-8 w-8 rounded-br-[0.8rem] border-b border-r border-[#e1c089]/50 opacity-65 transition-all duration-700 group-hover:opacity-100" />
      <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-[#cba977]/0 via-[#d9b983]/65 to-[#cba977]/0 opacity-75" />
      <div className="absolute inset-x-0 bottom-[5.75rem] h-px bg-white/20 transition-all duration-700 group-hover:bg-[#d3b07b]/55" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-all duration-700 group-hover:-translate-y-7">
        <h4 className="max-w-[12ch] text-3xl leading-tight text-[#ccab74] drop-shadow-[0_2px_12px_rgba(0,0,0,0.2)] transition-all duration-700 group-hover:scale-[1.04] group-hover:text-[#e8c995] group-hover:tracking-[0.03em] md:text-[3.2rem]">
          {title}
        </h4>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(16,24,20,0.06)_22%,rgba(16,24,20,0.5)_100%)] px-5 pb-4 pt-22 text-left md:px-7">
        <div className="translate-y-6 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-center text-xl text-[#d7b57f] transition-all duration-700 group-hover:tracking-[0.08em] md:text-2xl">View Details {">"}</p>
        </div>
        <div className="mt-8 translate-y-5 opacity-0 transition-all duration-700 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-sm leading-relaxed text-[#efe3ce] md:text-base">{description}</p>
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
