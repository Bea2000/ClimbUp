interface FormInputProps {
    name: string;
    type: string;
    placeholder: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxLength?: number;
  }
  
export function FormInput({ name, type, placeholder, error, onChange, maxLength }: FormInputProps) {
  return (
    <div>
      <input 
        name={name}
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full"
        onChange={onChange}
        maxLength={maxLength}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
