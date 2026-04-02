import { useState } from "react";
import { Check, Menu, Sparkles, X, ChevronRight, BarChart3, BrainCircuit, PlugZap, Search } from "lucide-react";

import { usePageTitle } from "../hooks/usePageTitle";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { CopyButton } from "../components/CopyButton";
import { ScanForm } from "../components/ScanForm";
import { ScorePreview } from "../components/ScorePreview";
import { SectionReveal } from "../components/SectionReveal";
import {
  DIMENSION_CARDS,
  HOW_IT_WORKS_STEPS,
  LANDING_STATS,
  PRICING_TIERS,
} from "../lib/content";

export function LandingPage() {
  usePageTitle();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen overflow-x-hidden bg-bg-primary text-text-primary selection:bg-[#ccff00]/30">
      {/* ───────── Nav ───────── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-bg-primary/95 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-white/10 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-white">
              FINDABLE
            </span>
          </div>

          <div className="hidden items-center gap-8 text-[13px] font-medium tracking-wide text-text-secondary md:flex">
            <a href="/what-we-scan" className="transition hover:text-white">Product Map</a>
            <a href="/how-reports-work" className="transition hover:text-white">Report Flow</a>
            <a href="/pricing" className="transition hover:text-white">Pricing</a>
            <a href="/what-is-aeo" className="text-[#ccff00] transition hover:text-white">What is AEO?</a>
            <a href="/login" className="transition hover:text-white">Dashboard</a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/5 bg-bg-primary px-5 pb-6 pt-4 md:hidden">
            <div className="flex flex-col gap-4 text-sm font-medium text-text-secondary">
              <a href="/what-we-scan" onClick={() => setMenuOpen(false)} className="transition hover:text-white">Product Map</a>
              <a href="/how-reports-work" onClick={() => setMenuOpen(false)} className="transition hover:text-white">Report Flow</a>
              <a href="/pricing" onClick={() => setMenuOpen(false)} className="transition hover:text-white">Pricing</a>
              <a href="/what-is-aeo" onClick={() => setMenuOpen(false)} className="text-[#ccff00] transition hover:text-white">What is AEO?</a>
              <a href="/glossary" onClick={() => setMenuOpen(false)} className="transition hover:text-white">Glossary</a>
              <a href="/login" onClick={() => setMenuOpen(false)} className="transition hover:text-white">Dashboard</a>
            </div>
          </div>
        )}
      </header>

      <main className="relative">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30"></div>

        {/* ───────── Section 1 : Hero ───────── */}
        <section className="relative overflow-hidden px-5 pb-24 pt-20 sm:px-6">
          {/* Dimensional Glows */}
          <div className="pointer-events-none absolute left-1/2 top-[20%] h-[240px] w-[320px] -translate-x-1/2 rounded-full bg-[#ccff00]/12 blur-[72px] sm:w-[520px]" />

          <div className="relative z-10 mx-auto flex min-h-[90vh] w-full max-w-7xl flex-col justify-center">
            <div className="grid items-center justify-center gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(400px,500px)] lg:gap-16">
              <div className="hero-enter mx-auto max-w-lg text-center lg:mx-0 lg:max-w-none lg:text-left">
                <h1 className="font-display mx-auto text-balance text-3xl leading-[1.08] tracking-tight sm:text-5xl lg:mx-0 lg:text-[3.5rem]">
                  <span className="lg:relative lg:-top-5">Is Your Store</span>
                  <br />
                  <span className="text-[#ccff00] lg:relative lg:left-5 lg:text-[calc(1em+0.5rem)]">Agent-Ready?</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg lg:mx-0 lg:max-w-xl lg:text-xl">
                  Scan your product pages to see whether AI shopping agents can
                  find, understand, and recommend what you sell.
                </p>
                <div className="mx-auto mt-8 flex w-full max-w-xs items-center justify-center gap-6 sm:max-w-sm sm:gap-8 lg:mx-0 lg:max-w-lg lg:justify-between lg:gap-0">
                  <img src="/logos/shopify.png" alt="Shopify" className="h-6 object-contain sm:h-8" />
                  <img src="/logos/squarespace.png" alt="Squarespace" className="ml-4 h-8 object-contain sm:h-10 lg:h-14" />
                  <img src="/logos/woocommerce.png" alt="WooCommerce" className="h-10 object-contain sm:h-14 lg:h-16" />
                </div>
                <div className="mx-auto mt-6 lg:mx-0">
                  <a
                    href="/what-is-aeo"
                    className="inline-flex items-center gap-2 rounded-full border border-[#ccff00]/25 bg-[#ccff00]/10 px-5 py-2.5 text-xs font-semibold text-[#ccff00] transition hover:bg-[#ccff00]/20"
                  >
                    Why are 98% of stores invisible to AI? <ChevronRight className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div
                id="hero-form"
                className="hero-enter hero-enter-delay relative z-20 mx-auto w-full max-w-lg lg:mx-0 lg:max-w-[560px] lg:justify-self-end"
              >
                <div className="card-glass-panel p-2 sm:p-3">
                  <ScanForm ctaLabel="Run Free Scan" />
                </div>
              </div>
            </div>

            <div className="hero-enter hero-enter-delay-2 mt-16 flex flex-col items-center border-t border-white/5 pt-10 text-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-text-muted">Benchmarked against where buyers actually search</span>
              <div className="mt-6 flex flex-wrap justify-center gap-5 opacity-60 grayscale transition-all hover:grayscale-0 sm:gap-12">
                 <div className="flex items-center gap-1.5 font-mono text-xs tracking-wider sm:gap-2 sm:text-sm"><Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4"/> OPENAI</div>
                 <div className="flex items-center gap-1.5 font-mono text-xs tracking-wider sm:gap-2 sm:text-sm"><Search className="h-3.5 w-3.5 sm:h-4 sm:w-4"/> PERPLEXITY</div>
                 <div className="flex items-center gap-1.5 font-mono text-xs tracking-wider sm:gap-2 sm:text-sm"><BrainCircuit className="h-3.5 w-3.5 sm:h-4 sm:w-4"/> GEMINI</div>
                 <div className="flex items-center gap-1.5 font-mono text-xs tracking-wider sm:gap-2 sm:text-sm"><PlugZap className="h-3.5 w-3.5 sm:h-4 sm:w-4"/> ANTHROPIC</div>
              </div>

            </div>
          </div>
        </section>

        {/* ───────── Section 2 : Diagnostic Matrix ───────── */}
        <SectionReveal className="py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <p className="eyebrow">Diagnostic Matrix</p>
            <h2 className="font-display mt-4 text-balance text-2xl tracking-wider sm:text-3xl lg:text-5xl">
              See the <span className="text-[#ccff00]">score</span> before
              <br />
              you touch the dashboard.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-text-secondary">
              Most stores look fine to humans and weak to AI. The report shows where schema,
              discoverability, and protocol readiness fall apart.
            </p>

            <div className="mx-auto mt-16 max-w-3xl transition-transform duration-300">
              <div className="card-glass-panel p-2">
                 <ScorePreview score={34} schema={41} llm={28} protocol={15} />
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* ───────── Section 3 : Topology (What We Scan) ───────── */}
        <SectionReveal id="topology" className="relative py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-8">
              <div className="flex flex-col justify-center text-center lg:col-span-5 lg:pr-8 lg:text-left">
                <p className="eyebrow">Product Map</p>
                <h2 className="font-display mt-4 text-balance text-2xl tracking-wider sm:text-3xl lg:text-5xl">
                  What the <span className="text-[#ccff00]">scanner</span>
                  <br />
                  actually checks.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                  Findable looks past surface-level HTML and inspects the structured signals that
                  determine whether AI systems can parse, trust, and recommend your products.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-4 sm:grid-cols-2">
                  {DIMENSION_CARDS.map(({ title, subtitle, bullets, icon: Icon }) => (
                    <div
                      key={title}
                      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-white/5"
                    >
                      <div className="mb-6 inline-flex rounded-lg border border-white/10 bg-white/5 p-3 transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/10">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-mono text-sm font-bold uppercase tracking-wide text-white">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm text-text-secondary transition-colors duration-300 group-hover:text-white/80">
                        {subtitle}
                      </p>
                      <ul className="mt-6 space-y-2 border-t border-white/5 pt-4">
                        {bullets.map((bullet) => (
                          <li key={bullet} className="flex items-center gap-3 text-xs text-[#53eafd]/70 transition-colors duration-300 group-hover:text-[#53eafd]">
                            <span className="h-1 w-1 rounded-full bg-[#53eafd]/40 transition-all duration-300 group-hover:h-1.5 group-hover:w-1.5 group-hover:bg-[#53eafd]"></span> {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* ───────── Section 3 : Sequence of Events (Before/After) ───────── */}
        <SectionReveal id="engine" className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center">
              <p className="eyebrow">Report Flow</p>
              <h2 className="font-display mt-4 text-balance text-2xl tracking-wider sm:text-3xl lg:text-5xl">
                From storefront markup
                <br />
                to <span className="text-[#ccff00]">machine-readable</span> output.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
                The report makes the gap obvious: what humans can browse is not the same thing as
                what AI systems can reliably ingest.
              </p>
            </div>

            <div className="relative mt-20">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="relative z-10 grid gap-8 lg:grid-cols-2">
                {/* Before */}
              <div className="card-glass-panel relative overflow-hidden p-1 group">
                <div className="absolute right-4 top-4 text-[10px] uppercase tracking-widest text-red-500 transition-colors duration-300 group-hover:text-red-400">Low signal</div>
                <div className="rounded-t-[20px] border-b border-white/5 bg-black/40 p-4 transition-colors duration-500 group-hover:bg-black/60">
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500 transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-mono text-xs text-text-secondary transition-colors duration-300 group-hover:text-white/70">Human-readable only</span>
                  </div>
                </div>
                <div className="bg-[#0A0A0F] p-4 font-mono text-[11px] leading-relaxed text-text-muted transition-colors duration-500 group-hover:text-text-secondary sm:p-6 sm:text-[13px]">
                  <span className="text-pink-500/70 transition-colors duration-300 group-hover:text-pink-500">&lt;h1&gt;</span>Heavyweight Tee<span className="text-pink-500/70 transition-colors duration-300 group-hover:text-pink-500">&lt;/h1&gt;</span><br/>
                  <span className="text-pink-500/70 transition-colors duration-300 group-hover:text-pink-500">&lt;p&gt;</span>Premium 100% cotton heavyweight...<br/>
                  <span className="text-pink-500/70 transition-colors duration-300 group-hover:text-pink-500">&lt;span class="price"&gt;</span>$49.95<span className="text-pink-500/70 transition-colors duration-300 group-hover:text-pink-500">&lt;/span&gt;</span><br/>
                  <span className="text-pink-500/70 transition-colors duration-300 group-hover:text-pink-500">&lt;div class="reviews"&gt;</span>★★★★☆ (47)<span className="text-pink-500/70 transition-colors duration-300 group-hover:text-pink-500">&lt;/div&gt;</span>
                </div>
              </div>

              {/* After */}
              <div className="card-glass-panel relative overflow-hidden p-1 group">
                <div className="absolute right-4 top-4 text-[10px] uppercase tracking-widest text-emerald-400 transition-colors duration-300 group-hover:text-emerald-300">High signal</div>
                <div className="rounded-t-[20px] border-b border-white/5 bg-black/40 p-4 transition-colors duration-500 group-hover:bg-black/60">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-mono text-xs text-text-secondary transition-colors duration-300 group-hover:text-white/70">Structured product record</span>
                    <div className="ml-auto">
                      <CopyButton text={`{\n  "@type": "Product",\n  "name": "Heavyweight Tee",\n  "brand": { "name": "ACME" },\n  "offers": {\n    "price": 49.95,\n    "availability": "InStock"\n  },\n  "gtin": "00012345600012"\n}`} />
                    </div>
                  </div>
                </div>
                <div className="bg-[#0A0A0F] p-4 font-mono text-[11px] leading-relaxed text-cyan-300/80 transition-colors duration-500 group-hover:text-cyan-300 sm:p-6 sm:text-[13px]">
{`{
  "@type": "Product",
  "name": "Heavyweight Tee",
  "brand": { "name": "ACME" },
  "offers": {
    "price": 49.95,
    "availability": "InStock"
  },
  "gtin": "00012345600012"
}`}
                </div>
              </div>
            </div>
            </div>
          </div>
        </SectionReveal>

        {/* ───────── Section 4 : Stats Bar ───────── */}
        <SectionReveal className="border-y border-white/5 bg-white/2 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-8 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4 lg:gap-8 lg:border-x lg:border-white/5 lg:px-8">
              {LANDING_STATS.map((stat, i) => (
                <div key={stat.label} className={`relative flex flex-col justify-center ${i !== 0 ? "lg:border-l lg:border-white/5 lg:pl-8" : ""}`}>
                  <div className="font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {stat.prefix}
                    <AnimatedCounter
                      value={stat.value}
                      decimals={stat.decimals}
                    />
                    {stat.suffix}
                  </div>
                  <p className="mt-2 text-xs font-medium uppercase tracking-widest text-text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* ───────── Section 6 : How It Works Sequence ───────── */}
        <SectionReveal className="py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-20 text-center">
               <h2 className="font-display text-2xl tracking-wider sm:text-3xl lg:text-4xl">How the <span className="text-[#ccff00]">workflow</span> lands.</h2>
               <p className="mt-4 text-text-secondary">Start with a scan, convert it into a report, then work the queue from the dashboard.</p>
            </div>
            
            <div className="relative">
              <div className="absolute left-8 top-0 h-full w-px bg-white/5 md:left-1/2 md:-ml-px"></div>
              
              <div className="space-y-16">
                {HOW_IT_WORKS_STEPS.map((step, index) => (
                  <div
                    key={step.title}
                    className={`relative flex flex-col gap-4 sm:gap-8 md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="flex w-full items-center justify-start md:w-1/2 md:justify-center">
                       <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black shadow-xl shadow-[#ccff00]/10 backdrop-blur-md">
                         <span className="font-mono text-xl font-bold text-white">0{index + 1}</span>
                       </div>
                    </div>
                    <div className={`card-glass w-full p-5 sm:p-8 md:w-1/2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <h3 className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">Phase {index + 1}</h3>
                      <h4 className="mt-2 text-2xl font-bold text-white">{step.title}</h4>
                      <p className="mt-4 leading-relaxed text-text-secondary">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* ───────── Section 7 : Pricing Tiers ───────── */}
        <SectionReveal id="pricing" className="py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="font-display text-balance text-2xl tracking-wider sm:text-3xl lg:text-5xl">
                Choose Your <span className="text-[#ccff00]">Network</span> Layer.
              </h2>
              <p className="mt-6 text-lg text-text-secondary">
                Start with the free scan, then move into monitoring, fixes, and multi-store workflows as needed.
              </p>
            </div>

            <div className="mt-20 grid gap-6 lg:grid-cols-4">
              {PRICING_TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className={`card-glass relative flex flex-col p-5 sm:p-6 lg:p-8 ${
                    tier.highlight ? "border-[#ccff00]/40 shadow-[0_0_24px_-16px_rgba(204,255,0,0.25)]" : ""
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm border border-[#ccff00]/30 bg-[#ccff00]/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#ccff00]">
                      Optimal Layer
                    </div>
                  )}
                  <h3 className="font-mono text-xl font-bold text-white">
                    {tier.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-1">
                     <span className="text-3xl font-extrabold text-[#ccff00] sm:text-4xl">{tier.monthlyPrice}</span>
                     {tier.monthlyPrice !== "Custom" && <span className="text-sm text-text-muted">/mo</span>}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">
                    {tier.description}
                  </p>
                  <ul className="mt-8 space-y-4 border-t border-white/5 pt-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-text-secondary">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#hero-form"
                    className={`mt-10 flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                      tier.highlight
                        ? "btn-primary"
                        : "btn-secondary"
                    }`}
                  >
                    {tier.name === "Agency" ? "Contact Team" : "Start with this plan"}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* ───────── Section 8 : Footer CTA ───────── */}
        <SectionReveal className="relative overflow-hidden py-20 sm:py-32 lg:py-40">
           <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[280px] bg-[#ccff00]/8 blur-[80px]"></div>
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="font-display text-balance text-2xl tracking-wider text-white sm:text-4xl lg:text-6xl">
              Start with the scan.
            </h2>
            <p className="mt-6 text-base text-text-secondary sm:text-lg lg:text-xl">
               Get the score, open the report, and move straight into the workspace.
            </p>
            <div className="mt-12">
              <a
                href="#hero-form"
                className="btn-primary rounded-xl px-8 py-4 text-base font-semibold"
              >
                Start Your Scan
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </SectionReveal>
      </main>

      {/* ───────── Footer ───────── */}
      <footer className="border-t border-white/5 bg-[#020205] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
             <div className="lg:col-span-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded border border-white/10 bg-white/5">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                    FINDABLE
                  </span>
                </div>
                <p className="mt-4 max-w-sm text-sm text-text-muted">
                   AI commerce readiness scanning, reporting, and remediation for product teams.
                </p>
             </div>
             
             <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white">Product</h4>
                 <ul className="mt-4 space-y-3 text-sm text-text-muted">
                   <li><a href="/what-we-scan" className="transition hover:text-white">What we scan</a></li>
                   <li><a href="/how-reports-work" className="transition hover:text-white">How reports work</a></li>
                   <li><a href="/pricing" className="transition hover:text-white">Plans</a></li>
                   <li><a href="/glossary" className="transition hover:text-white">Glossary</a></li>
                 </ul>
             </div>

             <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white">Company</h4>
                 <ul className="mt-4 space-y-3 text-sm text-text-muted">
                   <li><a href="/login" className="transition hover:text-white">Dashboard</a></li>
                   <li><a href="/privacy" className="transition hover:text-white">Privacy</a></li>
                   <li><a href="/terms" className="transition hover:text-white">Terms</a></li>
                 </ul>
             </div>
          </div>
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
             <p className="text-xs text-text-muted">
                &copy; 2026 FINDABLE Systems. All rights reserved.
             </p>
             <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                <span className="relative flex h-2 w-2">
                   <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                STATUS: NOMINAL
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
