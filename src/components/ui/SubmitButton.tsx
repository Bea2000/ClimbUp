import { useFormStatus } from 'react-dom';

export default function SubmitButton({ label, loadingLabel, disabled }: { label: string, loadingLabel: string, disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <div className="form-control mt-6">
      <button type="submit" className="btn btn-primary w-full" disabled={pending || disabled}>
        {pending ? loadingLabel : label}
      </button>
    </div>
  )
}
