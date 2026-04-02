import type { ScanStatus, WorkspaceIssue } from "@findable/shared";

import { buildApiUrl, parseApiResponse } from "./api-base";

export interface CreateScanRequest {
  email: string;
  turnstileToken: string;
  urls: string[];
}

export interface CreateScanResponse {
  id: string;
  status: ScanStatus;
}

export interface ScanProductResult {
  issues: WorkspaceIssue[];
  llmScore: number;
  name: string;
  overallScore?: number;
  protocolScore: number;
  generatedSchema?: Record<string, unknown> | null;
  category?: string;
  price?: number | null;
  schemaScore: number;
  url: string;
}

export interface ScanReportPayload {
  generatedAt?: string;
  products?: ScanProductResult[];
  summary?: string;
  topIssues?: string[];
}

export interface ScanResults {
  report: ScanReportPayload | null;
  scores: {
    competitive: number | null;
    llm: number | null;
    overall: number | null;
    protocol: number | null;
    schema: number | null;
  };
}

export interface ScanDetails {
  id: string;
  progress: {
    current: number;
    total: number;
  };
  results: ScanResults | null;
  status: ScanStatus;
}

export async function createScan(input: CreateScanRequest): Promise<CreateScanResponse> {
  const response = await fetch(buildApiUrl("/api/scan"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  });

  return parseApiResponse<CreateScanResponse>(response);
}

export async function getScan(id: string): Promise<ScanDetails> {
  const response = await fetch(buildApiUrl(`/api/scan/${id}`), {
    headers: {
      accept: "application/json",
    },
  });

  return parseApiResponse<ScanDetails>(response);
}
