"use client";

import { useMemo, useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { packages } from "@/lib/site-data";
import { formatPrice } from "@/lib/format";

const steps = ["Event Details", "Preferences", "Guest Details", "Additional Info"];

export function BookingPlanner() {
  const [step, setStep] = useState(0);
  const [guestCount, setGuestCount] = useState(100);
  const [days, setDays] = useState(2);
  const [plan, setPlan] = useState(packages[1].slug);

  const selected = packages.find((item) => item.slug === plan) ?? packages[1];
  const subtotal = guestCount * selected.weekendPrice * days;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const stepContent = useMemo(() => {
    if (step === 0) {
      return (
        <div className="grid gap-5 md:grid-cols-2">
          <Select
            label="Event Type"
            name="eventType"
            options={[
              { label: "Destination Wedding", value: "destination-wedding" },
              { label: "Reception", value: "reception" },
              { label: "Engagement / Family Event", value: "family-event" },
            ]}
          />
          <Input label="Check-in Date" name="checkIn" type="date" />
          <Input label="Check-out Date" name="checkOut" type="date" />
          <Input
            label="Guest Count"
            name="guestCount"
            type="number"
            defaultValue={String(guestCount)}
            onChange={(event) => setGuestCount(Number(event.currentTarget.value || 0))}
          />
          <Input
            label="Duration (Days)"
            name="days"
            type="number"
            defaultValue={String(days)}
            onChange={(event) => setDays(Number(event.currentTarget.value || 0))}
          />
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className="grid gap-5 md:grid-cols-2">
          <Select
            label="Package"
            name="package"
            defaultValue={plan}
            options={packages.map((item) => ({ label: item.name, value: item.slug }))}
            onChange={(event) => setPlan(event.currentTarget.value)}
          />
          <Input label="Budget" name="budget" placeholder="Optional" />
          <Input label="Preferred Rooms" name="rooms" placeholder="Standard, Cliff, Bungalow..." />
          <Textarea label="Special Requirements" name="requirements" placeholder="Decor, logistics, rituals, rooming preferences..." />
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="grid gap-5 md:grid-cols-2">
          <Input label="Full Name" name="fullName" />
          <Input label="Email" name="email" type="email" />
          <Input label="Phone" name="phone" />
          <Input label="Alternative Phone" name="alternativePhone" />
          <Input label="Address" name="address" className="md:col-span-2" />
        </div>
      );
    }

    return (
      <div className="grid gap-5 md:grid-cols-2">
        <Select
          label="Decorators / Vendors Needed"
          name="vendors"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        />
        <Input label="Vendor Names" name="vendorNames" placeholder="Optional" />
        <Input label="Dietary Restrictions" name="dietary" placeholder="Vegetarian, Jain, allergies..." />
        <Textarea label="Special Requests" name="specialRequests" placeholder="Any custom event note..." />
      </div>
    );
  }, [days, guestCount, plan, step]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[32px] border border-[var(--neutral-200)] bg-white p-8 shadow-[0_2px_12px_rgba(15,24,25,0.08)]">
        <div className="mb-8 flex flex-wrap gap-3">
          {steps.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setStep(index)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                step === index
                  ? "bg-[var(--primary-700)] text-white"
                  : "bg-[var(--neutral-100)] text-[var(--text-secondary)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <form className="space-y-6">
          {stepContent}
          <div className="flex flex-wrap gap-4 pt-2">
            {step > 0 ? (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            ) : null}
            {step < steps.length - 1 ? (
              <Button type="button" onClick={() => setStep(step + 1)}>
                Continue
              </Button>
            ) : (
              <Button type="submit">Send Booking Inquiry</Button>
            )}
          </div>
        </form>
      </div>
      <aside className="space-y-6">
        <div className="rounded-[32px] border border-[var(--neutral-200)] bg-[var(--primary-900)] p-8 text-white shadow-[0_8px_30px_rgba(15,24,25,0.18)]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-gold)]">Real-time Estimate</p>
          <h3 className="mt-4 text-3xl font-bold">Your celebration budget</h3>
          <div className="mt-6 space-y-3 text-sm leading-7 text-white/78">
            <p>
              {guestCount} guests × {formatPrice(selected.weekendPrice)} × {days} days
            </p>
            <p>Package: {selected.name}</p>
            <p>Subtotal: {formatPrice(subtotal)}</p>
            <p>GST (18%): {formatPrice(gst)}</p>
          </div>
          <div className="mt-6 border-t border-white/15 pt-6">
            <p className="text-sm uppercase tracking-[0.2em] text-white/55">Total</p>
            <p className="mt-2 text-4xl font-bold">{formatPrice(total)}</p>
            <p className="mt-4 text-sm text-white/75">
              Advance to block dates: {formatPrice(Math.round(total / 2))}
            </p>
          </div>
        </div>
        <div className="rounded-[32px] border border-[var(--neutral-200)] bg-white p-8 shadow-[0_2px_12px_rgba(15,24,25,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-gold)]">Selected Package</p>
          <h3 className="mt-4 text-2xl font-bold text-[var(--text-primary)]">{selected.name}</h3>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
            {selected.inclusions.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 text-[var(--accent-gold)]">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
