import type { PlanTier } from "@findable/shared";

import { buildApiUrl, parseApiResponse } from "./api-base";
import { clearAuthSession, getAccessToken, setAuthSession } from "./session";

export interface AuthAccount {
  createdAt: string;
  email: string;
  freeScanUsed: boolean;
  id: string;
  plan: PlanTier;
}

interface AuthSessionResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
  account: AuthAccount;
}

function withJsonHeaders(init?: RequestInit) {
  const headers = new Headers(init?.headers);

  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  return headers;
}

function persistSession(session: AuthSessionResponse) {
  setAuthSession(session.accessToken, session.accessTokenExpiresAt);
  return session;
}

async function parseAuthSessionResponse(response: Response) {
  const payload = await parseApiResponse<AuthSessionResponse>(response);
  return persistSession(payload);
}

export async function authenticatedFetch(
  pathname: string,
  init: RequestInit = {},
  retryOnUnauthorized = true,
) {
  const headers = new Headers(init.headers);
  const accessToken = getAccessToken();

  if (accessToken) {
    headers.set("authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(buildApiUrl(pathname), {
    ...init,
    credentials: "include",
    headers,
  });

  if (response.status !== 401 || !retryOnUnauthorized) {
    return response;
  }

  try {
    await refreshAuthSession();
  } catch {
    clearAuthSession();
    return response;
  }

  const retryHeaders = new Headers(init.headers);
  const refreshedAccessToken = getAccessToken();

  if (refreshedAccessToken) {
    retryHeaders.set("authorization", `Bearer ${refreshedAccessToken}`);
  }

  return fetch(buildApiUrl(pathname), {
    ...init,
    credentials: "include",
    headers: retryHeaders,
  });
}

export async function signup(email: string, password: string) {
  const response = await fetch(buildApiUrl("/api/auth/signup"), {
    method: "POST",
    headers: withJsonHeaders(),
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  return parseAuthSessionResponse(response);
}

export async function login(email: string, password: string) {
  const response = await fetch(buildApiUrl("/api/auth/login"), {
    method: "POST",
    headers: withJsonHeaders(),
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  return parseAuthSessionResponse(response);
}

export async function forgotPassword(email: string) {
  const response = await fetch(buildApiUrl("/api/auth/forgot"), {
    method: "POST",
    headers: withJsonHeaders(),
    credentials: "include",
    body: JSON.stringify({ email }),
  });

  return parseApiResponse<{ sent: boolean }>(response);
}

export async function resetPassword(token: string, newPassword: string) {
  const response = await fetch(buildApiUrl("/api/auth/reset"), {
    method: "POST",
    headers: withJsonHeaders(),
    credentials: "include",
    body: JSON.stringify({ token, newPassword }),
  });

  return parseAuthSessionResponse(response);
}

export async function refreshAuthSession() {
  const response = await fetch(buildApiUrl("/api/auth/refresh"), {
    method: "POST",
    credentials: "include",
  });

  return parseAuthSessionResponse(response);
}

export async function getCurrentAccount() {
  const response = await authenticatedFetch("/api/auth/me", {
    method: "GET",
  });

  const payload = await parseApiResponse<{ account: AuthAccount }>(response);
  return payload.account;
}

export async function logout() {
  try {
    await fetch(buildApiUrl("/api/auth/logout"), {
      method: "POST",
      credentials: "include",
    });
  } finally {
    clearAuthSession();
  }
}
