"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppDispatch } from "@/store/hooks";
import { setActiveSection } from "@/store/slices/ui-slice";

type AnimationSystemProps = {
  children: ReactNode;
};

export function AnimationSystem({ children }: AnimationSystemProps) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let isActive = true;
    const cleanups: Array<() => void> = [];

    gsap.registerPlugin(ScrollTrigger);

    const isDesktop = () => window.innerWidth >= 768;
    const refresh = () => ScrollTrigger.refresh();
    const delayedRefresh = window.setTimeout(refresh, 350);
    const onLoad = () => refresh();

    window.addEventListener("load", onLoad);

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          [
            "[data-reveal]",
            "[data-reveal-child]",
            "[data-card]",
            "[data-panel-content]",
            "[data-panel-line]",
            "[data-section-title]",
          ],
          {
            clearProps: "all",
            autoAlpha: 1,
          },
        );
      }

      const revealItems = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      revealItems.forEach((item, index) => {
        if (reducedMotion) return;

        const revealChildren = item.querySelectorAll("[data-reveal-child]");

        gsap.fromTo(
          item,
          {
            autoAlpha: 0,
            y: isDesktop() ? 56 : 30,
            scale: 0.992,
            filter: "blur(10px)",
            clipPath: "inset(0 0 14% 0)",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            clipPath: "inset(0 0 0% 0)",
            duration: 1.15,
            ease: "power3.out",
            delay: index * 0.02,
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              once: true,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          },
        );

        if (revealChildren.length > 0) {
          gsap.fromTo(
            revealChildren,
            {
              autoAlpha: 0,
              y: 34,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.12,
              delay: 0.16,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 84%",
                once: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      });

      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      cards.forEach((card) => {
        if (reducedMotion) return;

        gsap.set(card, { transformPerspective: 900, transformOrigin: "center center" });

        gsap.fromTo(
          card,
          {
            autoAlpha: 0,
            y: isDesktop() ? 48 : 30,
            scale: 0.975,
            rotateX: 2,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          },
        );

        if (!isDesktop()) return;

        const image = card.querySelector<HTMLElement>("[data-card-image]");

        const onMove = (event: MouseEvent) => {
          const bounds = card.getBoundingClientRect();
          const px = (event.clientX - bounds.left) / bounds.width - 0.5;
          const py = (event.clientY - bounds.top) / bounds.height - 0.5;

          gsap.to(card, {
            rotateY: px * 8,
            rotateX: py * -8,
            y: -6,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });

          if (image) {
            gsap.to(image, {
              xPercent: px * 2.2,
              yPercent: py * 2.2,
              scale: 1.04,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        };

        const onLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            overwrite: "auto",
          });

          if (image) {
            gsap.to(image, {
              xPercent: 0,
              yPercent: 0,
              scale: 1,
              duration: 0.45,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      const horizontalCards = gsap.utils.toArray<HTMLElement>("[data-horizontal-card]");
      if (horizontalCards.length > 0) {
        const horizontalTrigger = horizontalCards[0].closest("[data-horizontal-scroll]");
        if (horizontalTrigger && !reducedMotion) {
          gsap.fromTo(
            horizontalCards,
            {
              y: 24,
              scale: 0.985,
            },
            {
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: horizontalTrigger,
                start: "top 88%",
                once: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      }

      const cardImages = gsap.utils.toArray<HTMLElement>("[data-card-image]");
      cardImages.forEach((image) => {
        if (reducedMotion) return;

        gsap.fromTo(
          image,
          { scale: 1.08, yPercent: -2 },
          {
            scale: 1,
            yPercent: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: image,
              start: "top 92%",
              once: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      const parallaxItems = gsap.utils.toArray<HTMLElement>("[data-parallax]");
      parallaxItems.forEach((item) => {
        if (reducedMotion) return;

        const rawDepth = Number(item.dataset.parallaxDepth ?? "18");
        const depth = isDesktop() ? rawDepth : Math.max(4, Math.round(rawDepth * 0.4));

        gsap.fromTo(
          item,
          { yPercent: -depth * 0.5 },
          {
            yPercent: depth,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      const bgParallaxItems = gsap.utils.toArray<HTMLElement>("[data-bg-parallax]");
      bgParallaxItems.forEach((item) => {
        if (reducedMotion) return;

        const rawDepth = Number(item.dataset.bgDepth ?? "12");
        const depth = isDesktop() ? rawDepth : Math.max(3, Math.round(rawDepth * 0.4));

        gsap.fromTo(
          item,
          { yPercent: -depth * 0.4, scale: 1.015 },
          {
            yPercent: depth * 0.7,
            scale: isDesktop() ? 1.06 : 1.03,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      const horizontalSections = gsap.utils.toArray<HTMLElement>("[data-horizontal-scroll]");
      horizontalSections.forEach((section) => {
        if (reducedMotion) return;

        const track = section.querySelector<HTMLElement>("[data-horizontal-track]");
        if (!track) return;

        const getTravelX = () => {
          if (window.innerWidth < 768) return 0;
          return Math.max(0, track.scrollWidth - section.clientWidth);
        };

        gsap.fromTo(
          track,
          { x: 0 },
          {
            x: () => -getTravelX(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top+=170",
              end: () => section.dataset.horizontalEnd ?? `+=${Math.max(1200, getTravelX())}`,
              scrub: 1,
              pin: window.innerWidth >= 768,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          },
        );
      });

      const clipRevealItems = gsap.utils.toArray<HTMLElement>("[data-clip-reveal]");
      clipRevealItems.forEach((item) => {
        if (reducedMotion) return;

        gsap.to(item, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            once: true,
            invalidateOnRefresh: true,
          },
        });
      });

      const zoomItems = gsap.utils.toArray<HTMLElement>("[data-zoom-scroll]");
      zoomItems.forEach((item) => {
        if (reducedMotion) return;

        gsap.fromTo(
          item,
          { scale: 1.01 },
          {
            scale: isDesktop() ? 1.08 : 1.03,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      const marqueeTracks = gsap.utils.toArray<HTMLElement>("[data-marquee-track]");
      marqueeTracks.forEach((track) => {
        if (reducedMotion) return;

        const speed = Number(track.dataset.marqueeSpeed ?? "28");
        gsap.fromTo(
          track,
          { xPercent: 0 },
          {
            xPercent: -50,
            ease: "none",
            duration: speed,
            repeat: -1,
          },
        );
      });

      const sectionTitles = gsap.utils.toArray<HTMLElement>("[data-section-title]");
      sectionTitles.forEach((title) => {
        if (reducedMotion) return;

        gsap.fromTo(
          title,
          { autoAlpha: 0, y: 20, letterSpacing: "0.12em" },
          {
            autoAlpha: 1,
            y: 0,
            letterSpacing: "0.04em",
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: title,
              start: "top 92%",
              once: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      const panelContents = gsap.utils.toArray<HTMLElement>("[data-panel-content]");
      panelContents.forEach((panel) => {
        if (reducedMotion) return;

        const lines = panel.querySelectorAll("[data-panel-line]");

        gsap.fromTo(
          panel,
          {
            autoAlpha: 0,
            y: 56,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 82%",
              once: true,
              invalidateOnRefresh: true,
            },
          },
        );

        if (lines.length > 0) {
          gsap.fromTo(
            lines,
            {
              autoAlpha: 0,
              y: 28,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 80%",
                once: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      });

      const featureStages = gsap.utils.toArray<HTMLElement>("[data-feature-stage]");
      featureStages.forEach((stage) => {
        if (reducedMotion) return;

        const image = stage.querySelector<HTMLElement>("[data-feature-image]");
        const content = stage.querySelector<HTMLElement>("[data-feature-content]");

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.12, autoAlpha: 0.72 },
            {
              scale: 1,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: stage,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        if (content) {
          gsap.fromTo(
            content,
            { y: 54, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: stage,
                start: "top 70%",
                once: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      });

      const sections = gsap.utils.toArray<HTMLElement>("[data-section-id]");
      sections.forEach((section) => {
        const id = section.dataset.sectionId;
        if (!id) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            if (isActive) dispatch(setActiveSection(id));
          },
          onEnterBack: () => {
            if (isActive) dispatch(setActiveSection(id));
          },
        });
      });

      ScrollTrigger.refresh();
    });

    return () => {
      isActive = false;
      window.clearTimeout(delayedRefresh);
      window.removeEventListener("load", onLoad);
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, [dispatch, pathname]);

  return <>{children}</>;
}
