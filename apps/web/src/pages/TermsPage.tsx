import { Sparkles } from "lucide-react";

export function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <header className="border-b border-white/5 bg-bg-primary/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="/" className="flex items-center gap-2.5">
            <Sparkles className="h-5 w-5 text-[#ccff00]" />
            <span className="text-sm font-bold uppercase tracking-[0.2em]">
              FINDABLE
            </span>
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          Last updated: April 1, 2026
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-text-secondary">
          <Section title="1. Acceptance of Terms">
            By accessing or using FINDABLE (&ldquo;the Service&rdquo;), you
            agree to be bound by these Terms of Service. If you do not agree,
            you may not use the Service.
          </Section>

          <Section title="2. Description of Service">
            FINDABLE provides AI commerce readiness scanning, scoring, and
            optimization tools for e-commerce stores. The Service scans publicly
            accessible product pages and generates reports on structured data
            quality, LLM discoverability, and protocol compliance.
          </Section>

          <Section title="3. Account Registration">
            You must provide a valid email address to use the free scan. Paid
            plans require additional account information. You are responsible for
            maintaining the security of your account credentials.
          </Section>

          <Section title="4. Free Scan">
            Each email address is entitled to one free scan of up to three
            product URLs. Free scan results are retained for 90 days. Additional
            scans require a paid subscription.
          </Section>

          <Section title="5. Paid Subscriptions">
            Paid plans are billed monthly or annually through Stripe. You may
            cancel at any time. Refunds are available within 14 days of
            purchase. Features vary by plan tier.
          </Section>

          <Section title="6. Acceptable Use">
            You may not use the Service to scan pages you do not own or have
            authorization to scan (except competitor comparison features where
            only publicly available data is analyzed). You may not attempt to
            reverse-engineer, abuse, or overload the Service.
          </Section>

          <Section title="7. Data Ownership">
            You retain ownership of your store data. FINDABLE retains the right
            to use anonymized, aggregated scan data to improve its algorithms
            and publish industry benchmarks.
          </Section>

          <Section title="8. Limitation of Liability">
            FINDABLE is provided &ldquo;as is&rdquo; without warranties of any
            kind. We are not liable for any damages arising from your use of the
            Service, including but not limited to lost revenue, data loss, or
            service interruptions.
          </Section>

          <Section title="9. Changes to Terms">
            We reserve the right to modify these terms at any time. Material
            changes will be communicated via email. Continued use of the Service
            after changes constitutes acceptance.
          </Section>

          <Section title="10. Contact">
            For questions about these terms, contact us at legal@getfindable.au.
          </Section>
        </div>
      </main>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-base font-semibold text-text-primary">{title}</h2>
      <p className="mt-2">{children}</p>
    </section>
  );
}
