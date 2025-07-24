interface FormSelectProps {
  label: string;
  name: string;
  placeholder: string;
  options: string[];
  required: boolean;
  errors: string[] | undefined;
  value?: string;
  onChange?: (value: string) => void;
}

export function FormSelect({ label, name, placeholder, options, required, errors, value, onChange }: FormSelectProps) {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text">{label}</span>
      </label>
      <select
        id={name}
        name={name}
        className={`select select-bordered w-full ${errors ? 'select-error' : ''}`}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {errors?.[0] && (
        <label className="label">
          <span className="label-text-alt text-error">{errors?.[0]}</span>
        </label>
      )}
    </div>
  );
}
