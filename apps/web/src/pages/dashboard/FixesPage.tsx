import { useState } from "react";
import { Check, LoaderCircle, Wrench, Zap } from "lucide-react";

import { useDashboardContext } from "../../lib/dashboard-context";
import { applyFix } from "../../lib/workspace-api";

export function FixesPage() {
  const { email, setWorkspace, workspace } = useDashboardContext();
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
      const nextWorkspace = await applyFix(email, issueId);
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
        nextWorkspace = await applyFix(email, issue.id);
      }

      setWorkspace(nextWorkspace);
    } finally {
      setIsApplyingAll(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Fixes</h1>
      <p className="mt-1 text-text-secondary">
        Auto-fix center &mdash; resolve issues with one click.
      </p>

      <div className="card mt-8 flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
            <Zap className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <p className="font-semibold">{autoFixable.length} issues can be auto-fixed</p>
            <p className="mt-1 text-sm text-text-secondary">
              Fixing all auto-fixable issues would add{" "}
              <strong className="text-emerald-400">+{totalPoints} points</strong>{" "}
              to your score.
            </p>
          </div>
        </div>
        <button
          onClick={() => void handleApplyAll()}
          disabled={isApplyingAll || autoFixable.length === 0}
          className="btn-primary shrink-0 rounded-xl px-6 py-3 text-sm font-semibold text-white"
        >
          {isApplyingAll ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Applying fixes
            </>
          ) : (
            <>
              <Wrench className="h-4 w-4" />
              Fix all ({autoFixable.length})
            </>
          )}
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold">Auto-fixable</h2>
        <div className="mt-4 space-y-3">
          {autoFixable.length > 0 ? (
            autoFixable.map((issue) => (
              <div
                key={issue.id}
                className="card flex items-center justify-between gap-4 p-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{issue.title}</p>
                  <p className="mt-0.5 text-xs text-text-muted">
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
            <div className="card p-6 text-sm text-text-secondary">
              No pending auto-fixable issues.
            </div>
          )}
        </div>
      </div>

      {manualFixes.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold">Requires manual fix</h2>
          <p className="mt-1 text-sm text-text-secondary">
            These issues still need changes in your store admin or source data.
          </p>
          <div className="mt-4 space-y-3">
            {manualFixes.map((issue) => (
              <div key={issue.id} className="card p-4">
                <p className="font-medium">{issue.title}</p>
                <p className="mt-1 text-sm text-text-secondary">{issue.description}</p>
                <p className="mt-2 text-xs text-text-muted">
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
