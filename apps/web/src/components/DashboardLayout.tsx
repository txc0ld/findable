import { useEffect, useState } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import {
  AlertTriangle,
  BarChart3,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Package,
  Rss,
  Settings,
  Shield,
  Sparkles,
  Store,
  Wrench,
} from "lucide-react";
import type { WorkspaceData } from "@findable/shared";

import type { DashboardOutletContext } from "../lib/dashboard-context";
import { logout } from "../lib/auth-api";
import { clearAuthSession } from "../lib/session";
import { getWorkspace } from "../lib/workspace-api";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard", end: true },
  { label: "Products", icon: Package, path: "/dashboard/products", end: false },
  { label: "Issues", icon: AlertTriangle, path: "/dashboard/issues", end: true },
  { label: "Fixes", icon: Wrench, path: "/dashboard/fixes", end: true },
  { label: "Feeds", icon: Rss, path: "/dashboard/feeds", end: true },
  { label: "Competitors", icon: BarChart3, path: "/dashboard/competitors", end: true },
  { label: "Billing", icon: CreditCard, path: "/dashboard/billing", end: true },
  { label: "Admin", icon: Shield, path: "/dashboard/admin", end: true },
  { label: "Settings", icon: Settings, path: "/dashboard/settings", end: true },
];

const MOBILE_NAV = [
  { label: "Home", icon: LayoutDashboard, path: "/dashboard", end: true },
  { label: "Products", icon: Package, path: "/dashboard/products", end: false },
  { label: "Fixes", icon: Wrench, path: "/dashboard/fixes", end: true },
  { label: "Settings", icon: Settings, path: "/dashboard/settings", end: true },
];

function navClass(isActive: boolean) {
  return `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? "bg-[#ccff00]/10 text-[#ccff00]"
      : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
  }`;
}

export function DashboardLayout() {
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [hasResolvedAuth, setHasResolvedAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [workspace, setWorkspace] = useState<WorkspaceData | null>(null);

  async function refreshWorkspace() {
    setIsLoading(true);

    try {
      const nextWorkspace = await getWorkspace();
      setWorkspace(nextWorkspace);
      setError(null);
      setIsAuthenticated(true);
    } catch (nextError) {
      const message =
        nextError instanceof Error ? nextError.message : "Unable to load your workspace.";

      if (
        message === "Authentication required." ||
        message === "Refresh token invalid." ||
        message === "Refresh token missing."
      ) {
        clearAuthSession();
        setWorkspace(null);
        setError(null);
        setIsAuthenticated(false);
      } else {
        setError(message);
      }
    } finally {
      setIsLoading(false);
      setHasResolvedAuth(true);
    }
  }

  useEffect(() => {
    void refreshWorkspace();
  }, []);

  if (!hasResolvedAuth || (isLoading && !workspace)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-primary px-6 text-text-secondary">
        <div className="card-glass rounded-2xl px-6 py-4 text-sm uppercase tracking-[0.18em]">
          Loading Workspace
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!workspace || error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-primary px-6">
        <div className="card max-w-lg p-8 text-center">
          <p className="text-lg font-semibold">Workspace unavailable</p>
          <p className="mt-2 text-sm text-text-secondary">{error}</p>
          <button
            onClick={() => void refreshWorkspace()}
            className="btn-primary mt-6 rounded-xl px-6 py-3 text-sm font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const outletContext: DashboardOutletContext = {
    refreshWorkspace,
    setWorkspace,
    workspace,
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/5 bg-bg-secondary lg:flex">
        <a href="/" className="flex items-center gap-2.5 px-6 py-5">
          <Sparkles className="h-5 w-5 text-[#ccff00]" />
          <span className="text-sm font-bold uppercase tracking-[0.2em]">
            FINDABLE
          </span>
        </a>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map(({ label, icon: Icon, path, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) => navClass(isActive)}
            >
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/5 p-4">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ccff00]/15 text-xs font-bold text-[#ccff00]">
              {workspace.profile.email.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {workspace.store.name ?? "Unconnected Store"}
              </p>
              <p className="truncate text-xs text-text-muted">
                {workspace.profile.email}
              </p>
            </div>
            <button
              onClick={() => {
                void logout().finally(() => {
                  setWorkspace(null);
                  setIsAuthenticated(false);
                });
              }}
              className="text-text-muted transition hover:text-text-primary"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-white/5 bg-bg-primary/80 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-2.5 lg:pointer-events-none">
              <Sparkles className="h-5 w-5 text-[#ccff00] lg:hidden" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] lg:hidden">
                FINDABLE
              </span>
            </a>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-text-secondary">
                <Store className="h-3.5 w-3.5 text-[#ccff00]" />
                {workspace.store.status === "connected"
                  ? workspace.store.platform ?? "Connected"
                  : "No store connected"}
              </span>
              <span className="rounded-full border border-[#ccff00]/20 bg-[#ccff00]/10 px-3 py-1 text-xs font-medium text-[#ccff00]">
                {workspace.profile.plan.toUpperCase()} Plan
              </span>
            </div>
          </div>
        </header>

        <main className="p-6 pb-24 lg:pb-6">
          <Outlet context={outletContext} />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/5 bg-bg-primary/90 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-around py-2">
          {MOBILE_NAV.map(({ label, icon: Icon, path, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-1.5 text-[11px] transition-colors ${
                  isActive ? "text-[#ccff00]" : "text-text-muted"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
