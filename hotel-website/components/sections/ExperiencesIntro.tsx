import Image from "next/image";
import Container from "../ui/Container";
import {
  EXPERIENCES_INTRO_DESCRIPTION,
  EXPERIENCES_INTRO_KICKER,
  EXPERIENCES_INTRO_PRIMARY_IMAGE,
  EXPERIENCES_INTRO_SECONDARY_IMAGE,
  EXPERIENCES_INTRO_TITLE_LINES,
} from "@/data/sections/experiencesIntro";

export default function ExperiencesIntro() {
  return (
    <section className="bg-[#f6f3ed] py-20 text-[#1f3c44]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-8">
            <span className="text-xs uppercase tracking-[0.45em] text-[#1f3c44]/70">
              {EXPERIENCES_INTRO_KICKER}
            </span>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              {EXPERIENCES_INTRO_TITLE_LINES[0]}
              <br />
              {EXPERIENCES_INTRO_TITLE_LINES[1]}
              <br />
              {EXPERIENCES_INTRO_TITLE_LINES[2]}
            </h2>
            <p className="max-w-xl text-sm leading-7 text-[#1f3c44]/75">
              {EXPERIENCES_INTRO_DESCRIPTION}
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-[#e2dacd] shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
            <Image
              src={EXPERIENCES_INTRO_PRIMARY_IMAGE.src}
              alt={EXPERIENCES_INTRO_PRIMARY_IMAGE.alt}
              width={1400}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-12 max-w-lg overflow-hidden rounded-3xl bg-[#e2dacd] shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
          <Image
            src={EXPERIENCES_INTRO_SECONDARY_IMAGE.src}
            alt={EXPERIENCES_INTRO_SECONDARY_IMAGE.alt}
            width={1200}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
