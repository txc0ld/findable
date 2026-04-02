import { useState } from "react";
import { Check, ExternalLink, LoaderCircle, Store } from "lucide-react";

import { useDashboardContext } from "../../lib/dashboard-context";
import { updateNotifications, updateStore } from "../../lib/workspace-api";

export function SettingsPage() {
  const { email, refreshWorkspace, setWorkspace, workspace } = useDashboardContext();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formValues, setFormValues] = useState({
    name: workspace.store.name ?? "",
    platform: workspace.store.platform ?? "shopify",
    url: workspace.store.url ?? "",
    competitorChanges: workspace.notifications.competitorChanges,
    criticalAlerts: workspace.notifications.criticalAlerts,
    weeklyReport: workspace.notifications.weeklyReport,
  });

  async function handleSave() {
    setIsSaving(true);

    try {
      if (formValues.url.trim()) {
        await updateStore(email, {
          name: formValues.name.trim() || "Connected Store",
          platform: formValues.platform,
          url: formValues.url.trim(),
        });
      }

      const notifications = await updateNotifications(email, {
        competitorChanges: formValues.competitorChanges,
        criticalAlerts: formValues.criticalAlerts,
        weeklyReport: formValues.weeklyReport,
      });

      setWorkspace((current) =>
        current
          ? {
              ...current,
              notifications,
            }
          : current,
      );

      await refreshWorkspace();
      setSaved(true);
      window.setTimeout(() => setSaved(false), 1800);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-extrabold tracking-tight">Settings</h1>
      <p className="mt-1 text-text-secondary">
        Manage your store connection and account preferences.
      </p>

      <div className="card mt-8 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
              Current plan
            </p>
            <p className="mt-1 text-xl font-bold">{workspace.profile.plan.toUpperCase()}</p>
            <p className="mt-1 text-sm text-text-secondary">
              {workspace.summary.recentScanCount} scans completed &middot; Upgrade for monitoring and more automation
            </p>
          </div>
          <a
            href="/dashboard/billing"
            className="btn-primary rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
          >
            Upgrade
          </a>
        </div>
      </div>

      <div className="card mt-6 p-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
          Store connection
        </p>
        <div className="mt-4 grid gap-4">
          <label className="block">
            <span className="text-sm text-text-secondary">Store name</span>
            <input
              type="text"
              value={formValues.name}
              onChange={(event) =>
                setFormValues((current) => ({ ...current, name: event.target.value }))
              }
              className="landing-input mt-1.5"
              placeholder="Findable Demo Store"
            />
          </label>

          <label className="block">
            <span className="text-sm text-text-secondary">Platform</span>
            <select
              value={formValues.platform ?? "shopify"}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  platform: event.target.value as typeof current.platform,
                }))
              }
              className="landing-input mt-1.5"
            >
              <option value="shopify">Shopify</option>
              <option value="woocommerce">WooCommerce</option>
              <option value="bigcommerce">BigCommerce</option>
              <option value="custom">Custom</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-text-secondary">Store URL</span>
            <input
              type="url"
              value={formValues.url}
              onChange={(event) =>
                setFormValues((current) => ({ ...current, url: event.target.value }))
              }
              className="landing-input landing-input-mono mt-1.5"
              placeholder="https://your-store.com"
            />
          </label>

          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ccff00]/20 bg-[#ccff00]/10">
                <Store className="h-5 w-5 text-[#ccff00]" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {workspace.store.status === "connected" ? "Store connected" : "Store not connected"}
                </p>
                <p className="text-xs text-text-muted">
                  {workspace.store.url ?? "Save a store URL to connect the workspace."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-6 p-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
          Account
        </p>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="text-sm text-text-secondary">Email</span>
            <input type="email" value={workspace.profile.email} className="landing-input mt-1.5" disabled />
          </label>
          <a
            href="/dashboard/billing"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#ccff00]"
          >
            Manage billing
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="card mt-6 p-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
          Notifications
        </p>
        <div className="mt-4 space-y-4">
          <ToggleRow
            label="Weekly score report"
            description="Receive a summary of score changes every Monday."
            checked={formValues.weeklyReport}
            onChange={(value) =>
              setFormValues((current) => ({ ...current, weeklyReport: value }))
            }
          />
          <ToggleRow
            label="Critical issue alerts"
            description="Get notified immediately when a critical issue is detected."
            checked={formValues.criticalAlerts}
            onChange={(value) =>
              setFormValues((current) => ({ ...current, criticalAlerts: value }))
            }
          />
          <ToggleRow
            label="Competitor changes"
            description="Alert when a competitor's score changes significantly."
            checked={formValues.competitorChanges}
            onChange={(value) =>
              setFormValues((current) => ({ ...current, competitorChanges: value }))
            }
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => void handleSave()}
          disabled={isSaving}
          className="btn-primary rounded-xl px-6 py-3 text-sm font-semibold text-white"
        >
          {isSaving ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" /> Saving
            </>
          ) : saved ? (
            <>
              <Check className="h-4 w-4" /> Saved
            </>
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (nextValue: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-0.5 text-xs text-text-muted">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-[#ccff00]" : "bg-white/10"
        }`}
        role="switch"
        aria-checked={checked}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
