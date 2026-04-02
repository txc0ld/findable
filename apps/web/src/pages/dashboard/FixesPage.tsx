import { useState } from "react";
import { Check, LoaderCircle, Wrench, Zap } from "lucide-react";

import { useDashboardContext } from "../../lib/dashboard-context";
import { applyFix } from "../../lib/workspace-api";

export function FixesPage() {
  const { setWorkspace, workspace } = useDashboardContext();
  const [isApplyingAll, setIsApplyingAll] = useState(false);
  const [activeIssueId, setActiveIssueId] = useState<string | null>(null);

  const autoFixable = workspace.issues.filter(
    (issue) => issue.fixType === "auto" && !issue.fixed,
  );
  const manualFixes = workspace.issues.filter(
    (issue) => issue.fixType !== "auto" && !issue.fixed,
  );
  const totalPoints = autoFixable.reduce((sum, issue) => sum + issue.pointsImpact, 0);

  async function handleApply(issueId: string) {
    setActiveIssueId(issueId);
    try {
      const nextWorkspace = await applyFix(issueId);
      setWorkspace(nextWorkspace);
    } finally {
      setActiveIssueId(null);
    }
  }

  async function handleApplyAll() {
    setIsApplyingAll(true);
    try {
      let nextWorkspace = workspace;
      for (const issue of autoFixable) {
        nextWorkspace = await applyFix(issue.id);
      }
      setWorkspace(nextWorkspace);
    } finally {
      setIsApplyingAll(false);
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Fixes</h1>
        <p className="mt-1 text-sm text-white/50">
          Auto-fix center — resolve issues with one click.
        </p>
      </div>

      {/* Summary banner */}
      <div className="card flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
            <Zap className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <p className="font-semibold">{autoFixable.length} auto-fixable issues</p>
            <p className="mt-1 text-sm text-white/50">
              Fixing all would add{" "}
              <strong className="text-emerald-400">+{totalPoints} points</strong>{" "}
              to your score.
            </p>
          </div>
        </div>
        <button
          onClick={() => void handleApplyAll()}
          disabled={isApplyingAll || autoFixable.length === 0}
          className="btn-primary shrink-0 rounded-xl px-6 py-3 text-sm font-semibold"
        >
          {isApplyingAll ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Applying
            </>
          ) : (
            <>
              <Wrench className="h-4 w-4" />
              Fix all ({autoFixable.length})
            </>
          )}
        </button>
      </div>

      {/* Auto-fixable */}
      <div>
        <h2 className="text-lg font-bold">Auto-fixable</h2>
        <div className="mt-4 space-y-2">
          {autoFixable.length > 0 ? (
            autoFixable.map((issue) => (
              <div
                key={issue.id}
                className="card flex items-center justify-between gap-4 p-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{issue.title}</p>
                  <p className="mt-0.5 text-xs text-white/40">
                    {issue.productName ?? "Unknown product"} &middot;{" "}
                    <span className="text-emerald-400">+{issue.pointsImpact} pts</span>
                  </p>
                </div>
                <button
                  onClick={() => void handleApply(issue.id)}
                  disabled={activeIssueId === issue.id}
                  className="shrink-0 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20"
                >
                  {activeIssueId === issue.id ? (
                    <>
                      <LoaderCircle className="inline h-3.5 w-3.5 animate-spin" /> Applying
                    </>
                  ) : (
                    <>
                      <Check className="inline h-3.5 w-3.5" /> Fix
                    </>
                  )}
                </button>
              </div>
            ))
          ) : (
            <p className="py-12 text-center text-sm text-white/40">
              No pending auto-fixable issues.
            </p>
          )}
        </div>
      </div>

      {/* Manual */}
      {manualFixes.length > 0 && (
        <div>
          <h2 className="text-lg font-bold">Requires manual fix</h2>
          <p className="mt-1 text-sm text-white/40">
            These need changes in your store admin or source data.
          </p>
          <div className="mt-4 space-y-2">
            {manualFixes.map((issue) => (
              <div key={issue.id} className="card p-4">
                <p className="text-sm font-medium">{issue.title}</p>
                <p className="mt-1 text-sm text-white/50">{issue.description}</p>
                <p className="mt-2 text-xs text-white/40">
                  {issue.productName ?? "Unknown product"} &middot;{" "}
                  <span className="text-amber-400">+{issue.pointsImpact} pts</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
