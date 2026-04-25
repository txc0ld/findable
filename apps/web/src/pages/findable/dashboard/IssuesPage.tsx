import { useState } from "react";

import { IssueCard } from "../../../components/IssueCard";
import { useDashboardContext } from "../../../lib/dashboard-context";

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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Issues</h1>
        <p className="mt-1 text-sm text-white/50">
          {workspace.issues.length} issues &middot;{" "}
          <span className="text-[#ff3366]">{criticalCount} critical</span> &middot;{" "}
          <span className="text-emerald-400">{autoFixable} auto-fixable</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((currentFilter) => {
          const count =
            currentFilter === "all"
              ? workspace.issues.length
              : workspace.issues.filter((issue) => issue.severity === currentFilter).length;

          return (
            <button
              key={currentFilter}
              onClick={() => setFilter(currentFilter)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-colors ${
                filter === currentFilter
                  ? "bg-[#ccff00]/15 text-[#ccff00]"
                  : "bg-white/5 text-white/50 hover:bg-white/8 hover:text-white/70"
              }`}
            >
              {currentFilter === "all" ? "All" : currentFilter}{" "}
              <span className="ml-1 opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filtered.map((issue) => (
          <IssueCard key={issue.id} issue={issue} showProduct />
        ))}
        {filtered.length === 0 && (
          <p className="py-16 text-center text-sm text-white/40">
            No {filter} issues found.
          </p>
        )}
      </div>
    </div>
  );
}
