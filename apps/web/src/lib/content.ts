import type { ScoreBand } from "@findable/shared";
import { getScoreBand } from "@findable/shared";
import {
  BarChart3,
  BrainCircuit,
  PlugZap,
  Search,
  type LucideIcon,
} from "lucide-react";

export interface DimensionCard {
  title: string;
  subtitle: string;
  bullets: string[];
  icon: LucideIcon;
}

export interface StatHighlight {
  value: number;
  decimals?: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export const DIMENSION_CARDS: DimensionCard[] = [
  {
    title: "Schema Intelligence",
    subtitle: "Can agents read your products?",
    bullets: ["JSON-LD markup", "Product IDs", "Shipping schema", "Data consistency"],
    icon: Search,
  },
  {
    title: "LLM Discoverability",
    subtitle: "Will ChatGPT recommend you?",
    bullets: ["AEO optimization", "Review signals", "FAQ structure", "Content freshness"],
    icon: BrainCircuit,
  },
  {
    title: "Protocol Compliance",
    subtitle: "Are you on the new AI shelves?",
    bullets: ["OpenAI ACP feed", "Google UCP", "Merchant programs", "Feed freshness"],
    icon: PlugZap,
  },
  {
    title: "Competitive Position",
    subtitle: "How do you compare to competitors?",
    bullets: ["Side-by-side scans", "Gap analysis", "Trend tracking", "Win/loss signals"],
    icon: BarChart3,
  },
];

export const LANDING_STATS: StatHighlight[] = [
  { value: 50, suffix: "M+", label: "daily AI shopping queries" },
  { value: 2.47, decimals: 2, suffix: "%", label: "LLM conversion rate" },
  { value: 3.6, decimals: 1, suffix: "x", label: "more reviews = recommended" },
  { value: 89, suffix: "%", label: "FAQ schema citation boost" },
];

export const HERO_SCORE: ScoreBand = getScoreBand(34);

export const PRICING_TIERS = [
  {
    name: "Starter",
    monthlyPrice: "$19",
    description: "For small catalogs that need clean schema and weekly checks.",
    features: ["500 products", "Schema generation", "Schema injection", "Weekly monitoring"],
    highlight: false,
  },
  {
    name: "Growth",
    monthlyPrice: "$59",
    description: "The core paid plan for merchants who need fixes and feeds fast.",
    features: ["5,000 products", "AEO rewrites", "FAQ generation", "Daily monitoring"],
    highlight: true,
  },
  {
    name: "Pro",
    monthlyPrice: "$249",
    description: "For large catalogs, prompt testing, and fast feed refresh windows.",
    features: ["Unlimited products", "LLM prompt testing", "Hosted feeds", "5 competitor scans"],
    highlight: false,
  },
  {
    name: "Agency",
    monthlyPrice: "Custom",
    description: "White-label reporting and multi-store workflows for agencies.",
    features: ["Unlimited stores", "Branded reports", "Client invites", "Priority support"],
    highlight: false,
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    title: "Scan",
    body: "Paste one to three live product URLs and run the free AI commerce readiness scan.",
  },
  {
    title: "Score",
    body: "See how your products perform across schema, LLM discoverability, protocol readiness, and competition.",
  },
  {
    title: "Fix",
    body: "Use the report to prioritize what to clean up now and what FINDABLE can auto-fix later.",
  },
];
