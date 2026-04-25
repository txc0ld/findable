import { useState } from "react";
import { Check, ExternalLink, LoaderCircle, Store } from "lucide-react";

import { useDashboardContext } from "../../lib/dashboard-context";
import { updateNotifications, updateStore } from "../../lib/workspace-api";

export function SettingsPage() {
  const { refreshWorkspace, setWorkspace, workspace } = useDashboardContext();
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

  const [shopifyShop, setShopifyShop] = useState(workspace.store.shopifyShop ?? "");

  async function handleConnectShopify() {
    if (!shopifyShop.trim()) {
      alert("Please enter your .myshopify.com domain.");
      return;
    }
    const cleanShop = shopifyShop.trim().toLowerCase().replace(/^https?:\/\//, "").split("/")[0];
    const viteApiUrl = import.meta.env.VITE_API_URL;
    let apiBase = "http://localhost:3001";
    if (typeof viteApiUrl === "string" && viteApiUrl) {
      apiBase = viteApiUrl;
    } else if (typeof window !== "undefined" && window.location.origin) {
      apiBase = window.location.origin;
    }
    const shopParam: string = cleanShop || "";
    window.location.href = apiBase + "/api/shopify?shop=" + encodeURIComponent(shopParam);
  }

  async function handleSave() {
    setIsSaving(true);
    try {
      if (formValues.url.trim()) {
        await updateStore({
          name: formValues.name.trim() || "Connected Store",
          platform: formValues.platform,
          url: formValues.url.trim(),
        });
      }
      const notifications = await updateNotifications({
        competitorChanges: formValues.competitorChanges,
        criticalAlerts: formValues.criticalAlerts,
        weeklyReport: formValues.weeklyReport,
      });
      setWorkspace((current) =>
        current ? { ...current, notifications } : current,
      );
      await refreshWorkspace();
      setSaved(true);
      window.setTimeout(() => setSaved(false), 1800);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-white/50">
          Manage your store connection and preferences.
        </p>
      </div>

      {/* Current plan */}
      <div className="card p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
              Current plan
            </p>
            <p className="mt-1 text-xl font-bold">{workspace.profile.plan.toUpperCase()}</p>
            <p className="mt-1 text-sm text-white/50">
              {workspace.summary.recentScanCount} scans completed
            </p>
          </div>
          <a
            href="/dashboard/billing"
            className="btn-primary rounded-xl px-4 py-2.5 text-sm font-semibold"
          >
            Upgrade
          </a>
        </div>
      </div>

      {/* Store connection */}
      <div className="card p-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
          Store connection
        </p>
        <div className="mt-5 grid gap-4">
          <label className="block">
            <span className="text-xs font-medium text-white/60">Store name</span>
            <input
              type="text"
              value={formValues.name}
              onChange={(e) => setFormValues((c) => ({ ...c, name: e.target.value }))}
              className="landing-input mt-1.5"
              placeholder="My Store"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-white/60">Platform</span>
            <select
              value={formValues.platform ?? "shopify"}
              onChange={(e) => setFormValues((c) => ({ ...c, platform: e.target.value as typeof c.platform }))}
              className="landing-input mt-1.5"
            >
              <option value="shopify">Shopify</option>
              <option value="woocommerce">WooCommerce</option>
              <option value="bigcommerce">BigCommerce</option>
              <option value="custom">Custom</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-medium text-white/60">Store URL</span>
            <input
              type="url"
              value={formValues.url}
              onChange={(e) => setFormValues((c) => ({ ...c, url: e.target.value }))}
              className="landing-input landing-input-mono mt-1.5"
              placeholder="https://your-store.com"
            />
          </label>

          {formValues.platform === "shopify" && (
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <label className="block">
                <span className="text-xs font-medium text-white/60">Shopify Domain</span>
                <div className="mt-1.5 flex gap-2">
                  <input
                    type="text"
                    value={shopifyShop}
                    onChange={(e) => setShopifyShop(e.target.value)}
                    className="landing-input landing-input-mono flex-1"
                    placeholder="your-store.myshopify.com"
                  />
                  <button
                    onClick={handleConnectShopify}
                    className="btn-primary shrink-0 rounded-xl px-4 py-2 text-sm font-semibold"
                  >
                    Connect
                  </button>
                </div>
                <p className="mt-2 text-[10px] text-white/40">
                  Click connect to authorize the Findable app in your Shopify admin.
                </p>
              </label>
            </div>
          )}

          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ccff00]/20 bg-[#ccff00]/10">
                <Store className="h-5 w-5 text-[#ccff00]" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {workspace.store.status === "connected" ? "Store connected" : "Not connected"}
                </p>
                <p className="text-xs text-white/40">
                  {workspace.store.shopifyShop ?? workspace.store.url ?? "Save a store URL to connect."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account */}
      <div className="card p-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
          Account
        </p>
        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="text-xs font-medium text-white/60">Email</span>
            <input type="email" value={workspace.profile.email} className="landing-input mt-1.5" disabled />
          </label>
          <div className="flex gap-6">
            <a href="/dashboard/billing" className="inline-flex items-center gap-1.5 text-xs font-medium text-[#ccff00]">
              Manage billing <ExternalLink className="h-3 w-3" />
            </a>
            <a href="/forgot-password" className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50 transition hover:text-[#ccff00]">
              Reset password <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card p-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
          Notifications
        </p>
        <div className="mt-5 space-y-5">
          <ToggleRow
            label="Weekly score report"
            description="Summary of score changes every Monday."
            checked={formValues.weeklyReport}
            onChange={(v) => setFormValues((c) => ({ ...c, weeklyReport: v }))}
          />
          <ToggleRow
            label="Critical issue alerts"
            description="Immediate notification on critical issues."
            checked={formValues.criticalAlerts}
            onChange={(v) => setFormValues((c) => ({ ...c, criticalAlerts: v }))}
          />
          <ToggleRow
            label="Competitor changes"
            description="Alert when competitor scores change."
            checked={formValues.competitorChanges}
            onChange={(v) => setFormValues((c) => ({ ...c, competitorChanges: v }))}
          />
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={() => void handleSave()}
          disabled={isSaving}
          className="btn-primary rounded-xl px-6 py-3 text-sm font-semibold"
        >
          {isSaving ? (
            <><LoaderCircle className="h-4 w-4 animate-spin" /> Saving</>
          ) : saved ? (
            <><Check className="h-4 w-4" /> Saved</>
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
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-0.5 text-xs text-white/40">{description}</p>
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
