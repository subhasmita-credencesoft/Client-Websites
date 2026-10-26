export type NavSubItem = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  hasSubmenu?: boolean;
  subItems?: NavSubItem[];
};

export type FooterNavItem = {
  label: string;
  href: string;
  testId?: string;
};

export type FooterNavGroup = {
  label: string;
  items: FooterNavItem[];
};
