import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { usePageTitle } from "../../hooks/usePageTitle";
import { STOCKPROOF_BRAND } from "../../lib/brand";

const STEPS = [
  {
    title: "Add suppliers and SKU mappings",
    body: "Map each supplier's SKU and barcode to the matching Shopify variant and inventory item, so receipts can resolve straight to the right product.",
  },
  {
    title: "Receive goods by barcode or CSV",
    body: "Scan a barcode at the dock, or import a CSV from a supplier or 3PL. StockProof creates a draft receipt with the SKU, quantity, and unit cost.",
  },
  {
    title: "Review matched and unmatched SKUs",
    body: "Before anything writes to Shopify, the team reviews the draft. Unmatched SKUs are flagged so they can be mapped or rejected.",
  },
  {
    title: "Commit to Shopify inventory",
    body: "Approved receipts are pushed to Shopify as inventory adjustments at the correct location, with the before/after quantity captured for the audit trail.",
  },
  {
    title: "Import the supplier invoice",
    body: "When the invoice arrives, import it as a CSV and StockProof matches lines against received stock using SKU/barcode/variant ID.",
  },
  {
    title: "Compare quantity and value",
    body: "StockProof flags quantity and value variances per line so the team can see exactly what arrived, what was charged, and where they disagree.",
  },
  {
    title: "Export a variance report",
    body: "Export a clean reconciliation report — quantity variances, value variances, notes — for accounting, supplier disputes, or internal review.",
  },
];

export function HowReceivingWorksPage() {
  usePageTitle("How it works", STOCKPROOF_BRAND.name);

  return (
    <section className="relative px-5 pb-24 pt-16 sm:px-6 sm:pt-20">
      <div className="mx-auto flex max-w-3xl flex-col gap-12">
        <header className="flex flex-col gap-5">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
            How it works
          </div>
          <h1 className="font-display text-3xl leading-[1.1] tracking-tight sm:text-5xl">
            From dock to inventory to invoice.
          </h1>
          <p className="text-[15px] leading-relaxed text-text-secondary">
            Each step writes to the audit trail, so you can prove what arrived, what was charged,
            and what changed in Shopify.
          </p>
        </header>

        <ol className="flex flex-col gap-4">
          {STEPS.map((step, idx) => (
            <li key={step.title} className="card-glass flex flex-col gap-3 p-6 sm:flex-row sm:gap-5">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-black"
                style={{ backgroundColor: STOCKPROOF_BRAND.accent }}
              >
                {idx + 1}
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-[16px] font-semibold leading-tight text-white">{step.title}</h2>
                <p className="text-[14px] leading-relaxed text-text-secondary">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="card-glass-panel flex flex-col gap-4 p-7 text-center">
          <p className="text-[14px] leading-relaxed text-text-secondary">
            Ready to put receiving and reconciliation on rails?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={STOCKPROOF_BRAND.shopifyAppStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-black transition hover:opacity-90"
              style={{ backgroundColor: STOCKPROOF_BRAND.accent }}
            >
              Get StockProof on Shopify
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/stockproof/why-variances-matter"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-semibold text-white transition hover:border-white/30"
            >
              Why variances matter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
