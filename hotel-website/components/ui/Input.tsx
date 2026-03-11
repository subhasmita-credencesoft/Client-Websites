type InputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
};

export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
}: InputProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-ink/80">
      <span className="font-semibold text-ink">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="h-11 rounded-xl border border-ink/10 bg-white px-4 text-sm focus:border-accent focus:outline-none"
      />
    </label>
  );
}
