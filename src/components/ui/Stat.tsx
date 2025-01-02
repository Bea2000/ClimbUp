export default function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="stat rounded-lg bg-base-100 shadow">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}
