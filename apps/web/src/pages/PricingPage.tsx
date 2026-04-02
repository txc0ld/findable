import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";

import { usePageTitle } from "../hooks/usePageTitle";
import { SectionReveal } from "../components/SectionReveal";

interface PlanDetail {
  name: string;
  price: string;
  period: string;
  description: string;
  highlight: boolean;
  badge?: string;
  features: string[];
  limits: string[];
  excluded: string[];
}

const PLANS: PlanDetail[] = [
  {
    name: "Free Scan",
    price: "$0",
    period: "one-time",
    description:
      "One scan session with up to 3 product URLs. Get the full report with scores, issues, and sample fixes delivered on-screen and via email.",
    highlight: false,
    features: [
      "1 scan session (up to 3 product URLs)",
      "Full score breakdown across all dimensions",
      "Prioritized issue list with severity labels",
      "Sample generated JSON-LD for one product",
      "Report emailed to your inbox",
    ],
    limits: ["1 scan per email address", "No dashboard access", "No monitoring"],
    excluded: [
      "Auto-fix engine",
      "AEO rewrites",
      "Feed generation",
      "Competitor tracking",
    ],
  },
  {
    name: "Starter",
    price: "$39",
    period: "/mo",
    description:
      "For small catalogs that need clean schema and regular checks. Connect your store and let Findable handle JSON-LD injection and weekly rescans.",
    highlight: false,
    features: [
      "Up to 500 products",
      "Schema generation and injection",
      "BreadcrumbList schema",
      "Duplicate schema detection and fix",
      "Microdata to JSON-LD conversion",
      "Weekly automated rescans",
      "Dashboard with full issue tracker",
      "Email alerts for critical issues",
    ],
    limits: ["1 connected store", "Weekly scan frequency"],
    excluded: ["AEO rewrites", "FAQ generation", "Feed hosting", "Competitor scans"],
  },
  {
    name: "Growth",
    price: "$129",
    period: "/mo",
    description:
      "The core plan for merchants actively optimizing for AI commerce. Includes description rewrites, FAQ generation, and ACP/GMC feed hosting.",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Up to 5,000 products",
      "Everything in Starter",
      "AEO description rewrites (LLM-powered)",
      "Auto-generated FAQ schema",
      "OpenAI ACP feed generation and hosting",
      "Google Merchant Center supplemental feed",
      "Daily automated rescans",
      "Score trend tracking over time",
    ],
    limits: ["1 connected store", "Daily scan frequency"],
    excluded: ["LLM prompt testing", "Competitor monitoring"],
  },
  {
    name: "Pro",
    price: "$349",
    period: "/mo",
    description:
      "For large catalogs and teams that need prompt testing, competitor benchmarks, and fast feed refresh windows.",
    highlight: false,
    features: [
      "Unlimited products",
      "Everything in Growth",
      "LLM prompt testing engine (ChatGPT, Claude, Perplexity)",
      "5 competitor benchmark scans",
      "Hosted feeds with 15-minute refresh",
      "Priority support",
      "API access for custom integrations",
      "Multi-user workspace",
    ],
    limits: ["3 connected stores"],
    excluded: [],
  },
  {
    name: "Agency",
    price: "Custom",
    period: "",
    description:
      "White-label reporting and multi-store workflows for agencies managing e-commerce clients at scale.",
    highlight: false,
    features: [
      "Unlimited stores",
      "Everything in Pro",
      "White-label branded reports",
      "Client invite system with role management",
      "Bulk scan orchestration",
      "Dedicated account manager",
      "Custom feed formats",
      "SLA with guaranteed uptime",
    ],
    limits: [],
    excluded: [],
  },
];

const FAQ = [
  {
    q: "Can I try Findable before paying?",
    a: "Yes. The free scan gives you a full report for up to 3 product pages with no account required. If you want ongoing monitoring, connect your store and pick a plan.",
  },
  {
    q: "What platforms do you support?",
    a: "Shopify (via OAuth app install), WooCommerce (REST API), BigCommerce (Script Manager API), and any custom or headless store via on-page schema injection.",
  },
  {
    q: "How does the auto-fix engine work?",
    a: "Findable generates complete JSON-LD from your product data and injects it via platform APIs (Shopify Script Tags, WP wp_head, BigCommerce Script Manager). No theme code is modified.",
  },
  {
    q: "What is AEO?",
    a: "Answer Engine Optimization. It rewrites product descriptions from marketing copy into factual, attribute-dense text that LLMs can extract and cite when recommending products.",
  },
  {
    q: "How often are scans run?",
    a: "Free: one-time. Starter: weekly. Growth: daily. Pro: daily with on-demand rescans. Feed refresh frequency is separate — Pro includes 15-minute refresh cycles.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. All paid plans are month-to-month with no long-term contracts. Cancel from the dashboard billing page and your plan runs through the end of the current period.",
  },
];

export function PricingPage() {
  usePageTitle("Pricing");
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-bg-primary/95 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2.5">
            <Sparkles className="h-5 w-5 text-[#ccff00]" />
            <span className="text-sm font-bold uppercase tracking-[0.2em]">FINDABLE</span>
          </a>
          <Link to="/" className="btn-secondary rounded-lg px-4 py-2 text-[13px] font-semibold">
            <ArrowLeft className="h-3 w-3" /> Back
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-16">
        <SectionReveal>
          <div className="text-center">
            <p className="eyebrow">Plans</p>
            <h1 className="font-display mt-4 text-balance text-3xl tracking-tight sm:text-4xl">
              Choose Your <span className="text-[#ccff00]">Network</span> Layer.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
              Start with the free scan, then move into monitoring, fixes, and
              multi-store workflows as your AI commerce needs grow.
            </p>
          </div>
        </SectionReveal>

        {/* Plan cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {PLANS.filter((p) => p.name !== "Free Scan").slice(0, 3).map((plan) => (
            <SectionReveal key={plan.name}>
              <div
                className={`card relative flex h-full flex-col p-5 sm:p-8 ${
                  plan.highlight
                    ? "border-[#ccff00]/40 shadow-[0_0_24px_-16px_rgba(204,255,0,0.25)]"
                    : ""
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm border border-[#ccff00]/30 bg-[#ccff00]/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#ccff00]">
                    {plan.badge}
                  </div>
                )}
                <h3 className="font-mono text-xl font-bold text-white">
                  {plan.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#ccff00] sm:text-4xl">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-text-muted">{plan.period}</span>
                  )}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {plan.description}
                </p>

                <ul className="mt-8 flex-1 space-y-3 border-t border-white/5 pt-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-text-secondary"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      {feature}
                    </li>
                  ))}
                  {plan.excluded.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-text-muted"
                    >
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-text-muted/50" />
                      {item}
                    </li>
                  ))}
                </ul>

                {plan.limits.length > 0 && (
                  <p className="mt-4 text-xs text-text-muted">
                    {plan.limits.join(" · ")}
                  </p>
                )}

                <a
                  href="/#hero-form"
                  className={`mt-8 flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold ${
                    plan.highlight ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  Start with {plan.name}
                </a>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Pro + Agency row */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {PLANS.filter((p) => p.name === "Pro" || p.name === "Agency").map(
            (plan) => (
              <SectionReveal key={plan.name}>
                <div className="card flex h-full flex-col p-5 sm:p-8">
                  <h3 className="font-mono text-xl font-bold text-white">
                    {plan.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-[#ccff00] sm:text-4xl">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm text-text-muted">{plan.period}</span>
                    )}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                    {plan.description}
                  </p>
                  <ul className="mt-8 flex-1 space-y-3 border-t border-white/5 pt-6">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-text-secondary"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={plan.name === "Agency" ? "mailto:hello@getfindable.au" : "/#hero-form"}
                    className="btn-secondary mt-8 flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold"
                  >
                    {plan.name === "Agency" ? "Contact Team" : `Start with ${plan.name}`}
                  </a>
                </div>
              </SectionReveal>
            ),
          )}
        </div>

        {/* Free scan callout */}
        <SectionReveal className="mt-12">
          <div className="card p-6 text-center">
            <p className="text-sm text-text-secondary">
              Not ready for a plan?{" "}
              <a href="/#hero-form" className="font-medium text-[#ccff00]">
                Run the free scan
              </a>{" "}
              — no account required. Scan up to 3 product pages and get the full
              report delivered instantly.
            </p>
          </div>
        </SectionReveal>

        {/* FAQ */}
        <SectionReveal className="mt-24">
          <h2 className="font-display text-center text-2xl tracking-tight sm:text-3xl">
            Frequently asked questions.
          </h2>

          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="card p-6">
                <p className="font-semibold">{item.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* CTA */}
        <SectionReveal className="mt-24">
          <div className="card p-5 text-center sm:p-8 lg:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight">
              Start with the scan.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-text-secondary">
              Every plan starts with the same scan. See your score, then decide
              what level of automation you need.
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
