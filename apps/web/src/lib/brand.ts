export const UMBRELLA_BRAND = {
  name: "<UmbrellaBrand>",
  tagline: "Apps for Shopify merchants",
  shortTagline: "Apps for Shopify",
} as const;

export type ProductBrand = {
  key: "findable" | "stockproof";
  name: string;
  tagline: string;
  description: string;
  positioningLine: string;
  href: string;
  shopifyAppStoreUrl: string;
  accent: string;
  bullets: readonly string[];
};

export const FINDABLE_BRAND: ProductBrand = {
  key: "findable",
  name: "Findable",
  tagline: "AI commerce readiness for Shopify",
  description:
    "Scan product pages, score them across schema, LLM discoverability, protocol compliance, and competitive position, then ship automated remediation.",
  positioningLine:
    "Findable turns a Shopify catalogue into an AI-ready storefront — scored, fixed, and visible to every model.",
  href: "/findable",
  shopifyAppStoreUrl: "https://apps.shopify.com/findable",
  accent: "#ccff00",
  bullets: [
    "Score every product across 4 dimensions",
    "Auto-inject structured data and AEO copy",
    "Track remediation against competitors",
  ],
};

export const STOCKPROOF_BRAND: ProductBrand = {
  key: "stockproof",
  name: "StockProof",
  tagline: "Goods received, audit trail",
  description:
    "Receive by barcode or CSV, push approved receipts to Shopify inventory, match against supplier invoices, and prove every quantity and value variance.",
  positioningLine:
    "StockProof turns goods receiving into a clean audit trail: stock received, Shopify adjusted, invoice matched.",
  href: "/stockproof",
  shopifyAppStoreUrl: "https://apps.shopify.com/stockproof",
  accent: "#00ccff",
  bullets: [
    "Receive by barcode or CSV",
    "Match supplier invoices, flag variances",
    "Export reconciliation reports",
  ],
};

export const PRODUCTS: readonly ProductBrand[] = [FINDABLE_BRAND, STOCKPROOF_BRAND];
