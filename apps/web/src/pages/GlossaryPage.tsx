import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Bot,
  Brain,
  ChevronRight,
  FileJson,
  Globe,
  Layers,
  PlugZap,
  Search,
  ShoppingCart,
  Sparkles,
  Zap,
} from "lucide-react";

import { usePageTitle } from "../hooks/usePageTitle";
import { SectionReveal } from "../components/SectionReveal";

const TERMS = [
  {
    icon: Brain,
    title: "AI Commerce",
    subtitle: "The shift from search to agents",
    points: [
      "Consumers increasingly use AI assistants (ChatGPT, Gemini, Claude, Perplexity) to discover and compare products",
      "58% of consumers now use generative AI for product discovery",
      "LLM-referred traffic converts at 2.47% — higher than Google Ads (1.82%) and Meta Ads (0.52%)",
      "AI-engaged visitors convert at 9.84% — nearly 5x traditional browsing",
      "By 2030, McKinsey projects $3-5T in global commerce will be mediated by AI agents",
    ],
  },
  {
    icon: Bot,
    title: "AI Shopping Agents",
    subtitle: "Autonomous buyers acting on behalf of consumers",
    points: [
      "Software that searches, compares, and purchases products without human intervention at each step",
      "Agents read structured data (not visual layouts) to understand what a product is",
      "ChatGPT alone processes 50M+ daily shopping queries",
      "Agents need machine-readable price, availability, shipping, and return data to complete a purchase",
      "If your product data isn't structured, agents skip you entirely — they can't guess",
    ],
  },
  {
    icon: ShoppingCart,
    title: "ACP — Agentic Commerce Protocol",
    subtitle: "OpenAI's product feed standard for ChatGPT shopping",
    points: [
      "Merchants submit structured product feeds via SFTP to an OpenAI endpoint",
      "15-minute refresh cycles keep pricing and inventory current",
      "Shopify and Etsy stores are auto-enrolled via catalog integration",
      "All other platforms must apply at chatgpt.com/merchants",
      "Feed formats: JSONL (gzip), CSV (gzip), TSV (gzip), Parquet (zstd)",
      "OpenAI rejects feeds with marketing language — descriptions must be factual",
      "Enables in-chat checkout via Stripe (rolling out selectively, US-first)",
    ],
  },
  {
    icon: Globe,
    title: "UCP — Universal Commerce Protocol",
    subtitle: "Google's open standard for AI-powered commerce",
    points: [
      "Spans the full journey: discovery → checkout → post-purchase",
      "Works through Google Merchant Center feeds",
      "The native_commerce=true flag enables Buy buttons in AI Mode and Gemini",
      "Requires a JSON capability manifest declaring supported commerce actions",
      "Interoperates with Agent2Agent (A2A), Agent Payments Protocol, and MCP",
      "Google Pay via stored Wallet credentials handles checkout",
      "20+ companies endorsed at NRF January 2026 launch",
    ],
  },
  {
    icon: Search,
    title: "AEO — Answer Engine Optimization",
    subtitle: "Making product content extractable by LLMs",
    points: [
      "Traditional SEO optimizes for search rankings — AEO optimizes for AI citations and recommendations",
      "First sentence must state what the product IS, not how it makes you feel",
      "Descriptions need concrete attributes: material, dimensions, weight, use cases",
      "Marketing language (\"premium\", \"elevate\", \"crafted\") is invisible to LLMs",
      "Products with FAQ content see an 89% boost in citation probability",
      "Content updated within 30 days gets 3.2x more LLM citations",
      "Comparison anchors (\"Similar to: ...\") help LLMs position your product",
    ],
  },
  {
    icon: FileJson,
    title: "Schema.org / JSON-LD",
    subtitle: "The universal structured data format for the web",
    points: [
      "Schema.org defines a shared vocabulary for describing products, offers, reviews, and more",
      "JSON-LD (JavaScript Object Notation for Linked Data) is the recommended encoding format",
      "Embedded in a <script type=\"application/ld+json\"> tag in the page head",
      "All major LLMs (ChatGPT, Claude, Gemini, Perplexity) crawl and parse JSON-LD",
      "Works across every AI surface without enrollment — the universal baseline",
      "Most stores have bare-minimum or broken implementations",
    ],
  },
  {
    icon: Layers,
    title: "Google Merchant Center (GMC)",
    subtitle: "Google's product feed platform for Shopping and AI surfaces",
    points: [
      "Central hub for submitting product data to Google Shopping, AI Mode, and Gemini",
      "Feeds can be submitted via API, file upload, or Shopify/WooCommerce integration",
      "Products must be approved — policy violations or missing data cause rejections",
      "Supplemental feeds let you add missing attributes without replacing the primary feed",
      "structured_title and structured_description fields required for AI-generated content",
      "Return policies must be defined in GMC for UCP checkout eligibility",
    ],
  },
  {
    icon: PlugZap,
    title: "Stripe Agentic Commerce Suite",
    subtitle: "Payment infrastructure for agent-to-merchant transactions",
    points: [
      "Powers the checkout flow for ACP (OpenAI) and integrates with UCP (Google)",
      "One-line activation for Shopify merchants already on Stripe or Shopify Payments",
      "Handles payment processing, fraud detection, and dispute management for agent purchases",
      "Enables in-chat and in-agent checkout without redirecting to the store",
    ],
  },
  {
    icon: Zap,
    title: "Findable Score",
    subtitle: "Your composite AI commerce readiness rating",
    points: [
      "Scored 0-100 as a weighted composite of four dimensions",
      "Schema Intelligence (30%): can agents read your product data?",
      "LLM Discoverability (30%): will AI recommend your products?",
      "Protocol Compliance (25%): are you on the live AI commerce channels?",
      "Competitive Position (15%): how do you rank against competitors?",
      "Every point is earned from a specific, auditable signal — nothing is estimated",
    ],
  },
];

export function GlossaryPage() {
  usePageTitle("Glossary");
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-bg-primary/95 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="/" className="flex items-center gap-2.5">
            <Sparkles className="h-5 w-5 text-[#ccff00]" />
            <span className="text-sm font-bold uppercase tracking-[0.2em]">FINDABLE</span>
          </a>
          <Link to="/" className="btn-secondary rounded-lg px-4 py-2 text-[13px] font-semibold">
            <ArrowLeft className="h-3 w-3" /> Back
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-4 pb-24 pt-16 sm:px-6">
        <SectionReveal>
          <p className="eyebrow">Glossary</p>
          <h1 className="font-display mt-4 text-balance text-3xl tracking-tight sm:text-4xl">
            AI Commerce in <span className="text-[#ccff00]">plain language</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">
            The terms, protocols, and standards that determine whether your
            products get discovered by AI shopping agents.
          </p>
        </SectionReveal>

        <div className="mt-16 space-y-6">
          {TERMS.map((term) => (
            <SectionReveal key={term.title}>
              <div className="card p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <term.icon className="h-5 w-5 text-[#ccff00]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{term.title}</h2>
                    <p className="mt-0.5 text-sm text-text-muted">{term.subtitle}</p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 border-t border-white/5 pt-5">
                  {term.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#ccff00]/60" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="mt-20">
          <div className="card p-5 text-center sm:p-8 lg:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight">
              See where your store stands.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-text-secondary">
              Run the free scan and get a full breakdown across every dimension
              listed above.
            </p>
            <div className="mt-6">
              <a
                href="/#hero-form"
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
