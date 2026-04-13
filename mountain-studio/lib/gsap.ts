"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

let pluginsRegistered = false;

export function setupGSAP() {
  if (pluginsRegistered || typeof window === "undefined") {
    return gsap;
  }

  gsap.registerPlugin(ScrollTrigger, TextPlugin);
  gsap.defaults({ ease: "power3.out", duration: 1 });
  ScrollTrigger.defaults({
    markers: false,
    start: "top 85%"
  });
  pluginsRegistered = true;
  return gsap;
}

export function createGSAPContext(scope: RefObject<Element> | Element | null, callback: () => void) {
  setupGSAP();
  return gsap.context(callback, scope ?? undefined);
}

export { gsap, ScrollTrigger };
