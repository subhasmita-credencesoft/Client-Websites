"use client";

import { RefObject, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

export function useSplitText(ref: RefObject<HTMLElement>, delay = 0) {
  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) {
      return;
    }

    const text = node.dataset.originalText ?? node.textContent ?? "";
    node.dataset.originalText = text;
    node.innerHTML = text
      .split("")
      .map((char, index) =>
        `<span class="split-char" style="display:inline-block;white-space:pre;will-change:transform;transition-delay:${index * 0.02}s">${char === " " ? "&nbsp;" : char}</span>`
      )
      .join("");

    const chars = node.querySelectorAll(".split-char");
    gsap.set(chars, { yPercent: 110, opacity: 0 });
    gsap.to(chars, {
      yPercent: 0,
      opacity: 1,
      delay,
      stagger: 0.03,
      duration: 0.9
    });

    return () => {
      node.textContent = text;
    };
  }, [ref, delay]);
}
