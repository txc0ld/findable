import type { ReactNode } from "react";

import { usePageTitle } from "../../hooks/usePageTitle";

export function PrivacyPage() {
  usePageTitle("Privacy Policy");

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-6">
      <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-text-muted">Last updated: April 1, 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-text-secondary">
        <Section title="1. Information We Collect">
          When you use our apps, we collect the data you submit through them — product page URLs,
          inventory receipts, supplier invoices, your email address, and basic usage analytics.
          Payment information is processed by Stripe or by Shopify Billing depending on the app
          and is not stored by us directly.
        </Section>

        <Section title="2. How We Use Your Information">
          We use your information to operate the apps you've installed, generate the reports
          and inventory records they produce, and improve the underlying algorithms and
          workflows. We do not sell your data to third parties.
        </Section>

        <Section title="3. Data Retention">
          Active workspace data is retained for the duration of your account. Free scan data is
          retained for 90 days. You may request deletion of your data at any time by contacting
          support.
        </Section>

        <Section title="4. Third-Party Services">
          We use Cloudflare for bot protection and CDN services, Stripe and Shopify Billing for
          payments, and standard analytics tooling. Each service has its own privacy policy
          governing their use of data.
        </Section>

        <Section title="5. Cookies">
          We use essential cookies for authentication and session management, and analytics
          cookies to understand how our products are used. You can disable non-essential cookies
          in your browser settings.
        </Section>

        <Section title="6. Security">
          All data is transmitted over HTTPS. App data is processed on secured infrastructure.
          We follow industry best practices for data protection and regularly review our
          security posture.
        </Section>

        <Section title="7. Your Rights">
          You have the right to access, correct, or delete your personal data. You may also
          request a copy of the data we hold about you. Contact us at privacy@getfindable.au to
          exercise these rights.
        </Section>

        <Section title="8. Contact">
          For privacy-related questions, contact us at privacy@getfindable.au.
        </Section>
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-semibold text-text-primary">{title}</h2>
      <p className="mt-2">{children}</p>
    </section>
  );
}
