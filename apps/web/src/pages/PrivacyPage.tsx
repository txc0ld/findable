import { Sparkles } from "lucide-react";

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <header className="border-b border-white/5 bg-bg-primary/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2.5">
            <Sparkles className="h-5 w-5 text-[#ccff00]" />
            <span className="text-sm font-bold uppercase tracking-[0.2em]">
              FINDABLE
            </span>
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          Last updated: April 1, 2026
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-text-secondary">
          <Section title="1. Information We Collect">
            When you use FINDABLE, we collect the product page URLs you submit
            for scanning, your email address, and basic usage analytics. We do
            not collect payment information directly &mdash; all payments are
            processed securely through Stripe.
          </Section>

          <Section title="2. How We Use Your Information">
            We use your information to perform AI commerce readiness scans,
            generate reports, send you score results, and improve our scanning
            algorithms. We do not sell your data to third parties.
          </Section>

          <Section title="3. Data Retention">
            Scan results and associated product data are retained for the
            duration of your account. Free scan data is retained for 90 days.
            You may request deletion of your data at any time by contacting
            support.
          </Section>

          <Section title="4. Third-Party Services">
            We use Cloudflare for bot protection and CDN services, Stripe for
            payment processing, and standard analytics tools. Each service has
            its own privacy policy governing their use of data.
          </Section>

          <Section title="5. Cookies">
            We use essential cookies for authentication and session management.
            We use analytics cookies to understand how our product is used. You
            can disable non-essential cookies in your browser settings.
          </Section>

          <Section title="6. Security">
            All data is transmitted over HTTPS. Scan data is processed on
            secured infrastructure. We follow industry best practices for data
            protection and regularly review our security posture.
          </Section>

          <Section title="7. Your Rights">
            You have the right to access, correct, or delete your personal data.
            You may also request a copy of the data we hold about you. Contact
            us at privacy@getfindable.au to exercise these rights.
          </Section>

          <Section title="8. Contact">
            For privacy-related questions, contact us at privacy@getfindable.au.
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
