# Findable

Findable is an AI commerce readiness product for scanning product pages, generating a report, and managing remediation work from a dashboard.

## Repo layout

- `apps/web`: React + Vite marketing site, report flow, and dashboard UI
- `apps/api`: Hono API, scan orchestration, workspace endpoints, and worker entrypoints
- `packages/shared`: shared types and contracts used by web and API
- `docs/PRD.md`: product direction
- `docs/FRONTEND.md`: frontend implementation notes

## Current v1 scope

- Free scan form with Cloudflare Turnstile
- Live scan report polling flow
- Session-lite dashboard by email
- Products, issues, fixes, feeds, competitors, billing, and admin surfaces
- Lightweight live HTML scanner with structured scoring output

## Environment

Copy values from [.env.example](./.env.example).

Core runtime:

- `DATABASE_URL`
- `REDIS_URL`
- `CLOUDFLARE_TURNSTILE_SECRET`
- `VITE_CLOUDFLARE_TURNSTILE_SITE_KEY`
- `VITE_API_URL`

Optional integrations:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SHOPIFY_API_KEY`
- `SHOPIFY_API_SECRET`
- `WOOCOMMERCE_CONSUMER_KEY`
- `WOOCOMMERCE_CONSUMER_SECRET`
- `FIRECRAWL_API_KEY`
- `ANTHROPIC_API_KEY`
- `RESEND_API_KEY`
- `VITE_POSTHOG_KEY`

## Development

```bash
bun install
bun run dev:api
bun run dev:web
```

## Verification

```bash
bun run typecheck
bun run build
```

## Notes

- The current auth flow is session-lite and email-based.
- Billing UI is wired, but real Stripe checkout requires the Stripe keys above.
- Store settings are wired, but real Shopify and WooCommerce auth/sync require integration credentials.
