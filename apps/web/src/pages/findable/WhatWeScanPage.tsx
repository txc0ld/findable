import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  BrainCircuit,
  Check,
  ChevronRight,
  PlugZap,
  Search,
  Sparkles,
} from "lucide-react";

import { usePageTitle } from "../../hooks/usePageTitle";
import { SectionReveal } from "../../components/SectionReveal";

const DIMENSIONS = [
  {
    icon: Search,
    title: "Schema Intelligence",
    subtitle: "Can AI agents read your products?",
    weight: "30%",
    description:
      "Schema Intelligence measures whether your product pages contain machine-readable structured data that AI shopping agents can parse, trust, and act on. Without it, your products are invisible to autonomous buyers.",
    checks: [
      { name: "JSON-LD exists", points: 5, detail: "A <script type=\"application/ld+json\"> block is present in the page head." },
      { name: "Product schema detected", points: 5, detail: "@type is Product or ProductGroup with valid schema.org markup." },
      { name: "Name matches visible H1", points: 3, detail: "The schema name field is present, non-generic, and matches the page heading." },
      { name: "Description present (>50 chars)", points: 3, detail: "A meaningful product description exists in the structured data." },
      { name: "Image URL resolves", points: 3, detail: "The schema image is a valid HTTPS URL that returns a 200 response." },
      { name: "Brand as @type Brand", points: 3, detail: "Brand is present as a structured Brand object, not just a string." },
      { name: "SKU present", points: 3, detail: "A non-empty SKU identifier is included in the schema." },
      { name: "GTIN / UPC / EAN present", points: 5, detail: "A global trade identifier enables cross-platform product matching." },
      { name: "Price and currency", points: 7, detail: "offers.price is numeric and priceCurrency is a valid ISO 4217 code." },
      { name: "Availability enum", points: 5, detail: "offers.availability uses a valid schema.org value like InStock." },
      { name: "Shipping details", points: 5, detail: "shippingDetails includes rate, delivery time, and destination." },
      { name: "Return policy", points: 5, detail: "hasMerchantReturnPolicy includes return window, method, and fee info." },
      { name: "Aggregate rating + reviews", points: 5, detail: "aggregateRating with ratingValue and reviewCount, plus individual reviews." },
      { name: "Category present", points: 2, detail: "Google Product Category or text category assigned to the product." },
      { name: "Material / Color / Size", points: 7, detail: "Category-appropriate physical attributes are present in the schema." },
      { name: "Variant handling", points: 5, detail: "ProductGroup with hasVariant, each variant has distinct offers." },
      { name: "BreadcrumbList schema", points: 2, detail: "Navigation hierarchy is structured for agent context." },
      { name: "FAQPage schema", points: 3, detail: "Structured Q&A content boosts citation probability by 89%." },
      { name: "Data consistency", points: 8, detail: "Schema price and availability match what is visually displayed on the page." },
      { name: "No duplicate schemas", points: 3, detail: "Only one Product schema block exists — no theme/app conflicts." },
    ],
  },
  {
    icon: BrainCircuit,
    title: "LLM Discoverability",
    subtitle: "Will ChatGPT recommend your products?",
    weight: "30%",
    description:
      "LLM Discoverability scores how likely it is that ChatGPT, Claude, Gemini, or Perplexity will recommend your product when a shopper asks. It measures content quality, third-party signals, and freshness.",
    checks: [
      { name: "Attribute density", points: 15, detail: "Ratio of machine-readable attributes present vs. expected for the category. >90% earns full points." },
      { name: "AEO score", points: 20, detail: "LLM analysis of the description: does the first sentence define the product? Are attributes explicit and factual?" },
      { name: "FAQ presence", points: 10, detail: "FAQ content on the page in schema or visible HTML. Boosts citation probability by 89%." },
      { name: "Comparison readiness", points: 10, detail: "Can an LLM extract attributes to compare against alternatives? Material, weight, price/unit, certifications." },
      { name: "Review signals", points: 15, detail: "Review count > 100 = full points. > 1000 = bonus. Products with 3.6x more reviews get recommended." },
      { name: "Third-party presence", points: 10, detail: "Brand or product mentioned on Google Reviews, Trustpilot, Reddit, or review blogs." },
      { name: "Content freshness", points: 10, detail: "Last-Modified header, on-page dates, sitemap lastmod. Updated within 30 days = full points." },
      { name: "Entity clarity", points: 5, detail: "Brand name is consistent across title, schema, description, and breadcrumbs." },
      { name: "Knowledge base presence", points: 5, detail: "Brand has a Wikipedia page or major knowledge base listing." },
    ],
  },
  {
    icon: PlugZap,
    title: "Protocol Compliance",
    subtitle: "Are you on the new AI commerce shelves?",
    weight: "25%",
    description:
      "Protocol Compliance checks whether your store is connected to the live AI commerce channels — OpenAI's Agentic Commerce Protocol (ACP), Google's Universal Commerce Protocol (UCP), and Schema.org as the universal fallback.",
    checks: [
      { name: "OpenAI ACP — merchant registered", points: 15, detail: "Products appear in ChatGPT shopping results via ACP feed enrollment." },
      { name: "ACP feed — required fields", points: 15, detail: "product.id, title, description, brand, category, url, variants, pricing, availability, images, shipping, policies." },
      { name: "ACP feed — recommended fields", points: 5, detail: "Promotions, Q&A, reviews, and certifications included in the feed." },
      { name: "ACP description quality", points: 5, detail: "Descriptions are factual and attribute-dense. OpenAI rejects marketing language." },
      { name: "ACP refresh frequency", points: 5, detail: "15-minute refresh = full points. Daily = partial. Manual = minimal." },
      { name: "Google Merchant Center active", points: 15, detail: "Feed is synced and products are approved in Merchant Center." },
      { name: "native_commerce flag", points: 10, detail: "The GMC native_commerce=true attribute enables the AI Mode Buy button." },
      { name: "UCP capability manifest", points: 5, detail: "JSON manifest published declaring supported commerce actions." },
      { name: "Return policy in GMC", points: 5, detail: "Return policies defined in Merchant Center for UCP checkout eligibility." },
      { name: "Schema.org on-page fallback", points: 10, detail: "For LLMs that crawl directly (Claude, Perplexity) — on-page structured data as baseline." },
      { name: "Platform auto-enrollment verified", points: 10, detail: "Shopify/Etsy products actually surface in ChatGPT shopping results." },
    ],
  },
  {
    icon: BarChart3,
    title: "Competitive Position",
    subtitle: "How do you stack up against competitors?",
    weight: "15%",
    description:
      "Competitive Position runs identical scans on your competitors and scores you relative to the field. The top performer gets 100, everyone else is scored proportionally. This dimension is available on paid plans.",
    checks: [
      { name: "Schema comparison", points: 25, detail: "Your schema completeness ranked against 1-5 competitor product pages." },
      { name: "LLM comparison", points: 25, detail: "Content quality, attribute density, and review signals vs. competitors." },
      { name: "Protocol comparison", points: 25, detail: "ACP/UCP enrollment and feed quality relative to the competitive set." },
      { name: "Gap analysis", points: 15, detail: "Specific attributes and signals your competitors have that you're missing." },
      { name: "Trend tracking", points: 10, detail: "Longitudinal score changes showing who is improving fastest." },
    ],
  },
];

export function WhatWeScanPage() {
  usePageTitle("What we scan");
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
          <p className="eyebrow">Product Map</p>
          <h1 className="font-display mt-4 text-balance text-3xl tracking-tight sm:text-4xl">
            What the <span className="text-[#ccff00]">scanner</span> actually checks.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">
            Every product page is scored across four dimensions, each with a
            detailed rubric. Points are earned for every signal detected — nothing
            is estimated or approximated.
          </p>
        </SectionReveal>

        <div className="mt-16 space-y-20">
          {DIMENSIONS.map((dim) => (
            <SectionReveal key={dim.title}>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <dim.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-mono text-lg font-bold uppercase tracking-wide">
                      {dim.title}
                    </h2>
                    <span className="rounded-full border border-[#ccff00]/20 bg-[#ccff00]/10 px-2.5 py-0.5 text-xs font-semibold text-[#ccff00]">
                      {dim.weight} weight
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary">{dim.subtitle}</p>
                </div>
              </div>

              <p className="mt-6 leading-relaxed text-text-secondary">
                {dim.description}
              </p>

              <div className="mt-8 space-y-2">
                <div className="mb-4 grid grid-cols-[1fr_auto] gap-4 px-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
                  <span>Check</span>
                  <span>Points</span>
                </div>
                {dim.checks.map((check) => (
                  <div
                    key={check.name}
                    className="card group grid grid-cols-[1fr_auto] items-start gap-4 p-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                        <p className="text-sm font-medium">{check.name}</p>
                      </div>
                      <p className="mt-1.5 pl-6 text-xs leading-relaxed text-text-secondary">
                        {check.detail}
                      </p>
                    </div>
                    <span className="rounded-full border border-[#ccff00]/20 bg-[#ccff00]/10 px-2.5 py-1 text-xs font-bold tabular-nums text-[#ccff00]">
                      +{check.points}
                    </span>
                  </div>
                ))}
                <div className="flex justify-end px-4 pt-2 text-sm font-semibold text-text-secondary">
                  Total: <span className="ml-2 text-[#ccff00]">{dim.checks.reduce((s, c) => s + c.points, 0)} points</span>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="mt-24">
          <div className="card p-5 text-center sm:p-8 lg:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight">
              Ready to see your score?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-text-secondary">
              Paste up to 3 product URLs and get a full breakdown across all four dimensions.
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
