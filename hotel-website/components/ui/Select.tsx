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
    <label className="site-field">
      <span className="site-field__label">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="site-field__control"
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
