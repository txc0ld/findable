import { useState } from "react";
import type { PlanTier } from "@findable/shared";
import { Check, LoaderCircle } from "lucide-react";

import { useDashboardContext } from "../../lib/dashboard-context";
import { updatePlan } from "../../lib/workspace-api";

const PLANS: Array<{
  description: string;
  features: string[];
  plan: PlanTier;
  price: string;
}> = [
  {
    plan: "free",
    price: "$0",
    description: "Single free scan and report preview.",
    features: ["1 free scan", "Report preview", "Email capture"],
  },
  {
    plan: "starter",
    price: "$39",
    description: "For stores cleaning up the basics.",
    features: ["Weekly rescans", "Schema fixes", "Feed generation"],
  },
  {
    plan: "growth",
    price: "$129",
    description: "For merchants actively optimizing for AI discovery.",
    features: ["AEO rewrite suggestions", "FAQ generation", "Daily monitoring"],
  },
  {
    plan: "pro",
    price: "$349",
    description: "For larger catalogs and teams.",
    features: ["Unlimited products", "Priority support", "Competitor monitoring"],
  },
];

export function BillingPage() {
  const { refreshWorkspace, workspace } = useDashboardContext();
  const [activePlan, setActivePlan] = useState<PlanTier | null>(null);

  async function handleSelect(plan: PlanTier) {
    setActivePlan(plan);

    try {
      await updatePlan(plan);
      await refreshWorkspace();
    } finally {
      setActivePlan(null);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Billing</h1>
      <p className="mt-1 text-text-secondary">
        Choose the plan that matches your v1 rollout.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {PLANS.map((plan) => {
          const isCurrent = workspace.profile.plan === plan.plan;

          return (
            <div
              key={plan.plan}
              className={`card p-6 ${isCurrent ? "ring-1 ring-[#ccff00]/30" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
                    {plan.plan}
                  </p>
                  <p className="mt-2 text-3xl font-extrabold text-[#ccff00]">{plan.price}</p>
                  <p className="mt-2 text-sm text-text-secondary">{plan.description}</p>
                </div>
                {isCurrent ? (
                  <span className="rounded-full border border-[#ccff00]/20 bg-[#ccff00]/10 px-3 py-1 text-xs font-medium text-[#ccff00]">
                    Current
                  </span>
                ) : null}
              </div>

              <ul className="mt-6 space-y-3 text-sm text-text-secondary">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => void handleSelect(plan.plan)}
                disabled={isCurrent || activePlan === plan.plan}
                className="btn-primary mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold"
              >
                {activePlan === plan.plan ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Updating
                  </>
                ) : isCurrent ? (
                  "Current plan"
                ) : (
                  `Switch to ${plan.plan}`
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
