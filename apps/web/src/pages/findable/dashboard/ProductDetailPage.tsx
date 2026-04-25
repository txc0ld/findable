import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";

import { CopyButton } from "../../../components/CopyButton";
import { IssueCard } from "../../../components/IssueCard";
import { ScoreRing } from "../../../components/ScoreRing";
import { useDashboardContext } from "../../../lib/dashboard-context";
import { getScoreTone } from "../../../lib/scores";

export function ProductDetailPage() {
  const { id } = useParams();
  const { workspace } = useDashboardContext();
  const product = workspace.products.find((entry) => entry.productId === id);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-semibold">Product not found</p>
        <Link
          to="/findable/dashboard/products"
          className="mt-4 inline-block text-sm text-[#ccff00]"
        >
          &larr; Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <Link
          to="/findable/dashboard/products"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50 transition hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Products
        </Link>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">{product.name}</h1>
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-xs text-[#53eafd] transition hover:text-[#53eafd]/80"
            >
              {product.url}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <span className="inline-flex w-fit items-center rounded-full border border-white/8 bg-white/5 px-3 py-1.5 text-xs text-white/50">
            {product.category}
          </span>
        </div>
      </div>

      {/* Score + dimensions */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="card flex items-center justify-center p-5 sm:p-8">
          <ScoreRing score={product.overallScore} />
        </div>

        <div className="space-y-3">
          <DimensionBar label="Schema Intelligence" value={product.schemaScore} />
          <DimensionBar label="LLM Discoverability" value={product.llmScore} />
          <DimensionBar label="Protocol Compliance" value={product.protocolScore} />

          <div className="card p-5">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">Fix summary</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <span className="text-white/50">
                <strong className="text-white">{product.issues.length}</strong> total issues
              </span>
              <span className="text-white/50">
                <strong className="text-emerald-400">
                  {product.issues.filter((i) => i.fixType === "auto").length}
                </strong>{" "}
                auto-fixable
              </span>
              <span className="text-white/50">
                <strong className="text-[#ccff00]">
                  +{product.issues.reduce((s, i) => s + i.pointsImpact, 0)}
                </strong>{" "}
                points available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Issues */}
      <div>
        <h2 className="text-lg font-bold">Issues ({product.issues.length})</h2>
        <div className="mt-4 space-y-3">
          {product.issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>

      {/* JSON-LD Preview */}
      <div>
        <h2 className="text-lg font-bold">JSON-LD Preview</h2>
        <p className="mt-1 text-sm text-white/50">
          What Findable would inject into this product page.
        </p>
        <div className="card mt-4 overflow-hidden border-emerald-500/15">
          <div className="flex items-center gap-2.5 border-b border-emerald-500/10 px-6 py-3">
            <Check className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">
              Generated Schema
            </span>
            <div className="ml-auto">
              <CopyButton text={JSON.stringify(product.generatedSchema ?? {}, null, 2)} />
            </div>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed text-cyan-300/70 sm:p-6 sm:text-[13px]">
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
          style={{ width: `${value}%`, background: tone.color }}
        />
      </div>
    </div>
  );
}
