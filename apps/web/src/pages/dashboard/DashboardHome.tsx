import { Link } from "react-router-dom";
import { Package } from "lucide-react";

import { IssueCard } from "../../components/IssueCard";
import { MetricCard } from "../../components/MetricCard";
import { useDashboardContext } from "../../lib/dashboard-context";
import { getScoreTone } from "../../lib/scores";

export function DashboardHome() {
  const { workspace } = useDashboardContext();
  const recentIssues = workspace.issues.slice(0, 5);
  const recentProducts = workspace.products.slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-text-secondary">
        Overview of your store&apos;s AI commerce readiness.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Overall Score"
          value={workspace.summary.overallScore}
          sublabel={`${workspace.summary.criticalIssues} critical issues`}
          scoreColor
        />
        <MetricCard
          label="Schema"
          value={workspace.summary.schemaScore}
          sublabel={`${workspace.summary.productsScanned} products scanned`}
          scoreColor
        />
        <MetricCard
          label="LLM"
          value={workspace.summary.llmScore}
          sublabel={`${workspace.summary.autoFixableIssues} auto-fixable`}
          scoreColor
        />
        <MetricCard
          label="Protocol"
          value={workspace.summary.protocolScore}
          sublabel={`${workspace.summary.connectedStores} connected store`}
          scoreColor
        />
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Recent Issues</h2>
          <Link
            to="/dashboard/issues"
            className="text-sm text-[#ccff00] transition hover:text-[#ccff00]"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {recentIssues.length > 0 ? (
            recentIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} showProduct />
            ))
          ) : (
            <div className="card p-6 text-sm text-text-secondary">
              No issues yet. Run a scan to populate your remediation queue.
            </div>
          )}
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Products</h2>
          <Link
            to="/dashboard/products"
            className="text-sm text-[#ccff00] transition hover:text-[#ccff00]"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {recentProducts.length > 0 ? (
            recentProducts.map((product) => {
              const tone = getScoreTone(product.overallScore);

              return (
                <Link
                  key={product.productId}
                  to={`/dashboard/products/${product.productId}`}
                  className="card flex items-center gap-4 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/12"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Package className="h-5 w-5 text-text-muted" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{product.name}</p>
                    <p className="truncate text-xs text-text-muted">
                      {product.category} &middot; {product.issueCount} issues
                    </p>
                  </div>
                  <p className={`text-2xl font-bold tabular-nums ${tone.accentClass}`}>
                    {product.overallScore}
                  </p>
                </Link>
              );
            })
          ) : (
            <div className="card p-6 text-sm text-text-secondary">
              Products appear here after your first completed scan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
