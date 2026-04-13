"use client";

import { RefObject } from "react";
import { useInView } from "framer-motion";

export function useInViewAnimation(ref: RefObject<Element>, once = true) {
  return useInView(ref, { once, margin: "-10% 0px -10% 0px" });
}
