import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { label: string; value: string }[];
  className?: string;
};

export default function Select({
  label,
  options,
  className = "",
  ...props
}: SelectProps) {
  return (
    <label className={`flex flex-col gap-2 text-sm text-[var(--text-secondary)] ${className}`}>
      <span className="font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)]">
        {label}
      </span>
      <select
        {...props}
        className="min-h-12 rounded-2xl border border-[var(--neutral-200)] bg-[var(--neutral-50)] px-4 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-gold)] focus:bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
