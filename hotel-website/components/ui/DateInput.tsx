"use client";

type DateInputProps = {
  label: string;
  name: string;
  className?: string;
};

export default function DateInput({ label, name, className = "" }: DateInputProps) {
  return (
    <label className="flex flex-1 items-center gap-4 px-3 text-sm text-white/80">
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em]">
        {label}
      </span>
      <input
        type="date"
        name={name}
        className={`w-full bg-transparent text-sm text-white/90 outline-none [color-scheme:dark] ${className}`}
      />
    </label>
  );
}
