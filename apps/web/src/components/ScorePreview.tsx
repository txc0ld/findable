import { ScoreRing } from "./ScoreRing";
import { getScoreTone } from "../lib/scores";

interface ScorePreviewProps {
  score: number;
  schema: number;
  llm: number;
  protocol: number;
}

export function ScorePreview({ score, schema, llm, protocol }: ScorePreviewProps) {
  return (
    <div className="card-glass p-5 sm:p-8 lg:p-10 border-none bg-transparent shadow-none backdrop-blur-none">
      <ScoreRing score={score} />

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <ScoreMetric label="Schema" value={schema} />
        <ScoreMetric label="LLM" value={llm} />
        <ScoreMetric label="Protocol" value={protocol} />
      </div>
    </div>
  );
}

function ScoreMetric({ label, value }: { label: string; value: number }) {
  const tone = getScoreTone(value);

  return (
    <div className="rounded-2xl border border-white/6 bg-white/3 p-4 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
        {label}
      </p>
      <p className={`mt-2 text-2xl font-bold ${tone.accentClass}`}>{value}</p>
    </div>
  );
}
