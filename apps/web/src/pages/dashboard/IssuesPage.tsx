import { useState } from "react";

import { IssueCard } from "../../components/IssueCard";
import { useDashboardContext } from "../../lib/dashboard-context";

const FILTERS = ["all", "critical", "high", "medium", "low"] as const;

export function IssuesPage() {
  const { workspace } = useDashboardContext();
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all"
      ? workspace.issues
      : workspace.issues.filter((issue) => issue.severity === filter);

  const criticalCount = workspace.issues.filter(
    (issue) => issue.severity === "critical",
  ).length;
  const autoFixable = workspace.issues.filter(
    (issue) => issue.fixType === "auto" && !issue.fixed,
  ).length;

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Issues</h1>
      <p className="mt-1 text-text-secondary">
        {workspace.issues.length} issues found &middot;{" "}
        <span className="text-red-400">{criticalCount} critical</span> &middot;{" "}
        <span className="text-emerald-400">{autoFixable} auto-fixable</span>
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((currentFilter) => {
          const count =
            currentFilter === "all"
              ? workspace.issues.length
              : workspace.issues.filter((issue) => issue.severity === currentFilter).length;

          return (
            <button
              key={currentFilter}
              onClick={() => setFilter(currentFilter)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium capitalize transition-colors ${
                filter === currentFilter
                  ? "bg-[#ccff00]/15 text-[#ccff00]"
                  : "bg-white/5 text-text-secondary hover:bg-white/8 hover:text-text-primary"
              }`}
            >
              {currentFilter === "all" ? "All" : currentFilter}{" "}
              <span className="ml-1 text-xs opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-3">
        {filtered.map((issue) => (
          <IssueCard key={issue.id} issue={issue} showProduct />
        ))}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-text-muted">
            No {filter} issues found.
          </p>
        )}
      </div>
    </div>
  );
}
