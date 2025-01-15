interface FormSelectProps {
  label: string;
  name: string;
  placeholder: string;
  options: string[];
  required: boolean;
  errors: string[] | undefined;
}

export function FormSelect({ label, name, placeholder, options, required, errors }: FormSelectProps) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        className={`select select-bordered ${errors ? 'select-error' : ''}`}
        name={name}
        required={required}
      >
        <option disabled>{placeholder}</option>
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
