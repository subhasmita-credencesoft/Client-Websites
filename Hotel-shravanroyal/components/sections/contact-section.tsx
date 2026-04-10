"use client";

import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { hotelInfo } from "@/data/hotel";
import { PLACEHOLDER_NOTICE, SECTION_IDS } from "@/lib/constants";
import type { ContactFormValues } from "@/types";

const initialValues: ContactFormValues = {
  name: "",
  phone: "",
  email: "",
  checkIn: "",
  checkOut: "",
  guests: "",
  message: "",
};

export function ContactSection() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const minCheckout = useMemo(() => values.checkIn || undefined, [values.checkIn]);

  const validate = () => {
    const nextErrors: Partial<Record<keyof ContactFormValues, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!values.phone.trim()) nextErrors.phone = "Please enter a contact number.";
    if (!values.email.trim()) nextErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = "Please enter a valid email address.";
    if (!values.checkIn) nextErrors.checkIn = "Select a check-in date.";
    if (!values.checkOut) nextErrors.checkOut = "Select a check-out date.";
    if (values.checkIn && values.checkOut && values.checkOut < values.checkIn) nextErrors.checkOut = "Check-out cannot be earlier than check-in.";
    if (!values.guests.trim()) nextErrors.guests = "Please enter number of guests.";
    if (!values.message.trim()) nextErrors.message = "Tell us a little about your stay plans.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    if (!validate()) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("success");
    setValues(initialValues);
    setErrors({});
  };

  const updateField = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  return (
    <section className="section-shell bg-secondary/35" id={SECTION_IDS.contact}>
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          <motion.div
            className="space-y-5 sm:space-y-6"
            initial={{ opacity: 0, x: -28, y: 24 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
          >
            <SectionHeading description="Share your stay requirements and the site is already structured for a future booking or CRM integration." eyebrow="Contact & Inquiry" title="Plan your Jaipur stay with a quick inquiry" />
            <Card className="border-border/60 bg-white/80">
              <CardContent className="space-y-4 p-5 sm:space-y-5 sm:p-6">
                <div className="flex items-start gap-3"><MapPin className="mt-1 h-5 w-5 text-primary" /><div><p className="font-semibold text-stone-900">Address</p><p className="text-sm text-muted-foreground">{hotelInfo.address}</p></div></div>
                <div className="flex items-start gap-3"><Phone className="mt-1 h-5 w-5 text-primary" /><div><p className="font-semibold text-stone-900">Phone</p><p className="text-sm text-muted-foreground">{hotelInfo.contactPhone}</p></div></div>
                <div className="flex items-start gap-3"><Mail className="mt-1 h-5 w-5 text-primary" /><div><p className="font-semibold text-stone-900">Email</p><p className="text-sm text-muted-foreground">{hotelInfo.contactEmail}</p></div></div>
                <div className="rounded-[1.5rem] bg-secondary/80 p-4 text-sm text-muted-foreground">{PLACEHOLDER_NOTICE}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28, y: 24 }}
            transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
          >
            <Card className="overflow-hidden border-border/60 bg-white/90 shadow-glow">
              <CardContent className="p-5 sm:p-6 lg:p-8">
                <form className="space-y-5" noValidate onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                    <div className="space-y-2"><label className="text-sm font-medium text-stone-800" htmlFor="name">Full Name</label><Input id="name" name="name" placeholder="Your name" value={values.name} onChange={(e) => updateField("name", e.target.value)} />{errors.name ? <p className="text-sm text-red-700">{errors.name}</p> : null}</div>
                    <div className="space-y-2"><label className="text-sm font-medium text-stone-800" htmlFor="phone">Phone</label><Input id="phone" name="phone" placeholder="Contact number" value={values.phone} onChange={(e) => updateField("phone", e.target.value)} />{errors.phone ? <p className="text-sm text-red-700">{errors.phone}</p> : null}</div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                    <div className="space-y-2"><label className="text-sm font-medium text-stone-800" htmlFor="email">Email</label><Input id="email" name="email" placeholder="you@example.com" type="email" value={values.email} onChange={(e) => updateField("email", e.target.value)} />{errors.email ? <p className="text-sm text-red-700">{errors.email}</p> : null}</div>
                    <div className="space-y-2"><label className="text-sm font-medium text-stone-800" htmlFor="guests">Guests</label><Input id="guests" min="1" name="guests" placeholder="2" type="number" value={values.guests} onChange={(e) => updateField("guests", e.target.value)} />{errors.guests ? <p className="text-sm text-red-700">{errors.guests}</p> : null}</div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                    <div className="space-y-2"><label className="text-sm font-medium text-stone-800" htmlFor="checkIn">Check-in Date</label><Input id="checkIn" name="checkIn" type="date" value={values.checkIn} onChange={(e) => updateField("checkIn", e.target.value)} />{errors.checkIn ? <p className="text-sm text-red-700">{errors.checkIn}</p> : null}</div>
                    <div className="space-y-2"><label className="text-sm font-medium text-stone-800" htmlFor="checkOut">Check-out Date</label><Input id="checkOut" min={minCheckout} name="checkOut" type="date" value={values.checkOut} onChange={(e) => updateField("checkOut", e.target.value)} />{errors.checkOut ? <p className="text-sm text-red-700">{errors.checkOut}</p> : null}</div>
                  </div>
                  <div className="space-y-2"><label className="text-sm font-medium text-stone-800" htmlFor="message">Message</label><Textarea id="message" name="message" placeholder="Tell us about your travel dates, preferences, or special requests." value={values.message} onChange={(e) => updateField("message", e.target.value)} />{errors.message ? <p className="text-sm text-red-700">{errors.message}</p> : null}</div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div aria-live="polite" className="text-sm text-muted-foreground">
                      {status === "success" ? "Inquiry submitted successfully. This demo currently simulates delivery for future API integration." : null}
                      {status === "error" && Object.keys(errors).length > 0 ? "Please fix the highlighted fields and try again." : null}
                    </div>
                    <Button className="w-full sm:min-w-[170px] sm:w-auto" size="lg" type="submit">
                      {status === "submitting" ? <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Sending...</span> : "Send Inquiry"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}