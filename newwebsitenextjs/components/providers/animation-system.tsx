"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function AnimationSystem() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let isActive = true;
    const cleanups: Array<() => void> = [];
    let animationFrameId = 0;
    let nestedAnimationFrameId = 0;
    let initTimeoutId = 0;

    if (reducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const isDesktop = () => window.innerWidth >= 768;
    const refresh = () => ScrollTrigger.refresh();
    const delayedRefresh = window.setTimeout(refresh, 350);
    const onLoad = () => refresh();

    window.addEventListener("load", onLoad);

    let ctx: ReturnType<typeof gsap.context> | null = null;

    const initializeAnimations = () => {
      ctx = gsap.context(() => {
        const isOwnedByFeatureStage = (element: Element) =>
          Boolean(element.closest("[data-feature-stage]"));
        const hasScrollParallax = (element: HTMLElement) =>
          element.hasAttribute("data-bg-parallax") || element.hasAttribute("data-parallax");

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
        } else {
          gsap.set("[data-reveal]", {
            autoAlpha: 0,
            y: isDesktop() ? 36 : 22,
            scale: 0.996,
          });

          gsap.set("[data-reveal-child]", {
            autoAlpha: 0,
            y: isDesktop() ? 24 : 16,
          });

          // Keep nested content inside cards/panels visible unless it belongs to
          // an explicit reveal container. This prevents empty-looking cards.
          gsap.set("[data-card] [data-reveal-child], [data-panel-content] [data-reveal-child]", {
            clearProps: "all",
            autoAlpha: 1,
            y: 0,
          });

          gsap.set("[data-section-title]", {
            autoAlpha: 0,
            y: 20,
            letterSpacing: "0.12em",
          });

          gsap.set("[data-panel-content]", {
            autoAlpha: 0,
            y: 56,
          });

          gsap.set("[data-panel-line]", {
            autoAlpha: 0,
            y: 28,
          });
        }

        const revealItems = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        revealItems.forEach((item, index) => {
          if (reducedMotion) return;

          const revealChildren = item.querySelectorAll("[data-reveal-child]");

          gsap.fromTo(
            item,
            {
              autoAlpha: 0,
              y: isDesktop() ? 36 : 22,
              scale: 0.996,
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.68,
              ease: "power2.out",
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
                y: isDesktop() ? 24 : 16,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.56,
                stagger: 0.08,
                delay: 0.12,
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
            y: isDesktop() ? 34 : 22,
            scale: 0.985,
            rotateX: 1.2,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.62,
            ease: "power2.out",
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
            rotateY: px * 4.2,
            rotateX: py * -4.2,
            y: -3,
            duration: 0.18,
            ease: "power2.out",
            overwrite: "auto",
          });

          if (image) {
            gsap.to(image, {
              xPercent: px * 1.2,
              yPercent: py * 1.2,
              scale: 1.016,
              duration: 0.22,
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
            duration: 0.22,
            ease: "power3.out",
            overwrite: "auto",
          });

          if (image) {
            gsap.to(image, {
              xPercent: 0,
              yPercent: 0,
              scale: 1,
              duration: 0.22,
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
              duration: 0.52,
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
        if (hasScrollParallax(image) || isOwnedByFeatureStage(image)) return;

        gsap.fromTo(
          image,
          { scale: 1.02, yPercent: -1.1 },
          {
            scale: 1.035,
            yPercent: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: image.parentElement ?? image,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.24,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      const parallaxItems = gsap.utils.toArray<HTMLElement>("[data-parallax]");
      parallaxItems.forEach((item) => {
        if (reducedMotion) return;

        const rawDepth = Number(item.dataset.parallaxDepth ?? "18");
        const depth = isDesktop() ? Math.min(rawDepth, 7) : Math.max(3, Math.round(rawDepth * 0.2));
        const startY = isDesktop() ? -Math.max(4, depth * 0.55) : -Math.max(2, depth * 0.4);
        const endY = isDesktop() ? Math.max(5, depth * 0.7) : Math.max(3, depth * 0.48);
        const startScale = isDesktop() ? 1.04 : 1.03;
        const endScale = isDesktop() ? 1.06 : 1.04;

        gsap.set(item, {
          transformPerspective: 1200,
          transformOrigin: "center center",
          willChange: "transform",
          force3D: true,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        });

        gsap.fromTo(
          item,
          {
            yPercent: startY,
            scale: startScale,
            rotateX: isDesktop() ? 1.4 : 0.5,
            rotateY: isDesktop() ? -1.2 : -0.35,
            z: isDesktop() ? -10 : -4,
          },
          {
            yPercent: endY,
            scale: endScale,
            rotateX: isDesktop() ? -1.4 : -0.5,
            rotateY: isDesktop() ? 1.2 : 0.35,
            z: isDesktop() ? 10 : 4,
            ease: "none",
            scrollTrigger: {
              trigger: item.parentElement ?? item,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.28,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      const bgParallaxItems = gsap.utils.toArray<HTMLElement>("[data-bg-parallax]");
      bgParallaxItems.forEach((item) => {
        if (reducedMotion) return;
        if (isOwnedByFeatureStage(item) && item.hasAttribute("data-feature-image")) return;

        if (item.hasAttribute("data-hero-media")) {
          gsap.set(item, {
            transformPerspective: 1800,
            transformOrigin: "center center",
            willChange: "transform",
            force3D: true,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          });

          gsap.fromTo(
            item,
            {
              yPercent: -2.8,
              scale: isDesktop() ? 1.05 : 1.03,
              rotateX: isDesktop() ? 1.2 : 0.45,
              rotateY: isDesktop() ? -0.9 : -0.25,
              z: isDesktop() ? -14 : -5,
            },
            {
              yPercent: 3.5,
              scale: isDesktop() ? 1.08 : 1.04,
              rotateX: isDesktop() ? -1.2 : -0.45,
              rotateY: isDesktop() ? 0.9 : 0.25,
              z: isDesktop() ? 14 : 5,
              ease: "none",
              scrollTrigger: {
                trigger: item.parentElement ?? item,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.3,
                invalidateOnRefresh: true,
              },
            },
          );

          return;
        }

        const rawDepth = Number(item.dataset.bgDepth ?? "12");
        const depth = isDesktop() ? Math.min(rawDepth, 6) : Math.max(2, Math.round(rawDepth * 0.18));
        const startY = isDesktop() ? -Math.max(3, depth * 0.45) : -Math.max(2, depth * 0.35);
        const endY = isDesktop() ? Math.max(4, depth * 0.55) : Math.max(2, depth * 0.4);

        gsap.set(item, {
          transformPerspective: 1400,
          transformOrigin: "center center",
          willChange: "transform",
          force3D: true,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        });

        gsap.fromTo(
          item,
          {
            yPercent: startY,
            scale: isDesktop() ? 1.03 : 1.02,
            rotateX: isDesktop() ? 0.7 : 0.24,
            rotateY: isDesktop() ? -0.45 : -0.14,
            z: isDesktop() ? -5 : -2,
          },
          {
            yPercent: endY,
            scale: isDesktop() ? 1.05 : 1.03,
            rotateX: isDesktop() ? -0.7 : -0.24,
            rotateY: isDesktop() ? 0.45 : 0.14,
            z: isDesktop() ? 5 : 2,
            ease: "none",
            scrollTrigger: {
              trigger: item.parentElement ?? item,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.26,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      const cinematicSections = gsap.utils.toArray<HTMLElement>("[data-cinematic-section]");
      cinematicSections.forEach((section) => {
        if (reducedMotion) return;

        const mediaItems = section.querySelectorAll<HTMLElement>("[data-cinematic-media]");
        const copyItems = section.querySelectorAll<HTMLElement>("[data-cinematic-copy]");
        const glowItems = section.querySelectorAll<HTMLElement>("[data-cinematic-glow]");
        const cinematicCards = section.querySelectorAll<HTMLElement>("[data-cinematic-card]");

        mediaItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            {
              yPercent: -1 - index * 0.4,
              rotateZ: index % 2 === 0 ? -0.2 : 0.2,
              scale: 1.02,
            },
            {
              yPercent: 1.6 + index * 0.5,
              rotateZ: index % 2 === 0 ? 0.2 : -0.2,
              scale: 1.04,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.26,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        copyItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { y: 14 + index * 4, autoAlpha: 0.96 },
            {
              y: -8 - index * 2,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 92%",
                end: "bottom top",
                scrub: 0.18,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        glowItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { autoAlpha: 0.18, scale: 0.9 + index * 0.03, yPercent: -4 },
            {
              autoAlpha: 0.48,
              scale: 1.02 + index * 0.03,
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.28,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        cinematicCards.forEach((item, index) => {
          gsap.fromTo(
            item,
            {
              y: 10 + index * 5,
              rotateX: index % 2 === 0 ? 0.8 : -0.8,
              rotateY: index % 2 === 0 ? -1 : 1,
            },
            {
              y: -8 - index * 2,
              rotateX: index % 2 === 0 ? -0.55 : 0.55,
              rotateY: index % 2 === 0 ? 0.75 : -0.75,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.24,
                invalidateOnRefresh: true,
              },
            },
          );
        });
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
          { scale: 1.005 },
          {
            scale: isDesktop() ? 1.04 : 1.02,
            ease: "none",
            scrollTrigger: {
              trigger: item.parentElement ?? item,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.28,
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
            { scale: 1.08, autoAlpha: 1 },
            {
              scale: 1,
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

        const nestedRevealItems = stage.querySelectorAll<HTMLElement>("[data-reveal]");
        nestedRevealItems.forEach((item) => gsap.set(item, { clearProps: "opacity,visibility,transform,filter,clipPath" }));
      });

      const stickyFadeSections = gsap.utils.toArray<HTMLElement>("[data-sticky-fade-section]");
      stickyFadeSections.forEach((section) => {
        if (reducedMotion || !isDesktop()) return;

        const heading = section.querySelector<HTMLElement>("[data-sticky-fade-heading]");
        const blocks = gsap.utils.toArray<HTMLElement>("[data-sticky-fade-block]", section);
        const lines = gsap.utils.toArray<HTMLElement>("[data-sticky-fade-line]", section);

        if (heading) {
          gsap.to(heading, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: heading,
              start: "top 8%",
              end: "bottom 6%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }

        blocks.forEach((block) => {
          gsap.to(block, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top 8%",
              end: "bottom 6%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });

        lines.forEach((line) => {
          gsap.fromTo(
            line,
            {
              y: 40,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: line,
                start: "top 85%",
                end: "bottom 72%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      });

        ScrollTrigger.refresh();
      });
    };

    initTimeoutId = window.setTimeout(() => {
      animationFrameId = window.requestAnimationFrame(() => {
        nestedAnimationFrameId = window.requestAnimationFrame(() => {
          if (!isActive) return;
          initializeAnimations();
        });
      });
    }, 80);

    return () => {
      isActive = false;
      window.clearTimeout(initTimeoutId);
      window.clearTimeout(delayedRefresh);
      window.cancelAnimationFrame(animationFrameId);
      window.cancelAnimationFrame(nestedAnimationFrameId);
      window.removeEventListener("load", onLoad);
      cleanups.forEach((cleanup) => cleanup());
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
