import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import { usePageTitle } from "../hooks/usePageTitle";
import { CopyButton } from "../components/CopyButton";
import { ScoreRing } from "../components/ScoreRing";
import { SectionReveal } from "../components/SectionReveal";
import {
  getScan,
  type ScanDetails,
  type ScanProductResult,
} from "../lib/scan-api";
import { getScoreTone } from "../lib/scores";

const POLL_INTERVAL_MS = 2500;
type CompletedScan = ScanDetails & {
  results: NonNullable<ScanDetails["results"]>;
  status: "complete";
};

export function ReportPage() {
  usePageTitle("Scan Report");
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scan, setScan] = useState<ScanDetails | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Missing scan ID.");
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    let timeoutId: number | undefined;

    const poll = async () => {
      try {
        const nextScan = await getScan(id);

        if (cancelled) {
          return;
        }

        setScan(nextScan);
        setError(null);
        setIsLoading(false);

        if (nextScan.status !== "complete" && nextScan.status !== "failed") {
          timeoutId = window.setTimeout(poll, POLL_INTERVAL_MS);
        }
      } catch (nextError) {
        if (cancelled) {
          return;
        }

        setError(
          nextError instanceof Error
            ? nextError.message
            : "Unable to load this scan report.",
        );
        setIsLoading(false);
      }
    };

    void poll();

    return () => {
      cancelled = true;

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [id]);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-bg-primary/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2.5">
            <Sparkles className="h-5 w-5 text-[#ccff00]" />
            <span className="text-sm font-bold uppercase tracking-[0.2em]">
              FINDABLE
            </span>
          </a>
          <CopyButton text={id ?? ""} className="text-text-muted" />
        </nav>
      </header>

      <main className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <StatePanel
              title="Unable to load this scan"
              body={error}
              tone="error"
            />
          ) : scan?.status === "failed" ? (
            <StatePanel
              title="This scan failed"
              body="The report could not be generated. Start a new scan or try again later."
              tone="error"
            />
          ) : scan?.status === "complete" && scan.results ? (
            <ReportResults scan={scan as CompletedScan} />
          ) : scan ? (
            <InProgressState scan={scan} />
          ) : (
            <StatePanel
              title="Scan not found"
              body="The requested scan could not be found."
              tone="error"
            />
          )}
        </div>
      </main>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center py-12 text-center sm:py-24">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#ccff00]/20 bg-[#ccff00]/10">
        <LoaderCircle className="h-8 w-8 animate-spin text-[#ccff00]" />
      </div>
      <p className="mt-6 text-xl font-bold">Loading your scan</p>
      <p className="mt-2 max-w-md text-sm text-text-secondary">
        Fetching the latest report state from the API.
      </p>
    </div>
  );
}

function InProgressState({ scan }: { scan: ScanDetails }) {
  const total = Math.max(scan.progress.total, 1);
  const progress = Math.min(
    scan.progress.total > 0
      ? (scan.progress.current / total) * 100
      : scan.status === "queued"
        ? 8
        : 40,
    100,
  );

  return (
    <div className="py-12 sm:py-24">
      <div className="card mx-auto max-w-2xl p-5 text-center sm:p-8 lg:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#ccff00]/20 bg-[#ccff00]/10">
          <LoaderCircle className="h-8 w-8 animate-spin text-[#ccff00]" />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#ccff00]">
          {getStatusLabel(scan.status)}
        </p>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
          Your report is still running
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-secondary">
          This page refreshes automatically while the scan moves through the
          queue and analysis pipeline.
        </p>

        <div className="mx-auto mt-10 w-full max-w-md">
          <div className="h-2 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-[#ccff00] transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mx-auto mt-6 flex flex-wrap justify-center gap-4">
          <FixStat
            label="Status"
            value={getStatusLabel(scan.status)}
            accent="indigo"
          />
          <FixStat
            label="Pages scanned"
            value={`${scan.progress.current}/${scan.progress.total}`}
          />
        </div>
      </div>
    </div>
  );
}

function ReportResults({ scan }: { scan: CompletedScan }) {
  const overallScore = scan.results.scores.overall ?? 0;
  const llmScore = scan.results.scores.llm ?? 0;
  const protocolScore = scan.results.scores.protocol ?? 0;
  const schemaScore = scan.results.scores.schema ?? 0;
  const report = scan.results.report;
  const products = report?.products ?? [];
  const topIssues = report?.topIssues ?? [];
  const totalProductFindings = products.reduce(
    (sum, product) => sum + product.issues.length,
    0,
  );
  const generatedAt = report?.generatedAt
    ? new Date(report.generatedAt).toLocaleString()
    : null;

  return (
    <>
      <SectionReveal className="py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ccff00]">
          Scan Report
        </p>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
          Your AI Commerce Readiness Score
        </h1>
        {report?.summary ? (
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary">
            {report.summary}
          </p>
        ) : null}

        <div className="mx-auto mt-10 max-w-xs sm:mt-12">
          <ScoreRing score={overallScore} size={180} />
        </div>

        <div className="mx-auto mt-8 flex flex-wrap justify-center gap-4">
          <FixStat label="Products scanned" value={String(products.length)} />
          <FixStat
            label="Top issues"
            value={String(topIssues.length)}
            accent="amber"
          />
          <FixStat
            label="Product findings"
            value={String(totalProductFindings)}
            accent="emerald"
          />
        </div>
      </SectionReveal>

      <SectionReveal className="pb-16">
        <h2 className="text-lg font-bold">Score Breakdown</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <ScoreCard label="Schema" score={schemaScore} />
          <ScoreCard label="LLM readiness" score={llmScore} />
          <ScoreCard label="Protocol" score={protocolScore} />
        </div>
      </SectionReveal>

      <SectionReveal className="pb-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">Product Scores</h2>
            <p className="mt-1 text-sm text-text-secondary">
              Each scanned URL is scored from the live report payload.
            </p>
          </div>
          {generatedAt ? (
            <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
              Generated {generatedAt}
            </p>
          ) : null}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {products.map((product) => {
            const productOverallScore = getProductOverallScore(product);
            const tone = getScoreTone(productOverallScore);

            return (
              <div key={product.url} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{product.name}</p>
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs text-[#53eafd] transition hover:text-[#53eafd]/80"
                    >
                      View product
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${tone.badgeClass}`}
                  >
                    {productOverallScore}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-text-muted">
                  <MetricPill label="S" value={product.schemaScore} />
                  <MetricPill label="L" value={product.llmScore} />
                  <MetricPill label="P" value={product.protocolScore} />
                </div>

                <p className="mt-4 text-xs text-[#ff3366]">
                  {product.issues.length} finding{product.issues.length === 1 ? "" : "s"}
                </p>
              </div>
            );
          })}
        </div>
      </SectionReveal>

      <SectionReveal className="pb-16">
        <h2 className="text-lg font-bold">Top Issues</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Prioritized blockers pulled directly from the scan report.
        </p>
        <div className="mt-6 grid gap-3">
          {topIssues.map((issue, index) => (
            <div
              key={`${issue}-${index}`}
              className="card flex items-start gap-3 p-4"
            >
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10 text-xs font-semibold text-amber-300">
                {index + 1}
              </span>
              <p className="text-sm leading-relaxed text-white">{issue}</p>
            </div>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="pb-16">
        <h2 className="text-lg font-bold">Per-Product Findings</h2>
        <div className="mt-6 space-y-4">
          {products.map((product) => (
            <div key={`${product.url}-issues`} className="card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="mt-1 text-xs text-[#53eafd]">{product.url}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-secondary">
                  {product.issues.length} issue{product.issues.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {product.issues.map((issue, index) => (
                  <div
                    key={`${product.url}-issue-${index}`}
                    className="rounded-2xl border border-white/6 bg-white/4 px-4 py-3 text-sm text-text-secondary"
                  >
                    <p className="font-medium text-text-primary">{issue.title}</p>
                    <p className="mt-1 text-text-secondary">{issue.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="pb-20">
        <div className="card p-5 text-center sm:p-8 lg:p-10">
          <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
            Ready to fix your score?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-text-secondary">
            Connect your Shopify store to turn these findings into schema fixes,
            richer product content, and publishable AI commerce feeds.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/dashboard"
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
            >
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-text-primary transition hover:border-white/20 hover:bg-white/8"
            >
              View Plans
            </a>
          </div>
        </div>
      </SectionReveal>
    </>
  );
}

function StatePanel({
  body,
  title,
  tone,
}: {
  body: string;
  title: string;
  tone: "error";
}) {
  return (
    <div className="py-12 sm:py-24">
      <div className="card mx-auto max-w-2xl p-5 text-center sm:p-8 lg:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
          <AlertTriangle className="h-8 w-8 text-red-400" />
        </div>
        <p
          className={`mt-6 text-sm font-semibold uppercase tracking-[0.2em] ${
            tone === "error" ? "text-red-400" : "text-text-muted"
          }`}
        >
          Report status
        </p>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-secondary">
          {body}
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-text-primary transition hover:border-white/20 hover:bg-white/8"
          >
            Start a new scan
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function ScoreCard({ label, score }: { label: string; score: number }) {
  const tone = getScoreTone(score);

  return (
    <div className="card p-5 text-center">
      <p className="text-sm text-text-muted">{label}</p>
      <p className={`mt-3 text-3xl font-extrabold tabular-nums sm:text-4xl ${tone.accentClass}`}>
        {score}
      </p>
    </div>
  );
}

function MetricPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/6 bg-white/4 px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">{label}</p>
      <p className="mt-1 text-sm font-semibold text-text-primary">{value}</p>
    </div>
  );
}

function FixStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "amber" | "emerald" | "indigo";
}) {
  return (
    <div className="card px-5 py-3 text-center">
      <p
        className={`text-xl font-bold tabular-nums ${
          accent === "amber"
            ? "text-amber-400"
            : accent === "emerald"
              ? "text-emerald-400"
              : accent === "indigo"
                ? "text-[#ccff00]"
                : ""
        }`}
      >
        {value}
      </p>
      <p className="mt-0.5 text-xs text-text-muted">{label}</p>
    </div>
  );
}

function getProductOverallScore(product: ScanProductResult) {
  if (typeof product.overallScore === "number") {
    return product.overallScore;
  }

  return Math.round(
    product.schemaScore * 0.4 +
      product.llmScore * 0.35 +
      product.protocolScore * 0.25,
  );
}

function getStatusLabel(status: ScanDetails["status"]) {
  switch (status) {
    case "queued":
      return "Queued";
    case "scanning":
      return "Scanning";
    case "scoring":
      return "Scoring";
    case "complete":
      return "Complete";
    case "failed":
      return "Failed";
    default:
      return "Pending";
  }
}
