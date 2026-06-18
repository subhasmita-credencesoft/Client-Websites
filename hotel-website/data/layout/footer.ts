import type { PropertyApiResponse } from "../../types/property";

export type FooterSocialItem = {
  label: "Facebook" | "Instagram" | "Twitter" | "YouTube" | "LinkedIn";
  href: string;
  icon: "facebook" | "instagram" | "twitter" | "youtube" | "linkedin";
};

export type FooterQuickLink = {
  label: string;
  href: string;
};
export const FOOTER_FACEBOOK_FALLBACK =
  "https://www.facebook.com/UKsResort/?ref=hl";

export const FOOTER_INSTAGRAM_FALLBACK =
  "https://www.instagram.com/uksresortkhopoli/";

export const FOOTER_TWITTER_FALLBACK =
  "https://twitter.com/uksresort";

export const FOOTER_LINKEDIN_FALLBACK =
  "https://www.linkedin.com/company/uks-resort-khopoli/";

export function buildFooterSocialLinks(
  property?: PropertyApiResponse | null,
): FooterSocialItem[] {
  const socialLinks = property?.socialMediaLinks?.[0];

  return [
    {
      label: "Facebook" as const,
      href: socialLinks?.facebook || FOOTER_FACEBOOK_FALLBACK,
      icon: "facebook" as const,
    },
    {
      label: "Instagram" as const,
      href: socialLinks?.instagram || FOOTER_INSTAGRAM_FALLBACK,
      icon: "instagram" as const,
    },
    {
      label: "Twitter" as const,
      href: socialLinks?.twitter || FOOTER_TWITTER_FALLBACK,
      icon: "twitter" as const,
    },
    {
      label: "LinkedIn" as const,
      href: socialLinks?.linkedin || FOOTER_LINKEDIN_FALLBACK,
      icon: "linkedin" as const,
    },
    {
      label: "YouTube" as const,
      href: socialLinks?.youtube || "",
      icon: "youtube" as const,
    },
  ].filter((item) => item.href);
}

export function buildFooterQuickLinks(website?: string | null): FooterQuickLink[] {
  return [
    { label: "Home", href: "/" },
    { label: "Rooms", href: "/rooms" },
    { label: "Dining", href: "/dining" },
    { label: "Picnic", href: "/picnic" },
    { label: "Events", href: "/events" },
    { label: "Experiences", href: "/experiences" },
    { label: "Tariff", href: "/tariffs" },
    { label: "Reservation", href: "/rooms/reservation" },
    { label: "Around Us", href: "/around-us" },
    { label: "Contact", href: "/contact" },
  ];
}