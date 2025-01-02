import { useFormStatus } from 'react-dom';

export default function SubmitButton({ label, loadingLabel }: { label: string, loadingLabel: string }) {
  const { pending } = useFormStatus();

  return (
    <div className="form-control mt-6">
      <button type="submit" className="btn btn-primary w-full" disabled={pending}>
        {pending ? loadingLabel : label}
      </button>
    </div>
  )
}
