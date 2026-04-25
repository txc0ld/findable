import { Link } from "react-router-dom";
import {
  AlertTriangle,
  BarChart3,
  Bot,
  BrainCircuit,
  Package,
  PlugZap,
  ScanLine,
  Search,
} from "lucide-react";

import { IssueCard } from "../../../components/IssueCard";
import { MetricCard } from "../../../components/MetricCard";
import { useDashboardContext } from "../../../lib/dashboard-context";
import { getScoreTone } from "../../../lib/scores";

export function DashboardHome() {
  const { workspace } = useDashboardContext();
  const recentIssues = workspace.issues.slice(0, 5);
  const recentProducts = workspace.products.slice(0, 5);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-white/50">
          AI commerce readiness overview for your store.
        </p>
      </div>

      {/* Score cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <MetricCard
          label="Overall"
          value={workspace.summary.overallScore}
          sublabel={`${workspace.summary.criticalIssues} critical issues`}
          icon={BarChart3}
          scoreColor
        />
        <MetricCard
          label="Schema"
          value={workspace.summary.schemaScore}
          sublabel={`${workspace.summary.productsScanned} products scanned`}
          icon={Search}
          scoreColor
        />
        <MetricCard
          label="LLM"
          value={workspace.summary.llmScore}
          sublabel={`${workspace.summary.autoFixableIssues} auto-fixable`}
          icon={BrainCircuit}
          scoreColor
        />
        <MetricCard
          label="Protocol"
          value={workspace.summary.protocolScore}
          sublabel={workspace.store.shopifyShop ?? (workspace.store.status === "connected" ? workspace.store.platform ?? "Connected" : "Not connected")}
          icon={PlugZap}
          scoreColor
        />
        <MetricCard
          label="Agent Readiness"
          value={workspace.summary.agentReadinessScore}
          sublabel="18 well-known checks"
          icon={Bot}
          scoreColor
        />
      </div>

      {/* Recent Issues */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Recent Issues</h2>
          <Link
            to="/findable/dashboard/issues"
            className="text-xs font-medium text-[#ccff00] transition hover:text-white"
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
            <EmptyState
              icon={AlertTriangle}
              title="No issues yet"
              description="Run a scan to populate your remediation queue."
            />
          )}
        </div>
      </div>

      {/* Products */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Products</h2>
          <Link
            to="/findable/dashboard/products"
            className="text-xs font-medium text-[#ccff00] transition hover:text-white"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="mt-4 space-y-2">
          {recentProducts.length > 0 ? (
            recentProducts.map((product) => {
              const tone = getScoreTone(product.overallScore);
              return (
                <Link
                  key={product.productId}
                  to={`/dashboard/products/${product.productId}`}
                  className="card flex items-center gap-4 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/5">
                    <Package className="h-5 w-5 text-white/30" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{product.name}</p>
                    <p className="truncate text-xs text-white/40">
                      {product.category} &middot;{" "}
                      <span className="text-[#ff3366]">{product.issueCount} issues</span>
                    </p>
                  </div>
                  <p className={`text-2xl font-bold tabular-nums ${tone.accentClass}`}>
                    {product.overallScore}
                  </p>
                </Link>
              );
            })
          ) : (
            <EmptyState
              icon={ScanLine}
              title="No products scanned"
              description="Products appear here after your first completed scan."
            />
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof AlertTriangle;
  title: string;
  description: string;
}) {
  return (
    <div className="card flex flex-col items-center p-6 text-center sm:p-10">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/8 bg-white/5">
        <Icon className="h-6 w-6 text-white/30" />
      </div>
      <p className="mt-4 text-sm font-medium">{title}</p>
      <p className="mt-1 text-xs text-white/40">{description}</p>
      <Link
        to="/findable"
        className="mt-5 inline-flex items-center rounded-lg border border-[#ccff00]/20 bg-[#ccff00]/10 px-4 py-2 text-xs font-semibold text-[#ccff00] transition hover:bg-[#ccff00]/20"
      >
        Run a scan &rarr;
      </Link>
    </div>
  );
}
