import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  className?: string;
};

export default function Input({ label, className = "", ...props }: InputProps) {
  return (
    <label className={`flex flex-col gap-2 text-sm text-[var(--text-secondary)] ${className}`}>
      <span className="font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)]">
        {label}
      </span>
      <input
        {...props}
        className="min-h-12 rounded-2xl border border-[var(--neutral-200)] bg-[var(--neutral-50)] px-4 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-gold)] focus:bg-white"
      />
    </label>
  );
}
