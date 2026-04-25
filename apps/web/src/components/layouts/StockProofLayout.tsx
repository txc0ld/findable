import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ArrowLeft, Menu, PackageCheck, X } from "lucide-react";

import { STOCKPROOF_BRAND, UMBRELLA_BRAND } from "../../lib/brand";

const NAV_LINKS = [
  { to: "/stockproof/how-receiving-works", label: "How it works" },
  { to: "/stockproof/why-variances-matter", label: "Variances" },
  { to: "/stockproof/pricing", label: "Pricing" },
  { to: "/stockproof/faq", label: "FAQ" },
];

export function StockProofLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-bg-primary text-text-primary">
      <div className="border-b border-white/5 bg-bg-primary/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted sm:px-6">
          <Link to="/" className="flex items-center gap-2 transition hover:text-white">
            <ArrowLeft className="h-3 w-3" />
            <span>{UMBRELLA_BRAND.name} apps</span>
          </Link>
          <a
            href={STOCKPROOF_BRAND.shopifyAppStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden transition hover:text-white sm:inline"
          >
            Get on Shopify →
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/5 bg-bg-primary/95 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
          <Link to="/stockproof" className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded border border-white/10 bg-white/5"
              style={{ boxShadow: `0 0 15px ${STOCKPROOF_BRAND.accent}33` }}
            >
              <PackageCheck className="h-4 w-4" style={{ color: STOCKPROOF_BRAND.accent }} />
            </div>
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-white">
              {STOCKPROOF_BRAND.name.toUpperCase()}
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-[13px] font-medium tracking-wide text-text-secondary md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `transition hover:text-white ${isActive ? "text-white" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href={STOCKPROOF_BRAND.shopifyAppStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-4 py-1.5 text-[12px] font-semibold text-black"
              style={{ backgroundColor: STOCKPROOF_BRAND.accent }}
            >
              Get on Shopify
            </a>
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
                    `transition hover:text-white ${isActive ? "text-white" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <a
                href={STOCKPROOF_BRAND.shopifyAppStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-full px-4 py-2 text-center text-[13px] font-semibold text-black"
                style={{ backgroundColor: STOCKPROOF_BRAND.accent }}
              >
                Get on Shopify
              </a>
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
            <PackageCheck className="h-4 w-4" style={{ color: STOCKPROOF_BRAND.accent }} />
            <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-text-secondary">
              {STOCKPROOF_BRAND.name}
            </span>
          </div>
          <div className="flex flex-wrap gap-6 text-[12px] font-medium text-text-secondary">
            <Link to="/stockproof" className="transition hover:text-white">Overview</Link>
            <Link to="/stockproof/pricing" className="transition hover:text-white">Pricing</Link>
            <Link to="/stockproof/faq" className="transition hover:text-white">FAQ</Link>
            <Link to="/privacy" className="transition hover:text-white">Privacy</Link>
            <Link to="/terms" className="transition hover:text-white">Terms</Link>
            <Link to="/" className="transition hover:text-white">{UMBRELLA_BRAND.name}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
