import { getScoreTone } from "../lib/scores";

interface MetricCardProps {
  label: string;
  value: number | string;
  sublabel?: string;
  scoreColor?: boolean;
}

export function MetricCard({
  label,
  value,
  sublabel,
  scoreColor = false,
}: MetricCardProps) {
  const valueClass =
    scoreColor && typeof value === "number"
      ? getScoreTone(value).accentClass
      : "";

  return (
    <div className="card p-5">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
        {label}
      </p>
      <p className={`mt-2 text-3xl font-extrabold tracking-tight ${valueClass}`}>
        {value}
      </p>
      {sublabel && (
        <p className="mt-1 text-sm text-text-secondary">{sublabel}</p>
      )}
    </div>
  );
}
