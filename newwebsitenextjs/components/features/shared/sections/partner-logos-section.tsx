import { homeSectionContent } from "@/lib/data/content/resort-content";

export function PartnerLogosSection() {
  const content = homeSectionContent.logos;

  return (
    <section className="bg-black px-5 py-14 md:px-10">
      <div className="mx-auto max-w-[92rem] text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-[#cba977]">{content.eyebrow}</p>
        <h3 className="mt-3 text-4xl text-white md:text-5xl">{content.title}</h3>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
          {content.description}
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-4">
        {content.items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="glass-panel luxury-shadow block rounded-[1.75rem] border border-white/10 px-6 py-7 text-left transition-colors hover:border-[#cba977]/50"
            data-cursor="hover"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-[#cba977]">{item.label}</p>
            <p className="mt-4 break-words text-xl leading-snug text-white md:text-2xl">{item.value}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
