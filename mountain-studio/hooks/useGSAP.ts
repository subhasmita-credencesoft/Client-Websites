"use client";

import { DependencyList, RefObject, useEffect } from "react";
import { createGSAPContext } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

export function useGSAP(
  scope: RefObject<Element> | Element | null,
  callback: () => void,
  deps: DependencyList = []
) {
  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const ctx = createGSAPContext(scope, callback);
    return () => ctx.revert();
  }, deps);
}
