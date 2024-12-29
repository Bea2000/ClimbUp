interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  min?: string;
  step?: string;
  children?: React.ReactNode;
}

export function FormField({
  label,
  name,
  type,
  value,
  onChange,
  error,
  placeholder,
  required,
  min,
  step,
  children
}: FormFieldProps) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className={children ? "join w-full" : "w-full"}>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`input input-bordered w-full ${children ? 'join-item' : ''} ${error ? 'input-error' : ''}`}
          placeholder={placeholder}
          required={required}
          min={min}
          step={step}
        />
        {children}
      </div>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}
