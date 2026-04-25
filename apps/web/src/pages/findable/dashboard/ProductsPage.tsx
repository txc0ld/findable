import { Link } from "react-router-dom";
import { AlertTriangle, Package, ScanLine } from "lucide-react";

import { useDashboardContext } from "../../../lib/dashboard-context";
import { getScoreTone } from "../../../lib/scores";

function ScorePill({ label, value }: { label: string; value: number }) {
  const tone = getScoreTone(value);

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-white/40">{label}</span>
      <span className={`text-sm font-semibold tabular-nums ${tone.accentClass}`}>
        {value}
      </span>
    </div>
  );
}

export function ProductsPage() {
  const { workspace } = useDashboardContext();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Products</h1>
        <p className="mt-1 text-sm text-white/50">
          All scanned products with their AI readiness scores.
        </p>
      </div>

      <div className="space-y-2">
        {workspace.products.length > 0 ? (
          workspace.products.map((product) => {
            const tone = getScoreTone(product.overallScore);

            return (
              <Link
                key={product.productId}
                to={`/dashboard/products/${product.productId}`}
                className="card flex items-center gap-4 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/5">
                  <Package className="h-5 w-5 text-white/30" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{product.name}</p>
                  <p className="truncate text-xs text-[#53eafd]">{product.url}</p>
                </div>

                <div className="hidden items-center gap-6 sm:flex">
                  <ScorePill label="S" value={product.schemaScore} />
                  <ScorePill label="L" value={product.llmScore} />
                  <div className="flex items-center gap-1.5 text-sm">
                    <AlertTriangle className="h-3.5 w-3.5 text-[#ff3366]" />
                    <span className="text-white/60">{product.issueCount}</span>
                  </div>
                </div>

                <p className={`text-2xl font-bold tabular-nums ${tone.accentClass}`}>
                  {product.overallScore}
                </p>
              </Link>
            );
          })
        ) : (
          <div className="card flex flex-col items-center p-6 text-center sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/8 bg-white/5">
              <ScanLine className="h-6 w-6 text-white/30" />
            </div>
            <p className="mt-4 text-sm font-medium">No products yet</p>
            <p className="mt-1 text-xs text-white/40">Run a scan to populate this view with scored products.</p>
            <Link to="/findable" className="mt-5 inline-flex items-center rounded-lg border border-[#ccff00]/20 bg-[#ccff00]/10 px-4 py-2 text-xs font-semibold text-[#ccff00] transition hover:bg-[#ccff00]/20">
              Run a scan &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
