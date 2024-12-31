interface FormInputProps {
  label?: string;
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
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
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
  leftIcon,
  rightIcon,
  onRightIconClick,
}: FormInputProps) {
  return (
    <div className="form-control">
      {label && (
        <label htmlFor={name} className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <div className={`relative ${extraElement ? 'join w-full' : ''}`}>
        {leftIcon && (
          <div className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-500">
            {leftIcon}
          </div>
        )}
        <input 
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`
            input input-bordered 
            ${extraElement ? 'join-item' : ''} 
            ${className} 
            ${errors ? 'input-error' : ''}
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
          `}
          required={required}
          min={min}
          step={step}
          value={value}
          onChange={onChange}
        />
        {rightIcon && (
          <button 
            type="button"
            className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-gray-500"
            onClick={onRightIconClick}
          >
            {rightIcon}
          </button>
        )}
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
