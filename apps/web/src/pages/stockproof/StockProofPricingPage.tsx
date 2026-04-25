import { ArrowRight } from "lucide-react";

import { usePageTitle } from "../../hooks/usePageTitle";
import { STOCKPROOF_BRAND } from "../../lib/brand";

export function StockProofPricingPage() {
  usePageTitle(`${STOCKPROOF_BRAND.name} pricing`);

  return (
    <section className="relative px-5 pb-24 pt-16 sm:px-6 sm:pt-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
          Pricing
        </div>
        <h1 className="font-display text-3xl leading-[1.1] tracking-tight sm:text-4xl">
          Pricing on the Shopify App Store.
        </h1>
        <p className="max-w-xl text-[15px] leading-relaxed text-text-secondary">
          {STOCKPROOF_BRAND.name} is billed through Shopify, so the current plan and any free trial
          are managed inside your Shopify admin.
        </p>
        <a
          href={STOCKPROOF_BRAND.shopifyAppStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-black transition hover:opacity-90"
          style={{ backgroundColor: STOCKPROOF_BRAND.accent }}
        >
          See pricing on Shopify
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
