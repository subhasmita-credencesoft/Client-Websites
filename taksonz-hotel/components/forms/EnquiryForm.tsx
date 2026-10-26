"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { eventTypes } from "@/data/venues";
import { submitContactEnquiry } from "@/lib/api/contact";
import { enquirySchema, type EnquiryInput, type EnquiryType } from "@/lib/validation/schemas";
import styles from "./EnquiryForm.module.scss";

interface Props {
  type: EnquiryType;
  /** Extra values carried from the flow (dates, room name). */
  hidden?: Record<string, string | number | undefined>;
  submitLabel?: string;
  messageLabel?: string;
}

type Errors = Record<string, string | undefined>;

/**
 * API-based Contact & Enquiry Form.
 * Submits enquiries directly via API with in-page confirmation and WhatsApp option.
 */
export function EnquiryForm({
  type,
  hidden,
  submitLabel = "Send Enquiry",
  messageLabel = "Message",
}: Props) {
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<EnquiryInput | null>(null);
  const needsEvent = type === "event" || type === "meeting";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw: Record<string, unknown> = { type, ...hidden };
    new FormData(form).forEach((v, k) => {
      if (typeof v === "string" && v !== "") raw[k] = v;
    });

    const parsed = enquirySchema.safeParse(raw);
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors as Record<string, string[] | undefined>;
      const next: Errors = {};
      for (const k of Object.keys(fe)) next[k] = fe[k]?.[0];
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setLoading(true);
    setApiError(null);

    try {
      const res = await submitContactEnquiry(parsed.data);
      if (res.success) {
        setSuccess(true);
        setSubmitted(parsed.data);
      } else {
        setApiError(res.message);
      }
    } catch {
      setApiError("Unable to submit right now. Please call or WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  }

  if (success && submitted) {
    return (
      <div className={styles.success} role="status">
        <div className={styles.successIcon}>✓</div>
        <h3>Enquiry Received</h3>
        <p>
          Thank you, <strong>{submitted.name}</strong>. Your{" "}
          {type === "event" ? "event enquiry" : type === "meeting" ? "meeting enquiry" : "message"}{" "}
          has been submitted successfully.
        </p>
        <p>
          Our team at Hotel The Taksonz will contact you at{" "}
          <strong>{submitted.phone || submitted.email}</strong> shortly.
        </p>
        <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <a
            href={`https://wa.me/919872600607?text=${encodeURIComponent(
              `Hello Hotel The Taksonz, I just submitted an online enquiry for ${submitted.name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.6rem 1.25rem",
              background: "#25D366",
              color: "#fff",
              borderRadius: "var(--radius-sm)",
              fontWeight: 500,
              fontSize: "0.875rem",
              textDecoration: "none",
            }}
          >
            Chat on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setSubmitted(null);
            }}
            style={{
              padding: "0.6rem 1.25rem",
              background: "var(--charcoal)",
              color: "var(--white)",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const f = (
    name: string,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
    required = true
  ) => (
    <div className={styles.field}>
      <label htmlFor={`${uid}-${name}`}>
        {label}
        {required ? <span aria-hidden> *</span> : <span className={styles.opt}> (optional)</span>}
      </label>
      <input
        id={`${uid}-${name}`}
        name={name}
        required={required}
        aria-required={required}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${uid}-${name}-e` : undefined}
        {...props}
      />
      {errors[name] && (
        <p id={`${uid}-${name}-e`} className={styles.err}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {f("name", "Full name", { autoComplete: "name" })}
      <div className={styles.row}>
        {f("email", "Email", { type: "email", autoComplete: "email", inputMode: "email" })}
        {f("phone", "Phone", { type: "tel", autoComplete: "tel", inputMode: "tel" })}
      </div>

      {needsEvent && (
        <>
          <div className={styles.field}>
            <label htmlFor={`${uid}-eventType`}>Event type</label>
            <select id={`${uid}-eventType`} name="eventType" defaultValue={eventTypes[0]}>
              {eventTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className={styles.row}>
            {f("eventDate", "Event date", { type: "date" })}
            {f("guestCount", "Approx. guests", { type: "number", min: 1, inputMode: "numeric" }, false)}
          </div>
        </>
      )}

      <div className={styles.field}>
        <label htmlFor={`${uid}-message`}>
          {messageLabel}
          {type === "general" ? <span aria-hidden> *</span> : <span className={styles.opt}> (optional)</span>}
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          maxLength={2000}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${uid}-message-e` : undefined}
        />
        {errors.message && (
          <p id={`${uid}-message-e`} className={styles.err}>
            {errors.message}
          </p>
        )}
      </div>

      {apiError && (
        <p className={styles.err} role="alert">
          {apiError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={loading}>
        {loading ? "Submitting..." : submitLabel}
      </Button>

      <p className={styles.note}>
        Your details are sent securely to Hotel The Taksonz. We respond promptly. See our{" "}
        <Link href="/privacy-policy">privacy policy</Link>.
      </p>
    </form>
  );
}
