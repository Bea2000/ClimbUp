interface FileInputProps {
  label: string;
  name: string;
  errors?: string[];
  accept?: string;
}

export default function FileInput({ label, name, errors, accept }: FileInputProps) {
  return (
    <div className="form-control w-full">
      <label className="label flex flex-col items-start gap-2">
        <span className="label-text">{label}</span>
        <input 
          type="file" 
          className="file-input file-input-bordered w-full" 
          name={name} 
          accept={accept}
        />
      </label>
      {errors && <p className="mt-2 text-sm text-red-500">{errors.join(', ')}</p>}
    </div>
  );
}
