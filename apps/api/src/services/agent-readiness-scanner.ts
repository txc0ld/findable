/**
 * Agent-readiness scanner — domain-level checks for emerging AI/agent commerce
 * protocols. Modeled after the surface area at isitagentready.com.
 *
 * Each check is a one-shot HTTP probe against the domain root or a
 * spec-defined .well-known path. Results are aggregated into a single 0-100
 * agent-readiness score and a per-check pass/fail list that the worker turns
 * into ScanExecutionIssue rows.
 *
 * NOTE: Several checks target IETF drafts or vendor protocols whose
 * well-known paths are still moving (web bot auth, MCP server card,
 * a2a agent card, x402, MPP, UCP, ACP). The probe URL for each is the most
 * commonly-cited path as of 2026-04. Refine as specs settle. Search for
 * `SPEC:` comments below for refinement targets.
 */

import type { ScanExecutionIssue } from "./scanner";

const USER_AGENT =
  "Mozilla/5.0 (compatible; FindableBot/1.0; +https://getfindable.au)";
const FETCH_TIMEOUT_MS = 8_000;

export type AgentReadinessCheckKey =
  | "robotsTxt"
  | "sitemap"
  | "linkHeaders"
  | "markdownNegotiation"
  | "robotsTxtAiRules"
  | "contentSignals"
  | "webBotAuth"
  | "apiCatalog"
  | "oauthDiscovery"
  | "oauthProtectedResource"
  | "mcpServerCard"
  | "a2aAgentCard"
  | "agentSkills"
  | "webMcp"
  | "x402"
  | "mpp"
  | "ucp"
  | "acp";

export interface AgentReadinessCheckResult {
  key: AgentReadinessCheckKey;
  displayName: string;
  weight: number;
  present: boolean;
  /** HTTP status code, when the check involved a fetch. */
  status?: number | undefined;
  /** Short human-readable evidence string (e.g. "23 sitemap entries"). */
  evidence?: string | undefined;
  /** Set when the fetch errored (network, timeout). */
  error?: string | undefined;
  /** Authoritative spec or doc URL for the protocol the check targets. */
  specUrl?: string | undefined;
  /** Path probed, relative to the origin. */
  path?: string | undefined;
}

export interface AgentReadinessScanResult {
  /** 0-100, rounded. */
  score: number;
  /** All 18 check results, in display order. */
  checks: AgentReadinessCheckResult[];
  /** Pre-formatted ScanExecutionIssue rows for the failing checks. */
  issues: ScanExecutionIssue[];
}

const REMEDIATION: Record<
  AgentReadinessCheckKey,
  { title: string; description: string; specUrl: string; weight: number }
> = {
  robotsTxt: {
    title: "Missing robots.txt",
    description:
      "Serve a /robots.txt file from the domain root so crawlers and AI agents can discover your access policy. Even an empty file makes you legible.",
    specUrl: "https://www.rfc-editor.org/rfc/rfc9309",
    weight: 5,
  },
  sitemap: {
    title: "No sitemap.xml",
    description:
      "Publish a sitemap (sitemap.xml or a sitemap index) and reference it from robots.txt with a Sitemap: directive. Sitemaps remain the cheapest discovery channel for both search and agent crawlers.",
    specUrl: "https://www.sitemaps.org/protocol.html",
    weight: 5,
  },
  linkHeaders: {
    title: "No HTTP Link headers on the root response",
    description:
      "Set HTTP Link: headers on the root document with rels like sitemap, describedby, or icon. Link headers let agents discover related resources without parsing HTML.",
    specUrl: "https://www.rfc-editor.org/rfc/rfc8288",
    weight: 4,
  },
  markdownNegotiation: {
    title: "No markdown content negotiation",
    description:
      "Serve text/markdown via content negotiation (Accept: text/markdown) or expose an llms.txt at the origin. Markdown variants drastically lower the cost for LLMs to ingest your content.",
    specUrl: "https://llmstxt.org/",
    weight: 5,
  },
  robotsTxtAiRules: {
    title: "robots.txt has no AI-specific rules",
    description:
      "Add explicit User-agent directives for AI crawlers (GPTBot, ClaudeBot, ChatGPT-User, anthropic-ai, PerplexityBot, Google-Extended, CCBot). Stating intent — allow or disallow — is better than ambiguity.",
    specUrl: "https://platform.openai.com/docs/gptbot",
    weight: 5,
  },
  contentSignals: {
    title: "No Content-Signal directives in robots.txt",
    description:
      "Cloudflare's Content-Signal extension lets you express opt-ins (search=yes, ai-train=no, ai-input=yes) at the file level. Add a Content-Signal: line per User-agent block.",
    specUrl: "https://blog.cloudflare.com/content-signals-policy/",
    weight: 4,
  },
  webBotAuth: {
    title: "Web Bot Auth not configured",
    description:
      "Publish a JWK directory at /.well-known/http-message-signatures-directory so legitimate bots can sign requests with verifiable keys (RFC 9421). This lets servers tell allowed agents from impersonators.",
    specUrl: "https://www.ietf.org/archive/id/draft-meunier-web-bot-auth-architecture-01.html",
    weight: 4,
  },
  apiCatalog: {
    title: "No /.well-known/api-catalog",
    description:
      "Publish an api-catalog link-set (RFC 9727) listing your API definitions. This is the standard way for agents to discover machine-actionable endpoints on your domain.",
    specUrl: "https://www.rfc-editor.org/rfc/rfc9727",
    weight: 5,
  },
  oauthDiscovery: {
    title: "No OAuth authorization-server metadata",
    description:
      "If your APIs use OAuth, publish authorization-server metadata at /.well-known/oauth-authorization-server (RFC 8414) so clients (including agents) can discover endpoints automatically.",
    specUrl: "https://www.rfc-editor.org/rfc/rfc8414",
    weight: 5,
  },
  oauthProtectedResource: {
    title: "No /.well-known/oauth-protected-resource",
    description:
      "Publish protected-resource metadata (draft-ietf-oauth-resource-metadata) so callers can discover scopes, token endpoints, and the issuer for any OAuth-protected API on your domain.",
    specUrl: "https://datatracker.ietf.org/doc/draft-ietf-oauth-resource-metadata/",
    weight: 4,
  },
  mcpServerCard: {
    title: "No MCP server card",
    description:
      "Publish a Model Context Protocol server descriptor at /.well-known/mcp.json (or /.well-known/mcp-server.json) so AI agents can discover your tools, resources, and prompts.\n\nEasiest path: index your catalog or help docs in Cloudflare AI Search, enable Settings > Public Endpoint to get a hosted MCP server at https://<INSTANCE_ID>.search.ai.cloudflare.com/mcp, then publish /.well-known/mcp.json pointing at that URL. See https://developers.cloudflare.com/ai-search/api/search/mcp/.",
    specUrl: "https://modelcontextprotocol.io/specification",
    weight: 6,
  },
  a2aAgentCard: {
    title: "No A2A agent card",
    description:
      "Publish an Agent-to-Agent agent card at /.well-known/agent.json so other agents can discover your agent's name, skills, and endpoints.",
    specUrl: "https://github.com/google/A2A",
    weight: 6,
  },
  agentSkills: {
    title: "No agent skills manifest",
    description:
      "Either inline skills in your A2A agent card or publish a skills manifest at /.well-known/agent-skills.json describing each capability with name, description, and inputs.",
    specUrl: "https://github.com/google/A2A",
    weight: 4,
  },
  webMcp: {
    title: "No Web MCP manifest",
    description:
      "Publish a Web MCP manifest at /.well-known/web-mcp.json. Web MCP is the HTTP transport binding of MCP for browser-resident agents and serverless tool exposure.\n\nEasiest path: Cloudflare AI Search exposes a Web-MCP-compatible HTTP endpoint at https://<INSTANCE_ID>.search.ai.cloudflare.com/mcp once you enable Settings > Public Endpoint on your AI Search instance — no separate hosting needed. See https://developers.cloudflare.com/ai-search/api/search/mcp/.",
    specUrl: "https://modelcontextprotocol.io/specification/transports",
    weight: 4,
  },
  x402: {
    title: "No x402 payment support",
    description:
      "If your APIs accept agent payments, support the x402 protocol — return HTTP 402 Payment Required with a WWW-Authenticate: x402 challenge for any unauthenticated paid endpoint.",
    specUrl: "https://www.x402.org/",
    weight: 5,
  },
  mpp: {
    title: "No Merchant Payment Protocol manifest",
    description:
      "Publish a Merchant Payment Protocol manifest at /.well-known/mpp.json describing accepted payment methods, settlement endpoints, and currency support for agent-initiated checkout.",
    specUrl: "https://merchantpaymentprotocol.org/",
    weight: 4,
  },
  ucp: {
    title: "No Universal Commerce Protocol manifest",
    description:
      "Publish a Universal Commerce Protocol manifest at /.well-known/ucp.json so agents can discover your catalog, cart, and checkout endpoints in one place.",
    specUrl: "https://universalcommerce.dev/",
    weight: 4,
  },
  acp: {
    title: "No Agentic Commerce Protocol manifest",
    description:
      "Publish an Agentic Commerce Protocol manifest at /.well-known/acp.json (or /.well-known/agentic-commerce.json) so OpenAI-style buying agents can transact against your catalog.",
    specUrl: "https://www.agenticcommerce.dev/",
    weight: 6,
  },
};

const DISPLAY_NAME: Record<AgentReadinessCheckKey, string> = {
  robotsTxt: "robots.txt",
  sitemap: "sitemap.xml",
  linkHeaders: "HTTP Link headers",
  markdownNegotiation: "Markdown negotiation",
  robotsTxtAiRules: "robots.txt AI rules",
  contentSignals: "Cloudflare Content-Signals",
  webBotAuth: "Web Bot Auth",
  apiCatalog: ".well-known/api-catalog",
  oauthDiscovery: "OAuth authorization-server metadata",
  oauthProtectedResource: "OAuth protected-resource metadata",
  mcpServerCard: "MCP server card",
  a2aAgentCard: "A2A agent card",
  agentSkills: "Agent skills manifest",
  webMcp: "Web MCP manifest",
  x402: "x402 payments",
  mpp: "Merchant Payment Protocol",
  ucp: "Universal Commerce Protocol",
  acp: "Agentic Commerce Protocol",
};

const ORDER: AgentReadinessCheckKey[] = [
  "robotsTxt",
  "sitemap",
  "linkHeaders",
  "markdownNegotiation",
  "robotsTxtAiRules",
  "contentSignals",
  "webBotAuth",
  "apiCatalog",
  "oauthDiscovery",
  "oauthProtectedResource",
  "mcpServerCard",
  "a2aAgentCard",
  "agentSkills",
  "webMcp",
  "x402",
  "mpp",
  "ucp",
  "acp",
];

interface FetchProbe {
  status: number;
  ok: boolean;
  headers: Headers;
  body: string;
}

async function probe(
  url: string,
  init?: RequestInit & { method?: "GET" | "HEAD" },
): Promise<FetchProbe | { error: string }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: init?.method ?? "GET",
      redirect: "follow",
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "*/*",
        ...(init?.headers ?? {}),
      },
      signal: controller.signal,
    });
    const body =
      init?.method === "HEAD"
        ? ""
        : (await response.text().catch(() => "")) ?? "";
    return {
      status: response.status,
      ok: response.ok,
      headers: response.headers,
      body,
    };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "fetch failed",
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

function isProbe(value: FetchProbe | { error: string }): value is FetchProbe {
  return (value as FetchProbe).status !== undefined;
}

function looksLikeJson(body: string): boolean {
  const trimmed = body.trim();
  if (!trimmed) return false;
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return false;
  try {
    JSON.parse(trimmed);
    return true;
  } catch {
    return false;
  }
}

function buildResult(
  key: AgentReadinessCheckKey,
  partial: Partial<AgentReadinessCheckResult>,
): AgentReadinessCheckResult {
  return {
    key,
    displayName: DISPLAY_NAME[key],
    weight: REMEDIATION[key].weight,
    specUrl: REMEDIATION[key].specUrl,
    present: false,
    ...partial,
  };
}

// ------- Individual checks ----------------------------------------------

async function checkWellKnownJson(
  origin: string,
  key: AgentReadinessCheckKey,
  paths: string[],
): Promise<AgentReadinessCheckResult> {
  for (const path of paths) {
    const result = await probe(new URL(path, origin).toString());
    if (isProbe(result) && result.ok && looksLikeJson(result.body)) {
      return buildResult(key, {
        present: true,
        status: result.status,
        path,
        evidence: `${result.body.length} bytes`,
      });
    }
  }
  return buildResult(key, { path: paths[0] });
}

async function checkRobotsTxt(origin: string, robotsBody: string | null) {
  return buildResult("robotsTxt", {
    present: Boolean(robotsBody && robotsBody.trim().length > 0),
    path: "/robots.txt",
    evidence: robotsBody ? `${robotsBody.split("\n").length} lines` : undefined,
  });
}

async function checkSitemap(origin: string, robotsBody: string | null) {
  // Try Sitemap: directives in robots.txt first, then default paths.
  const sitemapRefs = (robotsBody ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^sitemap:/i.test(line))
    .map((line) => line.replace(/^sitemap:\s*/i, "").trim())
    .filter(Boolean);
  const candidates = [
    ...sitemapRefs,
    new URL("/sitemap.xml", origin).toString(),
    new URL("/sitemap_index.xml", origin).toString(),
  ];
  for (const url of candidates) {
    const result = await probe(url);
    if (isProbe(result) && result.ok && /<sitemapindex|<urlset/i.test(result.body)) {
      const entryCount = (result.body.match(/<url>|<sitemap>/gi) ?? []).length;
      return buildResult("sitemap", {
        present: true,
        status: result.status,
        path: url,
        evidence: `${entryCount} entr${entryCount === 1 ? "y" : "ies"}`,
      });
    }
  }
  return buildResult("sitemap", { path: "/sitemap.xml" });
}

async function checkLinkHeaders(origin: string) {
  const result = await probe(origin, { method: "HEAD" });
  if (!isProbe(result)) {
    return buildResult("linkHeaders", { error: result.error });
  }
  const linkHeader = result.headers.get("link");
  return buildResult("linkHeaders", {
    present: Boolean(linkHeader && linkHeader.length > 0),
    status: result.status,
    evidence: linkHeader ? `Link: ${linkHeader.slice(0, 80)}` : undefined,
  });
}

async function checkMarkdownNegotiation(origin: string) {
  const negotiated = await probe(origin, {
    headers: { Accept: "text/markdown, text/x-markdown" },
  });
  if (
    isProbe(negotiated) &&
    negotiated.ok &&
    /^text\/(markdown|x-markdown)/i.test(negotiated.headers.get("content-type") ?? "")
  ) {
    return buildResult("markdownNegotiation", {
      present: true,
      status: negotiated.status,
      evidence: "Accept: text/markdown honored",
    });
  }
  // Fallback: llms.txt at origin (https://llmstxt.org/)
  const llms = await probe(new URL("/llms.txt", origin).toString());
  if (isProbe(llms) && llms.ok && llms.body.trim().length > 0) {
    return buildResult("markdownNegotiation", {
      present: true,
      status: llms.status,
      path: "/llms.txt",
      evidence: `llms.txt present (${llms.body.length} bytes)`,
    });
  }
  return buildResult("markdownNegotiation", {});
}

const AI_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "anthropic-ai",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
  "Bytespider",
  "ImagesiftBot",
  "Applebot-Extended",
];

async function checkRobotsTxtAiRules(robotsBody: string | null) {
  if (!robotsBody) {
    return buildResult("robotsTxtAiRules", {});
  }
  const lower = robotsBody.toLowerCase();
  const matched = AI_USER_AGENTS.filter((ua) => lower.includes(ua.toLowerCase()));
  return buildResult("robotsTxtAiRules", {
    present: matched.length > 0,
    evidence:
      matched.length > 0
        ? `mentions ${matched.length} AI agent${matched.length === 1 ? "" : "s"}: ${matched.slice(0, 3).join(", ")}`
        : undefined,
  });
}

async function checkContentSignals(robotsBody: string | null) {
  if (!robotsBody) {
    return buildResult("contentSignals", {});
  }
  const signals = robotsBody
    .split("\n")
    .filter((line) => /^content-signal:/i.test(line.trim()));
  return buildResult("contentSignals", {
    present: signals.length > 0,
    evidence: signals.length > 0 ? `${signals.length} Content-Signal line(s)` : undefined,
  });
}

async function checkWebBotAuth(origin: string) {
  return checkWellKnownJson(origin, "webBotAuth", [
    "/.well-known/http-message-signatures-directory",
  ]);
}

async function checkApiCatalog(origin: string) {
  const result = await probe(new URL("/.well-known/api-catalog", origin).toString());
  if (!isProbe(result)) {
    return buildResult("apiCatalog", { error: result.error });
  }
  // RFC 9727 link-set is application/linkset+json or application/linkset.
  const ct = result.headers.get("content-type") ?? "";
  const looksLikeLinkset =
    /linkset/i.test(ct) || /"linkset"\s*:/.test(result.body) || looksLikeJson(result.body);
  return buildResult("apiCatalog", {
    present: result.ok && looksLikeLinkset,
    status: result.status,
    path: "/.well-known/api-catalog",
  });
}

async function checkOauthDiscovery(origin: string) {
  const result = await probe(
    new URL("/.well-known/oauth-authorization-server", origin).toString(),
  );
  if (!isProbe(result)) {
    return buildResult("oauthDiscovery", { error: result.error });
  }
  if (!result.ok || !looksLikeJson(result.body)) {
    return buildResult("oauthDiscovery", {
      status: result.status,
      path: "/.well-known/oauth-authorization-server",
    });
  }
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(result.body) as Record<string, unknown>;
  } catch {
    return buildResult("oauthDiscovery", {
      status: result.status,
      path: "/.well-known/oauth-authorization-server",
    });
  }
  const required = ["issuer", "authorization_endpoint", "token_endpoint"];
  const hasAll = required.every((key) => typeof parsed[key] === "string");
  return buildResult("oauthDiscovery", {
    present: hasAll,
    status: result.status,
    path: "/.well-known/oauth-authorization-server",
    evidence: hasAll ? `issuer: ${String(parsed.issuer)}` : "incomplete metadata",
  });
}

async function checkOauthProtectedResource(origin: string) {
  return checkWellKnownJson(origin, "oauthProtectedResource", [
    "/.well-known/oauth-protected-resource",
  ]);
}

async function checkMcpServerCard(origin: string) {
  // SPEC: MCP discovery URL is still under discussion. Try the most-cited paths.
  return checkWellKnownJson(origin, "mcpServerCard", [
    "/.well-known/mcp.json",
    "/.well-known/mcp-server.json",
    "/.well-known/mcp/server.json",
  ]);
}

async function checkA2aAgentCard(origin: string) {
  // SPEC: A2A canonical path is /.well-known/agent.json
  return checkWellKnownJson(origin, "a2aAgentCard", [
    "/.well-known/agent.json",
    "/.well-known/agent-card.json",
  ]);
}

async function checkAgentSkills(origin: string) {
  // Either inline skills in agent.json or a separate manifest.
  const card = await probe(new URL("/.well-known/agent.json", origin).toString());
  if (isProbe(card) && card.ok && looksLikeJson(card.body)) {
    try {
      const parsed = JSON.parse(card.body) as Record<string, unknown>;
      const skills = parsed.skills;
      if (Array.isArray(skills) && skills.length > 0) {
        return buildResult("agentSkills", {
          present: true,
          status: card.status,
          path: "/.well-known/agent.json",
          evidence: `${skills.length} inline skill(s)`,
        });
      }
    } catch {
      // fall through
    }
  }
  return checkWellKnownJson(origin, "agentSkills", ["/.well-known/agent-skills.json"]);
}

async function checkWebMcp(origin: string) {
  // SPEC: Web MCP HTTP-binding path is still emerging.
  return checkWellKnownJson(origin, "webMcp", [
    "/.well-known/web-mcp.json",
    "/.well-known/web-mcp",
    "/mcp",
  ]);
}

async function checkX402(origin: string) {
  // x402 advertises itself via 402 response + WWW-Authenticate: x402 challenge.
  // Probe the root and any spec-recommended path; presence detected by the
  // status code (402) and the WWW-Authenticate header scheme.
  const candidates = [
    new URL("/", origin).toString(),
    new URL("/x402", origin).toString(),
    new URL("/.well-known/x402", origin).toString(),
  ];
  for (const url of candidates) {
    const result = await probe(url);
    if (!isProbe(result)) continue;
    const wwwAuth = result.headers.get("www-authenticate") ?? "";
    if (result.status === 402 || /^x402/i.test(wwwAuth)) {
      return buildResult("x402", {
        present: true,
        status: result.status,
        path: url,
        evidence: wwwAuth ? `WWW-Authenticate: ${wwwAuth.slice(0, 60)}` : "HTTP 402",
      });
    }
  }
  return buildResult("x402", {});
}

async function checkMpp(origin: string) {
  // SPEC: MPP manifest path varies by vendor. Probe common candidates.
  return checkWellKnownJson(origin, "mpp", [
    "/.well-known/mpp.json",
    "/.well-known/merchant-payment-protocol.json",
  ]);
}

async function checkUcp(origin: string) {
  // SPEC: UCP manifest path is still emerging.
  return checkWellKnownJson(origin, "ucp", [
    "/.well-known/ucp.json",
    "/.well-known/universal-commerce.json",
  ]);
}

async function checkAcp(origin: string) {
  // SPEC: ACP (Agentic Commerce Protocol) commonly uses /.well-known/acp.json.
  return checkWellKnownJson(origin, "acp", [
    "/.well-known/acp.json",
    "/.well-known/agentic-commerce.json",
  ]);
}

// ------- Orchestrator ---------------------------------------------------

function originFor(input: string): string {
  try {
    const u = new URL(input);
    return `${u.protocol}//${u.host}`;
  } catch {
    return `https://${input.replace(/^https?:\/\//, "").replace(/\/.*$/, "")}`;
  }
}

export async function analyzeAgentReadiness(
  domainOrUrl: string,
): Promise<AgentReadinessScanResult> {
  const origin = originFor(domainOrUrl);

  const robotsProbe = await probe(new URL("/robots.txt", origin).toString());
  const robotsBody = isProbe(robotsProbe) && robotsProbe.ok ? robotsProbe.body : null;

  const checks = await Promise.all([
    checkRobotsTxt(origin, robotsBody),
    checkSitemap(origin, robotsBody),
    checkLinkHeaders(origin),
    checkMarkdownNegotiation(origin),
    checkRobotsTxtAiRules(robotsBody),
    checkContentSignals(robotsBody),
    checkWebBotAuth(origin),
    checkApiCatalog(origin),
    checkOauthDiscovery(origin),
    checkOauthProtectedResource(origin),
    checkMcpServerCard(origin),
    checkA2aAgentCard(origin),
    checkAgentSkills(origin),
    checkWebMcp(origin),
    checkX402(origin),
    checkMpp(origin),
    checkUcp(origin),
    checkAcp(origin),
  ]);

  const ordered = ORDER.map((key) => checks.find((c) => c.key === key)!).filter(Boolean);

  const totalWeight = ordered.reduce((sum, c) => sum + c.weight, 0);
  const earnedWeight = ordered
    .filter((c) => c.present)
    .reduce((sum, c) => sum + c.weight, 0);
  const score = totalWeight === 0 ? 0 : Math.round((earnedWeight / totalWeight) * 100);

  const issues: ScanExecutionIssue[] = ordered
    .filter((c) => !c.present)
    .map((c) => {
      const meta = REMEDIATION[c.key];
      return {
        id: `agent.${c.key}`,
        productName: origin,
        title: meta.title,
        description: c.error
          ? `${meta.description}\n\nProbe error: ${c.error}`
          : meta.description,
        dimension: "agent_readiness",
        severity: c.weight >= 5 ? "high" : "medium",
        fixType: "manual",
        pointsImpact: c.weight,
      };
    });

  return { score, checks: ordered, issues };
}
