"use client";

import Container from "../ui/Container";
import { VISION_MISSION, VALUES } from "../../data/sections/visionMission";

const MananIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px]">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
);

const MissionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px]">
    <path d="M3 17l4-8 4 4 4-6 4 10"/>
    <path d="M3 21h18"/>
  </svg>
);

export default function VisionMission() {
  return (
    <section className="overflow-hidden">

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between bg-[#003f8a] px-7 py-3 animate-fade-up">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-widest text-white">
            UK Resort · Khopoli
          </p>
          <p className="text-[11px] italic text-[#f7c744]">The break you deserve</p>
        </div>
        <p className="text-[11px] uppercase tracking-[.12em] text-white/50">
          Vision / Mission &amp; Values
        </p>
      </div>

      {/* ── Orange accent bar ── */}
      <div className="h-[3px] origin-left bg-[#f47c20] animate-bar-slide" />

      {/* ── Cinematic hero ── */}
      <div className="relative h-[300px] overflow-hidden md:h-[360px]">
        <video
          src="https://bookonelocal.in/cdn/Resort_entrance_gate_202604071226.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-black/55" />

        {/* animated road dashes */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 900 300"
          preserveAspectRatio="xMidYMax meet"
        >
          <line
            x1="450" y1="0" x2="450" y2="300"
            stroke="#f7c744" strokeWidth="3.5"
            strokeDasharray="26 18" opacity=".85"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="88" to="0" dur="1s"
              repeatCount="indefinite"
            />
          </line>
        </svg>

        {/* Manan + Mission text */}
        <div className="absolute inset-0 flex items-end justify-between px-8 pb-10 md:px-16">

          {/* Left – Manan */}
          <div className="animate-fade-up">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full
                border border-white/35 bg-white/14">
                <MananIcon />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/75">
                {VISION_MISSION.manan.label}
              </span>
            </div>
            <p className="max-w-[260px] text-xl font-medium leading-snug
              text-white [text-shadow:0_2px_12px_rgba(0,0,0,.55)] md:text-3xl">
              {VISION_MISSION.manan.text}
            </p>
          </div>

          {/* Right – Mission */}
          <div className="animate-fade-up text-right [animation-delay:250ms]">
            <div className="mb-1.5 flex flex-row-reverse items-center gap-2">
              <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full
                border border-white/35 bg-white/14">
                <MissionIcon />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/75">
                {VISION_MISSION.mission.label}
              </span>
            </div>
            <p className="ml-auto max-w-[260px] text-xl font-medium leading-snug
              text-white [text-shadow:0_2px_12px_rgba(0,0,0,.55)] md:text-3xl">
              {VISION_MISSION.mission.text}
            </p>
          </div>

        </div>
      </div>

      {/* ── Values strip label ── */}
      <Container>
        <p className="animate-fade-up py-4 text-center text-[10px] font-semibold
          uppercase tracking-[.2em] text-black/40 [animation-delay:500ms]">
          Our Core Values
        </p>
      </Container>

      {/* ── Values cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {VALUES.map((v, i) => (
          <div
            key={v.id}
            style={{ animationDelay: `${550 + i * 130}ms` }}
            className={`
              ${v.bg} group relative flex flex-col items-center
              overflow-hidden px-4 pb-8 pt-7 text-center
              transition-transform duration-300 ease-out
              hover:-translate-y-2 hover:z-10
              animate-card-rise
            `}
          >
            {/* notch */}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2
              border-x-[16px] border-b-[13px]
              border-x-transparent border-b-white/[.07]" />

            {/* icon circle */}
            <span className="mb-3.5 flex h-[52px] w-[52px] items-center justify-center
              rounded-full border border-white/28 bg-white/[.15]
              transition-all duration-300
              group-hover:scale-110 group-hover:bg-white/25">
              <span
                className="block h-[22px] w-[22px] text-white [&>svg]:h-full [&>svg]:w-full
                  [&>svg]:stroke-white [&>svg]:fill-none"
                dangerouslySetInnerHTML={{ __html: v.icon }}
              />
            </span>

            <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[.14em] text-white">
              {v.title}
            </p>
            <p className="text-[11px] leading-relaxed text-white/80">
              {v.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}