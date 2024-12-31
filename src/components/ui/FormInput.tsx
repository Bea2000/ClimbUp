interface FormInputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  errors?: string[];
  min?: string;
  step?: string;
  className?: string;
  extraElement?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({ 
  label, 
  name, 
  type, 
  placeholder, 
  required, 
  errors,
  min,
  step,
  className = "w-full",
  extraElement,
  value,
  onChange,
}: FormInputProps) {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className={`${extraElement ? 'join w-full' : ''}`}>
        <input 
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`input input-bordered ${extraElement ? 'join-item' : ''} ${className} ${errors ? 'input-error' : ''}`}
          required={required}
          min={min}
          step={step}
          value={value}
          onChange={onChange}
        />
        {extraElement}
      </div>
      {errors?.[0] && (
        <label className="label">
          <span className="label-text-alt text-error">{errors?.[0]}</span>
        </label>
      )}
    </div>
  );
}
