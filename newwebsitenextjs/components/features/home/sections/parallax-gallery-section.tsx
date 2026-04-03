import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeSectionContent } from "@/lib/data/content/resort-content";

export function ParallaxGallerySection() {
  const content = homeSectionContent.parallax;

  return (
    <section data-cinematic-section className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-30">
      <div className="cinematic-glow absolute left-[3%] top-[16%] h-[18rem] w-[18rem]" data-cinematic-glow />
      <div className="cinematic-glow absolute bottom-[8%] right-[5%] h-[19rem] w-[19rem]" data-cinematic-glow />
      <div data-cinematic-copy>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
      </div>

      <div data-reveal className="relative mt-16 grid gap-4 md:grid-cols-12 md:grid-rows-2">
        <figure data-cinematic-card className="glass-panel luxury-shadow relative col-span-12 h-[15rem] overflow-hidden rounded-3xl p-2 md:col-span-7 md:h-[29rem]">
          <div className="relative h-full overflow-hidden rounded-[1.3rem]">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#070708]/70 via-transparent to-transparent" />
            <div className="h-full w-full will-transform" data-cinematic-media data-parallax data-parallax-depth="12">
              <Image
                src={content.images[0].src}
                alt={content.images[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          </div>
        </figure>

        <figure data-cinematic-card className="glass-panel luxury-shadow relative col-span-12 h-[15rem] overflow-hidden rounded-3xl p-2 md:col-span-5 md:h-[14rem]">
          <div className="relative h-full overflow-hidden rounded-[1.3rem]">
            <div className="h-full w-full will-transform" data-cinematic-media data-parallax data-parallax-depth="22">
              <Image
                src={content.images[1].src}
                alt={content.images[1].alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </figure>

        <figure data-cinematic-card className="glass-panel luxury-shadow relative col-span-12 h-[15rem] overflow-hidden rounded-3xl p-2 md:col-span-5 md:h-[14rem]">
          <div className="relative h-full overflow-hidden rounded-[1.3rem]">
            <div className="h-full w-full will-transform" data-cinematic-media data-parallax data-parallax-depth="18">
              <Image
                src={content.images[2].src}
                alt={content.images[2].alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </figure>

        <figure data-cinematic-card className="glass-panel luxury-shadow relative col-span-12 h-[15rem] overflow-hidden rounded-3xl p-2 md:col-span-7 md:h-[29rem]">
          <div className="relative h-full overflow-hidden rounded-[1.3rem]">
            <div className="absolute inset-0 z-10 bg-gradient-to-tr from-[#070708]/50 via-transparent to-transparent" />
            <div className="h-full w-full will-transform" data-cinematic-media data-parallax data-parallax-depth="10">
              <Image
                src={content.images[3].src}
                alt={content.images[3].alt}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
