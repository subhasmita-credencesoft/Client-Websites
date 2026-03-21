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
    <label className="site-field">
      <span className="site-field__label">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="site-field__control"
      />
    </label>
  );
}
