import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Brain,
  ChevronRight,
  Eye,
  EyeOff,
  FileSearch,
  MessageSquare,
  RefreshCw,
  Search,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

import { usePageTitle } from "../hooks/usePageTitle";
import { SectionReveal } from "../components/SectionReveal";

const PROBLEMS = [
  {
    icon: EyeOff,
    title: "Your products are invisible to AI",
    description: "When someone asks ChatGPT \"best heavyweight cotton tee under $60\" — your product doesn't show up. Not because it's bad, but because AI agents can't read your product data. Your pages are built for human eyes, not machine parsing.",
    stat: "98% of stores have zero AI commerce optimization",
  },
  {
    icon: AlertTriangle,
    title: "Your product descriptions repel AI agents",
    description: "\"Experience the ultimate comfort with our premium tee\" — that sentence contains zero extractable facts. AI agents skip it entirely. They need material, weight, dimensions, use cases. Marketing copy is invisible to machines.",
    stat: "OpenAI's ACP feed rejects marketing language",
  },
  {
    icon: Search,
    title: "Your structured data is broken or missing",
    description: "Most stores either have no JSON-LD schema, or have bare-minimum implementations missing critical fields like GTIN, shipping details, and return policies. AI shopping agents need these to recommend and transact.",
    stat: "Stores with 99.9% attribute completion see 3-4x more AI visibility",
  },
  {
    icon: ShoppingCart,
    title: "You're not on the new AI shopping channels",
    description: "OpenAI's Agentic Commerce Protocol, Google's Universal Commerce Protocol — these are live now. 50M+ daily shopping queries flow through ChatGPT alone. If you're not enrolled, you don't exist in these channels.",
    stat: "ChatGPT processes 50M+ daily shopping queries",
  },
  {
    icon: TrendingUp,
    title: "Your competitors are pulling ahead",
    description: "While you're optimizing for Google Ads, your competitors are enrolling in ACP feeds and enriching their schema data. The stores that move first on AI commerce will lock in the visibility advantage.",
    stat: "LLM-referred traffic converts at 2.47% vs 1.82% for Google Ads",
  },
];

const WHAT_AEO_IS = [
  {
    icon: Brain,
    title: "AEO = Answer Engine Optimization",
    points: [
      "Traditional SEO gets you ranked in search results",
      "AEO gets you cited and recommended by AI assistants",
      "When a shopper asks ChatGPT, Claude, or Gemini for a product recommendation — AEO determines if your product appears in that answer",
      "It's not a replacement for SEO. It's the next layer on top of it",
    ],
  },
  {
    icon: FileSearch,
    title: "What AI agents actually look for",
    points: [
      "First sentence that defines what the product IS (not marketing fluff)",
      "Explicit attributes: material, weight, dimensions, color, size",
      "Use cases: \"Best for: streetwear layering, casual daily wear\"",
      "Comparison anchors: \"Similar to: Carhartt WIP Chase Tee\"",
      "FAQ content — boosts citation probability by 89%",
      "Content updated in the last 30 days gets 3.2x more citations",
    ],
  },
  {
    icon: MessageSquare,
    title: "The before and after",
    before: "\"Elevate your everyday wardrobe with our signature heavyweight tee. Crafted from the finest cotton for those who appreciate quality.\"",
    after: "\"The ACME Heavyweight Tee is a 300gsm 100% organic cotton crewneck t-shirt. Relaxed fit, 74cm body length (size M). Pre-shrunk. GOTS certified. Best for: streetwear layering, casual daily wear. Similar to: Carhartt WIP Chase Tee.\"",
  },
];

const WHAT_FINDABLE_FIXES = [
  {
    icon: Zap,
    title: "Scan your product pages",
    description: "Paste up to 3 product URLs. Findable fetches the page, parses the HTML, extracts all structured data, and scores it against the gold standard across schema, LLM readiness, and protocol compliance.",
  },
  {
    icon: Eye,
    title: "See exactly what's wrong",
    description: "Get a prioritized issue list: missing JSON-LD, thin descriptions, no GTIN identifiers, missing shipping schema, marketing-heavy copy. Each issue shows the point impact if fixed.",
  },
  {
    icon: RefreshCw,
    title: "Auto-fix with one click",
    description: "Findable generates gold-standard JSON-LD, rewrites descriptions for AEO, creates FAQ schema, and injects it all into your store via Shopify Script Tags — no theme code changes.",
  },
  {
    icon: TrendingUp,
    title: "Monitor and improve",
    description: "Weekly rescans track your score over time. Get alerts when issues appear. Compare against competitors. Watch your AI commerce readiness climb.",
  },
];

export function WhatIsAeoPage() {
  usePageTitle("What is AEO?");
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
        {/* Hero */}
        <SectionReveal>
          <p className="eyebrow">For E-Commerce Owners</p>
          <h1 className="font-display mt-4 text-balance text-2xl tracking-tight sm:text-3xl lg:text-4xl">
            Your store looks great to humans.
            <br />
            <span className="text-[#ccff00]">AI can't see it at all.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            58% of consumers now use AI assistants to discover products. If your
            store isn't optimized for these agents, you're invisible to the
            fastest-growing shopping channel in history.
          </p>
        </SectionReveal>

        {/* Problems */}
        <div className="mt-16 space-y-4">
          {PROBLEMS.map((problem) => (
            <SectionReveal key={problem.title}>
              <div className="card p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#ff3366]/20 bg-[#ff3366]/10">
                    <problem.icon className="h-5 w-5 text-[#ff3366]" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold sm:text-base">{problem.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{problem.description}</p>
                    <p className="mt-3 text-xs font-medium text-[#ccff00]">{problem.stat}</p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* What is AEO */}
        <SectionReveal className="mt-20">
          <h2 className="font-display text-center text-2xl tracking-tight sm:text-3xl">
            So what is <span className="text-[#ccff00]">AEO</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-white/60">
            Answer Engine Optimization is how you make your products
            discoverable by AI shopping agents.
          </p>
        </SectionReveal>

        <div className="mt-10 space-y-6">
          {WHAT_AEO_IS.map((section) => (
            <SectionReveal key={section.title}>
              <div className="card p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#ccff00]/20 bg-[#ccff00]/10">
                    <section.icon className="h-5 w-5 text-[#ccff00]" />
                  </div>
                  <h3 className="text-sm font-bold sm:text-base">{section.title}</h3>
                </div>

                {"points" in section && (
                  <ul className="mt-4 space-y-2 border-t border-white/5 pt-4">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-white/60">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#53eafd]/60" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {"before" in section && (
                  <div className="mt-4 space-y-3 border-t border-white/5 pt-4">
                    <div className="rounded-xl border border-[#ff3366]/15 bg-[#ff3366]/5 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#ff3366]">Before — invisible to AI</p>
                      <p className="mt-2 text-sm italic text-white/50">{section.before}</p>
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight className="h-4 w-4 text-white/20" />
                    </div>
                    <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">After — findable by AI</p>
                      <p className="mt-2 text-sm text-white/70">{section.after}</p>
                    </div>
                  </div>
                )}
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* How Findable fixes it */}
        <SectionReveal className="mt-20">
          <h2 className="font-display text-center text-2xl tracking-tight sm:text-3xl">
            How <span className="text-[#ccff00]">Findable</span> fixes it
          </h2>
        </SectionReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {WHAT_FINDABLE_FIXES.map((step, i) => (
            <SectionReveal key={step.title}>
              <div className="card flex h-full flex-col p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#ccff00]/20 bg-[#ccff00]/10 font-mono text-xs font-bold text-[#ccff00]">
                    {i + 1}
                  </span>
                  <h3 className="text-sm font-bold">{step.title}</h3>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                  {step.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* CTA */}
        <SectionReveal className="mt-20">
          <div className="card p-5 text-center sm:p-8 lg:p-10">
            <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
              Find out if AI can see your store.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/60">
              Paste a product URL and get a full AI commerce readiness report in under 20 seconds. Free. No account required.
            </p>
            <div className="mt-6">
              <a
                href="/#hero-form"
                className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
              >
                Run Free Scan <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </SectionReveal>
      </main>
    </div>
  );
}
