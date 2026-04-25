import { usePageTitle } from "../../hooks/usePageTitle";
import { STOCKPROOF_BRAND } from "../../lib/brand";

const FAQ = [
  {
    q: "Does StockProof change my Shopify inventory automatically?",
    a: "No. StockProof creates a draft receipt that the team reviews. Only after a receipt is approved and committed does StockProof push an inventory adjustment to Shopify, at the location you specify.",
  },
  {
    q: "Can I receive without a barcode scanner?",
    a: "Yes. You can import a CSV from a supplier, 3PL, or a spreadsheet your team already maintains. Barcode scanning is supported but not required.",
  },
  {
    q: "What does StockProof capture that Shopify's inventory log doesn't?",
    a: "Receipt-time unit cost and total receipt value, before/after inventory at the moment of commit, the user who booked and committed each receipt, supplier SKU mappings, and matched/unmatched lines against supplier invoices.",
  },
  {
    q: "How does invoice matching work?",
    a: "Import the supplier invoice as a CSV and StockProof matches each invoice line to received stock by SKU, barcode, or variant ID. Unmatched lines and quantity/value variances are flagged for review.",
  },
  {
    q: "What happens to a receipt that has unmatched SKUs?",
    a: "It stays as a draft until the team either maps the unknown SKU to a Shopify variant or rejects the line. Nothing writes to Shopify inventory until the draft is approved and committed.",
  },
  {
    q: "Can multiple staff members commit receipts?",
    a: "Yes. Every action is recorded with the user and timestamp, so the audit trail shows exactly who did what and when.",
  },
  {
    q: "What format are the variance reports in?",
    a: "Exportable CSVs with quantity and value variance lines, suitable for accounting workflows, supplier disputes, or internal review.",
  },
];

export function StockProofFaqPage() {
  usePageTitle(`${STOCKPROOF_BRAND.name} FAQ`);

  return (
    <section className="relative px-5 pb-24 pt-16 sm:px-6 sm:pt-20">
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <header className="flex flex-col gap-5">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
            FAQ
          </div>
          <h1 className="font-display text-3xl leading-[1.1] tracking-tight sm:text-5xl">
            Things merchants ask first.
          </h1>
        </header>

        <div className="flex flex-col gap-3">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="card-glass group flex flex-col gap-2 p-5 [&[open]]:bg-white/[0.04]"
            >
              <summary className="cursor-pointer list-none text-[15px] font-semibold text-white marker:hidden">
                {item.q}
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
