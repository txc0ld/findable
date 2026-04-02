import { MetricCard } from "../../components/MetricCard";
import { useDashboardContext } from "../../lib/dashboard-context";

export function AdminPage() {
  const { workspace } = useDashboardContext();

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Admin</h1>
      <p className="mt-1 text-text-secondary">
        Internal operational view of the current workspace and service activity.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard label="Accounts" value={workspace.admin.accounts} />
        <MetricCard label="Stores" value={workspace.admin.stores} />
        <MetricCard label="Connected Stores" value={workspace.admin.connectedStores} />
        <MetricCard label="Scans" value={workspace.admin.scans} />
        <MetricCard label="Active Feeds" value={workspace.admin.activeFeeds} />
        <MetricCard label="Pending Fixes" value={workspace.admin.pendingFixes} />
      </div>

      <div className="card mt-8 p-6">
        <p className="font-semibold">Recent scans</p>
        <div className="mt-4 space-y-3">
          {workspace.recentScans.length > 0 ? (
            workspace.recentScans.map((scan) => (
              <div
                key={scan.id}
                className="flex flex-col gap-2 rounded-xl border border-white/6 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{scan.id}</p>
                  <p className="mt-1 text-xs text-text-muted">
                    {new Date(scan.createdAt).toLocaleString()} &middot; {scan.status}
                  </p>
                </div>
                <div className="text-sm text-text-secondary">
                  {scan.pagesScanned}/{scan.pagesTotal} pages &middot; Score {scan.scores.overall ?? 0}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-text-secondary">No scan activity yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
