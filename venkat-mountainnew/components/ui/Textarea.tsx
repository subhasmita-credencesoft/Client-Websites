import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  className?: string;
};

export default function Textarea({ label, className = "", ...props }: TextareaProps) {
  return (
    <label className={`flex flex-col gap-2 text-sm text-[var(--text-secondary)] ${className}`}>
      <span className="font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)]">
        {label}
      </span>
      <textarea
        {...props}
        className="min-h-32 rounded-2xl border border-[var(--neutral-200)] bg-[var(--neutral-50)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-gold)] focus:bg-white"
      />
    </label>
  );
}
