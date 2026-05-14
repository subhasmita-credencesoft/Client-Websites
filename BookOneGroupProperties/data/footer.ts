import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { siteContact, siteLegalLinks } from "@/data/site";

export const footerData = {
  brand: {
    title: " Tripdip.",
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
      { 
        label: "Instagram", 
        href: "https://www.instagram.com/tripdip", 
        icon: Instagram 
      },
      { 
        label: "Facebook", 
        href: "https://www.facebook.com/tripdip", 
        icon: Facebook 
      },
    ],
  },
  locations: [
    siteContact.address,
  ],
  legal: {
    copyright: "Designed and Developed by CredenceSoft and Powered By BookOne",
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
