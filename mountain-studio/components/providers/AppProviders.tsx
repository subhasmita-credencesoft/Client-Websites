"use client";

import { PropsWithChildren } from "react";
import { Preloader } from "@/components/ui/Preloader";
import { PreloaderProvider } from "@/components/providers/PreloaderProvider";
import { PageTransition } from "@/components/layout/PageTransition";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <PreloaderProvider>
      <Preloader />
      <PageTransition>{children}</PageTransition>
    </PreloaderProvider>
  );
}
