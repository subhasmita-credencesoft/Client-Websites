"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Container from "../ui/Container";

type PageHeroProps = {
  title: string;
  backgroundImage: string;
  subtitle?: string;
  breadcrumb?: string;
  minHeightClassName?: string;
};

export default function PageHero({
  title,
  backgroundImage,
  subtitle,
  breadcrumb,
  minHeightClassName = "min-h-[72vh]",
}: PageHeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const [pointerX, setPointerX] = useState(0);
  const [pointerY, setPointerY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => setScrollY(window.scrollY || 0));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setPointerX(x);
    setPointerY(y);
  }, []);

  const parallaxShift = useMemo(() => {
    const scrollShift = Math.min(scrollY * 0.12, 72);
    return {
      x: pointerX * 14,
      y: scrollShift + pointerY * 10,
    };
  }, [pointerX, pointerY, scrollY]);

  const breadcrumbCurrent = useMemo(() => {
    if (!breadcrumb) return "";
    return breadcrumb.replace(/^Home\s*\/\s*/i, "").trim();
  }, [breadcrumb]);

  return (
    <section
      className={`relative overflow-hidden text-white ${minHeightClassName}`}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        setPointerX(0);
        setPointerY(0);
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 will-change-transform"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          transform: `translate3d(${parallaxShift.x}px, ${parallaxShift.y}px, 0)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70" />

      <Container className={`relative z-10 flex flex-col items-center justify-center text-center ${minHeightClassName}`}>
        <div className="hero-title-line overflow-hidden">
          <h1
            className="hero-title-reveal font-serif text-4xl leading-[0.95] drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)] md:text-6xl"
            style={{ animationDelay: "140ms" }}
          >
            {title}
          </h1>
        </div>

        {subtitle && (
          <p className="animate-fade-up mt-4 max-w-3xl text-sm text-white/85 md:text-base" style={{ animationDelay: "260ms" }}>
            {subtitle}
          </p>
        )}

        {breadcrumb && (
          <p
            className="animate-fade-up mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/85 md:text-[0.72rem]"
            style={{ animationDelay: "340ms" }}
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            {breadcrumbCurrent ? (
              <>
                <span className="mx-2 text-white/60">/</span>
                <span>{breadcrumbCurrent}</span>
              </>
            ) : null}
          </p>
        )}
      </Container>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        @keyframes titleLift {
          from {
            opacity: 0;
            transform: translateY(120%);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        .animate-fade-up {
          opacity: 0;
          animation: fadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .hero-title-reveal {
          opacity: 0;
          animation: titleLift 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: transform, opacity, filter;
        }
      `}</style>
    </section>
  );
}
