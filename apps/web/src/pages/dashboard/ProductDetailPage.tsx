import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";

import { IssueCard } from "../../components/IssueCard";
import { ScoreRing } from "../../components/ScoreRing";
import { useDashboardContext } from "../../lib/dashboard-context";
import { getScoreTone } from "../../lib/scores";

export function ProductDetailPage() {
  const { id } = useParams();
  const { workspace } = useDashboardContext();
  const product = workspace.products.find((entry) => entry.productId === id);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-semibold">Product not found</p>
        <Link
          to="/dashboard/products"
          className="mt-4 inline-block text-sm text-[#ccff00] hover:text-[#ccff00]"
        >
          &larr; Back to products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/dashboard/products"
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Products
      </Link>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">{product.name}</h1>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-sm text-text-muted transition hover:text-text-primary"
          >
            {product.url}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-text-muted">
          {product.category}
        </span>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="card flex items-center justify-center p-8">
          <ScoreRing score={product.overallScore} />
        </div>

        <div className="space-y-4">
          <DimensionBar label="Schema Intelligence" value={product.schemaScore} />
          <DimensionBar label="LLM Discoverability" value={product.llmScore} />
          <DimensionBar label="Protocol Compliance" value={product.protocolScore} />

          <div className="card mt-6 p-5">
            <p className="text-sm font-semibold">Fix summary</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <span className="text-text-secondary">
                <strong className="text-text-primary">{product.issues.length}</strong> total issues
              </span>
              <span className="text-text-secondary">
                <strong className="text-emerald-400">
                  {product.issues.filter((issue) => issue.fixType === "auto").length}
                </strong>{" "}
                auto-fixable
              </span>
              <span className="text-text-secondary">
                <strong className="text-text-primary">
                  +{product.issues.reduce((sum, issue) => sum + issue.pointsImpact, 0)}
                </strong>{" "}
                points available
              </span>
            </div>
            <div className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-400 sm:w-auto">
              <Check className="h-4 w-4" />
              {product.status === "fixed" ? "All fixes applied" : "Auto-fix available"}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold">Issues ({product.issues.length})</h2>
        <div className="mt-4 space-y-3">
          {product.issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold">JSON-LD Preview</h2>
        <p className="mt-1 text-sm text-text-secondary">
          What FINDABLE would inject into this product page.
        </p>
        <div className="card mt-4 overflow-hidden border-emerald-500/15">
          <div className="flex items-center gap-2.5 border-b border-emerald-500/10 px-6 py-3">
            <Check className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">
              Generated Schema
            </span>
          </div>
          <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-relaxed text-cyan-300/70">
            {JSON.stringify(product.generatedSchema ?? {}, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

function DimensionBar({ label, value }: { label: string; value: number }) {
  const tone = getScoreTone(value);

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{label}</p>
        <p className={`text-lg font-bold tabular-nums ${tone.accentClass}`}>{value}</p>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${value}%`,
            background: tone.color,
          }}
        />
      </div>
    </div>
  );
}
