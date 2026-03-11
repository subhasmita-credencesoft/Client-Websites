type SelectProps = {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
};

export default function Select({
  label,
  name,
  options,
  defaultValue,
}: SelectProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-ink/80">
      <span className="font-semibold text-ink">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="h-11 rounded-xl border border-ink/10 bg-white px-4 text-sm focus:border-accent focus:outline-none"
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
