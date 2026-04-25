import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock,
  Code2,
  FileSearch,
  Gauge,
  Layers,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

import { usePageTitle } from "../../hooks/usePageTitle";
import { SectionReveal } from "../../components/SectionReveal";

const PIPELINE_STEPS = [
  {
    icon: FileSearch,
    phase: "Discovery",
    duration: "~2 seconds",
    title: "Validate and classify each URL",
    description:
      "Each product URL is validated for HTTPS format, then platform-detected from URL patterns and page signatures — Shopify, WooCommerce, BigCommerce, or custom/headless.",
    details: [
      "URL format and HTTPS validation",
      "Platform detection from URL patterns and CDN assets",
      "Queue each URL for parallel extraction",
    ],
  },
  {
    icon: Code2,
    phase: "Extraction",
    duration: "5-10 seconds per URL",
    title: "Scrape structured and visible data",
    description:
      "The scanner fetches each page, parses all JSON-LD blocks, and extracts visible content — prices, images, descriptions, reviews, stock status, shipping info, and return policies.",
    details: [
      "Parse all <script type=\"application/ld+json\"> blocks",
      "Validate JSON syntax and check for duplicates",
      "Extract visible price, stock, reviews from page content",
      "Compare schema data vs. visible data for consistency",
      "Identify data present on-page but missing from schema",
    ],
  },
  {
    icon: Layers,
    phase: "Classification",
    duration: "3-5 seconds",
    title: "Categorize and analyze LLM readiness",
    description:
      "Each product is classified into a Google Product Category, and its description is analyzed for AEO (Answer Engine Optimization) quality — factual vs. marketing, attribute density, and extractability.",
    details: [
      "Classify into Google Product Category taxonomy",
      "Map expected attributes for the category (e.g., Apparel needs color, size, material)",
      "Score attribute density: found vs. expected ratio",
      "Analyze description: factual vs. marketing language",
      "Generate suggested FAQ entries for citation coverage",
    ],
  },
  {
    icon: Check,
    phase: "Consistency Check",
    duration: "~1 second",
    title: "Cross-reference schema against visible page",
    description:
      "The scanner compares structured data claims against what is actually displayed on the page. A price mismatch between schema and the visible price is a critical issue that can get products rejected from AI feeds.",
    details: [
      "Schema price vs. visible price on page",
      "Schema availability vs. visible stock status text",
      "Multiple Product schema blocks (theme + app conflicts)",
      "Image URL resolution (HEAD request for 404s)",
    ],
  },
  {
    icon: Gauge,
    phase: "Scoring",
    duration: "Instant",
    title: "Apply rubrics and calculate composite score",
    description:
      "All extracted and classified data is scored against the rubrics. Schema Intelligence (30%), LLM Discoverability (30%), Protocol Compliance (25%), and Competitive Position (15%) combine into the overall Findable Score.",
    details: [
      "Schema Intelligence: 0-100 from 30+ individual signal checks",
      "LLM Discoverability: 0-100 from content quality and third-party signals",
      "Protocol Compliance: 0-100 from ACP/UCP/Schema.org enrollment",
      "Weighted composite: the overall Findable Score",
    ],
  },
  {
    icon: Zap,
    phase: "Report Generation",
    duration: "~1 second",
    title: "Assemble the actionable report",
    description:
      "The final report includes the overall score, per-product breakdowns, prioritized issues sorted by impact, sample generated JSON-LD, and a sample AEO-rewritten description as proof of value.",
    details: [
      "Overall score with color-coded gauge",
      "Per-product comparison if 3 URLs scanned",
      "Top 5 highest-impact fixes with estimated score improvement",
      "Full issue list grouped by severity",
      "Sample JSON-LD for the highest-traffic product",
      "\"Connect Shopify to fix everything\" CTA",
    ],
  },
];

const BEFORE_AFTER = {
  before: `<h1>Heavyweight Tee</h1>
<p>Premium 100% cotton heavyweight
   tee for those who appreciate quality.</p>
<span class="price">$49.95</span>
<div class="reviews">★★★★☆ (47)</div>`,
  after: `{
  "@type": "Product",
  "name": "Heavyweight Tee",
  "brand": { "@type": "Brand", "name": "ACME" },
  "sku": "BLK-TEE-XL",
  "gtin13": "0012345678901",
  "material": "100% Organic Cotton",
  "offers": {
    "@type": "Offer",
    "price": 49.95,
    "priceCurrency": "AUD",
    "availability": "InStock",
    "shippingDetails": { ... },
    "hasMerchantReturnPolicy": { ... }
  },
  "aggregateRating": {
    "ratingValue": "4.2",
    "reviewCount": "47"
  }
}`,
};

export function HowReportsWorkPage() {
  usePageTitle("How reports work");
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-bg-primary/95 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="/findable" className="flex items-center gap-2.5">
            <Sparkles className="h-5 w-5 text-[#ccff00]" />
            <span className="text-sm font-bold uppercase tracking-[0.2em]">FINDABLE</span>
          </a>
          <Link to="/findable" className="btn-secondary rounded-lg px-4 py-2 text-[13px] font-semibold">
            <ArrowLeft className="h-3 w-3" /> Back
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-24 pt-16 sm:px-6">
        <SectionReveal>
          <p className="eyebrow">Report Flow</p>
          <h1 className="font-display mt-4 text-balance text-3xl tracking-tight sm:text-4xl">
            From storefront markup to{" "}
            <span className="text-[#ccff00]">machine-readable</span> output.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
            A free scan runs through six phases in under 20 seconds. Here is
            exactly what happens at each step and what the report contains.
          </p>
        </SectionReveal>

        {/* Pipeline */}
        <div className="relative mt-20">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-white/5 md:block" />

          <div className="space-y-12">
            {PIPELINE_STEPS.map((step, index) => (
              <SectionReveal key={step.phase}>
                <div className="flex gap-6 md:gap-8">
                  <div className="relative hidden shrink-0 md:flex">
                    <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-bg-secondary">
                      <span className="font-mono text-sm font-bold text-[#ccff00]">
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="card flex-1 p-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <step.icon className="h-5 w-5 text-[#ccff00]" />
                      <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#ccff00]">
                        {step.phase}
                      </h2>
                      <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/60">
                        <Clock className="h-3 w-3" /> {step.duration}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-white/70">
                      {step.description}
                    </p>
                    <ul className="mt-4 space-y-2 border-t border-white/5 pt-4">
                      {step.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2.5 text-sm text-white/60"
                        >
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>

        {/* Before / After */}
        <SectionReveal className="mt-24">
          <h2 className="font-display text-center text-2xl tracking-tight sm:text-3xl">
            The gap the report makes obvious.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-white/70">
            What humans can browse is not the same thing as what AI systems can
            reliably ingest. The report shows both.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="card-glass-panel overflow-hidden p-1">
              <div className="flex items-center gap-2 rounded-t-[20px] border-b border-white/5 bg-black/40 p-4">
                <X className="h-4 w-4 text-red-500" />
                <span className="font-mono text-xs text-white/60">
                  Human-readable only
                </span>
                <span className="ml-auto text-[10px] uppercase tracking-widest text-red-500">
                  Low signal
                </span>
              </div>
              <pre className="overflow-x-auto bg-[#0A0A0F] p-4 font-mono text-[11px] leading-relaxed text-white/50 sm:p-6 sm:text-[13px]">
                {BEFORE_AFTER.before}
              </pre>
            </div>

            <div className="card-glass-panel overflow-hidden p-1">
              <div className="flex items-center gap-2 rounded-t-[20px] border-b border-white/5 bg-black/40 p-4">
                <Check className="h-4 w-4 text-emerald-500" />
                <span className="font-mono text-xs text-white/60">
                  Structured product record
                </span>
                <span className="ml-auto text-[10px] uppercase tracking-widest text-emerald-400">
                  High signal
                </span>
              </div>
              <pre className="overflow-x-auto bg-[#0A0A0F] p-4 font-mono text-[11px] leading-relaxed text-cyan-300/80 sm:p-6 sm:text-[13px]">
                {BEFORE_AFTER.after}
              </pre>
            </div>
          </div>
        </SectionReveal>

        {/* CTA */}
        <SectionReveal className="mt-24">
          <div className="card p-5 text-center sm:p-8 lg:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight">
              See it in action on your store.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/60">
              Paste your product URLs and get a full report in under 20 seconds.
            </p>
            <div className="mt-6">
              <a
                href="/findable#hero-form"
                className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
              >
                Start Free Scan <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </SectionReveal>
      </main>
    </div>
  );
}
