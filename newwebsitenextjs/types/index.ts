export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type CardVariant = "default" | "subtle" | "emphasis";
export type InputVariant = "default" | "error";

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
