import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export const footerData = {
  brand: {
    title: "The Pune Resort.",
    description:
      "It's Your Day. Dedicated to crafting welcoming and unforgettable hospitality experiences for every traveler.",
  },
  quickLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms And Conditions", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
  contact: {
    email: " myresortspune@gmail.com",
    phone: " +91 9130583132",
    socialLinks: [
      { label: "Instagram", href: "#", icon: Instagram },
      { label: "Twitter", href: "#", icon: Twitter },
      { label: "Facebook", href: "#", icon: Facebook },
    ],
  },
  locations: [
    "Shirke's Holiday Home, Near Pawna Lake, Lonavala Road, Pune, Maharashtra 410406",
  ],
  legal: {
    copyright: "Copyright © 2026 credencesoft. All rights reserved.",
    locale: "US English",
  },
};

export const contactSectionData = [
  {
    title: "Email",
    value: "myresortspune@gmail.com",
    icon: Mail,
  },
  {
    title: "Phone",
    value: " +91 9130583132",
    icon: Phone,
  },
];
