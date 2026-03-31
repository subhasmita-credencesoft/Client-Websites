import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";
import { siteContact, siteLegalLinks } from "@/data/site";

export const footerData = {
  brand: {
    title: "The Pune Resort.",
    description:
      "It's Your Day. Dedicated to crafting welcoming and unforgettable hospitality experiences for every traveler.",
  },
  quickLinks: [
    { label: "Privacy Policy", href: siteLegalLinks.privacyPolicy },
    { label: "Terms And Conditions", href: siteLegalLinks.termsAndConditions },
    { label: "Refund Policy", href: siteLegalLinks.refundPolicy },
  ],
  contact: {
    email: siteContact.email,
    phone: siteContact.phoneDisplay,
    socialLinks: [
      { label: "Instagram", href: "#", icon: Instagram },
      { label: "Twitter", href: "#", icon: Twitter },
      { label: "Facebook", href: "#", icon: Facebook },
    ],
  },
  locations: [
    siteContact.address,
  ],
  legal: {
    copyright: "Copyright © 2026 credencesoft. All rights reserved.",
    locale: "US English",
  },
};

export const contactSectionData = [
  {
    title: "Email",
    value: siteContact.email,
    icon: Mail,
  },
  {
    title: "Phone",
    value: siteContact.phoneDisplay,
    icon: Phone,
  },
];
