export const CONTACT_PAGE_DEFAULTS = {
  email: "info@uksresort.com",
  phone1: "+91 98220 12343",
  phone2: "+91 87798 14559",
  address1: "Old Mumbai - Pune Hwy",
  address2: "Khopoli, Maharashtra, India",
  secondaryEmail: "reservations@uksresort.com",
} as const;

export type ContactInfoItem = {
  title: "Address" | "Write us" | "Phone";
  lines: string[];
};
