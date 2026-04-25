import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ArrowLeft, Menu, Sparkles, X } from "lucide-react";

import { FINDABLE_BRAND, UMBRELLA_BRAND } from "../../lib/brand";

const NAV_LINKS = [
  { to: "/findable/what-we-scan", label: "Product Map" },
  { to: "/findable/how-reports-work", label: "Report Flow" },
  { to: "/findable/pricing", label: "Pricing" },
  { to: "/findable/what-is-aeo", label: "What is AEO?", accent: true },
];

const FOOTER_PRODUCT = [
  { to: "/findable/what-we-scan", label: "What we scan" },
  { to: "/findable/how-reports-work", label: "How reports work" },
  { to: "/findable/pricing", label: "Plans" },
  { to: "/findable/glossary", label: "Glossary" },
];

const FOOTER_COMPANY = [
  { to: "/findable/login", label: "Dashboard" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
];

export function FindableLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="theme-findable min-h-screen overflow-x-hidden bg-bg-primary text-text-primary">
      <div className="border-b border-white/5 bg-bg-primary/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted sm:px-6">
          <Link to="/" className="flex items-center gap-2 transition hover:text-white">
            <ArrowLeft className="h-3 w-3" />
            <span>{UMBRELLA_BRAND.name} apps</span>
          </Link>
          <Link to="/findable/login" className="hidden transition hover:text-white sm:inline">
            Sign in →
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/5 bg-bg-primary/95 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
          <Link to="/findable" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-white/10 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-white">
              {FINDABLE_BRAND.name.toUpperCase()}
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-[13px] font-medium tracking-wide text-text-secondary md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `transition hover:text-white ${
                    link.accent ? "text-[var(--accent)]" : ""
                  } ${isActive ? "text-white" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/findable/login" className="transition hover:text-white">
              Dashboard
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/5 bg-bg-primary px-5 pb-6 pt-4 md:hidden">
            <div className="flex flex-col gap-4 text-sm font-medium text-text-secondary">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `transition hover:text-white ${
                      link.accent ? "text-[var(--accent)]" : ""
                    } ${isActive ? "text-white" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/findable/glossary"
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-white"
              >
                Glossary
              </Link>
              <Link
                to="/findable/login"
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-white"
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="relative">
        <Outlet />
      </main>

      <footer className="border-t border-white/5 bg-[#020205] py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded border border-white/10 bg-white/5">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                  {FINDABLE_BRAND.name.toUpperCase()}
                </span>
              </div>
              <p className="mt-4 max-w-sm text-sm text-text-muted">
                AI commerce readiness scanning, reporting, and remediation for product teams.
              </p>
            </div>
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                Product
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-text-muted">
                {FOOTER_PRODUCT.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                Company
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-text-muted">
                {FOOTER_COMPANY.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/" className="transition hover:text-white">
                    {UMBRELLA_BRAND.name}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
            <p className="text-xs text-text-muted">
              &copy; 2026 {UMBRELLA_BRAND.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
