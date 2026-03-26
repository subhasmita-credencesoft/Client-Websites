export const navigationData = {
  brand: {
    name: "The Pune Resort",
    tagline: "It's Your Day",
  },
  links: [
    { label: "About", href: "/about" },
    { label: "Our Properties", href: "/properties" },
    {
      label: "Packages",
      href: "/packages/resort",
      children: [
        { label: "Resort", href: "/packages/resort" },
        { label: "Private Villa", href: "/packages/private-villa" },
      ],
    },
    { label: "Guest Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ],
  mobileCtaLabel: "WhatsApp",
};

export const stickySidebarData = [
  { label: "Contact Us", href: "#", colorClass: "bg-[#2D3A45] hover:bg-[#1a2229]", type: "mail" },
  { label: "WhatsApp", href: "#", colorClass: "bg-[#25D366] hover:bg-[#1ebd59]", type: "message" },
  { label: "Call Us", href: "#", colorClass: "bg-[#4EA699] hover:bg-[#3d8c80]", type: "phone" },
] as const;
