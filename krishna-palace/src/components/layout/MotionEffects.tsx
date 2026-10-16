'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = gsap.context(() => {
      if (reducedMotion) return;

      const scenes = gsap.utils.toArray<HTMLElement>('.cinematic-hero');
      scenes.forEach((scene) => {
        const pin = scene.querySelector<HTMLElement>('.cinematic-pin');
        const afterPhoto = scene.querySelector<HTMLElement>('.cinematic-photo--after');
        const firstCopy = scene.querySelector<HTMLElement>('.cinematic-copy--first');
        const secondCopy = scene.querySelector<HTMLElement>('.cinematic-copy--second');
        const progress = scene.querySelector<HTMLElement>('.cinematic-progress span');
        const progressTrack = scene.querySelector<HTMLElement>('.cinematic-progress');
        const scrollCue = scene.querySelector<HTMLElement>('.cinematic-scroll-cue');
        const indexCue = scene.querySelector<HTMLElement>('.cinematic-index');

        if (!pin || !afterPhoto || !firstCopy || !secondCopy || !progress) return;

        gsap.set(afterPhoto, { clipPath: 'inset(0 100% 0 0)' });
        gsap.set(firstCopy, { opacity: 1, y: 0 });
        gsap.set(secondCopy, { y: 26, opacity: 0 });
        gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });
        if (scrollCue) gsap.set(scrollCue, { opacity: 1, y: 0 });
        if (progressTrack) gsap.set(progressTrack, { opacity: 1 });
        if (indexCue) gsap.set(indexCue, { opacity: 1 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: scene,
            start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * 1.35)}`,
            pin,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Immediately fade out scroll cue as soon as scroll begins
        if (scrollCue) {
          timeline.to(scrollCue, { opacity: 0, y: -12, duration: 0.12, ease: 'power1.out' }, 0);
        }

        // 2. Wipe afterPhoto and fade out first copy
        timeline
          .to(firstCopy, { y: -36, opacity: 0, ease: 'power1.in', duration: 0.28 }, 0.06)
          .to(afterPhoto, { clipPath: 'inset(0 0% 0 0)', ease: 'none', duration: 0.55 }, 0.1)
          .to(progress, { scaleX: 1, ease: 'none', duration: 0.8 }, 0)
          // 3. Fade in second copy
          .to(secondCopy, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.32 }, 0.38)
          // 4. As user finishes sequence, gracefully exit second copy, progress bar, and index before unpin
          .to(secondCopy, { y: -24, opacity: 0, ease: 'power1.in', duration: 0.16 }, 0.82);

        const bottomFades = [progressTrack, indexCue].filter(Boolean) as HTMLElement[];
        if (bottomFades.length) {
          timeline.to(bottomFades, { opacity: 0, duration: 0.14, ease: 'power1.out' }, 0.84);
        }
      });

      const route = document.querySelector<HTMLElement>('.regional-route');
      const routePath = route?.querySelector<SVGPathElement>('.regional-route__line');
      if (route && routePath) {
        const length = routePath.getTotalLength();
        gsap.set(routePath, { strokeDasharray: length, strokeDashoffset: length });
        const routeTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: route,
            start: 'top 72%',
            end: 'bottom 68%',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        routeTimeline.to(routePath, { strokeDashoffset: 0, ease: 'none', duration: 1 });
        routeTimeline.fromTo(route.querySelectorAll('.regional-route__stop'), { opacity: 0.25, scale: 0.78 }, {
          opacity: 1, scale: 1, duration: 0.3, stagger: 0.08, ease: 'power1.out',
        }, 0.16);
        routeTimeline.fromTo(route.querySelectorAll('.regional-route__label'), { opacity: 0.35, y: 7 }, {
          opacity: 1, y: 0, duration: 0.25, stagger: 0.08, ease: 'power1.out',
        }, 0.2);
      }

      const reveals = gsap.utils.toArray<HTMLElement>('.section, .callout, .room-card, .destination-card, .editorial-image, .split-feature');
      reveals.forEach((item) => {
        gsap.fromTo(item, { y: 24, opacity: 0.72 }, {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 88%', once: true },
        });
      });
    });

    if (reducedMotion) return () => context.revert();

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.85, syncTouch: false });
    const updateScroll = () => ScrollTrigger.update();
    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', updateScroll);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const refresh = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    const refreshTimeout = window.setTimeout(() => ScrollTrigger.refresh(), 150);

    return () => {
      window.cancelAnimationFrame(refresh);
      window.clearTimeout(refreshTimeout);
      lenis.off('scroll', updateScroll);
      lenis.destroy();
      gsap.ticker.remove(tick);
      context.revert();
    };
  }, [pathname]);

  return null;
}
