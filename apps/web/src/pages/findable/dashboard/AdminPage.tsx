import {
  BarChart3,
  Database,
  Rss,
  ScanLine,
  Store,
  Users,
} from "lucide-react";

import { MetricCard } from "../../../components/MetricCard";
import { useDashboardContext } from "../../../lib/dashboard-context";

export function AdminPage() {
  const { workspace } = useDashboardContext();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Admin</h1>
        <p className="mt-1 text-sm text-white/50">
          Internal operational overview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard label="Accounts" value={workspace.admin.accounts} icon={Users} />
        <MetricCard label="Stores" value={workspace.admin.stores} icon={Store} />
        <MetricCard label="Connected" value={workspace.admin.connectedStores} icon={Database} />
        <MetricCard label="Scans" value={workspace.admin.scans} icon={ScanLine} />
        <MetricCard label="Active Feeds" value={workspace.admin.activeFeeds} icon={Rss} />
        <MetricCard label="Pending Fixes" value={workspace.admin.pendingFixes} icon={BarChart3} />
      </div>

      <div>
        <h2 className="text-lg font-bold">Recent scans</h2>
        <div className="mt-4 space-y-2">
          {workspace.recentScans.length > 0 ? (
            workspace.recentScans.map((scan) => (
              <div
                key={scan.id}
                className="card flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-mono text-sm font-medium">{scan.id.slice(0, 8)}</p>
                  <p className="mt-0.5 text-xs text-white/40">
                    {new Date(scan.createdAt).toLocaleString()} &middot;{" "}
                    <span className={scan.status === "complete" ? "text-emerald-400" : "text-amber-400"}>
                      {scan.status}
                    </span>
                  </p>
                </div>
                <div className="text-sm text-white/50">
                  {scan.pagesScanned}/{scan.pagesTotal} pages &middot; Score{" "}
                  <strong className="text-white">{scan.scores.overall ?? 0}</strong>
                </div>
              </div>
            ))
          ) : (
            <p className="py-12 text-center text-sm text-white/40">No scan activity yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
