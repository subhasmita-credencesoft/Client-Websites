import type { PropertyApiResponse } from "../../types/property";

export type FooterSocialItem = {
  label: "Facebook" | "Instagram" | "Twitter" | "YouTube";
  href: string;
  icon: "facebook" | "instagram" | "twitter" | "youtube";
};

export type FooterQuickLink = {
  label: "Blog" | "Website" | "About Us" | "Contact";
  href: string;
};

export const TRIPADVISOR_URL =
  "https://www.tripadvisor.in/Hotel_Review-g1568568-d4609539-Reviews-UK_s_Resort_Khopoli-Khopoli_Raigad_District_Maharashtra.html";

export const FOOTER_INSTAGRAM_FALLBACK =
  "https://www.instagram.com/uksresortkhopoli/";

export function buildFooterSocialLinks(
  property?: PropertyApiResponse | null,
): FooterSocialItem[] {
  const socialLinks = property?.socialMediaLinks?.[0];

  return [
    {
      label: "Facebook" as const,
      href: socialLinks?.facebook || "",
      icon: "facebook" as const,
    },
    {
      label: "Instagram" as const,
      href: socialLinks?.instagram || FOOTER_INSTAGRAM_FALLBACK,
      icon: "instagram" as const,
    },
    {
      label: "Twitter" as const,
      href: socialLinks?.twitter || "",
      icon: "twitter" as const,
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
    { label: "Blog", href: "/experiences" },
    { label: "Website", href: website || "#" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
}