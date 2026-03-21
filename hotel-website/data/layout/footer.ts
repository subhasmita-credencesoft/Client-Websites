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

export const FOOTER_SOCIAL_LINKS: FooterSocialItem[] = [
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Twitter", href: "#", icon: "twitter" },
  { label: "YouTube", href: "#", icon: "youtube" },
];

export function buildFooterQuickLinks(website?: string | null): FooterQuickLink[] {
  return [
    { label: "Blog", href: "/experiences" },
    { label: "Website", href: website || "#" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
}
