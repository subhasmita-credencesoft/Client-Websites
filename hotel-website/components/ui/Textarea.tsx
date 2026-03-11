type TextareaProps = {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
};

export default function Textarea({
  label,
  name,
  rows = 5,
  placeholder,
}: TextareaProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-ink/80">
      <span className="font-semibold text-ink">{label}</span>
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        className="rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm focus:border-accent focus:outline-none"
      />
    </label>
  );
}
