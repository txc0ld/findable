import { usePageTitle } from "../../hooks/usePageTitle";
import { UMBRELLA_BRAND } from "../../lib/brand";

export function AboutPage() {
  usePageTitle("About", UMBRELLA_BRAND.name);

  return (
    <section className="relative px-5 pb-24 pt-16 sm:px-6 sm:pt-20">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
          About
        </div>
        <h1 className="font-display text-3xl leading-[1.1] tracking-tight sm:text-4xl">
          Building useful Shopify apps.
        </h1>
        <p className="text-[15px] leading-relaxed text-text-secondary">
          {UMBRELLA_BRAND.name} ships small, focused apps for Shopify merchants. Each one solves a single
          operational problem end to end, integrates cleanly with the Shopify admin, and stays out of
          your way the rest of the time.
        </p>
        <p className="text-[15px] leading-relaxed text-text-secondary">
          More content coming soon.
        </p>
      </div>
    </section>
  );
}
