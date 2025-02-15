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
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        className={`select select-bordered ${errors ? 'select-error' : ''}`}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
      >
        <option>{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {errors?.[0] && (
        <div className="label">
          <span className="label-text-alt">{errors?.[0]}</span>
        </div>
      )}
    </label>
  );
}
