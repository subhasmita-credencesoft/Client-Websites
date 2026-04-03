import Link from "next/link";
import Image from "next/image";
import { homeSectionContent, horizontalPanels } from "@/lib/data/content/resort-content";

const panelLinks: Record<string, string> = {
  "Classic Package": "/offers?package=classic",
  "Signature Package": "/offers?package=signature",
  "Premium Luxe Package": "/offers?package=premium-luxo",
};

export function HorizontalJourneySection() {
  const content = homeSectionContent.horizontalJourney;

  return (
    <section
      id="signature"
      data-section-id="signature"
      data-horizontal-scroll
      data-horizontal-end={`+=${Math.max(1400, horizontalPanels.length * 960)}`}
      className="relative overflow-hidden"
    >
      <div data-horizontal-track className="flex flex-col md:h-[100svh] md:flex-row">
        {horizontalPanels.map((panel, index) => (
          <Link
            key={panel.title}
            href={panelLinks[panel.title] ?? "/offers"}
            className="journey-panel relative block min-h-[78svh] overflow-hidden md:h-full md:w-screen md:shrink-0"
            data-cursor="hover"
            data-horizontal-card
          >
            <div className="absolute inset-0 will-transform" data-zoom-scroll>
              <Image
                src={panel.image}
                alt={panel.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/46 to-black/72" />
            <div
              data-panel-content
              className="relative z-10 flex h-full max-w-xl flex-col justify-end px-7 pb-16 md:px-16 md:pb-20"
            >
              <p data-panel-line className="mb-4 text-xs uppercase tracking-[0.34em] text-[#d8be99]">
                {content.prefix} 0{index + 1}
              </p>
              <h3 data-panel-line className="text-5xl leading-[1.02] text-[#f7eddc] md:text-7xl">
                {panel.title}
              </h3>
              <p data-panel-line className="mt-4 text-base text-white/72 md:text-lg">
                {panel.subtitle}
              </p>
              {"bullets" in panel && Array.isArray(panel.bullets) ? (
                <ul className="mt-6 space-y-2 text-sm leading-relaxed text-white/80 md:text-base">
                  {panel.bullets.map((bullet) => (
                    <li key={bullet} data-panel-line>
                      - {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
