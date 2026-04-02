import { Check, Sparkles, X, ChevronRight, BarChart3, BrainCircuit, PlugZap, Search } from "lucide-react";

import { AnimatedCounter } from "../components/AnimatedCounter";
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
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-[#ccff00]/30">
      {/* ───────── Nav ───────── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-bg-primary/60 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-white/10 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-white">
              FINDABLE
            </span>
          </div>

          <div className="hidden items-center gap-8 text-[13px] font-medium tracking-wide text-text-secondary md:flex">
            <a href="#topology" className="transition hover:text-white">
              Product Map
            </a>
            <a href="#engine" className="transition hover:text-white">
              Report Flow
            </a>
            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
            <a href="/login" className="transition hover:text-white">
              Dashboard
            </a>
          </div>

          <a
            href="#hero-form"
            className="btn-secondary rounded-lg px-4 py-2 text-[13px] font-semibold"
          >
            Start Free Scan <ChevronRight className="ml-1 h-3 w-3" />
          </a>
        </nav>
      </header>

      <main className="relative">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30"></div>

        {/* ───────── Section 1 : Hero ───────── */}
        <section className="relative overflow-hidden px-4 pb-24 pt-20">
          {/* Dimensional Glows */}
          <div className="pointer-events-none absolute left-1/2 top-[20%] h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#ccff00]/20 blur-[120px]" />

          <div className="relative z-10 mx-auto flex min-h-[90vh] w-full max-w-7xl flex-col justify-center">
            <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(420px,520px)] lg:gap-12">
              <div className="hero-enter text-center lg:text-left">
                <h1 className="font-display mx-auto max-w-5xl text-balance text-5xl leading-[1.1] tracking-wider sm:text-6xl md:text-7xl lg:mx-0 lg:max-w-4xl lg:text-[5rem]">
                  Make Your Products
                  <br />
                  <span className="text-[#ccff00]">Understandable to AI</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl lg:mx-0 lg:max-w-xl">
                  AI shopping agents are starting to influence what gets discovered,
                  recommended, and purchased. Scan your product pages and see where your
                  catalog is falling behind.
                </p>
                <div className="mx-auto mt-8 flex max-w-xl flex-wrap gap-3 text-sm text-text-secondary lg:mx-0">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">1-3 live URLs</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">15 second scan</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Dashboard-ready report</span>
                </div>
              </div>

              <div
                id="hero-form"
                className="hero-enter hero-enter-delay relative z-20 mx-auto w-full max-w-[560px] lg:mx-0 lg:justify-self-end"
              >
                <div className="card-glass-panel p-3">
                  <ScanForm ctaLabel="Run Free Scan" />
                </div>
              </div>
            </div>

            <div className="hero-enter hero-enter-delay-2 mt-16 flex flex-col items-center border-t border-white/5 pt-10 text-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-text-muted">Benchmarked against where buyers actually search</span>
              <div className="mt-6 flex flex-wrap justify-center gap-8 opacity-60 grayscale transition-all hover:grayscale-0 sm:gap-12">
                 <div className="flex items-center gap-2 font-mono text-sm tracking-wider"><Sparkles className="h-4 w-4"/> OPENAI</div>
                 <div className="flex items-center gap-2 font-mono text-sm tracking-wider"><Search className="h-4 w-4"/> PERPLEXITY</div>
                 <div className="flex items-center gap-2 font-mono text-sm tracking-wider"><BrainCircuit className="h-4 w-4"/> GEMINI</div>
                 <div className="flex items-center gap-2 font-mono text-sm tracking-wider"><PlugZap className="h-4 w-4"/> ANTHROPIC</div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Section 2 : Topology (What We Scan) ───────── */}
        <SectionReveal id="topology" className="relative py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-8">
              <div className="flex flex-col justify-center lg:col-span-5 lg:pr-8">
                <p className="eyebrow">Product Map</p>
                <h2 className="font-display mt-4 text-balance text-3xl tracking-wider sm:text-5xl">
                  What the scanner
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
                  {DIMENSION_CARDS.map(({ title, subtitle, bullets, icon: Icon }, index) => (
                    <div
                      key={title}
                      className="card-glass panel-glow group relative cursor-pointer overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#ccff00]/10"
                    >
                      {/* Subtle hover background sweep */}
                      <div className="absolute inset-0 z-0 bg-linear-to-br from-[#ccff00]/0 via-[#ccff00]/0 to-[#ccff00]/0 transition-all duration-500 group-hover:from-[#ccff00]/5 group-hover:to-transparent" />
                      
                      <div className="relative z-10">
                        <div className="mb-6 inline-flex rounded-lg border border-white/10 bg-white/5 p-3 transition-colors duration-300 group-hover:border-[#ccff00]/30 group-hover:bg-[#ccff00]/20">
                          <Icon className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-[#ccff00]" />
                        </div>
                        <h3 className="font-mono text-sm font-bold uppercase tracking-wide text-white transition-colors duration-300 group-hover:text-[#ccff00]">
                          {title}
                        </h3>
                        <p className="mt-2 text-sm text-text-secondary transition-colors duration-300 group-hover:text-white/80">
                          {subtitle}
                        </p>
                        <ul className="mt-6 space-y-2 border-t border-white/5 pt-4">
                          {bullets.map((bullet) => (
                            <li key={bullet} className="flex items-center gap-3 text-xs text-text-muted transition-colors duration-300 group-hover:text-text-secondary">
                              <span className="h-1 w-1 rounded-full bg-[#ccff00]/50 transition-all duration-300 group-hover:h-1.5 group-hover:w-1.5 group-hover:bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span> {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* ───────── Section 3 : Sequence of Events (Before/After) ───────── */}
        <SectionReveal id="engine" className="relative overflow-hidden py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="eyebrow">Report Flow</p>
              <h2 className="font-display mt-4 text-balance text-3xl tracking-wider sm:text-5xl">
                From storefront markup
                <br />
                to machine-readable output.
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
              <div className="card-glass-panel relative overflow-hidden p-1 group transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl hover:shadow-white/5">
                <div className="absolute right-4 top-4 text-[10px] uppercase tracking-widest text-red-500 transition-colors duration-300 group-hover:text-red-400">Low signal</div>
                <div className="rounded-t-[20px] border-b border-white/5 bg-black/40 p-4 transition-colors duration-500 group-hover:bg-black/60">
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500 transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-mono text-xs text-text-secondary transition-colors duration-300 group-hover:text-white/70">Human-readable only</span>
                  </div>
                </div>
                <div className="bg-[#0A0A0F] p-6 font-mono text-[13px] leading-relaxed text-text-muted transition-colors duration-500 group-hover:text-text-secondary">
                  <span className="text-pink-500/70 transition-colors duration-300 group-hover:text-pink-500">&lt;h1&gt;</span>Heavyweight Tee<span className="text-pink-500/70 transition-colors duration-300 group-hover:text-pink-500">&lt;/h1&gt;</span><br/>
                  <span className="text-pink-500/70 transition-colors duration-300 group-hover:text-pink-500">&lt;p&gt;</span>Premium 100% cotton heavyweight...<br/>
                  <span className="text-pink-500/70 transition-colors duration-300 group-hover:text-pink-500">&lt;span class="price"&gt;</span>$49.95<span className="text-pink-500/70 transition-colors duration-300 group-hover:text-pink-500">&lt;/span&gt;</span><br/>
                  <span className="text-pink-500/70 transition-colors duration-300 group-hover:text-pink-500">&lt;div class="reviews"&gt;</span>★★★★☆ (47)<span className="text-pink-500/70 transition-colors duration-300 group-hover:text-pink-500">&lt;/div&gt;</span>
                </div>
              </div>

              {/* After */}
              <div className="card-glass-panel panel-glow relative overflow-hidden p-1 group transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl hover:shadow-emerald-500/10">
                <div className="absolute right-4 top-4 text-[10px] uppercase tracking-widest text-emerald-400 transition-colors duration-300 group-hover:text-emerald-300">High signal</div>
                <div className="rounded-t-[20px] border-b border-white/5 bg-black/40 p-4 transition-colors duration-500 group-hover:bg-black/60">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-mono text-xs text-text-secondary transition-colors duration-300 group-hover:text-white/70">Structured product record</span>
                  </div>
                </div>
                <div className="bg-[#0A0A0F] p-6 font-mono text-[13px] leading-relaxed text-cyan-300/80 transition-colors duration-500 group-hover:text-cyan-300">
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
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 border-x border-white/5 px-8">
              {LANDING_STATS.map((stat, i) => (
                <div key={stat.label} className={`relative flex flex-col justify-center ${i !== 0 ? "lg:border-l lg:border-white/5 lg:pl-8" : ""}`}>
                  <div className="font-mono text-4xl font-bold tracking-tight text-white">
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

        {/* ───────── Section 5 : The Score Engine ───────── */}
        <SectionReveal className="py-32">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <p className="eyebrow">Diagnostic Matrix</p>
            <h2 className="font-display mt-4 text-balance text-3xl tracking-wider sm:text-5xl">
              See the score before
              <br />
              you touch the dashboard.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-text-secondary">
              Most stores look fine to humans and weak to AI. The report shows where schema,
              discoverability, and protocol readiness fall apart.
            </p>

            <div className="mx-auto mt-16 max-w-3xl transform cursor-crosshair transition-transform duration-700 hover:scale-[1.02]">
              <div className="card-glass-panel p-2">
                 <ScorePreview score={34} schema={41} llm={28} protocol={15} />
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* ───────── Section 6 : How It Works Sequence ───────── */}
        <SectionReveal className="py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-20 text-center">
               <h2 className="font-display text-3xl tracking-wider sm:text-4xl">How the workflow lands.</h2>
               <p className="mt-4 text-text-secondary">Start with a scan, convert it into a report, then work the queue from the dashboard.</p>
            </div>
            
            <div className="relative">
              <div className="absolute left-8 top-0 h-full w-px bg-white/5 md:left-1/2 md:-ml-px"></div>
              
              <div className="space-y-16">
                {HOW_IT_WORKS_STEPS.map((step, index) => (
                  <div
                    key={step.title}
                    className={`relative flex flex-col gap-8 md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="flex w-full items-center justify-start md:w-1/2 md:justify-center">
                       <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black shadow-xl shadow-[#ccff00]/10 backdrop-blur-md">
                         <span className="font-mono text-xl font-bold text-white">0{index + 1}</span>
                       </div>
                    </div>
                    <div className={`card-glass w-full p-8 md:w-1/2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
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
        <SectionReveal id="pricing" className="py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="font-display text-balance text-3xl tracking-wider sm:text-5xl">
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
                  className={`card-glass relative flex flex-col p-8 transition-transform duration-300 hover:-translate-y-2 ${
                    tier.highlight ? "border-[#ccff00]/40 shadow-[0_0_40px_-15px_rgba(79,70,229,0.3)]" : ""
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
                     <span className="text-4xl font-extrabold text-[#ccff00]">{tier.monthlyPrice}</span>
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
        <SectionReveal className="relative overflow-hidden py-40">
           <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[500px] bg-[#ccff00]/10 blur-[150px]"></div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <h2 className="font-display text-balance text-4xl tracking-wider text-white sm:text-6xl">
              Start with the scan.
            </h2>
            <p className="mt-6 text-xl text-text-secondary">
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
        <div className="mx-auto max-w-7xl px-6">
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
                   <li><a href="#topology" className="transition hover:text-white">What we scan</a></li>
                   <li><a href="#engine" className="transition hover:text-white">How reports work</a></li>
                   <li><a href="#pricing" className="transition hover:text-white">Plans</a></li>
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
