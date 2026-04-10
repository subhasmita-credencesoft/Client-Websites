"use client";

import { useSearchParams } from "next/navigation";
import { CalendarRange, Loader2, Mail, MapPin, Phone, Users } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

import { Container } from "@/components/shared/container";
import { CtaButton } from "@/components/shared/cta-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { hotelInfo } from "@/data/hotel";
import { SECTION_IDS } from "@/lib/constants";
import type { ContactFormValues } from "@/types";

interface BookingPageProps {
  initialValues: Pick<ContactFormValues, "checkIn" | "checkOut" | "guests">;
}

export function BookingPage({ initialValues }: BookingPageProps) {
  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    phone: "",
    email: "",
    checkIn: initialValues.checkIn,
    checkOut: initialValues.checkOut,
    guests: initialValues.guests,
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const guests = searchParams.get("guests");

    setValues((current) => ({
      ...current,
      checkIn: checkIn ?? current.checkIn,
      checkOut: checkOut ?? current.checkOut,
      guests: guests ?? current.guests,
    }));
  }, [searchParams]);

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
  };

  const updateField = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  return (
    <main className="pb-16 pt-4 sm:pb-20 sm:pt-6">
      <section className="section-shell pb-10 pt-8 sm:pt-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-8">
            <div className="space-y-5 sm:space-y-6">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                <CalendarRange className="h-4 w-4 shrink-0" />
                Booking Page
              </div>
              <SectionHeading
                eyebrow="Reserve Your Stay"
                title="Complete your booking request"
                description="Choose your stay dates, share your contact details, and send a booking inquiry from one dedicated page."
              />
              <Card className="border-border/60 bg-white/90">
                <CardContent className="space-y-5 p-5 sm:p-6">
                  <div className="rounded-[1.5rem] bg-secondary/70 p-4 sm:p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-primary/75">Selected Stay</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Check-in</p>
                        <p className="mt-2 break-words font-semibold text-stone-900">{values.checkIn || "Select date"}</p>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Check-out</p>
                        <p className="mt-2 break-words font-semibold text-stone-900">{values.checkOut || "Select date"}</p>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Guests</p>
                        <p className="mt-2 font-semibold text-stone-900">{values.guests || "Add guests"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <div className="flex items-start gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" /><span>{hotelInfo.address}</span></div>
                    <div className="flex items-start gap-3"><Phone className="mt-1 h-4 w-4 shrink-0 text-primary" /><span>{hotelInfo.contactPhone}</span></div>
                    <div className="flex items-start gap-3"><Mail className="mt-1 h-4 w-4 shrink-0 text-primary" /><span className="break-all">{hotelInfo.contactEmail}</span></div>
                    <div className="flex items-start gap-3"><Users className="mt-1 h-4 w-4 shrink-0 text-primary" /><span>Suitable for families, couples, and business visitors.</span></div>
                  </div>
                  <CtaButton className="w-full justify-center sm:w-auto" href={`/#${SECTION_IDS.home}`} label="Back To Homepage" variant="outline" />
                </CardContent>
              </Card>
            </div>

            <Card className="overflow-hidden border-border/60 bg-white/95 shadow-glow">
              <CardContent className="p-5 sm:p-8">
                <form className="space-y-5" noValidate onSubmit={handleSubmit}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2"><label className="text-sm font-medium text-stone-800" htmlFor="booking-name">Full Name</label><Input id="booking-name" name="name" placeholder="Your name" value={values.name} onChange={(e) => updateField("name", e.target.value)} />{errors.name ? <p className="text-sm text-red-700">{errors.name}</p> : null}</div>
                    <div className="space-y-2"><label className="text-sm font-medium text-stone-800" htmlFor="booking-phone">Phone</label><Input id="booking-phone" name="phone" placeholder="Contact number" value={values.phone} onChange={(e) => updateField("phone", e.target.value)} />{errors.phone ? <p className="text-sm text-red-700">{errors.phone}</p> : null}</div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2"><label className="text-sm font-medium text-stone-800" htmlFor="booking-email">Email</label><Input id="booking-email" name="email" placeholder="you@example.com" type="email" value={values.email} onChange={(e) => updateField("email", e.target.value)} />{errors.email ? <p className="text-sm break-words text-red-700">{errors.email}</p> : null}</div>
                    <div className="space-y-2"><label className="text-sm font-medium text-stone-800" htmlFor="booking-guests">Guests</label><Input id="booking-guests" min="1" name="guests" placeholder="1" type="number" value={values.guests} onChange={(e) => updateField("guests", e.target.value)} />{errors.guests ? <p className="text-sm text-red-700">{errors.guests}</p> : null}</div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2"><label className="text-sm font-medium text-stone-800" htmlFor="booking-checkin">Check-in Date</label><Input id="booking-checkin" name="checkIn" type="date" value={values.checkIn} onChange={(e) => updateField("checkIn", e.target.value)} />{errors.checkIn ? <p className="text-sm text-red-700">{errors.checkIn}</p> : null}</div>
                    <div className="space-y-2"><label className="text-sm font-medium text-stone-800" htmlFor="booking-checkout">Check-out Date</label><Input id="booking-checkout" min={minCheckout} name="checkOut" type="date" value={values.checkOut} onChange={(e) => updateField("checkOut", e.target.value)} />{errors.checkOut ? <p className="text-sm text-red-700">{errors.checkOut}</p> : null}</div>
                  </div>
                  <div className="space-y-2"><label className="text-sm font-medium text-stone-800" htmlFor="booking-message">Message</label><Textarea id="booking-message" name="message" placeholder="Tell us about your travel dates, room preference, or any special request." value={values.message} onChange={(e) => updateField("message", e.target.value)} />{errors.message ? <p className="text-sm text-red-700">{errors.message}</p> : null}</div>
                  <div className="flex flex-col gap-4 sm:items-start">
                    <div aria-live="polite" className="text-sm text-muted-foreground">
                      {status === "success" ? "Booking inquiry submitted successfully. This demo currently simulates delivery for future API integration." : null}
                      {status === "error" && Object.keys(errors).length > 0 ? "Please fix the highlighted fields and try again." : null}
                    </div>
                    <Button className="w-full sm:min-w-[190px] sm:w-auto" size="lg" type="submit">
                      {status === "submitting" ? <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Sending...</span> : "Submit Booking"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </main>
  );
}
