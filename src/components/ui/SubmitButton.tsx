export default function SubmitButton({ label }: { label: string }) {
  return (
    <div className="form-control mt-6">
      <button type="submit" className="btn btn-primary w-full">
        {label}
      </button>
    </div>
  )
}
