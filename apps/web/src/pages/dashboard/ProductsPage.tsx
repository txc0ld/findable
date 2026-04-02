import { Link } from "react-router-dom";
import { AlertTriangle, Package } from "lucide-react";

import { useDashboardContext } from "../../lib/dashboard-context";
import { getScoreTone } from "../../lib/scores";

function ScorePill({ label, value }: { label: string; value: number }) {
  const tone = getScoreTone(value);

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-text-muted">{label}</span>
      <span className={`text-sm font-semibold tabular-nums ${tone.accentClass}`}>
        {value}
      </span>
    </div>
  );
}

export function ProductsPage() {
  const { workspace } = useDashboardContext();

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Products</h1>
      <p className="mt-1 text-text-secondary">
        All scanned products with their AI readiness scores.
      </p>

      <div className="mt-8 space-y-3">
        {workspace.products.length > 0 ? (
          workspace.products.map((product) => {
            const tone = getScoreTone(product.overallScore);

            return (
              <Link
                key={product.productId}
                to={`/dashboard/products/${product.productId}`}
                className="card flex items-center gap-4 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/12"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Package className="h-5 w-5 text-text-muted" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{product.name}</p>
                  <p className="truncate text-xs text-text-muted">{product.url}</p>
                </div>

                <div className="hidden items-center gap-6 sm:flex">
                  <ScorePill label="Schema" value={product.schemaScore} />
                  <ScorePill label="LLM" value={product.llmScore} />
                  <div className="flex items-center gap-1.5 text-sm">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-text-secondary">{product.issueCount}</span>
                  </div>
                </div>

                <p className={`text-2xl font-bold tabular-nums ${tone.accentClass}`}>
                  {product.overallScore}
                </p>
              </Link>
            );
          })
        ) : (
          <div className="card p-6 text-sm text-text-secondary">
            No product records yet. Run a scan to populate this view.
          </div>
        )}
      </div>
    </div>
  );
}
