import { Link } from "react-router-dom";
import { ArrowRight, Boxes, PackageCheck, Sparkles } from "lucide-react";
import type { ComponentType } from "react";

import { usePageTitle } from "../../hooks/usePageTitle";
import {
  FINDABLE_BRAND,
  STOCKPROOF_BRAND,
  UMBRELLA_BRAND,
  type ProductBrand,
} from "../../lib/brand";

const PRODUCT_ICONS: Record<ProductBrand["key"], ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  findable: Sparkles,
  stockproof: PackageCheck,
};

export function UmbrellaHomePage() {
  usePageTitle(UMBRELLA_BRAND.tagline);

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
      <div className="pointer-events-none absolute left-1/2 top-[10%] h-[260px] w-[420px] -translate-x-1/2 rounded-full bg-white/5 blur-[80px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 sm:gap-16">
        <header className="flex max-w-3xl flex-col items-center gap-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-text-secondary">
            <Boxes className="h-3 w-3" />
            <span>{UMBRELLA_BRAND.name}</span>
          </div>
          <h1 className="font-display text-balance text-3xl leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            {UMBRELLA_BRAND.tagline}.
          </h1>
          <p className="max-w-xl text-[15px] leading-relaxed text-text-secondary sm:text-base">
            Two apps for Shopify merchants. Pick the one that solves the problem in front of you — install from the Shopify App Store, or read on for what each does.
          </p>
        </header>

        <div className="grid w-full gap-5 sm:grid-cols-2 sm:gap-6">
          <ProductTile product={FINDABLE_BRAND} />
          <ProductTile product={STOCKPROOF_BRAND} />
        </div>

        <div className="text-center text-[12px] uppercase tracking-[0.18em] text-text-muted">
          Two apps. One team behind them.
        </div>
      </div>
    </section>
  );
}

function ProductTile({ product }: { product: ProductBrand }) {
  const Icon = PRODUCT_ICONS[product.key];
  return (
    <Link
      to={product.href}
      className="card-glass group relative flex flex-col gap-6 overflow-hidden p-7 transition sm:p-8"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-2xl transition group-hover:opacity-40"
        style={{ backgroundColor: product.accent }}
      />
      <div className="relative flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5"
          style={{ boxShadow: `0 0 25px ${product.accent}25` }}
        >
          <Icon className="h-5 w-5" style={{ color: product.accent }} />
        </div>
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
            App
          </div>
          <div className="text-lg font-bold text-white">{product.name}</div>
        </div>
      </div>

      <div className="relative flex flex-col gap-3">
        <h2 className="text-balance text-xl font-semibold leading-tight text-white sm:text-2xl">
          {product.tagline}
        </h2>
        <p className="text-[14px] leading-relaxed text-text-secondary">
          {product.description}
        </p>
      </div>

      <ul className="relative flex flex-col gap-2 text-[13px] text-text-secondary">
        {product.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <span
              className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: product.accent }}
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-auto flex items-center justify-between border-t border-white/5 pt-5 text-[13px] font-medium">
        <span className="text-white">Open {product.name}</span>
        <ArrowRight
          className="h-4 w-4 transition group-hover:translate-x-1"
          style={{ color: product.accent }}
        />
      </div>
    </Link>
  );
}
