import { type LucideIcon } from "lucide-react";
import { getScoreTone } from "../lib/scores";

interface MetricCardProps {
  label: string;
  value: number | string;
  sublabel?: string;
  scoreColor?: boolean;
  icon?: LucideIcon;
}

export function MetricCard({
  label,
  value,
  sublabel,
  scoreColor = false,
  icon: Icon,
}: MetricCardProps) {
  const tone =
    scoreColor && typeof value === "number" ? getScoreTone(value) : null;

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/50">
          {label}
        </p>
        {Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 bg-white/5">
            <Icon className="h-4 w-4 text-white/40" />
          </div>
        )}
      </div>
      <p className={`mt-3 text-3xl font-extrabold tabular-nums tracking-tight ${tone?.accentClass ?? ""}`}>
        {value}
      </p>
      {sublabel && (
        <p className="mt-1.5 text-xs text-white/40">{sublabel}</p>
      )}
      {tone && typeof value === "number" && (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${value}%`, background: tone.color }}
          />
        </div>
      )}
    </div>
  );
}
