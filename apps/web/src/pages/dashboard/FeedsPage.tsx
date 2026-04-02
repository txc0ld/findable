import { Link } from "react-router-dom";
import { ExternalLink, Rss } from "lucide-react";

import { useDashboardContext } from "../../lib/dashboard-context";

export function FeedsPage() {
  const { workspace } = useDashboardContext();

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Feeds</h1>
      <p className="mt-1 text-text-secondary">
        Manage your AI commerce protocol feeds.
      </p>

      <div className="mt-8 space-y-4">
        {workspace.feeds.map((feed) => (
          <div key={feed.id} className="card p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#ccff00]/20 bg-[#ccff00]/10">
                  <Rss className="h-5 w-5 text-[#ccff00]" />
                </div>
                <div>
                  <p className="font-semibold">{feed.name}</p>
                  <p className="mt-1 text-sm text-text-secondary">{feed.description}</p>
                  <p className="mt-2 text-xs text-text-muted">
                    Format: {feed.format}
                    {feed.lastGenerated ? ` · Last generated ${new Date(feed.lastGenerated).toLocaleString()}` : ""}
                  </p>
                </div>
              </div>

              {feed.status === "coming_soon" ? (
                <span className="inline-flex shrink-0 items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-text-muted">
                  Coming soon
                </span>
              ) : feed.fileUrl ? (
                <a
                  href={feed.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open feed
                </a>
              ) : (
                <Link
                  to="/dashboard/settings"
                  className="btn-primary shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold"
                >
                  <ExternalLink className="h-4 w-4" />
                  Connect store
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-8 p-6 text-center">
        <p className="text-sm text-text-secondary">
          {workspace.store.status === "connected"
            ? "Your connected store can now drive feed generation and future monitoring jobs."
            : "Connect your store to auto-generate and host product feeds."}
        </p>
        <Link
          to="/dashboard/settings"
          className="mt-3 inline-block text-sm font-medium text-[#ccff00] transition hover:text-[#ccff00]"
        >
          Go to Settings &rarr;
        </Link>
      </div>
    </div>
  );
}
