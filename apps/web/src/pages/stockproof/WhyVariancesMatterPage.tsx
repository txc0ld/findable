import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { usePageTitle } from "../../hooks/usePageTitle";
import { STOCKPROOF_BRAND } from "../../lib/brand";

const SCENARIOS = [
  {
    title: "Quantity variance",
    body:
      "The supplier invoice charges for 100 units. The receiving team books 96 in Shopify because four were damaged. Without StockProof, no one connects the two events. With StockProof, the variance is flagged at the line level with notes for the supplier dispute.",
  },
  {
    title: "Value variance",
    body:
      "Quantities match exactly, but the unit cost on the invoice is 4% higher than the agreed price. Shopify's inventory log can't show that — it only shows the count moved. StockProof captures the receipt-time cost and surfaces the value gap for accounting.",
  },
  {
    title: "Audit gap",
    body:
      "Two people booked receipts against the same PO. Shopify shows the inventory move, but not who booked which receipt or what the line totals were when committed. StockProof records the user, the timestamp, and the before/after numbers for every receipt.",
  },
];

export function WhyVariancesMatterPage() {
  usePageTitle("Why variances matter", STOCKPROOF_BRAND.name);

  return (
    <section className="relative px-5 pb-24 pt-16 sm:px-6 sm:pt-20">
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <header className="flex flex-col gap-5">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
            Why variances matter
          </div>
          <h1 className="font-display text-3xl leading-[1.1] tracking-tight sm:text-5xl">
            Shopify shows what changed. Not whether it should have.
          </h1>
          <p className="text-[15px] leading-relaxed text-text-secondary">
            Inventory adjustments tell you that a number moved. They don't answer the operational
            question: did the value of goods received match the value on the supplier invoice?
            That gap is where margin quietly leaks.
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {SCENARIOS.map((scenario) => (
            <div key={scenario.title} className="card-glass flex flex-col gap-3 p-6">
              <h2 className="text-[16px] font-semibold leading-tight text-white">
                {scenario.title}
              </h2>
              <p className="text-[14px] leading-relaxed text-text-secondary">{scenario.body}</p>
            </div>
          ))}
        </div>

        <div className="card-glass-panel flex flex-col gap-4 p-7 text-center">
          <p className="font-display text-balance text-xl leading-snug sm:text-2xl">
            {STOCKPROOF_BRAND.positioningLine}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={STOCKPROOF_BRAND.shopifyAppStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-black transition hover:opacity-90"
              style={{ backgroundColor: STOCKPROOF_BRAND.accent }}
            >
              Install StockProof
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/stockproof/faq"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-semibold text-white transition hover:border-white/30"
            >
              Read the FAQ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
