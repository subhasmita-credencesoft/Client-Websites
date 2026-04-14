export type ButtonVariant = "primary" | "secondary" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export type AppLinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterSection = AppLinkItem[];

export type PerformanceMetricPayload = {
  name: string;
  value: number;
  rating?: "good" | "needs-improvement" | "poor";
  id: string;
  label?: string;
};
