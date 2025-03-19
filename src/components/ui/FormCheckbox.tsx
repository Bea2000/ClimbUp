interface FormCheckboxProps {
  label?: string;
  name: string;
  errors?: string[];
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function FormCheckbox({ label, name, errors, checked, onChange, required }: FormCheckboxProps) {
  return (
    <div className="form-control">
      <label className="label justify-start gap-2">
        <input
          type="checkbox"
          name={name}
          className="checkbox-primary checkbox"
          checked={checked}
          onChange={onChange}
          required={required}
          value={checked ? 'true' : 'false'}
        />
        {label && <span className="label-text">{label}</span>}
      </label>

      {checked === false && (
        <input type="hidden" name={name} value="false" />
      )}

      {errors && <p className="mt-2 text-sm text-red-500">{errors.join(', ')}</p>}
    </div>
  );
}
