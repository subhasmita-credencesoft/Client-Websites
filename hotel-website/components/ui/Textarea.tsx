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
    <label className="site-field">
      <span className="site-field__label">{label}</span>
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        className="site-field__control site-field__control--textarea"
      />
    </label>
  );
}
