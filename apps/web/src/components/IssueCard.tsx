import type { WorkspaceIssue } from "@findable/shared";

const SEVERITY_STYLES: Record<WorkspaceIssue["severity"], string> = {
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  low: "bg-white/5 text-text-muted border-white/10",
};

interface IssueCardProps {
  issue: WorkspaceIssue;
  showProduct?: boolean;
}

export function IssueCard({ issue, showProduct = false }: IssueCardProps) {
  return (
    <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:gap-4">
      <span
        className={`inline-flex w-fit shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase ${SEVERITY_STYLES[issue.severity]}`}
      >
        {issue.severity}
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-medium leading-snug">{issue.title}</p>
        {showProduct && (
          <p className="mt-0.5 text-xs text-text-muted">{issue.productName}</p>
        )}
        <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
          {issue.description}
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs">
          <span className="font-medium text-emerald-400">
            +{issue.pointsImpact} points if fixed
          </span>
          <span className="text-text-muted">&middot;</span>
          <span
            className={
              issue.fixType === "auto" ? "text-emerald-400" : "text-amber-400"
            }
          >
            {issue.fixType === "auto"
              ? "Auto-fixable \u2713"
              : "Manual fix required"}
          </span>
        </div>
      </div>
    </div>
  );
}
