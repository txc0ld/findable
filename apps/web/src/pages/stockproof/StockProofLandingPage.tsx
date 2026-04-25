import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Barcode,
  CheckCircle2,
  ClipboardList,
  FileSpreadsheet,
  Layers,
  PackageCheck,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { usePageTitle } from "../../hooks/usePageTitle";
import { STOCKPROOF_BRAND } from "../../lib/brand";

const FEATURES = [
  {
    icon: ScanLine,
    title: "Goods receiving log",
    body: "Receive stock by barcode entry or CSV import — whichever your team already uses.",
  },
  {
    icon: Layers,
    title: "Shopify inventory updates",
    body: "Convert approved receipts into Shopify inventory adjustments at the right location.",
  },
  {
    icon: ClipboardList,
    title: "SKU and variant tracking",
    body: "Records supplier SKU, Shopify SKU, barcode, variant ID, inventory item ID, and location.",
  },
  {
    icon: BarChart3,
    title: "Receipt value capture",
    body: "Stores quantity received, unit cost, and total receipt value at the time stock is booked.",
  },
  {
    icon: ShieldCheck,
    title: "User audit trail",
    body: "Tracks who created and committed each receipt, with timestamps you can audit.",
  },
  {
    icon: CheckCircle2,
    title: "Before/after inventory",
    body: "Captures the inventory quantity before and after every receiving event.",
  },
  {
    icon: FileSpreadsheet,
    title: "Supplier invoice matching",
    body: "Import supplier invoice CSVs and match them against received stock automatically.",
  },
  {
    icon: Sparkles,
    title: "Variance reporting",
    body: "Flags quantity and value differences between received goods and supplier invoices.",
  },
];

const WORKFLOW = [
  "Add suppliers and SKU mappings.",
  "Receive goods by barcode or CSV.",
  "Review matched and unmatched SKUs before committing.",
  "Commit approved receipts to Shopify inventory.",
  "Import the supplier invoice.",
  "Compare received quantity and value against the invoice.",
  "Export a variance report with notes.",
];

const IDEAL_FOR = [
  "Shopify merchants with large SKU catalogues",
  "Retailers receiving frequent supplier shipments",
  "Teams using CSVs, barcode scanners, or spreadsheets for receiving",
  "Businesses that need proof for supplier disputes",
  "Stores where multiple staff adjust inventory",
  "Operators who need receipt-time stock value, not just inventory counts",
];

export function StockProofLandingPage() {
  usePageTitle(STOCKPROOF_BRAND.tagline, STOCKPROOF_BRAND.name);

  return (
    <>
      <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
        <div
          className="pointer-events-none absolute left-1/2 top-[15%] h-[260px] w-[420px] -translate-x-1/2 rounded-full opacity-30 blur-[80px]"
          style={{ backgroundColor: `${STOCKPROOF_BRAND.accent}25` }}
        />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-7 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-text-secondary">
            <Barcode className="h-3 w-3" style={{ color: STOCKPROOF_BRAND.accent }} />
            <span>For Shopify merchants</span>
          </div>
          <h1 className="font-display text-balance text-4xl leading-[1.05] tracking-tight sm:text-6xl">
            Did the value of goods received{" "}
            <span style={{ color: STOCKPROOF_BRAND.accent }}>match the invoice</span>?
          </h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-text-secondary sm:text-base">
            {STOCKPROOF_BRAND.description}
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
              to="/stockproof/how-receiving-works"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-semibold text-white transition hover:border-white/30"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-3 sm:mb-12">
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
              What it does
            </div>
            <h2 className="font-display text-2xl leading-tight tracking-tight sm:text-4xl">
              From dock to inventory to invoice — proven.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="card-glass flex flex-col gap-3 p-5">
                <feature.icon className="h-5 w-5" style={{ color: STOCKPROOF_BRAND.accent }} />
                <div className="text-[14px] font-semibold text-white">{feature.title}</div>
                <p className="text-[13px] leading-relaxed text-text-secondary">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="flex flex-col gap-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
              Core workflow
            </div>
            <h2 className="font-display text-2xl leading-tight tracking-tight sm:text-4xl">
              One pass, end to end.
            </h2>
            <p className="text-[14px] leading-relaxed text-text-secondary">
              StockProof links physical stock receipt, Shopify inventory movement, and supplier
              invoice reconciliation in a single workflow.
            </p>
          </div>
          <ol className="flex flex-col gap-3">
            {WORKFLOW.map((step, idx) => (
              <li key={step} className="card-glass flex items-start gap-4 p-4">
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-black"
                  style={{ backgroundColor: STOCKPROOF_BRAND.accent }}
                >
                  {idx + 1}
                </div>
                <span className="text-[14px] leading-relaxed text-white">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative px-5 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
              Ideal for
            </div>
            <h2 className="font-display text-2xl leading-tight tracking-tight sm:text-4xl">
              Built for the team unloading the truck.
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {IDEAL_FOR.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-4">
                <PackageCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: STOCKPROOF_BRAND.accent }} />
                <span className="text-[14px] leading-relaxed text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative px-5 pb-24 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="card-glass-panel flex flex-col gap-5 p-8 text-center sm:p-12">
            <div
              className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: `${STOCKPROOF_BRAND.accent}15` }}
            >
              <PackageCheck className="h-5 w-5" style={{ color: STOCKPROOF_BRAND.accent }} />
            </div>
            <p className="font-display text-balance text-2xl leading-snug sm:text-3xl">
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
                to="/stockproof/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-semibold text-white transition hover:border-white/30"
              >
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
