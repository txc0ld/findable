import { useDashboardContext } from "../../lib/dashboard-context";
import { getScoreTone } from "../../lib/scores";

export function CompetitorsPage() {
  const { workspace } = useDashboardContext();
  const yourScore = workspace.summary.overallScore;
  const topCompetitor = workspace.competitors[0];

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Competitors</h1>
      <p className="mt-1 text-text-secondary">
        See how your AI readiness compares to the competition.
      </p>

      <div className="mt-8 space-y-4">
        <CompetitorRow name="Your Store" score={yourScore} isYou />

        {workspace.competitors.map((competitor) => (
          <CompetitorRow
            key={competitor.id}
            name={competitor.name}
            score={competitor.overallScore}
            url={competitor.url}
            schemaScore={competitor.schemaScore}
            llmScore={competitor.llmScore}
            protocolScore={competitor.protocolScore}
          />
        ))}
      </div>

      <div className="card mt-10 p-6">
        <p className="font-semibold">Competitive insight</p>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          {topCompetitor ? (
            <>
              Your store scores{" "}
              <strong className="text-red-400">
                {Math.max(topCompetitor.overallScore - yourScore, 0)} points below
              </strong>{" "}
              {topCompetitor.name}. Closing schema and protocol gaps will move the needle fastest.
            </>
          ) : (
            "Run competitor scans once you have a connected store to unlock benchmark insights."
          )}
        </p>
      </div>
    </div>
  );
}

function CompetitorRow({
  name,
  score,
  isYou = false,
  url,
  schemaScore,
  llmScore,
  protocolScore,
}: {
  name: string;
  score: number;
  isYou?: boolean;
  url?: string;
  schemaScore?: number;
  llmScore?: number;
  protocolScore?: number;
}) {
  const tone = getScoreTone(score);

  return (
    <div className={`card p-5 ${isYou ? "ring-1 ring-[#ccff00]/30" : ""}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate font-semibold">{name}</p>
            {isYou ? (
              <span className="rounded-full bg-[#ccff00]/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-[#ccff00]">
                You
              </span>
            ) : null}
          </div>
          {url ? <p className="mt-0.5 truncate text-xs text-text-muted">{url}</p> : null}
        </div>
        <p className={`text-3xl font-extrabold tabular-nums ${tone.accentClass}`}>{score}</p>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${score}%`, background: tone.color }}
        />
      </div>

      {schemaScore !== undefined ? (
        <div className="mt-3 flex gap-4 text-xs text-text-muted">
          <span>
            Schema: <strong className="text-text-secondary">{schemaScore}</strong>
          </span>
          <span>
            LLM: <strong className="text-text-secondary">{llmScore}</strong>
          </span>
          <span>
            Protocol: <strong className="text-text-secondary">{protocolScore}</strong>
          </span>
        </div>
      ) : null}
    </div>
  );
}
