import Image from "next/image";
import { homeSectionContent, storytellingBlocks } from "@/lib/data/content/resort-content";

export function StorytellingSection() {
  return (
    <section
      id="story"
      data-section-id="story"
      data-sticky-fade-section
      className="mt-10 w-full bg-black"
    >
      <div
        data-sticky-fade-heading
        className="z-30 mx-auto max-w-[96rem] rounded-t-[2rem] border border-[#c9a46e]/16 bg-[linear-gradient(180deg,#17120f_0%,#1f1812_100%)] px-5 pb-8 pt-6 text-[#f4ead9] shadow-[0_24px_50px_rgba(10,18,12,0.24)] md:sticky md:top-5 md:px-10 md:pb-14 md:pt-10"
      >
        <p data-sticky-fade-line className="text-center text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#c89a55] md:text-left">
          The Mountain Resort in Karjat , By Redwings
        </p>
        <h2 data-sticky-fade-line className="mx-auto mt-4 max-w-4xl text-center text-3xl leading-tight md:mx-0 md:text-left md:text-6xl">
          One Private Estate For Every Celebration
        </h2>
        <p data-sticky-fade-line className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-white/74 md:mx-0 md:text-left md:text-lg">
          {homeSectionContent.about.body}
        </p>
      </div>

      {storytellingBlocks.map((block, index) => {
        const zIndexClass = index === 0 ? "z-20" : index === 1 ? "z-10" : "z-0";

        return (
          <article
            key={block.title}
            data-sticky-fade-block
            className={`${index === 0 ? "md:top-7 -mt-7" : "md:top-5 -mt-7"} ${zIndexClass} rounded-t-[2rem] border border-[#c9a46e]/16 bg-[linear-gradient(180deg,#15110e_0%,#1b1511_100%)] text-white shadow-[0_24px_50px_rgba(10,18,12,0.24)] md:sticky`}
          >
            <div className="mx-auto max-w-[96rem] px-5 py-8 md:px-10 md:py-14">
              <div className="grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-center">
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <h3 data-sticky-fade-line className="mx-auto max-w-4xl text-center text-2xl font-semibold leading-tight text-gradient-gold md:text-5xl">
                    {block.title}
                  </h3>
                  <p data-sticky-fade-line className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-white/76 md:text-lg">
                    {block.description}
                  </p>
                </div>

                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <div className="overflow-hidden rounded-[1.8rem]">
                    <div className="relative h-[58vw] min-h-[16rem] md:h-[34rem]">
                      <Image
                        src={block.image}
                        alt={block.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 52vw"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.12)_0%,rgba(10,10,10,0.22)_45%,rgba(10,10,10,0.48)_100%)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
