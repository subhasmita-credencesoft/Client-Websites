"use client";

import type { ReactNode } from "react";
import { ClientEnhancements } from "./client-enhancements";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <>
      {children}
      <ClientEnhancements />
    </>
  );
}
