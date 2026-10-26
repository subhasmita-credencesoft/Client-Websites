import { z } from "zod";

// All validation runs in the browser — the site has no server or API.
const phone = z
  .string({ required_error: "Enter your phone number" })
  .trim()
  .min(7, "Enter a valid phone number")
  .max(20, "Enter a valid phone number")
  .regex(/^[+()\-\s\d]+$/, "Use digits, spaces, + or - only");

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid date");

export const enquiryTypes = ["general", "event", "meeting", "booking-request"] as const;
export type EnquiryType = (typeof enquiryTypes)[number];

export const enquirySchema = z
  .object({
    type: z.enum(enquiryTypes),
    name: z.string({ required_error: "Please enter your full name" }).trim().min(2, "Please enter your full name").max(100),
    email: z.string({ required_error: "Enter your email address" }).trim().email("Enter a valid email address").max(160),
    phone,
    message: z.string().trim().max(2000, "Please keep your message under 2000 characters").optional().default(""),
    eventType: z.string().trim().max(60).optional(),
    eventDate: isoDate.optional(),
    guestCount: z.coerce.number().int().min(1, "Enter at least 1 guest").max(5000).optional(),
    checkIn: isoDate.optional(),
    checkOut: isoDate.optional(),
    adults: z.coerce.number().int().min(1).max(12).optional(),
    children: z.coerce.number().int().min(0).max(12).optional(),
    roomName: z.string().trim().max(80).optional(),
  })
  .superRefine((v, ctx) => {
    if ((v.type === "event" || v.type === "meeting") && !v.eventDate) {
      ctx.addIssue({ code: "custom", path: ["eventDate"], message: "Choose your event date" });
    }
    if (v.type === "general" && !v.message) {
      ctx.addIssue({ code: "custom", path: ["message"], message: "Please tell us how we can help" });
    }
    if (v.type === "booking-request") {
      if (!v.checkIn || !v.checkOut) ctx.addIssue({ code: "custom", path: ["checkIn"], message: "Stay dates are missing — go back and choose dates" });
      else if (v.checkOut <= v.checkIn) ctx.addIssue({ code: "custom", path: ["checkOut"], message: "Check-out must be after check-in" });
    }
  });

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const searchSchema = z.object({
  checkIn: isoDate,
  checkOut: isoDate,
  adults: z.coerce.number().int().min(1).max(12),
  children: z.coerce.number().int().min(0).max(12).default(0),
});
export type SearchParams = z.infer<typeof searchSchema>;
