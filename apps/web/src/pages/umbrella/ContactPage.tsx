import { usePageTitle } from "../../hooks/usePageTitle";

export function ContactPage() {
  usePageTitle("Contact");

  return (
    <section className="relative px-5 pb-24 pt-16 sm:px-6 sm:pt-20">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
          Contact
        </div>
        <h1 className="font-display text-3xl leading-[1.1] tracking-tight sm:text-4xl">
          Get in touch.
        </h1>
        <p className="text-[15px] leading-relaxed text-text-secondary">
          Questions, feedback, partnership ideas, or support requests — we read everything.
        </p>
        <p className="text-[15px] leading-relaxed text-text-secondary">
          More contact options coming soon.
        </p>
      </div>
    </section>
  );
}
