import { siteContact } from "@/data/site";

interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const navigationData: {
  brand: { name: string; tagline: string };
  links: NavLink[];
  mobileCtaLabel: string;
} = {
  brand: {
    name: "TripDip",
    tagline: "It's Your Day",
  },
  links: [
    { label: "About", href: "/about" },
    { label: "Our Properties", href: "/properties" },
    { label: "Restaurant", href: "/restaurant" },
    // {
    //   label: "Packages",
    //   href: "/packages/resort",
    //   children: [
    //     { label: "Resort", href: "/packages/resort" },
    //     { label: "Private Villa", href: "/packages/private-villa" },
    //   ],
    // },
    { label: "Guest Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ],
  mobileCtaLabel: "WhatsApp",
};

export const stickySidebarData = [
  { label: "Contact Us", href: `mailto:${siteContact.email}`, colorClass: "bg-[#2D3A45] hover:bg-[#1a2229]", type: "mail" },
  { label: "WhatsApp", href: siteContact.whatsappHref, colorClass: "bg-[#25D366] hover:bg-[#1ebd59]", type: "message" },
  { label: "Call Us", href: siteContact.phoneHref, colorClass: "bg-[#4EA699] hover:bg-[#3d8c80]", type: "phone" },
] as const;
