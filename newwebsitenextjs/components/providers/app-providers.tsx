"use client";

import type { ReactNode } from "react";
import { AnimationSystem } from "./animation-system";
import { ReduxProvider } from "./redux-provider";
import { SmoothScrollProvider } from "./smooth-scroll-provider";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ReduxProvider>
      <SmoothScrollProvider>
        <AnimationSystem>
          {children}
        </AnimationSystem>
      </SmoothScrollProvider>
    </ReduxProvider>
  );
}
