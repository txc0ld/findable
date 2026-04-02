import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { usePageTitle } from "../hooks/usePageTitle";
import { SectionReveal } from "../components/SectionReveal";

const CARDS = [
  {
    problem: "AI can't read your product pages",
    solution: "We scan your pages and show exactly what AI agents see — and what they miss",
  },
  {
    problem: "Your descriptions are marketing fluff",
    solution: "We rewrite them with facts AI can extract: material, weight, dimensions, use cases",
  },
  {
    problem: "No structured data (JSON-LD)",
    solution: "We generate gold-standard schema and inject it into your store automatically",
  },
  {
    problem: "Missing from ChatGPT Shopping",
    solution: "We build ACP-ready product feeds so you show up when people ask AI for recommendations",
  },
  {
    problem: "No FAQ content for AI citations",
    solution: "We generate FAQ schema that boosts your citation probability by 89%",
  },
  {
    problem: "You don't know where you stand",
    solution: "We score you 0-100 across four dimensions and show exactly what to fix first",
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

      <main className="mx-auto max-w-3xl px-4 pb-24 pt-16 sm:px-6">
        <SectionReveal>
          <p className="eyebrow text-center">AEO</p>
          <h1 className="font-display mt-4 text-center text-2xl tracking-tight sm:text-3xl">
            Answer Engine Optimization
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-center text-white/60">
            SEO gets you ranked. AEO gets you <span className="text-[#ccff00]">recommended by AI</span>.
            When shoppers ask ChatGPT, Gemini, or Perplexity for products — AEO determines if yours shows up.
          </p>
        </SectionReveal>

        <div className="mt-14 space-y-4">
          {CARDS.map((card) => (
            <SectionReveal key={card.problem}>
              <div className="card overflow-hidden p-0">
                <div className="grid sm:grid-cols-2">
                  <div className="border-b border-white/5 p-5 sm:border-b-0 sm:border-r">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#ff3366]">Problem</p>
                    <p className="mt-2 text-sm font-medium">{card.problem}</p>
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Findable fixes it</p>
                    <p className="mt-2 text-sm text-white/60">{card.solution}</p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="mt-14">
          <div className="card overflow-hidden p-0">
            <div className="grid sm:grid-cols-2">
              <div className="border-b border-white/5 p-5 sm:border-b-0 sm:border-r">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#ff3366]">Before</p>
                <p className="mt-2 text-sm italic text-white/40">
                  "Elevate your everyday wardrobe with our premium heavyweight tee."
                </p>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">After</p>
                <p className="mt-2 text-sm text-white/70">
                  "300gsm organic cotton crewneck. Relaxed fit, 74cm body (M). GOTS certified. Best for: streetwear layering."
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="mt-14">
          <div className="card p-5 text-center sm:p-8">
            <h2 className="text-lg font-extrabold tracking-tight sm:text-xl">
              See what AI sees when it looks at your store.
            </h2>
            <div className="mt-5">
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
