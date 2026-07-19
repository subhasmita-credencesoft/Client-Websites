import { homeSectionContent } from "@/lib/data/content/resort-content";
import { SectionShell } from "@/components/ui/section-shell";

export function TownshipsSection() {
  const content = homeSectionContent.townships;
  const topRows = content.roomTypes.slice(0, 4);
  const bottomRow = content.roomTypes[4];

  return (
    <SectionShell data-section-id="townships" className="relative overflow-hidden bg-[#355446] pt-12 md:pt-16" containerClassName="text-center">
      <div data-reveal className="text-center">
        <h3 data-section-title className="site-title-lg text-[#d6a060]">
          {content.title}
        </h3>
        <p className="site-copy-lg mx-auto mt-3 max-w-5xl text-white">{content.subtitle}</p>
      </div>

      <div className="mx-auto mt-12 max-w-[88rem] border-t border-white/15" data-card>
        <div className="grid md:grid-cols-2">
          {topRows.map((room, index) => (
            <article
              key={room.title}
              className={`px-6 py-8 md:px-8 ${index < 2 ? "border-b border-white/15" : ""} ${index % 2 === 0 ? "md:border-r md:border-white/15" : ""}`}
            >
              <h4 className="site-title-md text-[#d6a060] md:text-[2rem]">{room.title}</h4>
              <div className="mt-4 space-y-2 text-base leading-relaxed text-white md:text-[1.25rem]">
                <p>{room.tariff}</p>
                <p>{room.package}</p>
              </div>
            </article>
          ))}
        </div>

        {bottomRow ? (
          <article className="border-t border-white/15 px-6 py-8 text-center md:px-8">
            <h4 className="site-title-md text-[#d6a060] md:text-[2rem]">{bottomRow.title}</h4>
            <div className="mt-4 space-y-2 text-base leading-relaxed text-white md:text-[1.25rem]">
              <p>{bottomRow.tariff}</p>
              <p>{bottomRow.package}</p>
            </div>
          </article>
        ) : null}
      </div>
    </SectionShell>
  );
}
