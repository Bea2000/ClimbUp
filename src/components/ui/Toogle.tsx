
interface ToogleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Toogle({ label, checked, onChange }: ToogleProps) {
  return (
    <div>
      <label className="label justify-start gap-2">
        <input type="checkbox" className="toggle" checked={checked} value={checked ? 'true' : 'false'} onChange={(e) => onChange(e.target.checked)} />
        <span className="label-text">{label}</span>
      </label>
    </div>
  );
}
