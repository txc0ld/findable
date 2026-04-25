import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Layers, Menu, X } from "lucide-react";

import { UMBRELLA_BRAND } from "../../lib/brand";

const NAV_LINKS = [
  { to: "/", label: "Apps" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const FOOTER_LINKS = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
];

export function UmbrellaLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-bg-primary text-text-primary">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-bg-primary/95 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-white/10 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <Layers className="h-4 w-4 text-white" />
            </div>
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-white">
              {UMBRELLA_BRAND.name}
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-[13px] font-medium tracking-wide text-text-secondary md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `transition hover:text-white ${isActive ? "text-white" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
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
                  end={link.to === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `transition hover:text-white ${isActive ? "text-white" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="relative">
        <Outlet />
      </main>

      <footer className="border-t border-white/5 bg-bg-primary/95">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <Layers className="h-4 w-4 text-text-secondary" />
            <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-text-secondary">
              {UMBRELLA_BRAND.name}
            </span>
          </div>
          <div className="flex flex-wrap gap-6 text-[12px] font-medium text-text-secondary">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
